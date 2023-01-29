import { Plugin } from 'obsidian';
import {
    CustomClassesSettings,
    CustomClassesSettingsTab
} from './settings';
import { customClassField } from './live-preview-mode';
import { readingModeRenderer } from './reading-mode';

export let plugin: CustomClasses | null = null;

export default class CustomClasses extends Plugin {
    settings: CustomClassesSettings;

    async onload () {
        // Expose the plugin globally.
        plugin = this;

        // Print console message
        console.log(`Loading "Custom Classes" plugin...`);

        // Initialize the settings instance
        this.settings = new CustomClassesSettings(this);
        await this.settings.init();

        // Initialize the settings' tab
        this.addSettingTab(new CustomClassesSettingsTab(this.app, this));

        // Start the Live Preview mode renderer
        this.registerEditorExtension([customClassField]);

        // Start the Reading mode renderer
        this.registerMarkdownPostProcessor(readingModeRenderer);

        // Print console message
        console.log(`"Custom Classes" plugin successfully loaded.`);
    }
}
