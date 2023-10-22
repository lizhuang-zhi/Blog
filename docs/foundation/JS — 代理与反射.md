# 代理基础

## 创建空代理

```js
const target = {
    id: 'target'
};
const handler = {};
const proxy = new Proxy(target, handler);

// id 属性会访问同一个值
console.log(target.id); // target
console.log(proxy.id); // target

target.id = 'foo';
console.log(target.id); // foo
console.log(proxy.id); // foo

proxy.id = 'bar';
console.log(target.id); // bar
console.log(proxy.id); // bar

// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true
console.log(proxy.hasOwnProperty('id')); // true

// Proxy.prototype 是 undefined
// 因此不能使用 instanceof 操作符
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check

// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
```

认清代理对象的关系

```js
let target = {
  id: 'target',
};

let handler = {};

const proxy = new Proxy(target, handler);

console.log(proxy);  // Proxy {id: "target"}
console.log(typeof proxy);  // object
console.log(Proxy.prototype);  // undefined
console.log(Proxy.prototype === proxy.__proto__);  // false
console.log(proxy.__proto__ === Object.prototype);  // true
console.log(proxy.constructor === Object);  // true
```

具体的原型图：

<img src="..\JS_img\image-20210705094108504.png" alt="image-20210705094108504" style="zoom:90%;" />

## 定义捕获器

```js
let target = {
  id: 'target',
};

let handler = {
  // 这里必须叫 get 才起作用
  get() {
    return 'handler override';
  }
};

const proxy = new Proxy(target, handler);

console.log(target.id);  // target
console.log(proxy.id);  // handler override

console.log(target['id']);  // target 
console.log(proxy['id']);  // handler override

console.log(Object.create(target)['id']);  // target
console.log(Object.create(proxy)['id']);  // handler override
```

## 捕获器参数与反射API

> `get`捕获器接收到：目标对象、要查询的属性、代理对象

```js
const target = {
  foo: 'bar',
};

const handler = {
  get(trapTarget, property, receiver) {
    console.log(trapTarget === target);  // true
    console.log(property);  // foo
    console.log(receiver === proxy);  // true
    return trapTarget[property];
  }
}

const proxy = new Proxy(target, handler);

console.log(proxy.foo);  // bar
```

> 反射API

```js
const target = {
  foo: 'bar',
};

const handler = {
  get() {
    return Reflect.get(...arguments);
  }
}

const proxy = new Proxy(target, handler);

console.log(proxy.foo);  // bar
```

更简化：

```js
const target = {
  foo: 'bar',
};

const proxy = new Proxy(target, Reflect);

console.log(proxy.foo);  // bar
```

## 捕获器不变式

```js
const target = { };

Object.defineProperty(target, 'foo', {
  /* 
    设置属性为：不可写、不可配置
  */
  writable: false,
  configurable: false,
  value: 'bar'
})

const handler = {
  get() {
    return 'qux';    // 报错
    // return 'bar';   // 不报错
  }
}

const proxy = new Proxy(target, handler);

console.log(proxy.foo);  // TypeError
```

## 可撤销代理

通过`Proxy.revocable()`可撤销代理对象与目标对象的关联

```js
const target = { 
  foo: 'bar'
};

const handler = {
  get() {
    return 'intercepted';   
  }
}

/* 
  revocable()：撤销代理对象与目标对象的关联
*/
const { proxy, revoke } = Proxy.revocable(target, handler);

console.log(proxy.foo);    // intercepted
console.log(target.foo);    // bar

// 执行销函数
revoke();

console.log(proxy.foo);  // TypeError
```

## 代理另一个代理

```js
const target = {
  foo: 'bar'
}

const firstProxy = new Proxy(target, { 
  get() { 
    console.log('first proxy');
    return Reflect.get(...arguments);
  }
})

const secondProxy = new Proxy(firstProxy, { 
  get() { 
    console.log('second proxy');
    return Reflect.get(...arguments);
  }
})

console.log(secondProxy.foo);
// second proxy
// first proxy
// bar
```

# 代理捕获器与反射方法

