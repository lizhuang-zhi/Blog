# JS — 集合引用类型与迭代器、生成器

## Object

创建对象的两种方式：

1. 通过new关键字 + Object构造函数

```js
  let obj = new Object();
  obj.name = 'dancer';
  obj.age = 20;
  console.log(obj);  // {name: "dancer", age: 20}
```

2. 通过对象字面量的形式（==这种方式并不会实际调用Object构造函数==）

调用对象的属性时，可以通过**点语法**与**中括号语法**来调用

```js
  let person = {
    name: 'leo',
    "age": 19,
    5: 'number type',
    ["skills"]: 'fly in the sky'
  };
  console.log(person);   // {5: "number type", name: "leo", age: 19, skills: "fly in the sky"}
  console.log(person.name);  // leo 
  console.log(person.age);  // 19

  // 点语法 与 中括号语法
  console.log(person.skills);   // fly in the sky
  console.log(person["skills"]);  // fly in the sky

  // 这里的5会自动转化为String类型
  console.log(person[5]);  // number type
  console.log(person["5"]);  // number type
```

## Array

### from()和of()

> from()用于将**类数组**结构转换为**数组**实例

* from()方法的第一个参数是传入一个可迭代对象

```js
  /* 
    因为str的原型对象中含有Symbol(Symbol.iterator)
    属性，所以str是可迭代对象
  */
  let str = new String('leo');  
  console.log(str);    // String{"leo"}
  console.log(Array.from(str));  // ["l","e","o"]
```

```js
// Map和Set都属于类数组对象(或者说可迭代对象) 
let m = new Map()
    .set('name','leo')
    .set('age',20);

  let s = new Set()
    .add('great')
    .add('amazing')
    .add('excellent');

  console.log(Array.from(m));  // [["name", "leo"],["age", 20]]
  console.log(Array.from(s));  // ["great", "amazing", "excellent"]
```

* from()还接收第二个可选的映射函数参数。这个函数可以**直接增强新数组元素中的每一个值**，而无需像调用Array.from().map()那样先创建一个中间数组。
* 还可以接收第三个可选参数，用于指定映射函数中this的值。但是**这个重写的this值在箭头函数中不适用**

> of()用于将一组参数转换为数组实例

这个方法替代了在ES6之前常用的Array.prototype.slice.call(arguments)，一种笨拙的将arguments对象转换为数组的写法

```js
  console.log(Array.of(1,2,3,4));  // [1, 2, 3, 4]
  console.log(Array.of(undefined));  // [undefined]
```

### ** 指代幂

记录一个小的知识点，**是指几次幂

```js
  let x = 3;
  x = x ** 3;
  console.log(x);   // 27
```

### 检测数组

在只有一个网页（因而只有一个全局作用域）的情况下，使用instanceof操作符足矣；但是对于网页中存在多个框架，则可能涉及不同的全局执行上下文，因此就会有两个不同版本的Array构造函数，所以我们使用Array.isArray()方法

```js
  let obj = {};
  let res_1 = Array.isArray(obj);
  // 针对存在单个全局执行上下文
  let res_2 = obj instanceof Array; 
  console.log(res_1);  // false
  console.log(res_2);  // false
```

### 迭代器方法

ES6中，==Array的原型==上暴露了3个用于检索数组内容的方法：keys()、values()、entries()；==除此之外Set与Map的原型上也暴露了这三个方法==

keys()：返回数组索引的迭代器

values()：返回数组元素的迭代器

entries()：返回索引/值对的迭代器

```js
  let arr = ['leo','sheng','kang','lei'];
  let aKeys = Array.from(arr.keys());
  let aValues = Array.from(arr.values());
  let aEntries = Array.from(arr.entries());

  console.log(aKeys);   // [0, 1, 2, 3]
  console.log(aValues);   // ["leo", "sheng", "kang", "lei"]
  console.log(aEntries);   //  [ [0, "leo"],[1, "sheng"],[2, "kang"],[3, "lei"]]
```

使用ES6解构非常容易的拆分键/值对

