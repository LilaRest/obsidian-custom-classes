import {
  ViewUpdate,
  PluginValue,
  ViewPlugin,
} from "@codemirror/view";
import { Component, MarkdownRenderer } from "obsidian";
import { plugin } from "./main";

class _LivePreviewModeRenderer implements PluginValue {

  getNextBlockElements (block: any) {
    const nextBlockElements = [];

    // Retrieve the next element sibling
    let nextElement = block.nextElementSibling;

    // If the nextElement is not null and is not a line return
    if (nextElement && nextElement.className !== "cm-line") {

      // Push the nextElement to the nextBlockElements list
      nextBlockElements.push(nextElement);

      // If the nextElement is a list item
      if (nextElement.classList.contains("HyperMD-list-line")) {

        // And if the groupListItemInLivePreview settings is set 
        if (plugin?.settings.get("groupListItemInLivePreview")) {

          // Retrieve list type
          const listType = nextElement.querySelector(".cm-formatting-list-ul") ? "ul" : "ol";

          // Also append all others items of the list to nextBlockElements
          while (true) {
            nextElement = nextBlockElements[nextBlockElements.length - 1].nextElementSibling;

            // Retrieve next element list type 
            const nextElementListType = nextElement.querySelector(".cm-formatting-list-ul") ? "ul" : "ol";

            // Break if the nextElement is null, or not a list item or not of the same list type
            if (!nextElement || !nextElement.classList.contains(`HyperMD-list-line`) || nextElementListType !== listType) break;

            // Else append the element
            nextBlockElements.push(nextElement);
          }
        }
      }
    }

    return nextBlockElements;
  }

  update (update: ViewUpdate) {
    console.log(update);
    // Retrieve the blocks' container element 
    const blocksContainer = update.view.contentDOM;

    // Iterate over each block of the view
    for (const block of blocksContainer.children) {

      // If the block is a custom class block
      const codeBlock: HTMLElement | null = block.querySelector('span.cm-inline-code');
      if (codeBlock && codeBlock.innerText.trim().startsWith(plugin?.settings.get("customClassAnchor"))) {

        // Retrieve the list of elements that composes the next block
        const nextBlockElements = this.getNextBlockElements(block);

        // Build the code block scope elements
        const scopeElements = [block, ...nextBlockElements];

        // Retrieve whether the codeBlock or the next block are active or not
        const active = scopeElements.find(el => el.classList.contains("cm-active")) ? true : false;

        // If the code block scope is active
        if (active) {
          for (const element of nextBlockElements) {
            element.style.removeProperty("display");
          }
        }

        // Else if the code block is not active
        else {

          // Reset the block HTML
          block.innerHTML = "";

          // Loop through every next block elements
          let markdown = "";
          for (const element of nextBlockElements) {

            // Hide the element from the render
            element.style.display = "none";

            // Build the element markdown
            //@ts-ignore
            markdown += update.state.doc.text[blocksContainer.indexOf(element)];
            markdown += "\n";
          }

          // Render markdown into the custom class block
          MarkdownRenderer.renderMarkdown(
            markdown,
            block as HTMLElement,
            "",
            //@ts-ignore
            null);

          // Retrieve the custom class name
          const customClass = codeBlock.innerText.trim().replace(plugin?.settings.get("customClassAnchor"), "").trim();

          // Append the class to the custom class block
          block.className = customClass;
        }
      }
    }
  }
}
export const LivePreviewModeRenderer = ViewPlugin.fromClass(_LivePreviewModeRenderer);