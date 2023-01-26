import { plugin } from "./main";

export function readingModeRenderer (element: any, context: any) {

    // Retrieve the blocks' container element 
    // @ts-ignore
    const blocksContainer = context.containerEl;

    // Listen for insertion of the element into the blocks' container
    const observer = new MutationObserver(() => {

        // If the element has been inserted
        if (blocksContainer.contains(element)) {

            // And if the current block is a custom class block
            const classBlock = element.querySelector('code');

            if (classBlock && classBlock.innerText.trim().startsWith(plugin?.settings.get("customClassAnchor"))) {

                // Retrieve the custom class name
                const nextBlockClass = classBlock.innerText.trim().replace(plugin?.settings.get("customClassAnchor"), "").trim();

                // Set the 'data-next-block-class' attribute with the custom class name
                element.setAttribute("data-next-block-class", nextBlockClass);

                // Remove the classBlock element from the render
                element.innerHTML = "";
            }

            // Then ensure that all classes are properly applied in the context
            let nextBlockClass = null;
            for (const block of blocksContainer.children) {

                // Reset the block classes
                block.removeAttribute("class");

                // If the block is a custom class block
                if (block.getAttribute("data-next-block-class")) {

                    // Set the next block class
                    nextBlockClass = block.getAttribute("data-next-block-class");
                }

                // Else if the block is preceded by a custom class block
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