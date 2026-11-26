# OMP Forms

Answer [Oh My Pi (OMP)](https://github.com/can1357/oh-my-pi) radio-button questions directly in [Paseo](https://paseo.sh/) chat.

On Paseo Desktop 0.17.4 with OMP 19.2.1, the bundled OMP provider could show **Question** without any choices while OMP’s `ask` tool waited for an answer.

OMP Forms shows a selectable card instead. Pick an option and submit it to send its value back to `ask` so the agent can continue. Dismiss the card to cancel without answering.

## Should I install it?

- **Try it** if you use Oh My Pi in Paseo, see a question with no choices, and want to answer single-choice questions without typing a reply.
- **Skip it** if your current provider already shows the choices, you don’t use Oh My Pi, or you need checkboxes, text fields, or multiple questions in one form. A no-install workaround is to ask the agent to list numbered options in chat and wait for your reply.

The plugin supports one group of radio buttons and cancels unsupported forms. It adds a separate **Oh My Pi (Forms)** provider for new chats. It neither replaces the bundled provider nor fixes a chat that is already waiting.

## Install from GitHub

Verified with Paseo Desktop 0.17.4 on macOS and OMP 19.2.1. Install `omp` on the machine running the Paseo daemon and make sure it’s on the daemon’s `PATH`. Git installation uses Node.js 22.13 or newer and npm on that host.

Paseo plugins run as trusted, unsandboxed code. Enable plugins in **Settings → Plugins** on the target daemon only if you trust the code you’re installing.

```sh
paseo plugin install git:kentwelcome/paseo-omp-forms:plugin
```

Start a new chat with **Oh My Pi (Forms)**. To try it, send this prompt:

```text
Use the ask tool with the HTML below. When it returns, tell me the exact value it returned.

<form>
  <fieldset>
    <legend>Who should see this?</legend>
    <label><input type="radio" name="visibility" value="team_scope"> Team</label>
    <label><input type="radio" name="visibility" value="private_local"> Only me</label>
  </fieldset>
</form>
```

Select **Only me** and click **Submit**. The tool should return `private_local`, and the agent should continue. To test cancellation, ask again and click **Dismiss**. The tool should stop waiting without returning an answer.

## Local development

With Node 22.13 or newer and OMP 19.2.1 available:

```sh
cd plugin
npm ci
npm run typecheck
OMP_FORMS_WIRE=1 npm test -- tests/provider-forms.test.ts tests/provider-permissions.test.ts tests/provider-interrupt.test.ts tests/omp-rpc-protocol.test.ts
```

`OMP_FORMS_WIRE=1` adds a model-free replay through the installed `omp` binary. For an authorized Desktop test, install the local `plugin/` directory by absolute path, start a fresh **Oh My Pi (Forms)** chat, then test selection and dismissal. Do not restart the daemon.

## Development workflow

Start with [AGENTS.md](AGENTS.md), the [architecture](architecture.md), and [project learning](LEARNING.md).

- [Planning](guidelines/planning.md)
- [Development](guidelines/development.md)
- [Architecture decisions](guidelines/architecture-decisions.md)
- [Review](guidelines/review.md)
- [Issues](guidelines/issues.md)
- [Retrospectives](guidelines/retrospectives.md)
- [Agent teams](guidelines/agent-teams.md)
