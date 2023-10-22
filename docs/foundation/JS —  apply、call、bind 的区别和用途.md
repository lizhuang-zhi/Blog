# JS —  apply、call、bind 的区别和用途

> ECAMScript 3给Function的原型定义了两个方法,它们是Function.prototype.call和Function.prototype.apply

## call和apply的区别

> Function.prototype.call 和 Function.prototype.apply 都是非常常用的方法。它们的作用一模一样,区别仅在于传入参数的形式的不同

apply 接受两个参数：

* 第一个参数指定了函数体内 this 对象的指向
* 第二个参数为一个带下标的集合,这个集合可以为数组,也可以为类数组,apply 方法把这个集合中的元素作为参数传递给被调用的函数

```js
let fun = function(a,b,c) {
  console.log(this,a,b,c);  // window对象,2,3,5
}
fun.apply(null, [2,3,5,6]);
```

call 传入的参数数量不固定：

* 第一个参数也是代表函数体内的 this 指向,
* 从第二个参数开始往后,每个参数被依次传入函数

```js
let fun = function(a,b,c) {
  console.log(this,a,b,c);  // window对象,2,3,5
}
fun.call(null, 2,3,5,6); // 这里的参数形式不同
```

注意：当使用 call 或者 apply 的时候,如果我们传入的第一个参数为 null,函数体内的 this 会指向默认的宿主对象,在浏览器中则是 window对象，也就是说此时的fun相当于是声明的window对象的fun方法

但如果是在严格模式下,函数体内的 this 还是为 null

```js
let fun = function(a,b,c) {
  "use strict";
  console.log(this);  // null
}
fun.call(null, 2,3,5,6);
```

## **call与apply的用途**

### 用途一 : **传入 null 来代替某个具体的对象**

* 不使用call和apply求数组中的最大值

```js
let res = Math.max(...[2,3,7]);
console.log(res);  // 7
```

* 使用call或者apply

```js
let res = Math.max.apply(null, [2,3,7]);
console.log(res);  // 7
```

### 用途二 : 改变this指向

```js
let obj1 = {
  name: 'obj_1'
};
let obj2 = {
  name: 'obj_2'
};
window.name = 'window_name';
let sayName = function() {
  console.log(this.name);
}
sayName();  // window_name
sayName.apply(obj1);  // obj_1
sayName.apply(obj2);  // obj_2
```

### 用途三 : ==借用其他对象的方法==

**借用方法的第一种场景是“借用构造函数”,通过这种技术,可以实现一些类似继承的效果**

```js
let A = function(name) {
  this.name = name;
};
let B = function() {
  console.log(arguments);  // Arguments ["leo", callee: ƒ, Symbol(Symbol.iterator): ƒ]
  A.apply(this,arguments);  // 这一步等价于 this.name = 'leo';
};

B.prototype.getName = function() {
  return this.name;
}

let b = new B('leo');
console.log(b.getName());  // leo
```

**借用方法的第二种场景——函数的参数列表 arguments 是一个类数组对象,虽然它也有“下标”,但它并非正的数组,所以也不能像数组一样,进行排序操作或者往集合里添加一个新的元素。** 

这种情况下,我们常常 会借用 Array.prototype 对象上的方法。 

比如想往 arguments 中添加一个新的元素,通常会借用 Array.prototype.push； 

想把 arguments 转成真正的数组的时候,可以借用 Array.prototype.slice 方法； 

想截取 arguments 列表中的一个元素时,可以借用 Array.prototype.shift 方法。

```js
var a={};
Array.prototype.push.call( a, 'first' );
console.log ( a.length ); // 输出: 1 
console.log(a[0]); //输出: first
//这段代码在大部分浏览器里都能顺利执行,但由于引擎的内部实现存在差异,如果在低版本的 IE浏览器 中执行,必须显式地给对象 a 设置 length属性
var a={ 
    length: 0
}; 
```

==为什么这里的对象`a`居然可以被用来`push`，不是只有数组才可以`push`吗？==

通过阅读V8引擎的源码`对于 Array.prototype.push`来说