## `get()`

```js
const myTarget = {};

const proxy = new Proxy(myTarget, {
  get(target, property, value, receiver) {
    console.log('get()');
    return Reflect.get(...arguments);
  }
})

proxy.foo
// get()
```

## `set()`

```js
const myTarget = {};

const proxy = new Proxy(myTarget, {
  set(target, property, value, receiver) {
    console.log('set()');
    return Reflect.set(...arguments);
  }
})

proxy.foo = 'new bar';
// set()
```

## 除此之外还有很多的方法

例如：`has()、defineProperty()...`

具体查看：红宝书（第四版）`P275及以后`

# 代理模式

## 跟踪属性访问

```js
const user = {
  name: 'Jake'
};

const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);

    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property} = ${value}`);

    return Reflect.set(...arguments);
  }
});

proxy.name;   // Getting name
proxy.name = 27;   // Setting name = 27
```

## 隐藏属性

```js
const hiddenProperties = ['foo', 'bar'];
const targetObject = { 
  foo: 1,
  bar: 2,
  baz: 3
}

const proxy = new Proxy(targetObject, {
  get(target, property) {
    if(hiddenProperties.includes(property)) {
      return undefined;
    }else {
      return Reflect.get(...arguments);
    }
  },
  has(target, property) {
    if(hiddenProperties.includes(property)) {
      return false;
    }else {
      return Reflect.has(...arguments);
    }
  } 
})

console.log(proxy.foo);  // undefined
console.log(proxy.bar);  // undefined
console.log(proxy.baz);  // 3

console.log('foo' in proxy);  // false
console.log('bar' in proxy);  // false
console.log('baz' in proxy);  // true
```

## 属性验证

```js
const target = {
  onlyNumbersGoHere: 0
}

const proxy = new Proxy(target, {
  set(target, property, value) {
    if(typeof value !== 'number') {
      return false;
    }else {
      return Reflect.set(...arguments);
    }
  }
})

proxy.onlyNumbersGoHere = 1;
console.log(proxy.onlyNumbersGoHere);  // 1
proxy.onlyNumbersGoHere = '2';
console.log(proxy.onlyNumbersGoHere);  // 1
```

## 函数与构造函数参数验证

```js
function median(...nums) {
  return nums.sort()[Math.floor(nums.length / 2)];
}

const proxy = new Proxy(median, {
  apply(target, thisArg, argumentsList) {
    for(const arg of argumentsList) {
      if(typeof arg !== 'number') {
        throw 'Non-number argument provided';
      }
    }
    return Reflect.apply(...arguments);
  }
});

console.log(proxy(4, 7, 1));  // 4
console.log(proxy(4, '7', 1));  // Uncaught Non-number argument provided
```

```js
class User {
  constructor(id) {
    this.id_ = id;
  }
}

const proxy = new Proxy(User, {
  construct(target, argumentsList, newTarget) {
    if(argumentsList[0] === undefined) {
      throw 'User cannot be instantiated without id';
    }else {
      return Reflect.construct(...arguments);
    }
  }
});

new proxy(1);

new proxy();
// Uncaught User cannot be instantiated without id
```

## 数据绑定与可观察对象

```js
const userList = [];

class User {
  constructor(name) {
    this.name_ = name;
  }
}

const proxy = new Proxy(User, {
  construct() {
    const newUser = Reflect.construct(...arguments);
    userList.push(newUser);
    return newUser;
  }
})

new proxy('John');
new proxy('Jacob');
new proxy('Jingleheimerschmidt');

console.log(userList);  // [{name_: "John"}, {name_: "Jacob"}, {name_: "Jingleheimerschmidt"}]
```

```js
const userList = [];

function emit(newValue) {
  console.log(newValue);
}

const proxy = new Proxy(userList, {
  set(target, property, value, receiver) {
    const result = Reflect.set(...arguments);
    if(result) {
      emit(Reflect.get(target, property, receiver));
    }
    return result;
  }
})

proxy.push('John');
// John
proxy.push('Jacob');
// Jacob
```
