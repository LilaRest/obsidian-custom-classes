import { MarkdownRenderer } from "obsidian";
import { plugin } from "./main";
import {
  Extension,
  RangeSetBuilder,
  StateField,
  Transaction,
} from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  WidgetType,
} from "@codemirror/view";


class CompatibilityModeRenderWidget extends WidgetType {
  customClass: string;
  lineNumber: number;
  targettedLines: number;

  constructor (customClass: string, lineNumber: number, targettedLines: number) {
    super();
    this.customClass = customClass;
    this.lineNumber = lineNumber;
    this.targettedLines = targettedLines;
  }

  toDOM (view: EditorView): HTMLElement {

    // Create the Read mode render element
    const readModeRender = document.createElement("div");
    readModeRender.classList.add(
      "custom-classes-renderer",
      this.customClass,
    );

    // Loop through every next block elements
    let markdown = view.state.doc.slice(
      view.state.doc.line(this.lineNumber + 1).from,
      view.state.doc.line(this.lineNumber + this.targettedLines).to
      //@ts-ignore
    ).text.join("\n");

    // Render markdown into the custom class block
    MarkdownRenderer.renderMarkdown(
      markdown,
      readModeRender,
      "",
      //@ts-ignore
      null);

    return readModeRender;
  }

  ignoreEvent (e: Event | MouseEvent) {

    // Support clicks on links
    if (e.type === "mousedown") {
      e = e as MouseEvent;
      //@ts-ignore
      if (e.target?.nodeName === "A") {
        e.preventDefault();
        return true;
      }
    }
    return false;
  }
}


function isLineContent (line: any): boolean {
  return line.text.trim() !== "";
}

function isLineList (line: any): Array<boolean | string | null> {
  let listType = null;
  if (/^(\s*)(\-)(\s+)(.*)/.test(line.text)) listType = "ul";
  else if (/^(\s*)(\d+[\.\)])(\s+)(.*)/.test(line.text)) listType = "ol";
  const isList = listType ? true : false;
  return [isList, listType];
}

function isLineCodeblockBounds (line: any): boolean {
  return line.text.trim().startsWith("```");
}

function isTableLine (line: any): boolean {
  return line.text.trim().startsWith("|") && line.text.trim().endsWith("|");
}


function getTargettedLinesNumber (doc: any, lineNumber: number): number {
  let numberOfLines = 0;

  // Retrieve first line
  const firstLine = doc.line(lineNumber + 1);

  // Return numberOfLine if the firstLine is a line break or empty line
  if (!isLineContent(firstLine)) return numberOfLines;

  // Else increment the number of targetted lines
  numberOfLines++;

  // If first line is a list item
  const [firstLineIsList, firstListListType] = isLineList(firstLine);
  if (firstLineIsList) {

    // Iterate over next lines
    let lastListType = firstListListType;
    for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

      // Retrieve next line
      const nextLine = doc.line(firstLine.number + offset);

      // Return numberOfLines if the nextLine is a line break or empty line
      if (!isLineContent(nextLine)) return numberOfLines;

      // If nextLine is a list item
      const [nextLineIsList, nextListListType] = isLineList(nextLine);
      if (nextLineIsList) {

        // Return numberOfLines if the listType has changed
        if (lastListType !== nextListListType) return numberOfLines;

        // Else simply increment the numberOfLines
        numberOfLines++;

        // And update the last list item type
        lastListType = nextListListType;
      }

      // Else return the numberOfLines
      else return numberOfLines;
    }
  }

  // Else if first line is a multiline code block bounds
  else if (isLineCodeblockBounds(firstLine)) {

    // Iterate over next lines
    for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

      // Retrieve next line
      const nextLine = doc.line(firstLine.number + offset);

      // Increment the number of Lines
      numberOfLines++;

      // Return numberOfLines if the other bound is encoutered
      if (isLineCodeblockBounds(nextLine)) return numberOfLines;
    }
  }

  // Else if first line is a table
  else if (isTableLine(firstLine)) {

    // Iterate over next lines
    for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

      // Retrieve next line
      const nextLine = doc.line(firstLine.number + offset);

      // Return if the nextLine is not anymore a table line
      if (!isTableLine(nextLine)) return numberOfLines;

      // Else increment the numberOfLines
      numberOfLines++;
    }
  }

  // Else return the number of lines
  return numberOfLines;
}


export const customClassField = StateField.define<DecorationSet>({

  create (state): DecorationSet {
    return Decoration.none;
  },

  update (oldState: DecorationSet, tx: Transaction): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    // If live preview mode 
    const sourceViewEl = document.querySelector("div.markdown-source-view");
    if (sourceViewEl && sourceViewEl.classList.contains("is-live-preview")) {

      for (let i = 1; i <= tx.state.doc.lines; i++) {
        const line = tx.state.doc.line(i);

        // If the line is an inline code-block
        if (line.text.startsWith("`") && line.text.endsWith("`")) {

          // If the code block is a Custom Classes code block
          if (line.text.replace("`", "").trim().startsWith(plugin?.settings.get("customClassAnchor"))) {

            // Retrieve the list of elements that composes the next block
            const targettedLinesNumber = getTargettedLinesNumber(tx.state.doc, line.number);

            // If the custom class block target some lines
            if (targettedLinesNumber > 0) {

              // Retrieve whether the custom class line or the lines it targets are active
              let active = false;
              if (tx.selection) {
                const to = tx.state.doc.line(line.number + targettedLinesNumber).to;
                for (const range of tx.selection?.ranges) {
                  if (range.from >= line.from && range.to <= to) {
                    active = true;
                  }
                }
              }

              // If the code block is not active render it
              if (!active) {

                // Build the custom class name
                const customClass = line.text
                  .replaceAll("`", "")
                  .trim()
                  .replace(plugin?.settings.get("customClassAnchor"), "")
                  .trim();

                // If compatibility mode is enabled simulate reading mode render
                if (plugin?.settings.get("compatibilityMode")) {
                  builder.add(
                    line.from,
                    tx.state.doc.line(line.number + targettedLinesNumber).to,
                    Decoration.replace({
                      widget: new CompatibilityModeRenderWidget(
                        customClass,
                        line.number,
                        targettedLinesNumber
                      ),
                    })
                  );
                }

                // Else simply add the custom class to the next element sibling
                else {
                  builder.add(
                    line.from,
                    line.to,
                    Decoration.replace({})
                  );

                  // TODO addclass widget
                  // Add class to the next element
                  // nextBlockElements[0].classList.add(customClass);
                }
              }
            }
          }
        }
      }
    }
    return builder.finish();
  },

  provide (field: StateField<DecorationSet>): Extension {
    return EditorView.decorations.from(field);
  }
});