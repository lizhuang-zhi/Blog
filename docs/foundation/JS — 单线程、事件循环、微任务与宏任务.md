# 单线程

## 什么是同步与异步

> 异步

        1. 计时器（`setTimeout、setInterval`）
        2. ajax
        3. 读取文件

同步程序执行完成后，执行异步程序

## 单线程

> JS是单线程的，一个任务完成之后才能执行另一个任务

```js
for(let i = 0; i < 2000; i++) {    
  console.log(1);
}
setTimeout(() => {console.log(2);}, 0);
setTimeout(() => {console.log(3);}, 0);
setTimeout(() => {console.log(4);}, 0);
console.log(5);
```

打印结果：

<img src="/images/JS_img/image-20210730090920223.png" alt="image-20210730090920223" style="zoom:100%;" />

打印`2000`次`1`大约花费`2s`，然后打印`5`，最后打印异步代码（==这也从论证了计时器是不准的！==）

# 事件循环

## `process.nextTick`与`setImmediate`方法（需要在`node`中运行）

```js
/* 
  执行顺序：
    1. 同步
    2. nextTick
    3. 异步
    4. setImmediate（当前事件循环结束执行）
*/
setImmediate(() => {
  console.log(1)
})
process.nextTick(() =>{
  console.log(2);
})
console.log(3);
setTimeout(() => {console.log(4);}, 0);
console.log(5);
```

执行结果：

![image-20210730091912020](/images/JS_img/image-20210730091912020.png)

## ==**过程描述**==

```js
console.log(1);
setTimeout(() => {console.log(2);}, 0);
setTimeout(() => {console.log(3);}, 0);
setTimeout(() => {console.log(4);}, 1000);
console.log(5);

// 1
// 5
// 2
// 3
// 1s后：4
```

> 整个执行过程为：

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h0wslvf992j21hq0roae5.jpg)

所以执行结果为：1  5  2  3  4 

只不过这里的`4`会出来的晚一些

## 加上之前的方法进行描述

```js
setImmediate(() => {
  console.log(1)
})
process.nextTick(() =>{
  console.log(2);
})
console.log(3);
setTimeout(() => {console.log(4);}, 0);
setTimeout(() => {console.log(24);}, 1000);
console.log(5);
/* 
  执行顺序：
    1. 同步        =>  3  5
    2. nextTick          =>  2
    3. 异步        =>  4
    4. setImmediate（当前事件循环结束执行）  => 1

    这里需要注意的是： 1s后打印  =>  24

    -- 因为1s后 console.log(24) 任务才进入任务队列，从而被事件循环所监听并执行，
    -- 而 setImmediate 方法在当前事件循环结束后就会立马执行，不会等待其他还未进入
    -- 任务队列的任务
*/
```

# 宏任务与微任务

> 宏任务：计时器、ajax、读取文件
> 
> **微任务：promise.then**

> 执行顺序：
> 
>     1. 同步程序
>     2. process.nextTick(可以归为微任务🌿)
>     3. 微任务
>     4. 宏任务
>     5. setImmediate(可以归为宏任务🌿)

```js
setImmediate(() => {
  console.log(1)
})
process.nextTick(() =>{
  console.log(2);
})
new Promise((resolve) => {
  console.log(7);    // 注意：这里是同步代码
  resolve();
}).then(res => {
  console.log(8);
})
console.log(3);
setTimeout(() => {console.log(4);}, 0);
setTimeout(() => {console.log(9);}, 1000);
console.log(5);
```

执行结果为：7 3 5 2 8 4 1 9

## 面试题

```js
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    },1000)
})
const promise2 = promise1.then(() => {
    throw new Error('error!');
})

console.log('promise1', promise1);
console.log('promise2', promise2);

setTimeout(() => {
    console.log('promise1', promise1);
    console.log('promise2', promise2);
}, 2000)

// promise1 {<pending>} 
// promise2 {<pending>}
// error!
// promise1 {<fulfilled>: "success"}
// promise2 {<rejected>: Error: error!}
```

接下来的两道题一起看！

```js
let promise1 = new Promise((resolve) => {
    console.log(7);    // 注意：这里是同步代码
    setTimeout(() => {
        resolve('success');
    }, 200)
})
let promise2 = promise1.then(res => {
    throw new Error('error!');
})
console.log(3);
setTimeout(() => { console.log(4); }, 0);
setTimeout(() => { console.log(9); }, 1000);
console.log(5);

// 7
// 3
// 5
// 4
// error!
// 9
```

```js
let promise1 = new Promise((resolve) => {
    console.log(7);    // 注意：这里是同步代码
    resolve();
})
let promise2 = promise1.then(res => {
    throw new Error('error!');
})
console.log(3);
setTimeout(() => { console.log(4); }, 0);
setTimeout(() => { console.log(9); }, 1000);
console.log(5);

// 7
// 3
// 5
// error!
// 4
// 9
```
