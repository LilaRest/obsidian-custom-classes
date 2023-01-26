import { Plugin } from 'obsidian';
import {
    CustomClassesSettings,
    CustomClassesSettingsTab
} from './settings';
import { LivePreviewModeRenderer } from './live-preview-mode';
import { readingModeRenderer } from './reading-mode';


export default class CustomClasses extends Plugin {
    settings: CustomClassesSettings;

    async onload () {
        // Print console message
        console.log(`Loading "Custom Classes" plugin...`);

        // Initialize the settings instance
        this.settings = new CustomClassesSettings(this);
        await this.settings.init();


        // Initialize the settings' tab
        this.addSettingTab(new CustomClassesSettingsTab(this.app, this));

        // Start the Live Preview mode renderer
        this.registerEditorExtension([LivePreviewModeRenderer]);

        // Start the Reading mode renderer
        this.registerMarkdownPostProcessor(readingModeRenderer);

        // Print console message
        console.log(`"Custom Classes" plugin successfully loaded.`);
    }
}
