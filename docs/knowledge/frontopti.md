# 前端性能与优化

## 为什么不推荐用多层css选择器

> #### 如何减少 CSS 选择器性能损耗？
>
> Google 资深web开发工程师 [Steve Souders](https://link.jianshu.com/?t=http://stevesouders.com/) 对 CSS 选择器的执行效率从高到低做了一个排序：
>
> > 1.id选择器（#myid）
> > 2.类选择器（.myclassname）
> > 3.标签选择器（div,h1,p）
> > 4.相邻选择器（h1+p）
> > 5.子选择器（ul < li）
> > 6.后代选择器（li a）
> > 7.通配符选择器（*）
> > 8.属性选择器（a[rel="external"]）
> > 9.伪类选择器（a:hover, li:nth-child）

根据以上「选择器匹配」与「选择器执行效率」原则，我们可以通过避免不恰当的使用，提升 CSS 选择器性能。

1. 避免使用通用选择器

   ```css
   .content * {color: red;}
   ```

   浏览器匹配文档中所有的元素后分别向上逐级匹配 class 为 content 的元素，直到文档的根节点。因此其匹配开销是非常大的，所以应避免使用关键选择器是通配选择器的情况。

2. 避免使用标签或 class 选择器限制 id 选择器

   ```css
   BAD
   button#backButton {…}
   BAD
   .menu-left#newMenuIcon {…}
   GOOD
   #backButton {…}
   GOOD
   #newMenuIcon {…}
   ```

3. 避免使用标签限制 class 选择器

   ```css
   BAD
   treecell.indented {…}
   GOOD
   .treecell-indented {…}
   BEST
   .hierarchy-deep {…}
   ```

4. **避免使用多层标签选择器。使用 class 选择器替换，减少css查找**

   ```css
   BAD
   treeitem[mailfolder="true"] > treerow > treecell {…}
   GOOD
   .treecell-mailfolder {…}
   ```

5. 避免使用子选择器

   ```css
   BAD
   treehead treerow treecell {…}
   BETTER, BUT STILL BAD 
   treehead > treerow > treecell {…}
   GOOD
   .treecell-header {…}
   ```

6. 使用继承

   ```css
   BAD 
   #bookmarkMenuItem > .menu-left { list-style-image: url(blah) }
   GOOD
   #bookmarkMenuItem { list-style-image: url(blah) }
   ```

[如何提升 CSS 选择器性能]: https://www.jianshu.com/p/268c7f3dd7a6

## **浏览器是如何渲染网页的**（伴随问题！）

> 浏览器开发团队的图

<img src="https://tva1.sinaimg.cn/large/008i3skNly1gvg8j8qfzuj60hc08174k02.jpg" style="zoom:120%;" />

> 自画图（不完整了，后面有完整的）

<img src="https://tva1.sinaimg.cn/large/008i3skNly1gvgbrxefc3j321n0u0znl.jpg" style="zoom:100%;" />

通过图，我们可以知道浏览器是将我们的静态资源`HTML`文件通过`HTML Parser`解析成`DOM Tree`，在建立`Render Tree`时，浏览器会为`DOM Tree`中的`DOM`元素根据`CSS`的解析结果（`Style Rules`）来确定生成怎样的`Render Object`。对于每个DOM元素，必须在所有`Style Rules`中找到符合的`selector`并将对应的规则进行合并。选择器的==解析（后面有一个相关问题）==实际是在这里执行的。

![img](http://www.nowamagic.net/librarys/images/201405/2014_05_04_02.gif)

基于DOM树的一些可视（visual）的节点，WebKit来根据需要来创建相应的RenderObject节点，这些节点也构成了一颗树，称之为**Render树**。基于Render树，WebKit也会根据需要来为它们中的某些节点创建新的RenderLayer节点，从而形成一棵RenderLayer树。

Render树和RenderLayer树是WebKit支持渲染所提供的基础但是却非常重要的设施。这是因为WebKit的布局计算依赖它们，浏览器的渲染和GPU硬件加速也都依赖于它们。幸运地是，得益于它们接口定义的灵活性，不同的浏览器可以很方便地来实现自己的渲染和加速机制。

> Render Tree 的建立

是基于DOM树建立的一颗新的树，Render树节点与DOM树节点不是一一对应关系：

* DOM树的document节点需要建立Render节点；
* DOM树中的可视化节点，例如HTML，BODY，DIV等，非可视化节点不会建立Render树节点，例如HEAD，META，SCRIPT等；
* 某些情况下需要建立匿名的Render节点，该节点不对应于DOM树中的任何节点；

> 参考资料

[浏览器是如何渲染网页的]: https://zhuanlan.zhihu.com/p/25554352
[为什么排版引擎解析 CSS 选择器时一定要从右往左解析？]: https://www.zhihu.com/question/20185756
[浏览器渲染原理与过程]: https://www.jianshu.com/p/e6252dc9be32
[how browsers work]: http://taligarsiel.com/Projects/howbrowserswork1.htm
[WebKit渲染基础之Render树的建立]: https://www.zhoulujun.cn/html/webfront/browser/webkit/2015_1213_357.html

### 什么是重绘和回流

> 重绘（Repaint）

当页面元素样式的改变不影响元素在文档流中的位置时（例如**background-color, border-color,visibility**）,浏览器只会将新样式赋予元素并进行重绘操作。（==在Painting阶段==）

> 回流（Reflow）

当改变影响文档内容或者结构，或者元素位置时，回流操作就会被触发（==Layout阶段==）一般有以下几种情况：

- DOM操作（对元素的增删改，顺序变化等）；
- 内容变化，包括表单区域内的文本改变；
- CSS属性的更改或重新计算；
- 增删样式表内容；
- 修改class属性；
- 浏览器窗口变化（滚动或缩放）；
- 伪类样式激活（**:hover**等）。

> 因为浏览器的渲染是先经过`Layout`然后才是`Painting`，所以==重绘不一定会引起回流，但是回流一定引起重绘！==    

### 强制回流的例子

获取某个元素的属性会触发强制回流

[强制回流的🌰]: http://output.jsbin.com/qutev/1/

### 排版引擎解析CSS选择器时要从右往左解析

<img src="https://tva1.sinaimg.cn/large/008i3skNly1gvgcfyi9gtj60zm0lotaq02.jpg" style="zoom:57%;" />

例如找 `#next div`

因为正向解析，先从`body`开始遍历，然后到`#header`，然后找`#header`的第一个孩子节点`a`，如果不是要找的，回溯到前一个节点，然后一直这样找，直到找到`#next`下的`div`标签。通过这样的回溯算法，执行效率是很低的！

但是如果通过逆向解析，自下而上的去匹配，先从最右边的`a`标签开始，因为要找的是`div`，所以直接排除，然后是下一个div标签，满足一个情况，接着网上看他的父元素，发现是`#header`，和我要找的`#next`不匹配，再排除，然后依次往后这样去遍历，这样的时间复杂度就是`O(n)`，比前一种效率高很多。(==这一段的解释感觉不太正确！！==)

## 从浏览器地址栏输入URL到页面显示的过程，浏览器都经历了什么？

一个分为四个部分：

1. 网络线程的开启（网络进程发起请求并从服务器下载静态资源）
2. 建立 HTTP 连接（ DNS 解析、TCP 连接）
3. 前后端交互（反响代理服务器、涉及 HTTP 特性、强缓存和协商缓存）
4. 页面渲染（对第三步中获取的 HTML、CSS、JS 资源进行布局渲染）

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5haljfirj310q0otwgj.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNly1gw5h9o5h8mj30yw0q70u7.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNgy1gw6pwnxw4mj325c0e80u7.jpg)

涉及到 JS 处理在最前面的原因，去看阻塞渲染！

## 浏览器是怎样解析HTML页面的？

整个`DOM`的解析过程是顺序的，并且`渐进式`的。

`渐进式`指的是浏览器会迫不及待的将解析完成的部分显示出来，如果我们做下面这个实验会发现，在`断点`处第一个`div`已经在浏览器渲染出来了：

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div>
        first div
    </div>
    <script>
        debugger
    </script>
    <div>
        second div
    </div>
</body>
</html>
```

### CSS的阻塞情况

1. css不会阻塞dom的解析

2. css会阻塞dom的渲染

3. css会阻塞js（js会阻塞dom，从而间接阻塞dom解析，但前提是js之前的css）

### 阻塞dom的解析型

1. 内联 js

2. 外联普通 js

3. **js 标签之前的 css**（js 需要等前面的 css `<内联或外联>`加载完毕后，才开始执行，而 js 会阻塞`dom树`的解析，所以外联css 会间接阻塞`dom树`的解析）

### 不阻塞dom的解析型

1. image、iframe、audio

2. 外联 async js（**其实这里是可能阻塞，也可能不阻塞，需要根据 js 脚本的下载结束时间来决定**）

3. **外联 defer js**（`defer javascript`是在`dom树`构建完成后，`DOMContentLoaded`事件派发之前请求并执行的）

4. js 标签之后的 css

### 外联 js 的三种加载过程

- 外联普通javascript

```html
<script src="indx.js"></script>
```

- 外联defer javascript

```html
<script defer src="indx.js"></script>
```

- 外联async javascript

```html
<script async src="indx.js"></script>
```

如下图所示，绿色表示`html`解析；灰色表示`html`解析暂停；紫色表示`外联javascript`加载；粉色表示`javascript执行`。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzmc7i06ajj20ji04jwei.jpg)

第一种外联普通 js，会阻塞`dom树`的解析。加载执行过程如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzmc8viqfwj20lb02wq2u.jpg)

第二种外联 defer js 不阻塞 html 解析，而是会暂存到一个队列中，等整个 html 解析完成后，再按照队列的顺序请求并执行 js，但是<mark>这种外联 defer js 全部加载并执行完成后才会派发`DOMContentLoaded`事件</mark>，加载过程如下：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzmcc8fxwvj20la02q746.jpg)

**第三种外联 async js 不阻塞 html 的解析过程，但是这里说的只是在 js 下载的过程不阻塞 html 的解析，如果 js 下载完成后 html 还没有解析完，则会暂停 html 解析，先执行下载完的 js ，然后再继续解析 html。过程如下：**

![](https://tva1.sinaimg.cn/large/e6c9d24egy1gzmcfqonmbj20lc02kglj.jpg)

详细情况：

[css加载会造成阻塞吗？](https://zhuanlan.zhihu.com/p/43282197)

[浏览器是如何解析html的？ - 掘金](https://juejin.cn/post/6844903745730396174)

## `window.onload`和`DOMContentLoaded`有什么区别？

* `window.onload`事件是在所有资源都加载完成（这些资源包括css、js、图片视频等）后，才执行

* html文档加载并解析完成，但是图片等资源还未完成加载，触发`DOMContentLoaded`事件

  但是实际上对于`DOMContentLoaded`事件还是分两种情况：

  1. 如果页面中同时存在 js 和 css，并且 js 在 css 后面，则`DOMContentLoaded`事件会在 css 加载完后才执行

  2. 其他情况，`DOMContentLoaded`都不会等待css加载，并且DOMContentLoaded事件也不会等待图片、视频等其他资源加载。

[css加载会造成阻塞吗？](https://zhuanlan.zhihu.com/p/43282197)

## 高性能代码

### 条件判断

* 当要匹配的条件仅为一两个离散值时，或者容易划分不同取值范围时，使用 if-else 语句
* 当要匹配的条件超过一两个但少于十个离散值，使用 switch 语句
* 超过十个，使用基于数组索引或者对象属性的查找方式

### 循环语句

* `for-of`性能优于 `for-in`和`forEach`，但是逊色于三种常规循环语句（for、while、do-while）
* 任何的递归都可转化为迭代，使用递归需要考虑浏览器对调用栈的大小限制

### 字符串处理

```js
function foo1() {
    let len = 2000;
    let str = '';
    while(len--) {
        str += 'a' + 'b';
    }
}

function foo2() {
    let len = 2000;
    let str = '';
    while(len--) {
        str = str + 'a' + 'b';
    }
}
```

函数 foo1的 while 循环中需要我们先创建一个临时变量用来存储 'ab'，然后再将这个临时变量和 str 变量进行拼接，最后再赋值给变量 str

而在函数 foo2 中，我们不需要去创建一个临时变量来存储 'ab'，而是直接将 'ab' 和 str 进行拼接，这在大部分浏览器中，将会提高 20% 的执行速度

### 浏览器的限制

引起 JS 执行时间过长的原因：

1. 对 DOM 的频繁修改
2. 不恰当的循环
3. 过深的递归

虚拟 DOM ：就是将真实的 DOM 抽象为 JS 对象，让 JS 对象去执行修改的中间过程，最后统一修改，这样就降低了频繁的操作 DOM 所带来的性能影响。

### **异步任务优化长线任务**

异步任务中的事件循环机制，这里不过多赘述，主要是讲利用异步任务对复杂计算（长任务）进行拆分处理，优化单线程的 JS 引擎执行效率

> 不阻塞页面渲染的快速响应

当我们创建一个异步任务后，它并没有马上执行，而是被 JS 引擎放置到一个队列中，当执行完一个任务脚本后，JS 引擎便会挂起让浏览器去做其他工作，比如更新页面，当页面更新完成后，JS 引擎便会查看任务队列，并取出一个任务执行。

据此我们便有了对执行长任务的一种优化策略，将一个长任务拆分为多个异步任务，从而让浏览器给刷新页面留出时间。

```js
function process(n) {
    // 模拟复杂计算
    let sum = 0;
    for(let i = 0; i < n; i++) {
        sum += i;
    }
    console.log(sum);
}

// 模拟将复杂的程序拆分话
function bigProcedure(arr) {
    setTimeout(() => {
        // 将复杂任务拆分执行
        const item = arr.shift();
        process(item);
        if(arr.length > 0) {
            setTimeout(bigProcedure(arr), 100)
            // setTimeout(arguments.callee(arr), 100)
        }

    },100)   // 设置100ms是因为这在用户的感知卡顿时间内
}

bigProcedure([10,20,30,40,50])
// 45
// 190
// 435
// 780
// 1225
```

### 避免多重求值

```js
/* 
    避免多重求值
*/
const a = 1, b = 2;
let result = 0;
setTimeout("result = a + b", 100);
setInterval("result = a + b", 100);
result = eval("a + b");
result = new Function("a", "b", "result = a + b");
```

以上代码，首先会以正常的方式进行一次求值，接着在执行过程中对字符串的代码进行一次额外的求值运算

### 使用位操作

```js
// 不使用位运算
let sum = 0;
for(let i = 0; i < 10; i++) {
    if(i % 2 == 0) {  // 找到偶数
        sum += i;
    }
}
console.log(sum);
```

```js
// 使用位运算
let sum = 0;
for(let i = 0; i < 10; i++) {
    if((i & 1) == 0) {   // 找到偶数
        sum += i;
    }
}
console.log(sum);
```

位操作通常发生在系统底层，可以极大的代码的执行效率。

### 使用原生方法

原生方法是我们在编写 JS 代码之前就已经存在于浏览器中，并且大多数都是用更底层的语言实现的，可以被编译成执行效率更高的机器码，所以我们要尽量的使用原生方法。而非自我编写的一些 JS 代码

## 渲染优化

### 阻塞渲染

JS可以操作DOM来修改DOM结构，可以操作CSSOM来修改节点样式，这就导致了浏览器在遇到`<script>`标签时，DOM构建将暂停，直至脚本完成执行，然后继续构建DOM。如果脚本是外部的，会等待脚本下载完毕，再继续解析文档。现在可以在`script`标签上增加属性`defer`或者`async`。脚本解析会将脚本中改变DOM和CSS的地方分别解析出来，追加到DOM树和CSSOM规则树上。

每次去执行JavaScript脚本都会严重地阻塞DOM树的构建，如果JavaScript脚本还操作了CSSOM，而正好这个CSSOM还没有下载和构建，浏览器甚至会延迟脚本执行和构建DOM，直至完成其CSSOM的下载和构建。所以，`script`标签的位置很重要。

JS阻塞了构建DOM树，也阻塞了其后的构建CSSOM规则树，整个解析进程必须等待JS的执行完成才能够继续，这就是所谓的JS阻塞页面。

由于CSSOM负责存储渲染信息，浏览器就必须保证在合成渲染树之前，CSSOM是完备的，这种完备是指所有的CSS（内联、内部和外部）都已经下载完，并解析完，只有CSSOM和DOM的解析完全结束，浏览器才会进入下一步的渲染，这就是CSS阻塞渲染。

CSS阻塞渲染意味着，在CSSOM完备前，页面将一直处理白屏状态，这就是为什么样式放在`head`中，仅仅是为了更快的解析CSS，保证更快的首次渲染。

需要注意的是，即便你没有给页面任何的样式声明，CSSOM依然会生成，默认生成的CSSOM自带浏览器默认样式。

当解析HTML的时候，会把新来的元素插入DOM树里面，同时去查找CSS，然后把对应的样式规则应用到元素上，查找样式表是按照从右到左的顺序去匹配的。

例如：`div p {font-size: 16px}`，会先寻找所有`p`标签并判断它的父标签是否为`div`之后才会决定要不要采用这个样式进行渲染）。
所以，我们平时写CSS时，尽量用`id`和`class`，千万不要过渡层叠。

### JS 动画优化

```js
let start;
// 定义目标动画元素
const element = document.getElementById('myAnimate');
element.style.position = 'absolute';

// 定义动画回调函数
function updateScreen(timestamp) {
    if(!start) start = timestamp;
    // 根据时间戳计算每次动画位移
    const progress = timestamp - start;
    element.style.left = `${Math.min(progress / 10, 200)}px`;
    if(progress < 2000) window.requestAnimationFrame(updateScreen);
}

// 启动动画回调函数
window.requestAnimationFrame(updateScreen);
```

使用 window.requestAnimationFrame 比使用 setInterval 去设置动画更优。

1. window.requestAnimationFrame 的执行时机与系统的刷新频率同步
2. 当页面会激活时，屏幕刷新任务会被系统暂停（而 setInterval 需要显示的销毁定时器）

### 事件防抖与节流

> 节流

```js
window.onscroll = foo(function(){
    // 业务代码
    console.log(123);
},1000);

function foo(fn, delay) {
    // 设置定时器
    var timer = null;
    return function() {
        // 当不存在定时器时，我们为其设置一个定时器，并进行执行内容
        if(!timer) {
            timer = setTimeout(() => {
                // 执行内容
                fn();
                clearTimeout(timer);
                timer = null;
            }, delay);
        }else {   // 定时器存在时，直接返回
            return false;
        }
    }
}
```

> 防抖

```js
let inputitem = document.getElementById('inputitem');
inputitem.oninput = bar(function(){
    console.log(this.value);
},400);

function bar(fn, timeout) {
    let timer = null;
    return function () {
        // 有就清理掉
        if (timer) {
            clearTimeout(timer);
        };

        timer = setTimeout(() => {
            fn.call(this);
        }, timeout || 700);

    }
}
```

### 使用 BEM 规范（简化样式查找）

一种CSS书写规范

### 减少回流和重绘

导致回流的原因：

1. 对 DOM 元素几何属性的修改（例如 width、height、padding、top）
2. 对 DOM 树的结构进行更改
3. 获取某些特定的属性值（例如 offsetTop、offsetLeft、offsetWidth等）

减少的方式：

1. 使用类名对样式逐条修改

   ```js
   // 获取 DOM，逐行修改
   const div = document.getElementById('mydiv');
   div.style.height = '100px';
   div.style.width = '200px';
   div.style.border = '2px solid blue';
   ```

   上面的方式，每一行都会触发一次渲染树的更改，导致多次回流。更好的做法是

   ```css
   .mydiv {
       height: 100px;
       width: 200px;
       border: 2px solid blue;
   }
   ```

   然后统一添加类

   ```js
   const div = document.getElementById('mydiv');
   div.classList.add('mydiv');
   ```

2. 缓存对敏感属性值的计算

   就是说不要直接使用 offsetTop 这些属性进行计算，而是将他们存储在一个变量中，进行计算，最后统一操作

3. 使用 requestAnimationFrame 方法控制渲染帧

### 降低绘制的复杂度

在绘制的过程中，对于不同的 CSS 样式，其实绘制的性能是不同的。

```css
#foo {
    /* 绘制时间相对较短 */
    border-color: red;
    /* 绘制时间相对较长 */
    box-shadow: 0 8px rgb(255, 220, 12);
}
```

所以对于类似阴影这样的样式，我们可以通过 PS 给图片本身加阴影，而非使用 CSS

## <mark>能谈谈前端性能优化的方案吗？</mark>

（1）减少http请求数量

在浏览器与服务器进行通信时，主要是通过 HTTP 进行通信。浏览器与服务器需要经过三次握手，每次握手需要花费大量时间。而且不同浏览器对资源文件并发请求数量有限（不同浏览器允许并发数），一旦 HTTP 请求数量达到一定数量，资源请求就存在等待状态，这是很致命的，因此减少 HTTP 的请求数量可以很大程度上对网站性能进行优化。

- **减少重定向请求次数**

* **CSS Sprites**

国内俗称CSS精灵，这是将多张图片合并成一张图片达到减少HTTP请求的一种解决方案，可以通过CSS的background属性来访问图片内容。这种方案同时还可以减少图片总字节数。

* **合并CSS和JS文件**

现在前端有很多工程化打包工具，如：grunt、gulp、webpack等。为了减少 HTTP 请求数量，可以通过这些工具再发布前将多个CSS或者多个JS合并成一个文件。

* base64编码图片并嵌入HTML文件,一并返回

还可以将图⽚的⼆进制数据⽤ base64 编码后，以 URL 的形式潜⼊到 HTML ⽂件，跟随 HTML ⽂件⼀并发送.

```html
<image
src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAFKCAIAAAC7M9WrAAAACXBIWXMAA
... />
```

- **采用lazyload**

俗称懒加载，可以控制网页上的内容在一开始无需加载，不需要发请求，等到用户操作真正需要的时候立即加载出内容。这样就控制了网页资源一次性请求数量。

（2）减少HTTP响应数据大小

* 无损压缩 (常见gzip、deflate、br)

  客户端发送请求时,会在请求头中书写客户端支持的压缩算法

  ```bash
  Accept-Encoding: gzip, deflate, br
  ```

  收到请求后, 服务端选择其中一个压缩算法进行响应数据压缩,并在响应头中告知客户端自身使用的压缩算法

  ```bash
  content-encoding: gzip
  ```

* 有损压缩

  * 通过牺牲一些质量来减少数据量、提高压缩比. 常⽤于压缩多媒体数据，⽐如⾳频、视频、图⽚。

  通过 HTTP 请求头部中的 Accept 字段⾥的「 q 质量因⼦」，告诉服务器期望的资源质量。

  ```bash
  Accept: audio/*; q=0.2, audio/basic
  ```

  图⽚的压缩，⽬前压缩常用的是 Google 推出的 WebP 格式

  ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0jk9kfh60j21lw0s2n4q.jpg)

  相同图⽚质量下，WebP 格式的图⽚⼤⼩都⽐ Png 格式的图⽚⼩.

  对于视频常⻅的编码格式有 H264、H265 等，⾳频常⻅的编码格式有 AAC、AC3。

（3）利用浏览器缓存

浏览器缓存是将网络资源存储在本地，等待下次请求该资源时，如果资源已经存在就不需要到服务器重新请求该资源，直接在本地读取该资源。

（4）控制资源文件加载优先级(从css、js阻塞角度去说)

浏览器在加载HTML内容时，是将HTML内容从上至下依次解析，解析到link或者script标签就会加载href或者src对应链接内容，为了第一时间展示页面给用户，就需要将CSS提前加载，不要受 JS 加载影响。

一般情况下都是CSS在头部，JS在底部。

（5）减少重排（Reflow）

基本原理：重排是DOM的变化影响到了元素的几何属性（宽和高），浏览器会重新计算元素的几何属性，会使渲染树中受到影响的部分失效，浏览器会验证 DOM 树上的所有其它结点的visibility属性，这也是Reflow低效的原因。如果Reflow的过于频繁，CPU使用率就会急剧上升。

减少Reflow，如果需要在DOM操作时添加样式，尽量使用 增加class属性，而不是通过style操作样式。

（6）减少 DOM 操作

（7）尽量外链CSS和JS（结构、表现和行为的分离），保证网页代码的整洁，也有利于日后维护

```html
<link rel="stylesheet" href="asstes/css/style.css" />

<script src="assets/js/main.js"></script>
```

（8）图标使用IconFont替换

（9）不使用CSS表达式，会影响效率

（10）使用CDN网络缓存，加快用户访问速度，减轻服务器压力

