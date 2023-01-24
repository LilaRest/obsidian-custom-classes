import { Plugin } from 'obsidian';
//
const CUSTOM_CLASS_ANCHOR = 'class:';

export default class extends Plugin {

    onload() {
        // Render the custom block classes
        this.registerMarkdownPostProcessor(
            (element, context) => {
                console.log(element)

                // Retrieve the blocks' container element 
                // @ts-ignore
                const blocksContainer = context.containerEl;
                
                // Listen for insertion of the element into the blocks' container
                const observer = new MutationObserver(() => {

                    // If the element has been inserted
                    if (blocksContainer.contains(element)) {

                        // And if the current block is a custom class block
                        const classBlock = [...element.querySelectorAll('code')].find((codeEl) => codeEl.innerText.trim().startsWith(CUSTOM_CLASS_ANCHOR));
                        if (classBlock) {

                            // Retrieve the custom class name
                            const nextBlockClass = classBlock.innerText.trim().replace(CUSTOM_CLASS_ANCHOR, "").trim();

                            // Set the 'data-next-block-class' attribute with the custom class name
                            element.setAttribute("data-next-block-class", nextBlockClass);
                            
                            // Remove the classBlock element from the render
                            element.innerHTML = "";
                        }
                        
                        // Then ensure that all classes are properly applied in the context
                        let nextBlockClass = null;
                        for (const block of blocksContainer.children) {
                            // Reset the block classes
                            block.className = "";
                                
                            // If the block is a custom class block
                            if (block.getAttribute("data-next-block-class")) {

                                // Set the next block class
                                nextBlockClass = block.getAttribute("data-next-block-class");
                            }

                            // Else if the block is preceded by a custom class block
                            else if (nextBlockClass) {
                                // Add the custom class
                                block.classList.add(nextBlockClass)

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
        );
    }
}
