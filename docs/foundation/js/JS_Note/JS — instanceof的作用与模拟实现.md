# instanceof的作用与模拟实现

## 检测 对象 与 函数

* 语法
  
  > 检测 **对象** instanceof **函数**

* 定义
  
  > instanceof运算符用来判断一个==构造函数的prototype==属性所指向的对象是否存在另外一个要检测对象的原型链上

* 使用

```js
  function Person() {}
  function Stu() {}

  // 继承
  Stu.prototype = new Person();
  let stu = new Stu();
  console.log(stu instanceof Person);  // true
  console.log(stu instanceof Stu);  // true
  console.log(stu instanceof Object); // true
```

* 模拟实现

```js
function InstanceOf(left, right) {
  // 获取检测对象的原型对象
  // let proto = left.__proto__;
  let proto = Object.getPrototypeOf(left);
  // 获取构造函数的原型对象
  let Prototype = right.prototype;

  while(true) {
    /* 
      遍历原型链，直至原型链结束（proto == null）终止寻找
    */
    if(!proto) return false;
    if(proto === Prototype) return true;

    // proto = proto.__proto__;
    proto = Object.getPrototypeOf(proto);

  }

}

function Person() {}
function Stu() {}

// 继承
Stu.prototype = new Person();

let stu = new Stu();

console.log(InstanceOf(stu,Object));  // true
console.log(InstanceOf(stu,Stu));  // true
console.log(InstanceOf(stu,Person));  // true


/* 另外一种写法（推荐） */
function myInstanceof(checkObj, func) {
    // 获取func对应的原型对象
    let prototype = func.prototype;
    // 遍历原型链，查看检测对象是否在此链上
    while(checkObj) {
        if(prototype.isPrototypeOf(checkObj)) return true;
        else {
            // 让检测对象往链条的后半部分移动
            checkObj = Object.getPrototypeOf(checkObj);
        }
    }
    return false;
}
```

# 扩展问题

## 检测 对象 与 对象

> 如何判断 对象1 是否在 对象2 的原型链上

* `obj1.isPrototypeOf(obj2)`
* `Object.getPrototypeOf(obj2)` 获取`obj2`对象的`[[Prototype]]`属性

```js
let obj1 = {
  name: 'obj1',
  dif_property: 'different property'
};

let obj2 = {
  name: 'obj2',
}

// 将 obj2对象 委托给 obj1对象
obj2.__proto__ = obj1;

console.log(obj2.name,obj2.dif_property);  // obj2 different property

// obj1 是否出现在 obj2 的 [[Prototype]] 链中
console.log(obj1.isPrototypeOf(obj2));  // true

// Object.getPrototypeOf(obj2) => 获取 obj2 的[[Prototype]]属性
console.log(Object.getPrototypeOf(obj2) == obj1);  // true

console.log(obj2 instanceof obj1);  // 报错
```
