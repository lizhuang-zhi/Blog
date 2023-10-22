# 闭包

## 闭包是什么

阮一峰大神定义： 

> 闭包就是能够读取其他函数内部变量的函数。
> 
> 由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。
> 
> 所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

或者

> 闭包是指有权访问另外一个函数作用域中的变量的函数

## 闭包的产生时间

例：

```js
function fn1() {
    var a = 2;
    var b='abc';
    function fn2() {    //执行函数定义就会产生闭包（不用调用内部函数）
        console.log(a);
    }
    fn2();
}
fn1();
```

使用Chrome检索：

![image-20210311142812846](/images/JS_img/image-20210311142812846.png)

对56行检索检索，可以发现，在fn2这个对象中，此时就已经产生了闭包

![image-20210311110348469](/images/JS_img/image-20210311110348469.png)

对59行进行检索，可以发现在函数fn2()中，a有了值

## 如何产生闭包

> 例子：

1.将嵌套函数作为函数返回值

```js
function fn1() {
      // 此时闭包就已经产生了
      var a = 2;
      function fn2() {
          a++;
          console.log(a)
      }
      return fn2;
}
var f = fn1();
f(); // 3
f(); // 4
f = null// 闭包死亡
```

2.将嵌套函数作为实参传递给外层函数调用

```js
function foo() {
  var a = 2;
  function bar() {
    // 执行RHS查询
    console.log(a);  // 2
  }
  fbi(bar);
}

function fbi(fn) {
  fn();   // 这就是闭包
}

foo();
```

## 使用回调函数，就是使用闭包

```js
function wait() {
  setTimeout(function timer() {
    console.log('我是涵盖wait函数作用域的闭包');
  }, 1000);
}

wait();
```

这里的setTimeout其实是window的方法，故声明在全局作用域，它（setTimeout方法）会在==函数内部去调用传入的第一个参数（timer函数）的引用==，所以这也是一个闭包！不要不认识他哦（可以同如何产生闭包的第二种情况做类比）

## 使用闭包的例子

### 求和

```js
var mult = function () {
    var a = 1;
    for (let i = 0, len = arguments.length; i < len; i++) {
        a = a * arguments[i];
    }
    return a;
}

let res = mult(2, 3, 4);
console.log(res);  // 24
```

在执行相同的一段数值时，重复的计算会导致效率降低，这里我们引入缓存机制

```js
var cache = {};
var mult = function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
        return cache[args];
    }
    var a = 1;
    for (let i = 0, len = arguments.length; i < len; i++) {
        console.log('do');
        a = a * arguments[i];
    }
    return cache[args] = a;
}

let res = mult(1,2,3);
let res2 = mult(1,2,3);
console.log(res);
console.log(res2);
// do
// do
// do
// 6
// 6
```

最后，通过闭包可以封装全局变量，并封装重复的代码部分

```js
var mult = function() {
    var cache = {};
    function calculate() {
        var a = 1;
        for(let i = 0, len = arguments.length; i < len; i++) {
            a = a * arguments[i]; 
        }
        return a;
    }
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if(args in cache) {
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    }
}

let fn = mult();
let res = fn(2, 5, 3);
console.log(res);  // 30
```

### 判断数据类型

```js
var Type = {};
for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    Type['is' + type] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';   // 这里的type是undefined
    }
};
let r1 = Type.isArray([]);
let r2 = Type.isString("str");
console.log(r1);  // false
console.log(r2);  // false
```

在没有闭包时，由于函数的调用是在for循环之后的，所以当我们调用函数isXXX时，此时的type变量没有被保存下来，所以是undefined

```js
/* 判断数据类型 */
var Type = {};
for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function (type) {
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    })(type)
};
let r1 = Type.isArray([]); 
let r2 = Type.isString("str"); 
console.log(r1);  // true
console.log(r2);  // true
```

通过闭包保存变量`type`的值

## 闭包的作用

- 延长了局部变量的生命周期

- 让函数外部可以操作（读写）到函数内部的数据（变量/函数）



- 问题：
  
  - 函数执行完后，函数内部声明的局部变量是否还存在？
    - 一般不存在，但存在于闭包中的变量才可能存在
  - 在函数外部能够直接访问函数内部的局部变量吗？
    - 不能，但可以通过闭包让外部操作它

- 产生：在嵌套内部函数定义执行完成时就产生了（不是调用）

- 死亡：在嵌套的内部函数成为垃圾对象时

## 闭包的应用

1. 模块化
   
   ```js
   (function () {
       var a = 10;
       var b = 20;
   
       function add(num1, num2) {
           var num1 = !!num1 ? num1 : a;
           var num2 = !!num2 ? num2 : b;
   
           return num1 + num2;
       }
   
       window.add = add;
   })();
   
   add(10, 20);
   ```

2. 柯里化
   
   ```js
   /* 
       柯里化
   */
   function foo(x, y, z) {
       return x + y + z;
   }
   
   function curry(x) {
       return function(y, z) {
           return x + y + z;
       }
   }
   ```