```js
function ArrayPush() {
    var n = TO_UINT32(this.length); // 被 push 的对象的 length
    var m = % _ArgumentsLength(); // push 的参数个数
    for (var i = 0; i < m; i++) {
        this[i + n] = % _Arguments(i); // 复制元素 (1)
    }
    this.length = n + m; // 修正 length 属性的值 (2)
    return this.length;
};
```

通过这段代码可以看到，Array.prototype.push 实际上是一个属性复制的过程，把参数按照 下标依次添加到被 push 的对象上面，顺便修改了这个对象的 length 属性。至于被修改的对象是 谁，到底是数组还是类数组对象，这一点并不重要。

借用 Array.prototype.push 方法的对象还要满足以下两个条件

1. 对象本身要可以存取属性
2. 对象的 length 属性可读写

对于上面两点的解释，首先第一点对象本身要可以存取属性，如果传入的第一个参数时一个`number`类型的值，那么很显然是不行的

```js
var a = 1;
Array.prototype.push.call(a, 'first');
alert(a.length); // 输出：undefined
alert(a[0]); // 输出：undefined 
```

其次对于第二点，对象的`length`属性可读写，对于函数而言，它的`length`属性是一个**只读**属性，所以很显然也是不行的

```js
var func = function () { };
Array.prototype.push.call(func, 'first');
alert(func.length);
// 报错：cannot assign to read only property ‘length’ of function(){ }
```

## call、apply与bind

==如果调用函数没有返回值，则call与apply的返回值都为undefined，否则为调用函数的返回值；但是bind不论调用函数是否存在返回值，都会返回一个函数==

```js
function foo() {
  console.log(this);
}

/* bind返回值是一个函数（此函数中的this已经被绑定为第一个参数） */
let res = foo.bind({name: 'leo'});

console.log(res);   
// ƒ foo() {
//   console.log(this);
// }

// 调用返回的函数
res();  // {name: 'leo'}
```

### 柯里化（部分应用）

参数分两次传入

```js
function foo() {
  // Arguments(4) [11, 22, 33, 666, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  console.log(arguments);  
}

// 11,22,33 为第一次传入参数
let res = foo.bind({name: 'leo'}, 11, 22, 33);

/* 
  bind方法返回的是一个函数，
  所以可以通过返回值新建对象
*/
// 666 为第二次传入参数
let obj = new res(666);

console.log(obj);   // foo {}
```

### call,apply和bind在执行速度上的区别

call,apply,bind 都是改变上下文的，但是==call apply是立即执行的，而bind是返回一个改变上下文的函数副本==；故在call和apply在使用速度上快于bind

### uncurring

通过`uncurring`函数将`Array.prototype 的 push、shift、forEach`的使用宽泛化

```js
/* 
    通过uncurring函数将push方式宽泛化
*/
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

var push = Array.prototype.push.uncurrying();
(function () {
    push(arguments, 4);
    console.log(arguments); // 输出：[1, 2, 3, 4]
})(1, 2, 3);
```

通过将`push`宽泛化，我们可以用`push`来为`arguments (类数组)`添加内容

同样可以将`shift、forEach`宽泛化上

```js
for (let i = 0, fn, arrray = ['push', 'shift', 'forEach']; fn = arrray[i++];) {
    Array[fn] = Array.prototype[fn].uncurrying();
}

var obj = {
    "length": 3,
    "0": 1,
    "1": 2,
    "2": 3
};
Array.push(obj, 4); // 向对象中添加一个元素
console.log(obj.length); // 输出：4
var first = Array.shift(obj); // 截取第一个元素
console.log(first); // 输出：1
console.log(obj); // 输出：{0: 2, 1: 3, 2: 4, length: 3}
Array.forEach(obj, function (val, index) {
    console.log(index, val); 
    // 0 2
    // 1 3
    // 2 4
});
```

利用`uncurring`函数我们可以将原本对于Array的操作也同理转移到对象中或者类数组（本质也是对象）中，原因是因为==在`V8`引擎中使用`push`这类的方法并没有明确去区分数组或者对象，而是为容器（数组或者对象）的属性去`push（添加）内容(具体参看call与apply用途三）==
