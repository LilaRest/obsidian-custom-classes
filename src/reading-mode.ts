import { plugin } from "./main";
import { MDLine } from "./md-line";
import { MarkdownRenderChild, MarkdownRenderer } from "obsidian";
import { table } from "console";


export class TestRenderChild extends MarkdownRenderChild {
    constructor (containerEl: HTMLElement) {
        super(containerEl);
    }

    onload () {
        const nextBlock = this.containerEl.nextElementSibling;

        if (nextBlock) {

            const codeBlock = nextBlock.querySelector('code');

            if (!codeBlock || !codeBlock.innerText.trim().startsWith(plugin?.settings.get("customClassAnchor"))) {

                const customClass = this.containerEl.innerText.trim().replace(plugin?.settings.get("customClassAnchor"), "").trim();

                nextBlock.classList.add(customClass, "meta");
            }
        }

    }
}

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

                let lastClassBlock = null;
                let lastCustomClass = null;
                for (const block of blocksContainer.children) {


                    if (!block.getAttribute("cc-ignore")) {
                        // Reset the block classes
                        block.removeAttribute("class");
                    }

                    // Reset the block display
                    block.style.removeProperty("display");

                    // If the block is a custom class block
                    const codeBlock = block.querySelector('code');
                    if (codeBlock && codeBlock.innerText.trim().startsWith(plugin?.settings.get("customClassAnchor"))) {

                        // Retrieve the custom class name
                        const customClass = codeBlock.innerText.trim().replace(plugin?.settings.get("customClassAnchor"), "").trim();

                        /* If the code block is just above a table / a paragraph or any other element that requires a blank line above to be rendered separately in Read mode, render the element in the custom class block element.
                            
                        For tables that's a buggy behavior of the Obsidian Read mode, see: https://forum.obsidian.md/t/tables-arent-showing-up-in-reading-mode/35689, https://forum.obsidian.md/t/table-renders-in-editing-mode-live-preview-but-not-reading-mode/38667) */
                        const splitInnerText = block.innerText.split("\n");
                        splitInnerText.shift();
                        if (splitInnerText.length > 0) {
                            const markdown = splitInnerText.join("\n");
                            const renderBlock = document.createElement("div");

                            MarkdownRenderer.renderMarkdown(
                                markdown,
                                renderBlock,
                                "",
                                //@ts-ignore
                                null);

                            block.firstChild.replaceWith(renderBlock.firstChild);
                            block.classList.add(customClass);
                            block.setAttribute("cc-ignore", "true");
                        }

                        // In other cases
                        else {
                            // Store the custom class for the next block
                            lastCustomClass = customClass;

                            //
                            lastClassBlock = block;
                        }
                    }

                    else if (block.getAttribute("cc-ignore")) {

                        // Reset nextBlockClass
                        lastCustomClass = null;
                    }

                    else if (lastCustomClass) {

                        // Add the custom class
                        block.classList.add(lastCustomClass);

                        // Reset nextBlockClass
                        lastCustomClass = null;

                        // Remove the classBlock element from the render;
                        lastClassBlock.style.display = "none";
                    }
                }

                // Finally, stop listening for element insertion.
                observer.disconnect();
            }
        });
        observer.observe(blocksContainer, { attributes: false, childList: true, characterData: false, subtree: true });
    }
}