# 根据代码看输出（系列）

```js
var name = 1;
(function () {
    console.log(name + this.name); // browser: -> 'undefined1'; Node.js: -> NaN
    var name = '2';
    console.log(name + this.name); // browser: -> '21'; Node.js: -> '2undefined'
})();
```

```js
var name = 'name';
var A = {
    name: 'A',
    sayHello: function () {
        let s = () => console.log(this.name);  // A
                                               // A

        // let s = function() {
        //     console.log(this.name);   
        //     // 结果
        //     // name
        //     // B
        // }
        return s;
    }
};
let sayHello = A.sayHello();
sayHello();  
var B = {
    name: 'B'
};
sayHello.call(B);
```

```js
console.log(typeof typeof typeof null)  // string
```

```js
// 手写一个repeact()函数，加上下面的代码运行，
// 使每3秒打印一个helloword，总共执行4次
function repeact(fn, count, delay) {
    return function () {
        let arg = Array.prototype.pop.call(arguments);
        // 方法一：
        // (function foo() {
        //     let timer = setTimeout(() => {
        //         if(count) {
        //             fn(arg);
        //             count--;
        //             clearTimeout(timer);
        //             foo();
        //         }
        //     }, delay || 1000)
        // })();

        // 方法二：
        // let timer = setInterval(() => {
        //     if(count) {
        //         fn(arg);
        //         count--;
        //     }
        //     if(count == 0) {
        //         clearInterval(timer);
        //     }
        // }, delay || 1000);

        // 方法三
        // for(let i = 0; i < count; i++) {
        //     let timer = setTimeout(() => {
        //         fn(arg);
        //         clearTimeout(timer);
        //     }, delay * (i + 1));
        // }
    }
}
const repeatFunc = repeact(console.log, 4, 3000);
repeatFunc('helloword');
```

```js
var a = 10;
(function(){
    console.log(a);   // undefined（因为下面的 var a = 20 的 a 会被变量提升）
    a = 5;   // 因为局部作用域中存在 var a 的声明，所以这里的赋值是赋给局部变量的
    console.log(window.a);  // 10
    var a = 20;  // 执行到这时，其实是在给局部变量 a 赋值 => a = 20
    console.log(a);  // 20
})()
```

```js
setTimeout(function () {
    console.log(1);
}, 0)
new Promise(function execulor(resolve) {
    console.log(2)
    for (var i = 0; i < 10000; i += 1) {
        // console.log(i);
        i == 9999 && resolve()
    }
    console.log(3)
}).then(function () {
    console.log(4)
})
console.log(5)

// 2 3 5 4 1
```

```js
// 请问输出是什么?(有点意思)
function getPersonInfo(one, two, three) {
    console.log(one)
    console.log(two)
    console.log(three)
}
const person = 'Lydia'
const age = 21
getPersonInfo `${person} is ${age} years old`

// 答案: https://es6.ruanyifeng.com/#docs/string#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF
```

