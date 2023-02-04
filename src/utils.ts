
export function isCustomClassBlock (codeEl: HTMLElement): boolean {
  return Boolean(codeEl && codeEl.innerText && /class:\s*([a-zA-Z\-_]+[a-zA-Z\-_0-9]*(\s*\,\s*)?)+\s*/.test(codeEl.innerText.trim()));
}

export function retrieveCustomClasses (codeEl: HTMLElement | null): Array<string> {
  return codeEl ? codeEl.innerText
    .replaceAll(" ", "")
    .replace("class:", "")
    .split(",") : [];
}