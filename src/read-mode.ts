import { MarkdownRenderer } from "obsidian";
import { isCustomClassBlock, retrieveCustomClasses } from "./utils";

/**
 * This function retrieves and returns all the CC blocks from a given element
 * @param block
 * @returns ccBlocks
 */
function getAllCCBlocks (block: HTMLElement): Array<HTMLElement> {
    const ccBlocks: Array<HTMLElement> = [];
    block.querySelectorAll('code').forEach(e => {
        if (isCustomClassBlock(e)) ccBlocks.push(e);
    });
    return ccBlocks;
}

/** 
 * This function applies the custom classes contained in a given ccBlock to a given targetBlock
 * @param targetBlock
 * @param ccBlock
 */
function applyLastCC (targetBlock: HTMLElement, ccBlock: HTMLElement) {

    // Ignore standalone classes and footer of the note
    if (!targetBlock.getAttribute("cc-standalone") && !targetBlock.classList.contains("mod-footer")) {

        // Add the custom classes
        const classes = retrieveCustomClasses(ccBlock.innerText);
        targetBlock.classList.add(...classes);
        targetBlock.setAttribute("cc-classes", classes.join(","));

        // Remove the classBlock element from the render;
        if (ccBlock.parentElement) {

            const htmlWithoutCCBlock = ccBlock.parentElement.innerHTML.replace(ccBlock.outerHTML, "").trim();

            // If the CC block was the only element of the parent, hide the whole parent
            if (htmlWithoutCCBlock === "") ccBlock.parentElement.style.display = "none";

            // Else only hide the CC block
            else ccBlock.style.display = "none";
        }
    }
}

function isLineBreak (element: ChildNode | HTMLElement | null): boolean {
    return Boolean(element && (element.nodeValue === "\n" || element.nodeName === "BR"));
}


