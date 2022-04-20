## transition 和 animation 的区别

> transition关注的是CSS property的变化，property值和时间的关系是一个三次贝塞尔曲线。
>
> animation作用于元素本身而不是样式属性，可以使用关键帧的概念，应该说可以实现更自由的动画效果。
>
> CSS transition 强调的是单一动画属性的过度效果,其过程是简单的，由开始到结束的过程，中间不存在可能的动画转折，只有0到1，比喻：渐隐，渐显;
>
> CSS animation 强调的是多种动画属性的结合，按时间轴线出现周折性动画变换的动画过程，其过程是复杂的，由开始——>结束的过程中，存在可能的动画转折，其过程可能是开始—0—1—2—3>结束的过程
>
> 综合来说：CSS animation可以包括CSS transition 的动画形式

## 如何让去除 inline-block 元素间间距

初始代码

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/change.css">
</head>
<body>

    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>

</body>
</html>
```

> 方法一：（移除标签间的空格）

```html
<!-- 移除标签间的空格 --> 
<div class="box"></div>
<div class="box"></div>
<div class="box"></div>

<div class="box"></div><div class="box"></div><div class="box"></div>
```

> 方法二：（使用margin负值）

```css
* {
  padding: 0;
  margin: 0;
}

.box {
  /* 省略的代码 */
  margin-right: -5px;
}
```

> 方法三：（给==父元素节点==添加 font-size:0;）

```css
body {
  font-size: 0;
}
```

> 方法四：（给==父元素节点==添加 letter-spacing 的负值）

```css
body {
  letter-spacing: -5px;
}
```

> 方法五：（给==父元素节点==添加 word-spacing 的负值）

```css
body {
  word-spacing: -5px;
}
```

## **如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）**

因为一般的屏幕刷新率为60Hz，指在1秒屏幕刷新60次，所以最短的动画时间间隔为1/60*1000ms=16.7ms

## 使用 rem 布局的优缺点？

```bash
优点：
在屏幕分辨率千差万别的时代，只要将rem与屏幕分辨率关联起来就可以实现页面的整体缩放，使得在设备上的展现都统一起来了。
而且现在浏览器基本都已经支持rem了，兼容性也非常的好。

缺点：
（1）在奇葩的dpr设备上表现效果不太好，比如一些华为的高端机型用rem布局会出现错乱。
（2）使用iframe引用也会出现问题。
（3）rem在多屏幕尺寸适配上与当前两大平台的设计哲学不一致。即大屏的出现到底是为了看得又大又清楚，还是为了看的更多的问
题。
```

## 画一条0.5px的线

```bash
# PC端
采用transform:scale(0.5)的方式

采用border-image的方式

# 移端开发
<meta name="viewport" content="width=device-width, initial-scale=0.5">
```

## margin:auto 的填充规则？

```bash
margin的'auto'可不是摆设，是具有强烈的计算意味的关键字，用来计算元素对应方向应该获得的剩余间距大小。但是触发margin:auto计算有一个前提条件，就是width或height为auto时，元素是具有对应方向的自动填充特性的。

（1）如果一侧定值，一侧auto，则auto为剩余空间大小。
（2）如果两侧均是auto，则平分剩余空间。
```

## letter-spacing 与字符间距？

```bash
letter-spacing可以用来控制字符之间的间距，这里说的“字符”包括英文字母、汉字以及空格等。

letter-spacing具有以下一些特性。

（1）继承性。
（2）默认值是normal而不是0。虽然说正常情况下，normal的计算值就是0，但两者还是有差别的，在有些场景下，letter-spacing会调整normal的计算值以实现更好的版面布局。
（3）支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列。
（4）和text-indent属性一样，无论值多大或多小，第一行一定会保留至少一个字符。
（5）支持小数值，即使0.1px也是支持的。
（6）暂不支持百分比值。
```

## word-spacing 与单词间距？

```bash
letter-spacing作用于所有字符，但word-spacing仅作用于空格字符。换句话说，word-spacing的作用就是增加空格的间隙
宽度。
```

## white-space 与换行和空格的控制？

```bash
white-space属性声明了如何处理元素内的空白字符，这类空白字符包括Space（空格）键、Enter（回车）键、Tab（制表符）
键产生的空白。因此，white-space可以决定图文内容是否在一行显示（回车空格是否生效），是否显示大段连续空白（空格是否
生效）等。

