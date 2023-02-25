import { ccBlockRegexGlob } from "./utils";

/**
 * This class contains some utils to deal with Markdown raw text lines
 */
export class MDLine {

  static isEmpty (lineText: string): boolean {
    return lineText.trim() === "";
  }

  static isListItem (lineText: string): Array<boolean | string | null> {
    let listType = null;
    if (/^( *)(\-)( +)(.*)/.test(lineText)) listType = "ul";
    else if (/^( *)(\d+[\.\)])( +)(.*)/.test(lineText)) listType = "ol";
    const isList = listType ? true : false;
    return [isList, listType];
  }

  static isCodeBlockBound (lineText: string): boolean {
    return lineText.trim().startsWith("```");
  }

  static isTableRow (lineText: string): boolean {
    return lineText.trim().startsWith("|") && lineText.trim().endsWith("|");
  }

  static isBlockquote (lineText: string): boolean {
    return lineText.trim().startsWith(">");
  }

  static findCustomClassesBlocks (lineText: string): Array<string> {
    const customClassesBlocks: Array<string> = [];
    [...lineText.matchAll(ccBlockRegexGlob)]
      .forEach(m => customClassesBlocks.push(m[0]));
    return customClassesBlocks;
  }
}