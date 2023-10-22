# JS — 类数组转数组方法总结

类数组对象

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  // 这里的length属性必须加上
  length: 3
};
```

> 方法总结

1. apply() + rest参数  => (**这应该是下面两个方法的原理**)

首先我们要知道**apply方法的第二个参数是可以传入数组或者类数组的**

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

function func(...args) {
  return args;
}

console.log(func.apply(null, obj));  // ["123", "456", "789"]
```

2. Array.apply()  => (借用 arguments)

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

console.log(Array.apply(null,obj));  // ["123", "456", "789"]
```

3. Array.prototype.concat.apply()  => (借用 arguments)

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

console.log(Array.prototype.concat.apply([],obj));  // ["123", "456", "789"]
```

4. Array.prototype.slice.call()

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

console.log(Array.prototype.slice.call(obj));  // ["123", "456", "789"]
```

5. Array.prototype.splice.call()

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

console.log(Array.prototype.splice.call(obj,0));  // ["123", "456", "789"]
```

6. Array.from()

此方法的参数可以传入一个**实现Iterable的数据结构或者<mark>类数组对象</mark>**

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

console.log(Array.from(obj));  // ["123", "456", "789"]
```

7. Array.prototype.map.call()

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

console.log(Array.prototype.map.call(obj, x => x));  // ["123", "456", "789"]
```

8. Array.prototype.filter.call()

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

console.log(Array.prototype.filter.call(obj, x => 1));  // ["123", "456", "789"]
```

> ==关于扩展运算符将类数组转数组问题==

可能很多小伙伴在开始学习时，接触到一些类数组对象可以通过扩展运算符(...)转化为数组，但是忽略了一点就是，这个==<mark>类数组对象必须是实现了Iterable接口才可以通过扩展运算符实现转化</mark>==

```js
let obj = {
  0: '123',
  1: '456',
  2: '789',
  length: 3
};

let arr = [...obj];
console.log(arr);  // Uncaught TypeError: obj is not iterable
```
