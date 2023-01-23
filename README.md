# Obsidian Custom Classes
*Custom Classes* is a minimalist Obsidian plugin that allows you to add custom HTML classes to markdown blocks.

<br>

## Demonstration
### Example 1: With a list block
The following markdown :
```markdown
`class:myclass`
- first
- second
- third
```
will render like that in Reading mode :
```html
<div class="myclass">
    <ul>
        <li>first</li>
        <li>second</li>
        <li>third</li>
    </ul>
</div>
```

### Example 2: With a heading block
The following markdown :
```markdown
`class:youpi`
## A level 2 heading
```
will render like that in Reading mode :
```html
<div class="youpi">
    <h2>A level 2 heading</h2>
</div>
```

### Example 3: With a paragraph block
The following markdown :
```markdown
`class:custom-class`
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```
will render like that in Reading mode :
```html
<div class="custom-class">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</div>
```

#### And this should works with any other type of block...

<br>

## Known limitations
The plugin currently doesn't work in Live Preview mode.

<br>

## Inspiration
That plugin is originally inspired by the [Obsidian Stylist](https://github.com/ixth/obsidian-stylist) but has been entirely rewritten to focus exclusively on custom classes adding, and to fix many majors bugs experienced with the Obsidian Stylist plugin.
