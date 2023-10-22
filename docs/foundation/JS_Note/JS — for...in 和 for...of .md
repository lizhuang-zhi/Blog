# 区别

for...in : 遍历的是对象的属性**名**（key）

for...of : 遍历的是可迭代对象的属性**值**（value）

# for...in

```js
let obj = {
  a: 'aaa',
  b: 'bbb'
}

Object.prototype.c = 'ccc'
Object.prototype.d = 'ddd'

for(let key in obj) {
  console.log(key);
}
// a
// b
// c
// d
```

通过代码我们发现，for...in会遍历**原型链**上的对象属性名，但是需要注意的是：==**`Object.prototype`本身（原生）就具有的属性不会被遍历出来（例如`hasOwnProperty`、`constructor`、`isPrototypeOf`等）**==

==for...in 是无序遍历!!==

# for...of

```js
let arr = ['l', 'e', 'o'];

Array.prototype[0] = 'mr'
Array.prototype[1] = 'kleo'

for(let val of arr) {
  console.log(val);
}
// l
// e
// o
```

通过代码我们发现，for...in**不会遍历原型链**上的属性值