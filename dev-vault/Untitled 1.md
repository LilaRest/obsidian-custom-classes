---
cssclass: cards,noyaml,fullwidth  
banner: "zob_config/GIF/赛博朋克3.gif"  
banner_y: 0.94309
---

`class: meta`
- aaa
- bbb
- ccc

###### 进行中

```
table without id ("![](" + cover + ")") as Cover, file.link as Name, author as Author,publisher,rating as Rating
from #book and !#社科
where contains(file.folder, "1 文献笔记收纳盒") and status="进行中"
sort rating desc
```

###### 搁置

```
table without id ("![](" + cover + ")") as Cover,  file.link as Name, author as Author,publisher,rating as Rating
from #book and !#社科
where contains(file.folder, "1 文献笔记收纳盒") and status="搁置"
sort rating desc
```

###### 待完成

```
table without id ("![](" + cover + ")") as Cover,  file.link as Name, author as Author,publisher,rating as Rating
from #book and !#社科
where contains(file.folder, "1 文献笔记收纳盒") and status="待完成"
sort rating desc
```

###### 已完成

```
table without id ("![](" + cover + ")") as Cover, file.link as Name, author as Author,publisher,rating as Rating
from #book and !#社科
where contains(file.folder, "1 文献笔记收纳盒") and status="已完成"
sort rating desc
```