# CSS介绍

CSS是Cascading Style Sheets(层叠样式表)的缩写。
CSS是一门语言（DSL）。
CSS用来指定HTML元素的外观的。外观包括：大小（宽，高），位置，内容的对齐方式，字体等等。
下面是CSS代码：

```css
.intro{
    width: 100px;
    height: 200px;
    color: #ff0;
    background-color:red;
}
```

上面代码的意思是，指定所有类名为`intro`的元素有这样的外观：宽度为`100px`,高度为`200px`,字体颜色为`#ff0`,背景色为红色。

样式由**选择器**和**声明**两部分组成。声明由**属性**和**值**组成。
在上面的例子中

* `.intro` 为选择器。
* `width: 100px;height: 200px;` 为声明
* `width,color` 为声明的属性
* `100px,#f00` 为声明的值

## 层叠

层叠样式表中的层叠的意思是：对同一个元素来，可以用多种选择器来选择（或者说指定）它。如对于一个如下的元素：

```html
<div class="box" id="play-music-box"></div>
```

以下的选择器均可以选择它

* `div`
* `.box`
* `#play-music-box`

每个选择器的都可以定任意的规则。因此，有这样的可能，不同选择器都定义了一样的规则，但样式规则的值是不同的。这时，元素会怎么显示这规则？报错？啥都不显示？还是？

答案是：元素显示权重高的选择器中定义的那条规则。

## 书籍推荐

* [《图解CSS3：核心技术与案例实战》](http://www.w3cplus.com/book-comment.html)
* CSS权威指南
* 禅意花园
* CSS那些事儿（林小志）