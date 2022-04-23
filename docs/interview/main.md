# 面试总结回顾

## 第一次快手学长模拟面试（2021.12.25）

1. **实现一个函数，str = 'abcd'，实现这个字符串的全排列，返回一个数组，每个元素是这个字符串的一种排列顺序**（我只说出了全排列，但是没有写出实际代码）

2. 冒泡排序

3. 快速排序

4. CSS实现垂直水平居中（ line-height可以吗？）

5. 什么是闭包？闭包的缺点？闭包的应用？

6. 盒子模型？（分两种：标准盒子模型和替代盒子模型）

7. box-sizing: border-box;和box-sizing: content-box;的区别？

   border-box设置盒子为替代盒子模型，而content-box设置盒子模型为标准盒子模型

8. 什么是语义化标签？为啥使用语义化标签?

9. 简单解释下Less和Sass是什么？

10. 小程序的原理？微信客户端如何和小程序进行交互的？

11. defer和async的区别？

12. Vue的双向绑定原理？（Vue2 => Object.defineProperty，Vue3 => Proxy）

13. ES6新增的你比较熟悉的东西？

14. 简单描述下MVVM？MVVM和MVC的区别？

15. 从浏览器输入URL到呈现页面发生了什么？（其中DNS获取也要细讲下）

16. 能简单的描述下Koa2的洋葱模型吗？

17. 能说下浏览器缓存吗？（缓存策略）

18. 了解HTTP2.0吗？（我答的二进制分帧层、多路复用、使用HPACK压缩首部、服务器推送，但是学长说没有答的很完整）

19. 能列举webpack中使用过的`loader`或者`plugin`吗？

20. 了解过性能优化的方案吗？（我回答的JS的事件防抖和节流、鉴于CSS的匹配规则，多使用类选择器和id选择器、重绘和回流中，可以将JS中每次的单次修改DOM的样式更改为添加一个类，CSS类中来一次性进行修改）

21. 有了解过CDN、SEO、AST（抽象语法树）吗？

22. 列举下display常见的值？（inline, block, inline-block, flex, grid, none)

23. 说几个常见的git命令？（ git add .\ git commit -m '' \ git push \ git pull )

    1. git branch (branchname)

    2. git checkout (branchname)

    3. git status(查看文件状态)

24. 能说下解决冲突的操作吗？

25. 能介绍下你的组件库吗？

26. 如何减少首屏加载时间？

    web端:

    1. SSR

    2. 本地缓存资源

    3. 开始Gzip压缩

    4. 图片资源压缩

    5. 懒加载资源

    小程序端:

    1. 按需引入

    2. 去除未使用的自定义组件的引用

    3. 精简数据

    4. 骨架屏

    5. 使用本地缓存

    6. 开启“初始化渲染缓存”

27. 听说过SSR吗？

学长点评建议：针对某个问题可以回答的有一定深度、但是很多的问题也没回答出来，知识的广度还很欠缺。对小程序的底层原理（JSCore、JSBridge、Native）还不了解，以及小程序如何和原生的客户端如何交互，怎么交互？以及底层的涉及原理？盒子模型其实有两种？IE和其他的区别？box-sizing: border-box;和box-sizing: content-box;的区别？Vue框架还需要深入，Vue的基本使用方法也没问。URL回车时，DNS缓存的阶段没说出来。node你也可以深入更多一点（比如洋葱模型出很多、node原生相关、node相关基本原理），毕竟你写在简历中。HTTP2.0没有描述的很清楚。还有就是webpack也写上了简历，但是连基本的都没答出来。性能优化方面涉及很多，但是我想听的都没有讲到！（提到在前端本地的太多了，我还希望听到一些和请求相关的、还有一些比较古老的精灵图<就是将很多小图片合成一张图片>之类的、图片懒加载之类的）。包括一些广度问题，也没说出来，比如 SEO、CDN、AST。

对于HTML、CSS、JS都还好，但是对于上层的某些框架（涉及经验，但是对于大厂的实习也需要你知道这些东西，不管你是真用过还是假的用过，都需要你能答出来）

还有就是算法！算法也是一个比较重要的点！很多公司都是先让你写题，写不出来就过不了！其次如果自己写不出来，也可以讲讲思路，而不是拿着题就开始写，也可以根据思路写一些伪代码，也是可以的！

打分：55，不会给你过！

## 蚂蚁前端一面 (2022.3.4)

1. 小程序和普通web的渲染区别? => 小程序两个线程执行是异步的,没有存在互斥关系;而普通web的js引擎线程和GUI渲染线程互斥

2. <u>为什么小程序的白屏时间比web端短?</u>

   主要是因为: “微信 Web 资源离线存储”

   > 微信 Web 资源离线存储是面向 Web 开发者提供的基于微信内的 Web 加速方案。
   >
   > 通过使用微信离线存储，Web 开发者可借助微信提供的资源存储能力，直接从微信本地加载 Web 资源而不需要再从服务端拉取，从而减少网页加载时间，为微信用户提供更优质的网页浏览体验。每个公众号下所有 Web App 累计最多可缓存 5M 的资源。

   当小程序没网或者网络环境差时, 通过`微信 Web 资源离线存储`技术, 可以直接打开对于小程序首页

   当浏览器没网时,直接显示“未连接到互联网”’; 当网络环境差时(自己设置网络速度), 会出现长时间的白屏, 即使资源都在 disk cache 或者 memory cache 中.

   参考: [小程序简介 | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%8A%80%E6%9C%AF%E5%8F%91%E5%B1%95%E5%8F%B2)

