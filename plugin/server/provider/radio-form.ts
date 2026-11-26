import { type DefaultTreeAdapterTypes, parseFragment } from "parse5";
import { MAX_RADIO_FORM_LENGTH } from "./omp-rpc-values";

type Child = DefaultTreeAdapterTypes.ChildNode;
type Element = DefaultTreeAdapterTypes.Element;
const HTML = "http://www.w3.org/1999/xhtml";
const TEXT_ELEMENTS = {
  b: true, br: true, code: true, em: true, i: true, small: true,
  span: true, strong: true, u: true,
};
const LAYOUT_ELEMENTS = {
  form: true, fieldset: true, legend: true, div: true, p: true, section: true,
  h1: true, h2: true, h3: true, h4: true, h5: true, h6: true,
  ul: true, ol: true, li: true,
};
const MAX_TEXT = 4_096;
const MAX_OPTIONS = 128;

function attr(element: Element, name: string): string | undefined {
  return element.attrs.find((attribute) => attribute.name === name)?.value;
}

function cleanText(text: string): string {
  return text.replace(/\s+/gu, " ").trim();
}

export function parseRadioForm(html: string) {
  if (html.length > MAX_RADIO_FORM_LENGTH) return undefined;
  let invalid = false;
  const fragment = parseFragment(html, { onParseError: () => { invalid = true; } });
  if (invalid) return undefined;

  // Match OMP's scope: ignore nodes outside the first HTML form, when present.
  let root: DefaultTreeAdapterTypes.DocumentFragment | Element = fragment;
  const outside = fragment.childNodes.slice().reverse();
  while (outside.length > 0) {
    const node = outside.pop()!;
    if (!("tagName" in node) || node.namespaceURI !== HTML) continue;
    if (node.tagName === "form") {
      if (root !== fragment || attr(node, "hidden") !== undefined) return undefined;
      root = node;
      continue;
    }
    for (let index = node.childNodes.length - 1; index >= 0; index--) {
      outside.push(node.childNodes[index]!);
    }
  }

  const radios: { element: Element; wrapper?: Element }[] = [];
  const labels = new Map<string, Element>();
  const usedLabels = new Set<Element>();
  const legends: string[] = [];
  const prompt: string[] = [];
  const stack: { node: Child; wrapper?: Element; legend?: boolean }[] =
    root.childNodes.slice().reverse().map((node) => ({ node }));

  while (stack.length > 0) {
    const item = stack.pop()!;
    const { node, wrapper } = item;
    if (!("tagName" in node)) {
      if ("value" in node && !wrapper) {
        (item.legend ? legends : prompt).push(node.value);
      }
      continue;
    }
    const { tagName } = node;
    if (node.namespaceURI !== HTML || attr(node, "hidden") !== undefined) return undefined;
    if (tagName === "input") {
      if (item.legend || attr(node, "type")?.toLowerCase() !== "radio" ||
          attr(node, "disabled") !== undefined || attr(node, "form") !== undefined ||
          radios.length === MAX_OPTIONS) return undefined;
      radios.push({ element: node, wrapper });
      continue;
    }
    if (tagName === "label") {
      if (wrapper) return undefined;
      const target = attr(node, "for");
      if (target !== undefined) {
        if (!target || labels.has(target)) return undefined;
        labels.set(target, node);
      }
    } else if (!Object.hasOwn(TEXT_ELEMENTS, tagName) && !Object.hasOwn(LAYOUT_ELEMENTS, tagName)) {
      return undefined;
    } else if (tagName === "fieldset" && attr(node, "disabled") !== undefined) {
      return undefined;
    }
    for (let index = node.childNodes.length - 1; index >= 0; index--) {
      stack.push({
        node: node.childNodes[index]!,
        wrapper: tagName === "label" ? node : wrapper,
        legend: item.legend || tagName === "legend",
      });
    }
  }

  const name = radios[0] && attr(radios[0].element, "name");
  if (!name?.trim() || name.length > MAX_TEXT) return undefined;
  const ids = new Set<string>();
  const values = new Set<string>();
  const options: { label: string; value: string }[] = [];
  for (const { element, wrapper } of radios) {
    const id = attr(element, "id");
    if (id && ids.has(id)) return undefined;
    if (id) ids.add(id);
    const explicit = id ? labels.get(id) : undefined;
    // OMP 19.2.1 treats a matched label[for] as detached and skips its subtree.
    if ((wrapper && attr(wrapper, "for") !== undefined) || (wrapper && explicit)) {
      return undefined;
    }
    const labelElement = wrapper ?? explicit;
    if (labelElement && usedLabels.has(labelElement)) return undefined;
    if (labelElement) usedLabels.add(labelElement);
    let label = labelElement ? cleanText(labelText(labelElement)) : "";
    // An explicit label remains authoritative in OMP even if it has no text.
    if (!label && !explicit) {
      label = cleanText(attr(element, "aria-label") ?? attr(element, "title") ?? "");
    }
    const value = attr(element, "value") ?? "on";
    if (attr(element, "name") !== name || !label || label.length > MAX_TEXT ||
        value.length > MAX_TEXT || values.has(value)) return undefined;
    values.add(value);
    options.push({ label, value });
  }
  for (const label of labels.values()) if (!usedLabels.has(label)) return undefined;
  return { name, title: (cleanText(legends.join(" ")) || cleanText(prompt.join(" ")) || name)
    .slice(0, MAX_TEXT), options };
}

function labelText(root: Element): string {
  const stack: Child[] = root.childNodes.slice().reverse();
  const text: string[] = [];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if ("value" in node) text.push(node.value);
    if ("tagName" in node) {
      if (node.tagName === "br") text.push(" ");
      for (let index = node.childNodes.length - 1; index >= 0; index--) {
        stack.push(node.childNodes[index]!);
      }
    }
  }
  return text.join("");
}
