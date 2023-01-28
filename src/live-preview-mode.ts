import {
  ViewUpdate,
  PluginValue,
  ViewPlugin,
} from "@codemirror/view";
import { MarkdownRenderer } from "obsidian";
import { plugin } from "./main";

class _LivePreviewModeRenderer implements PluginValue {
  prevEditingMode: string;


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


  update (update: ViewUpdate) {

    // Unhide hidden blocks if the user has switched from Live Preview mode to Source mode
    const currentEditingMode = app?.workspace?.activeLeaf?.getViewState().state.source ? "source" : "preview";
    if (this.prevEditingMode === "preview") {
      if (currentEditingMode === "source") {
        app.workspace.iterateRootLeaves((leaf) => {
          // Ensure that every block of the container is displayed
          //@ts-ignore
          for (const element of leaf.view.containerEl.querySelector(".cm-content")?.children) {
            //@ts-ignore
            element.style.removeProperty("display");
          }
        });
      }
    }
    this.prevEditingMode = currentEditingMode;

    // If the editor content has changed unhide all hidden elements
    if (update.docChanged) {

      // Retrieve the blocks' container element
      const blocksContainer = update.view.contentDOM;

      for (const block of blocksContainer.children) {
        //@ts-ignore
        block.style.removeProperty("display");
      }
    }

    // Proceed to render only if the update has changed the cursor position on the document (performance reasons)
    if (update.selectionSet) {

      // Retrieve the blocks' container element
      const blocksContainer = update.view.contentDOM;

      // Iterate over each block of the view
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

            // If the code block scope is active
            if (active) {

              // If compatibility mode is enabled display the next block elements again
              if (plugin?.settings.get("compatibilityMode")) {
                console.log("unhide next block elements");
                console.log(nextBlockElements);
                for (const element of nextBlockElements) {
                  element.style.removeProperty("display");
                }
              }

              // Else display the class code block again
              else {
                //@ts-ignore
                block.style.removeProperty("display");
              }
            }

            // Else if the code block is not active
            else {

              // Retrieve the custom class name
              const customClass = codeBlock.innerText.trim().replace(plugin?.settings.get("customClassAnchor"), "").trim();
              console.log(customClass);
              console.log(nextBlockElements);

              // If compatibility mode is enabled simulate reading mode render
              if (plugin?.settings.get("compatibilityMode")) {

                // Reset the block HTML
                block.innerHTML = "";

                // Retrieve the Markdown file lines
                let markdownLines: Array<string> = [];
                if (update.state.doc.children) {
                  for (const childDoc of update.state.doc.children) {
                    //@ts-ignore
                    markdownLines = [...markdownLines, ...childDoc.text];
                  }
                }
                else {
                  //@ts-ignore
                  markdownLines = update.state.doc.text;
                }

                // Loop through every next block elements
                let markdown = "";
                for (const element of nextBlockElements) {

                  // Hide the element from the render
                  element.style.display = "none";


                  // Build the element markdown
                  //@ts-ignore
                  markdown += markdownLines[blocksContainer.indexOf(element)] + "\n";
                }

                // Render markdown into the custom class block
                MarkdownRenderer.renderMarkdown(
                  markdown,
                  block as HTMLElement,
                  "",
                  //@ts-ignore
                  null);

                // Append the class to the custom class block
                block.className = customClass;
              }

              // Else simply add the custom class to the next element sibling
              else {

                // Hide the class block
                //@ts-ignore
                block.style.display = "none";

                // Add class to the next element
                nextBlockElements[0].classList.add(customClass);
              }
            }
          }
        }
      }
    }
  }
}

export const LivePreviewModeRenderer = ViewPlugin.fromClass(_LivePreviewModeRenderer);