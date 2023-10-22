# JS — splice()方法

![image-20201029130811681](..\JS_img\image-20201029130811681.png)

![image-20201029131112576](..\JS_img\image-20201029131112576.png)

![image-20201029131156631](..\JS_img\image-20201029131156631.png)

## splice方法的返回值问题

==注意：==

![image-20201029202128060](..\JS_img\image-20201029202128060.png)

```js
// 这里值得注意！！
var arr = [1,2,3];
console.log(arr.splice(1,2));  // 这里打印出 [2,3]
console.log(arr);  // 这里打印出 [1]
```
