import { Plugin } from 'obsidian';
import {
    CustomClassesSettings,
    CustomClassesSettingsTab
} from './settings';
import { customClassLivePreviewMode } from './live-preview-mode';
import { customClassReadMode } from './read-mode';


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
        this.registerEditorExtension([customClassLivePreviewMode]);

        // Start the Reading mode renderer
        this.registerMarkdownPostProcessor(customClassReadMode);

        // Print console message
        console.log(`"Custom Classes" plugin successfully loaded.`);
    }
}