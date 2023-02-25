export const ccBlockRegex = /` *((class|cls): *|\.)([a-zA-Z\-_]+[a-zA-Z\-_0-9]*( *\, *)?)+ *`/;

export const ccBlockRegexGlob = new RegExp(ccBlockRegex.source, "g");

export function isCustomClassBlock (codeEl: HTMLElement): boolean {
  if (!codeEl) return false;
  const mdCodeBlock = "`" + codeEl.innerText + "`";
  return ccBlockRegex.test(mdCodeBlock);
}

export function retrieveCustomClasses (ccBlockText: string): Array<string> {
  return ccBlockText
    .replaceAll("`", "")
    .replaceAll(" ", "")
    .replaceAll("\n", "")
    .replace("class:", "")
    .replace("cls:", "")
    .replace(".", "")
    .split(",");
}