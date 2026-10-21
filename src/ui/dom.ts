/**
 * DOM micro-helpers — keeps components declarative without a framework.
 */
export type Child = Node | string | number | null | false | undefined;

export interface ElProps {
  class?: string;
  text?: string;
  lang?: string;
  style?: string;
  attrs?: Record<string, string | number | boolean | undefined>;
  dataset?: Record<string, string>;
  onClick?: (ev: MouseEvent) => void;
  onChange?: (ev: Event) => void;
  title?: string;
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: ElProps | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (props) {
    if (props.class) node.className = props.class;
    if (props.text !== undefined) node.textContent = String(props.text);
    if (props.title) node.title = props.title;
    if (props.lang) node.lang = props.lang;
    if (props.style) node.setAttribute('style', props.style);
    if (props.attrs) {
      for (const [k, v] of Object.entries(props.attrs)) {
        if (v === undefined || v === false) continue;
        node.setAttribute(k, String(v));
      }
    }
    if (props.dataset) {
      for (const [k, v] of Object.entries(props.dataset)) node.dataset[k] = v;
    }
    if (props.onClick) node.addEventListener('click', props.onClick as EventListener);
    if (props.onChange) node.addEventListener('change', props.onChange as EventListener);
  }
  append(node, children);
  return node;
}

export function append(parent: Node, children: Child[]): void {
  for (const c of children) {
    if (c === null || c === undefined || c === false) continue;
    parent.appendChild(typeof c === 'object' && 'nodeType' in c ? (c as Node) : document.createTextNode(String(c)));
  }
}

export function clear(node: Element): void {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/** "English · 中文" label span used across the bilingual UI. */
export function biLabel(en: string, zh: string, opts?: { class?: string }): HTMLSpanElement {
  return el('span', { class: opts?.class ?? 'bi' }, el('span', { class: 'bi-en', text: en }), ' ', el('span', { class: 'bi-zh', text: zh }));
}

/**
 * Split `text` around every occurrence of `focus`, wrapping matches in
 * <mark> — used to highlight the target word inside example sentences and
 * the grammar focus inside structure formulas.
 */
export function highlighted(
  text: string,
  focus?: string | string[],
  markClass = 'mark',
): Child[] {
  const focuses =
    typeof focus === 'string' ? (focus ? [focus] : []) : (focus ?? []).filter(Boolean);
  if (focuses.length === 0) return [text];
  const out: Child[] = [];
  let rest = text;
  for (;;) {
    let best = -1;
    let bestFocus = '';
    for (const f of focuses) {
      const i = rest.indexOf(f);
      if (i !== -1 && (best === -1 || i < best)) {
        best = i;
        bestFocus = f;
      }
    }
    if (best === -1) {
      if (rest) out.push(rest);
      break;
    }
    if (best > 0) out.push(rest.slice(0, best));
    out.push(el('mark', { class: markClass, text: bestFocus }));
    rest = rest.slice(best + bestFocus.length);
  }
  return out;
}

/** Format seconds as "1h 02m" / "12m 30s" / "45s". */
export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  if (m > 0) return `${m}m ${String(sec).padStart(2, '0')}s`;
  return `${sec}s`;
}

/** Format an ISO timestamp as a short local date-time. */
export function formatDateTime(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
