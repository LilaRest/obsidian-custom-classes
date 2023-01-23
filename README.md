# Obsidian Custom Classes
*Custom Classes* is a minimalist Obsidian plugin that allows you to add custom HTML classes to markdown blocks.

## Demonstration
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

## Known limitations
The plugin doesn't work in Live Preview mode.