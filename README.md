<h1 align="center">Obsidian Custom Classes</h1>

<div align="center">
	<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/LilaRest/obsidian-custom-classes/ci-cd.yml">
	<img alt="GitHub all releases" src="https://img.shields.io/github/downloads/LilaRest/obsidian-custom-classes/total?color=%23ddccee">
	<img alt="GitHub" src="https://img.shields.io/github/license/LilaRest/obsidian-custom-classes?color=%235588ff">
</div>

<br>

<p align="center"><b>Custom Classes is a minimalist Obsidian plugin that allows you to add<br>your own HTML classes to specific Markdown blocks in your notes.</b></p>

<br>

## Usage
To add a custom class to a Markdown block, simply precede this one with an inline code-block in the format <code>\`class:\<customClass\>\`</code>.

With a paragraph block this looks like :
```markdown
`class:fancy-text`
I'm a so fancy paragraph !
```
	
<br>
	
## Rendering
Then in Read or Live Preview mode, _Custom Classes_ will simply append the specified class to the blocks's `div`.

With the previous paragraph example, the render would be :
```html
<div class="fancy-text">
	<p>I'm a so fancy paragraph !</p>
</div>
```
	
## Compatibility mode
The Obsidian [Live Preview]() renders Markdown in a quite different way than the [Read mode]() does. In order to allow you to create CSS snippets that work in both modes the _Custom Classes_ plugin introduces a compatibility mode, which is enabled by default, but can be disabled from the plugin's settings.
	
More preciselly, if the compatibility mode is enabled :
- Markdown block target by a custom class will render in Live Preview mode using the Read mode format
- Lists items in Live Preview mode will be grouped instead of being considered individual (like in Read mode)
	
<br>

## Demonstration

#### And this should works with any other type of block...

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

## Known limitations
The plugin currently doesn't support Live Preview mode.

<br>

## Inspiration
That plugin is originally inspired by the [Obsidian Stylist](https://github.com/ixth/obsidian-stylist) plugin but has been entirely rewritten and focus exclusively on custom HTML classes. By the way it fix many majors bugs like the one that prevented classes from being properly appended if the targetted block had been modified and then re-rendered.