其属性值包括下面这些。
•normal：合并空白字符和换行符。
•pre：空白字符不合并，并且内容只在有换行符的地方换行。
•nowrap：该值和normal一样会合并空白字符，但不允许文本环绕。
•pre-wrap：空白字符不合并，并且内容只在有换行符的地方换行，同时允许文本环绕。
•pre-line：合并空白字符，但只在有换行符的地方换行，允许文本环绕。
```

## 关于css动画tansform：translateZ(100px) 失效

给==**父类**==加`perspective`属性

```css
.father {
      perspective: 200px;
}
```

## **说一下盒子模型**

<mark>盒子的组成: content、padding、border、margin</mark>

盒子模型分两种：

1. 标准盒子模型

2. 替代（IE）盒子模型

两种盒子模型的区别:

* 对于标准盒子模型: **width和height只包含content**

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h186ougnxij20k20bdjs8.jpg)

* 对于替代盒子模型: **width和height包含content、padding、border**，而此时设置padding和border的值，浏览器会通过打压content的大小，来设置padding和border，<u>当padding或border的值大于设置的width和height时，那此时的盒子会被撑破，超出一开始设置的width和height</u>

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h186po2hfpj20l60b5mxz.jpg)

更多内容：[盒模型 - 学习 Web 开发 | MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)

## box-sizing的border-box和content-box的区别

border-box将盒子设置为替代盒子模型，而content-box将盒子设置为标准盒子模型（默认）

## CSS 块元素与行内元素

### 块元素

```html
<h1>...</h1>  标题一级

<h2>...</h2>  标题二级

<h3>...</h3>  标题三级

<h4>...</h4>  标题四级

<h5>...</h5>  标题五级

<h6>...</h6>  标题六级

<hr>  水平分割线

<p>...</p>  段落

<pre>...</pre>  预格式化

<blockquote>...</blockquote>  段落缩进   前后5个字符

<marquee>...</marquee>  滚动文本

<ul>...</ul>  无序列表

<ol>...</ol>  有序列表

<dl>...</dl>  定义列表

<table>...</table>  表格

<form>...</form>  表单

<div>...</div>
```

### 行内元素

```html
<span>...</span>

<a>...</a>  链接

<br>  换行

<b>...</b>  加粗

<strong>...</strong>  加粗

<img >  图片

<sup>...</sup>  上标

<sub>...</sub>  下标

<i>...</i>  斜体

<em>...</em>  斜体

<del>...</del>  删除线

<u>...</u>  下划线

<input>...</input>  文本框

<textarea>...</textarea>  多行文本

<select>...</select>  下拉列表
```

## 行内元素与块元素、行内块元素的区别

块元素:

1. 总是从新的一行开始,即各个块元素独占一行

2. 高度、宽度、margin及padding都是可控的，设置有效，有边距效果；

3. 宽度没有设置时,默认100%

4. 块级元素中可以包含块级元素和行内元素

行内元素:

1. 行内元素会和其他行内元素在一条水平线上排列

2. 设置宽高、以及margin和padding的上下无效 (注意: <mark>padding的上下设置后可以显示,但是在布局中无效</mark>)

3. 根据标签语义化的理念，行内元素最好只包含行内元素，不包含块级元素; a 链接里面不能再放链接

行内块元素:

* 结合了块元素和行内元素的特点

1. 和相邻行内元素在同一行, 但是之间会有空白缝隙。(如何去掉间隙,可以查看上面的问题)

2. 默认宽度是他本身内容的宽度。

3. 宽度、高度、行高、外边距以及内边距都可以手动设置。

## 哪些标签有默认margin（且不为0）

> body、h1、p、dl、ul、ol标签

## 说一说BFC

### What is the BFC

简单来说就是，`BFC`是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。那么怎么使用`BFC`呢，`BFC`可以看做是一个`CSS`元素属性

### 如何触发BFC

这里简单列举几个触发`BFC`使用的`CSS`属性

- overflow: hidden
- display: inline-block
- position: absolute
- position: fixed
- display: table-cell
- display: flex

### BFC的规则

- `BFC`就是一个块级元素，块级元素会在垂直方向一个接一个的排列
- `BFC`就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
- 垂直方向的距离由margin决定， 属于同一个`BFC`的两个相邻的标签外边距会发生重叠
- 计算`BFC`的高度时，浮动元素也参与计算

### BFC解决的问题

> 解决高度塌陷问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>高度塌陷</title>
    <style>
        body {
            margin: 0;
        }
        .box {
            margin: 100px;
            width: 100px;
            height: 100px;
            background: red;
            float: left;
        }
        .container {
            background: #000;
            /* 
                - 触发BFC，解决高度塌陷问题
                - 触发以下任意一个属性都可以
            */
            /* overflow: hidden; */
            /* display: inline-block; */
            /* position: absolute; */
            /* position: fixed; */
            /* display: table-cell; */
            /* display: flex; */
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>
</html>
```

