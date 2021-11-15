# CSS伪类

## 伪类和伪元素的区别

- [伪类]和[伪元素]的区别：最主要的最核心的区别就是：有没有产生新的元素。使用上伪类使用一个冒号[：] ,伪元素使用两个冒号 [::]
- [伪类]可以说是补充了选择器，在页面无标签，但是真实的存在Dom文档中。
- [伪元素]是创建了一个新的元素，不存在于Dom文档中，真实不存在的，但又是一个可以装载内容的元素。

### 伪类

#### 表示状态的

|伪类 | 描述|
|---|---|
|:link | 所有未访问链接|
|:visited | 所有访问过的链接|
|:hover | 鼠标放到标签上的时候|
|:active | 鼠标点击标签的状态|
|:focus | 标签获得焦点时的样式|

```html
 <body>
     <a href="www.baidu.com">百度</a>
 </body>
 <style>
     /*让超链接点击之前是黑色*/
     a:link {
         color: black;
     }
     /*让超链接点击之后是蓝色*/
     a:visited {
         color: blue;
     }
     /*鼠标悬停，放到标签上的时候是绿色*/
     a:hover {
         color: green;
     }
     /*鼠标点击链接，但是不松手的时候*/
     a:active {
         color: red;
     }
 </style>
```

这四种状态必须按照固定的顺序写：`a:link` 、`a:visited` 、`a:hover` 、`a:active` 优先级依次减小

### 结构化伪类

|伪类 | 例子 | 例子说明|
|---|---|---|
|:first-of-type | p:first-of-type | 选择的每个 p 元素是其父元素的第一个 p 元素|
|:last-child | p:last-child | 选择所有p元素的最后一个子元素|
|:last-of-type | p:last-of-type | 选择每个p元素是其母元素的最后一个p元素|
|:not(selector) | :not(p) | 选择所有p以外的元素|
|:nth-child(n) | p:nth-child(2) | 选择所有 p 元素的父元素的第二个子元素|
|:nth-last-child(n) | p:nth-last-child(2) | 选择所有p元素倒数的第二个子元素|
|:nth-last-of-type(n) | p:nth-last-of-type(2) | 选择所有p元素倒数的第二个为p的子元素|
|:nth-of-type(n) | p:nth-of-type(2) | 选择所有p元素第二个为p的子元素|
|:only-of-type | p:only-of-type | 选择所有仅有一个子元素为p的元素|
|:only-child | p:only-child | 选择所有仅有一个子元素的p元素|
|:first-child | p:first-child | 选择器匹配属于任意元素的第一个子元素的元素|
|:root | root | 选择文档的根元素|
|:target | #main:target | 选择当前活动#main元素(点击URL包含锚的名字)|

### 表单类

|伪类|例子|例子说明|
|---|---|---|
|:checked|input:checked|选择所有选中的表单元素|
|:disabled|input:disabled|选择所有禁用的表单元素|
|:emptyp|:empty|选择所有没有子元素的p元素|
|:enabled|input:enabled|选择所有启用的表单元素|
|:valid|input:valid|选择所有有效值的属性|
|:out-of-range|input:out-of-range|选择指定范围以外的值的元素属性|
|:invalid|input:invalid|选择所有无效的元素|
|:optional|input:optional|选择没有"required"的元素属性|
|:read-only|input:read-only|选择只读属性的元素属性|
|:read-write|input:read-write|选择没有只读属性的元素属性|
|:in-range|input:in-range|选择元素指定范围内的值|
|:required|input:required|选择有"required"属性指定的元素属性|

### 语言类

| 伪类 | 例子 | 例子说明|
|---|---|---|
|:lang(language) | p:lang(it)|为元素的lang属性选择一个开始值|
|:dir | | 匹配特定文字书写方向的元素|

```html
 <body>
     <p lang="main">你好</p>
     <p>百度</p></p>
 </body>
 <style>
    p:lang(main){
        background: burlywood;
    }
 </style>
```
