# JS的深浅拷贝实现

## 认识深浅拷贝

> 浅拷贝

<img src="/images/JS_img/image-20210326133616349.png" alt="image-20210326133616349" style="zoom:80%;" />

> 深拷贝

<img src="/images/JS_img/image-20210326133650753.png" alt="image-20210326133650753" style="zoom:80%;" />

## 浅拷贝

> 通过**concat()或者slice()**方法拷贝数组

```js
// 声明一个数组
let arr = ['old', 1, 'leo', 'fly in sky'];
// 拷贝数组: concat方法会返回一个数组副本
let new_arr = arr.concat();

new_arr[0] = 'new';    

console.log(arr); // ["old", 1, "leo", "fly in sky"]
console.log(new_arr);  // ["new", 1, "leo", "fly in sky"]
```

上面代码中原数组的元素是==非对象==与==非数组==的元素

```js
// 声明一个数组
let arr = [{old: 'old'},['old'],'old'];
// 拷贝数组
let new_arr = arr.concat();

// 更改新数组
new_arr[0].old = 'new';
new_arr[1][0] = 'new';
new_arr[2] = 'new';

console.log(arr);  // [{old: 'new'}, ['new'], 'old']
console.log(new_arr);  // [{old: 'new'}, ['new'], 'new']
```

在上面的这段代码中可以发现，当原数组元素为对象或者数组时，我们改变新数组的属性，发现对应的原数组中的前两个元素（对象与数组）也发生了变化，而第三个元素（字符串）未发生变化，这说明通过concat方法拷贝时，对于==数组与对象是拷贝的其引用==，对于这样的拷贝，称之为浅拷贝！（slice方法也是浅拷贝）

## 浅拷贝与深拷贝的实现

由于对象的拷贝也同concat方式属于浅拷贝（如下代码）

```js
// 声明一个对象
let obj = {
  name: 'leo',
  age: 20,
  skill: {
    fir: 'code',
    sec: 'dance'
  }
};
// 新对象
let new_obj = {
  name: obj.name,
  age: obj.age,
  skill: obj.skill
};
// 修改新对象中的属性（原始类型）
new_obj.name = 'new leo';
// 修改新对象中的属性（对象）
new_obj.skill.fir = 'copy code';

console.log(obj);  // {name: "leo", age: 20, skill: {fir: "copy code", sec: "dance"}}
console.log(new_obj);  // {name: "new leo", age: 20, skill: {fir: "copy code", sec: "dance"}}
```

> 所以可以自定义一个**浅拷贝的方法**

```js
/* 
  实现浅拷贝方法
*/
function shallowCopy(obj) {
  // 只拷贝对象
  if(typeof obj !== 'object') return;
  // 根据obj类型新建新数组或者新对象
  let new_obj = Array.isArray(obj) ? [] : {};
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      new_obj[key] = obj[key];
    }
  }
  return new_obj;
}

let obj = [12,{name: 'leo'},['good boy']]
let new_obj = shallowCopy(obj);

obj[1].name = '老子明天不上班';

console.log(obj);  // [12, {name: '老子明天不上班'}, ['good boy']]
console.log(new_obj);  // [12, {name: '老子明天不上班'}, ['good boy']]
```

> 实现**深拷贝**

```js
/* 
  实现深拷贝方法
*/
function deepCopy(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj类型新建新数组或者新对象
  let new_obj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // console.log('key ->' + key);
    if (obj.hasOwnProperty(key)) {
      new_obj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      // console.log('new_obj[key] ->' + new_obj[key]);
    }
  }
  return new_obj;
}

let obj = [12, { name: 'leo' }, ['good boy']]
let new_obj = deepCopy(obj);

obj[1].name = '老子明天不上班';

console.log(obj);  // [12, {name: '老子明天不上班'}, ['good boy']]
console.log(new_obj);  // [12, {name: 'leo'}, ['good boy']]
```

**通过递归调用deepCopy方法，可以将对象或者数组类型中的具体数据再次取出并赋值给新数组（或者新对象）的对应键**

## 调用函数是浅拷贝

```js
let obj = {
 name: 'leo',
 age: 20
};

function func(p_obj) {
    console.log(p_obj);  // {name: "leo", age: 20}
    // 改变引用对象的name属性
    p_obj.name = 'change boy';
}
// 调用函数，将obj浅拷贝给p_obj
func(obj);  // 参数相当于 p_obj = obj

// 引用对象属性被改变，正面函数调用传参为浅拷贝
console.log(obj);  // {name: "change boy", age: 20}
```

**针对引用类型时！！**
