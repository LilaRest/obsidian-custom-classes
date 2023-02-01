<h1 align="center">Obsidian Custom Classes</h1>

<div align="center">
	<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/LilaRest/obsidian-custom-classes/semantic-release.yml">
	<img alt="GitHub Downloads" src="https://img.shields.io/github/downloads/LilaRest/obsidian-custom-classes/total?color=%23ddccee">
	<img alt="GitHub License" src="https://img.shields.io/github/license/LilaRest/obsidian-custom-classes?color=%235588ff">
	<img alt="Semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release">
</div>

<br>

<p align="center"><b>A minimal Obsidian plugin that allows you to add your own HTML<br>classes to chosen Markdown blocks directly from your notes.</b></p>

<br>

## Usage
Simply precede the targeted Markdown block with an inline code-block in the format <code>\`class: \<yourCustomClass\>\`</code>. 

_Example :_
- To add the `fancy-text` class to a paragraph block, use :
```markdown
`class: fancy-text`
I'm the paragraph and you ?
```
- In Live Preview or Read modes it will be rendered :
```html
<div class="fancy-text">
  <p>I'm the paragraph and you ?</p>
</div>
```

<br>

## Demonstrations
Here are some ways to use this plugin that may inspire you for your workflows :

<ol>
<li>
<details>
  <summary><b>On a table</b></summary>

  ```md
  `class: mytable`
  | AAA | BBB | CCC |
  | --- | --- | --- |
  | 111 | 222 | 333 |
  ```
  
  In Live Preview or Read modes it will be rendered :
  ```html
  <div class="mytable">
    <table>
      <thead>
        <tr>
          <th>AAA</th>
          <th>BBB</th>
          <th>CCC</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>111</td>
          <td>222</td>
          <td>333</td>
        </tr>
      </tbody>
    </table>
  </div>  
  ```
  <br>
</details>
</li>
<li><details>
	<summary><b>On a list</b></summary>

  ```md
  `class: my-great-list`
  - First item
  - Second item
  - Third item
  ```
  
  In Live Preview or Read modes it will be rendered :
  ```html
  <div class="my-great-list">
    <ul>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ul>
  </div>
  ```
  <br>
</details>
</li>
<li>
<details>
  <summary><b>On a Dataview query</b></summary>

  ````md
  `class: my-dv-list`
  ```dataview
  LIST
  WHERE author
  ```
  ````
  
  In Live Preview or Read modes it will be rendered :
  ```html
  <div class="mu-dv-list">
    <div class="block-language-dataview node-insert-event">
      <ul class="dataview list-view-ul">
        // The results of your query 
        // <li>...</li>
        // ...
      </ul>
    </div>
  </div>
  ```
  <br>
</details>
</li>
</ol>
  
<br>

## Installation
**The _Custom Classes_ plugin is currently not available from the official plugins list** (see [this PR](https://github.com/obsidianmd/obsidian-releases/pull/1576) for updates).

However, you can still install this one using the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat) :
1) Install and enable the BRAT plugin (which is available from the official plugins list)
2) On the BRAT settings tab :
   - Click the `Add Beta plugin` button
   - Paste this URL in the input field : https://github.com/LilaRest/obsidian-custom-classes
   - Click the `Add Plugin` button
3) Finally, go to your plugins list (Options > Community plugins) and enable the _Custom Classes_ plugin
4) Enjoy !

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