> 解决Margin边距重叠问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
        }
        .box {
            width: 100px;
            height: 100px;
            margin: 10px;
            background-color: black;
        }
        .bfc {
            /* 
                - 触发BFC，解决高度塌陷问题
                - 触发以下任意一个属性都可以
            */
            /* display: inline-block; */
            /* position: absolute; */
            /* position: fixed; */
        }
    </style>
</head>
<body>

    <div class="box"></div>
    <!-- 
        另外一种方式，为元素包裹一个盒子形成一个
        完全独立的空间，做到里面元素不受外面布局影响 
        - 添加一个p标签
    -->
    <!-- <p> -->
        <div class="box bfc"></div>
    <!-- </p> -->

</body>
</html>
```

> 解决两栏布局问题

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>两栏布局</title>
    <style>
        div {
            width: 200px;
            height: 100px;
            border: 1px solid red;
        }

        .bfc {
            /* 
                - 触发BFC，解决高度塌陷问题
                - 触发以下任意一个属性都可以
            */
            /* overflow: hidden; */
            /* display: inline-block; */
            /* display: table-cell; */
            /* display: flex; */
        }
    </style>
</head>

<body>
    <div style="float: left;">
        两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局两栏布局
    </div>
    <div style="width: 300px;" class="bfc">
        我是蛙人，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭，如有帮助请点个赞叭
    </div>
</body>

</html>
```

## CSS权重 ( CSS优先级 )

> `先说继承性, 再谈选择器优先级`

**CSS 优先规则1：** 最近的祖先样式比其他祖先样式优先级高。

**CSS 优先规则2：**"直接样式" (指直接作用在自身的样式,而非继承而来的) 比"祖先样式"优先级高。

> 选择器优先级

!important > 行内样式(`1000`) > id选择器(`100`) > 类选择器 | 伪类选择器 | 属性选择器(`10`) > 标签选择器｜伪元素选择器 (`1`)

> 错误说法
>
> 11 个类选择器组成的选择器和一个由 1 个 ID 选择器组成的选择器指向同一个标签, 最后应用11个类选择器对应的样式 (❌)

解释:

在学习过程中，你可能发现给选择器加权值的说法，即 ID 选择器权值为 100，类选择器权值为 10，标签选择器权值为 1，当一个选择器由多个 ID 选择器、类选择器或标签选择器组成时，则将所有权值相加，然后再比较权值。这种说法其实是有问题的。比如一个由 11 个类选择器组成的选择器和一个由 1 个 ID 选择器组成的选择器指向同一个标签，按理说 110 > 100，应该应用前者的样式，然而事实是应用后者的样式。错误的原因是：**权重的进制是并不是十进制，CSS 权重进制在 IE6 为 256，后来扩大到了 65536，现代浏览器则采用更大的数量。**。还是拿刚刚的例子说明。11 个类选择器组成的选择器的总权值为 110，但因为 11 个均为类选择器，所以其实总权值最多不能超过 100， 你可以理解为 99.99，所以最终应用后者样式。

参考: [CSS 样式优先级 | 菜鸟教程](https://www.runoob.com/w3cnote/css-style-priority.html)

## `+`和`~`

* 相邻兄弟选择器（'+'）: 选择`紧接`在另`一个`元素后的元素，而且二者有`相同的父元素`。

* 兄弟选择器（'~'）: 选择在某元素`之后`的`所有兄弟`元素，`不一定要紧跟`在后面，但必须得是`相同父元素`.

## height、min-height、max-height

1、min-height和height同时使用，谁大听谁的

2、max-height和height同时使用，谁小听谁的

3、height、min-heigth和max-height同时使用，分为以下情况

- height > max-height > min-height 元素高度：max-height

- height > min-height > max-height 元素高度：min-height

- max-height > height > min-height 元素高度：height

- max-height > min-height > height 元素高度：min-height

- min-height > height > max-height 元素高度：min-height

- min-height > max-height > height 元素高度：min-height

## CSS属性继承

所有元素可继承：visibility和cursor。
内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
终端块状元素可继承：text-indent和text-align。
列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
原文链接:  https://blog.csdn.net/drdongshiye/article/details/77619680

## CSS定位详解

`position`属性有五个值, 分别是`static、relative、absolute、fixed、sticky`

最后一个`sticky`是浏览器2017年才支持的

### static

`static`是`position`的默认属性值, 此时设置`top、left、right、bottom`是没有效果的

### relative、absolute、fixed

`对于这三个属性值来说都是一个思想, 都是相对于谁来进行定位, 只不过是参考对象不同`

> relative

首先`relative`是相对于元素自身的`static`状态进行位置偏移的, 通过设置`top、left、right、bottom`来对其设置偏移

注意: `relative`没有脱离文档流, 所以即使发生偏移, 也会保留其原来的元素位置

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e4fd2oj3j21c00u0dkl.jpg)

