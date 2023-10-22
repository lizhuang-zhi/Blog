# 第一章(什么是JS)

## JS实现

> JS实现包括

* 核心（ECMAScript）
* 文档对象模型（DOM）
* 浏览器对象模型（BOM）

# 第二章(HTML中的JS)

## `<script>`元素

`<script>`元素有下八个属性：

* async：异步下载脚本，不必等待页面加载。

* charset：可选。使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不 在乎它的值。

* crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据 标志，意味着出站请求会包含凭据。

* defer：可选。脚本会被延迟到整个页面都解析完毕后再运行。只对外部脚本文件有效。 在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。

* integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI， Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错， 脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。

* language：废弃。

* src：可选。表示包含要执行的代码的外部文件。

* type：可选。代替 language，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript" 都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给 type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有 "application/javascript"和"application/ecmascript"。如果这个值是 module，则代 码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。
  
  ![](https://tva1.sinaimg.cn/large/008i3skNgy1gvqm4b8rh4j61yz0u00xt02.jpg)

# 第三章(语言基础)

## 3.3 变量

### var 和 let

> `var`声明作用域

```js
function foo() {
    var message = 'important';  // 声明一个局部变量
}
foo();
console.log(message);  // 报错：message is not defined

function bar() {
    age = 20;   // 声明一个全局变量
}
bar();
console.log(age);  // 20
```

去掉关键字`var`，可以在函数内部声明一个全局变量。**但是极其不推荐，因为在局部作用域中定义的全局变量不利于维护**

> `var`声明提升

```js
function foo() {
    console.log(age);  // undefined
    var age = 26;
}
foo(); 
```

这样写的代码不会报错，是因为 ECMAScript 运行时把它看成等价于如下代码

```js
function foo() {
    var age;
    console.log(age);  // undefined
    age = 26;
}
foo(); 
```

此外反复多次的声明同一个变量也 OK

```js
function foo() {
    var age = 16;
    var age = 26;
    var age = 36;
    console.log(age);  // 36
}
foo(); 
```

> `let`声明

```js
if (true) {
    var name = 'Matt';
    console.log(name); // Matt
}
console.log(name); // Matt

if (true) {
    let age = 26;
    console.log(age); // 26
}
console.log(age); // ReferenceError: age 没有定义
```

**var 声明的范围是函数作用域，let 声明的返回是块级作用域**

```js
var name;
var name;
let age;
let age; // SyntaxError；标识符 age 已经声明过了
```

同时 let 不允许重复声明同一个变量

```js
var name = 'Nicholas';
console.log(name); // 'Nicholas'
if (true) {
    var name = 'Matt';
    console.log(name); // 'Matt'
}
let age = 30;
console.log(age); // 30
if (true) {
    let age = 26;
    console.log(age); // 26
}
```

而上述代码中，JavaScript 引擎会记录用于变量声明的标识符及其所在的块作用域，因此嵌套使用相同的标识符不会报错，而这是因为同一个块中没有重复声明。

> 暂时性死区

```js
// name 会被提升
console.log(name); // undefined
var name = 'Matt';
// age 不会被提升
console.log(age); // ReferenceError：age 没有定义
let age = 26;
```

> let 全局声明

```js
var name = 'Matt';
console.log(window.name); // 'Matt'
let age = 26;
console.log(window.age); // undefined 
```

**与 var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性（var 声明的变量则会）**

> for 循环中的 let 声明

```js
for(var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);   
    },1000)
}
// 一秒后（几乎同时）
// 5
// 5
// 5
// 5
// 5
```

之所以会这样，是因为在退出循环时，迭代变量保存的是导致循环退出的值：5。在之后执行超时 逻辑时，所有的 i 都是同一个变量，因而输出的都是同一个最终值

```js
for(let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);   
    },1000)
}
// 一秒后（几乎同时）
// 0
// 1
// 2
// 3
// 4
```

而在使用 let 声明迭代变量时，JavaScript 引擎在后台会为每个迭代循环声明一个新的迭代变量。 每个 setTimeout 引用的都是不同的变量实例

> const 声明

const 的行为与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量

尝试修改 const 声明的基本数据类型的变量，会导致运行时错误；
但是可以修改引用类型的变量中的属性

```js
/* 改基本数据类型的值 -- 报错 */
const msg = 'start val';
msg = 123;  // 报错

/* 改引用类型的属性 */
const obj = {
    name: 'Mr.KLeo'
};
obj.name = 'Kang';
console.log(obj);  // {name: 'Kang'}

/* 改成新的应用类型 -- 报错 */
const otherObj = {
    name: 'leo'
};
// 报错
otherObj = {
    name: 'dong'
}
```

如果你只想用 const 声明一个不会被修改的 for 循环变量，那也是可以的。也就是说，每 次迭代只是创建一个新变量。这对 for-of 和 for-in 循环特别有意义

```js
let i = 0;
for (const j = 7; i < 5; ++i) {
    console.log(j);
}
// 7, 7, 7, 7, 7
for (const key in { a: 1, b: 2 }) {
    console.log(key);
}
// a, b
for (const value of [1, 2, 3, 4, 5]) {
    console.log(value);
}
// 1, 2, 3, 4, 5
```

### var 和 let 的区别

1. var 声明范围是函数作用域，let 声明是块级作用域
2. var 允许重复声明同一个变量，而 let 不行
3. var 有变量提升，而 let 不行
4. var 在全局作用域中声明的变量会成为 window 对象的属性，而 let 不会

## 3.4 数据类型

ECMAScript 有 6 种简单数据类型（也称为原始类型）：Undefined、Null、Boolean、Number、 String、BigInt 和 Symbol。Symbol（符号）是 ECMAScript 6 新增的。还有一种复杂数据类型叫 Object（对象），Object 是一种无序名值对的集合。

> typeof 操作符

```js
let message = "some string";
console.log(typeof message); // "string"
console.log(typeof (message)); // "string"
console.log(typeof 95); // "number" 
/* attention */
console.log(typeof null);  // "object"
```

对一个未声明的变量使用 typeof 

```js
console.log(typeof age);  // "undefined"
```

### Null 类型

Null 类型同样只有一个值，即特殊值 null。逻辑上讲，null 值表示一个空对象指针，这也是给 typeof 传一个 null 会返回 "object" 的原因

```js
console.log(null == undefined);  // true
console.log(null === undefined);  // false
```

### Number 类型

a little problem

```js
console.log(0.2 + 0.1);  // 0.30000000000000004
```

> NaN

```js
console.log(NaN == NaN); // false 

console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false，10 是数值
console.log(isNaN("10")); // false，可以转换为数值 10
console.log(isNaN("blue")); // true，不可以转换为数值
console.log(isNaN(true)); // false，可以转换为数值 1 
```

> 数值转化

```js
console.log(parseInt(""));  // NaN
console.log(Number(""));  // 0
```

### String 类型

> 模版字面量标签函数

```js
let a = 6;
let b = 9;
function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
    console.log(strings);
    console.log(aValExpression);
    console.log(bValExpression);
    console.log(sumExpression);
    return 'foobar';
}
let untaggedResult = `${a} + ${b} = ${a + b}`;
let taggedResult = simpleTag`${a} + ${b} = ${a + b}`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15 

console.log(untaggedResult); // "6 + 9 = 15"
console.log(taggedResult); // "foobar" 
```

### Symbol 类型

> 1. 基本用法

```js
let symbol = Symbol('good code');
console.log(symbol);  // Symbol(good code)
```

**Symbol 函数不能与 new 一起作为构造函数使用**，这样做是为了避免创建符 号包装对象

```js
let myBoolean = new Boolean();
console.log(typeof myBoolean); // "object"
let myString = new String();
console.log(typeof myString); // "object"
let myNumber = new Number();
console.log(typeof myNumber); // "object"
let mySymbol = new Symbol(); // TypeError: Symbol is not a constructor
```

> 2. 使用全局符号注册表

```js
let symbol = Symbol('good code');
let symbol2 = Symbol('good code');
console.log(symbol === symbol2);  // false

let fooGlobalSymbol = Symbol.for('foo'); // 创建新符号
let otherFooGlobalSymbol = Symbol.for('foo'); // 重用已有符号
console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true 
```

还可以使用 Symbol.keyFor()来查询全局注册表，这个方法接收符号，返回该全局符号对应的字 符串键。如果查询的不是全局符号，则返回 undefined。

```js
// 创建全局符号
let s = Symbol.for('foo');
console.log(Symbol.keyFor(s)); // foo
// 创建普通符号
let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2)); // undefined

Symbol.keyFor(123); // TypeError: 123 is not a symbol 
```

> 3. 使用符号作为属性

```js
var obj = {
    [Symbol('foo')]: 'nice job'
}
Object.defineProperty(obj, Symbol('other'), {
    value: 'bad job'
})

console.log(obj);  // {Symbol(foo): 'nice job', Symbol(other): 'bad job'}
```

> 5. Symbol.asyncIterator

```js
class Foo {
    async *[Symbol.asyncIterator]() { }
}
let f = new Foo();
console.log(f[Symbol.asyncIterator]());
// AsyncGenerator {<suspended>}
```

```js
class Emitter {
    constructor(max) {
        this.max = max;
        this.asyncIdx = 0;
    }
    async *[Symbol.asyncIterator]() {
        while (this.asyncIdx < this.max) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    }
}
async function asyncCount() {
    let emitter = new Emitter(5);
    for await (const x of emitter) {
        console.log(x);
    }
}
asyncCount();
// 0
// 1
// 2
// 3
// 4
```

> 6. Symbol.hasInstance

```js
function Foo() { }
let f = new Foo();
console.log(f instanceof Foo); // true
class Bar { }
let b = new Bar();
console.log(b instanceof Bar); // true
```

在 ES6 中，instanceof 操作符会使用 Symbol.hasInstance 函数来确定关系。以 Symbol. hasInstance 为键的函数会执行同样的操作

```js
function Foo() { }
let f = new Foo();
console.log(Foo[Symbol.hasInstance](f)); // true
class Bar { }
let b = new Bar();
console.log(Bar[Symbol.hasInstance](b)); // true
```

重新定义

```js
class Bar { }
class Baz extends Bar {
    static [Symbol.hasInstance]() {
        return false;
    }
}
let b = new Baz();
console.log(Bar[Symbol.hasInstance](b)); // true
console.log(b instanceof Bar); // true
console.log(Baz[Symbol.hasInstance](b)); // false
console.log(b instanceof Baz); // false 
```

> 8. Symbol.iterator

```js
class Foo {
    *[Symbol.iterator]() { }
}
let f = new Foo();
// [Symbol.iterator] 在 Foo 的原型对象上
console.log(f[Symbol.iterator]());
// Generator {<suspended>}
```

这个由 Symbol.iterator 函数生成的对象应该通过其 next()方法陆续返回值。可以通过显式地调用 `next()` 方法返回，也可以隐式地通过生成器函数返回

```js
class Emitter {
    constructor(max) {
        this.max = max;
        this.idx = 0;
    }
    *[Symbol.iterator]() {
        while (this.idx < this.max) {
            yield this.idx++;
        }
    }
}
function count() {
    let emitter = new Emitter(5);
    for (const x of emitter) {
        console.log(x);
    }
}
count();
// 0
// 1
// 2
// 3
// 4
```

# 第四章（变量、作用域与内存）

## 4.3 垃圾回收

> 内存管理

1. 隐藏类
   
   避免 JavaScript 的“先创建再补充”（ready-fire-aim）式的动态属性赋值，并在 构造函数中一次性声明所有属性
   
   ```js
   function Article(opt_author) {
       this.title = 'Inauguration Ceremony Features Kazoo Band';
       this.author = opt_author;
   }
   let a1 = new Article();
   let a2 = new Article('Jake');
   ```
   
   添加和删除操作都会增加隐藏类（变成两个），影响性能
   
   ```js
   // 删除操作
   function Article() {
       this.title = 'Inauguration Ceremony Features Kazoo Band';
       this.author = 'Jake';
   }
   let a1 = new Article();
   let a2 = new Article();
   delete a1.author;
   ```
   
   ```js
   // 添加操作
   function Article(opt_author) {
       this.title = 'Inauguration Ceremony Features Kazoo Band';
       this.author = opt_author;
   }
   let a1 = new Article();
   let a2 = new Article('Jake');
   a2.author = 'Jake';
   ```

2. 内存泄漏
   
   ```js
   // 意外声明全局变量是最常见但也最容易修复的内存泄漏问题
   function setName() {
       name = 'Jake';
   }
   
   // 定时器也可能会悄悄地导致内存泄漏。下面的代码中，定时器的回调通过闭包引用了外部变量
   // 只要定时器一直运行，回调函数中引用的 name 就会一直占用内存。垃圾回收程序当然知道这一点，
   // 因而就不会清理外部变量。
   let name = 'Jake';
   setInterval(() => {
       console.log(name);
   }, 100);
   
   // 这里的闭包会延长 name 的生命周期，只要返回的函数存在就不能清理 name，因为闭包一直在引用着它
   function outer() {
       let name = 'leo';
       return function() {
           return name;
       }
   }
   ```

# 第五章（基本引用类型）

## 5.2 RegExp

ECMAScript 通过 RegExp 类型支持正则表达式。正则表达式使用类似 Perl 的简洁语法来创建： 

`let expression = /pattern/flags;`

这个正则表达式的 pattern（模式）可以是任何简单或复杂的正则表达式，包括字符类、限定符、 分组、向前查找和反向引用。每个正则表达式可以带零个或多个 flags（标记），用于控制正则表达式的行为。下面给出了表示匹配模式的标记。

* g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
* i：不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。
* m：多行模式，表示查找到一行文本末尾时会继续查找。
* y：粘附模式，表示只查找从 lastIndex 开始及之后的字符串。
* u：Unicode 模式，启用 Unicode 匹配。
* s：dotAll 模式，表示元字符.匹配任何字符（包括\n 或\r）。

some examples:

```js
let str = 'ib .at good boy';

// 匹配第一个"bat"或"cat"，忽略大小写
let pattern1 = /[bc]at/i;
// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern2 = /.at/g;
// 匹配字符串中的所有".at"
let pattern3 = /\.at/g;

console.log(pattern1.test(str));  // false
console.log(pattern2.test(str));  // true
console.log(pattern3.test(str));  // true
```

> 同样也可以通过 new RegExp

```js
let s = '[bc]at';
// 匹配第一个"bat"或"cat"，忽略大小写
let pattern1 = /[bc]at/i;
// 跟 pattern1 一样，只不过是用构造函数创建的
let pattern2 = new RegExp("[bc]at", "i");

console.log(pattern2.test(s));
```

因为 RegExp 的模式参数是字符串，所以在某些情况下需要二次转义。所有元字符都必须二次转 义，包括转义字符序列，如\n（\转义后的字符串是\\，在正则表达式字符串中则要写成\\\\）。下表 展示了几个正则表达式的字面量形式，以及使用 RegExp 构造函数创建时对应的模式字符串

![](https://tva1.sinaimg.cn/large/008i3skNgy1gvvwqou5mjj31ni0csq4f.jpg)

> 常见的正则判断

```js
let checkRegExp = {
    // 验证邮箱
    isEmail(idStr) {
        var str = idStr.toString();
        var regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!regex.test(str)) {
            alert("请输入正确的邮箱格式!");
        } else {
            alert("输入正确！")
        }
    },
    // 验证手机号
    isPhone(idStr) {
        var str = idStr.toString();
        var regex = /^1[3456789]\d{9}$/;
        if (!regex.test(str)) {
            alert("请输入正确的手机号!");
        } else {
            alert("输入正确！")
        }
    },
    // 验证身份证
    isIdCard(idStr) {
        var str = idStr.toString();
        var regex = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        if (!regex.test(str)) {
            alert("请输入正确的身份证号码!");
        } else {
            alert("输入正确！")
        }
    }
};

checkRegExp.isPhone(1820181462);
```

# 第八章（对象、类与面向对象编程）

具体看单个笔记

# 第十章（函数）

## 10.2 函数名

因为函数名就是指向函数的指针，所以它们跟其他包含对象指针的变量具有相同的行为。这意味着 一个函数可以有多个名称

```js
function sum(num1, num2) {
    return num1 + num2;
}
console.log(sum(10, 20));  // 30

let otherPoint = sum;
console.log(otherPoint(1, 2));  // 3

sum = null;
console.log(otherPoint(11, 22));  // 33
```

## 10.5 默认参数值

参数也存在自己的作用域，它们不能引用函数体的作用域

```js
// 调用函数时，不传第二个参数会报错
// 因为第二个参数引用了函数作用域中的变量
function makeKing(name = 'Henry', numerals = defaultNumeral) {
    let defaultNumeral = 'VIII';
    return `King ${name} ${numerals}`;
}

let res = makeKing('leo', 'the second arg');
console.log(res);
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gwx4eaeobmj319f0jxae7.jpg)

## 10.7 函数声明与函数表达式

```js
// 没问题
console.log(sum(10, 10));  // 20
function sum(num1, num2) {
    return num1 + num2;
}

// 会出错
console.log(sum(10, 10));
// 这里不论用 let 还是 var 声明都会报错
let sum = function (num1, num2) {
    return num1 + num2;
};
```

对于第一段代码，是属于**函数声明提升**，所以没问题。

但是对于第二段代码的函数表达式，是程序执行到这一段代码时，才有函数的定义，所以报错。

## 10.9 函数内部

### 10.9.1 arguments

一个经典的阶乘代码

```js
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}
```

通过`arguments.callee`重写后

```js
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
```

这个重写之后的 `factorial()`函数已经用 `arguments.callee` 代替了之前硬编码的 `factorial`。 这意味着无论函数叫什么名称，都可以引用正确的函数

```js
let trueFactorial = factorial;
factorial = function () {
    return 0;
};
console.log(trueFactorial(5)); // 120
console.log(factorial(5)); // 0
```

### 10.9.2 this

在事件回调或定时回调中调用某个函数时，this 值指向的并非想要的对象。此时将 回调函数写成箭头函数就可以解决问题。这是因为箭头函数中的 this 会保留定义该函数时的上下文

```js
function King() {
    this.royaltyName = 'Henry';
    // this 引用 King 的实例
    setTimeout(() => console.log(this.royaltyName), 1000);
}

function Queen() {
    this.royaltyName = 'Elizabeth';
    // this 引用 window 对象
    setTimeout(function () {
        console.log(this.royaltyName);
    }, 1000);
}
new King(); // Henry
new Queen(); // undefined
```

### 10.9.3 caller

这个属性引用的是调用当前函数的函数，或者如果是在全局作用域中调用的则为 null

```js
function foo() {
    console.log(foo.caller);   // null
}

foo();
```

```js
function outer() {
    inner();
}

function inner() {
    console.log(inner.caller);
    // ƒ outer() {
    //  inner();
    // }
}
outer();
```

以上代码会显示 outer()函数的源代码。这是因为 ourter()调用了 inner()，inner.caller 指向 outer()。

如果要降低耦合度，则可以通过 arguments.callee.caller 来引用同样的值

```js
function outer() {
    inner();
}

function inner() {
    console.log(arguments.callee.caller);
    // ƒ outer() {
    //  inner();
    // }
}
outer();
```

### 10.9.4 new.target

ECMAScript 6 新增了检测函数是否使用 new 关键字调用的 new.target 属性。如果函数是正常调用的，则 new.target 的值是 undefined；如果是使用 new 关键字调用的，则 new.target 将引用被调用的 构造函数。

```js
function King() {
    if (!new.target) {
        throw 'King must be instantiated using "new"'
    }
    console.log('King instantiated using "new"');
}
new King(); // King instantiated using "new"
King(); // Error: King must be instantiated using "new" 
```

## 10.11 函数表达式

```js
// 千万别这样做！
if (condition) {
    function sayHi() {
        console.log('Hi!');
    }
} else {
    function sayHi() {
        console.log('Yo!');
    }
}
```

这段代码看起来很正常，就是如果 condition 为 true，则使用第一个 `sayHi()` 定义；否则，就使用第二个。事实上，这种写法在 ECAMScript 中不是有效的语法。JavaScript 引擎会尝试将其纠正为适当的声明。问题在于浏览器纠正这个问题的方式并不一致。多数浏览器会忽略 condition 直接返回第二个声明。Firefox 会在 condition 为 true 时返回第一个声明。这种写法很危险，不要使用。不过， 如果把上面的函数声明换成函数表达式就没问题了

```js
// 没问题
let sayHi;
if (condition) {
    sayHi = function () {
        console.log("Hi!");
    };
} else {
    sayHi = function () {
        console.log("Yo!");
    };
}
```

## ==10.13 尾调用优化==

> 什么是尾调用优化？

**可以避免函数递归调用时，栈内存溢出！**

### 10.13.1 尾调用优化的条件

尾调用优化的条件就是确定外部栈帧真的没有必要存在了。涉及的条件如下：

* 代码在严格模式下执行； 
* 外部函数的返回值是对尾调用函数的调用；
* 尾调用函数返回后不需要执行额外的逻辑；
* 尾调用函数不是引用外部函数作用域中自由变量的闭包。 

展示不符合的例子

```js
"use strict";
// 无优化：尾调用没有返回
function outerFunction() {
    innerFunction();
}
// 无优化：尾调用没有直接返回
function outerFunction() {
    let innerFunctionResult = innerFunction();
    return innerFunctionResult;
}
// 无优化：尾调用返回后必须转型为字符串
function outerFunction() {
    return innerFunction().toString();
}
// 无优化：尾调用是一个闭包
function outerFunction() {
    let foo = 'bar';

    function innerFunction() {
        return foo;
    }
    return innerFunction();
}
```

符合的例子

```js
"use strict";
// 有优化：栈帧销毁前执行参数计算
function outerFunction(a, b) {
    return innerFunction(a + b);
}
// 有优化：初始返回值不涉及栈帧
function outerFunction(a, b) {
    if (a < b) {
        return a;
    }
    return innerFunction(a + b);
}
// 有优化：两个内部函数都在尾部
function outerFunction(condition) {
    return condition ? innerFunctionA() : innerFunctionB();
}
```

### 10.13.2 尾调用优化的代码（优化递归的栈内存溢出）

```js
function fib(n) {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
console.log(fib(0)); // 0
console.log(fib(1)); // 1
console.log(fib(2)); // 1
console.log(fib(3)); // 2
console.log(fib(4)); // 3
console.log(fib(5)); // 5
console.log(fib(6)); // 8
```

当传入参数n足够大时，这里的斐波纳契数列的函数就会栈溢出

```js
"use strict";
// 基础框架
function fib(n) {
    return fibImpl(0, 1, n);
}
// 执行递归
function fibImpl(a, b, n) {
    if (n === 0) {
        return a;
    }
    return fibImpl(b, a + b, n - 1);
}

console.log(fib(6));  // 8
console.log(fib(1000));  // 4.346655768693743e+208
```

这样重构之后，就可以满足尾调用优化的所有条件，再调用 fib(1000)就不会对浏览器造成威胁了。

## 10.14 闭包

### 10.14.1 this 对象

深入理解

```js
window.identity = 'The Window';
let object = {
    identity: 'My Object',
    getIdentity() {
        return this.identity;
    }
};

object.getIdentity(); // 'My Object'
(object.getIdentity)(); // 'My Object'
(object.getIdentity = object.getIdentity)(); // 'The Window' 
```

第一行调用`object.getIdentity()`是正常调用，会返回"My Object"，因为 this.identity 就是 object.identity。第二行在调用时把`object.getIdentity`放在了括号里。虽然加了括号之 后看起来是对一个函数的引用，但 this 值并没有变。这是因为按照规范，`object.getIdentity`和`(object.getIdentity)`是相等的。第三行执行了一次赋值，然后再调用赋值后的结果。因为赋值表 达式的值是函数本身，this 值不再与任何对象绑定，所以返回的是"The Window"。 一般情况下，不大可能像第二行和第三行这样调用对象上的方法。但通过这个例子，我们可以知道， 即使语法稍有不同，也可能影响 this 的值。

### 10.14.2 内存泄漏（没理解 - 2021.12.1）

来看下面的例子：

```js
function assignHandler() {
    let element = document.getElementById('someElement');
    element.onclick = () => console.log(element.id);
}
```

以上代码创建了一个闭包，即 element 元素的事件处理程序（事件处理程序将在第 13 章讨论）。 而这个处理程序又创建了一个循环引用。匿名函数引用着`assignHandler()`的活动对象，阻止了对 element 的引用计数归零。只要这个匿名函数存在，element 的引用计数就至少等于 1。也就是说， 内存不会被回收。其实只要这个例子稍加修改，就可以避免这种情况，比如：

```js
function assignHandler() {
    let element = document.getElementById('someElement');
    let id = element.id;
    element.onclick = () => console.log(id);
    element = null;
}
```

在这个修改后的版本中，闭包改为引用一个保存着 element.id 的变量 id，从而消除了循环引用。 不过，光有这一步还不足以解决内存问题。因为闭包还是会引用包含函数的活动对象，而其中包含 element。即使闭包没有直接引用 element，包含函数的活动对象上还是保存着对它的引用。因此，必 须再把 element 设置为 null。这样就解除了对这个 COM 对象的引用，其引用计数也会减少，从而确 保其内存可以在适当的时候被回收。

## 10.15 立即调用的函数表达式

```js
let divs = document.querySelectorAll('div');
// 达不到目的！
for (var i = 0; i < divs.length; ++i) {
    divs[i].addEventListener('click', function () {
        console.log(i);
    });
}
```

这里使用 var 关键字声明了循环迭代变量 i，但这个变量并不会被限制在 for 循环的块级作用域内。 因此，渲染到页面上之后，点击每个都会弹出元素总数。这是因为在执行单击处理程序时，迭代变 量的值是循环结束时的最终值，即元素的个数。而且，这个变量 i 存在于循环体外部，随时可以访问。

```js
let divs = document.querySelectorAll('div');
// 达不到目的！
for (let i = 0; i < divs.length; ++i) {
    divs[i].addEventListener('click', function () {
        console.log(i);
    });
}
```

将 var 改成 let 即可

这样就可以让每次点击都显示正确的索引了。这里，事件处理程序执行时就会引用 for 循环块级作 用域中的索引值。这是因为在 ECMAScript 6 中，如果对 for 循环使用块级作用域变量关键字，在这里 就是 let，那么循环就会为每个循环创建独立的变量，从而让每个单击处理程序都能引用特定的索引。

但要注意，如果把变量声明拿到 for 循环外部，那就不行了。下面这种写法会碰到跟在循环中使用 var i = 0 同样的问题：

```js
let divs = document.querySelectorAll('div');
// 达不到目的！
let i;
for (i = 0; i < divs.length; ++i) {
    divs[i].addEventListener('click', function () {
        console.log(i);
    });
}
```
