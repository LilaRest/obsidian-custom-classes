import { plugin } from "./main";
import { MarkdownRenderer } from "obsidian";


function isCustomClassBlock (codeEl: HTMLElement): boolean {
    return codeEl && codeEl.innerText.trim().startsWith("class:");
}

function retrieveCustomClasses (codeEl: HTMLElement | null): Array<string> {
    return codeEl ? codeEl.innerText
        .replaceAll(" ", "")
        .replace("class:", "")
        .split(",") : [];
}


export function customClassReadMode (element: any, context: any) {

    // Retrieve the blocks' container element 
    const blocksContainer = context.containerEl;

    /* 
     That if statement limits the scope to elements that are directly inserted into a Markdown preview section. 
     Without this :
      - Some plugins that rely on MarkdownRenderer.renderMarkdown() method will be broken (e.g. for Dataview see : https://github.com/LilaRest/obsidian-custom-classes/issues/1)
      - The post-processor will process much more elements that what is really needed, impacting performances
    */
    if (blocksContainer.classList.contains("markdown-preview-section")) {

        // Listen for the element insertion into the blocks' container
        const observer = new MutationObserver(() => {

            // If the element has been inserted
            if (blocksContainer.contains(element)) {

                // Loop over every inserted block
                let lastCustomClassesBlock: null | HTMLElement = null;
                for (const block of blocksContainer.children) {

                    // Set up a function that applies the last custom classes to the block
                    function applyLastCustomClasses () {
                        if (lastCustomClassesBlock) {

                            // Ignore block with already rendered classes (cc-ignore) and footer of the note
                            if (!block.getAttribute("cc-ignore") && !block.classList.contains("mod-footer")) {

                                // Add the custom classes
                                block.classList.add(...retrieveCustomClasses(lastCustomClassesBlock.querySelector("code")));

                                // Remove the classBlock element from the render;
                                lastCustomClassesBlock.style.display = "none";
                            }
                            // Reset lastClassEl
                            lastCustomClassesBlock = null;
                        }
                    }

                    // Clone the block element for manipulating without affecting it
                    const clonedBlock = block.cloneNode(true);

                    // If the cloned block contains a custom class block
                    const codeEl = clonedBlock.querySelector('code');
                    if (isCustomClassBlock(codeEl)) {

                        // Remove the custom class block for the clone block
                        codeEl.remove();

                        // Support standalone custom class blocks
                        const blockHTML = clonedBlock.innerHTML.trim();
                        if (blockHTML === "<p></p>") lastCustomClassesBlock = block;

                        // Support custom class block nested in a bigger block
                        else {

                            // If this bigger block is a paragraph
                            if (blockHTML.startsWith("<p>")) {

                                /* Render the paragraph content as Markdown in case it as not been properly rendered the first time (e.g. tables require a blank line above them in Obsidian's Read mode, see this bug report : https://forum.obsidian.md/t/table-renders-in-editing-mode-live-preview-but-not-reading-mode/38667)
                                */
                                block.innerHTML = "";
                                MarkdownRenderer.renderMarkdown(
                                    clonedBlock.innerText.trim(),
                                    block,
                                    "",
                                    //@ts-ignore
                                    null);
                                block.classList.add(...retrieveCustomClasses(codeEl));
                                block.setAttribute("cc-ignore", "true");
                            }

                            // Else if it's any other element
                            else {

                                // Apply last custom classes to it
                                applyLastCustomClasses();

                                // And apply the nested custom classes block's classes to the nearest parent element
                                // (e.g. This allows to add custom classes to a single element of a list)
                                const realCodeEl = block.querySelector('code');
                                realCodeEl.parentElement.classList.add(...retrieveCustomClasses(codeEl));
                                realCodeEl.style.display = "none";
                            }
                        }
                    }

                    // Else apply the last custom classes to it
                    else applyLastCustomClasses();
                }

                // Finally, stop listening for element insertion
                observer.disconnect();
            }
        });
        observer.observe(blocksContainer, { attributes: false, childList: true, characterData: false, subtree: true });
    }
}