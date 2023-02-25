
export function isCustomClassBlock (codeEl: HTMLElement): boolean {
  return Boolean(codeEl && codeEl.innerText && /\s*((class|cls):\s*|\.)([a-zA-Z\-_]+[a-zA-Z\-_0-9]*(\s*\,\s*)?)+\s*/g.test(codeEl.innerText.trim()));
}

export function retrieveCustomClasses (ccBlockText: string): Array<string> {
  return ccBlockText
    .replaceAll("`", "")
    .replaceAll(" ", "")
    .replace("class:", "")
    .replace("cls:", "")
    .replace(".", "")
    .split(",");
}