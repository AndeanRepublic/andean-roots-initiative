export function resetSplitText(root: HTMLElement, selector: string) {
  root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const originalText = el.dataset.originalText;
    if (originalText !== undefined) {
      el.textContent = originalText;
    }
  });
}

export function splitChars(element: HTMLElement, className: string) {
  const text = element.textContent ?? '';
  element.dataset.originalText = text;
  element.textContent = '';

  const fragment = document.createDocumentFragment();
  const nodes: HTMLElement[] = [];

  for (const char of text) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = char;
    fragment.appendChild(span);
    nodes.push(span);
  }

  element.appendChild(fragment);
  return nodes;
}

export function splitWords(element: HTMLElement, className: string) {
  const text = element.textContent ?? '';
  element.dataset.originalText = text;
  element.textContent = '';

  const fragment = document.createDocumentFragment();
  const nodes: HTMLElement[] = [];
  const parts = text.match(/\S+\s*/g) ?? [];

  parts.forEach((part) => {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = part;
    fragment.appendChild(span);
    nodes.push(span);
  });

  element.appendChild(fragment);
  return nodes;
}
