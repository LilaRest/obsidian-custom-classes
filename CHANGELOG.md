# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.5...3.0.0) (2023-02-01)


### ⚠ BREAKING CHANGES

* No more compatibility mode

### Features

* add Live Preview support (beta) ([dda5239](https://github.com/LilaRest/obsidian-custom-classes/commit/dda52394f59333b6885d7fa8ce2f816c9b186aeb))
* add support for custom class on tables in Read mode ([56758f5](https://github.com/LilaRest/obsidian-custom-classes/commit/56758f577cffae5d3c1e7192c3f05b7a8978890a))
* allow editing custom classes without reloading Obsidian by re-rendering every custom class ([4c15f9f](https://github.com/LilaRest/obsidian-custom-classes/commit/4c15f9f265f9d239b0e75bb9292ae894fcf0cfb3))
* allow to add classes to multiline code blocks and tables in Live Prev. with compatibility mode ([dbb5da9](https://github.com/LilaRest/obsidian-custom-classes/commit/dbb5da96768ba3af5fb3fafb0ee1973fcd5c9e9f))
* also consider a the lines range as active if some changes of the transaction are touching it ([f92d4c6](https://github.com/LilaRest/obsidian-custom-classes/commit/f92d4c6f4741fa4688fc2b3475935ef9e3cb731f))
* entire rewrite of the Live Preview support ([4fb14bd](https://github.com/LilaRest/obsidian-custom-classes/commit/4fb14bd290c349c309deabda9220278120ee1a67))
* expose the plugin globally + replace hardcoded anchor by the one defined in settings ([352c7e8](https://github.com/LilaRest/obsidian-custom-classes/commit/352c7e8bacc35cdbb90af56cd31d85d62a5f617a))
* fake commit to test release ([23614f0](https://github.com/LilaRest/obsidian-custom-classes/commit/23614f023b44a3e63e6b61ff296f24778a67ea5e))
* fake update to test CI/CD ([92bb088](https://github.com/LilaRest/obsidian-custom-classes/commit/92bb08879dbe5437f5e79612ea376ea8fce7f459))
* finish the compatibility mode ([0727655](https://github.com/LilaRest/obsidian-custom-classes/commit/0727655df2ca84bdd9879c2a589259995c956f45))
* implement settings + Allow users to customize the anchor / prefix string from settings ([c14d7c2](https://github.com/LilaRest/obsidian-custom-classes/commit/c14d7c20e61d1683bb62c9c7d4cc446511724f71))
* improve performances of Live Preview support by limiting script to cursor position changes ([81d86cd](https://github.com/LilaRest/obsidian-custom-classes/commit/81d86cd741977e4790a51d33588426ff14bbaa76))
* improve the Reading mode rendered code (increased performances) ([2a49809](https://github.com/LilaRest/obsidian-custom-classes/commit/2a49809c46f3ec6eaa3fe0f17052fbb7491fa480))
* in Live Preview, ignore custom class block that doesn't target any non-empty element ([8cf871e](https://github.com/LilaRest/obsidian-custom-classes/commit/8cf871e58c674030fe2d393f7f50a24735ab3547))
* live Preview support : Unhide blocks if user has switched from Live Preview to Source mode ([1d711cb](https://github.com/LilaRest/obsidian-custom-classes/commit/1d711cbcc29f73e294ac13bc290fec82ed1ebf8a))
* make the table support generic to also paragraphs or any other element not properly rendered ([2484135](https://github.com/LilaRest/obsidian-custom-classes/commit/24841355679d93484653b97df2a5f5fd8102580c))
* prevent re-render of widgets if the content hasn't changed by implementing eq() function ([2f7dc7e](https://github.com/LilaRest/obsidian-custom-classes/commit/2f7dc7eb86113f5d797dc58da79df3022c24b299))
* totally remove compatibility mode and set it as default behavior to make things clearer ([a81cacc](https://github.com/LilaRest/obsidian-custom-classes/commit/a81cacc00d733936bb6cc349c0146236f9120aec))


### Bug Fixes

* empty css file ([025c2c1](https://github.com/LilaRest/obsidian-custom-classes/commit/025c2c1cfa53bdfa067bd58c3bc069645b511ba2))
* empty line / line break detection was also detecting paragraphs ([211958f](https://github.com/LilaRest/obsidian-custom-classes/commit/211958f3878772ddd9ee2822a4bc4f015e764bae))
* limit the scope of the post processor to prevent broking plugins that use renderMarkdown() ([128290c](https://github.com/LilaRest/obsidian-custom-classes/commit/128290cce60a692926ad377beb9da51f0b1670b6)), closes [#1](https://github.com/LilaRest/obsidian-custom-classes/issues/1)
* patch Typescript errors ([e084cfd](https://github.com/LilaRest/obsidian-custom-classes/commit/e084cfdc804d89bc779fcc19f3d9facc51bcf7b9))
* remove of live preview mode code file ([df5f819](https://github.com/LilaRest/obsidian-custom-classes/commit/df5f8190c036959e6964298cdc0eeb5fce0437e4))
* repair broken changelog file ([eb2ec4c](https://github.com/LilaRest/obsidian-custom-classes/commit/eb2ec4cf2d83be8990f7f8f969c68ecdc2ab5ff2))
* wrong static anchor key + unuseful code to test code blocks ([1fd1a4e](https://github.com/LilaRest/obsidian-custom-classes/commit/1fd1a4eb60fc719ffe4b6f57dcb02ce56caefa3d))

## [2.0.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.15.1...2.0.0) (2023-01-30)


### ⚠ BREAKING CHANGES

* No more compatibility mode

### Features

* totally remove compatibility mode and set it as default behavior to make things clearer ([a67299d](https://github.com/LilaRest/obsidian-custom-classes/commit/a67299d4bc9c9255f0bbeb17b9018b97ee92d0be))


### [1.15.1](https://github.com/LilaRest/obsidian-custom-classes/compare/1.15.0...1.15.1) (2023-01-29)


### Bug Fixes

* limit the scope of the post processor to prevent broking plugins that use renderMarkdown() ([62276dd](https://github.com/LilaRest/obsidian-custom-classes/commit/62276ddc3acaf720326244b3126e4d12dd0b5ab3)), closes [#1](https://github.com/LilaRest/obsidian-custom-classes/issues/1)

## [1.15.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.14.0...1.15.0) (2023-01-29)


### Features

* fake commit to test release ([0042d95](https://github.com/LilaRest/obsidian-custom-classes/commit/0042d95028b0ffdf506110f30a01b55fed904a78))

## [1.13.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.13.0) (2023-01-29)


### Features

* also consider a the lines range as active if some changes of the transaction are touching it ([8fab0c2](https://github.com/LilaRest/obsidian-custom-classes/commit/8fab0c2fa7c6be777f2b91fcd84a1610877c20ca))


### Bug Fixes

* remove of live preview mode code file ([d31125d](https://github.com/LilaRest/obsidian-custom-classes/commit/d31125d20f0efb8f2dc69f80d8fad2b0b8f41fd1))

## [1.12.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.12.0) (2023-01-29)


### Features

* allow to add classes to multiline code blocks and tables in Live Prev. with compatibility mode ([901cb2e](https://github.com/LilaRest/obsidian-custom-classes/commit/901cb2e863214b84de2ca6c7ca89628b50e2267d))

## [1.11.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.11.0) (2023-01-29)


### Features

* entire rewrite of the Live Preview support ([0c5f5c8](https://github.com/LilaRest/obsidian-custom-classes/commit/0c5f5c877e308033622f82137e1ff366e95f9873))
* in Live Preview, ignore custom class block that doesn't target any non-empty element ([a39f132](https://github.com/LilaRest/obsidian-custom-classes/commit/a39f1329cff79d5b2f3c3a614068add233a58b19))


### Bug Fixes

* empty line / line break detection was also detecting paragraphs ([60095b1](https://github.com/LilaRest/obsidian-custom-classes/commit/60095b1d9a06898a744c012116240406b5401be9))

## [1.10.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.10.0) (2023-01-28)


### Features

* finish the compatibility mode ([25ef2f8](https://github.com/LilaRest/obsidian-custom-classes/commit/25ef2f87a0c29186fc600b2ad1f08de0913fa733))
* live Preview support : Unhide blocks if user has switched from Live Preview to Source mode ([9def645](https://github.com/LilaRest/obsidian-custom-classes/commit/9def6455ab9d71a4de80cdb61de287775ea790ab))

## [1.9.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.9.0) (2023-01-27)


### Features

* finish the compatibility mode ([25ef2f8](https://github.com/LilaRest/obsidian-custom-classes/commit/25ef2f87a0c29186fc600b2ad1f08de0913fa733))

## [1.8.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.8.0) (2023-01-26)

## [1.7.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.7.0) (2023-01-26)


### Bug Fixes

* patch Typescript errors ([7f1d73c](https://github.com/LilaRest/obsidian-custom-classes/commit/7f1d73c8f10ebf1c805c63995e231f8e012c4b8f))

## [1.6.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.6.0) (2023-01-26)


### Features

* add Live Preview support (beta) ([fe22a90](https://github.com/LilaRest/obsidian-custom-classes/commit/fe22a907ff73c81aa307752fe1624da5ada1a0a9))
* expose the plugin globally + replace hardcoded anchor by the one defined in settings ([da1041d](https://github.com/LilaRest/obsidian-custom-classes/commit/da1041dc185928e7fe983246feef93a017a7c536))
* implement settings + Allow users to customize the anchor / prefix string from settings ([a4f24b7](https://github.com/LilaRest/obsidian-custom-classes/commit/a4f24b788a580540bc5037df4bc5f36001cb43de))
* improve the Reading mode rendered code (increased performances) ([524b98b](https://github.com/LilaRest/obsidian-custom-classes/commit/524b98bb701f216a070ecbdce0d11769f89a0855))


### Bug Fixes

* wrong static anchor key + unuseful code to test code blocks ([657d1a8](https://github.com/LilaRest/obsidian-custom-classes/commit/657d1a818a05faf427f99aebc3b06eb652910dcb))

## [1.5.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.5.0) (2023-01-24)


### Features

* allow editing custom classes without reloading Obsidian by re-rendering every custom class ([3768b74](https://github.com/LilaRest/obsidian-custom-classes/commit/3768b7422a69746f0da4071c92957527c2c5418a))

### [1.4.1](https://github.com/LilaRest/obsidian-custom-classes/compare/1.4.0...1.4.1) (2023-01-24)


### Bug Fixes

* empty css file ([b796493](https://github.com/LilaRest/obsidian-custom-classes/commit/b796493610e9a47bb2df7deafe93f736af31b3ad))

## [1.4.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.6...1.4.0) (2023-01-24)


### Features

* fake update to test CI/CD ([a939e20](https://github.com/LilaRest/obsidian-custom-classes/commit/a939e20d3bcd7660b2a04589d11bc920ef4285c3))

### [1.3.6](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.5...1.3.6) (2023-01-23)

### [1.3.5](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.4...1.3.5) (2023-01-23)

### [1.3.4](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.3...1.3.4) (2023-01-23)

### [1.3.3](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.2...1.3.3) (2023-01-23)

### [1.3.2](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.1...1.3.2) (2023-01-23)

### [1.3.1](https://github.com/LilaRest/obsidian-custom-classes/compare/1.3.0...1.3.1) (2023-01-23)


### Bug Fixes

* fix css file wrong name ([d6788d0](https://github.com/LilaRest/obsidian-custom-classes/commit/d6788d0d6d9cc1ed7132775b73aad1954da699e7))

## [1.3.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.2.0...1.3.0) (2023-01-23)


### Features

* tiny update to test CI/CD ([75570a1](https://github.com/LilaRest/obsidian-custom-classes/commit/75570a16be87722d723ee5f7938bc9d28ed4416e))

## [1.2.0](https://github.com/LilaRest/obsidian-custom-classes/compare/1.1.0...1.2.0) (2023-01-23)


### Features

* rename 'classname' anchor by 'class' as seen in the docs ([d519058](https://github.com/LilaRest/obsidian-custom-classes/commit/d519058a63c6df4146d9b99c4a97562bf047d05e))

## 1.1.0 (2023-01-23)


### Features

* first working version ([11332f6](https://github.com/LilaRest/obsidian-custom-classes/commit/11332f699883825b1fab6d90259479421e8b4f05))
