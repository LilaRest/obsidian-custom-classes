import {
  ViewUpdate,
  PluginValue,
  EditorView,
  ViewPlugin,
} from "@codemirror/view";

const CUSTOM_CLASS_ANCHOR = ":class";

class _LivePreviewModeRenderer implements PluginValue {

  constructor (view: EditorView) {
    // ...
  }

  update (update: ViewUpdate) {
    for (const child of update.view.contentDOM.children) {
      const codeBlock = child.querySelector("span.cm-inline-code");

      //@ts-ignore
      if (codeBlock && codeBlock.innerText.startsWith(CUSTOM_CLASS_ANCHOR)) {
        let lastSibling = null;
        let active = child.classList.contains("cm-active");
        while (!active) {
          const block: any = lastSibling ? lastSibling.nextElementSibling : child.nextElementSibling;
          lastSibling = block;

          // console.log(block)
          // Break if block is a blank line
          if (!block || block.className === "cm-line") {
            break;
          }

          active = block.classList.contains("cm-active");
        }
        if (active === false) {
          //@ts-ignore
          const customClass = child.innerText.trim().replace(CUSTOM_CLASS_ANCHOR, "").trim();
          child.classList.add(customClass);

          child.innerHTML = "";

          // Build inner HTML 
          lastSibling = null;
          while (true) {
            const block: any = lastSibling ? lastSibling.nextElementSibling : child.nextElementSibling;
            lastSibling = block;

            // console.log(block)
            // Break if block is a blank line
            if (!block || block.className === "cm-line") {
              break;
            }

            block.style.display = "none";
            const newBlock = document.createElement("p");
            newBlock.innerHTML = block.innerHTML;

            child.appendChild(newBlock);
          }
        }
        else {
          let lastSibling = null;
          while (true) {
            const block: any = lastSibling ? lastSibling.nextElementSibling : child.nextElementSibling;
            lastSibling = block;

            console.log(block);
            // Break if block is a blank line
            if (!block || block.className === "cm-line") {
              break;
            }

            block.style.display = "block";
          }
        }
      }
    }
  }

  destroy () {
    // ...
  }
}
export const LivePreviewModeRenderer = ViewPlugin.fromClass(_LivePreviewModeRenderer);