function process (blocksContainer: HTMLElement, element: HTMLElement, callFromLivePreview: boolean) {

    // If the element has been inserted
    if (blocksContainer.contains(element)) {

        // This variable will hold the latest standalone CC block
        let lastCCBlock: null | HTMLElement = null;

        // Reset applied custom classes
        for (const block of blocksContainer.querySelectorAll("[cc-classes]")) {
            const classes = block.getAttribute("cc-classes");
            if (classes?.trim()) block.classList.remove(...classes.split(","));
        }

        // Loop over every inserted block
        for (const block of [...blocksContainer.children] as Array<HTMLElement>) {
            // Unhide and every custom classes block as unprocessed 
            for (const ccBlock of getAllCCBlocks(block)) {
                ccBlock.removeAttribute("cc-processed");
                ccBlock.parentElement?.style.removeProperty("display");
            }

            // This variable holds the new last cc blocks that will be applied after the while loop
            let newLastCCBlock = null;

            // Loop over the CC blocks until all of them have been rendered (changesOccured === false)
            let haveChangesOccured = true;
            while (haveChangesOccured) {
                haveChangesOccured = false;

                let nextIsNonNestedFirstBlock = false;
                for (const ccBlock of getAllCCBlocks(block)) {

                    // If the custom classes block has been inserted but not already processed
                    // --> Ignore insertion check if called from Live Preview
                    if ((ccBlock.isConnected || callFromLivePreview) && !ccBlock.getAttribute("cc-processed")) {

                        let isStandalone = false;
                        let isNonNestedLast = false;
                        let isNonNestedFirst = false;
                        let isNested = false;
                        const parent = ccBlock.parentElement as HTMLElement;
                        const parentParent = ccBlock.parentElement?.parentElement as HTMLElement;

                        // If the parent's parent is a direct child of the blocksContainer, else consider the ccBlock as nested (e.g. in a blockquote)
                        if ((!callFromLivePreview && [...blocksContainer.children].contains(parentParent)) || (callFromLivePreview && [...blocksContainer.children].contains(parent))) {

                            // Trim leading and trailing space from the parent
                            const clonedParent = parent.cloneNode(true) as HTMLElement;
                            clonedParent.innerHTML = clonedParent.innerHTML.trim();

                            // Figure the position of the ccBlock in its parent
                            const isFirst = clonedParent.innerHTML.startsWith(ccBlock.outerHTML);
                            const isLast = clonedParent.innerHTML.endsWith(ccBlock.outerHTML);
                            const prevIsLineBreak = Boolean(ccBlock.previousSibling) && isLineBreak(ccBlock.previousSibling);
                            const nextIsLineBreak = Boolean(ccBlock.nextElementSibling) && isLineBreak(ccBlock.nextSibling);

                            // Figure if this is a standalone ccBlock (alone on its line / not nested in other contents)
                            isStandalone = isFirst && isLast;
                            isNonNestedLast = isLast && !isFirst && prevIsLineBreak;
                            if (!isNonNestedLast) {
                                isNonNestedFirst = nextIsNonNestedFirstBlock || (isFirst && !isLast && nextIsLineBreak);
                            }
                            isNested = !(isStandalone && isNonNestedFirst && isNonNestedLast);
                        }

                        // If ccBlock is a sort standalone custom classes block (not a nested one)
                        if (isStandalone || isNonNestedFirst || isNonNestedLast) {
                            newLastCCBlock = ccBlock;

                            // Start by a standalone custom classes block
                            if (!isNonNestedLast) {
                                block.setAttribute("cc-standalone", "true");
                            }
                        }

                        // If it is a non-nested first block
                        if (isNonNestedFirst) {

                            // Note that we don't have to test if ccBlock.nextElementSibling is a <br> element because this is already done while figuring isNonNestedFirstBlock
                            if (!isCustomClassBlock(ccBlock.nextElementSibling?.nextElementSibling as HTMLElement)) {

                                // Build the remaining HTML after the current ccBlock has been removed
                                let remainingHTML = block.firstChild?.nodeName == "P" ? block.firstElementChild?.innerHTML : block.innerHTML;

                                if (remainingHTML) {
                                    remainingHTML = remainingHTML
                                        .replace(ccBlock.outerHTML, "")
                                        .replaceAll("<br>", "")
                                        .trim();

                                    /* If some contents remains, render it as Markdown in case it as not been properly rendered the first time (e.g. tables require a blank line above them in Obsidian's Read mode, see this bug report : https://forum.obsidian.md/t/table-renders-in-editing-mode-live-preview-but-not-reading-mode/38667)
                                    */
                                    if (remainingHTML?.replaceAll("\n", "") !== "") {
                                        block.innerHTML = "";
                                        MarkdownRenderer.renderMarkdown(
                                            remainingHTML,
                                            block,
                                            "",
                                            //@ts-ignore
                                            null);
                                        if (isNonNestedFirst) block.classList.add(...retrieveCustomClasses(ccBlock.innerText));
                                    }
                                }
                            }

                            // If the next element sibling is a CC block, don't render that one and consider the next one as non-nested first block
                            else {
                                newLastCCBlock = null;
                                nextIsNonNestedFirstBlock = true;
                            }
                        }

                        // Or if it is nested in the middle of a bigger block (a.k.a inline custom classes block)
                        if (!isStandalone && !isNonNestedFirst && !isNonNestedLast) {
                            if (ccBlock.parentElement) {

                                // Retrive the targetted parent element
                                let parentElement: HTMLElement = ccBlock.parentElement;
                                // Support list items
                                if (ccBlock.parentElement.parentElement) {
                                    if (ccBlock.parentElement.parentElement.nodeName === "LI") {
                                        parentElement = ccBlock.parentElement.parentElement;
                                    }
                                }
                                // Note: support of table cells is implicit since the `td` element is the first parent

                                // Append custom classes to the parent element
                                parentElement.classList.add(...retrieveCustomClasses(ccBlock.innerText));

                                // Hide the inline custom classes block
                                ccBlock.style.display = "none";
                            }
                        }

                        // Mark the CC block as processed and set haveChangesOccured
                        ccBlock.setAttribute("cc-processed", "true");
                        haveChangesOccured = true;
                    }
                }
            }

            // If the block is not a standalone custom classes block, apply last custom classes to it
            if (lastCCBlock) applyLastCC(block, lastCCBlock);
            lastCCBlock = newLastCCBlock;
        }
    }
}


export function customClassReadMode (element: HTMLElement, context: any) {

    // Retrieve the blocks' container element 
    const blocksContainer = context.containerEl;

    // If element has been inserted in Read mode's preview section
    if (blocksContainer.classList.contains("markdown-preview-section")) {

        // Listen for the element insertion into the blocks' container
        const observer = new MutationObserver(() => {

            // Render the custom classes of the element
            process(blocksContainer, element, false);

            // Finally, stop listening for element insertion
            observer.disconnect();
        });
        observer.observe(blocksContainer, { attributes: false, childList: true, characterData: false, subtree: true });
    }

    // Or if has been inserted in a Live Preview mode Custom Classes renderer
    else if (blocksContainer.classList.contains("cc-renderer")) {

        // Render the custom classes of the element
        process(blocksContainer, element, true);
    }
}