```js
  let arr = ['leo','sheng','kang','lei'];
  for(let [key_id,value_con] of arr.entries()) {
    console.log(key_id,value_con);
  }

  // 0 "leo"
  // 1 "sheng"
  // 2 "kang"
  // 3 "lei"
```

### 转换方法

```js
  let arr = ['leo','sheng','kang','lei'];

  console.log(typeof arr.toString());  // string
  console.log(typeof arr.valueOf());  // object
  console.log(typeof arr.toLocaleString());  // string

  console.log(arr.toString());       // leo,sheng,kang,lei
  console.log(arr.valueOf());        // ["leo", "sheng", "kang", "lei"]
  console.log(arr.toLocaleString()); // leo,sheng,kang,lei
  console.log(arr);                  // ["leo", "sheng", "kang", "lei"]
```

### 排序方法

reverse()：反转数组

sort()：排序数组

```js
  let arr = [11,23,77,34];
  console.log(arr.reverse());   // [34, 77, 23, 11]
  console.log(arr.sort((a,b)=>a-b));  // 升序 [11, 23, 34, 77]
  console.log(arr.sort((a,b)=>b-a));  // 降序 [77, 34, 23, 11] 
```

### 迭代方法

* every()
* filter()
* forEach()
* map()
* some()

> every() 与 some()

```js
  let arr = [1,2,3,4];
  // 遍历数组中每一个元素，如果都>2，则返回true，否则返回false
  let res = arr.every((value,index,array)=>{
    return value > 2;
  });
  console.log(res);   // false

  // 遍历数组中每一个元素，如果有至少一个>2，则返回true，否则返回false
  let back = arr.some((value,index,array)=>{
    return value > 2;
  });
  console.log(back);  // true
```

## Map

### 基本API

可以给Map构造函数传入一个可迭代对象

```js
  const m = new Map([
    ['key1','val_1'],
    ['key2','val_2'],
  ]);
  console.log(m.size);  // 2
```

对于基本属性与方法的使用：get()、has()、delete()、clear()

```js
  const m = new Map();
  m.set('name','leo')
    .set('age',20)
    .set('skill','front');

  console.log(m.has('name'));   // true
  console.log(m.get('age'));    // 20

  // 删除集合中元素
  m.delete('skill');

  console.log(m.size);  // 2 

  // 清除整个Map集合
  m.clear();

  console.log(m.size);  // 0
```

* ==与Object只能使用数组、字符串或符号作为键不同，Map可以使用任何JavaScript数据类型作为键==

```js
  const m = new Map();

  let boolKey = true;
  let objKey = {};
  let funcKey = function() {};

  m.set(boolKey,'bool_val')
   .set(objKey,'obj_val')
   .set(funcKey,'func_val');

  for(let key of m.keys()) {
    console.log(key);
  }
  // true
  // {}
  // f() {}

  for(let val of m.values()) {
    console.log(val);
  }
  // bool_val
  // obj_val
  // func_val
```

> 对Map集合中的同一键值key重复赋值

```js
  const m = new Map();
  m.set('name','leo')
    .set('age',20)
    .set('skill','front');

  console.log(m.size);

  m.set('name','new_leo');

  for(let val of m.values()) {
    console.log(val);
  }
  // new_leo
  // 20
  // front
```

结果：==对Map集合中的同一键值key重复赋值会覆盖之前的结果==

### Object与Map的比较

在JS中实现 "键值对" 式存储可以使用Object方便高效的完成，也就是使用对象的属性作为键，再使用属性来引用值。

作为ES6的新增特性，Map是一种新的集合类型，Map的大多数特性可以通过Object实现，但是二者还是存在一些细微的差异。

* 内存占用

在给定固定大小的内存，Map大约可以比Object多存储50%的键值对（==Map更好==）

* 插入性能

当代码涉及大量插入操作时，Map更优（==Map更好==）

* 查找速度

当代码涉及大量查找操作时，Object更优（==Object更好==）

* 删除性能

当代码涉及大量删除操作时，Map更优（==Map更好==）

## Set

Set在很多方面都像是加强的Map

### 基本API

