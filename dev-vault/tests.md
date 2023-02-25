---
aliases: "Blabla"
---

**Test #1** : [Lila's frontmatter](https://forum.obsidian.md/t/a-frontmatter-that-finally-supports-links-lilas-frontmatter/53087/) should be displayed below

`.meta`             
- creation:: 2023-01-21T18:55:12
- author:: [[John Doe]]
- parents:: [[Note]], [[Another note]]
- status:: #MayBePartial 

**Test #2** : Should not have any custom class
# Lorem Ipsum

**Test #3** (heading) : Should have a green background

`class: green-title`
## Dolor sit

**Test #4** (paragraph) : Should became bold and big on hover
`class: fancy-text`
I'm the paragraph and you ?

**Test #5** (Dataview query) : The query result should display well and the `dv-custom` class should be applied to the query block
`class: dv-custom`
```dataview
LIST
WHERE creation
```

**Test #6** (blockquote) : The `quote` class should be applied to the whole blockquote block and the `inline-quote` class should be applied to the `<p>` element
`class: quote`
> My blockquote 
`class: inline-quote`

**Test #7** (callouts) : The `out-title` class should be applied to the callout title's `div` and the `out-content` class should be applied to the callout content's div (DOESN'T WORK)

> [!INFO] Consectetur `class: out-title`
> Lorem ipsum dolor site amet
> `class: out-content`

**Test #8** (consecutive standalone CC blocks) : `am-i-visible` and `and-me` should be visible and `dv-list` should be hidden and applied to the Dataview block

`class: am-i-visible`
`class: and-me`
`class:dv-list`
```dataview
LIST
WHERE type
```

**Test #9** (rendered Markdown) : The inline code-block in the below paragraph should look like this one : `normal code block`
`class: paraa`
I'm the last element `normal code block` of a paragraph 

**Test #10** (table render) : `should-be-visible` must be visible and the `table` class should be applied to the table block and the `cell` class should be applied only to the `azaz` cell

`class: should-be-visible`

`class: table`
| aaa | bbbbb | ccc |
| -- | -- | -- |
| az | er | azaz `class: cell` |
| aa | aaa | yoo |

**Test #11** (whole list) : The `whole-list` class should be applied to the whole below list block and the second `<li>` element should have `yep`, `yop` and `yup` classes
`class: whole-list`
- first element
- second one `class: yep, yop, yup`  which have classes
- third
- last

**Test #12** (paragraph inline class) : The below paragraph should have the `boo` class applied to its `<p>` element
Discrete like `class: boo`  a ghost

**Test #13** (latest class) : A cc block at the end of the document should remain visible because not applied to any block or element
`class: visible-latest`