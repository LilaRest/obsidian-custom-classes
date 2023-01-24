<h1 align="center">Obsidian Custom Classes</h1>
<p align="center"><b>Custom Classes</b> is a minimalist Obsidian plugin that allows you to add custom HTML classes to specific Markdown blocks.</p>

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

## Known limitations
The plugin currently doesn't support Live Preview mode.

<br>

## Inspiration
That plugin is originally inspired by the [Obsidian Stylist](https://github.com/ixth/obsidian-stylist) plugin but has been entirely rewritten and focus exclusively on custom HTML classes. By the way it fix many majors bugs like the one that prevented classes from being properly appended if the targetted block had been modified and then re-rendered.