创建对象的同时并初始化实例，可以通过给Set构造函数传入一个可迭代对象

```js
  const s = new Set(['leo','brose','jordan']);
  console.log(s.size);  // 3
```

add()：增加值

has()：查询

delete()：删除单个元素

clear()：清除整个集合元素

size：获取元素数量

```js
  const s = new Set(['leo','brose','jordan']);

  s.clear();

  console.log(s.size);  // 0

  s.add('kang')
   .add('sheng')
   .add(12);

  console.log(s.has('kang'));  // true 

  s.delete('sheng');

  console.log(s.size);  // 2

  s.add('kang');   // 此时集合中已经在这个值

  console.log(s.size);  // 2  表明Set集合不会存储添加相同的值
```

这里需要注意的是：==Set集合是不会存储重复的值==

### 顺序与迭代

Set会维护插入时顺序，因此支持按顺序迭代

```js
  const s = new Set(['leo','brose','jordan']);

  // 这里的迭代对象不论是s.values()还是s.keys(),返回结果相同
  for(let ele of s.values()) {
    console.log(ele);
  }
  // leo
  // brose
  // jordan

  for(let ent of s.entries()) {
    console.log(ent);
  }
  // ["leo", "leo"]  
  // ["brose", "brose"]
  // ["jordan", "jordan"]
```

## 迭代器方法与迭代方法

### 迭代器

==注意：不是说Array、Arguments、Set等就是迭代器，他们只是不同的数据结构，而迭代器只是一种接口，当这些数据结构实现了这个接口，他们就具有迭代的能力。==

<img src="..\JS_img\image-20201125152606923.png" alt="image-20201125152606923" style="zoom:67%;" />

<img src="..\JS_img\image-20201125153048804.png" alt="image-20201125153048804" style="zoom:67%;" />

#### 可迭代协议

可以通过**检查实例的[Symbol.iterator]属性**，来判断是否存在默认迭代器属性（**也就是判断是否实现了迭代器接口**）

```js
  let arr = new Array();
  let str = new String();
  let map = new Map();
  let set = new Set();
  // 当然还有一些NodeList等DOM集合类型

  console.log(arr[Symbol.iterator]);  // ƒ values() { [native code] }
  console.log(str[Symbol.iterator]);  // ƒ [Symbol.iterator]() { [native code] }
  console.log(map[Symbol.iterator]);  // ƒ entries() { [native code] }
  console.log(set[Symbol.iterator]);  // ƒ values() { [native code] }

  console.log(arr[Symbol.iterator]());  // 返回迭代器 Array Iterator {}
  console.log(str[Symbol.iterator]());  // 返回迭代器 StringIterator {}
  console.log(map[Symbol.iterator]());  // 返回迭代器 MapIterator {}
  console.log(set[Symbol.iterator]());  // 返回迭代器 SetIterator {}
```

> 如果对象原型链上的父类实现了Iterable接口，那这个对象也就实现了这个接口

```js
  class SonArray extends Array {}
  let son_arr = new SonArray(11,23,34);
  /* 包含[Symbol.iterator]属性 */
  console.log(son_arr[Symbol.iterator]().__proto__.__proto__);  // {Symbol(Symbol.iterator): ƒ}

  for(let ele of son_arr) {
    console.log(ele);
  }
  // 11
  // 23
  // 34
```

* ==迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可迭代对象==

#### 迭代器协议

> **为什么实现了迭代器接口就可以具有遍历的能力呢？**

**我们通过查看实例的[Symbol.iterator]()方法的返回值，可以发现返回的迭代器对象的原型对象上实现了next()才使得数据结构具有了迭代的能力（后面有通过next()自定义实现迭代器方式）**

```js
  let arr = new Array(12,23);
  let iter = arr[Symbol.iterator]();
  console.log(iter);   // Array Iterator {}

  console.log(iter.next());  // {value: 12, done: false}
  console.log(iter.next());  // {value: 23, done: false}
  console.log(iter.next());  // {value: undefined, done: true}
  console.log(iter.next());  // {value: undefined, done: true}
```

