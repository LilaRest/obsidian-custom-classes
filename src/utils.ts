
export function isCustomClassBlock (codeEl: HTMLElement): boolean {
  return Boolean(codeEl && codeEl.innerText && /\s*((class|cls):\s*|\.)([a-zA-Z\-_]+[a-zA-Z\-_0-9]*(\s*\,\s*)?)+\s*/g.test(codeEl.innerText.trim()));
}

export function retrieveCustomClasses (codeEl: HTMLElement | null): Array<string> {
  return codeEl ? codeEl.innerText
    .replaceAll(" ", "")
    .replace("class:", "")
    .replace("cls:", "")
    .replace(".", "")
    .split(",") : [];
}