> absolute

而对于`absolute`, 一般是相对于父元素进行偏移, 如果父元素是`static`定位, 则设置`absolute`的当前元素的参考点就会变成`祖先元素`, 而且`absolute`也需要搭配`top、left、right、bottom`

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e43389vuj21c00u0q7z.jpg)

注意下面这张图!!

```css
body {
  margin: 0;
  height: 2000px;
}
/*
  <div id="grandfather">
    <div id="father">  
      <div id="son">子元素</div>  
    </div>
  </div>
*/
#grandfather {
  width: 300px;
  height: 300px;
  background: skyblue;

  margin-top: 100px;
  margin-left: 100px;

  position: relative;  /* 祖先元素为 relative 定位 */
}
#father {
  width: 200px;
  height: 200px;
  background: greenyellow;

  position: static;  /* 父元素为 static 默认定位 */
}
#son {
  width: 100px;
  height: 100px;
  background: orange;

  /* 此时子元素是相对于 祖先元素 进行定位, 而不是相对于 html 定位 */
  position: absolute;  
  top: 20px;
  left: 20px;
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e5fjy0kjj21c00u0afe.jpg)

注意: `absolute`定位使该元素脱离文档流, 在原来的布局中所占空间为零

> fixed

该属性是相对于视窗 (viewport) 来进行偏移, 所以当我们滚动页面时, 会一直定位在当前适口的某一个位置, 不会随页面滚动而移动

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e47bgkj7j21c00u0gqe.jpg)

但如果你设置此时的`left`为一个负值, 自然当前的`#child`会向左边移动, 甚至消失在视图中

注意: `fixed`定位也使该元素脱离文档流, 在原来的布局中所占空间为零

> 所以`relative、absolute、fixed`中只有`relative`定位在发生偏移时,没有脱离原来的布局

### sticky

而`sticky`相当于是`relative`和`fixed`的结合, 当不滚动页面时, `sticky`定位会像`relative`一样进行定位, 当页面滚动时, `sticky`定位会和`fixed`定位一样固定在视窗中某一个位置(但是相当于 `fixed`时候存在一个问题, 看后文注意点)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e4yh2kshj21c00u0af3.jpg)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e4zzfduej21c00u0aev.jpg)

> 这里有一点值得注意

就是当页面进行滚动时, `sticky`就会像`fixed`定位一样固定, 但是`sticky`的固定并不是一定就相对于视窗的, 而是相对于外层的父元素而言, 当外层的父元素滚动出页面, 则此时设置`sticky`定位的子元素也会随着父元素一并带离页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>复习CSS定位</title>
  <style>
    body {
      margin: 0;
      height: 2000px;
    }
    .box {
      width: 500px;
      height: 500px;
      background-color: pink;
    }
    .container {
      width: 100px;
      height: 100px;
      background-color: coral;

      position: sticky;
      top: 60px;
      left: 60px;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="container"></div>
  </div>
</body>
</html>
```

执行效果:

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1fxcu277rj21c00u0gps.jpg)

参考: [CSS 定位详解 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2019/11/css-position.html)

## Flex 布局

### Flex 布局概念

Flex布局是2009年W3C组织提出的一种不同于传统布局的布局方式, 被成为 “弹性” 布局.

该布局存在两个轴作为基本布局依据, 分别是沿着水平方向上的主轴(`默认为水平方向`), 和垂直于主轴的交叉轴,  `Flex布局中的每一个元素默认沿主轴排列`.

### 容器属性

> 定义在外层容器上的属性

```bash
1. flex-direction
2. justify-content
3. flex-wrap
4. flex-flow
5. align-items
6. align-content
```

> flex-direction

`flex-direction`属性决定主轴的方向（也是其中各个元素的排列方向）

> justify-content

设置元素在主轴方向上的排列形式

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e7b7e4f6j20hp0l7wf6.jpg)

> flex-wrap

对于这个属性, 对于其属性值`wrap | nowrap`顾名思义就是设置子元素换行和不换行.

重点提一下`wrap-reverse`效果, 是在换行的基础下, 把第一行设置在下面

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e76mnou6j21c00u0af8.jpg)

这里需要注意一点, 就是如果`Flex`容器设置了高度 , 并且高于其中每列元素高度相加的和, 那么换行的元素就不会紧贴这前一行的元素了, 而是随着容器高度的变大, 间隙也增大

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e9waelfzj21c00u0q8m.jpg)

> flex-flow

`flex-flow`是`flex-direction`和`flex-wrap`的简写形式, 默认为`row nowrap`

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

> align-items

设置元素在交叉轴方向上的排列形式

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e7fkfn2aj20h50lu752.jpg)

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`: `以其中的元素的第一行文字的基线对齐。`
- `stretch`（默认值）：如果其中的元素`未设置高度或设为auto`，将占满整个容器的高度。如果设置了高度, 则效果同`flex-start`

> align-content

`align-content`定义了多根轴线的排列方式, 如果其中的元素为一根轴线则该属性不起效果

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1e9i17we3j20h80luq41.jpg)

