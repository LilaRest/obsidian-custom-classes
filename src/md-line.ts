/**
 * This class contains some utils to deal with Markdown raw text lines
 */
export class MDLine {

  static isEmpty (line: any): boolean {
    return line.text.trim() === "";
  }

  static isListItem (line: any): Array<boolean | string | null> {
    let listType = null;
    if (/^(\s*)(\-)(\s+)(.*)/.test(line.text)) listType = "ul";
    else if (/^(\s*)(\d+[\.\)])(\s+)(.*)/.test(line.text)) listType = "ol";
    const isList = listType ? true : false;
    return [isList, listType];
  }

  static isCodeBlockBound (line: any): boolean {
    return line.text.trim().startsWith("```");
  }

  static isTableRow (line: any): boolean {
    return line.text.trim().startsWith("|") && line.text.trim().endsWith("|");
  }
}