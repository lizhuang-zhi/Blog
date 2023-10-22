# 期约与异步函数

## 异步编程

```js
  function double(value,success,failure) {
    setTimeout(()=>{
      try {
        if(typeof value !== 'number') {
          throw 'Must provide a number as first agrument';
        }    
        success(value * 2);
      } catch (error) {
        failure(error)
      }

    },1000)

  }

  const successCallFunc = (x) => console.log(`Success: ${x}`);
  const failureCallFunc = (e) => console.log(`Failure: ${e}`);

  double(3,successCallFunc,failureCallFunc);
  // Success: 6
  double('a',successCallFunc,failureCallFunc);
  // Failure: Must provide a number as first agrument
```

如果异步返值又依赖一个异步返回值，那么情况会更加复杂，在实际代码中要求嵌套回调

```js
  function double(value,success,failure) {
    setTimeout(()=>{
      try {
        if(typeof value !== 'number') {
          throw 'Must provide a number as first agrument';
        }    
        success(value * 2);
      } catch (error) {
        failure(error)
      }

    },1000)

  }

  const successCallFunc = (x) => {
    double(x,y => console.log(`Success: ${y}`));
  };
  const failureCallFunc = (e) => console.log(`Failure: ${e}`);

  double(3,successCallFunc,failureCallFunc);    
  // Success: 12
```

## Promise对象

### 介绍

是异步编程的一种解决方案，比传统方式更好！

> Promise对象有三种状态

1. pending【待定】初始状态（存在时间很短）
2. fulfilled【实现】操作成功
3. rejected【操作】操作失败

### 实现

当promise状态发生改变，就会触发then()里的响应函数处理后续步骤

> 状态改变情况

* 从pending变为fulfilled
* 从pending变为rejected

#### 基本实现

```js
var pro = new Promise(function(resolve,reject){
        setTimeout(()=>{
            let str = 'good';
            console.log(str);
            // resolve(str);    // fulfilled状态
            reject(str);    // rejected状态
        },1000);
    });
    console.log(pro);   /* 
                            Promise {<pending>}
                            __proto__: Promise
                            [[PromiseState]]: "rejected"
                            [[PromiseResult]]: "good" 
                         */

    /* 
        then方法参数：
            1. fulfilled时，执行第一个回调函数
            2. rejected时，执行第二个回调函数
     */
    pro.then(value=>{
        console.log(value);
        console.log(pro);
    },reason=>{
        console.log(reason);
        console.log(pro);   /* 
                                Promise {<rejected>: "good"}
                                __proto__: Promise
                                [[PromiseState]]: "rejected"
                                [[PromiseResult]]: "good"
                            */
    });
```

#### then方法的回调函数的返回值

1. 非 promise 类型的属性
2. ==是 promise 对象==（链式回调）
3. 抛出错误

```js
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('成功了！');
    },1000)
})

const res = p.then(value => {
    console.log(value);
    
    // 1. 非 promise 类型的属性
    // return 123;

    // 2. 是 promise 对象
    return new Promise((resolve,reject)=>{
        resolve('ok');
    });

    // 3. 抛出错误
    // throw '出错了';
}, reason => {
    console.log(reason);
})

console.log(res);
// 链式回调
// res.then(value => {

// }).then(value => {

// })
```

## Promise实现同步请求两段数据

```js
function firstAjax() {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve('我是第一段数据')
        },3000)
    })
}

function secondAjax() {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve('我是第二段数据')
            console.log('第二段数据请求回来了！！');
        },3000)
    })
}


firstAjax().then(res => {
    console.log(res);  // 第一段数据

    /* 
        下面两段代码有本质区别
        1. 直接返回给我一个Promise对象
        2. 将secondAjax方法返回给我的对象再次返回
            第二种代码是等同于第三种代码的

        所以第二种与第三种代码才实现了同步请求两段数据（第二种和第三种一样的）
    */
    // 第一种
    // secondAjax();
    // 第二种
    return secondAjax();
     
    // 第三种
    // return new Promise((resolve,reject) => {
    //     setTimeout(() => {
    //         resolve('第二段数据');
    //         console.log('第二段数据请求回来了！！');
    //     },3000);
    // })

}).then(res => {
    console.log(res);  // 第二段数据

    console.log('其他操作');
})
```

