## [2.6.1](https://github.com/LilaRest/obsidian-custom-classes/compare/2.6.0...2.6.1) (2023-02-25)


### Bug Fixes

* dot format was not rendered in Live Preview mode ([cf6d00b](https://github.com/LilaRest/obsidian-custom-classes/commit/cf6d00bc04b720b998fa96bd48a0fe8d6a2aead8))
* repair regex matching wrong patterns of CC blocks + merge those ones to prevent code repetition ([9761c90](https://github.com/LilaRest/obsidian-custom-classes/commit/9761c90c8b560e9f52424079d4f6badd7eccf49d)), closes [#5](https://github.com/LilaRest/obsidian-custom-classes/issues/5) [#7](https://github.com/LilaRest/obsidian-custom-classes/issues/7)

# [2.6.0](https://github.com/LilaRest/obsidian-custom-classes/compare/2.5.0...2.6.0) (2023-02-23)


### Bug Fixes

* partially rewrite the read mode renderer to fix: [#2](https://github.com/LilaRest/obsidian-custom-classes/issues/2) and makes code cleaner ([3a910d9](https://github.com/LilaRest/obsidian-custom-classes/commit/3a910d9315399bc1427bc4f9e089d12f1aad139d))


### Features

* add an event shorter way to add custom classes by simply starting a code block with a dot ([3ff6bea](https://github.com/LilaRest/obsidian-custom-classes/commit/3ff6beaa83fe55393ee774b0d97ba0fb0a3dc5b5))

# [2.5.0](https://github.com/LilaRest/obsidian-custom-classes/compare/2.4.3...2.5.0) (2023-02-06)


### Bug Fixes

* remove remaining console logs ([3bb386f](https://github.com/LilaRest/obsidian-custom-classes/commit/3bb386f4dff4f36a2111637fe5d1bc66ac2091a6))


### Features

* support short-hand "cls:" prefix in Read mode ([ac4fa09](https://github.com/LilaRest/obsidian-custom-classes/commit/ac4fa09a1325307fc015fd352a52eb7cecb080b3))

## [2.4.3](https://github.com/LilaRest/obsidian-custom-classes/compare/2.4.2...2.4.3) (2023-02-06)


### Bug Fixes

* wrong versions ([32fb8ae](https://github.com/LilaRest/obsidian-custom-classes/commit/32fb8aea3cbae1e97b10fc4eabddcd6fd70ae459))

# [2.4.0](https://github.com/LilaRest/obsidian-custom-classes/compare/2.3.0...2.4.0) (2023-02-05)


### Features

* improve detection custom classes block context in Read mode ([4f2bafe](https://github.com/LilaRest/obsidian-custom-classes/commit/4f2bafe451d6dbab5737c5b37a3ed6dee079d987))
* partially rewrite LP support to use the Read mode renderer to render nested classes blocks ([39ef717](https://github.com/LilaRest/obsidian-custom-classes/commit/39ef717926194c650cea9e5e5b4915ad0659e752))
* rewrite post processor to support inline classes & non-rendered elements more efficiently ([d819707](https://github.com/LilaRest/obsidian-custom-classes/commit/d819707c7d78c5b657b9eda303135256ca8d5aba))

# [2.3.0](https://github.com/LilaRest/obsidian-custom-classes/compare/2.2.0...2.3.0) (2023-02-02)


### Features

* add support for multiple classes and inline custom classes in Live Preview mode ([f9361c7](https://github.com/LilaRest/obsidian-custom-classes/commit/f9361c7fa9048736fa5508ad09061c5e1138b09f))
* start rewriting live preview support to support multiple classes and inline custom classes ([c6a4463](https://github.com/LilaRest/obsidian-custom-classes/commit/c6a4463d0ea0528de240624f403b36470b0b1d1c))


### Reverts

* remove the dynamic anchor configuration to keep things simple and improve code performances ([ab6e4e2](https://github.com/LilaRest/obsidian-custom-classes/commit/ab6e4e2868456e7e56f7a87cb394b2635367fa66))

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
