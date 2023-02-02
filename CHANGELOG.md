# [2.2.0](https://github.com/LilaRest/obsidian-custom-classes/compare/2.1.0...2.2.0) (2023-02-02)


### Features

* **read mode:** support multiple classes, inline custom classes, and improve general behavior ([e84e6b8](https://github.com/LilaRest/obsidian-custom-classes/commit/e84e6b8a9188cadb257d61e7c23456e6d28d682a))

# [2.1.0](https://github.com/LilaRest/obsidian-custom-classes/compare/2.0.0...2.1.0) (2023-02-01)


### Bug Fixes

* version of package.json ([85ab8e1](https://github.com/LilaRest/obsidian-custom-classes/commit/85ab8e1b15457856f3b6f414873c5137405c3732))


### Features

* add support for custom class on tables in Read mode ([56758f5](https://github.com/LilaRest/obsidian-custom-classes/commit/56758f577cffae5d3c1e7192c3f05b7a8978890a))
* allow table / paragraph render in Read mode + replace standard-version by semantic-version ([dca7742](https://github.com/LilaRest/obsidian-custom-classes/commit/dca7742337f1025416b818a0a23aaa1c7d60240f))
* make the table support generic to also paragraphs or any other element not properly rendered ([2484135](https://github.com/LilaRest/obsidian-custom-classes/commit/24841355679d93484653b97df2a5f5fd8102580c))

# **2.0.0 and before**
Until its `2.0.0` release the _Custom Classes_ plugin was using [standard-version](https://github.com/conventional-changelog/standard-version) + [conventional-changelog-reader-action](https://github.com/artlaman/conventional-changelog-reader-action) to manage releases and CHANGELOG generation.

From its `2.0.1` release the plugin is using [semantic-release] to do so, which generate logs using a different format.

Logs have so been split in two files, and the CHANGELOG until the `2.0.0` release can be found here : [CHANGELOG-until-v2.0.0.md](https://github.com/LilaRest/obsidian-custom-classes/blob/main/CHANGELOG-until-v2.0.0.md)
