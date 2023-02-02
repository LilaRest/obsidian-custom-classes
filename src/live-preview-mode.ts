import { MarkdownRenderer } from "obsidian";
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
import { MDLine } from "./md-line";


/**
 * This widget create a Markdown render in Read mode format and properly apply the given classes.
 */
class ReadModeWidget extends WidgetType {
  linesText: Array<string>;

  constructor (linesText: Array<string>) {
    super();
    this.linesText = linesText;
  }

  eq (widget: ReadModeWidget): boolean {
    if (widget.linesText.every((v, i) => v === this.linesText[i])) {
      return true;
    }
    return false;
  }

  toDOM (view: EditorView): HTMLElement {

    // Create the Read mode render element
    const readModeRender = document.createElement("div");
    readModeRender.classList.add(
      "cc-renderer",
    );

    // Render markdown into the custom class block
    MarkdownRenderer.renderMarkdown(
      this.linesText.join("\n"),
      readModeRender,
      "",
      //@ts-ignore
      null);

    for (const child of readModeRender.children) {
      const div = document.createElement("div");
      child.before(div);
      div.appendChild(child);
      for (const br of child.querySelectorAll("br")) {
        br.remove();
      }
    }

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


function getTargettedLinesNumber (doc: any, lineNumber: number): number {
  let numberOfLines = 0;

  // Retrieve first line
  if (doc.lines >= lineNumber + 1) {

    const firstLine = doc.line(lineNumber + 1);

    // Return numberOfLine if the firstLine is a line break or empty line
    if (MDLine.isEmpty(firstLine.text)) return numberOfLines;

    // Else increment the number of targetted lines
    numberOfLines++;

    // If first line is a list item
    const [firstLineIsList, firstListListType] = MDLine.isListItem(firstLine.text);
    if (firstLineIsList) {

      // Iterate over next lines
      let lastListType = firstListListType;
      for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

        // Retrieve next line
        const nextLine = doc.line(firstLine.number + offset);

        // Return numberOfLines if the nextLine is a line break or empty line
        if (MDLine.isEmpty(nextLine.text)) return numberOfLines;

        // If nextLine is a list item
        const [nextLineIsList, nextListListType] = MDLine.isListItem(nextLine.text);
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
    else if (MDLine.isCodeBlockBound(firstLine.text)) {

      // Iterate over next lines
      for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

        // Retrieve next line
        const nextLine = doc.line(firstLine.number + offset);

        // Increment the number of Lines
        numberOfLines++;

        // Return numberOfLines if the other bound is encoutered
        if (MDLine.isCodeBlockBound(nextLine.text)) return numberOfLines;
      }
    }

    // Else if first line is a table row
    else if (MDLine.isTableRow(firstLine.text)) {

      // Iterate over next lines
      for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

        // Retrieve next line
        const nextLine = doc.line(firstLine.number + offset);

        // Return if the nextLine is not anymore a table line
        if (!MDLine.isTableRow(nextLine.text)) return numberOfLines;

        // Else increment the numberOfLines
        numberOfLines++;
      }
    }
  }

  // Else return the number of lines
  return numberOfLines;
}

function isRangeActive (tx: Transaction, from: number, to: number): boolean {
  let isActive = false;

  // Detect if selection is in the concerned range
  if (tx.selection) {
    for (const range of tx.selection?.ranges) {
      if (range.from >= from && range.to <= to) {
        isActive = true;
        break;
      }
    }
  }

  // Detect if changes are touching the concerned range
  if (tx.changes.touchesRange(from, to)) {
    isActive = true;
  }
  return isActive;
}


export const customClassLivePreviewMode = StateField.define<DecorationSet>({

  create (state): DecorationSet {
    return Decoration.none;
  },

  update (oldState: DecorationSet, tx: Transaction): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();

    // If live preview mode 
    const sourceViewEl = document.querySelector("div.markdown-source-view");
    if (sourceViewEl && sourceViewEl.classList.contains("is-live-preview")) {

      // Loop over each line of the Markdown note
      for (let i = 1; i <= tx.state.doc.lines; i++) {

        // Retrieve the line object
        const line = tx.state.doc.line(i);

        // Find a custom classes block in that line
        const customClassesBlock = MDLine.findCustomClassesBlock(line.text);

        // If the line contains a custom class block
        if (customClassesBlock) {

          // Support standalone custom class blocks
          if (line.text.trim().replace(customClassesBlock, "") === "") {

            // Retrieve the list of elements that composes the next block
            const targettedLinesNumber = getTargettedLinesNumber(tx.state.doc, line.number);

            // If the custom class block target some lines
            if (targettedLinesNumber > 0) {

              // If the code block is not active render it
              const active = isRangeActive(tx, line.from, tx.state.doc.line(line.number + targettedLinesNumber).to);
              if (!active) {

                // Initiate the render
                builder.add(
                  line.from,
                  tx.state.doc.line(line.number + targettedLinesNumber).to,
                  Decoration.replace({
                    widget: new ReadModeWidget(
                      tx.state.doc.slice(
                        line.from,
                        tx.state.doc.line(line.number + targettedLinesNumber).to
                        //@ts-ignore
                      ).text
                    ),
                  })
                );
              }
            }
          }

          // Support custom class block nested in a bigger block
          else {

            // If the code block is not active render it
            const active = isRangeActive(tx, line.from, line.to);
            if (!active) {

              // Initiate the render
              builder.add(
                line.from,
                line.to,
                Decoration.replace({
                  widget: new ReadModeWidget([line.text]),
                })
              );
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