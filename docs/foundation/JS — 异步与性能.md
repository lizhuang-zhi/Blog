# 异步控制台

```js
var a = {
  index: 1
}

console.log(a); 

a.index++;
```

<img src="..\JS_img\image-20210625144621851.png" alt="image-20210625144621851" style="zoom:80%;" />

对于这段简单的代码会看到一个意外的结果，这可能是**`I/O`的异步化**造成的。代码运行时，浏览器可能会认为需要把控制延迟到后台，在这种情况下，等到浏览器控制台输出对象内容时，`a.index++`可能已经执行，因此会显示`{ index:2 }`

> 优化方案

```js
var a = {
  index: 1
}

console.log(JSON.stringify(a));   // {"index":1}

a.index++;

console.log(JSON.stringify(a));   // {"index":2}
```

# 并发与并行

> 并发

就是针对与**单核CPU**，我们往往需要在建立的**多任务之间来回切换**（但是切换的速度很快，用户无法察觉），实现视觉上的 “同时” 进行

<img src="..\JS_img\image-20210625154800094.png" alt="image-20210625154800094" style="zoom:77%;" />

> 并行

对于**多核CPU**，每个**独立**的CPU执行各自的进程，**两个进程互不抢占CPU资源**，可以同时进行

<img src="..\JS_img\image-20210625154836956.png" alt="image-20210625154836956" style="zoom:77%;" />

# 链式流

Promise的强大：我们构建一个序列，不管我们想要多少个异步步骤，每一步都能够根据需要等待下一步（==或者不等！==）

```js
function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  })
}

delay(500)
  .then(() => {
    console.log("step 2 (after 500ms)");
    return delay(1000);
  })
  .then(() => {
    console.log("step 3 (after 1000ms)");
    // 这里没有等待
  })
  .then(() => {
    console.log("step 4 (next Job)");
    return delay(1500);
  })
  .then(() => {
    console.log("step 5 (after 1500ms)");
  })
```

执行查看效果！

# Promise模式

## `Promise.all([..])`

```js
function promise_1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise_1');
    },2000)
  })
}

function promise_2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise_2'); 
    },1500)
  })
}

function test() {
  let res = Promise.all([promise_1(), promise_2()]);
  res.then(res => {
    console.log(res);  // 2秒后：["promise_1", "promise_2"]
  }).catch(err => {
    console.log(err);
  })
}

test();
```

如果将函数`promise_2()`中的`resolve`换为`reject`，结果如下

```js
function promise_1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise_1');
    },2000)
  })
}

function promise_2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 这里换为 reject
      reject('promise_2'); 
    },1500)
  })
}

function test() {
  let res = Promise.all([promise_1(), promise_2()]);
  res.then(res => {
    console.log(res);  
  }).catch(err => {
    console.log(err);   // 1.5秒后：promise_2
  })
}

test();
```

**如果这些`promise`中有任何一个被拒绝的话，主`Promise.all({..})promise`就会立即被拒绝，并丢弃来自其他所有`promise`的全部结果！**

## `Promise.race([..])`

```js
function promise_1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise_1');
    },2000)
  })
}

function promise_2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise_2'); 
    },1500)
  })
}

function test() {
  let res = Promise.race([promise_1(), promise_2()]);
  res.then(res => {
    console.log(res);   // 1.5秒后：promise_2
  }).catch(err => {
    console.log(err);   
  })
}

test();
```

> 注意：如果传给`Promise.race()`的参数为一个空数组，那么主`race([..])`Promise**永远不会决议**，而不是立即决议！

## 两者区别

对于`Promise.all([..])`来说，只有传入的所有`promise`都完成，返回`promise`才能完成。如果有任何`promise`被拒绝，返回的主`promise`就立即会被拒绝（并丢弃来自其他所有`promise`的全部结果）。

对于`Promise.race([..])`来说，只有第一个决议的`promise`（完成或拒绝）取胜，其决议结果成为返回`promise`的决议。

> 如果传给`Promise.all()`的参数为一个空数组，那么主`all([..])`Promise**立即决议**；如果传给`Promise.race()`的参数为一个空数组，那么主`race([..])`Promise**永远不会决议**

# Promise API

## new Promise构造器

```js
function promise_2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise_2'); 
    },3000)
  })
}

function promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 这里的 resolve 回调参数是一个 `完成promise`
      resolve(promise_2());
    },3000)
  })
}

promise().then(res => {
  console.log(res);   // 6秒后：promise_2
}).catch(err => {
  console.log(err);
})
```

```js
function promise_2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('promise_2'); 
    },3000)
  })
}

function promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // // 这里的 resolve 回调参数是一个 `拒绝promise`
      resolve(promise_2());
    },3000)
  })
}

promise().then(res => {
  console.log(res);   
}).catch(err => {
  console.log(err);   // 6秒后：promise_2
})
```

> 所以`reject(..)`就是拒绝这个`promise`；但`resolve(..)`既可能完成`promise`，也可能拒绝，要根据传入参数而定。如果传给`resolve(..)`的是一个非`Promise`，非`thenable`的立即值，这个`promise`就会用这个值完成
> 
> 但是，**如果传给`resolve(..)`的是一个真正的`Promise`或`thenable`值，这个值就会被递归展开，并且（要构造的）`promise`将取用其最终决议值或状态**

## `then(..)`和`catch(..)`

```js
p.then( fulfilled );
p.then( fulfilled, rejected );
p.catch( rejected );  // 等价于 p.then( null, rejected );
```

# ==Promise原理==

## 基础实现