> 如果可迭代对象在迭代期间被修改，那么迭代器也会反映相应的变化

```js
  let arr = ['fly','swim'];
  let iter = arr[Symbol.iterator]();

  console.log(iter.next());  // {value: "fly", done: false}

  // 添加值
  arr.splice(1, 0, 'code');

  console.log(iter.next());  // {value: "code", done: false}
  console.log(iter.next());  // {value: "swim", done: false}
  console.log(iter.next());  // {value: undefined, done: false}
```

#### 自定义迭代器

```js
  class Counter {
    // Counter的实例应该迭代limit次
    constructor(limit) {
      this.count = 1;
      this.limit = limit;
    }

    next() {
      if(this.count <= this.limit) {
        return {done: false, value: this.count++};
      }else {
        return {done: true, value: undefined};
      }
    }

    [Symbol.iterator]() {
      return this;
    }

  }

  let counter = new Counter(3);
  for(let ele of counter) {
    console.log(ele);
  }
  // 1
  // 2
  // 3

  for(let ele of counter) {
    console.log(ele);
  }
  // print of nothing
```

这样自定义的迭代器虽然实现了Iterator接口，但是它的每个实例只能迭代一次（因为count计数器是同一个)

通过将计数器变量放到闭包中，然后通过闭包返回迭代器

```js
  class Counter {
    constructor(limit) {
      this.limit = limit;
    }

    [Symbol.iterator]() {
      let count = 1,
          limit = this.limit;
      return {
        next() {
          if(count <= limit) {
            return {done: false, value: count++};
          }else {
            return {done: true, value: undefined};
          }
        }
      }
    }

  }

  let counter = new Counter(3);
  for(let ele of counter) {
    console.log(ele);
  }
  // 1
  // 2
  // 3

  for(let ele of counter) {
    console.log(ele);
  }
  // 1
  // 2
  // 3
```

> ==当你真正的理解了迭代器的实现原理，你可以为任意的类型实现迭代效果==

* ES6实现方式

```js
  class Person {
    constructor(name,age,skill) {
      this.name = name;
      this.age = age;
      this.skill = skill;
      this.Args = arguments;
    }

    // 实现Iterator接口
    [Symbol.iterator]() {
      // 定义计数器
      let count = 0;
      // 存储所有参数
      let AllArgs = this.Args;
      /* 
        返回一个迭代器对象
          - 这个对象需要实现next()方法
      */
      return {
        next() {
          if(count < AllArgs.length) {
            return { done: false, value: AllArgs[count++] };
          }else {
            return { done: true, value: undefined };
          }
        }
      };
    }

  }

  let person = new Person('leo',20,'play code');
  console.log(person);

  let iter = person[Symbol.iterator]();
  console.log(iter.next());  // {done: false, value: "leo"} 
  console.log(iter.next());  // {done: false, value: 20}
  console.log(iter.next());  // {done: false, value: "play code"}
  console.log(iter.next());  // {done: true, value: undefined}
  console.log(iter.next());  // {done: true, value: undefined}

  for(let ele of person) {
    console.log(ele);
  }
  // leo
  // 20
  // play code
```

* ES5实现方式

```js
  function Number(num1, num2, num3) {
    this.num1 = num1;
    this.num2 = num2;
    this.num3 = num3;
    this.args = arguments;
  }

  Number.prototype[Symbol.iterator] = function() {
    // 定义计数器
    let count = 0;
    // 存储参数集合
    let Args = this.args;
    return {
      next() {
        if(count < Args.length) {
          return { done: false, value: Args[count++] };
        }else {
          return { done: true, value: undefined }; 
        }
      }
    }
  };

  let numList = new Number(11,23,34);
  console.log(numList);

  for(let ele of numList) {
    console.log(ele);
  }
  // 11
  // 23
  // 34

  for(let ele of numList) {
    console.log(ele);
  }
  // 11
  // 23
  // 34
```

#### 迭代器方法

>  keys()、values()、entries() 迭代器方法

使用者：==数组==或者==Set、Map（可以直接查看实例的原型对象上是否存在这三个方法）==

