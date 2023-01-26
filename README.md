<h1 align="center">Obsidian Custom Classes</h1>

<div align="center">
	<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/LilaRest/obsidian-custom-classes/ci-cd.yml">
	<img alt="GitHub all releases" src="https://img.shields.io/github/downloads/LilaRest/obsidian-custom-classes/total?color=%23cd98">
	<img alt="GitHub" src="https://img.shields.io/github/license/LilaRest/obsidian-custom-classes?color=%235588ff">
</div>

<p align="center"><b>Custom Classes is a minimalist Obsidian plugin that allows you to add<br>your own HTML classes to specific Markdown blocks in your notes.</b></p>

<br>

## Usage
To add a custom HTML class to a Markdown block simply precede it with an inline code block that starts with the `class:` anchor :
```markdown
`class:your-custom-class-here`
Your block here
```

<br>

## Demonstration
### _Example 1_: With a list block
The following Markdown :
```markdown
`class:my-super-list`
- first
- second
- third
```
will render in Reading mode :
```html
<div class="my-super-list">
    <ul>
        <li>first</li>
        <li>second</li>
        <li>third</li>
    </ul>
</div>
```

<br>

### _Example 2_: With a heading block
The following Markdown :
```markdown
`class:my-great-heading`
## A level 2 heading
```
will render in Reading mode :
```html
<div class="my-great-heading">
    <h2>A level 2 heading</h2>
</div>
```

<br>

### _Example 3_: With a paragraph block
The following Markdown :
```markdown
`class:my-fancy-paragraph`
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```
will render in Reading mode :
```html
<div class="my-fancy-paragraph">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
```
<br>

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
