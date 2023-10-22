# JS — this的四种情况

this的情况与每种情况对应的例子

​      1.以函数形式调用时，this永远都是window（默认绑定）

```js
  function test() {
    console.log(this);   // window对象
  }
  test(); 
```

​      2.以方法的形式调用时，this是调用方法的对象（隐式绑定）

```js
let per = {
    name: 'leo',
    // 普通写法
    skill_1: function () {
      console.log(this);   // per对象
    },
    // 对象方法的增强写法（ES6)
    skill_2() {
      console.log(this);   // per对象
    },

  }
  per.skill_1();  
  per.skill_2();
```

​      3.以构造函数的形式调用时，this是新创建的那个对象（new绑定）

```js
  function Person() {
    console.log(this);   // per实例对象
  }

  let per = new Person();
```

​      4.使用call和apply调用时，this是指定的那个对象（显示绑定）

```js
  function func() {
    console.log(this);  // {name: "new boy"}
  }

  func.call({name: 'new boy'});
```

## this绑定的优先级

> **这四种方式，使用构造器调用模式的优先级最高，然后是 apply 、 call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式**

==new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定==（这里分别对应上面的叫法）
