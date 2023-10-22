# 基本引用类型

## Date

> 使用 Date构造函数 与 Date.parse()

```js
let time_stamp = Date.parse('2021-2-5');
let time = new Date(1612454400000);
let time_2 = new Date('2021-1-5');

console.log(time_stamp);  // 1612454400000
console.log(time);  // Fri Feb 05 2021 00:00:00 GMT+0800 (中国标准时间)
console.log(time_2);  // Tue Jan 05 2021 00:00:00 GMT+0800 (中国标准时间)
```

> 通过 Date.now() 方法分析代码执行时长

```js
let start = Date.now();
function func() {
  let n = 0
  while(n++ < 220) {
    console.log('执行函数-1');
  }
}
func();
let end = Date.now();
console.log(end - start);  // 9(ms)
```

### 日期格式化方法

```js
let time = new Date('2020-2-2');

console.log(time.toString());  // Sun Feb 02 2020 00:00:00 GMT+0800 (中国标准时间)
console.log(time.toLocaleString());  // 2020/2/2上午12:00:00
console.log(time.toUTCString());  // Sat, 01 Feb 2020 16:00:00 GMT

console.log(time.toTimeString());  // 00:00:00 GMT+0800 (中国标准时间)
console.log(time.toDateString());  // Sun Feb 02 2020

console.log(time.toLocaleTimeString());  // 上午12:00:00
console.log(time.toLocaleDateString());  // 2020/2/2
```

### 日期时间组件方法

具体内容可查阅《JS高级程序设计》的第107页

## 原始值包装类型

### 封装对象

> 封装对象与原始值的区别

```js
/* 
 封装对象与原始值的区别
*/
let s_obj = new String('String Obj');
let str = 'just String';

console.log(s_obj);     // String {"String Obj"}
console.log(str);    // just String

console.log(typeof s_obj);     // object
console.log(typeof str);   // string

/* 
  js引擎会自动将基本类型包装为一个封装对象
*/
console.log(str.length);  // 11
console.log(str.toUpperCase());  // JUST STRING
```

> 认识封装对象流程

通过一段代码

```js
let str = 'Mr.KLeo';
let str_2 = str.toString();
console.log(str_2);  // Mr.KLeo
```

这里的变量str是一个原始值，理论上是不能够调用方法的。但是这个例子又可以按照预期运行。这是因为后台做了很多处理来实现这个操作；具体来说第二行访问str的时候是通过读的模式来访问的，具体步骤：

1. 创建一个String类型的实例
2. 调用实例上的方法
3. 销毁实例

通过代码来演示上面的步骤就是

```js
let str = new String('Mr.KLeo');
let str_2 = str.toString();
str = null;
```

**在第二行代码运行时（第一段代码），会临时创建一个String对象，然后到第三行代码运行时，这个对象就已经被销毁！**

### 构造函数与转型函数

```js
let str = 'str';
let pack_str = new String(str);  // 构造函数
let func_str = String(str);  // 转型函数

console.log(str);  // str
console.log(typeof str);  // string

console.log(pack_str);  // String {"str"} 
console.log(typeof pack_str);  // object

console.log(func_str);  // str
console.log(typeof func_str);  // string
```

通过==转型函数==获得的是一个==原始值==，而通过 ==new 构造函数==获得的是一个==实例对象==

### Array

```js
let arr = new Array(3);
console.log(arr);  // [empty × 3]
console.log(arr[0]);  // undefined
console.log(arr[1]);  // undefined
console.log(arr[2]);  // undefined
```

当使用`new Array()`只传入一个参数时，生成长度为此参数的一个空数组

```js
var a = new Array(3);
var b = [undefined,undefined,undefined];
var c = [];
c.length = 3;

console.log(a);  // [empty × 3]
console.log(b);  // [undefined, undefined, undefined]
console.log(c);  // [empty × 3]

console.log(a.join('-'));  // --
console.log(b.join('-'));  // --

let res_a = a.map((val,index) => {
  return index;
})
let res_b = b.map((val,index) => {
  return index;
})

console.log(res_a);  // [empty × 3]
console.log(res_b);  // [0, 1, 2]
```

### Boolean

```js
let boolean = new Boolean(false);  // 构造函数
let boolean_2 = Boolean(false);  // 转型函数
let boolean_3 = false;  // 原始值

console.log(boolean);  // Boolean {false}
console.log(boolean_2);  // false
console.log(boolean_3);  // false

console.log(typeof boolean);  // Object
console.log(typeof boolean_2);  // boolean
console.log(typeof boolean_3);  // boolean
```

**建议永远不要使用Boolean对象**

```js
let booleanObject = new Boolean(false);
let res = booleanObject && true;
/* 
  因为所有对象在布尔表达式中都会自动转化为true
*/
console.log(res);  // true
```

### Symbol

```js
let symbol = Symbol('SymbolValue');
let obj = {
  [symbol]: 'val'
};

console.log(obj);   // {Symbol(SymbolValue): "val"}
console.log(symbol);   // Symbol(SymbolValue)
console.log(symbol.toString());   // Symbol(SymbolValue)
console.log(typeof symbol);   // symbol
```