返回值：迭代器对象

### 迭代方法

> every()、some()、filter()、map()、forEach()

使用者：主要是==数组==；==Set与Map只可以使用forEach()==

#### ==forEach方法==

##### forEach的第二个参数

forEach方法可通过写入第二个参数强制绑定回调函数中的this

```js
var id = 'glo_id';

var obj = {
  id: 'obj_id'
};

[1,2,3].forEach(function(val,index) {
  console.log(val, this.id);
});
// 1 "glo_id"
// 2 "glo_id"
// 3 "glo_id"

// 传递第二个参数
[1,2,3].forEach(function(val,index) {
  console.log(val, this.id);
}, obj);  // 绑定回调函数中的this为obj对象
// 1 "obj_id"
// 2 "obj_id"
// 3 "obj_id"
```

##### 不改变原数组

> **首先，forEach方法的返回值为undefined，并且forEach不改变原数组！**

```js
function foo(arr){
  console.log(arr);  // 1,2,3,4
  // 操作数组
  arr.forEach(item => {
    item = item * 2;
  })
  console.log(arr);  // 1,2,3,4
}

foo([1,2,3,4]);
```

通过上面的代码发现，forEach没有改变原数组

```js
function foo(arr){
  console.log(arr);  // [{name: 'leo'},{name: 'leo'},{name: 'leo'},{name: 'leo'}]
  // 操作数组
  arr.forEach(item => {
    item.name = 'leo';
  })
  console.log(arr);  // [{name: 'leo'},{name: 'leo'},{name: 'leo'},{name: 'leo'}]
}

// 数组中每个对象都没有name属性
foo([{},{},{},{}]);
```

但是再运行上面的代码，发现forEach方法居然改变了原来的数组！！

解释：

==其实并不是因为forEach方法会改变原数组，而是因为此时的每一个元素值都是引用类型（对象），又因为函数的调用（这里是回调）是浅拷贝，会对堆中的对象进行操作，故此时会改变原数组中的元素==

#### Map与Set对于迭代方法的使用

通过查看Set与Map原型对象的属性可以知道，==Set与Map都只可以使用forEach()这一个迭代方法==

```js
  let s = new Set([12,23,11]);
  console.log("forEach" in s);  // true
  console.log("every" in s);  // false
  console.log("some" in s);  // false
  console.log("map" in s);  // false
  console.log("filter" in s);  // false

  let m = new Map();
  console.log("forEach" in m);  // true
  console.log("every" in m);  // false
  console.log("some" in m);  // false
  console.log("map" in m);  // false
  console.log("filter" in m);  // false
```

## 生成器

### 认识生成器

> 是ES6新增的结构，拥有在一个函数块内暂停和恢复代码执行的能力

> 语法
> 
> 生成器的形式是一个函数，函数名称前面加一个星号 ( * ) 表示它是一个生成器。**只要是可以定义函数的地方就可以定义生成器**

```js
// 生成器函数声明
function* generatorFn() {}
// 生成器函数表达式
let generatorFn = function* () {  }
// 作为对象字面量方法的生成器函数
let foo = {
  * generatorFn() {}
}
// 作为类实例方法的生成器函数
class Foo {
  * generatorFn() {}
}
// 作为类静态方法的生成器函数
class Bar {
  static * generatorFn() {}
}
```

> 生成器的调用：会返回一个**生成器对象**。生成器对象一开始处于暂停状态（suspended）。此对象实现了Iterator接口，因此具有next()方法。调用此方法会让生成器开始或者恢复执行。

```js
function* generatorFn() {
  return 'foo';
}
const g = generatorFn();
console.log(g);  // 生成器对象 generatorFn {<suspended>}
console.log(g.next);  // ƒ next() { [native code] }
console.log(g.next());  // {value: "foo", done: true}
console.log(g[Symbol.iterator]());  // 生成器对象 generatorFn {<closed>}
console.log(g[Symbol.iterator]() === g);  // true
```

### yield中断执行

#### yield

