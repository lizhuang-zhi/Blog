# 笔试错题记录

## 下列哪些方法可以产生可输入文本区

```html
1. <div contenteditable></div>   <!-- 注意这个! -->
2. <textarea></textarea>
3. <input />
```

## 下列哪个是用于 aira 无障碍属性的

```html
1. <div id="percent-loaded" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" />
2. <div role="radio" aria-checked="true" aria-label="单选2" tabindex="0">单选tabindex="0"</div>
```

所以是`role 属性`

## 以下哪些方法可以用来解决 JS 异步问题

1. promise
2. callback   ⚠️
3. async

## 下面哪种写法是正确的

```js
1. console.log(1); import foo from './foo.js'; console.log(foo);   ❌ 
2. import('./foo.js').then(foo => { console.log(foo) });    ✅
3. if(Math.random() > 0.5) { import foo from './foo.js' }    ❌
4. import foo from './foo.js'; console.log(fool);    ✅
```

## 下列哪些属性的变化会导致重排

1. visibility  ❌
2. height  ✅
3. width  ✅
4. border  ✅  ⚠️

> 引起重绘

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0e0zw1tsnj215s0hogns.jpg)

> 引起重排 (回流)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0e1260dkpj214n0u0whu.jpg)

参考: [CSS重绘和重排(回流) - 一梦梦 - 博客园](https://www.cnblogs.com/mdr86553/p/12048742.html)

## 在邮件服务中IMAP协议用于接收邮件,IMAP建立连接时使用的协议与端口为

`tcp协议与143端口`

## postion 属性有那些值

```css
static | relative | absolute | sticky | fixed
```

## 在服务器端配置web服务时,可以支持web服务的平台有

`nginx、apache、IIS(✅)`

## CSS 伪类有哪些

> `:link、:visited、:hover、:active、:focus、:lang()、:not()、:root、:first-child、:last-child、:empty 等等`

## CSS 位元素有哪些

* `::first-letter`，将特殊的样式添加到文本的首字母。  

* `::first-line`，将特殊的样式添加到文本的首行。  

* `::before`，在某元素之前插入某些内容。  

* `::after`，在某元素之后插入某些内容。

## 下列哪些写法可以新窗口打开链接

```html
1. <a href="http://75.team" target="_blank">
2. <a href="http://75.team" target="new">     🌿
```

## `<button>` 标签默认的 type 属性值为

`submit`

## `<button>`标签的 type 属性值有

```html
1. <button type="submit"></button>  <!-- 默认 -->
2. <button type="button"></button>
3. <button type="menu"></button>
4. <button type="reset"></button>
```

## `<input>` 标签默认的 type 属性值为

`text`

## `<input>` 标签的 type 属性值有

> `text`、`button`、`checkbox`、`color`、`date`、`datetime`、`hidden`、`file`、`number`、`password`、`submit`、`search`、`radio` 等等

## 哪一个元素用于使HTML中表格里的单元格在同行进行合并

`colspan`

> 对于同一列合并: `rowspan`

参考: [html表格标签中如何合并行和单元格-百度经验](https://jingyan.baidu.com/article/3d69c551a511d4b1ce02d73c.html)

## 一个宽度100px，高度50px的父级盒子，如果子盒子 padding-top 的值为 20%，那子盒子的 padding-top 为多少像素

`20px`

解释:  padding-top的百分比值参考对象是`父级元素的宽度`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .father {
            width: 100px;
            height: 50px;
            background-color: burlywood;
        }

        .father .son {
            background: cadetblue;
            padding-top: 20%;
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>

</html>
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0e3nb0ludj20m00cygly.jpg)

## 下面返回 true 的是

```js
1. NaN === NaN   false  🌿
2. !!''          false  🌿
3. !![]          true   🌿
```

## 以下哪个元素不属于嵌入式内容(embedded content)？

1. img        属于

2. svg         属于

3. `script`     不属于

4. math     属于

> 用于嵌入各种类型内容的元素还包括：[`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio), [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas), [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe), [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img), `<math>`, [`<object>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object), [`<svg>`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/svg) 和 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)

参考: [&lt;embed&gt;：外部内容嵌入元素 - HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed)

## 序列{9,12,17,30,50,20,60,65,4,19}构造为堆后，堆所对应的的中序遍历序列可能为（）

1. 65,12,30,50,9,19,20,4,17,60

2. 65,12,30,9,50,19,4,20,17,60   ✅

3. 65,9,30,12,19,50,4,20,17,60

4. 65,12,9,30,50,4,20,9,17,60

思路: 先找到其小顶堆和大顶堆, 然后再进行中序遍历, 比对结果

参考: [堆（大顶堆，小顶堆），中序遍历，前序遍历，后续遍历序列 - NOT_COPY - 博客园](https://www.cnblogs.com/mww-NOTCOPY/p/12357402.html)

## 下面程序的时间复杂度为多少

```cpp
int i,j,a;
for(i=1;i<n.i++)
{
   for(j=1;j<n;j*=2)   // 注意这里是j*=2
   {
       a = i+j;
       cout<<a<<endl;
    }
}
```

答案: O(n*log2(n))

## 数据结构中，如果存在二维数组Q，Q的行下标取值为2-5，Q的列下标取值为1-8，对于Q中的元素用相邻的6个字节存储，存储器按字节编址，数组Q的字节为（）

我一开始的做法 `4 * 8 * 6 = 192`

答案: 204

可能比较正确的解释:

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0gd6ec6mnj20wm0ec75x.jpg)

参考: [登录—专业IT笔试面试备考平台_牛客网](https://www.nowcoder.com/test/question/done?tid=53947970&qid=806057#summary)

## HTML5新增的表单元素不包括

A. password；

B. color；

C. date；

D. number;

答案: A

> HTML5新增表单内容
>
> * 新增表单控：color ,  calendar  ,  date ,  datetime, datetime-local,  time, mouth , week, email, url , search,range, tel
>
> * 新增的表单元素： datalist ， keygen， output

## 关于HTML的描述，不推荐的是

A. 在页面顶部必须加入DOCTYPE声明；

B. 尽量将js引用放到HTML页面底部；

C. 可以使用center标签来设置元素居中；

D. 使用table标签来处理数据相关的展示；

答案选: C

## 在面向对象技术中，多态性是指（）

`针对一消息，不同对象可以以适合自身的方式加以响应`

来源: [登录—专业IT笔试面试备考平台_牛客网](https://www.nowcoder.com/test/question/done?tid=53947970&qid=806067#summary)

## `'\\\\\\'`.replace(new RegExp(`'\\\\\\\\'`, 'gi'), '/') 的执行结果是？

`/\`

解释: 

在字符串里面， 字符串\ 是需要进行转义的，所以字符串\得写为'\\'

在正则表达式中，正则表达式\也是需要进行转义的，所以正则表达式表达式\得写为/\\/

所以，题目得意思是：

在字符串\\\中全局匹配，忽略大小写，把匹配到的字符串\\换成字符串/

```js
var a = '\\\\\\';
var b = '\\\\\\\\';
console.log(a);  // 打印: \\\
console.log(b);  // 打印: \\\\
var reg = new RegExp(b, 'gi');
console.log(reg);  // 打印: /\\\\/gi  (//里面的斜杠又是需要'\'来转译的)
let res = a.replace(reg, '/');
console.log(res);  // 打印: /\

var reg2 = /\\\\\\\\/gi;  
console.log(reg2); // 打印: /\\\\\\\\/gi
```

来源: [登录—专业IT笔试面试备考平台_牛客网](https://www.nowcoder.com/test/question/done?tid=53947970&qid=806069#summary)

## 根据如下代码，set.size的值为

```js
var set = new Set([0, 2, 2, 0, 0, 5, 9, {}, {}, NaN, NaN]);
```

答案为: 7

⚠️: 这里的两个NaN在set中会判定为相同,所以会去掉一个

tips: 

```js
NaN === NaN   // false
```

## 执行下列语句后， 变量name的值为

```js
function Person() {};
var person1 = new Person();
var person2 = new Person();
Person.prototype.getName = function () {
    return this.name;
};
Person.prototype.name = 'tom';
person1.name = 'jerry';
var name = person2.getName();


// 答案:
console.log(name);  // tom
```

我一开始选的 `undefined`

## 执行下列语句后，变量name1的值为

```js
var name = 'tom';
function getMethod() {
    var result = function () {
        return name;
    };
    var name = 'jerry';
    return result;
}
var getName = getMethod();
var name1 = getName();

// 答案:
console.log(name1);  // jerry
```

我一开始选的 `undefined`

## 面向对象程序设计方法的优点包含：

`可重用性、可扩展性、易于管理和维护(🌿)`

## 关于 node.js 中的模块化规范，以下说法正确的有哪些？

1. require 加载模块是一个同步的过程

2. require 函数可以在代码的任意位置执行   ⚠️

3. exports 或 module.exports 其中一个一旦重新赋值，exports 将失效

## 下面选项中属于Node定时器的是？

1. `setTimeout()`

2. `setInterval()`

3. `setImmediate()`

4. `process.nextTick()`

## 以下代码能在不同环境下（不考虑兼容性问题）正确判断变量a = [] 是数组的有：

1. a instanceof Array        ❌    ⚠️

2. Array.isArray(a)             ✅

3. Object.prototype.toString.call(a) === '[object Array]'    ✅  ⚠️

4. typeof a === 'array'      ❌

对于第一个选项的解释: 

> instanceof操作符的问题在于，它假定只有一个全局环境。如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。 
> 如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);

var arr = [1, 2, 3];
xArray = window.frames[0].Array; //iframe中的构造函数
var arrx = new xArray(4, 5, 6);

console.log(arrx instanceof Array); //false
console.log(arrx.constructor == Array); // false

console.log(Array.prototype == xArray.prototype); //false
console.log(arr instanceof xArray); //false

console.log(arrx.constructor === Array); // false
console.log(arr.constructor === Array); // true
console.log(arrx.constructor === xArray); // true
console.log(Array.isArray(arrx)); //true
```

## 关于同源策略和跨域的问题，以下说法正确的有？

1. `http://store.company.com/dir/page.html` 和`http://store.company.com/dir/other.html` 不同源。   ❌

2. node设置res.header("Access-Control-Allow-Origin", "*") 去解决跨域问题，会有安全问题。      ✅

3. JSONP的原理是利用引入script不限制源的特点，把处理函数名作为参数传入，然后返回执行语句。       ✅  ⚠️

4. document.domain的原理是将两个页面的document.domain设置成一致，只能解决主域相同的跨域问题。     ✅

## 下列在 JS 事件循环机制中属于微任务（microTask）的是？

1. process.nextTick    ✅ ⚠️

2. promise    ✅

3. setTimeout    ❌

4. setInterval   ❌

## 假如图片的地址为imgUrl,下面哪行代码在网页中打开可以直接看到的是文字“hello”

```html
1. <img src=“” title=“hello”>   🌿
2. <img src=“” alt=“hello”>
```

## 下列选项中，关于HTTP与HTTPS的区别的描述中，正确的是（   ）：

1. http是超文本传输协议，信息是明文传输。https则是具有安全性的ssl加密传输协议。 ✅

2. http和https使用的是完全不同的连接方式，用的端口也不一样。 ✅  ⚠️

3. http的连接很简单，是无状态的。HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。   ✅

4. http默认使用80端口，https默认使用403端口。  ❌ (https端口为443)

## 小牛开发文件上传功能时，遇到了一些安全问题，那么对于文件上传漏洞，有效防御手段有哪些？

1. 浏览器端限制文件扩展名  ❌

2. 服务器端限制文件扩展名   ✅  ⚠️

3. 将上传的文件存储在静态文件服务器中  ✅

4. 验证Content-Type   ❌

## 设a数组的长度为N,那么下面程序循环内交换数组元素的代码执行的时间复杂度最坏为?

```js
for (int i = N - 1; i > 1; i--)
{
    for (int j = 1; j < i; j++)
    {
        if (a[j] > a[j + 1])
        {
            temp = a[j + 1];
            a[j + 1] = a[j];
            a[j] = temp;
        }
    }
}
```

这段程序就是选择排序

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0ha5e87muj20u00katak.jpg)

## 如果存储结构由数组变为链表，那么下列哪些算法的时间复杂度量级会升高

1. 选择排序

2. 希尔排序  ✅

3. 堆排序  ✅

4. 插入排序   ⚠️

## linux下可以查看网卡流量情况的是

`nload`  

## 下面代码的输出是：

```js
// 下面代码的输出是：
function func(source) {
    var target = {};
    for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object') {
                target[key] = func(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
var a = {
    a1: "a1",
    a2: {
        b1: "b1",
        b2: "b2"
    },
    a3: undefined,
    a4: null,
    a5: 1
};
var b = func(a);
console.log(b);
```

A. {a1: "a1", a2: {b1: "b1", b2: "b2"}, a3: undefined, a4: null, a5: 1}     ⚠️

B. {a1: "a1", a2: {b1: "b1", b2: "b2"}, a3: null, a4: null, a5: 1}

C. {a1: "a1", a2: {b1: "b1", b2: "b2"}, a3: undefined, a4: undefined, a5: 1}

D. {a1: "a1", a2: {b1: "b1", b2: "b2"}, a3: undefined, a4: {}, a5: 1}      ✅

解析: 

注意 `typeof null === 'object'`

## 下列布局在页面上的宽度比是多少？

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .flex {
            display: flex;
            width: 200px;
            height: 100px;
        }
        .left {
            flex: 3 0 50px;
            background: red;
        }
        .right {
            flex: 2 0 100px;
            background: blue;
        }
    </style>
</head>
<body>
    <div class="flex">
        <div class="left"></div>
        <div class="right"></div>
    </div>
</body>

</html>
```

计算方式:

首先去掉各自的基础宽度(`left: 50px, right: 100px`), 获得到一个按比例分配的长度为 `200px - 50px - 100px = 50px`

所以`left`为: `50 *  3/5 + 50 = 80px`

所以`right`为: `50 * 2/5 + 100 = 120px`

所以`left:right` = `80:120` = `2:3`

## 下面代码的输出是：

```js
// 下面代码的输出是：
const arr = [];
const testObj = {};
console.log(arr === "");
console.log(arr == "");
arr.toString = () => 1;
console.log(arr === 1);
console.log(arr == 1);
arr.valueOf = () => 2;
console.log(arr == 2);
arr.valueOf = () => testObj;
console.log(arr == testObj);
```

解析: 

```js
const arr = [];
const testObj = {};
console.log(arr === "");  // false 类型不同
console.log(arr == "");   // true 因为arr是对象,会调用toString()进行比较

// console.log(11 == '11');  // true 11是数字，字符串转数字进行比较
// console.log([11] == 11);  // true [11]是对象,会调用toString()进行比较  🌿

arr.toString = () => 1;
console.log(arr === 1);  // false 类型不同
console.log(arr == 1);   // true 因为 arr.toString = () => 1; 给arr的toString方法重写了

// console.log([11].valueOf());   // [11] 
// console.log([11].valueOf() == 11);   // true 说明这里在比较之前,[11].valueOf()对象先调用了toString()  🌿

arr.valueOf = () => 2;   
console.log(arr == 2);   // true  与数值比较,优先调用 valueOf 方法
arr.valueOf = () => testObj;
console.log(arr == testObj);  // false 这里是两个引用类型的比较,所以arr根本不会调用valueOf方法,直接对两个引用类型进行地址比较

// console.log(Boolean(""));  // false
// console.log(Boolean([]));  // true
// console.log(Boolean([]) == Boolean(""));  // false
```

参考: [登录—专业IT笔试面试备考平台_牛客网](https://www.nowcoder.com/test/question/done?tid=54252212&qid=800717#summary)

## 下面代码的输出是：

```js
// 下面代码的输出是：
let a = 0;
const obj = {
    a: 1,
    b: function () {
        console.log(this.a);
    }
}
const obj1 = {
    a: 2
}
const fun = obj.b;
fun();
fun.apply(obj);
fun.bind(obj1).apply(obj);
const fun1 = fun.bind(obj1);
new fun();
```

```js
undefined 1 2 undefined
```

解释: 

```js
let a = 0;
const obj = {
    a: 1,
    b: function () {
        console.log(this.a);
    }
}
const obj1 = {
    a: 2
}
const fun = obj.b;
fun();   // undefined ==> let、const、class声明的全局变量不属于顶层对象(window)
fun.apply(obj);  // 1 ==> apply绑定obj对象
fun.bind(obj1).apply(obj);  // 2 ==> bind的绑定不执行,而且this指向绑定后不可更改
const fun1 = fun.bind(obj1);  
new fun();  // undefined ==> 此时的this指向新创建的对象,但是这个新对象中没有属性
```

## 以下关于cookie和localStorage描述正确的是

A. localStorage 和 cookie 一样也有跨域限制     ✅

B. localStorage 可以和cookie 一样通过特殊的http 头部由服务端进行设置

C. localStorage无法被用户清除，所以比Cookie更安全，可以放置重要数据

D. cookie 和 localStorage 都可以由浏览器自动携带在http请求的header中传递给服务端

## 跨域请求中，需要设置哪个属性为true,才能携带cookie信息？

A. responseType

B. timeout

C. withCookies     ⚠️

D. withCredentials     ✅

解析: [登录—专业IT笔试面试备考平台_牛客网](https://www.nowcoder.com/test/question/done?tid=54305674&qid=800589#summary)

## 下面代码的输出顺序(关于Promise和async的,很强!!)

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(() => {
    console.log('setTimeout');
}, 0);
async1();
new Promise((resolve, reject) => {
    console.log('promise1');
    resolve();
}).then(res => {
    console.log('promise2');
})
console.log('script end');
```

当前理解(2022.3.28)

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');
setTimeout(() => {
    console.log('setTimeout');
}, 0);
async1();
new Promise((resolve, reject) => {
    console.log('promise1');
    resolve();
}).then(res => {
    console.log('promise2');
})
console.log('script end');

// script start
// async1 start
// async2    // await 后面的 async2() 相当于是一个 Promise ,所以 async2 是同步代码
// promise1
// script end
// ----------  以上都是同步代码 ----------
// async1 end  // await 后面的这个地方等价于是 Promise.then 
// promise2    // Promise.then
// setTimeout  // 宏任务
```

## 关于查找，下列说法正确的是____。

A. 红黑树、B树、B+树均是自平衡树。     ✅

B. 散列表的冲突通常可以用拉链法解决。    ✅

C. 二叉搜索树只能用树状的数据结构实现。

D. 二分查找要求线性表存储的值是有序的。   ✅

## HTML5相对于原来的HTML规范有哪些改进：

A. 新增了一些语义化标签，如article,header,footer,dialog等     ✅

B. 新的全局属性：id, tabindex, repeat      ✅

C. 新增了一些高级标签，如`<game>,<audio>,<canvas>`

D. DOCTYPE更简洁       ✅

## 以下方法中涉及跨域的是

A. window.onerror    ⚠️

B. window.name    ✅

C. window.history

D. window.addeventListener

解析: [九种跨域方式实现原理（完整版） - 掘金](https://juejin.cn/post/6844903767226351623)

补充: **location.hash、document.domain**

## HTTP状态码503表示的含义是（）？

A. Unauthorized

B. Bad Request

C. Internal Server Error  ⚠️

D. Service Unavailable   ✅

解析: 

1. 500 Internal Server Error
2. 502 Bad GateWay
3. 503 Service Unavailable


## 问class为main的div的高度是？

```html
<style>
    .main div {
        font-size: 14px;
        height: 12px;
    }
    .title {
        position: absolute;
        height: 20px;
    }
    .test {
        height: 20px;
    }
    .test2 {
        visibility: hidden;
    }
    .test3 {
        display: none;
    }
</style>
<div class="main">
    <div class="title">title</div>
    <div class="test">test</div>
    <div class="test2">test2</div>
    <div class="test3">test3</div>
</div>
```

解析:

1. title那个脱离文档流,不用管

2. test3那个不占用物理空间,也不用管

3. test2占用物理空间,高度随父元素为12px

4. 看代码

   ```css
   .main div {
      font-size: 14px;
      height: 12px;
   }
   .test {
      height: 20px;
   }
   /* 
       这两个选择器都同时作用于: <div class="test">test</div>
       但是第一个的css权重更大
   */
   ```

## 以下哪些协议工作在应用层？

A. ICMP   ⚠️

B. SMTP    ✅

C. ARP

D. FTP    ✅

总结: 

工作在<mark>应用层</mark>的协议有: 

1. HTTP

2. FTP

3. DNS

4. SMTP  ⚠️

5. WebSocket

6. POP3

7. SNMP

工作在<mark>网络层</mark>的协议有:

1. ICMP   ⚠️

2. IGMP   ⚠️

3. ARP   ⚠️

4. IP

## 下列红黑树的说法，错误的是：

A. 红黑树的时间复杂度为：O(n*lgn)。  ✅

B. 每个叶子节点是黑色的。

C. 每个红色结点的两个子结点一定都是黑色。

D. 根节点是黑色，每个节点是黑色或者红色。 

解析:

红黑树的时间复杂度为：O(lgn)

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0r08f9r0sj21vf0u0juz.jpg)

## 如果设置网页除了input和textarea里面的文字不能被选中拷贝以下那些选项是正确的？

A. `*:not(input),*:not(textarea){ user-select:none;}`

B. `*:not(input):not(textarea){ user-select:none;}`      ✅

C. `:not(input),:not(textarea) { user-select:none;}`

D. `::not(input),::not(textarea){ user-select:none;}`

解析: 

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *:not(input):not(textarea) {
            user-select: none;
        }
    </style>
</head>
<body>
    <input type="text">
    <textarea name="" id="" cols="30" rows="10"></textarea>

    <!-- 不能被选中 -->
    <div>1231232</div>   
</body>
</html>
```

## 一棵哈夫曼树有5个叶子节点，则该哈夫曼树共有（）个结点？

答案: 9

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0qzrkvrtuj20w60u0wh0.jpg)

参考: [哈夫曼树（赫夫曼树、最优树）详解](http://c.biancheng.net/view/3398.html)

## 下面哪个方法不能创建节点？

A. document.createElement()

B. element.createChild()       ✅

C. document.createTextNode()

D. element.appendChild() 

解析: 根本就没有`createChild`这个方法!! 我giao

## NumberList是一个顺序容器，以下代码执行后，NumberList里的元素依次为（）

```java
List<int> NumberList = new List<int>(){2,4,1,3,5};
for(int i = 0;i<NumberList.Count;++i)
{
    int v = NumberList[i];
    if(v%2 == 0) {
        NumberList.Remove(v);   //删除的是元素，而非下标
    }
}
```

A. 2,1,3,5

B. 2,4,1,3,5

C. 1,3,5   ⚠️

D. 4,1,3,5    ✅

解析: 注意陷阱!!!

这道题都说了<mark>删除的是元素，而非下标</mark>,那么数组 NumberList 的长度是在变化的,所以这个过程删除的时候会把 4 漏掉.可以自己试着验算一下.

## 请说出 \W 的含义

`匹配任何非单词字符`

参考: [正则表达式 &#8211; 元字符 | 菜鸟教程](https://www.runoob.com/regexp/regexp-metachar.html)

## Why tag is used in HTML page?

A. For creating table

B. None

C. For thematic break   ✅

D. For heading

解析: `thematic 主题的`

水平分隔线（horizontal rule）可以在*视觉上*将文档分隔成各个部分。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>11111</div>
    <div>22222</div>
    <hr>
    <div>3333</div>
</body>

</html>
```

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0qluou49gj20o40ewmy1.jpg)

## ::before和:after中单双冒号错误的是

A. 兼容IE浏览器，建议用双冒号写法比较安全。   ✅

B. 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。

C. 对于CSS2之前已有的伪元素，比如:before，单冒号和双冒号的写法::before作用是一样的。     ⚠️

D. 双冒号是在css3规范中引入的，用于区分伪类和伪元素。

## JavaScript中有哪几种不同类型的错误：

1. Load time errors

2. Run time errors

3. Logical Errors

## 下面关于angular，vue，react说法正确的是（ ）

A. 都默认使用双向数据绑定

B. 自身都有过滤器

C. 都可以使用虚拟Dom   ✅

D. 都是MVVM模式

## 关于如下代码，说法正确的是

```js
关于如下代码，说法正确的是:
1、@interface MyClass : NSObject
2、{
3、   int count;
4、   id data;
5、   NSString* name;  
6、}
7、-(id)initWithString:(NSString*)aName;
8、+(MyClass*)createMyClassWithString:(NSString*)aName;
9、@end
```

A. 定义了3个成员变量：count、data和name(@protected)     ✅

B. 声明了两个方法     ✅

C. 名为MyClass的类，继承于Cocoa框架中的NSObject类    ✅   ⚠️

D. 7,8行代码有误

## TCP协议的拥塞控制就是防止过多的数据注入到网络中，这样可以使网络中的路由器或链路不致过载。常用的方法有:

1. 快重传、快恢复

2. 慢开始、拥塞控制

## 如何在多线程中避免发生死锁？

A. 进程在运行前一次性地向系统申请它所需要的全部资源。  ✅

B. 允许进程强行从占有者那里夺取某些资源。  ✅

C. 把资源事先分类编号，按号分配，使进程在申请，占用资源时不会形成环路。  ✅

D. 允许进程同时访问某些资源。 ✅

解析: 破坏四个必要情况,即可

1. 互斥使用

2. 请求和保持

3. 不可抢占

4. 循环等待

## 已知message是一个字符串，以下VUE数据绑定写法能正确显示的是（   ）

A. `<span>{{message}}</span>`    ✅

B. `<span v-model="message"></span>`

C. `<span v-html="message"></span>`      ✅

D. `<span v-bind="message"></span>`

## 兼容接口不同的类在一起工作，采用以下哪种设计模式最好？

`适配器模式`

## 下列关于Canvas和SVG图形的区别说法错误的是（）

A. Canvas和分辨率无关      

B. SVG为了之后的操作，需要记录坐标，所以比较缓慢

C. Canvas绘制的形状都能被记忆和操作

D. Canvas不能使用绘制对象的相关事件处理，因为我们没有他们的参考

选: AC

## 一台客户端有三百个客户与三百个客户端有三百个客户对服务器施压，有什么区别?

A. 用户分布在不同的客户端上，需要考虑使用调度器来整体调配不同客户机上的用户。

B. 所有用户在一个客户端上，不必考虑分布式管理的问题。   ✅

C. 300个用户在一个客户端上，需要更大的带宽。  ✅

D. 线程之间可能发生干扰，而产生一些异常。   ✅

## 网络管理员把优盘上的源代码给程序员参考，但要防止程序误删除或修改，以下正确的加载方式是（      ）

A. mount -r /dev/sdb1 /tools    ✅

B. mount -o defaults /dev/sdb1 /tools

C. mount -o ro /dev/sdb /tools

D. mount -o ro /dev/sdb1 /tools   ✅

解析: 

1. mount ：挂载 
2. -o ro ：只读
3. -r ：只读

## 若串S=”UP！UP！JD”，则其子串的数目

`37`

解析:

n: 字符长度

计算: `n(n+1)/2 + 1`

## 在bash编程中,算术比较大于、大于等于的运算符是（   ）

`gt 和 ge`

扩展:

`gt大于，ge大于或等于，ne是不等于，eq是等于，lt小于，le小于或等于`

## 下面有关值类型和引用类型描述正确的是（）？

A. 值类型数据是在栈上分配内存空间，它的变量直接包含变量的实例，使用效率相对较高。而引用类型数据是分配在堆上，引用类型的变量通常包含一个指向实例的指针，变量通过指针来引用实例。   ✅

B. 值类型变量的作用域主要是在栈上分配内存空间内，而引用类型变量作用域主要在分配的堆上。

C. 值类型的变量赋值只是进行数据复制，创建一个同值的新对象，而引用类型变量赋值，仅仅是把对象的引用的指针赋值给变量，使它们共用一个内存地址。  ✅

D. 引用类型一般都具有继承性，但是值类型一般都是封装的，因此值类型不能作为其他任何类型的基类。    ✅

## 以下哪个选项的描述是错误的

A. iframe是用来在网页中插入第三方页面，早期的页面使用iframe主要是用于导航栏这种很多页面都相同的部分，这样在切换页面的时候避免重复下载

B. iframe的创建比一般的DOM元素慢了1-2个数量级

C. iframe标签会阻塞页面的的加载   ⚠️

D. iframe本质是动态语言的Incude机制和利用ajax动态填充内容   

答案: 选 D

解析:

C 选项是对的,因为`window.onload`事件需要等待audio、iframe中的资源加载成功后才执行

## 网卡实现的主要功能是？

A. 物理层与数据链路层的功能   ✅

B. 数据链路层与网络层的功能

C. 网络层与传输层的功能

D. 传输层与应用层的功能

解析: 

网卡实现的主要功能是`物理层与数据链路层`的功能。

网卡实现的主要功能是数据的封装与解封、链路管理、编码与译码。

## 模式串的长度是m，主串的长度是n（m<n），使用KMP算法匹配的时间复杂度是（）？

`O(m + n)`