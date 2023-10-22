# 基础

filter、map、reduce三个高阶函数，实现下面的需求就叫做函数式编程

```js
  /* 
    需求：将数组[11,23,30,77]中大于23的值乘以2相加求和
  */
  let arr = [11,23,30,77];
  let sum = arr.filter((value,index,array)=>{
    return value > 23;
  }).map((value,index,array)=>{
    return value * 2;
  }).reduce((preValue,curValue,currIndex,array)=>{
    // preValue是计算结束后的返回值
    return preValue + curValue;
  },0);

  console.log(sum);  // 214
```

# 高阶函数实现AOP

```js
Function.prototype.before = function (beforefn) {
    var __self = this;
    return function () {
        beforefn.apply(this, arguments);
        return __self.apply(this, arguments);
    }
}

Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}

var func = function() {
    console.log(2);
}

func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
})

func();
// 1
// 2
// 3
```
