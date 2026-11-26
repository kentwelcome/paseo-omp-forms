import { describe, expect, test } from "vitest";
import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { OmpExtensionUiResponseSchema, OmpRuntimeEventSchema } from "../server/provider/omp-rpc-protocol";
import {
  createHarness, establishTerminalOwnership, openSession, sessionAt, startPrompt,
} from "./helpers/provider-harness";

const HTML = `<form><fieldset><legend>Choose visibility</legend>
  <label><input type="radio" name="visible" value="workspace" checked>Workspace</label>
  <input id="private" type="radio" name="visible" value="private &amp; local" />
  <label for="private"><strong>Only me</strong></label>
</fieldset></form>`;

async function formSession() {
  const { connection, events, runtime } = await createHarness();
  await openSession(connection, events);
  const session = sessionAt(runtime);
  const emit = (id: string, html = HTML) => session.emit(OmpRuntimeEventSchema.parse({
    type: "extension_ui_request", method: "form", id, html,
  }));
  const publish = (id: string, html = HTML) => {
    emit(id, html);
    const event = events.findLast((item) => item.type === "session.permission");
    if (event?.type !== "session.permission") throw new Error("Expected a form card");
    return event.request.id;
  };
  return { connection, events, session, emit, publish };
}

describe("OMP radio forms", () => {
  test("maps the second displayed option to its original field and decoded machine value", async () => {
    const { connection, events, session, publish } = await formSession();
    try {
      const permissionId = publish("form-19-2-1");
      const card = events.findLast((item) => item.type === "session.permission");
      expect(card).toMatchObject({
        request: { kind: "question", input: { questions: [{
          header: "Choose visibility", multiSelect: false,
          options: [{ label: "Workspace" }, { label: "Only me" }],
        }] } },
      });
      await connection.send({
        type: "session.permission", sessionId: "session-1", permissionId,
        response: { behavior: "allow", updatedInput: { answers: { "Choose visibility": "Only me" } } },
      });
      expect(session.extensionUiResponses.map((response) => OmpExtensionUiResponseSchema.parse(response)))
        .toEqual([{ type: "extension_ui_response", id: "form-19-2-1", data: { visible: "private & local" } }]);
      expect(events).toContainEqual(expect.objectContaining({ type: "session.permission_resolved", permissionId }));
    } finally {
      await connection.close();
    }
  });

  test("dismissal and interruption cancel without allowing a stale card to answer again", async () => {
    const { connection, events, session, publish } = await formSession();
    try {
      await startPrompt(connection, events);
      const dismissed = publish("dismiss");
      await connection.send({
        type: "session.permission", sessionId: "session-1", permissionId: dismissed,
        response: { behavior: "deny", message: "Dismissed by user" },
      });
      const interrupted = publish("interrupt");
      await connection.send({ type: "session.interrupt", sessionId: "session-1", requestId: "stop" });
      await events.waitFor((event) => event.type === "request.completed" && event.requestId === "stop");
      establishTerminalOwnership(session);
      session.emit({ type: "agent_end", requestId: "rpc-prompt-1", messages: [], isTerminal: true });
      expect(session.extensionUiResponses).toEqual([
        { type: "extension_ui_response", id: "dismiss", cancelled: true },
        { type: "extension_ui_response", id: "interrupt", cancelled: true },
      ]);
      for (const permissionId of [dismissed, interrupted]) {
        expect(events).toContainEqual(expect.objectContaining({ type: "session.permission_resolved", permissionId }));
      }
      const fresh = publish("fresh");
      expect(fresh).not.toBe(interrupted);
      await expect(connection.send({
        type: "session.permission", sessionId: "session-1", permissionId: interrupted,
        response: { behavior: "allow", updatedInput: { answers: { "Choose visibility": "Only me" } } },
      })).rejects.toThrow("Unknown OMP permission request");
      expect(session.extensionUiResponses).toHaveLength(2);
    } finally {
      await connection.close();
    }
  });

  test("interrupts a form even without an active model turn", async () => {
    const { connection, events, session, publish } = await formSession();
    try {
      const permissionId = publish("idle-form");
      await connection.send({ type: "session.interrupt", sessionId: "session-1", requestId: "stop-idle" });
      expect(session.extensionUiResponses).toEqual([
        { type: "extension_ui_response", id: "idle-form", cancelled: true },
      ]);
      expect(events).toContainEqual(expect.objectContaining({ type: "session.permission_resolved", permissionId }));
    } finally {
      await connection.close();
    }
  });

  test("preserves the native default value when a labeled radio omits value", async () => {
    const { connection, session, publish } = await formSession();
    try {
      const permissionId = publish("default-on", HTML.replace('value="workspace" ', ''));
      await connection.send({
        type: "session.permission", sessionId: "session-1", permissionId,
        response: { behavior: "allow", updatedInput: { answers: { "Choose visibility": "Workspace" } } },
      });
      expect(session.extensionUiResponses).toEqual([
        { type: "extension_ui_response", id: "default-on", data: { visible: "on" } },
      ]);
    } finally {
      await connection.close();
    }
  });

  test.each([
    HTML.replace('name="visible" value="private', 'name="other" value="private'),
    HTML.replace('</fieldset>', '<textarea name="extra"></textarea></fieldset>'),
    HTML.replace('</fieldset>', '<script>throw new Error()</script></fieldset>'),
    HTML.replace('<label><input type="radio"', '<label for="wrapped"><input id="wrapped" type="radio"'),
    `<form>${Array.from({ length: 40 }, (_, index) =>
      `<label><input type="radio" name="group" value="${index}">${"漢".repeat(900)}</label>`
    ).join("")}</form>`,
  ])("cancels an unsupported form without opening a partial card", async (html) => {
    const { connection, events, session, emit } = await formSession();
    try {
      emit("unsupported", html);
      expect(session.extensionUiResponses).toEqual([
        { type: "extension_ui_response", id: "unsupported", cancelled: true },
      ]);
      expect(events.some((event) => event.type === "session.permission")).toBe(false);
    } finally {
      await connection.close();
    }
  });

  test.skipIf(process.env.OMP_FORMS_WIRE !== "1")(
    "OMP 19.2.1 accepts the provider response for the HTML it sent",
    async () => {
      const cwd = await mkdtemp(join(tmpdir(), "omp-forms-wire-"));
      await writeFile(join(cwd, "models.yml"), `
providers:
  wire-only:
    baseUrl: http://127.0.0.1:1/v1
    auth: none
    api: openai-completions
    models:
      - id: unreachable
        name: Wire only
        input: [text]
        contextWindow: 8192
        maxTokens: 512
`);
      const extension = join(cwd, "form.ts");
      await writeFile(extension, `
        export default function (pi) {
          pi.on("input", async (_event, ctx) => {
            const result = await ctx.ui.formDialog(${JSON.stringify(HTML)});
            ctx.ui.notify("FORM_WIRE_RESULT:" + JSON.stringify(result?.data), "info");
            return { action: "handled" };
          });
        }
      `);
      const child = spawn("omp", [
        "--mode", "rpc-ui", "--no-session", "--no-extensions", "--no-context-files",
        "--model", "wire-only/unreachable", "-e", extension,
      ], {
        cwd, env: { ...process.env, PI_CODING_AGENT_DIR: cwd },
        stdio: ["pipe", "pipe", "ignore"],
        signal: AbortSignal.timeout(10_000),
      });
      const { promise: exited, resolve: markExited } = Promise.withResolvers<void>();
      child.once("close", markExited);
      child.on("error", () => child.stdout.destroy());
      const lines = createInterface({ input: child.stdout })[Symbol.asyncIterator]();
      const waitFor = async (match: (frame: Record<string, unknown>) => boolean) => {
        for (;;) {
          const line = await lines.next();
          if (line.done) throw new Error("OMP exited before emitting the expected frame");
          const frame = JSON.parse(line.value) as Record<string, unknown>;
          if (match(frame)) return frame;
        }
      };
      const { connection, events, session } = await formSession();
      try {
        await waitFor((frame) => frame.type === "ready");
        child.stdin.write(JSON.stringify({ type: "prompt", id: "smoke", message: "wire replay" }) + "\n");
        const nativeRequest = await waitFor((frame) => frame.type === "extension_ui_request" && frame.method === "form");
        session.emit(OmpRuntimeEventSchema.parse(nativeRequest));
        const card = events.findLast((item) => item.type === "session.permission");
        if (card?.type !== "session.permission") throw new Error("Expected a form card");
        await connection.send({
          type: "session.permission", sessionId: "session-1", permissionId: card.request.id,
          response: { behavior: "allow", updatedInput: { answers: { "Choose visibility": "Only me" } } },
        });
        const response = OmpExtensionUiResponseSchema.parse(session.extensionUiResponses.at(-1));
        child.stdin.write(JSON.stringify(response) + "\n");
        const result = await waitFor((frame) => frame.type === "extension_ui_request" &&
          frame.method === "notify" && String(frame.message).startsWith("FORM_WIRE_RESULT:"));
        expect(result.message).toBe('FORM_WIRE_RESULT:{"visible":"private & local"}');
      } finally {
        child.kill();
        await connection.close();
        await exited;
        await rm(cwd, { recursive: true, force: true });
      }
    },
    12_000,
  );
});
