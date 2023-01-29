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

function getTargettedLinesNumber (doc: any, lineNumber: number): number {
  let numberOfLines = 0;
  let lastLineWasList = false;
  let lastListType = null;

  for (let offset = 1; lineNumber + offset <= doc.lines; offset++) {

    // Break if one line is already targetted but wasn't a list item
    if (numberOfLines > 0 && !lastLineWasList) break;

    // Retrieve line
    const line = doc.line(lineNumber + offset);

    // Break if the line is empty
    if (line.text.trim() === "") break;

    // Figure whether the line is a list item and if yes, its type
    let listType = null;
    if (/^(\s*)(\-)(\s+)(.*)/.test(line.text)) listType = "ul";
    else if (/^(\s*)(\d+[\.\)])(\s+)(.*)/.test(line.text)) listType = "ol";
    const isList = listType ? true : false;

    // Break if the 
    if (lastLineWasList && listType !== lastListType) break;

    // Increment the number of lines
    numberOfLines++;

    // Update last list was line and last list type
    lastLineWasList = isList;
    lastListType = listType;
  }

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