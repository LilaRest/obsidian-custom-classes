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
class RendererWidget extends WidgetType {
  customClasses: Array<string>;
  linesText: Array<string>;

  constructor (customClasses: Array<string>, linesText: Array<string>) {
    super();
    this.customClasses = customClasses;
    this.linesText = linesText;
  }

  eq (widget: RendererWidget): boolean {
    if (widget.customClasses.every((v, i) => v === this.customClasses[i])) {
      if (widget.linesText.every((v, i) => v === this.linesText[i])) {
        return true;
      }
    }
    return false;
  }

  toDOM (view: EditorView): HTMLElement {

    // Create the Read mode render element
    const ccRenderer = document.createElement("div");
    ccRenderer.classList.add("cc-container");

    // 
    const renderedMarkdown = document.createElement("div");
    renderedMarkdown.classList.add(
      "markdown-rendered",
      "cc-renderer",
      ...this.customClasses
    );
    ccRenderer.appendChild(renderedMarkdown);

    // Render markdown into the custom class block
    MarkdownRenderer.renderMarkdown(
      this.linesText.join("\n"),
      renderedMarkdown,
      "",
      //@ts-ignore
      null);

    return ccRenderer;
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

    // Return numberOfLine if the firstLine is also a standalone custom classes block
    const firstLineCCBlocks = MDLine.findCustomClassesBlocks(firstLine.text);
    if (firstLineCCBlocks.length === 1 && firstLine.text.trim().replace(firstLineCCBlocks[0], "") === "") return numberOfLines;

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

        // Return numberOfLine if the nextLine is also a standalone custom classes block
        const nextLineCCBlocks = MDLine.findCustomClassesBlocks(nextLine.text);
        if (nextLineCCBlocks.length === 1 && nextLine.text.trim().replace(nextLineCCBlocks[0], "") === "") return numberOfLines;

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

    else if (MDLine.isBlockquote(firstLine.text)) {
      // Iterate over next lines
      for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

        // Retrieve next line
        const nextLine = doc.line(firstLine.number + offset);

        // Return numberOfLines if the nextLine is a line break or empty line
        if (MDLine.isEmpty(nextLine.text)) return numberOfLines;

        // Else increment the numberOfLines
        numberOfLines++;
      }
    }
  }

  // Else return the number of lines
  return numberOfLines;
}

function retrieveCustomClasses (customClassesBlock: string): Array<string> {
  return customClassesBlock
    .replaceAll("`", "")
    .replaceAll(" ", "")
    .replace("class:", "")
    .replace("cls:", "")
    .split(",");
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

    // If Live Preview mode is used
    const sourceViewEl = document.querySelector("div.markdown-source-view");
    if (sourceViewEl && sourceViewEl.classList.contains("is-live-preview")) {

      // Loop over each line of the Markdown note
      let nextJump = 1;
      for (let i = 1; i <= tx.state.doc.lines; i += nextJump) {
        nextJump = 1;

        // Retrieve the line object
        const line = tx.state.doc.line(i);

        // Set up many vars that will be filled and then used to call the renderer widget
        let replacedRangeFrom = line.from;
        let replacedRangeTo = line.to;
        let renderedRangeFrom = line.from;
        let renderedRangeTo = line.to;
        let customClasses: Array<string> = [];
        let doNotRender = false;

        // Retrieve the Custom Classes blocks contained in that line
        const ccBlocks = MDLine.findCustomClassesBlocks(line.text);

        if (ccBlocks.length > 0) {

          // If the line is a standalone ccBlock
          if (ccBlocks.length === 1 && line.text.trim().replace(ccBlocks[0], "") === "") {

            // Retrieve the number of lines targetted by the standalone ccBlock
            const targettedLinesNumber = getTargettedLinesNumber(tx.state.doc, line.number);

            // If the custom class block targets some lines
            if (targettedLinesNumber > 0) {

              // Retrieve the custom classes
              customClasses = retrieveCustomClasses(ccBlocks[0]);

              // Update replaced range to 
              replacedRangeTo = tx.state.doc.line(line.number + targettedLinesNumber).to;

              // Update the renderer range to and from
              renderedRangeTo = replacedRangeTo;
              renderedRangeFrom = tx.state.doc.line(line.number + 1).from;

              // Jump already processed lines
              nextJump = targettedLinesNumber;
            }

            else doNotRender = true;
          }

          // If the content of the replaced range is not active
          if (!isRangeActive(tx, replacedRangeFrom, replacedRangeTo)) {

            // Initiate the render
            if (!doNotRender) {
              builder.add(
                replacedRangeFrom,
                replacedRangeTo,
                Decoration.replace({
                  widget: new RendererWidget(
                    customClasses,
                    tx.state.doc.slice(
                      renderedRangeFrom,
                      renderedRangeTo
                      //@ts-ignore
                    ).text
                  )
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