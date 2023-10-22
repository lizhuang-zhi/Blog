# JS — 对象、类与面向对象编程

## 对象

### 理解对象

> 定义：==对象是一组无序属性的集合。==对象的每个属性或者方法都通过一个名称来标识，这个名称会映射到一个值
> 
> 也可以将对象理解成一张散列表，其中的内容就是一组名/值对，值可以是数据或者函数

#### 属性的类型(Object.defineProperty)

属性分两种：数据属性与访问器属性

> 数据属性

数据属性有以下四个特性描述它们的行为

1. [[Configurable]]：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。直接在对象上定义的属性，它们的这个特性默认值为true

2. [[Enumerable]]：表示能否通过for-in循环返回属性，直接在对象上定义的属性，它们的这个特性默认值为true

3. [[Writable]]：表示能否修改属性的值，直接在对象上定义的属性，它们的这个特性默认值为true

4. [[Value]]：包含这个属性的数据值。读取属性值的时候，从这个位置读取，写入值得时候，把新值保存在这个位置。这个特性得默认值为undefined

具体使用：

```javascript
let obj = {
    name: 'leo'
};
Object.defineProperty(obj,'name',{
    writable: false,
    value: '我是默认值，不可修改'
});
obj.name = 'new leo';  // 修改属性name
console.log(obj.name);  // 我是默认值，不可修改
```

==注意：==

当一个属性被定义为不可配置之后，就不能再变回可配置了。再次调用Object.defineProperty( ) 并修改非 writable 的属性会报错

```js
let obj = {
    name: 'leo'
};
Object.defineProperty(obj,'name',{
    configurable: false,
    value: 'default value'
});
console.log(obj);
// 再次调用 报错: Uncaught TypeError
Object.defineProperty(obj,'name',{
    configurable: true,
    value: 'default value'
})
```

> 访问器属性

1. [[Configurable]]：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。直接在对象上定义的属性，这个特性的默认值为true

2. [[Enumerable]]：表示能否通过for-in循环返回属性。直接在对象上定义的属性，这个特性的默认值为true

3. [[Get]]：在读取属性时调用的函数。默认值为undefined

4. [[Set]]：在写入属性时调用的函数。默认值为undefined

```javascript
let obj = {
    // 伪私有成员year_
    year_: 2017,
    edition: 1
};
// year 为访问器属性
Object.defineProperty(obj,'year',{
    get() {
        return this.year_;
    },
    set(newValue) {
        if(newValue > 2017){
            this.year_ = newValue;
            this.edition += newValue - 2017;
        }
    }
});
// 设置访问器属性
obj.year = 2019;
console.log(obj.year_);  // 2019
console.log(obj.edition);  // 3
```

#### 合并对象(Object.assign)

通过 Object.assign(目标对象, 源对象<可以是多个>) 合并对象

* 覆盖属性
* 对象引用

```js
let dest, src, res;
dest = {
    id: 'dest'
};

src = {
    id: 'src2',
    b: 'bar'
};

res = Object.assign(dest, {
    id: 'src1',
    a: 'foo'
}, src);

// 覆盖属性
console.log(res);  // { a: "foo", b: "bar", id: "src2"}
// 返回目标对象
console.log(res === dest);   // true
// 复制对象的引用
console.log(dest.b === src.b);   // true
```

* 不能在两个对象间转移获取函数与设置函数

```javascript
let dest, src;
dest = {
    set a(val) {
        console.log(`Invoke dest setter with param ${val}`);
    }
}
src = {
    get a() {
        console.log('Invoke src getter');
        return 'foo';
    }
}
Object.assign(dest,src);
console.log(dest); // {set a(val) {...}}
```

#### 相等判断(Object.is)

```js
console.log(Object.is(1, true));  // false
console.log(Object.is({}, {}));   // false
console.log(Object.is(2, '2'));   // false

console.log(Object.is(-0, +0));   // false
console.log(Object.is(0, +0));    // true
console.log(Object.is(0, -0));    // false

console.log(Object.is(NaN, NaN)); // true
```

#### 增强的对象语法

1. 属性值的简写
2. 可计算属性