> yield可以让生成器停止和开始执行。
> 
> **生成器函数遇到yield关键字之前会正常执行。遇到这个关键字后，执行停止，函数作用域状态会被保留。停止执行的生成器函数只能通过在生成器对象上调用next()方法来恢复执行**

**通过yield关键字退出的生成器函数会处于done: false状态；通过return关键字退出的生成器函数会处于done: true状态**

```js
function* gerFn() {
  yield 1;
  yield;
  yield 2;
  return 'finish';
}
let g = gerFn();
console.log(g.next());  // {value: 1, done: false}
console.log(g.next());  // {value: undefined, done: false}
console.log(g.next());  // {value: 2, done: false}
console.log(g.next());  // {value: "finish", done: true}
console.log(g.next());  // {value: undefined, done: true}
```

#### yield实现输入与输出

```js
function* generatorFn(init) {
  console.log(init);

  console.log(yield);
  console.log(yield);
}
let g = generatorFn('初始化参数');
console.log(g);  // generatorFn {<suspended>}

/* 
  这里写g.next('第一次');也是一样的效果
*/
g.next(); // 初始化参数

g.next('传入的第二个参数');  // 传入的第二个参数
g.next('传入的第三个参数');  // 传入的第三个参数

console.log(g);  // generatorFn {<closed>}
```

> ==第一次调用next()只是为了开始执行生成器函数，故传入的是值不会被使用==

```js
function* generatorFn() {
  console.log(yield);
  console.log(yield);
}
let g = generatorFn();
console.log(g);  // generatorFn {<suspended>}
/* 
  第一次调用next()传入的值不会被使用，
  因为这一次调用是为了开始执行生成器函数
*/
g.next('第一次'); 

g.next('传入的第二个参数');  // 传入的第二个参数
g.next('传入的第三个参数');  // 传入的第三个参数
console.log(g);  // generatorFn {<closed>}
```

##### yield可以同时用于输入与输出

```js
function* gerFn() {
  return yield 'foo';
}
let g = gerFn();
console.log(g.next());  // {value: "foo", done: false}  
console.log(g.next('bar'));  // {value: "bar", done: false}  
console.log(g.next());  // {value: undefined, done: true}
```

### 提前终止生成器

1. return()方法：强制生成器进入关闭状态。提供给return()方法的值就是终止迭代器对象的值

```js
function* generatorFn() {
  for(let x of [1,2,3]) {
    yield x;
  }
}
let g = generatorFn();
console.log(g);  // generatorFn {<suspended>}
console.log(g.next());  // {value: 1, done: false}

console.log(g.return(4));  // {value: 4, done: true}

/* 
  此时生成器已进入关闭状态，无法恢复
*/
console.log(g);  // generatorFn {<closed>}
console.log(g.next());  // {value: undefined, done: true}
```

2. throw()方法

> 错误未处理

```js
function* generatorFn() {
  for(let x of [1,2,3]) {
    yield x;
  }
}
let g = generatorFn();
console.log(g);  // generatorFn {<suspended>}
try {
  g.throw('foo');
} catch (error) {
  console.log(error);  // foo
}
/* 
  由于错误未处理，生成器关闭
*/
console.log(g);  // generatorFn {<closed>}
```

> 生成器函数内部处理错误

```js
function* generatorFn() {
  for(let x of [1,2,3]) {
    try {
      yield x;
    } catch (error) {}
  }
}
let g = generatorFn();
console.log(g);  // generatorFn {<suspended>}
console.log(g.next());  // {value: 1, done: false}

/* 
  函数内部处理错误，错误处理跳过对应的yield（这里是2）
*/
g.throw('foo');

console.log(g);  // generatorFn {<suspended>}
console.log(g.next());  // {value: 3, done: false}
```

> 注意：如果生成器对象还没有开始执行，那么调用throw()抛出的错误不会在函数内部被捕获，因为这是相当于在函数外部抛出了错误

```js
function* generatorFn() {
  for(let x of [1,2,3]) {
    try {
      yield x;
    } catch (error) {}
  }
}
let g = generatorFn();
g.throw('foo');  // 报错 Uncaught foo
console.log(g);  
console.log(g.next());  
```
