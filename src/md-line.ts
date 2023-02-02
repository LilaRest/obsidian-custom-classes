/**
 * This class contains some utils to deal with Markdown raw text lines
 */
export class MDLine {

  static isEmpty (lineText: string): boolean {
    return lineText.trim() === "";
  }

  static isListItem (lineText: string): Array<boolean | string | null> {
    let listType = null;
    if (/^(\s*)(\-)(\s+)(.*)/.test(lineText)) listType = "ul";
    else if (/^(\s*)(\d+[\.\)])(\s+)(.*)/.test(lineText)) listType = "ol";
    const isList = listType ? true : false;
    return [isList, listType];
  }

  static isCodeBlockBound (lineText: string): boolean {
    return lineText.trim().startsWith("```");
  }

  static isTableRow (lineText: string): boolean {
    return lineText.trim().startsWith("|") && lineText.trim().endsWith("|");
  }

  static findCustomClassesBlock (lineText: string): string | null {
    const regexpExtraction = lineText.match(/`class:\s*([a-zA-Z\-_]+[a-zA-Z\-_0-9]*(\s*\,\s*)?)+\s*`/);
    return regexpExtraction ? regexpExtraction[0] : null;
  }
}