```js
let nameKey = 'name';
let ageKey = 'age';
let sayNameKey = 'sayName';

let uniToken = 0;
function getKey(key) {
    return `${key}_${++uniToken}`;
}

let person = {
    [getKey(nameKey)]: 'leo',
    [ageKey]: 19,
    [sayNameKey]() {
        // 正确打印
        // console.log(this['name_1']);
        /* 
        此时getKey(nameKey)的返回值为name_2,
        所以相当于调用的是person对象的name_2属性
      */
        console.log(this[getKey(nameKey)]);  
    }
}

person[sayNameKey]();  // undefined
console.log(person[ageKey]);  // 19
console.log(person['name_1']);  // leo
```

3. 方法名简写

### 创建对象

#### Object.create(null)

```js
let empty_obj = {};
let better_empty_obj = Object.create(null);

console.log(empty_obj);   // {}  有__proto__属性
console.log(better_empty_obj);   // {}  无__proto__属性
```

通过 `Object.create(null)` 创建的对象没有 `Object.prototype` 这个委托，所以比 `{}` 更空

##### 创建关联，制造委托（对象与对象之间）

`Object.create()`是一个大英雄，并不只是用来让我们生成一个更空的对象（哈哈）

```js
let foo = {
  tell() {
    console.log('tell me something');
  }
};

let bar = Object.create(foo);

bar.tell();  // tell me something
```

