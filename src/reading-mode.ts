import { plugin } from "./main";

export function readingModeRenderer (element: any, context: any) {

    // Retrieve the blocks' container element 
    const blocksContainer = context.containerEl;

    /* That if statement limits the scope the elements (rendered Markdown blocks) that are directly inserted into a Markdown preview section. 
    Without this :
      - Some plugins that use the MarkdownRenderer.renderMarkdown() method will be broken (e.g. for Dataview see : https://github.com/LilaRest/obsidian-custom-classes/issues/1)
      - The post processor will process much more elements that what is really needed, directly impacting performances
    */
    if (blocksContainer.classList.contains("markdown-preview-section")) {

        // Listen for insertion of the element into the blocks' container
        const observer = new MutationObserver(() => {

            // If the element has been inserted
            if (blocksContainer.contains(element)) {

                let nextBlockClass = null;
                for (const block of blocksContainer.children) {

                    // Reset the block classes
                    block.removeAttribute("class");

                    // If the block is a custom class block
                    const codeBlock = block.querySelector('code');
                    if (codeBlock && codeBlock.innerText.trim().startsWith(plugin?.settings.get("customClassAnchor"))) {

                        // Retrieve the custom class name
                        nextBlockClass = codeBlock.innerText.trim().replace(plugin?.settings.get("customClassAnchor"), "").trim();

                        // Remove the classBlock element from the render
                        block.style.display = "none";
                    }

                    else if (nextBlockClass) {

                        // Add the custom class
                        block.classList.add(nextBlockClass);

                        // Reset nextBlockClass
                        nextBlockClass = null;
                    }
                }

                // Finally, stop listening for element insertion.
                observer.disconnect();
            }
        });
        observer.observe(blocksContainer, { attributes: false, childList: true, characterData: false, subtree: true });
    }
}