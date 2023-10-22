# JS — 类数组对象 **NodeList**

**NodeList** 对象是一个从文档中获取的节点列表 (集合) 。

NodeList 对象类似 [HTMLCollection](https://www.runoob.com/js/js-htmldom-elements.html) 对象。

一些旧版本浏览器中的方法（如：**getElementsByClassName()**）返回的是 NodeList 对象，而不是 HTMLCollection 对象。

所有浏览器的 **childNodes** 属性返回的是 NodeList 对象。

大部分浏览器的 **querySelectorAll()** 返回 NodeList 对象

> **节点列表不是一个数组！**
> 
> 节点列表看起来可能是一个数组，但其实不是。
> 
> 你可以像数组一样，使用索引来获取元素。
> 
> 节点列表无法使用数组的方法： valueOf(), pop(), push(), 或 join() 

[NodeList对象](https://www.runoob.com/js/js-htmldom-nodelist.html)

[HTMLCollection对象](https://www.runoob.com/js/js-htmldom-collections.html)
