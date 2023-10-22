# JS — 垃圾回收机制

## 可达性

> 值通过某种方式可访问，则这个值具有可达性，它们被保证存在于内存中

## 一个引用

```js
// 将一个name为john的对象赋值给user全局变量
let user = {
  name: "John"
};
```

![](https://pic4.zhimg.com/80/v2-8a889a407cb7f9a16f6291d9170b431f_1440w.png)

```js
// 将user置为null
user = null;
```

![](https://pic2.zhimg.com/80/v2-aa0c39493b1b221951cfbac208c5cc65_1440w.png)

现在没有办法访问到Object对象，即不可达状态；此时垃圾回收器会丢弃Object的数据并回收内存

## 两个引用

```js
// 将一个name为john的对象赋值给user变量
let user = {
  name: "John"
};

// 将user的引用地址值赋值给admin
let admin = user;
```

![](https://pic1.zhimg.com/80/v2-0b127e8065aed661ef949b831ccda7c4_1440w.png)

```js
// 将user置为null
user = null;
```

此时只是将user的引用断开了，但是我们**任可以通过admin访问到Object，故此时不会对Object进行垃圾回收**

## 复杂引用

```js
function marry(man, woman) {
  man.wife = woman;
  woman.husband = man;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: 'John',
},{
  name: 'Ann'
});
```

![](https://pic4.zhimg.com/80/v2-fafe60bfce1afa7b4a912f2bcdc82883_1440w.jpg)

此时图中的对象都是可达的

```js
delete family.father;
delete family.mother.husband;
```

![](https://pic4.zhimg.com/80/v2-9f5399297ff39ac5e939e44022f1f7ab_1440w.jpg)

此时我们看到==没有任何方式可达到 {name: "John"} 对象，故此对象会被回收==

![](https://pic4.zhimg.com/80/v2-31e54b330a7d1c92607d565f68ef93eb_1440w.jpg)

回收后

![](https://pic2.zhimg.com/80/v2-51a301acb7c1823551ae0068a619b7a5_1440w.png)

## ==注意==

是否具有可达性，都需要从==根部==开始进行判断的！

比如下图

![](https://pic1.zhimg.com/80/v2-b484712016eead67e42e0a2f6c671260_1440w.jpg)

图中的下部分虽然都是相互可达的，但是从全局变量family开始，就已经没有引用下面的部分了，故下部分都是不可达的，会被回收

## 更多

[知乎博客]: https://zhuanlan.zhihu.com/p/60279001
