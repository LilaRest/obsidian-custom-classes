import { App, PluginSettingTab, Setting } from "obsidian";
import CustomClasses from "./main";

export interface SettingsData {
  customClassAnchor: string;
  compatibilityMode: boolean;
  [index: string]: any;
}

const DEFAULT_SETTINGS: SettingsData = {
  customClassAnchor: "class:",
  compatibilityMode: true,
};

export class CustomClassesSettings {
  plugin: CustomClasses;
  _data: SettingsData;
  data: SettingsData;

  constructor (plugin: CustomClasses) {
    this.plugin = plugin;
    this._data = DEFAULT_SETTINGS;
  }

  async init () {
    // Load data from the archive file
    await this.load();

    // Set up auto-save for settings
    const dataProxy = {
      get: function (target: any, key: string): any {
        if (typeof target[key] === "object" && target[key] !== null) {
          if (key === "_target") return target;
          return new Proxy(target[key], dataProxy);
        }
        return target[key];
      }.bind(this),
      set: async function (target: any, prop: string, value: any) {
        target[prop] = value;
        await this.store();
        return true;
      }.bind(this)
    };
    this.data = new Proxy(this._data, dataProxy);
  }

  async load () {
    let dataJSON = await this.plugin.loadData();
    dataJSON = dataJSON ? dataJSON : { settings: DEFAULT_SETTINGS };
    this._data = Object.assign({}, DEFAULT_SETTINGS, dataJSON.settings);
  }

  async store () {
    await this.plugin.saveData({
      settings: this._data
    });
  }

  get (key: string): any {
    return this.data[key];
  }

  set (key: string, value: any) {
    this.data[key] = value;
  }
}

export class CustomClassesSettingsTab extends PluginSettingTab {
  plugin: CustomClasses;

  constructor (app: App, plugin: CustomClasses) {
    super(app, plugin);
    this.plugin = plugin;
  }

  async display (): Promise<void> {
    let { containerEl } = this;

    containerEl.empty();

    // Anchor settings
    new Setting(containerEl)
      .setName("Anchor / Prefix string")
      .setDesc("Defines the inline code-block anchor / prefix string that will be detected as a custom class block")
      .addText((text) =>
        text
          .setPlaceholder('e.g. "class:", "cls=", "customCls=>", ...')
          .setValue(this.plugin.settings.get("customClassAnchor"))
          .onChange(async (value) => {
            this.plugin.settings.set("customClassAnchor", value);
          })
      );

    // Group list items settings
    new Setting(containerEl)
      .setName("Compatibility mode")
      .setDesc("If enabled, in Live Preview _Custom Classes_ will render markdown blocks targetted by a custom class in the Read mode format. This allows you to have CSS snippets that work in both Live Preview and Read mode.")
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.get("groupListItemInLivePreview"))
          .onChange(async (value) => {
            this.plugin.settings.set("groupListItemInLivePreview", value);
          });
      });


  }
}