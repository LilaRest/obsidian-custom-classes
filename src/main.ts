import { Plugin } from 'obsidian';
import { LivePreviewModeRenderer } from './live-preview-mode';
import { readingModeRenderer } from './reading-mode';


export default class extends Plugin {

    onload() {
        // Start the Live Preview mode renderer
        this.registerEditorExtension([LivePreviewModeRenderer]);

        // Start the Reading mode renderer
        this.registerMarkdownPostProcessor(readingModeRenderer);
    }
}