创建一个空对象`bar`，并将这个对象的`[[Prototype]]`属性关联到`foo`对象，这样做和通过`new`一个构造函数都可以创建一个新对象，并使其`[[Prototype]]`属性关联到另一个对象，但是通过`Object.create()`的方式不会让新对象存在`.constructor`这样的引用（具体参看：[关于constructor属性](#constructor)）

> 更多参数

```js
let foo = {
  a: 'aaa'
};

let bar = Object.create(foo, {
  b: {
    enumerable: false,
    writable: true,
    configurable: true,
    value: 'bbb'
  },
  c: {
    enumerable: true,
    writable: false,
    configurable: true,
    value: 'bbb'
  }
});

bar.hasOwnProperty('a')  // false
bar.hasOwnProperty('b')  // true
bar.hasOwnProperty('c')  // true

bar.a // aaa  
bar.b // bbb
bar.c // ccc
```

`Object.create()`的第二个参数可以为新对象增加新的属性（并可以通过属性描述符配置）

##### “类”与“委托”的对比

这里的类并不是说JS中有类的概念，只是模拟出这个感觉

第一段“类”代码

```js
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am " + this.me;
}

function Bar(who) {
  Foo.call(this, who);
}
// 创建委托关系
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function() {
  console.log('Hello, ' + this.identify());
}

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();  // Hello, I am b1
b2.speak();  // Hello, I am b2

console.log(b1.constructor);
console.log(b2.constructor);  
// ƒ Foo(who) {
//   this.me = who;
// }

console.log(Bar.prototype.constructor === b1.constructor);  // true
```

<img src="..\JS_img\image-20210622150857613.png" alt="image-20210622150857613" style="zoom:67%;" />

第二段“委托”代码

```js
let Foo = {
  init: function(who) {
    this.me = who;
  },
  identify: function () { 
    return "I am " + this.me;
  }
};

let Bar = Object.create(Foo);
Bar.speak = function() {
  console.log("Hello, " + this.identify());
}

var b1 = Object.create(Bar);
var b2 = Object.create(Bar);
b1.init('b1');
b2.init('b2');

b1.speak();  // Hello, I am b1
b2.speak();  // Hello, I am b2
```

<img src="..\JS_img\image-20210622150946646.png" alt="image-20210622150946646" style="zoom:67%;" />

通过比较我们可以清晰的看出关联风格（“委托”）更加的简洁，因为代码只关注一件事，对象之间的关联

#### 工厂模式

```js
// 工厂模式
function createPerson(name,age) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.sayName = function() {
        console.log(this.name);
    }
    return o;
}

let person1 = createPerson('leo',19); 
let person2 = createPerson('kang',20);

console.log(person1);  // {name: "leo", age: 19, sayName: ƒ}
console.log(person2);  // {name: "kang", age: 20, sayName: ƒ}
person1.sayName();   // leo
```

虽然解决了创建多个类似对象的问题，但是没有解决对象标识问题（即新创建的对象是什么类型）

#### 构造函数模式

```js
// 构造函数模式
function Person(name,age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 通过new构造函数创建实例对象
let person1 = new Person('Sheng',21);
let person2 = new Person('Sao',22);

console.log(person1);  // Person {name: "Sheng", age: 21, sayName: ƒ}
console.log(person2);  // Person {name: "Sao", age: 22, sayName: ƒ}
person1.sayName();  // Sheng
```

> 构造函数也是函数

```js
function Person(name,age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 直接调用Person函数
/*
   此时调用Person函数，实际上是在
   调用window对象的Person方法，
   所以里面的this指代的是window对象
*/
Person('mrkleo',66);
console.log(window.name); // mrkleo
console.log(window.age);  // 66
window.sayName();  // mrkleo
```

> 构造函数的问题

```js
function Person(name,age) {
    this.name = name;
    this.age = age;
    // 逻辑等价于上面的方式
    this.sayName = new Function("console.log(this.name)");
}
```

所以每次实例化对象都会创建一次sayName方法

```js
console.log(person1.sayName == person2.sayName);  // false
```

但是没必要在每次创建实例对象时，都创建一次sayName

##### ==<span id="constructor">关于constructor属性</span>==

对于==新==改动`[[Prototype]]`属性的原型对象来说，其`constructor`属性才会依据委托关系而改动！

先来分析一段代码

```js
function Person() {

}

Person.prototype = {
  name: 'new obj'
};

let per = new Person();

console.log(per.constructor === Person);  // ?
console.log(per.constructor === Object);  // ?
```

这里的打印的值应该是什么？

我们先来看看下面这段代码

```js
function Person() {

}

let per = new Person();

console.log(per.constructor === Person);  // true
```

通过图解：

<img src="..\JS_img\image-20210615185822278.png" alt="image-20210615185822278" style="zoom:80%;" />

首先我们要明确的是，**`per`的`constructor`属性是委托于（来自于）`Person.Prototype`对象**

所以最上面的代码我们可以拆解为：

```js
function Person() {

}

Person.prototype = new Object();
Person.prototype.name = 'new obj';

let per = new Person();

console.log(per.constructor === Person);  // false
console.log(per.constructor === Object);  // true
console.log(Person.prototype.constructor === Object);  // true
```

通过图解：

<img src="..\JS_img\image-20210615190330317.png" alt="image-20210615190330317" style="zoom:100%;" />

所以`per`对象在获取`constructor`属性时，会沿着原型链一直往上寻找委托的`constructor`属性，直到此图中的`Object.Prototype`对象，所以打印结果如上面的代码

所以第一段代码中结果为：

```js
console.log(per.constructor === Person);  // false
console.log(per.constructor === Object);  // true
```

#### 原型模式

上面两种方式都存在一定的问题，所以采用原型模式

> 理解原型

![image-20210118172002024](..\JS_img\image-20210118172002024.png)

图中的[[Prototype]]就是每个对象上暴露的`__proto__`属性

==实例与构造函数原型之间有直接联系，但实例与构造函数之间没有==

> 为什么最后一行代码是true?

```js
  let obj = {};
  console.log(obj.__proto__);
  console.log(Object.prototype);
  console.log(Object.prototype === obj.__proto__);  // true
```

因为：

![图片来源于王福明博客](..\JS_img\70)

由于==obj对象本质上是由Object函数创建的==，所以实例对象obj的`__proto__`属性与Object函数的prototype属性都指向Object的原型对象

> 1. ==正常的原型链都会终止于Object的原型对象==
> 2. ==Object原型的原型对象是null==

![这里写图片描述](..\JS_img\71)

> 函数也是一种对象，函数也有`__proto__`吗?

![这里写图片描述](..\JS_img\72)

Function也是一个函数，函数是一种对象，也有`__proto__`属性。既然是函数，那么它一定是被Function创建。所以==Function（构造函数）是被自身创建的，所以它的隐式proto属性指向了自身的原型对象==

==函数的隐式proto属性都指向于Function.prototype对象==

> `Function.prototype`指向的对象，它的`__proto__`是不是也指向`Object.prototype`？

答案是of course！因为Function.prototype指向的原型对象（其实Function.prototype是一个函数）也是一个被Object创建的普通对象，故of course！

![这里写图片描述](..\JS_img\73)

> 总结上述内容

![这里写图片描述](..\JS_img\74)

##### ==原生原型==

```js
console.log(typeof Function.prototype);  // function
console.log(Function.prototype);   // 空函数！

console.log(Array.isArray(Array.prototype));  // true
console.log(typeof Array.prototype);  // object
Array.prototype.push(1,2,3);   // 返回值：3
console.log(Array.prototype);  // [1, 2, 3, constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]

// 需要将Array.prototype设置回空，否则会导致问题！
Array.prototype.length = 0;
```

**`Function.prototype`是一个函数，而`Array.prototype`是一个数组**，是不是很残忍？

提醒我们在使用这些构造函数时，需要多加注意！不要轻易的去使用或者改动

#### 原型的动态性

```js
  function Person() {};

  let friend = new Person();
  Person.prototype.sayHi = function() {
    console.log('Hello Man');
  };

  friend.sayHi();  // Hello Man
```

![image-20210119100725986](..\JS_img\image-20210119100725986.png)

此时未重写原型对象，可以通过实例访问到原型中的方法，请分析下面的代码为何报错？

```js
  function Person() {};

  let friend = new Person();
  Person.prototype = {
    constructor: Person,
    name: 'leo',
    age: 20,
    sayName() {
      console.log(this.name);
    }
  }

  friend.sayName();  // 报错
```

通过模型图来解释更为直观

![image-20210119100825528](..\JS_img\image-20210119100825528.png)

通过图我们可以看到当Person的原型对象被重写时，==实例的`__proto__`属性任然是指向原来的原型对象，因为实例的`__proto__`指针是在`new`时自动指向的==，所以此时通过实例friend调用不到重写原型对象中的sayName方法

### 继承

很多面向对象的语言都支持两种继承：接口继承和实现继承，但是在ES中==实现继承是唯一的支持方式==，而这主要是通过原型链来实现的

#### 原型链

##### 认识原型链

为了理解什么是原型链，定义如下代码：

```js
  function Father() {
    this.fatherage = 45;
  };
  Father.prototype.getFatherAge = function() {
    return this.fatherage;
  }
  function Son() {
    this.sonage = 20;
  }

  // 继承 Father
  /* 
    Son.prototype对象成为了Father的实例
  */
  Son.prototype = new Father();

  Son.prototype.getSonAge = function() {
    return this.sonage;
  }

  let son_instance = new Son();
  console.log(son_instance.getFatherAge()); // 45
  console.log(Son.prototype.constructor);  // Father()构造函数
  console.log(son_instance.__proto__.__proto__.__proto__);  // Object.Prototype
  console.log(son_instance.__proto__.__proto__.__proto__.constructor);  // Object()构造函数
```

我们可以通过代码发现，我构建的son_instance是Son的实例，但是我却可以通过son_instance调用Father原型对象中的方法，这究竟是如何实现的呢？以及后面几行代码为何打印出这些?

看懂这张图，你就能理解上面的问题：

<img src="..\JS_img\image-20210705072308494.png" alt="image-20210705072308494" style="zoom:87%;" />

> 在ES6中实现继承请参看 => 类 => 继承 

##### <mark>扩展问题</mark>

问题：==为什么Son.prototype.`__proto__` = Father.prototype; 没法实现继承？==

```js
  function Father() {
    this.fatherage = 45;
  };
  Father.prototype.getFatherAge = function() {
    console.log('我被调用了');
    return this.fatherage;
  }

  function Son() {
    this.sonage = 20;
  }

  // 继承Father
  // 方式一：
  // Son.prototype = new Father();
  // console.log(Son.prototype.__proto__);

  // 方式二：为什么这样不能实现继承？
  Son.prototype.__proto__ = Father.prototype;
  console.log(Son.prototype.__proto__);   // {getFatherAge: ƒ (), constructor: ƒ Father()}

  let son1 = new Son();
  console.log(son1.getFatherAge());   // "我被调用了"   \n  undefined
```

![image-20210124225502578](..\JS_img\image-20210124225502578.png)

###### <mark>new原理</mark>

> 解答

想要解决这个问题，首先需要知道new背后都操作了哪些步骤！

> **new背后操作**

```js
var fn = function () { };
var fnObj = new fn();
```

1. 在内存中创建一个新对象

```js
var obj = new object();
```

2. 这个新对象的`[[Prototype]]（也就是__proto__)`属性指向构造函数的原型对象

```js
obj._proto_ = fn.prototype;
```

3. 将构造函数中的this指向这个新对象

4. 执行构造函数内部的代码（给新对象添加属性）

```js
var result = fn.call(obj);  
```

5. 如果函数没有返回其他对象，那么返回新创建的这个对象

```js
if (typeof(result) == "object"){  
    fnObj = result;  
} else {  
    fnObj = obj;
}  
```

* 模拟实现

```js
function Person(name) {
    this.name = name;
};
Person.prototype.getName = function () {
    return this.name;
};
var objectFactory = function () {
      // 从 Object.prototype 上克隆一个空的对象
    let obj = new Object();
    // 获取构造函数 Person
    let Constructor = [].shift.call(arguments);
    // 将新建对象的 __proto__ 指向 Person 的原型对象
    obj.__proto__ = Constructor.prototype;
    // 通过 Person 构造函数为 obj 对象赋值
    let res = Constructor.apply(obj, arguments);
    return typeof res === 'object' ? res : obj;
};
var a = objectFactory(Person, 'sven');
console.log(a.name); // 输出：sven
console.log(a.getName()); // 输出：sven
```

==所以Son.prototype.`__proto__` = Father.prototype;其实只是完成了new操作中的第二步，故无法实现继承==

```js
// 另外一种模拟实现
function Person(name, age) {
    this.name = name;
    this.age = age;
}

/* 
    模拟实现
*/
function newFunc() {
    // 1. 创建一个对象
    let obj = {};
    // 2. 将对象的__proto__指向构造函数的原型
    obj.__proto__ = Person.prototype;
    // 3. 调用构造函数进行属性赋值
    let res = Person.call(obj, ...arguments);
    // 4. 返回对象
    return typeof res === 'object' ? res : obj;
}

let person = new Person('leo', 20);

let person2 = newFunc('kang', 21);

console.log(person);  // erson {name: 'leo', age: 20}
console.log(person2);  // Person {name: 'kang', age: 21}
```

##### 属性设置与屏蔽

属性赋值并不简单！！

我们将分三种情况

> 第一种

```js
let car = new Object();

// 原型上添加wheel属性
Object.prototype.wheel = 'prototype wheel';

// 此时原型对象上已存在wheel属性，为底层同名属性赋值
car.wheel = 4;

console.log(car.wheel);  // 4 （取原型链最底层的wheel属性）
```

此时取==原型链最底层==的属性！

> 第二种

```js
let car = new Object();

// 原型上添加wheel属性并设置为只读
Object.defineProperty(Object.prototype, "wheel", {
  value: 'prototype wheel',
  // 将wheel属性设置为只读
  writable: false
})

// 此赋值语句被忽略（非严格模式）
car.wheel = 4;

console.log(car.wheel);  // prototype wheel 
```

第二种和第一种的区别在于将原型对象上的`wheel`属性设置为只读，此时我们在`car`对象上赋值`wheel`属性时，此赋值语句会被忽略

原因：**这样做时为了模拟类属性的继承，你可以把原型对象中的`wheel`属性看作是父类中的属性，它会被`car`继承（复制），这样一来`car`中的`wheel`属性也是只读，所以无法创建**

```js
let car = new Object();

// 原型上添加wheel属性并设置为只读
Object.defineProperty(Object.prototype, "wheel", {
  value: 'prototype wheel',
  // 将wheel属性设置为只读
  writable: false
})

// 换一种定义方式
Object.defineProperty(car, "wheel", {
  value: 4
})

console.log(car.wheel);  // 4 
```

但是我们如果不通过`=`对`car.wheel`赋值，而是通过==`Object.defineProperty`==去设置的话，此时又可以获取到`car`对象上的`wheel`属性

> 第三种

```js
// car 的原型对象
let vehicle = {
  // 给 wheel 属性定义setter
  set wheel(value) {
    // 注意这里是 _wheel_
    this._wheel_ = value;
  }
};

let car = Object.create(vehicle);

car.wheel = 4;

console.log(car);  // {_wheel_: 4}
```

原型对象上存在`wheel`属性并且它是一个setter，那就一定会调用这个`setter`。`wheel`不会被添加到`car`，也不会重新定义`wheel`这个setter

##### 隐式屏蔽

```js
var anotherObj = {a: 2};

var obj = Object.create(anotherObj);

anotherObj.a;   //2
obj.a;  //2

anotherObj.hasOwnProperty("a"); //true
obj.hasOwnProperty("a");    //false

obj.a++;

anotherObj.a;   //2
obj.a;  //3

obj.hasOwnProperty("a");    //true
```

这里的`obj.a++;`就是`obj.a = obj.a + 1`；分两步就是：

1. 先从整个原型链获取`=` 右边的`obj.a`属性的值并加1
2. 接着用`[[Put]]`将值3赋值给`obj`对象中新建的屏蔽属性`a`

#### 盗用构造函数

由于原型链存在的两个问题

1. 原型中包含的引用值会在所有实例间共享
   
   ```js
   // 原型继承存在的问题
   function SuperType() {
       this.colors = ["red", "blue", "green"];
   }
   function SubType() { }
   // 继承 SuperType
   SubType.prototype = new SuperType();
   
   let instance1 = new SubType();
   instance1.colors.push("black");
   console.log(instance1.colors); // "red,blue,green,black"
   let instance2 = new SubType();
   console.log(instance2.colors); // "red,blue,green,black"
   ```

2. 子类型在实例化时不能给父类型的构造函数传参

> 基于上面的问题

我们可以使用盗用构造函数来一一解决

（第一个问题）通过我们之前学过的 call ，我们知道 call 函数可以通过修改 this 的指向来借用构造函数

```js
function SuperType() {
    this.colors = ["red", "blue", "green"];
}
function SubType() { 
    SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
let instance2 = new SubType();
console.log(instance2.colors); // "red,blue,green"
```

通过借用父类型的构造函数，我们可以在创建子实例时，为每一个实例创建一个属于他自己的引用属性

（第二个问题）可以在调用父类构造函数之后再给子类实例添加额外的属性，来达到效果

```js
function SuperType(name) {
    this.name = name;
}
function SubType() {
    // 继承 SuperType 并传参
    SuperType.call(this, "Nicholas");
    // 实例属性
    this.age = 29;
}
let instance = new SubType();
console.log(instance.name); // "Nicholas";
console.log(instance.age); // 29 
```

> 盗用构造函数的问题

其实盗用构造函数也存在一定的问题，必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。由于存在这些问题，盗用构造函数基本上也不能单独使用。

#### 组合继承

组合继承（有时候也叫伪经典继承）综合了**原型链和盗用构造函数**

```js
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

let instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // "red,blue,green,black"
instance1.sayName(); // "Nicholas";
instance1.sayAge(); // 29
let instance2 = new SubType("Greg", 27);
console.log(instance2.colors); // "red,blue,green"
instance2.sayName(); // "Greg";
instance2.sayAge(); // 27 
```

组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中使用最多的继承模式。而且组合继承也保留了 instanceof 操作符和 isPrototypeOf()方法识别合成对象的能力。

**组合继承中存在一个问题就是调用了两次父类构造函数 => 具体解决需要看 “寄生式组合继承”**

#### 原型式继承（`Objcet.create`的规范化）

核心代码

```js
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
```

这个 `object()` 函数会创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个临时类型的一个实例。本质上，`object()`是对传入的对象执行了一次浅复制。

```js
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = object(person);
// 给 anotherPerson 对象自身添加name属性
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = object(person);
// 给 yetAnotherPerson 对象自身添加name属性
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // ['Shelby', 'Court', 'Van', 'Rob', 'Barbie']
console.log(person.name);  // Nicholas
console.log(anotherPerson.name);  // Greg
console.log(yetAnotherPerson.name);  // Linda
```

适用情况：你有一个对象，想在它的基础上再创建一个新对象。 你需要把这个对象先传给 object()，然后再对返回的对象进行适当修改。

> ==ECMAScript 5 通过增加 `Object.create()` 方法将原型式继承的概念规范化了。这个方法接收两个 参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时， `Object.create()`与这里的 `object()`方法效果相同==

```js
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie" 
```

Object.create()的第二个参数与 Object.defineProperties()的第二个参数一样：每个新增属性都通过各自的描述符来描述。以这种方式添加的属性会遮蔽原型对象上的同名属性。

```js
let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

let anotherPerson = Object.create(person, {
    name: {
        value: "Greg"
    },
    age: {
        value: 20
    }
})
console.log(anotherPerson);  // {name: 'Greg', age: 20}
```

原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住， 属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。

#### 寄生式继承（在原型式继承上小封装了下）

与原型式继承比较接近的一种继承方式是寄生式继承（parasitic inheritance）

```js
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function createAnother(original) {
    let clone = object(original); // 通过调用函数创建一个新对象
    clone.sayHi = function () { // 以某种方式增强这个对象
        console.log("hi");
    };
    return clone; // 返回这个对象
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // "hi" 
```

> 注意 通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。

#### 寄生式组合继承

组合继承存在效率问题，最主要的效率问题就是父类构造函数始终会被调用两次：一次在是创建子类原型时调用，另一次是在子类构造函数中调用。

```js
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};
function SubType(name, age) {
    SuperType.call(this, name); // 第二次调用 SuperType()
    this.age = age;
}
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
// 补充上 SubType.prototype 丢失的 constructor 属性
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

let instance = new SubType('leo', 20);
console.log(instance);  // SubType {name: 'leo', colors: Array(3), age: 20}
console.log(instance.__proto__);  //  SuperType {name: undefined, colors: Array(3), constructor: ƒ, sayAge: ƒ}
```

==这样会产生两组 name 和 colors 属性，给 instance 的原型对象上添加不必要的属性（name 和 colors）==

```js
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

// 核心代码
function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};
function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

let instance = new SubType('kang', 21);
console.log(instance);  // SubType {name: 'kang', colors: Array(3), age: 21}
console.log(instance.__proto__);  // SuperType {constructor: ƒ, sayAge: ƒ}
```

这里只调用了一次 SuperType 构造函数，避免了 SubType.prototype 上不必要也用不到的属性， 因此可以说这个例子的效率更高。而且，原型链仍然保持不变，因此 instanceof 操作符和 isPrototypeOf()方法正常有效。==寄生式组合继承可以算是引用类型继承的最佳模式。==

### 类

#### 类定义

与函数类型相似，类的定义有两种：

```js
  // 类声明
  class Person {}

  // 类表达式
  const Animal = class {};
```

1. ==与函数表达式类似，类表达式在它们被求值前也不能引用；但是与函数定义不同的是，函数声明可以提升，类声明不能==
2. 另一个与函数声明不同的地方，==函数受函数作用域限制==，而==类受块作用域限制==

```js
  {
    function Func() {}
    class Cls {}
  }

  console.log(Func);  // ƒ Func() {}
  console.log(Cls);   // Cls is not defined
```

> 类表达式的标识符

```js
  /* 
    PersonName是Person类的标识符，
    可以通过name属性获取，但是不能
    在类表达式作用域外部访问
  */
  let Person = class PersonName {
    identify() {
      console.log(Person.name, PersonName.name);
    }
  }

  let p = new Person();
  p.identify();   // PersonName PersonName

  console.log(Person.name);   // PersonName
  console.log(PersonName);   // ReferenceError: PersonName is not defined
```

#### 类构造函数

> 实例化

使用new调用类的构造函数会执行如下操作

1. 在内存中创建一个新对象
2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数的prototype属性
3. 构造函数内部的this被赋值为这个新对象（即this指向新对象）
4. 执行构造函数内部的代码（给新对象添加属性）
5. 如果构造函数返回非空对象，则返回该对象；否则返回创建的新对象

> **把类当成特殊函数**

```js
  class Person {}

  console.log(Person);  // class Person {}
  console.log(typeof Person);  // function
  Person === Person.prototype.constructor // true
```

#### 实例、原型和类成员（原型方法、访问器、静态方法）

##### 实例成员

```js
  class Person {
    constructor() {
      this.name = new String('leo');

      this.sayName = () => console.log(this.name);

      this.nickName = ['zhuangzhuang', 'lzz'];
    }  
  }

  let p1 = new Person(),
      p2 = new Person();

  p1.sayName();  // String {"leo"}
  p2.sayName();  // String {"leo"}

  console.log(p1.name === p2.name);  // false
  console.log(p1.sayName === p2.sayName);  // false
  console.log(p1.nickName === p2.nickName);  // false

  p1.name = p1.nickName[0];
  p2.name = p2.nickName[1];

  p1.sayName();  // zhuangzhuang
  p2.sayName();  // lzz
```

==每个实例都对应一个唯一的成员对象，这意味着所有成员都不会在原型上共享==

##### 原型方法与访问器

==在类块中定义的所有内容都会被定义在类的原型上==

```js
  class Person {
    constructor() {
      // 此方法存在于每个实例对象上
      this.locate = () => console.log('instance');
    }

    // 在类块中定义的方法都会被定义在类的原型上
    locate() {
      console.log('prototype');
    }
  }

  let p = new Person();

  p.locate();  // instance
  Person.prototype.locate();  // prototype
  p.__proto__.locate();  // prototype
```

##### 访问器

类定义也支持获取和设置访问器。语法与行为与普通函数一样

```js
class MyClass {
  () {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

==这里需要注意的是prop不是方法调用，而是属性调用的形式！==

```js
class Person {
  constructor(prop) {
    this.prop = prop;
  }
  get prop() { 
    return this._prop_;
  }
  set prop(value) { 
    console.log('我被执行了...');   // 我被执行了...
    this._prop_ = value;
  }
}

let person = new Person('leo');  // 此时会执行：我被执行了...

console.log(person._prop_);  // leo
console.log(person.prop);   // leo

person.prop = 123;  // 此时会执行：我被执行了...

console.log(person._prop_);  // 123 
console.log(person.prop);   // 123
```

这里多出来的`_prop_`属性暂时不知道是设计的好还是坏？

##### 静态类方法

```js
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

直接通过实例对象去调用类上的静态方法会报错！

```js
class Person {
    constructor() {
        // 定义在每个实例对象上
        this.locate = () => console.log('instance => ', this);
    }

    // 定义在类的原型上
    locate() {
        console.log('prototype => ', this);
    }

    // 定义在类本身上
    static locate() {
        console.log('class => ', this);
    }
}

let p = new Person();

p.locate();  // instance =>  Person {}
Person.prototype.locate();  // prototype =>  {constructor: ƒ, locate: ƒ}
Person.locate();  // class =>  class Person {...}
```

**静态方法中的this指的类，而不是实例**

静态类方法非常适合作为实例工厂

##### 私有属性与私有方法

> 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问

```js
class Person {
  // 私有属性
  #pri_name = 'private name';
  #pri_age = 'private age';

  // 私有方法
  #sum() {
    return this.#pri_name + ' is ' + this.#pri_age;
  }

  constructor(skill) {
    this.skill = skill;
  }

  // 私有属性的获取函数与设置函数
  set setName(name) {
    this.#pri_name = name;
  }
  get getName() {
    return this.#pri_name;
  }

  // 调用私有方法
  getSum() {
    console.log(this.#sum());
  }
}

let p = new Person('code');
console.log(p.skill);   // code

/* 
  外部调用私有属性与私有方法
*/
// p.#pri_age = 20;  // 报错
// console.log(p.#pri_name);  // 报错
// p.#sum();  // 报错

// 为私有属性赋值
p.setName = 'new name';
// 获取私有属性值
console.log(p.getName);   //  new name
// 获取私有属性方法 
p.getSum();   // new name is private age
```

下面代码中，`#totallyRandomNumber`是私有属性，`#computeRandomNumber()`是私有方法，只能在`FakeMath`这个类的内部调用，外部调用就会报错

```js
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
```

#### 继承

> 构造函数、HomeObject()和super()

派生类的方法可以通过super关键字引用它们的原型。这个关键字只能在派生类中使用，而且仅限于类构造函数、实例方法和静态方法内部，在类构造函数中使用super可以调用父类构造函数。

* ==在使用super时要注意的问题：==
1. super只能在派生类构造函数和静态方法中使用
2. 不能单独引用super关键字，要么用它调用构造函数，要么用它引用静态方法
3. 调用super()会调用父类构造函数，并将返回的实例赋值给this
4. super()的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入
5. 如果没有定义类构造函数，在实例化派生类时会调用super()，而且会传入所有传给派生类的参数
6. 在类构造函数中，不能在调用super()之前调用this
7. 如果在派生类中显式定义了构造函数，则要么必须在其中调用super()，要么必须在其中返回一个对象

> 实例 
> 
> ES6实现继承：
> 
> 1. ==extends==
> 2. ==子类构造器中声明super()==

```js
// 父类（动物）
class Animal {
  constructor(legs, eyes, skill) {
    this.legs = legs;
    this.eyes = eyes;
    this.skill = skill;
  }

  skills() {
    // console.log(this.skill + '是我的技能'); 
    console.log('我有一个技能（父类方法）');
  }
}
// 子类（猫科动物）
class CatAnimal extends Animal{
  constructor(mouse,legs,eyes,skill) {
    // 实现继承需要在子类构造器中声明super()
    super(legs, eyes, skill);
    this.mouse = mouse;
  }

  run() {
    console.log('running in the land（子类方法）');
  }
}

// 实例化子类对象
let lion = new CatAnimal(1,4,2,'奔跑捕食');

// 调用子类中方法
lion.run();  // running in the land（子类方法）

// 调用父类中方法
lion.skills();  // 我有一个技能（父类方法）

// 打印实例
console.log(lion);  // CatAnimal {legs: 4, eyes: 2, skill: "奔跑捕食", mouse: 1}
```