注意: 注意下这里换行时,  容器高度所产生的间隙随容器高度而变化!

> 假如在弹性布局中`align-items`和`align-content`都定义时, 在交叉轴上的布局应该听谁的?

最主要的一点就是看是否定义`flex-wrap`, 定义该该属性后, `align-content`起作用, 否则就是`align-items`起作用

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>复习巩固Flex布局</title>
  <style>
    body {
      margin: 0;
    }
    .container {
      height: 300px;
      background-color: blanchedalmond;
      /* 
        由于定义了 flex-wrap: wrap; 所以
        此时 align-content: flex-start; 起作用
        即使此时的子元素在视觉上并为产生多行的效果
      */
      display: flex;
      align-items: center;   
      justify-content: space-around;
      flex-wrap: wrap;
      align-content: flex-start;
    }
    .container .item {
      width: 100px;
      height: 100px;
      background-color: pink;
      font-size: 30px;
      border: 1px solid orangered;
    }
  </style>
</head>

<body>  
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>
</body>

</html>
```

### 容器中元素的属性

```bash
1. order
2. flex-grow
3. flex-shrink
4. flex-basis
5. flex
6. align-self
```

> order

`order`属性定义元素的排列顺序. 数值越小, 排列越靠前, 默认为 0

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1eagqluzrj21c00u044n.jpg)

> flex-grow

`flex-grow`定义元素的放大比例. 是基于每行的`剩余空间`进行分配, 默认为 0, 即如果存在剩余空间, 也不分配.

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1eawu5vnsj21c00u0gr2.jpg)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1eay9vbmaj21c00u0tew.jpg)

> flex-shrink

该属性定义了元素的`缩小`比例, 默认为1, 如果空间充足, 则不起作用. 单行产生压缩时, 将压缩部分按比例分配给子元素进行压缩.(一开始所有子元素的压缩宽度相同)

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1eqgg820hj21c00u0q9n.jpg)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1eqhzzg3ej21c00u0q9k.jpg)

图中的绿色块没有缩放, 因为设置的`flex-shrink`为0, 而粉色的缩放内容是橙色的两倍, 因为粉色的`flex-shrink`设置为2, 橙色的为1. 

> flex-basis

该属性定义了在分配多余空间`之前`, 元素占据的主轴空间. 浏览器根据这个属性进行计算, 判断是否还有多余空间. 默认值为auto

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1er4iofyvj21c00u044q.jpg)

设置元素的固定宽度为`170px`

如果设置百分比的值, 则相对于容器的宽度设置的百分

- 如果设置子元素的`flex-basis`宽度就导致单行元素产生压缩, 而此时的`flex-shrink`为默认值1, 则压缩时, 是按照设置的`flex-basis`比例进行分配压缩

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>复习巩固Flex布局</title>
  <style>
    body {
      margin: 0;
    }
    .container {
      height: 300px;
      background-color: blanchedalmond;

      display: flex;
      align-items: center;   
      justify-content: space-around;
    }
    .container .item {
      width: 150px;
      height: 150px;
      background-color: pink;
      font-size: 30px;
    }
    /* 
      此时
      第一个元素压缩部分: 第二个元素压缩部分 = 300 : 200 = 3 : 2
    */
    .container .item:nth-child(1) {
      flex: 0 1 300px;
    }
    .container .item:nth-child(2) {
      flex: 0 1 200px;   
    }
    .container .item:nth-child(3) {
      flex: 0 1 300px;
    }
  </style>
</head>

<body>  
  <div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>
</body>
</html>
```

> flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值.

> align-self

默认值为auto, 会为当前元素覆盖掉设置在`Flex`容器上的`align-items`属性

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

比`align-items`属性多了一个auto值, 其他同`align-items`

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1es2k4owaj21c00u0dl8.jpg)

参考: [Flex 布局教程：语法篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

