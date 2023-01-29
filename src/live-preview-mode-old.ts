import { MarkdownRenderer } from "obsidian";
import { plugin } from "./main";
import { syntaxTree } from "@codemirror/language";
import { RangeSetBuilder } from "@codemirror/state";
import {
  Decoration,
  DecorationSet,
  EditorView,
  PluginSpec,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";

class DefaultRenderWidget extends WidgetType {

  constructor (customClass: string) {
    super();
  }

  toDOM (view: EditorView): HTMLElement {
    const div = document.createElement("div");

    div.innerText = "👉";

    return div;
  }
}

class HideWidget extends WidgetType {
  toDOM () {
    return document.createElement("div");
  }
}

class CompatibilityModeRenderWidget extends WidgetType {
  customClass: string;
  livePreviewBlocks: Array<HTMLElement>;

  constructor (customClass: string, livePreviewBlocks: Array<HTMLElement>) {
    super();
    this.customClass = customClass;
    this.livePreviewBlocks = livePreviewBlocks;
    console.log(livePreviewBlocks);
  }

  toDOM (view: EditorView): HTMLElement {
    // Create the Read mode render element
    const readModeRender = document.createElement("div");
    readModeRender.classList.add(
      "custom-classes-renderer",
      this.customClass,
    );

    // Loop through every next block elements
    let markdown = "";
    for (const element of this.livePreviewBlocks) {

      // Hide the element from the render
      element.style.display = "none";


      // Build the element markdown
      //@ts-ignore
      console.log(update);
      markdown += view.state.doc.line(view.contentDOM.indexOf(element) + 1).text + "\n";
    }

    // Render markdown into the custom class block
    MarkdownRenderer.renderMarkdown(
      markdown,
      readModeRender,
      "",
      //@ts-ignore
      null);

    return readModeRender;
  }
}

export class _CustomClassesPlugin implements PluginValue {
  decorations: DecorationSet;

  constructor (view: EditorView) {
    this.decorations = this.buildDecorations(view);
  }

  update (update: ViewUpdate) {
    if (update.selectionSet || update.docChanged || update.viewportChanged) {
      this.decorations = this.buildDecorations(update.view);
    }
  }

  /**
   * Returns an array of the blocks that are in the scope of a given custom class block
   * @param classBlock HTMLElement
   * @returns scopeBlocks Array<HTMLElement>
   */
  getScopeBlocks (classBlock: HTMLElement) {

    // Create the array that will host all the blocs of the scope
    const scopeBlocks: Array<HTMLElement> = [];

    // Retrieve the first block of the scope
    const firstBlock = classBlock.nextElementSibling as HTMLElement;

    // If the first block is neither null nor a line break
    if (firstBlock && firstBlock.innerHTML !== "<br>") {

      // Append it to the scope blocks list
      scopeBlocks.push(firstBlock);

      // If the first block is a list item and the 'groupListItemInLivePreview' option is set
      if (firstBlock.classList.contains("HyperMD-list-line") && plugin?.settings.get("compatibilityMode")) {

        // Retrieve the first block list type
        const firstBlockListType = firstBlock.querySelector(".cm-formatting-list-ul") ? "ul" : "ol";

        // And loop to append all others items of the list to scopeBlocks array
        while (true) {

          // Retrieve nextBlock
          const nextBlock = scopeBlocks[scopeBlocks.length - 1].nextElementSibling as HTMLElement;

          // If the next block is neither null nor a line break
          if (nextBlock && firstBlock.innerHTML !== "<br>") {

            // Retrieve next block list type 
            const nextBlockListType = nextBlock.querySelector(".cm-formatting-list-ul") ? "ul" : "ol";

            // Break if the nextBlock is null, or not a list item or not of the same list type
            if (nextBlockListType !== firstBlockListType) break;

            // Else append the element
            scopeBlocks.push(nextBlock);
          }
          else {
            break;
          }
        }
      }
    }

    return scopeBlocks;
  }

  buildDecorations (view: EditorView): DecorationSet {
    const builder = new RangeSetBuilder<Decoration>();
    const blocksContainer = view.contentDOM;

    // Iterate over rendered blocks of the view
    for (const block of blocksContainer.children) {

      // If the block is a custom class block
      const codeBlock: HTMLElement | null = block.querySelector('span.cm-inline-code');
      if (codeBlock && codeBlock.innerText.trim().startsWith(plugin?.settings.get("customClassAnchor"))) {


        // Retrieve the list of elements that composes the next block
        const nextBlockElements = this.getScopeBlocks(block as HTMLElement);

        // If the custom class block target some elements
        if (nextBlockElements.length > 0) {

          // Retrieve whether the codeBlock or the next block are active or not
          const active = [block, ...nextBlockElements].find(el => el.classList.contains("cm-active")) ? true : false;

          // If the code block is not active render it
          if (!active) {

            // Retrieve the custom class name
            const customClass = codeBlock.innerText.trim().replace(plugin?.settings.get("customClassAnchor"), "").trim();

            // If compatibility mode is enabled simulate reading mode render
            if (plugin?.settings.get("compatibilityMode")) {
              builder.add(
                view.state.doc.line(blocksContainer.indexOf(block) + 1).from,
                view.state.doc.line(blocksContainer.indexOf(nextBlockElements[nextBlockElements.length - 1]) + 1).to,
                Decoration.replace({
                  widget: new CompatibilityModeRenderWidget(customClass, nextBlockElements),
                })
              );
            }

            // Else simply add the custom class to the next element sibling
            else {

              // Hide the class block element
              builder.add(
                view.state.doc.line(blocksContainer.indexOf(block) + 1).from,
                view.state.doc.line(blocksContainer.indexOf(block) + 1).to,
                Decoration.replace(HideWidget)
              );

              // Add class to the next element
              nextBlockElements[0].classList.add(customClass);
            }
          }
        }
      }
    }

    return builder.finish();
  }
}

const pluginSpec: PluginSpec<_CustomClassesPlugin> = {
  decorations: (value: _CustomClassesPlugin) => value.decorations,
};

export const CustomClassesPlugin = ViewPlugin.fromClass(_CustomClassesPlugin, pluginSpec);