# innerHTML 、innerText 与 outerHTML

<img src="/images/JS_img/1219486-20170817160212381-718115701.gif" alt="img" style="zoom:150%;" />

```js
var testdiv = document.getElementById('testdiv');   // 获取testdiv元素节点
console.log(testdiv.outerHTML);  // <div id="testdiv"><p>Text in DIV</p></div>
console.log(testdiv.innerHTML);  // <p>Text in DIV</p>
console.log(testdiv.innerTEXT);  // Text in DIV
```
