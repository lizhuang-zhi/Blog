# 箭头函数

## 箭头函数的不适用场合

1. 定义对象的方法

```js
var per = {
    name: 'leo',
    fly: function(){
        // 普通函数this指向当前对象
        console.log(this);
    },
    /* 
        因为对象不构成单独的作用域，
        导致skill箭头函数中的this
        指向全局window对象
    */
    skill: () => {
        console.log(this);
    }
}
per.fly();   // per对象
per.skill();  // window对象
```

2. 第二个场合是需要动态`this`的时候（如：事件回调）

```js
var btn = document.getElementById('btn');
var btn_ = document.getElementById('btn_');

btn.onclick = function(){
    console.log(this);  // btn元素节点对象（dom对象）
}

btn_.onclick = () => {
    console.log(this);  // window对象
}
```

**第二个场合的理解类似于第一个场合，这里的btn与btn_也是一个对象，而他们的onclick方法则是这两个对象的属性，结合第一个场合，我们可以知道当对象的方法使用箭头函数声明时，其中的this会默认外层作用域中的this（这里也就是会指向window对象）**

**这个例子很好的解释了箭头函数中的this是静态的！**

## 再理解

> 深入理解

通过上面这两个场景，我们可以再设置一个场景

```js
let company = {
  name: '帅气的云顶犀软件公司',
  business: function() {
    window.setTimeout(function() {
      console.log('业务window',this);   // window对象
    },0)

    setTimeout(function(){
      console.log('业务1',this);  // window对象
    },1000);

    window.setTimeout(() => {
      console.log('业务window - 箭头',this);   // company对象
    },1500)

    setTimeout(()=>{
      console.log('业务2',this);  // company对象
    },2000);

  }

}
company.business();
console.log(window.hasOwnProperty('setTimeout'));  // true
/* 
  由于这里的setTimeout方法是window对象的属性，
  所以当参数（回调函数）为普通函数时，其中的this
  是动态的指向window对象的，而当我们在其中使用
  箭头函数时，此时的this是静态的，会从外层作用域
  去找，故为company对象
*/
```

## 更难的箭头函数例子

```js
var name = '壮爹';  // 等价于window.name = '壮爹';
let func = ({name,gender,fly}) => {
    /* 
        这里调用解构对象中的fly方法，
        fly方法中的this对于传入的实参对象来说，
        就是实参对象，而当在箭头函数中调用时，
        函数内部只能感受到被解构的fly函数，
        而不会感受到fly函数外层的对象，
        所以会直接调用 console.log(this.name);
    */
    fly();   // 壮爹
    console.log(name);  // leo
    console.log(this);  // window对象
    return 12;
}
var res = func({
    name: 'leo',
    gender: '猛男',
    fly: function(){
        console.log(this.name);
    }
});
console.log(res);  // 12
```

但是这里要和没有解构的做好对比

```js
var name = 'windowName';
function normal(obj) {
  console.log(this);   // window对象
  console.log(obj.name,obj.age);   // leo 19
  obj.skill();   // leo       
}

normal({
  name: 'leo',
  age: 19,
  skill: function() {
    console.log(this.name);
  }
});
```

因为当传入的参数不是通过解构形式，而是直接调用传入对象来调用其方法，这样就相当于直接调用一个对象的方法（普通方法），故而此方法中的this就是指向调用对象的

## 箭头函数的this

==箭头函数体内的this对象就是定义生效时所在对象，而不是使用时所在对象！==

```js
function foo() {
  return (a) => {
    console.log(this.a);
  }
}

var obj1 = { a: 2 };
var obj2 = { a: 3 };

// 箭头函数定义生效时
var bar = foo.call( obj1 );

// 箭头函数执行时（使用时）
bar.call( obj2 );  // 2 不是3！
```

## 箭头函数的注意事项

1. ==箭头函数体内的this对象就是定义生效时所在对象，而不是使用时所在对象！==
2. 不可以当做构造函数
3. 不可以使用arguments对象（因为不存在），可使用rest参数代替

# 面试题

```js
var name = 'name';
var A = {
    name: 'A',
    sayHello: function () {
        let s = () => console.log(this.name);  // A
                                               // A

        // let s = function() {
        //     console.log(this.name);   
        //     // 结果
        //     // name
        //     // B
        // }
        return s;
    }
};
let sayHello = A.sayHello();
sayHello();  
var B = {
    name: 'B'
};
sayHello.call(B);
```

问输出什么？
