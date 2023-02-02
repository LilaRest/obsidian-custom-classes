
export function isCustomClassBlock (codeEl: HTMLElement): boolean {
  return codeEl && codeEl.innerText.trim().startsWith("class:");
}

export function retrieveCustomClasses (codeEl: HTMLElement | null): Array<string> {
  return codeEl ? codeEl.innerText
    .replaceAll(" ", "")
    .replace("class:", "")
    .split(",") : [];
}