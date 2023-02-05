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
        const classes = retrieveCustomClasses(ccBlock);
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


export function customClassReadMode (element: any, context: any) {

    // Retrieve the blocks' container element 
    const blocksContainer = context.containerEl;

    /* 
     Only consider elements inserted in Read mode section. This prevent :
      - breaking plugins that rely on MarkdownRenderer.renderMarkdown() (e.g. for Dataview see : https://github.com/LilaRest/obsidian-custom-classes/issues/1)
      - treating more elements that what is needed (performances)
    */
    if (blocksContainer.classList.contains("markdown-preview-section")) {

        // Listen for the element insertion into the blocks' container
        const observer = new MutationObserver(() => {

            // If the element has been inserted
            if (blocksContainer.contains(element)) {

                // This variable will hold the latest standalone CC block
                let lastCCBlock: null | HTMLElement = null;

                // Reset applied custom classes
                for (const block of blocksContainer.querySelectorAll("[cc-classes]")) {
                    const classes = block.getAttribute("cc-classes");
                    block.classList.remove(...classes.split(","));
                }

                // Loop over every inserted block
                for (const block of blocksContainer.children) {

                    // Reset ccBlock processing state and hiding
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

                            // If the custom classes block has not been already processed
                            if (ccBlock.isConnected && !ccBlock.getAttribute("cc-processed")) {

                                let isStandalone = false;
                                let isNonNestedLastBlock = false;
                                let isNonNestedFirstBlock = false;
                                const parent = ccBlock.parentElement;

                                // If the parent's parent is a direct child of the blocksContainer, else consider the ccBlock as nested
                                if ([...blocksContainer.children].contains(parent?.parentElement)) {
                                    isStandalone = parent?.firstChild === ccBlock && parent?.lastChild === ccBlock;

                                    isNonNestedLastBlock = parent?.lastChild === ccBlock && parent?.firstChild !== ccBlock && isLineBreak(ccBlock.previousSibling);

                                    if (!isNonNestedLastBlock) {
                                        isNonNestedFirstBlock = nextIsNonNestedFirstBlock || (parent?.firstChild === ccBlock && parent?.lastChild !== ccBlock && isLineBreak(ccBlock.nextSibling));

                                    }
                                }

                                // If ccBlock is a sort standalone custom classes block
                                if (isStandalone || isNonNestedFirstBlock || isNonNestedLastBlock) {
                                    newLastCCBlock = ccBlock;

                                    // Start by a standalone custom classes block
                                    if (!isNonNestedLastBlock) {
                                        block.setAttribute("cc-standalone", "true");
                                    }
                                }

                                // If it is a non-nested first block
                                if (isNonNestedFirstBlock) {

                                    // Note that we don't have to test that ccBlock.nextElementSibling is a <br> element
                                    // because this is already done while figuring isNonNestedFirstBlock
                                    if (!isCustomClassBlock(ccBlock.nextElementSibling?.nextElementSibling as HTMLElement)) {

                                        // Build the remaining HTML after the current ccBlock has been removed
                                        let remainingHTML = block.firstChild.nodeName == "P" ? block.firstChild.innerHTML : block.innerHTML;
                                        remainingHTML = remainingHTML
                                            .replace(ccBlock.outerHTML, "")
                                            .replaceAll("<br>", "")
                                            .trim();

                                        /* If some contents remains, render it as Markdown in case it as not been properly rendered the first time (e.g. tables require a blank line above them in Obsidian's Read mode, see this bug report : https://forum.obsidian.md/t/table-renders-in-editing-mode-live-preview-but-not-reading-mode/38667)
                                        */
                                        if (remainingHTML.replaceAll("\n", "") !== "") {
                                            block.innerHTML = "";
                                            MarkdownRenderer.renderMarkdown(
                                                remainingHTML,
                                                block,
                                                "",
                                                //@ts-ignore
                                                null);
                                            if (isNonNestedFirstBlock) block.classList.add(...retrieveCustomClasses(ccBlock));
                                        }
                                    }

                                    // If it is a non-nested first block
                                    if (isNonNestedLastBlock) {
                                    }

                                    // If the next element sibling is a CC block, don't render that one and consider the next one as non-nested first block
                                    else {
                                        newLastCCBlock = null;
                                        nextIsNonNestedFirstBlock = true;
                                    }
                                }

                                // Or if it is nested in the middle of a bigger block (a.k.a inline custom classes block)
                                if (!isStandalone && !isNonNestedFirstBlock && !isNonNestedLastBlock) {
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
                                        parentElement.classList.add(...retrieveCustomClasses(ccBlock));

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

                // Finally, stop listening for element insertion
                observer.disconnect();
            }
        });
        observer.observe(blocksContainer, { attributes: false, childList: true, characterData: false, subtree: true });
    }
}