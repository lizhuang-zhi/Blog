# JS — rest 参数与 arguments 对象的区别

```js
// rest参数
function func(name,age,...otherArr) {
  console.log(name,age);  // leo 20
  console.log(otherArr);  // ['basketball','coding','dancing']
  console.log(typeof otherArr);  // object （数组）
}

func('leo',20,'basketball','coding','dancing');


// arguments对象
function func_2(name,age) {
  console.log(name,age);  // kang 21
  console.log(arguments);  // ["kang", 21, "we will win this game!", callee: ƒ, Symbol(Symbol.iterator): ƒ]
  console.log(typeof arguments);  // object （类数组对象）

  for(let ele of arguments) {
    console.log(ele);
  }
  // kang
  // 21
  // we will win this game!
}

func_2('kang',21,'we will win this game!');
```

> 总结

1. rest参数是存放**剩余实参**，而arguments对象是包含**所有实参**
2. rest参数是一个**数组**，而arguments对象是一个类数组**对象**
