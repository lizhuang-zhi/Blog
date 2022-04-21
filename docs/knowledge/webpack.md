# Webpack

## 为什么使用Webpack

1. 解决多个JS文件合并后的作用域问题

2. 解决单文件太大问题

3. 解决文件可读性问题

4. 解决可维护性差问题

## 那你再说一说Loader和Plugin的区别？

- wepack只能解析JS/JSON, 不能解析CSS、img这样的内容, 所以使用Loader这个翻译官

对其进行解析. 所以Loader本质是一个函数, 用于帮助webpack对其他资源进行转译和预处理

- 而Plugin作为webpack的插件, 添加扩展webpack功能, 在webpack的整个生命周期中, 监听各种广播事件, 并在合适的时候做出操作, 改变输出结果

- Loader在module.rules中配置, 作为模块的解析规则, 类型为数组, 数组中的每一个元素都是对象包含了test、options、loader、use等属性

- 而Plugin在plugins中单独配置, 类型也是数组, 每一项都是一个Plugin实例, 参数通过构造函数传入

## Webpack构建流程简单说一下

简单说

1. 初始化: 启动构建、读取与合并配置参数, 加载Plugin, 实例Compiler

2. 编译: 从Entry出发, 针对每个Modul串行调用对应Loader翻译文件内容, 再找到Module对应的Module, 递归进行编译处理.

3. 输出: 将编译的Module组合成Chunk, 将Chunk转化成文件, 添加到文件系统

具体过程参考: [「吐血整理」再来一打Webpack面试题 - 掘金](https://juejin.cn/post/6844904094281236487#heading-3)

