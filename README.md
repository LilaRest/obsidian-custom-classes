<h1 align="center">Obsidian Custom Classes</h1>

<div align="center">
	<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/LilaRest/obsidian-custom-classes/ci-cd.yml">
	<img alt="GitHub Downloads" src="https://img.shields.io/github/downloads/LilaRest/obsidian-custom-classes/total?color=%23ddccee">
	<img alt="GitHub License" src="https://img.shields.io/github/license/LilaRest/obsidian-custom-classes?color=%235588ff">
	<img alt="Semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release">
</div>

<br>

<p align="center"><b>A simple Obsidian plugin that allows you to add your own HTML<br>classes to chosen Markdown blocks directly from your notes.</b></p>

<br>

## Usage
Simply precede the targetted Markdown block with an inline code-block in the format <code>\`class: \<yourCustomClass\>\`</code>. 

_Example :_
- To add the `fancy-text` class to a paragraph block, use :
```markdown
`class: fancy-text`
I'm a so fancy paragraph !
```
- In Live Preview or Read modes it will be rendered :
```html
<div class="fancy-text">
  <p>I'm a so fancy paragraph !</p>
</div>
```

<br>

## Installation
The _Custom Classes_ plugin is currently not available in the official plugins list ([request](https://github.com/obsidianmd/obsidian-releases/pull/1576) has been sent but has not been reviewed yet).

But you can still install this one using the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat) :
1) Install and enable the BRAT plugin (which is available in the official plugins list)
2) On the BRAT settings tab :
- Click on “Add Beta plugin” button
- Paste that URL : `https://github.com/LilaRest/obsidian-custom-classes`
- Click on “Add Plugin” button to confirm
3) Finally, go to your plugins list (Options > Community plugins) and enable the Custom Classes plugin

<br>

## Showcase / Integrations
That section displays some example of how people have integrated the _Custom Classes_ plugin in their workflows.
Feel free to share yours by [opening an issue](https://github.com/LilaRest/obsidian-custom-classes/issues/new).

### 1# The Lila's frontmatter
Here the _Custom Classes_ plugin is used to render a Markdown unordered list (`ul`) as a clean frontmatter block.

Source: https://forum.obsidian.md/t/a-frontmatter-that-finally-supports-links-lilas-frontmatter/53087
	
#### In Edit mode
```markdown
`class:meta`
- creation:: 2023-01-21T18:55:12
- author:: [[John Doe]]
- parents:: [[Note]], [[Another note]]
- status:: #MayBePartial
```
	
#### In Read / Live Preview modes
| Theme | |
| -- | -- |
| Dark | ![](https://forum.obsidian.md/uploads/default/original/3X/1/4/1418a3659b033fcf8d925105d6a3da3c6b9984fc.gif) |
| Light | ![](https://forum.obsidian.md/uploads/default/original/3X/3/5/35b209dfa79a2b3df13166e9ddd6d1b208480fca.gif) |

<br>

## Inspiration
This plugin is originally inspired by the [Obsidian Stylist](https://github.com/ixth/obsidian-stylist) plugin but has been entirely rewritten to :
- focus exclusively on adding custom HTML classes,
- support the Live Preview mode,
- fix some majors bugs (e.g. classes were not properly appended if the targetted block was modified and then re-rendered).
