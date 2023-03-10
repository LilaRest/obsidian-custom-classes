import { App, PluginSettingTab, Setting } from "obsidian";
import CustomClasses from "./main";

export interface SettingsData {
  [index: string]: any;
}

const DEFAULT_SETTINGS: SettingsData = {
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

    // Configuration section
    containerEl.createEl("h2", { text: "Documentation", cls: "settings-header" });

    containerEl.createEl("p", { text: "You can learn more about the usage of the plugin by reading its " }).createEl("a", { href: "https://github.com/LilaRest/obsidian-custom-classes", text: "documentation page." });


    // Configuration section
    // containerEl.createEl("h2", { text: "Configurations", cls: "settings-header" });

    // Support section's title
    containerEl.createEl("h2", { text: "Support my work", cls: "settings-header" });

    // Support message
    containerEl.createEl("p", { text: "That plugin is provided for free to everyone under the MIT license. If it has been helpful to you, you can thank me for free by :" });
    const supportMethods = containerEl.createEl("ul");
    supportMethods.createEl("li", { text: "Following me on Twitter " }).createEl("a", { href: "https://twitter.com/LilaRest", text: "twitter.com/LilaRest" });
    supportMethods.createEl("li", { text: "Following me on Github " }).createEl("a", { href: "https://github.com/LilaRest", text: "github.com/LilaRest" });
    supportMethods.createEl("li", { text: "Starring that plugin " }).createEl("a", { href: "https://github.com/LilaRest/obsidian-custom-classes", text: "LilaRest/obsidian-custom-classes" });
    containerEl.createEl("p", { text: "Also, I accept donations on my personal website : " }).createEl("a", { href: "https://lila.rest/donations", text: "https://lila.rest/donations" });
  }
}