3. 小程序渲染和Web渲染哪个性能更优? 为什么? (渲染和上面的白屏有关联,但是是两个不同的问题)

   - Web采用单页面实例,小程序采用多WebView实例,因此其更轻便,渲染性能更佳;
   - Web的JS逻辑层和视图层混合在一起,比较重,且相对而言可维护性比较低。小程序其视图层和逻辑层分别独立,代码更具备可维护性,且不会和JS共用一个Context，不会存在页面渲染逻辑和JS逻辑相互阻塞的情况。

   参考: [04-大前端底层原理|小程序框架渲染原理 - 掘金](https://juejin.cn/post/7021414123346853919#heading-20)

4. 渲染界面技术你了解多少?

   参考: [登录 | ProcessOn](https://www.processon.com/mindmap/6224bf921e08535e1b817d69)

5. 小程序如何优化首屏渲染?

   参考: [登录 | ProcessOn](https://www.processon.com/mindmap/6224bf921e08535e1b817d69)

6. Web缓存你知道哪些?

   参考: [登录 | ProcessOn](https://www.processon.com/mindmap/6224bf921e08535e1b817d69)

7. 市面上这么多小程序组件库,为什么还要再自己开发一个? => 1. 自学练手 2. 其次我开发的组件更多是添加动效的一些有意思的组件,而非button这样的常规组件

8. 设计一个好的组件,需要考虑的因素有哪些?

   1. 将更多的设置交由开发者进行设定

   2. 松耦合(组件可以独立运行)

   3. 辅助代码的分离(一些公用工具类的分离)

参考: [[译] 前端组件设计原则 - 掘金](https://juejin.cn/post/6844903767108747278#heading-5)

9. <u>堆和栈有什么区别? 堆的数据结构长什么样子?</u>

   堆和栈的区别是什么

   1. 堆栈空间分配区别 (栈由操作系统（编译器）自动分配释放; 堆一般由程序员分配释放)

   2. 堆栈缓存方式区别 (栈使用的是一级缓存， 它们通常都是被调用时处于存储空间中，调用完毕立即释放。堆则是存放在二级缓存中，生命周期由虚拟机的垃圾回收算法来决定（并不是一旦成为孤儿对象就能被回收）。所以调用这些对象的速度要相对来得低一些。)

   3. 堆栈数据结构区别 (堆可以被看成是一棵树(<mark>完全二叉树</mark>)，如：堆排序。而栈是一种先进后出的数据结构。)

参考: [堆和栈的区别有哪些-常见问题-PHP中文网](https://www.php.cn/faq/418027.html)

堆这种数据结构本质是一个完全二叉树, 完全二叉树的形式是指除了最后一层之外，其他所有层的结点都是满的，而最后一层的所有结点都靠左边.

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h0122d8hncj20a106fglo.jpg)

10. TCP和UDP区别?

    1. TCP面向连接,UDP无连接

    2. TCP提供可靠的服务

    3. TCP面向字节流,UDP面向报文

    4. TCP是1对1,而UDP1对1或者1对多

    5. TCP首部较大20字节,UDP首部8个字节

11. <u>聊天的网络协议用什么? =&gt; WebSocket,因为WebSocket相比与http(这里的http指的是http1.0以及之前的版本)可以建立一个持久连接,并且可以由服务器主动发送请求</u>

12. <u>WebSocket基于TCP还是UDP? =&gt; TCP (但是我当时答的UDP,还一本正经的扯为什么是UDP)</u>

    它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于[服务器推送技术](https://en.wikipedia.org/wiki/Push_technology)的一种。

    ![](https://tva1.sinaimg.cn/large/e6c9d24egy1h018xknblqj20hg0e70tm.jpg)

    其他特点包括：

    （1）建立在 TCP 协议之上，服务器端的实现比较容易。

    （2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

    （3）数据格式比较轻量，性能开销小，通信高效。

    （4）可以发送文本，也可以发送二进制数据。

    （5）没有同源限制，客户端可以与任意服务器通信。

    （6）协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

    ```markup
    ws://example.com:80/some/path
    ```

    ![](https://tva1.sinaimg.cn/large/e6c9d24egy1h018y2fw81j20bm08o3yr.jpg)

13. HTTP1.1和HTTP2有什么区别?

    1. 队头阻塞 (多路复用解决)

    2. 头部未压缩和头部冗余 (利用HPACK算法,共同维护一个字典)

    3. 只能客户端请求 (服务端可推送)

    4. 没有控制请求优先级 (数据流: 每个请求或响应的所有数据包，称为⼀个数据流（ Stream ）。每个数据流都标记着⼀个独⼀⽆⼆的编号. 其次客户端设置请求优先级, 让服务器对其进行优先处理)

    5. 其次, http2.0增加二进制分帧层,提高编码效率

14. 除开 Cookie、LocalStorage、SessionStorage 这些存储方式,前端还有哪些存储方式?

    1. Web SQL

    2. IndexedDB

15. Cookie、LocalStorage、SessionStorage的区别?

16. <u>js中的0.1 + 0.2等于0.3吗? 为什么?</u>

    运算步骤:

    1. 将 0.1和 0.2 转为二进制数(无限循环小数)

    2. 将一般二进制形式转换为指数形式

    3. 将指数形式转换成IEEE754标准

    ![](https://tva1.sinaimg.cn/large/e6c9d24egy1h02b1bh7hdj21fh0rbjy3.jpg)

    4. 将 0.1 和 0.2 做加法运算

    ![](https://tva1.sinaimg.cn/large/e6c9d24egy1h02edba1hbj21f40rgjxj.jpg)

    5. 将 0.1 + 0.2 的结果转换为十进制

    ![](https://tva1.sinaimg.cn/large/e6c9d24egy1h02ej0h6l1j21eg0s1wji.jpg)

```js
function calcul(str) {
    let sum = 0;
    for(let i = 0; i < str.length; i++) {
        let acc = parseFloat(str[i]) * Math.pow(2, -(i + 1));
        sum += acc;
    }
    return sum;
}

let res = calcul('0100110011001100110011001100110011001100110011001100111');
console.log(res);  // 0.30000000000000004
```

简单的说: `造成这个现象的原因是因为二进制的 0.1 是一个无限循环小数, 计算机无法精确表示,从而丢失精度,也就造就这样的现象`

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h02euvs1s1j21bf0om3zt.jpg)

参考:

https://www.bilibili.com/video/BV1RE41177Bc?spm_id_from=333.788.top_right_bar_window_history.content.click

https://www.bilibili.com/video/BV1xq4y1D7Ep/?spm_id_from=333.788.recommend_more_video.0

17. 实现一个方法, 让0.1 + 0.2 == 0.3 ?

    ```js
    // 方式一
    function foo1(n1, n2) {
    let arr1 = n1.toString().split('.');
    let arr2 = n2.toString().split('.');
    let result = parseInt(arr1[1]) + parseInt(arr2[1]);
    return Number(arr1[0] + '.' + result);
    }
    // 方式二
    function foo2(n1, n2) {
    let result = n1 * 10 + n2 * 10;
    return result / 10;
    }
    
    let res1 = foo1(0.1, 0.2);
    let res2 = foo2(0.1, 0.2);
    console.log(res1);   // 0.3
    console.log(res2);   // 0.3
    ```

18. <u>CSS Modules 听说过吗?</u>

    > 本文介绍的 CSS Modules 有所不同。它不是将 CSS 改造成编程语言，而是功能很单纯，只加入了`局部作用域和模块依赖`，这恰恰是网页组件最急需的功能。

    css modules作用

    1. 局部作用域: 通过哈希生成独一无二的`class`名, 来产生局部作用域

    2. 全局作用域: CSS Modules 允许使用`:global(.className)`的语法，声明一个全局规则。凡是这样声明的`class`，都不会被编译成哈希字符串

    3. 定制哈希类名: `css-loader`默认的哈希算法是`[hash:base64]`，这会将`.title`编译成`._3zyde4l1yATCOkgn-DBWEL`这样的字符串

    4. Class 的组合: 在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，这称为"组合"

    5. 输入输出模块: 选择器也可以继承其他CSS文件里面的规则。

    6. 输入变量: CSS Modules 支持使用变量，不过需要安装 PostCSS 和 postcss-modules-values。

**css modules优势**

- 解决全局命名冲突问题 css modules只关心组件本身命名唯一

- 模块化 可以使用composes来引入自身模块中的样式以及另一个模块的样式

- 解决嵌套层次过深的问题 使用扁平化的类名

参考:

[css modules是什么？ - 前端一点红 - 博客园](https://www.cnblogs.com/ypppt/p/12882763.html)

[CSS Modules 用法教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)

19. <u>Vue中Scoped原理? 什么情况下用Scoped? 在全局 scoped 中,如何修改深层组件的样式?</u>

    > 使用场景

    Vue组件内样式局部化

    > 原理

    加入scoped, 就会在节点上添加自定义属性: `data-v-xxx`

    通过CSS选择器中的属性选择器最终添加样式

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>属性选择器的设置</title>
    <style>
        /* 这样设置两个div都是红色 */
        /* .main {
            width: 100px;
            height: 100px;
            background-color: red;
        } */
    
        /* 
            利用属性选择器 
              - 第一个div绿色
              - 第二个div蓝色
        */
        .main[data-v-abc] {
            width: 100px;
            height: 100px;
            background-color: green;
        }
        .main[data-v-123] {
            width: 100px;
            height: 100px;
            background-color: blue;
        }
    </style>
    </head>
    <body>
    
    <div class="main" data-v-abc>111</div>
    <br>
    <div class="main" data-v-123>222</div>
    
    </body>
    </html>
    ```

    > 在全局 scoped 中,修改深层组件的样式(样式穿透)

    app.vue

    ```html
    <template>
    <div id="app">
    
    <div class="main">我是App.vue部分</div>
    
    <div class="comp">
      <hello-world />
    </div>
    
    </div>
    </template>
    
    <script>
    import HelloWorld from "./components/HelloWorld.vue";
    
    export default {
        name: "App",
        components: {
            HelloWorld,
        },
    };
    </script>
    
    <style scoped>
    .main {
    width: 200px;
    height: 200px;
    background: red;
    }
    
    /* 
    样式穿透
    */
    /* stylus的样式穿透 */
    .comp >>> .main {
    border: 13px solid goldenrod;
    }
    /* 通用样式穿透 */
    /* ::v-deep .comp .main {
    border: 13px solid goldenrod;
    } */
    
    /* 无法穿透到组件中 */
    /* .comp .main{
    border: 13px solid goldenrod;
    } */
    </style>
    ```

    HelloWorld.vue

    ```html
    <template>
    <div>
    <div class="main">这是HelloWorld组件</div>
    </div>
    </template>
    
    <script>
    export default {
    name: "HelloWorld",
    props: {},
    };
    </script>
    
    <style scoped>
    .main {
    width: 100px;
    height: 100px;
    background: blue;
    }    
    </style>
    ```

    ![](https://tva1.sinaimg.cn/large/e6c9d24egy1h02uywaj09j20v20ragou.jpg)

    参考:

    https://www.bilibili.com/video/BV1dQ4y197Aw

    [vue样式穿透 - 认真，是一种态度 - 博客园](https://www.cnblogs.com/rzsyztd/p/12410055.html)

20. 能说下SPA单页应用?

最后打分: 80

点评: 前端的知识面不广, 需要补强.还有其实就是服务层,前端同学别把自己定义为一个开发UI的去了,把自己尽可能作为一个Web大前端 (包括后端方面的相关内容)

## 网易雷火暑期实习一面(别人的)

1. html head 是什么作用，都可以写什么标签？

   回答: head 标签是所有头部标签的容器,head 中可以引用脚本、指示浏览器样式表、提供元信息等; 可以写 title、meta、style、script、link、base标签

   参考:

   head标签: [HTML `<head>` 标签](https://www.w3school.com.cn/tags/tag_head.asp)

   base标签: [W3School TIY Editor](https://www.w3school.com.cn/tiy/t.asp?f=eg_html_base_test)

   meta标签: [HTML `<meta>` 标签](https://www.w3school.com.cn/tags/tag_meta.asp#meta_prop_content)

2. css中的 水平居中怎么实现？块级元素 和 内联元素有什么区别？

   > 水平居中

   行内元素:

   - text-align: center (父元素上)

   块元素:

   - margin: 0 auto (自身)

   都可以:

   - flex弹性盒

   - display: absolute; left: 50%; transform: translateX(-自身宽度的一半);

> 块级元素 和 内联元素有什么区别？

上面CSS部分有总结

3. flex 的水平居中使用那个属性来实现？

4. setTimeout 是怎么实现的？（延迟消息队列）

   ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0wslvf992j21hq0roae5.jpg)

5. promise 和 setTimeout 谁先执行的？为什么？（微任务和宏任务）

6. 讲一下 vue的生命周期；在create阶段都 做了哪些事情？

   Vue实例的数据对象data初始化,但是挂载元素$el还未初始化

7. webpack用过嘛，plugin 和 loader 的区别？

   回答:

   > loader: 因为webpack只能直接处理`js/json`, 对于其他像css、less、sass、图片等资源, webpack 没法处理, 只能借助 loader 这个翻译官, 对资源进行预处理工作.
   >
   > plugin: 就是插件, 用于扩展 webpack 功能, 在 webpack 运行的生命周期中会广播出很多事件, plugin 可以监听这些事件, 在合适的时机通过 webpack 提供的 API 改变输出结果.
   >
   > loader: 在 moudule.rules 中配置, 作为模块解析规则. 类型是一个数组, 数组中的元素为一个对象, 对象中包含 `test(匹配对应内容)、use、loader、option(参数)` 等属性
   >
   > pulgin: 在 plugins 中单独配置, 类型为数组, 每一项都是一个plugin实例, 参数通过构造函数传入

## 网易雷火暑期实习三面(别人的)

1. vue-router 的两种模式？ --- 那不就 hash模式 和 history模式。

   首先两种模式都是为了支持 => “改变试图但是不向后端发送请求” 的实现

   介绍:

   > hash: hash模式带#, 例如`http://www.abc.com/#/hello `,hash的值为`#/hello`,虽然hash出现在url中,但是不会被包含在http请求中,对后端完全没有影响,因此改变hash不会重新加载页面.
   >
   > history: 通过使用`go、back、forward`方法实现路由的前进、后退以及新增的`pushState、replaceState`方法对历史记录栈进行操作,只是当他们执行修改时,虽然url改变了,但是并未向后端发送请求

   差异: (都是`history`的好)

   1. pushState设置的新url可以是与当前url同源的任意url, 而hash只能修改#后面的部分,只能设置与当前url同文档的url

   2. pushState设置的新url可以与当前一样,但是hash必须设置与原来url不同的url才会被记录到栈中

   3. pushState可以设置`stateObject` 参数添加任意类型的数据到记录中,而hash只可添加短字符串

   4. pushState可以添加额外的title参数供后续使用

   差异: (`hash`的好处)

   1. hash模式, 仅hash符号之前的内容会被包含在请求中,如`http://www.abc.com`,因此对后端来说,即使没有做到对路由的全覆盖,也不会报错404;  但是对于histroy模式,必须做到路由全覆盖,如 `http://www.abc.com/book/id`。如果后端缺少对 `/book/id` 的路由处理,则会返回404

   参考:

   [vue-router的两种模式的区别 - 掘金](https://juejin.cn/post/6844903552519766029)

   [History - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/History)

2. 用户的登录状态，怎么去记录？

   1. cookie + session

   2. jwt (相比与session, 是一种时间换空间的方式)

   回答: 对于上面两个问题, 总结 https://www.bilibili.com/video/BV1ob4y1Y7Ep?spm_id_from=333.337.search-card.all.click

3. http的响应报文和请求报文讲一下？

4. 使用git怎么去控制分支？

   参考: [Git 分支管理 | 菜鸟教程](https://www.runoob.com/git/git-branch.html)

5. 使用git怎么去查看git仓库文件所在目录中的那些内容被更改了？

   ```bash
   git status   # 查看目录下各个文件状态(跟踪情况、提交情况)
   ```

   样例:

   ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0xi95n9woj20f3048q35.jpg)

   未提交的更改

   ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0xiaay6xnj210o0gijsl.jpg)

   以上两个文件分别是:

   1. 要提交的更改

   2. 未跟踪的文件

6. es6 WeakMap 和 WeakSet？

   具体查看`面试题笔记`中js部分!

7. httpOnly 知道是什么东西嘛？

   回答: 防止cookie被劫持, 为cookie设置这个属性就只能被http请求获取,而js脚本无法获取该cookie, 常用于预防xss攻击

## 网易雷火实习一面(别人的)

1. 实现像下面的函数: `sum(1)(2)(3)`

   ```js
   /* 
       实现像下面这样的函数: sum(1)(2)(3)
   */
   // 方式一
   function sum_1(num1) {
       return function (num2) {
           return function (num3) {
               return num1 + num2 + num3;
           }
       }
   }
   let res = sum_1(1)(2)(3);
   console.log(res); // 6
   
   // 方式二(利用闭包 + toString)
   function sum_2(num) {
       function temp(b) {
           return sum_2(num + b)
       }
       // temp.toString这里写成temp.valueOf也可以
       temp.toString = function () {
           return num
       }
       return temp;
   }
   let ans = sum_2(1)(2)(3);
   console.log(ans.toString());
   ```

2. Array.from将arguments转成数组，还可以使用什么方法？扩展运算符和Array.from都可以转成数组，有什么区别？

   回答: 还可以使用扩展运算符等以下方式

   ```js
   function foo() {
       console.log([...arguments]);   
       console.log(Array.prototype.concat.call([], ...arguments));
       console.log(Array.prototype.slice.call(arguments));
       console.log(Array.apply(null, arguments));
       console.log(Array.prototype.splice.call(arguments, 0));
   }
   foo(1, 2, 3);
   // 函数中打印都是: [1, 2, 3]
   ```

   区别:

   对于扩展运算符来说,需要转换的类数组实现`iterator接口`( 例如arguments ), 而`Array.from`则不需要.

3. for ... of 怎么遍历对象？怎么让对象可以直接用这个方法遍历

   回答: for ... of 是 ES6新增的内容,可以遍历实现了`iterator接口`的数据结构, 如果向让对象也可以是使用 for ... of , 只需要让对象实现 `[Symbol.iterator]` 方法即可

   ```js
   // for ... of 怎么遍历对象？怎么让对象可以直接用这个方法遍历
   // 给对象添加Symbol.iterator方法,实现iterator接口即可
   var obj = {
       name: 'leo',
       age: 21,
       skill: 'code',
       [Symbol.iterator]() {  
           let count = 0; 
           let arrKey = [];
           let that = this;
           for(let key in that) {
               arrKey.push(key);
           }
           return {
               next() {
                   if(count < arrKey.length) {
                       let val = that[arrKey[count]];
                       count++;
                       return {value: val, done: false};
                   }else {
                       return {value: undefined, done: true};
                   }
               }
           }
       }
   };
   let iter = obj[Symbol.iterator]();
   console.log(iter.next());  // {value: 'leo', done: false}
   console.log(iter.next());  // {value: 21, done: false}
   console.log(iter.next());  // {value: 'code', done: false}
   console.log(iter.next());  // {value: undefined, done: true}
   
   for(let ele of obj) {
       console.log(ele);
   }
   // leo
   // 21
   // code
   ```

4. event.target和event.currentTarget区别？绑定捕获阶段的事件，怎么实现？

   * `event.target`指向点击的元素, 而`event.currentTarget`默认依次指向在冒泡阶段的各个元素; 

   * 只需要将`addEventListener`方法的第三个参数改为`true`即可

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>
           #a {
               width: 150px;
               height: 150px;
               background-color: burlywood;
           }
           #b {
               width: 100px;
               height: 100px;
               background-color: orange;
           }
           #c {
               width: 50px;
               height: 50px;
               background-color: red;
           }
       </style>
   </head>
   <body>
       <div id="a">
           <div id="b">
               <div id="c"></div>
           </div>
       </div>
   
       <script>
           // 默认在冒泡阶段触发事件
           document.getElementById('a').addEventListener('click', function (event) {
               console.log('event.target: ' + event.target.id + ' | ' + 'event.currentTarget: ' + event
                   .currentTarget.id);
           })
           document.getElementById('b').addEventListener('click', function (event) {
               console.log('event.target: ' + event.target.id + ' | ' + 'event.currentTarget: ' + event
                   .currentTarget.id);
           })
           document.getElementById('c').addEventListener('click', function (event) {
               console.log('event.target: ' + event.target.id + ' | ' + 'event.currentTarget: ' + event
                   .currentTarget.id);
           })
           // event.target: c | event.currentTarget: c
           // event.target: c | event.currentTarget: b
           // event.target: c | event.currentTarget: a
   
           // 默认在捕获阶段触发事件
           // document.getElementById('a').addEventListener('click', function (event) {
           //     console.log('event.target: ' + event.target.id + ' | ' + 'event.currentTarget: ' + event
           //         .currentTarget.id);
           // }, true)
           // document.getElementById('b').addEventListener('click', function (event) {
           //     console.log('event.target: ' + event.target.id + ' | ' + 'event.currentTarget: ' + event
           //         .currentTarget.id);
           // }, true)
           // document.getElementById('c').addEventListener('click', function (event) {
           //     console.log('event.target: ' + event.target.id + ' | ' + 'event.currentTarget: ' + event
           //         .currentTarget.id);
           // }, true)
           // // event.target: c | event.currentTarget: a
           // // event.target: c | event.currentTarget: b
           // // event.target: c | event.currentTarget: c
       </script>
   </body>
   
   </html>
   ```

   参考: [event.target 和 event.currentTarget 的区别 - FEDeveloper - 博客园](https://www.cnblogs.com/yzhihao/p/9398917.html)

5. async await在进行异常捕获的时候，怎么实现？在promise外层能用try-catch捕获吗？

   ```js
   /* 
       try catch 缺点:
       1. 无法捕获这里 return 的异常
       2. 使用了try/catch 之后，就很难用.的语法来进行 Promise 链式组合了
   */
   async function run() {
       try {
           // 注意这里不是await
           return Promise.reject(new Error("Oops!"));  // 报错
       } catch (error) {
           // 这里不会输出
           console.log(error);
       }
   }
   run();
   ```

   ```js
   // 可以使用 try catch, 但是可以用一种更加优美的方式
   async function run() {
       // 这里使用的 await
       await Promise.reject(new Error('Oops'));
   }
   run()
       .catch(err => {
           console.log(err.message); // Oops
       })
   ```

   ```js
   async function run() {
       // 这是使用 return, 而非 await
       return Promise.reject(new Error('Oops'));
   }
   run()
       .catch(err => {
           console.log(err.message); // Oops
       })
   ```

   > 不能在promise外层用try-catch捕获

   ```js
   try {
       new Promise((resolve, reject) => {
           throw new Error("error");
       })
   } catch (e) {
       console.log(e);  // 没有捕获异常
   }
   ```

   解决: 

   1. 可以使用`then`的第二个参数函数

   2. 使用`catch函数`

   ```js
   // then 的第二个参数函数
   new Promise((resolve, reject) => {
       throw new Error("error!!!");
   }).then(res => null, err => {
       console.log(err.message);  // error!!!
   })
   
   // catch 函数
   new Promise((resolve, reject) => {
       throw new Error("error!!!");
   }).catch(err => {
       console.log(err.message);  // error!!!
   })
   ```

   参考: https://zhuanlan.zhihu.com/p/74928840

6. JS的事件循环，哪些是宏任务？视图渲染的机制？结合宏任务、微任务，视图渲染是在什么时机去做？页面渲染是宏任务能具体讲讲？

   回答: 

   > 1. 宏任务有: setTimeout、setInterval、IO操作、Ajax请求、setimmediate(也可以归为宏任务)

   > 2. DOM渲染是在微任务之后, 宏任务之前执行.

   ```js
   document.body.style = "background:blue";
   setTimeout(function () {
     document.body.style = "background:black";
   }, 0);
   // 将network网络加载速度调慢: 可以看到蓝色一闪而过, 然后变成黑色
   /* 
       因为在进行DOM渲染前, 同步代码 document.body.style = "background:blue";
       设置了背景色, 当进行DOM渲染后, 接着执行宏任务 document.body.style = "background:black";
       所以会出现先蓝色闪过, 然后变黑色
   */
   
   document.body.style = "background:black";
   document.body.style = "background:red";
   document.body.style = "background:blue";
   document.body.style = "background:grey";
   // 现象: 直接变灰
   /* 
       都是同步代码, 所以在执行DOM渲染前, 取最后一次设置即可
   */
   
   document.body.style = "background:blue";
   console.log(1);
   Promise.resolve().then(function () {
     console.log(2);
     document.body.style = "background:black";
   });
   console.log(3);
   // 现象: 直接变黑
   /* 
       因为 document.body.style = "background:blue"; 是同步代码,
       document.body.style = "background:black"; 是微任务中的代码,
       而DOM渲染是在微任务之后, 所以当进行DOM渲染时, background:black,
       所以直接呈现黑色
   */
   ```

   > 3. 页面渲染是宏任务, 可通过调试performance工具对其进行分析, 参考文章: https://zhuanlan.zhihu.com/p/441288090

7. position属性有哪些? 请比较他们之间的区别?

   ```js
   /*
       fixed: 相对于浏览器窗口是固定的, 即使窗口滚动, 它也不会滚动; 
              fixed定位脱离文档流, 不占据空间. Fixed定位的元素
              和其他元素会重叠。
       relative: 对元素进行相对定位, 它将出现在在它所在的位置上. 然后，
                 可以通过设置垂直或水平位置，让这个元素相对于它的起点进行移动,
                 但是会可能覆盖到周围的元素.
       absolute: 绝对定位的元素的位置相对于最近的已定位父元素, 如果元素没有
                 已定位的父元素, 那么就相对于<html>来定位. absolute 定位
                 使元素脱离文档流,因此不占据空间, 和其他元素会重叠。
       sticky: 元素根据正常文档流进行定位, 然后相对它的最近滚动祖先和最近块级祖先.
               基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任
               何其他元素的位置。(表现形式: 上下滚动后 stick 在你设置的top和
               left值位置处).
       static: 默认值。没有定位，元素出现在正常的流中.
   */
   ```

   参考: 

   [position属性&nbsp;比较_前端校招面试题目合集_牛客网](https://www.nowcoder.com/ta/review-frontend/review?page=154)

   [position - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

8. 问了Vue的mixin和mixins？

   回答: 

   mixin本质是一个对象, 常用于将组件公共部分逻辑抽离出来的js对象; 

   而minxins选项接受一个混入对象的数组, mixins在引入组件之后，则是将组件内部的内容如data属性，methods方法与mixin对象内容相对应进行合并, 可以对组件的属性进行扩充, mixins混入的钩子函数会先于组件的钩子函数执行, 并且在遇到同名属性和同名方法等时, 以`组件数据优先`。

   参考: 

   [混入 — Vue.js](https://cn.vuejs.org/v2/guide/mixins.html#%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6)

   [面试官：说说你对vue的mixin的理解，有什么应用场景？ | web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/mixin.html#%E4%B8%80%E3%80%81mixin%E6%98%AF%E4%BB%80%E4%B9%88)

9. computed和watch的区别和使用场景? 

   回答: 

   `computed`是计算属性, 依赖其他属性值, 并且computed值有缓存, 只有当计算值发生变化才返回内容, 可以设置getter和setter.

   `watch`主要是用于监听属性值的变化, 然后在回调中完成一些复杂操作.

   `computed`一般用于模版渲染中, 某个值依赖其他响应式对象甚至是计算属性计算而来; 

   `watch`一般用于侦听某个属性的变化, 然后做出一些复杂逻辑操作.

10. Vue双向数据绑定(驱动)底层怎么实现？

参考: [登录 | ProcessOn](https://www.processon.com/diagraming/625194eef346fb1da675e628)

## 网易雷火暑假提前批一面(别人的)

1. meta标签的作用

   > 用于定义一些不会显示在页面中的元数据信息。告知浏览器如何显示、加载页面。包括对SEO的辅助搜索等

   常见的meta标签属性：

   1. http-equiv属性: 浏览器请求服务器获取html时，服务器会将meta中设置的http-equiv属性放在响应头中返回给用户
   2. name属性：用于描述网页（作者、描述等），便于搜索引擎进行查找与分类

2. 简单说一下VUE的一个生命周期

   首先生命周期指的是Vue实例从创建到销毁的一个过程, 即从创建、初始化数据、编译模版、挂载DOM到渲染、更新到渲染、销毁等一系列过程.

   主要分八个阶段: 

   1. Vue实例的创建前后

   2. Vue实例的挂载前后

   3. Vue实例数据的修改前后

   4. Vue实例的销毁前后

   ```js
   <template>
     <div>
       <div>{{ msg }}</div>
       <button @click="updateMsg">修改msg数据</button>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         msg: "这是数据",
       };
     },
   
     // Vue实例的挂载元素$el和数据对象data都还未初始化
     beforeCreate() {
       console.log("创建前: ", this.$el); // undefined
       console.log("创建前: ", this.msg); // undefined
     },
     // Vue实例的数据对象data初始化,但是挂载元素$el还未初始化
     created() {
       console.log("创建后: ", this.$el); // undefined
       console.log("创建后: ", this.msg); // 这是数据
     },
   
     /* 
       Vue实例的$el和data都已经初始化,
       但$el对应的还是虚拟节点,data.msg还未替换
     */
     beforeMount() {
       console.log("载入前: ", this.$el); // undefined
       console.log("载入前: ", this.msg); // 这是数据
     },
     // Vue实例挂载完成, data.msg成功渲染  ==> 这个函数执行前: DOM渲染完成!!
     mounted() {
       console.log("载入后: ", this.$el);
       /* 
         <div data-v-7ba5bd90="">
           <div>这是数据</div>
         </div>
       */
       console.log("载入后: ", this.msg); // 这是数据
     },
   
     /* 
       触发修改 data 中的数据就会执行
     */
     // 用于获取更新前各种状态
     beforeUpdate() {
       console.log("更新前");
     },
     // 更新后, 所有状态已是最新
     updated() {
       console.log("更新后");
     },
   
     /* 
       Vue实例销毁前后
     */
     beforeDestroy() {
       console.log("销毁前");
     },
     destroyed() {
       console.log("销毁后");
     },
   
     methods: {
       updateMsg() {
         this.msg = "我改变了哟!!";
       },
     },
   };
   </script>
   
   <style>
   </style>
   ```

3. 跨域问题

   参考: https://juejin.cn/post/6844903809118896135

## 模拟面试(2022.4.10)

面试随机问题:

1. 使用 rem 布局的优缺点？✅
2. white-space 与换行和空格的控制？❌
3. 不用promise.all，如何判断三个请求都执行完成（只使用Promise） ❌
4. 函数的节流、防抖?     ✅
5. 数组和伪数组的区别？为什么要设置成伪数组？✅
6. 为什么 data 是一个函数?    ✅
7. v-if 与 v-for 为什么不建议一起使用?   ✅
8. 小程序为什么采用双线程?   ✅
9. 强缓存和协商缓存?   ✅
10. 你知道XSS攻击吗? 如何预防? ✅
11. 什么是SEO?  ✅
12. 前端性能优化方案有哪些? ✅
13. 插入排序写一下?  ✅
14. 选择排序写一下?  ✅

## 网易雷火暑期前端一面(2022.4.15)

1. 介绍项目(公司项目提了一嘴, 让我挑一个我最想说的项目, 我说的Yeo小程序组件库)

2. 细问项目的大组件如何与小组件进行逻辑联动

3. 能说一下npm发包的版本控制等更多细节吗?    ❌

   参考: [从零到一发布 NPM 包 - 掘金](https://juejin.cn/post/7041700222111596580#heading-0)

4. 说一下CSS的flex的属性,系统一些的说  ❌ 🌿

   父元素上: 只说了align-item、justify-content, 而且还忘记了flex-direction, 还说self-item是父元素的, giao !! 搞错了, 这都忘记了, 还是没有熟练练习啊

   子元素上的没让说, 因为一看就不牢固

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
       .container {
         width: 400px;
         height: 400px;
         background-color: rosybrown;
   
         display: flex;
         justify-content: space-around;
         align-items: center;
         flex-direction: row;
         /* flex-wrap: wrap; */
       }
       .container .box {
         height: 100px;
       }
       .box1 {
         /* 
           默认对应三个属性:
           1. flex-grow: 设置子项比例
           2. flex-shrink: 只会在默认宽度之和大于容器宽度时, 才会收缩
           3. flex-basis: 设置子项目基本宽度(默认auto)
         */
         flex: 1 1 200px;
         background-color: pink;
       }
       .box2 {
         flex: 1 0.4 200px;
         background-color: orange;
       }
       .box3 {
         flex: 1 1 200px;
         background-color: greenyellow;
       }
     </style>
   </head>
   <body>
   
     <div class="container">
       <div class="box box1">1</div>
       <div class="box box2">2</div>
       <div class="box box3">3</div>
     </div>
   
   </body>
   </html>
   ```

   在子元素上的属性 align-self

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
       .container {
         width: 400px;
         height: 400px;
         background-color: rosybrown;
   
         display: flex;
         justify-content: center;
         flex-direction: row;
       }
       .container .box {
         height: 100px;
         width: 100px;
       }
       .box1 {
         background-color: pink;
         /* 
           相当于把父元素上的 align-item: flex-end 统一操作,
           改为了在某一个子元素上的单个操作
         */
         align-self: flex-end;
       }
       .box2 {
         background-color: orange;
         align-self: center;
       }
       .box3 {
         background-color: greenyellow;
       }
     </style>
   </head>
   <body>
   
     <div class="container">
       <div class="box box1">1</div>
       <div class="box box2">2</div>
       <div class="box box3">3</div>
     </div>
   
     <script src="./index.js"></script>
   
   </body>
   </html>
   ```

5. 说一下 typeof 表达式, 如何判断类型, 判断哪些类型

   使用`typeof`判断基本数据类型, 则返回其对应的类型的字符串, 除了 `null`判断的时候返回的是 `object`

   如果判断的是数组或者对象, 则返回 `object`

   如果判断的是函数, 则返回`function`

   ```js
   // 基础数据类型
   let var1 = 11;
   let var2 = 'str';
   let var3 = true;
   let var4 = undefined;
   let var5 = null;     // special !!
   let var6 = Symbol('tag');
   let var7 = 123n;
   
   // 引用数据类型
   let var8 = {};
   let var9 = [];
   let var10 = function() {};
   
   console.log(typeof var1);  // number
   console.log(typeof var2);  // string
   console.log(typeof var3);  // boolean
   console.log(typeof var4);  // undefined
   console.log(typeof var5);  // object  special !!
   console.log(typeof var6);  // symbol
   console.log(typeof var7);  // bigint
   
   console.log(typeof var8);  // object
   console.log(typeof var9);  // object
   console.log(typeof var10);  // function
   ```

6. 说一下new关键字的生成实例的过程(new原理)

   1. 创建一个新对象

   2. 将这个新对象的`__proto__`属性指向构造函数的原型对象

   3. 调用构造函数, 并将构造函数中的`this`指向这个新创建的对象 (简单说就是给对象添加属性)

   4. 如果该构造函数返回值是一个对象, 则返回这个对象; 否则返回第一步新创建的这个对象

   模拟实现: 

   ```js
   function Person(name, age) {
       this.name = name;
       this.age = age;
   }
   
   // 手写实现 new 代码
   function ImplementNew() {
       let obj = {};
       obj.__proto__ = Person.prototype;
       let result = Person.call(obj, ...arguments);
       return typeof result == 'object' ? result : obj;
   }
   
   let person = ImplementNew('leo', 21);
   console.log(person);   // {name: 'leo', age: 21}
   ```

7. **说一下Vue2的改写了数组哪些方法?**(没问, 换一个问题改变原数组的方法有哪些?)  ❌ 🌿

   我说了push、pop、shift、unshift、splice、sort、reverse

   然后面试官说: 对呀, Vue2中就是改写了这七个方法, 让他在调用的时候触发响应, 如果用Object.defineProperty(), 所以Vue2中数组用来还是有些坑的

8. 那你说一下shift和unshift? unshift的返回值是什么? (这里紧张了一下, 口误差点说错了, giao)

   shift 和 unshift 都会改变原数组

   shift 是从原数组的头部删掉一个元素, 并返回删掉的元素

   unshift 是从原数组的头部添加一个元素, 并返回添加后数组的长度

9. 说一下数组的reduce方法? 以及他的参数

   `reduce`方法需要传入两个参数:

   1. 函数 (对应的参数有四个)
      1. previous: 之前操作的累积结果
      2. current: 当前元素
      3. currentIndex: 当前元素的索引
      4. array: 调用数组
   2. initValue

10. 说一下reduce方法的具体使用场景?  ❌

    我说使用过reduce做累加操作, 但是面试官说业务不可能就只是一个累加吧

    面试官说: 那你听我总结,其实就是为了解决数组的一种遍历求值的方式

11. 那数组上你还用过哪些比较高级的方法?

    1. map

    2. filter

    3. every

    4. some

    5. find

    6. flat

12. 业务场景题: 表格的分页, 点第一页请求第一页的数据, 点第二页请求第二页的数据, 以此类推, 但是现在后端接口的请求很不稳定, 用户在快速点击不同的页码, 导致页面请求数据混乱, 该如何解决?

    我说了两种方式: 

    1. 使用节流的方式, 限制用户进行快速点击操作

    2. 使用Promise进行请求, 如果第一页的请求还没有回到客户端时, 我的第二页和第三页是不能被点击(通过设置布尔值, 设置页标是否可被点击) 

13. 防抖和节流的区别?

    防抖是取最后一次, 而节流是指在匀速的执行某一个任务.

14. 那对于刚才的业务题, 有没有更加通用的方法? 以后就不用写了   ❌

    这个应该是就是想让我从请求工具的角度去说

15. 发送请求的工具用过吗?

    我说只是简单用过axios

面试官人很好, 还给我说出我说不来的问题的解答. 感谢面试官!!

自我总结: 

1. 节奏适当放慢, 先思考几秒再总结出回答, 不要上来就答

2. 放平心态, 相信自己, you just fucking great!!

3. 对于一个知识来说深入的不够全面

4. 对于问题我有些不用想的过于复杂, 就按照基本逻辑说就是, 比如这里的第10个问题, 面试官其实就是想知道reduce是一一遍历数组中元素进行, 然后进行每一次的计算, 可以是累加也可以是累乘, 具体的实现都是看回调函数中的代码, 这样说就OK

面试官评价: 

1. 知识学习要更加成体系一点

2. 底下的基础并不是很牢固

## 百度暑期实习一面(2022.4.17)

1. 项目介绍   ❌

   我说的Find信栈项目, 感觉我回答的具体问题时不是不知道是方向答错了. 

   因为这个Find信栈还是用了Yeo组件库, 涉及到组件库这块的设计没有说明白

2. 项目中提及的垃圾回收机制   ❌

   chrome中的垃圾回收机制, 我说了有两种方式, 一种是计数, 一种没说出名字

3. Promise的同步是如何实现的?

   我说了有三个状态去判定, 在源码中去看then, 比对状态, PENDING就放入数组, Fulfilled或者rejected就执行对应的resolve和reject

4. Fulfilled或者rejected之后可以回到PENDING状态吗?

5. async和await为什么没用在项目里, 而用Promise?  (因为当时没学到这里)

6. 能介绍下CSS选择器的效率? 以及CSS如何查找?

7. CSS优先级?

8. flex和BFC布局有什么区别?   ❌

9. 让一个元素水平垂直居中, 用flex和不用flex, 如何实现?

10. 我用 position: absolute 实现水平垂直方向上的居中, 是对于有固定宽度和高度的元素来说, 如果块元素的宽度和高度不固定, 有什么方法实现垂直居中吗?   ❌

11. 暂时只有flex可以实现垂直居中吗?   ❌

    我说grid也可以...   这里可以说 line-height 对于行内垂直居中

    > 解析

    参考: [CSS垂直居中的12种实现方式 - 掘金](https://juejin.cn/post/6844903550909153287)

12. position有哪些属性? 具体是如何的? 

13. position: relative 如果设置在当前元素上, 是如何的效果?    ❌

    ```css
    .box {
        position: relative;
        left: 15px;    
        top: 15px; 
    }
    ```

    > 问我`.box`的表现会如何? 有没有位置的变化之类的?   

    我说没有位置变化

    解析: 如果设置left和top有值, `.box`是要移动的

    > 那left和top最终会表现在谁身上?  

    我说表现在他子元素身上

    解析: `是表现在当前元素上的`

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
          background-color: red;
          position: relative;
          top: 10px;
          left: 10px;
        }
      </style>
    </head>
    <body>
      <div class="item"></div>
    </body>
    
    </html>
    ```

14. 给定一个nums数组和目标target, 找到数组中两个数想加为target, 返回这两个数的数组下标

    先排序, 然后我用了一个左右的双指针, 然后往中心走, 直到找到这两个相加为target的数

面试官: 

1. 项目细节还需要说的更好

2. 基础 position: relative

3. 不是所有的场景都适合 flex (IE兼容性差), 用不上 flex 时, position: relative 还是用的上的