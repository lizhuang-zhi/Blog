# TypeScript

## 谈谈JS与TS

对于初学者来说JS是很友好的（不爱报错，弱类型），但是这一点其实是一把双刃剑，因为随之而来的就是JS在构建大型项目的时候，如果某一处发生错误会给来我们带来巨大的麻烦

比如在JS中声明一个变量

```js
let a = 10;
a = 'hello';
```

变量a是没有类型的，而10是有类型的（Number）；当我们再次给a赋值为'hello'（String类型）时，也是可以做到的，因为==JS的变量是动态类型==；这在很多时候是存在一定的隐患的

同样还有，JS的函数参数也是未定义类型的变量

## TS是什么

* *以JS为基础构建的语言*
* 一个JS的超集
* **将JS从动态转为静态（为变量引入类型的概念）**
* TS扩展了JS，并添加了类型

TS不能被JS解析器直接执行（需要编译）

## TS环境搭建

1. 下载并安装node.js
2. 打开PowerShell，先检查node安装情况，再通过npm全局安装typescript

```bash
# 检查安装
node -v
# 安装全局ts
npm i -g typescript
# 检查ts是否安装成功
tsc -V
```

3. 创建ts文件

4. 使用tsc对ts文件进行编译（生成对应js文件）

   * 进入ts所在目录

   * 执行命令

     ```bash
     tsc xxx.ts
     ```

## 类型声明(简述)

```typescript
// 声明一个变量a，同时指定它的类型为number
var a: number;
// a 的类型设置为了number，在以后的使用过程中a的值只能是数字
a = 10;
a = 33;
// a = 'hello';  报错 => 变量a的类型是number，不能赋值字符串

// 声明并赋值
var b: string = 'hello';

/* 
  如果变量的声明与赋值时同时进行的，TS可以自动对变量进行类型检测
*/
var c = true;
// c = 123;  报错

/* 
  ---------------------- 函数参数 --------------------------
*/
/* 
  JS中的函数是不考虑参数的类型与个数
*/
// function sum(a,b) {
//   return a + b;
// }
// console.log(sum(111,222));  // 333
// console.log(sum(111,"222"));  // 111222

/* 
  给参数添加类型
*/
function sum(a: number,b: number): number {
  return a + b;
}
// sum(111,"222");  // 报错 参数类型错误
// sum(111,222,333);  // 报错 参数过多
// sum(111);  // 报错 参数过少
```

### TS中的类型

* 类型 

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1mwg1ygr1j20u40gsmyt.jpg)

```typescript
/* 也可以直接使用 字面量 进行类型声明 */
let a: 10;
a = 10;
// a = 11;   // Type '11' is not assignable to type '10'

/* 可以使用 | 来连接多个类型（联合类型）  */
let b: "male" | "female";
b = "male";
b = "female";
// b = "hello";  // Type '"hello"' is not assignable to type '"male"

let c: boolean | string;
c = true;
c = 'hello';

/* 
  any 表示的是任意类型
  一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
  使用TS时，不建议使用any类型
*/
// let d; // 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any（隐式的any）
let d: any;   // 显示any
d = 10;
d = 'hello';
d = true;

/* 
  unknown 表示未知类型的值
*/
let e: unknown;
e = 10;
e = "hello";
e = true;

let s: string;
// d的类型是any，它可以复制给任意变量
// s = d;


e = 'hello';
// s = e;  报错
/* 
  unknown 实际上就是一个类型安全的any
  unknown 类型的变量，不能直接复制给其他变量
*/
if(typeof e === 'string') {
  s = e;  
}
/* 
  类型断言：可以用来告诉解析器变量的实际类型
  语法：
    变量 as 类型
    <类型>变量
*/
s = e as string;
s = <string>e;


// void 用来表示空，以函数为例，就表示没有返回值的函数
function fn(): void{
}

// never 表示永远不会返回结果
function fn_2(): never{
  throw new Error('报错了!');
}


/* 
    接口
*/
interface Person {
    firstName: String,
    lastName: String
}
function sayHi(person: Person) {
    return "Hello " + person.lastName + person.firstName;
}
let person = {
    firstName: 'zhuangzhi',
    lastName: 'li'
}
console.log(sayHi(person));

/* 
    类
*/
class User {
    firstName: String;
    lastName: String;
    fullName: String;

    constructor(lastName: String, firstName: String) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = lastName + " " + firstName;
    }
}
interface Person {
    firstName: String,
    lastName: String
}
function sayHi(person: Person) {
    return "Hello " + person.lastName + person.firstName;
}
let user = new User('li', "zhuangzhi");
console.log(sayHi(user));
```

> 总结上面代码

1. **unknown 实际上就是一个类型安全的any**
   unknown 类型的变量，不能直接复制给其他变量

2. 类型断言：可以用来告诉解析器变量的实际类型

   ```typescript
   let s: string;
   let e: unknown;
   /* 设置类型断言后的e就可以赋值给其他变量 */
   s = e as string;
   s = <string>e;
   ```

3. never类型表示没有值，而void表示空值

   ```typescript
   // void 用来表示空，以函数为例，就表示没有返回值的函数
   function fn(): void{
   }
   
   // never 表示永远不会返回结果
   function fn_2(): never{
     // 函数内部什么都不写，会报错
     throw new Error('报错了!');
   }
   ```

更多类型

```typescript
// object 表示一个js对象（开发时不常用）
let a : object;
a = {}; 
a = function() {};

/* 
  {} 用来指定对象中可以包含哪些属性
  语法：{属性名: 属性值,属性名: 属性值}
  在属性名后面加上?，表示属性是可选的
*/
let b : {name: string, age?: number};
b = {name: '孙悟空', age: 18};

// [propName: string]: any 表示任意类型的属性
let c: {name: string, [propName: string]: any};
c = {name: '猪八戒', age: 20, skill: 'fly'};

/* 
  设置函数的类型声明：
    语法：(形参: 类型, 形参: 类型 ...) => 返回值
*/
let d: (a: number,b: number)=>number;
d = function(n1,n2): number {
  return n1 + n2;
}


/* 
  数组的声明：
    类型[]
    Array<类型>
*/
// string[] 表示字符串数组
let e: string[];
e = ['a', 'b', 'c'];

// number[] 表示数值数组
let f: number[];

let g: Array<number>;
g = [1, 2, 3];


/* 
  元组(tuple)，元组就是固定长度的数组
    语法：[类型, 类型, 类型]
*/
let h: [string, string];
h = ['hello', 'good'];

/* 
  enum 枚举
*/
enum Gender {
  Male,
  Female
}

let i : {name: string, gender: Gender};
i = {
  name: '孙悟空',
  gender: Gender.Male
}
console.log(i.gender === Gender.Male);   // true

// & 表示同时
let j: {name: string} & {age: number};
j = {name: '孙悟空', age: 18};

// 类型的别名
type myType = 1 | 2| 3 | 4 | 5;
let k: myType;
let l: myType;

k = 1;
// k = 6; 报错
```

## TS编译选项

动态监视ts文件并修改对应js文件

```bash
tsc xxx.ts -w
```

但是单一的使用这个命令的问题：就是需要对每一个ts都使用一次这个命令才可以动态编译（繁琐）

> 解决

1. 使用命令创建`tsconfig.json`文件

   ```bash
   tsc --init
   ```

2. 启动监听命令

   ```bash
   tsc -w
   ```

#### tsconfig.json文件的配置

* **include配置**

  * 用来指定哪些ts文件需要被编译

  * 默认值：[ " `**/*` " ]

  * 示例

    * ```bash
      "include": [
        "./src/**/*"
      ],
      ```

* **exclude配置**

  * 不需要被编译的文件目录

  * 默认值：["node_modules", "bower_components", "jspm_packages"]

  * 示例

    * ```bash
      "exclude": [
        "./src/exp.ts"
      ]
      ```

> 使用

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1mwgeio71j21cp0q6q97.jpg)

*通过运行 tsc -w 命令（配置tsconfig.json文件），hello.ts 对应编译出js文件*

* **compilerOptions配置**（配置值为==对象==）（==这里的可选值都是""==)

  * **target属性**

    * 用来指定ts被编译为的ES的版本
    * 可选值：'es3', 'es5', 'es6', 'es2015', 'es2016' ...

  * **module属性**

    * 指定要使用的模块化规范
    * 可选值：'es6', 'es2015', 'none', 'commonjs', 'amd' ...

  * **outDir属性**

     * 用来指定编译后文件所在目录

  * lib属性

     * 用来指定项目中要使用的库(一般不设置)
       * 可选值：'es5', 'es6', 'dom.iterable', 'webworker' ...

  * outFile属性

     * 将代码合并为一个文件
       * 设置outFile后，所有的全局作用域中的代码会合并到同一个文件中，但是如果代码中包含import时，需要将"module"的值改为"system"

  * **allowJs属性**

    * 是否对js文件进行编译，默认值为false

  * **checkJs属性**

    * 是否检查js代码是否符合语法规范，默认是false

  * **removeComments属性**
    	* 是否移除注释，默认值为false

  * **noEmit属性**

    * 不生成编译后的文件，默认值为false

  * **noEmitOnError属性**

    * 当有错误时，不生成编译后的文件，默认值为false

  * **strict属性**

    * 所有严格检查的总开关（设置后，相当于把严格模式相关的设置都打开），默认值为false

  * **alwaysStrict属性**

    * 用来设置编译后的文件是否使用严格模式，默认值为false

  * **noImplicitAny属性**

    * 不允许隐式的any类型，默认值是false

    * 示例：

      ```typescript
      // 这里的参数a与b就是隐式的any类型
      // function fn(a, b) {  // 当设置"noImplicitAny"为true时，报错
      //   return a + b;
      // }
      ```

  * **noImplicitThis属性**

    * 不允许不明确类型的this，默认值为false

    * 示例

      ```typescript
      // 函数中的this是不明确的 
      // function fn2() {
      //   console.log(this);  // 当设置"noImplicitThis"为true时，报错
      // }
      ```

  * **strictNullChecks属性**

    * 严格的检查空值，默认值为false

    * 示例

      ```typescript
      // 这里的box1就可能为空值 
      let box1 = document.getElementById('box1');
      // box1.addEventListener('click',function(){    // 当设置"strictNullChecks"为true时，报错
      //   alert('hello');
      // })
      
      /* 
        改进方法一
      */
      if (box1 !== null) {
        box1.addEventListener('click', function () {    
          alert('hello, method_1');
        })
      }
      
      /* 
        改进方法二
      */
      box1?.addEventListener('click',function(){
        alert('hello, method_2')
      })
      ```

## webpack打包ts代码

1. 新建项目，并进入对应文件夹

2. 输入指令，生成 package.json 文件

   ```bash
   npm init -y
   ```

3. 再输入指令，生成 node_modules 文件

   ```bash
   npm i -D webpack webpack-cli typescript ts-loader html-webpack-plugin webpack-dev-server
   ```

   具体版本如下: 

   ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1njis3v7gj20gg090aax.jpg)

4. 编写webpack的配置文件（根目录下创建webpack.config.js)

   ```js
   // 引入一个包
   const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   // webpack中的所有配置信息都应该写在module.exports中
   module.exports = {
   
       // 指定入口文件
       entry: "./src/index.ts",
   
       // 指定打包文件所在的目录
       output: {
           // 指定打包文件的目录
           path: path.resolve(__dirname, 'dist'),
           // 打包后文件的文件
           filename: 'bundle.js'
       },
   
       // 指定webpack打包时要使用的模块
       module: {
           // 指定要加载的规则
           rules: [{
               // test指定的是规则生效的文件
               test: /\.ts$/,
               // 要使用的loader
               use: 'ts-loader',
               // 要排除的文件
               exclude: /node-modules/
           }]
       },
   
       plugins: [
           // plugins的配置
           // html-webpack-plugin
           // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源
           // 需求：需要有结构的HTML文件
           new HtmlWebpackPlugin({
               // 复制 './src/index.html' 文件, 并自动引入打包输出的所有资源（JS/CSS)
               template: './src/index.html'
           })
       ],
   
       // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~）
       // 特点：只会在内容中编译打包，不会有任何输出
       // 启动devServer指令为：npx webpack serve（具体版本不同，还要参看官网文档）
       devServer: {
           // 启动gzip压缩
           compress: true,
           // 端口号
           port: 3000,
           // 自动打开浏览器
           open: true
       },
       // 启动 devServer 需要设置 mode 属性
       mode: 'development'
   
   }
   ```

5. 编写 tsconfig.json (或者直接使用 `tsc --init` 命令生成 `tsconfig.json`)

   ```json
   {
     "compilerOptions": {
       "module": "ES2015",
       "target": "ES2015",
       "strict": true
     }
   }
   ```

6. 在package.json文件中加入 "build": "webpack"

   ```json
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       // 新加的
       "build": "webpack"
     },
   ```

   最终的项目机构为:

   ![](https://tva1.sinaimg.cn/large/e6c9d24ely1h1njjojk20j21uk0q0aea.jpg)

7. 输入指令执行打包

   ```bash
   npm run build
   ```

8. 如果想先启动自动化(`devServer`), 可运行命令(可能根据版本的不同会有改动, 具体参看官网)

   ```bash
   npx webpack serve
   ```


## **TS常用语法**

### 基础类型

#### 布尔值

```typescript
let isDone: boolean = true;
isDone = false;
// isDone = 2;  // 报错
```

#### 数字

和 JavaScript 一样，TypeScript 里的所有数字都是浮点数。 这些浮点数的类型是 number。 除了支持十进制和十六进制字面量，TypeScript 还支持 ECMAScript 2015中引入的二进制和八进制字面量。

```typescript
let a0: number = 13.14;
let a1: number = 10 // 十进制
let a2: number = 0b1010  // 二进制
let a3: number = 0o12 // 八进制
let a4: number = 0xa // 十六进制

console.log(a0);  // 13.14
console.log(a1);  // 10
console.log(a2);  // 10
console.log(a3);  // 10
console.log(a4);  // 10
```

#### 字符串

Typescript 和 JavaScript 一样, 可以使用单引号、双引号、模版字符串来赋值字符串类型

```typescript
let myName: string = "leo";  // 使用双引号
myName = 'tom'  // 使用单引号
let age: number = 21;
let info: string = `${myName} is ${age} years old`;  // 使用 ES6 中的模版字符串
console.log(info);  // tom is 21 years old
```

#### null 和 undefined

在 JS 中, 一个变量的初始化一般为`undefined`, 而对于即将被赋值为引用类型的变量, 我们通常会先为变量初始化`null`, 而在 TS 中由于其是强类型语言, 所以要抛开 JS 中的初始化设置思想

```typescript
let n: null = null;
let u: undefined = undefined;
n = {};   // Error: 不能将类型"{}"分配给"null"
u = 123;  // Error: 不能将类型"123"分配给"undefined"
```

#### 数组

在 TS 中有两种设置数组的方式

方式一

```typescript
let list1: number[] = [1, 2, 3];
```

方式二

```typescript
let list2: Array<number> = [1, 2, 3];
```

> 注意!! 这里定义的是 number 类型的数组, 所以元素都需要是 number 类型

```typescript
let list2: Array<number> = [2, 3, "great job"];  // Error
```

如果想定义元素类型不同的数组, 需要给数组设置为 any 类型, 具体看查看 any 类型

#### 元组 Tuple

<mark>元组类型允许表示一个已知元素数量和类型的数组.</mark> 各元素类型不必相同.

```typescript
let t1: [string, number];
t1 = ["great", 23];
```

但是如果在赋值时, 赋值的元素过多、过少, 或者对应的赋值元素类型错误都会招致报错

```typescript
t1 = ["great", 23, 11];  // Error
t1 = ["great"];  // Error
t1 = [11];  // Error
t1 = [11, "great"];  // Error
```

#### 枚举

枚举类型是对 JS 数据类型的一个补充

```typescript
enum Color {
    Red, 
    Green, 
    Blue
}
// 枚举类型默认从 0 开始编号
let myColor: Color = Color.Green;  
console.log(myColor);  // 1

console.log(Color);   // { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }
console.log(Color[0]);  // Red 
console.log(Color[1]);  // Green
console.log(Color['Blue']);  // 2
```

默认从 0 开始编号, 也可以手动对其进行编号

```typescript
enum Color {
    Red = 1, 
    Green, 
    Blue
}
// 枚举类型默认从 0 开始编号
let myColor: Color = Color.Green;  
console.log(myColor);  // 2
console.log(Color[0]);  // undefined 
console.log(Color[1]);  // Red
```

也可以将其全部手动赋值

```typescript
enum Color {
    Red = 1, 
    Green = 4,  
    Blue = 5
}
```

> 枚举还提供的一个便利, 就是可以通过索引去找到对应的枚举值 (具体参看上面两段代码)

#### any

有时, 如果我们对某一个变量的类型不确定, 或者说需要在未来才可以确定这个变量的类型, 我们可以采用 any 为其变量进行定义.

```typescript
let a: any;
a = "great";
a = true;
```

初次之外, 你也可以定义 any 类型的数组

```typescript
let list: any[] = [11, "great", true];
console.log(list[0]);   // 11
console.log(list[1]);   // great
console.log(list[2]);   // true
```

#### unknown

表示未知类型的值

```typescript
/* 
    unknown 表示未知类型的值
*/
let uk: unknown;
uk = 123;
uk = "great job";
uk = true;
```

#### <mark>unknown 和 any 的区别</mark>

`unknown`类型不可以赋值给其他变量, 而`any`类型可以

```typescript
let str: string;
let uk: unknown = "great job";
str = uk;   // Error
```

```typescript
let str: string;
let an: any = "great job";
str = an;    // 没报错
```

#### void

表示函数没有返回值, 可将其设置为 `void`

```typescript
// 当给返回值设置 void 时, 返回值只能是 undefined
function foo():void {
    console.log(111);
    // return undefined;
    // return null;  Error
    // return 11;  Error
}
let result = foo();
// 111
console.log(result);  // undefined
```

可以给变量声明`void`类型, 但是意义不大, 因为只能给其赋值`undefined`

```typescript
let unusable: void = undefined
console.log(unusable);  // undefined

let voidVar1: void = null;   // Error
let voidVar2: void = 11;    // Error
let voidVar3: void = true;   // Error
```

#### never

表示永远不会有返回结果

```typescript
// never 表示永远不会返回结果
function fn_2(): never {
    throw new Error('报错了!');
    // 不能有 return, 也没有任何返回值, 包括 undefined
}

console.log(fn_2());
// Uncaught Error: 报错了!
```

#### never 和 void 的区别

<mark>never 类型表示没有值，而 void 表示空值</mark>

```typescript
// void 用来表示空，以函数为例，就表示返回空值(undefined)的函数
function fn(): void{
}

// never 表示永远不会返回结果
function fn_2(): never{
  // 函数内部什么都不写，会报错
  throw new Error('报错了!');
}
```

#### object

设置`object`类型的变量, 可以使用引用类型赋值(<mark>和JS比, 多了个元组</mark>)

```typescript
let obj: object = {};
let arr: object = [1, 2, 3];
let fn: object = function() {};
let tup: object = [11, "great job", true];

console.log(obj);  // {}
console.log(arr);  // [1, 2, 3]
console.log(fn);   // ƒ () { }s
console.log(tup);  // [11, 'great job', true]
```

而对于`null、undefined、number、string、boolean`以及**`enum`**类型都是不可以为其赋值

```typescript
enum Color {
    Green, 
    Blue
}
let num: object = 23;   // Error
let en: object = Color.Green;  // Error
```

#### 联合类型

通过 `|` 符号来连接多个类型

```typescript
/* 可以使用 | 来连接多个类型（联合类型）  */
let b: "male" | "female";
b = "male";
b = "female";
// b = "hello";  // Type '"hello"' is not assignable to type '"male"

let c: boolean | string;
c = true;
c = 'hello';
```

#### 类型断言

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。

有两种形式: 

1. <类型> 值
2. 值 as 类型

```typescript
/* 
类型断言(Type Assertion): 可以用来手动指定一个值的类型
语法:
    方式一: <类型>值
    方式二: 值 as 类型  tsx中只能用这种方式
*/

/* 需求: 定义一个函数得到一个字符串或者数值数据的长度 */
function getLength(x: number | string) {
    // 当 x 为 string 类型时
    if ((<string>x).length) {
        // return (<string>x).length;  // 等价于下面
      	// 指定 x 为 stirng 类型
        return (x as string).length;
    } else {  // 当 x 为 number 类型时
        return x.toString().length;
    }
}
console.log(getLength(1234));  // 4
console.log(getLength('abcd'));  // 4
```

#### 类型推断

类型推断: TS 会在没有明确的指定类型的时候推测出一个类型

```typescript
/* 定义变量时赋值了, 推断为对应的类型 */
let b9 = 123 // number
// b9 = 'abc' // Error

/* 定义变量时没有赋值, 推断为any类型 */
let b10  // any类型
b10 = 123
b10 = 'abc'
```

### 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。我们使用接口（Interfaces）来定义对象的类型。`接口是对象的状态(属性)和行为(方法)的抽象(描述)`

##### 接口初探

```typescript
// 定义一个接口
interface IPerson {
    id: number
    name: string
    age: number
    sex: string   
}

// 定义一个 IPerson 接口类型的对象, 并赋值
let person: IPerson = {
    id: 11,
    name: 'leo',
    age: 21,
    sex: 'boy'  
}
```

<mark>定义的接口类型的对象属性不能多也不能少,  要和定义的接口一致</mark>

##### 可选属性

通过`?`将属性设置为可选

```typescript
interface IPerson {
    id: number
    name: string
    age: number
    sex?: string   // 将 sex 设置为可选属性
}

let person: IPerson = {
    id: 11,
    name: 'leo',
    age: 21,
    // sex: 'boy'    // 不定义可选属性
}
```

##### 只读属性

通过在属性名前添加 `readonly` , 使属性变为只读

```typescript
interface IPerson {
    readonly id: number
    name: string
    age: number
    sex?: string   // 将 sex 设置为可选属性
}

let person: IPerson = {
    id: 11,
    name: 'leo',
    age: 21,
    // sex: 'boy'    // 不定义可选属性
}

// 试图修改只读属性, 会导致报错
person.id = 23;  // Error
```

##### 函数类型

接口不仅可以描述 JS 对象, 也可以描述其函数类型

```typescript
// 接口描述函数类型(参数的类型和返回值类型)
interface JudgeFunc {
    (num: number, target: number): boolean
}
```

然后声明函数类型的变量, 其类型为刚才定义的接口

```typescript
const judgeNum: JudgeFunc = function(num: number, target: number) : boolean {
    return num > target;
}

console.log(judgeNum(11, 20));  // false
```

##### 类类型

###### 类实现接口

类类型: 实现接口

1. ==一个类可以实现多个接口==
2. ==一个接口可以继承多个接口==

```typescript
interface Alarm {
    alert(): any;
}
interface Light {
    lightOn(): void;
    lightOff(): void;
}
class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
```

###### 一个类可实现多个接口

```typescript
class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car lightOn');
    }
    lightOff() {
        console.log('Car lightOff');
    }
}
```

###### 一个接口可继承多个接口

```typescript
interface LightableAlarm extends Alarm, Light {
    
}
```

### 类

对于传统的 JavaScript 程序我们会使用`函数`和`基于原型的继承`来创建可重用的组件，但对于熟悉使用面向对象方式的程序员使用这些语法就有些棘手，因为他们用的是`基于类的继承`并且对象是由类构建出来的。 从 ECMAScript 2015，也就是 ES6 开始， JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。

#### 类的基本使用

```typescript
// 类的基本使用
class Person {
    // 声明属性
    name: string
    age: number

    // 声明构造函数
    constructor(name: string, age: number) {
        // 为上面声明的属性赋值
        this.name = name;
        this.age = age;
    }

    // 一般方法
    sayHi(): string {
        return `Hello, I'm ${this.name}, I'm ${this.age} years old`;
    }
}

let person = new Person('leo', 21);
let res = person.sayHi();
console.log(res);  // Hello, I'm leo, I'm 21 years old
```

#### 继承

一个简单的例子

```typescript
class Animal {
    run(distance: number) {
        console.log(`Animal run ${distance}m`)
    }
}
class Dog extends Animal {
    bark() {
        console.log('wang! wang!')
    }
}

const dog = new Dog()
dog.bark()  // wang! wang!

// 可以调用从父中继承得到的方法
dog.run(100)  // Animal run 100m
```

上面的例子, 简单的展示了一下`dog`实例调用父类的方法. 其中也没有涉及到`constructor`的声明

复杂一点的例子

```typescript
class Animal {
    name: string

    constructor(name: string) {
        this.name = name
    }

    run(distance: number = 0) {
        console.log(`${this.name} run ${distance}m`)
    }

}

class Snake extends Animal {
    constructor(name: string) {
        // 调用父类型构造方法
        super(name)
    }

    // 重写父类型的方法
    run(distance: number = 5) {
        console.log('sliding...')
        super.run(distance)
    }
}

class Horse extends Animal {
    constructor(name: string) {
        // 调用父类型构造方法
        super(name)
    }

    // 重写父类型的方法
    run(distance: number = 50) {
        console.log('dashing...')
        // 调用父类型的一般方法
        super.run(distance)
    }

    xxx() {
        console.log('xxx()')
    }
}

const snake = new Snake('sn')
snake.run()
// sliding...
// sn run 5m

const horse = new Horse('ho')
horse.run()
// dashing...
// ho run 50m

// 父类型引用指向子类型的实例 ==> 多态
const tom: Animal = new Horse('ho22')
tom.run(122)
// dashing...
// ho22 run 122m

/* 如果子类型没有扩展的方法, 可以让子类型引用指向父类型的实例 */
const tom3: Snake = new Animal('tom3')
tom3.run()  // tom3 run 0m

/* 如果子类型有扩展的方法, 不能让子类型引用指向父类型的实例 */
// const tom2: Horse = new Animal('tom2')  // Error
// tom2.run()
```

这里需要注意的一点就是: <mark>*派生类中声明了`constructor()`的话, 必须在其函数中声明`super()`*</mark>

#### 权限修饰符(public、protected、private)

* public、protected、private的区别

> 默认为 public

在 TypeScript 里，成员都默认为 `public`

你也可以明确的将一个成员标记成 `public`。 我们可以用下面的方式来重写上面的 `Animal` 类

> private

当成员被标记成 `private` 时，它就不能在声明它的类的外部访问。

> protected

`protected` 修饰符与 `private` 修饰符的行为很相似，但有一点不同，`protected`成员在派生类中仍然可以访问。

* 通过代码来查看

```typescript
class Animal {
    public name: string

    public constructor(name: string) {
        this.name = name;
    }

    public run(distance: number = 0) {
        console.log(`Animal run ${distance}m`);
    }
}
class Person extends Animal {
    private age: number = 18;
    protected sex: string = "男";

    run(distance: number = 5) {
        console.log('Person jumping...');
        super.run(distance);
    }
}
class Student extends Person {
    run(distance: number = 6) {
        console.log('Student jumping...');

        console.log(this.sex);  // 子类能访问父类中受保护的成员
        // console.log(this.age);  // 子类不能访问父类的私有成员

        super.run(distance);
    }
}

console.log(new Person('leo').name);  // leo
// console.log(new Person('leo').age);  // 私有不可见
// console.log(new Person('leo').sex);  // 受保护不可见
```

#### readonly 修饰符

你可以使用 `readonly` 关键字将属性设置为只读的。 只读属性<mark>必须在声明时或构造函数里被初始化, </mark>不然就会报错

```typescript
class Person {
    // 声明一个只读属性, 并设置初值 leo
    readonly name: string = 'leo';
    constructor(name: string) {
        this.name = name
    }
}

let john = new Person('John');
console.log(john);  // Person {name: 'John'}

// 试图修改只读属性
// john.name = 'peter' // error
```

##### 参数属性

在上面的例子中，我们必须在 `Person` 类里定义一个只读成员 `name` 和一个参数为 `name` 的构造函数，并且立刻将 `name` 的值赋给 `this.name`，这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 `Person` 类的修改版，使用了参数属性：

```typescript
class Person2 {
    constructor(readonly name: string) {
    }
}

const p = new Person2('jack')
console.log(p.name)  // jack
```

#### 存取器

`TypeScript` 支持通过 `getters/setters` 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

```typescript
class Person {
    firstName: string = 'A'
    lastName: string = 'B'
    get fullName() {
        return this.firstName + '-' + this.lastName
    }
    set fullName(value) {
        const names = value.split('-')
        this.firstName = names[0]
        this.lastName = names[1]
    }
}

const p = new Person()
console.log(p.fullName)  // A-B

p.firstName = 'C'
p.lastName =  'D'
console.log(p.fullName)  // C-D

p.fullName = 'E-F'
console.log(p.firstName, p.lastName)  // E F
```

#### 静态属性

之前讨论的都是类实例属性. 我们可以通过给属性添加`static`, 使其成为类的静态属性. 这样的属性只能通过类访问.

```typescript
class Person {
    name1: string = "A";
    static name2: string = "B";
}

console.log(new Person().name1);
// console.log(new Person().name2);  // Error

console.log(Person.name2);
// console.log(Person.name1);  // Error
```

#### 抽象类

1. 不能实例化抽象类
2. 抽象类可以包含未实现的抽象方法
3. 实现类需要实现父类的抽象方法

```typescript
// 抽象类 (abstract class)
abstract class Animal {
    // 这里需要定义返回类型
    abstract cry(): void;
    run() {
        console.log('run')
    }
}

// 实现类
class Dog extends Animal {
    cry() {
        console.log('Dog cry')
    }
}

const dog = new Dog()
dog.cry()  // Dog cry
dog.run()  // run
```

### 函数

#### 基本使用

在 JS 中我们声明函数用以下两种方式

```js
// 命名函数
function add(x, y) {
  return x + y
}

// 匿名函数
let myAdd = function(x, y) { 
  return x + y;
}
```

#### 函数类型

为上面的函数添加类型:

```typescript
function add(x: number, y: number): number {
    return x + y;
}
let myAdd = function(x: number, y: number): number {
    return x + y;
}
```

书写完整函数类型

```typescript
let myAdd2 : (x: number, y: number) => number = 
function(x: number, y: number) {
    return x + y;
}
```

#### 可选参数和默认参数

1. 实参个数必须与形参个数一致
2. 可以给参数设置默认值
3. 通过 “?” 设置参数为可选

```typescript
function buildName(firstName: string = 'A', lastName?: string): string {
    if (lastName) {
        return firstName + '-' + lastName
    } else {
        return firstName
    }
}

console.log(buildName('C', 'D'))  // C-D
console.log(buildName('C'))   // C
console.log(buildName())   // A
```

#### 剩余参数

剩余参数会将多余的参数放入剩余的参数中, 并设置为数组

```typescript
function foo(x: number, ...args: number[]) {
    console.log(args);
}
foo(11, 22, 33, 44);   // [22, 33, 44]
```

这形式和 ES6 中的 rest 参数用法基本一致

#### 函数重载

函数重载: 函数名相同, 而形参不同的多个函数

在 JS 中, 实参和形参可以不匹配. 所以在 JS 中没有重载的概念. 而对于 TS 这种强类型语言来说是存在的

```typescript
// 重载函数声明, Need state first!!!
function add(x: string, y: string): string
function add(x: number, y: number): number

// 定义函数实现
function add(x: string | number, y: string | number) {
    // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 x + y
    if (typeof x === 'string' && typeof y === 'string') {
        return x + y
    } else if (typeof x === 'number' && typeof y === 'number') {
        return x + y
    }
}

console.log(add(1, 2))
console.log(add('a', 'b'))
// console.log(add(1, 'a')) // error
```

### 泛型

#### 引入

指的是在定义接口、类、函数时, 不预先指定具体的类型, 而在使用的时候再指定具体类型的一种特性。

```typescript
function createArray(value: any, count: number): any[] {
    const arr: any[] = []
    for (let index = 0; index < count; index++) {
        arr.push(value)
    }
    return arr
}

const arr1 = createArray(11, 3)
const arr2 = createArray('aa', 3)
console.log(arr1[0].toFixed(), arr2[0].split(''))  // 11 ['a', 'a']
```

#### 使用泛型

对于前面的代码, 我们可以将使用泛型来进行改造, 将`value`值的类型通过泛型设置, 在调用函数时再传入具体类型

```typescript
function createArray2<T>(value: T, count: number) {
    const arr: Array<T> = []
    for (let index = 0; index < count; index++) {
        arr.push(value)
    }
    return arr
}

const arr3 = createArray2<number>(11, 3)
console.log(arr3[0].toFixed())  // 11
const arr4 = createArray2<string>('aa', 3)
console.log(arr4[0].split(''))  // ['a', 'a']
```

#### 多个泛型参数的函数

一个函数可以定义多个泛型参数

```typescript
function swap<K, V>(a: K, b: V): [K, V] {
    return [a, b]
}
const result = swap<string, number>('abc', 123)
console.log(result[0].length, result[1].toFixed())  // 3 '123'
```

#### 泛型接口

在定义接口时, 为接口中的属性或方法定义泛型类型
在使用接口时, 再指定具体的泛型类型

```typescript
interface IbaseCRUD<T> {
    data: T[]
    add: (t: T) => void
    getById: (id: number) => T
}

class User {
    id?: number; //id主键自增
    name: string; //姓名
    age: number; //年龄

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

class UserCRUD implements IbaseCRUD<User> {
    data: User[] = []

    add(user: User): void {
        user = { ...user, id: Date.now() }
        this.data.push(user)
        console.log('保存user', user.id)
    }

    getById(id: number): User {
        let result = this.data.find(item => item.id === id)
        // 判断是否找到对应的 user, 如果没找到直接返回数组第一个 user 元素, 
        // 因为该函数的返回值必须是 user
        return typeof result == "undefined" ? this.data[0] : result
    }
}

const userCRUD = new UserCRUD()
userCRUD.add(new User('tom', 12))  // 保存user 1651203579705
userCRUD.add(new User('tom2', 13))  // 保存user 1651203579705
console.log(userCRUD.data)  
/* 
    [
        {
            age: 12,
            id: 1651203579705,
            name: "tom"
        },
        {
            age: 13,
            id: 1651203579705,
            name: "tom2"
        }
    ]
*/
```

#### 泛型类

```typescript
class MyClass<T> {
    name: T
    constructor(name: T) {
        this.name = name;
    }
}

let person: MyClass<string> = new MyClass('leo');
console.log(person);  // MyClass {name: 'leo'}
```

#### 泛型约束

如果我们直接对一个泛型参数取 `length` 属性, 会报错, 因为这个泛型根本就不知道它有这个属性

```typescript
// 没有泛型约束
function fn <T>(x: T): void {
  // console.log(x.length)  // error
}
```

我们可以使用泛型约束来实现

```typescript
interface Lengthwise {
  length: number;
}

// 指定泛型约束!!!
function fn2 <T extends Lengthwise>(x: T): void {
  console.log(x.length)
}
```

我们需要传入符合约束类型的值，必须包含必须 `length` 属性：

```typescript
fn2('abc')  // 3
// fn2(123)  // error  number没有length属性
```

### 其他

#### 声明文件

参考: https://www.runoob.com/typescript/ts-ambient.html

#### 内置对象

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

1. ECMAScript 的内置对象

> Boolean
> Number
> String
> Date
> RegExp
> Error 

```typescript
/* 1. ECMAScript 的内置对象 */
let b: Boolean = new Boolean(1)
let n: Number = new Number(true)
let s: String = new String('abc')
let d: Date = new Date()
let r: RegExp = /^1/
let e: Error = new Error('error message')
b = true
// let bb: boolean = new Boolean(2)  // error
```

1. BOM 和 DOM 的内置对象

> Window
> Document
> HTMLElement
> DocumentFragment
> Event
> NodeList

```typescript
const div: HTMLElement | null = document.getElementById('test')
const divs: NodeList = document.querySelectorAll('div')
document.addEventListener('click', (event: MouseEvent) => {
  console.dir(event.target)
})
const fragment: DocumentFragment = document.createDocumentFragment()
```

# Vue3

## 认识Vue3

1. 了解相关信息

- Vue.js 3.0 "One Piece" 正式版在今年9月份发布
- 2年多开发, 100+位贡献者, 2600+次提交, 600+次PR
- **Vue3支持vue2的大多数特性**
- **更好的支持Typescript**

2) 性能提升:

- 打包大小减少41%
- 初次渲染快55%, 更新渲染快133%
- 内存减少54%
- **使用Proxy代替defineProperty实现数据响应式**
- **重写虚拟DOM的实现和Tree-Shaking**

3. 新增特性

- **Composition (组合) API**
- setup
  - ref 和 reactive
  - computed 和 watch
  - 新的生命周期函数
  - provide与inject
  - ...
- 新组件
  - Fragment - 文档碎片
  - Teleport - 瞬移组件的位置
  - Suspense - 异步加载组件的loading界面
- 其它API更新
  - 全局API的修改
  - 将原来的全局API转移到应用对象
  - 模板语法变化

## 创建Vue3项目

### 使用 Vue-Cli

文档: https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create

```bash
## 安装或者升级
npm install -g @vue/cli
## 保证 vue cli 版本在 4.5.0 以上
vue --version
## 创建项目
vue create my-project
```

然后的步骤 ( 此时的 vue cli 为 4.5.14 )

- Please pick a preset - 选择 ***Manually select features***
- Check the features needed for your project - 选择上 ***TypeScript*** ，特别注意点空格是选择，点回车是下一步
- Choose a version of Vue.js that you want to start the project with - 选择 ***3.x (Preview)***
- Use class-style component syntax - 直接回车
- Use Babel alongside TypeScript - 直接回车
- Pick a linter / formatter config - 直接回车
- Use history mode for router? - 直接回车
- Pick a linter / formatter config - 直接回车
- Pick additional lint features - 直接回车
- Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
- Save this as a preset for future projects? - 直接回车

### 使用Vite创建

- 文档: https://v3.cn.vuejs.org/guide/installation.html
- vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，
- 它做到了***本地快速开发启动***, 在生产环境下基于 Rollup 打包。
  - 快速的冷启动，不需要等待打包操作；
  - 即时的热模块更新，替换性能和模块数量的解耦让更新飞起；
  - 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变。

```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

## Composition API

### Composition API 常用部分

#### setup

* 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次

* 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用

  ```vue
  <template>
    <div>哈哈, 我又tm帅了</div>
  
    <!-- 页面显示 10 -->
    <div>{{ num }}</div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "App",
    components: {},
    setup(props) {
      console.log("i'm coming!!");
      const num = 10;
      return {
        num,
      };
    },
  });
  </script>
  
  <style>
  </style>
  ```

#### setup细节

##### setup 的执行时机

1. 在`beforeCreate`之前执行, 此时的组件对象还没有创建
2. 由于当前组件对象还未创建, 所以在`setup`中调用`this`返回`undefined`, 故不能通过`this`来访问`data/computed/methods /props`
3. 其实所有的`composition API`相关回调函数中也都不可以

具体代码: 

`/components/Child.vue`

```vue
<template>
  <h3>Child 子级组件</h3>
  <div>子级组件message: {{ message }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child",
  props: ["message"],
  beforeCreate() {
    console.log("beforeCreate执行了");
  },
  // Vue完成挂载, 在这之前 DOM 渲染完成
  mounted() {
    console.log("mounted执行了");
  },
  /* 
    1. setup 在 beforeCreate 之前调用
    2. setup 执行时, 当前组件还未创建, 所以此时调用 this 为 undefined
  */
  setup() {
    console.log(this);  // undefined
    console.log("setup执行了");
    return {};
  },
});
</script>

<style>
</style>
```

##### setup 的返回值

* 返回一个对象: 为模版提供数据, 可直接使用返回对象的属性和方法
* setup 返回的对象中的属性和 data 中的属性组合成为组件对象的属性
* setup 返回的方法和 methods 返回的方法合并成为组件对象的方法; **如果有重名, setup优先**
* 一般不要混合使用: methods 中可以访问 setup 提供的属性和方法, 但在 setup 方法中不能访问 data 和 methods
* setup 不能是一个 async 函数 (**暂时在这里**, 但是当和 `<Suspense></Suspense>`一起使用设置异步组件时, 需要 setup 设置为 async 函数 ) : 因为返回值不再是 return 的对象, 而是 promise, 模板就看不到 return 对象中的属性数据

实例代码

`/components/Child.vue`

```vue
<template>
  <h3>Child 子级组件</h3>
  <div>子级组件message: {{ message }}</div>
  <div>{{ count }}</div>
  <button @click="showMsg">showMsg</button>
  <button @click="showMsg2">showMsg2</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child",
  props: ["message"],
  setup() {
    console.log(this); // undefined
    // 报错, 因为连this都访问不到, 更访问不到 data 中的属性
    // console.log(this.count); 

    console.log("setup执行了");
    // setup 中定义的属性
    const job = "great job";
    function showMsg2() {
      console.log(this.count); // 10
      console.log("setup中showMsg2的方法");
    }
    return {
      job,
      showMsg2,
    };
  },
  data() {
    return {
      count: 10,
    };
  },
  methods: {
    showMsg() {
      console.log(this.job);  // great job
      console.log("methods中showMsg的方法");
    },
  },
});
</script>

<style>
</style>
```

##### setup 的参数

> 形式: `setup(props, context) / setup(props, {attrs, slots, emit})`

其中的参数:

* props: 包含子组件中 props 配置声明且传入了的所有属性的对象
* attrs: 包含父组件中传入的, 但未在 props 配置中声明的属性, 相当于 this.$attrs
* emit: 用来分发自定义事件的函数( 实现子父组件的通信  ), 相当于 this.$emit
* slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots

具体代码

`App.vue`

```vue
<template>
  <h3>App 父级组件</h3>
  <div>msg: {{msg}}</div>
  <hr>
  <child :message='msg' other='其他的属性' @process="processTap"></child>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// 引入子级组件
import Child from './components/Child.vue'
export default defineComponent({
  name: "App",
  components: {
    Child
  },
  setup() {
    const msg = ref('what are you doing?');
    // 定义事件回调
    const processTap = (txt: string) => {
      console.log('执行 processTap 方法');
      // 在子组件分发(emit)时, 传递过来的参数
      console.log(txt);
    }
    return {
      msg,
      processTap
    }
  }

});
</script>

<style>
</style>
```

`/components/Child.vue`

```vue
<template>
  <h3>Child 子级组件</h3>
  <div>子级组件message: {{ message }}</div>
  <button @click="emitTap">分发事件</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child",
  props: ["message"],
  setup(props, { attrs, emit }) {
    function emitTap() {
      /* 
        包含 props 配置声明且传入的属性的一个Proxy对象
      */
      console.log(props); // Proxy {message: 'what are you doing?'}

      /* 
        包含父组件中传入的, 但未在 props 配置中声明的属性
      */
      console.log(attrs); // Proxy {other: '其他的属性', __vInternal: 1}
      // 点击按钮的回调函数
      // 实现子父组件的通信
      emit("process", "传递的参数");
    }
    return {
      emitTap,
    };
  },
});
</script>

<style>
</style>
```

#### ref

作用: 定义一个数据的响应式

使用: `const count = ref(10);`定义了一个初始值为 10, 返回值为 Ref 对象(该对象携带 value 属性), 并赋值给 count

> 实现一个需求: 通过点击页面上的按钮, 使数据发生变化

vue2中: 

```vue
<template>
  <div>{{count}}</div>
  <button @click="updateCount">增大</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      // 设置变量
      count: 0
    }
  }, 
  methods: {
    // 通过点击事件改变data中的变量
    updateCount() {
      this.count++;
    }
  }
});
</script>

<style>
</style>
```

vue3中: 

通过使用`ref`, 让数据变成响应式

文档: https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E5%B8%A6-ref-%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8F%98%E9%87%8F

```vue
<template>
  <div>{{count}}</div>
  <button @click="updateCount">增大</button>
</template>

<script lang="ts">
// 添加 ref 的引用
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    // 定义变量, 用 ref 接收初始值, 并返回一个带有 value 属性的对象
    // count 的类型是 Ref 类型
    let count = ref(0);
    // 定义方法
    function updateCount() {
      count.value++;
    }
    // 返回对象
    return {
      count, 
      updateCount
    }
  }

});
</script>

<style>
</style>
```

在`setup()`方法中打印`count`, 会打印出一个带有`value`的对象

```js
RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 0, _value: 0}
```

<mark>`ref`一般用来定义一个基本类型的响应式数据</mark>

#### reactive

作用: 定义多个数据的响应式

使用: `const proxy = reactive(obj):` 接收一个普通对象然后返回该普通对象的响应式代理器对象

> 实现一个需求: 显示用户的相关信息, 点击按钮, 可以更新用户的相关信息数据

```vue
<template>
  <div>reactive的使用</div>
  <h3>名字:{{ user.name }}</h3>
  <h3>年龄:{{ user.age }}</h3>
  <h3>性别:{{ user.gender }}</h3>
  <h3>媳妇:{{ user.wife }}</h3>
  <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
// 添加 ref 的引用
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    // 把复杂数据变成响应式数据
    /* 
      返回的是一个 Proxy 代理对象(user), 被代理的目标对象就是参数传入的对象(obj)
    */
    let obj = {
      name: "小明",
      age: 20,
      wife: {
        name: "小甜甜",
        age: 18,
        cars: ["奔驰", "奥迪", "宝马"],
      },
    };
    const user = reactive(obj);
    console.log(user);

    const updateUser = () => {
      // 直接使用目标对象(obj)的方式来更新数据, 不会起效果, 
      // 只能使用代理对象(user)的方式来更新数据(响应式数据)
      user.name = "小刚炮";
      user.age += 2;
      user.wife.name = "大甜甜";
      user.wife.cars[0] = "玛莎拉蒂";

      /* 
        这里进行添加和删除属性的操作时, 要给reactive方法设置any泛型
        const user = reactive<any>(obj);
      */
      // user.gender = '男';  
      // delete user.age;
    };

    return {
      user,
      updateUser,
    };
  },
});
</script>

<style>
</style>
```

#### reactive 和 ref 细节问题

* <mark>`ref`中也可以传递对象或者数组; 注意在更新数据时要带上`.value`</mark>; 因为如果用 ref 处理对象或数组, 内部会自动将对象或数组转换为 reactive 的代理对象

> 对比 reactive 和 ref 内部实现

- ref 内部: 通过给 value 属性添加 `getter/setter` 来实现对数据的劫持
- reactive 内部: 通过使用 Proxy 来实现对对象内部所有数据的劫持, 并通过 Reflect 操作对象内部数据

代码实现:

```vue
<template>
  <h3>reactive 和 ref 的细节问题</h3>
  <hr>
  <h3>m1: {{ m1 }}</h3>
  <h3>m2: {{ m2 }}</h3>
  <h3>m3: {{ m3 }}</h3>
  <hr>
  <button @click="updateData">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // 通过 ref 方式设置数据
    const m1 = ref(10);
    const m2 = reactive({
      name: "leo",
      wife: {
        name: "小红",
        age: 20,
      },
    });
    /* 
      在 ref 中如果也传入 对象/数组, 内部会自动将其转为 reactive 的代理对象
    */
    const m3 = ref({
      name: "leo",
      wife: {
        name: "小红",
        age: 20,
      },
    });
    // 设置更新函数
    function updateData() {
      // 更新 m1 中的基本数据
      m1.value += 10;
      // 更新 m2 中的数据
      m2.name = '马化腾';
      m2.wife.name = '村村小花';

      // 会自动将其转为 reactive 的代理对象, 进行处理
      console.log(m3.value);  // Proxy {name: 'leo', wife: {…}}
      // 更新 m3 中数据
      m3.value.name = '李彦宏';
      m3.value.wife.name = '中华小月';
    }

    return {
      m1,
      m2,
      m3,
      updateData
    };
  },
});
</script>

<style>
</style>
```

#### <mark>比较Vue2和Vue3的响应式(重要)</mark>

##### Vue2响应式

> 核心

通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)

```js
Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})
```

> 问题

1. 对象直接新添加的属性或删除已有属性, 界面不会自动更新
2. 对于数组, 直接通过下标替换元素或更新length, 界面不会自动更新 `arr[1] = {}`

##### Vue3响应式

> 核心

1. 通过 Proxy (代理): 拦截对`target`的任意属性的(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
2. 通过 Reflect (反射): 动态对被代理对象的相应属性进行特定的操作

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        // 目标对象
        const user = {
            name: 'leo',
            age: 21,
            wife: {
                name: 'tina',
                age: 19
            }
        };

        /* 
            参数一: target, 目标对象
            参数二: handler, 处理器对象, 用来监视数据与数据的操作
        */
        const proxyUser = new Proxy(user, {
            // 获取目标对象的某个属性
            get(target, prop) {
                console.log('get方法被调用了');
                // 这里需要返回反射对象
                return Reflect.get(target, prop);
            },
            // 修改目标对象的属性值 或 为目标对象添加新属性
            set(target, prop, val) {
                console.log('set方法调用了');
                return Reflect.set(target, prop, val);
            },
            // 删除目标对象的某个属性
            deleteProperty(target, prop) {
                console.log('deleteProperty方法调用了');
                return Reflect.deleteProperty(target, prop);
            }
        });

        console.log(proxyUser.name);  // leo
        // 通过代理对象修改目标对象的name属性
        proxyUser.name = 'tom';
        // 通过代理对象为目标对象添加的gender属性
        proxyUser.gender = '男';
        // 通过代理对象删除目标对象的age属性
        delete proxyUser.age;
        // 通过代理对象更新目标对象的某个引用属性的属性值
        proxyUser.wife.name = '小甜甜';

    </script>
</body>
</html>
```

#### 计算属性和监视

- computed 函数:
  - 与 computed 配置功能一致
  - 直接设置 getter
  - 设置 getter 和 setter

- watch 函数

  - 与 watch 配置功能一致

  - 监视指定的**一个或多个**响应式数据, 一旦数据变化, 就自动执行监视回调

  - 当我们使用 watch 监视非响应式数据, 就需要写为回调形式

    ```js
    // 回调形式
    watch([() => user.firstName, () => user.lastName], () => {
      console.log('----');
    })
    
    // 非回调形式: 因为 user.firstName 和 user.lastName 为非响应式, 所以不起作用
    watch([user.firstName, user.lastName], () => {
      console.log('----');
    })
    ```

  - 默认初始时不执行回调, 但可以通过配置 immediate 为 true, 来指定初始时立即执行第一次

  - 通过配置 deep 为 true, 来指定深度监视

- watchEffect 函数
  - 不用直接指定要监视的数据, 回调函数中使用的哪些**响应式数据**就监视哪些响应式数据
  - 默认初始时就会执行第一次, 从而可以收集需要监视的数据
  - 监视数据发生变化时回调

具体代码: 

```vue
<template>
  <h3>计算属性和监视</h3>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏:
    <input type="text" placeholder="请输入姓氏" v-model="user.firstName" />
    <br />
    名字:
    <input type="text" placeholder="请输入名字" v-model="user.lastName" />
    <br />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名: <input type="text" placeholder="请输入姓名" v-model="fullName1" />
    <br />
    姓名: <input type="text" placeholder="请输入姓名" v-model="fullName2" />
    <br />
    姓名: <input type="text" placeholder="请输入姓名" v-model="fullName3" />
    <br />
  </fieldset>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    // 定义一个响应式对象
    const user = reactive({
      firstName: "东方",
      lastName: "不败",
    });

    /* 
      返回的是一个 Ref 类型的对象
        - 这里相当于只设置了 get 方法
     */
    const fullName1 = computed(() => {
      return user.firstName + "-" + user.lastName;
    });
    // 实现 get 和 set
    const fullName2 = computed({
      get() {
        return user.firstName + "-" + user.lastName;
      },
      set(val: string) {
        const names = val.split("-");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });
    /* 
      使用监视
      watch 的第三个参数(对象): 
      - immediate: true 设置先执行一次
      - deep: true 深度监视
    */
    const fullName3 = ref("");
    watch(
      user,
      ({ firstName, lastName }) => {
        fullName3.value = firstName + "-" + lastName;
      },
      { immediate: true, deep: true }
    );

    // 监视: 这个监视默认执行一次
    // watchEffect(() => {
    //   fullName3.value = user.firstName + '-' + user.lastName;
    // })

    watchEffect(() => {
      const names = fullName3.value.split("-");
      user.firstName = names[0];
      user.lastName = names[1];
    });

    // 当我们使用 watch 监视非响应式数据(user.firstName, user.lastName)
    // 的时候, 需要设置为回调
    watch([() => user.firstName, () => user.lastName], () => {
      console.log('----');
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    };
  },
});
</script>

<style>
</style>
```

#### 生命周期

> Vue2 生命周期

具体看图: https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA

> Vue3 生命周期

具体看图: https://v3.cn.vuejs.org/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA

> **与 2.x 版本生命周期相对应的组合式 API**

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`

> 总结: Vue3 和对应的 Vue2 生命周期比, Vue3 的先执行

`App.vue`

```vue
<template>
  <h2>App父级组件</h2>
  <button @click="toggleShow">切换显示子组件</button>
  <child v-if="isShow"></child>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Child from './components/Child.vue';
export default defineComponent({
  name: "App",
  components: {
    Child
  },
  setup() {
    let isShow = ref(true);
    const toggleShow = () => {
      isShow.value = !isShow.value;
    }
    return {
      isShow,
      toggleShow
    };
  },
});
</script>

<style>
</style>
```

`/components/Child.vue`

```vue
<template>
<div class="about">
  <h2>msg: {{msg}}</h2>
  <hr>
  <button @click="update">更新</button>
</div>
</template>

<script lang="ts">
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted, 
  onBeforeMount, 
  onBeforeUpdate,
  onBeforeUnmount
} from "vue"

export default {
  beforeCreate () {
    console.log('beforeCreate')
  },

  created () {
    console.log('created')
  },

  beforeMount () {
    console.log('beforeMount')
  },

  mounted () {
    console.log('mounted')
  },

  beforeUpdate () {
    console.log('beforeUpdate')
  },

  updated () {
    console.log('updated')
  },

  beforeUnmount () {
    console.log('beforeUnmount')
  },

  unmounted () {
     console.log('unmounted')
  },
  

  setup() {
    console.log('3.0中的 setup');
    
    const msg = ref('abc')

    const update = () => {
      msg.value += '--'
    }

    onBeforeMount(() => {
      console.log('--onBeforeMount')
    })

    onMounted(() => {
      console.log('--onMounted')
    })

    onBeforeUpdate(() => {
      console.log('--onBeforeUpdate')
    })

    onUpdated(() => {
      console.log('--onUpdated')
    })

    onBeforeUnmount(() => {
      console.log('--onBeforeUnmount')
    })

    onUnmounted(() => {
      console.log('--onUnmounted')
    })
    
    return {
      msg,
      update
    }
  }
}
</script>
```

#### 自定义 hook 函数

- 使用Vue3的组合API封装的可复用的功能函数
- 自定义hook的作用类似于vue2中的mixin技术
- 自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂

> 需求1: 用户在页面中点击页面, 把点击的位置的横纵坐标收集起来并展示出来

`hooks/useMousePosition.ts`

```typescript
import { onBeforeUnmount, onMounted, ref } from "vue";

export default function() {
    const x = ref(-1);
    const y = ref(-1);

    // 点击事件回调
    const clickHandler = (event: MouseEvent) => {
      x.value = event.pageX;
      y.value = event.pageY;
    }
    onMounted(() => {
      window.addEventListener('click', clickHandler);
    })
    onBeforeUnmount(() => {
      window.removeEventListener('click', clickHandler);
    })

    return {
        x,
        y
    }
}
```

`App.vue`

```vue
<template>
  <h2>自定义hook函数</h2>
  <h2>x: {{x}}, y: {{y}}</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useMousePosition from "./hooks/useMousePosition"
export default defineComponent({
  name: "App",
  setup() {
    const {x, y} = useMousePosition();
    return {
      x,
      y
    };
  },
});
</script>

<style>
</style>
```

> 需求2: 封装发ajax请求的hook函数

`/hooks/useRequest.ts`

```typescript
import axios from 'axios'
import { ref } from 'vue'
// 发送ajax的请求
export default function<T>(url: string) {
    const loading = ref(true)
    const data = ref<T | null>(null)
    const errorMsg = ref('')
    axios.get(url)
        .then(response => {
            loading.value = false
            data.value = response.data
        })
        .catch(e => {
            loading.value = false
            errorMsg.value = e.message || '未知错误'
        })
    return {
        loading,
        data,
        errorMsg
    }
}
```

`App.vue`

```vue
<template>
  <h2>自定义hook函数</h2>
  <h3 v-if="loading">正在加载中...</h3>
  <h3 v-else-if="errorMsg">错误信息: {{ errorMsg }}</h3>
  <!-- <h3 v-else>
    <li>id: {{ data.id }}</li>
    <li>address: {{ data.address }}</li>
    <li>distance: {{ data.distance }}</li>
  </h3> -->

  <ul v-for="p in data" :key="p.id">
    <li>id: {{ p.id }}</li>
    <li>title: {{ p.title }}</li>
    <li>price: {{ p.price }}</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import useRequest from "./hooks/useRequest";

// 定义接口, 约束对象的类型
interface Address {
  id: string;
  address: string;
  distance: string;
}
interface Product {
  id: string;
  title: string;
  price: number;
}

export default defineComponent({
  name: "App",
  setup() {
    // 返回对象数据
    // const { loading, data, errorMsg } = useRequest<Address>("/data/address.json");
    
    // 返回数组数据
    const { loading, data, errorMsg } = useRequest<Product[]>("/data/product.json");

    watch(data, () => {
      if (data.value) {
        console.log(data.value.length) // 有提示
      }
    })
    
    return {
      loading,
      data,
      errorMsg,
    };
  },
});
</script>

<style>
</style>
```

#### toRefs

把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref

应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用

问题: reactive 对象取出的所有属性值都是非响应式的

解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性

```vue
<template>
  <h2>App</h2>
  <h3>foo: {{foo}}</h3>
  <h3>bar: {{bar}}</h3>
  <h3>foo2: {{foo2}}</h3>
  <h3>bar2: {{bar2}}</h3>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
/*
toRefs:
  将响应式对象中所有属性包装为ref对象, 并返回包含这些ref对象的普通对象
  应用: 当从合成函数返回响应式对象时，toRefs 非常有用，
        这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
*/
export default {
  setup () {
    const state = reactive({
      foo: 'a',
      bar: 'b',
    })
    const stateAsRefs = toRefs(state)
    setTimeout(() => {
      state.foo += '++'
      state.bar += '++'
    }, 2000);
    const {foo2, bar2} = useReatureX()
    return {
      // 这样结构出来的不是响应式  => {foo: 'a', bar: 'b'}, 需要使用 toRefs
      // ...state,  
      ...stateAsRefs,
      foo2, 
      bar2
    }
  },
}

function useReatureX() {
  const state = reactive({
    foo2: 'a',
    bar2: 'b',
  })
  setTimeout(() => {
    state.foo2 += '++'
    state.bar2 += '++'
  }, 2000);
  return toRefs(state)
}

</script>
```

#### ref 获取元素

利用 ref 函数获取组件中的标签元素

功能需求: 让输入框自动获取焦点

```vue
<template>
  <h2>ref的另外一个作用</h2>
  <input type="text" ref="inputRef">
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
export default {
  setup () {
    // 获取页面中 ref 为 inputRef 的 input 标签
    const inputRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      inputRef.value && inputRef.value.focus()  // 自动获取焦点
    })
    return {
      inputRef
    }
  },
}
</script>
```

### Composition API 其他部分

#### shallowReactive 与 shallowRef

- shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)
- shallowRef: 只处理了 value 的响应式, 不进行对象的 reactive 处理

> 问题: 什么时候用浅响应式呢?

- 一般情况下使用 ref 和 reactive 即可
- 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
- 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef

```vue
<template>
  <h2>App</h2>

  <h3>m1: {{ m1 }}</h3>
  <h3>m2: {{ m2 }}</h3>
  <h3>m3: {{ m3 }}</h3>
  <h3>m4: {{ m4 }}</h3>

  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, ref, shallowReactive, shallowRef } from "vue";
export default {
  setup() {
    const m1 = reactive({ a: 1, b: { c: 2 } });
    const m2 = shallowReactive({ a: 1, b: { c: 2 } });

    const m3 = ref({ a: 1, b: { c: 2 } });
    const m4 = shallowRef({ a: 1, b: { c: 2 } });

    const update = () => {
      // m1.b.c += 1
      // m2.b.c += 1  // 无效

      // m3.value.a += 1
      m4.value.a += 1   // 无效
    };

    return {
      m1,
      m2,
      m3,
      m4,
      update,
    };
  },
};
</script>
```

#### readonly 与 shallowReadonly

- readonly:
  - 深度只读数据
  - 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
  - 只读代理是深层的：访问的任何嵌套 property 也是只读的。
- shallowReadonly
  - 浅只读数据
  - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
- 应用场景:
  - 在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

```vue
<template>
  <h2>App</h2>
  <h3>{{state}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, readonly, shallowReadonly } from 'vue'

export default {
  setup () {
    const state = reactive({
      a: 1,
      b: {
        c: 2
      }
    })
    // 深度只读
    // const rState1 = readonly(state)

    // 浅只读
    const rState2 = shallowReadonly(state)
    const update = () => {
      // rState1.a++ // error
      // rState1.b.c++ // error

      // rState2.a++ // error
      rState2.b.c++
    }
    return {
      state,
      update
    }
  }
}
</script>
```

####  toRaw 与 markRaw

- toRaw: 将代理对象转为普通对象(没有响应式了), 数据发生变化, 界面也不变化

- markRaw: 标记一个对象，使其永远不会转换为代理。返回对象本身

- 应用场景:
  - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
  - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。

```vue
<template>
  <h2>{{state}}</h2>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
/* 
toRaw: 得到reactive代理对象的目标数据对象
*/
import {
  markRaw,
  reactive, toRaw,
} from 'vue'
export default {
  setup () {
    const state = reactive<any>({
      name: 'tom',
      age: 25,
    })

    const testToRaw = () => {
      /* 
        将代理对象专为普通对象(没有响应式了), 
        数据发生变化, 界面也不变化
      */
      const user = toRaw(state)
      user.age++  // 界面不会更新
    }

    const testMarkRaw = () => {
      const likes = ['a', 'b']
      // 直接在 state 上添加 likes, 这个为响应式
      // state.likes = likes

      // 使用 markRaw, likes数组就不再是响应式的了
      state.likes = markRaw(likes) 
      setTimeout(() => {
        state.likes[0] += '--'   // 由于使用了 markRaw 这里不起效果
        console.log('定时器走起来...');
      }, 1000)
    }

    return {
      state,
      testToRaw,
      testMarkRaw,
    }
  }
}
</script>
```

#### toRef

为源响应式对象上的某个属性创建一个 ObjectRefImpl 对象, 二者内部操作的是同一个数据值, 更新时二者是同步的

> toRef 和 ref 区别

* toRef 操作的属性会和 state 同步更新
* ref 操作的属性不会同步更新, 相当于拷贝了一份新数据, 单独操作

`App.vue`

```vue
<template>
  <h2>App</h2>
  <p>{{state}}</p>
  <p>{{foo}}</p>
  <p>{{foo2}}</p>
  <button @click="update">更新</button>
  <Child :foo="foo"/>
</template>

<script lang="ts">
import {
  reactive,
  toRef,
  ref,
} from 'vue'
import Child from './components/Child.vue'

export default {
  setup () {
    const state = reactive({
      foo: 1,
      bar: 2
    })
    /* 
      区别: 
      - toRef 操作的属性会和 state 同步更新
      - ref 操作的属性不会同步更新, 相当于拷贝了一份新数据, 单独操作
    */
    // 把响应式数据 state 中的 foo 属性 变成了 ref 对象
    const foo = toRef(state, 'foo')  // ObjectRefImpl {_object: Proxy, _key: 'foo', _defaultValue: undefined, __v_isRef: true}
    // 把响应式对象中的 foo 属性使用 ref 包装, 变成了一个 ref 对象
    const foo2 = ref(state.foo)  // RefImpl {__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 1, _value: 1}
    
    const update = () => {
      state.foo++  // foo和state中的数据同步更新
      // foo.value++  // // foo和state中的数据同步更新

      // foo2.value++  // foo和state中的数据不会更新
    }
    return {
      state,
      foo,
      foo2,
      update,
    }
  },
  components: {
    Child
  }
}
</script>
```

`/Components/Child.vue`

```vue
<template>
  <h2>Child</h2>
  <h3>{{ foo }}</h3>
  <h3>{{ length }}</h3>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from "vue";

const component = defineComponent({
  props: {
    foo: {
      type: Number,
      require: true, // 必须传
    },
  },
  // props 本身就是一个响应式对象!!
  setup(props) {
    /* 
      props => Proxy {foo: 1}
      props.foo => 1
      toRef(props, "foo") => ObjectRefImpl {_object: Proxy, _key: 'foo', _defaultValue: undefined, __v_isRef: true}
    */
    const length = useFeatureX(toRef(props, "foo"));
    return {
      length,
    };
  },
});

// 别人定义的 hook 函数: 参数为 Ref 类型对象
function useFeatureX(foo: Ref) {
  const lenth = computed(() => foo.value.toString().length);
  return lenth;
}

export default component;
</script>
```

#### customRef

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
- 需求: 使用 customRef 实现 debounce 的示例

```vue
<template>
  <h2>App</h2>
  <input v-model="keyword" placeholder="搜索关键字" />
  <p>{{ keyword }}</p>
</template>

<script lang="ts">
import { customRef } from "vue";

export default {
  setup() {
    const keyword = useDebouncedRef("", 1800);
    console.log(keyword);
    return {
      keyword,
    };
  },
};

/* 
实现函数防抖的自定义ref
*/
function useDebouncedRef<T>(value: T, delay = 200) {
  let timerId: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    };
  });
}
</script>
```

#### provide 与 inject

心得: **在我实际使用中, 发现如果使用`const arr = inject("key");`此时的`arr`变量虽然是`Proxy`类型, 但在操作过程中很容易覆盖其`arr`的值, 但是没有操作到最原始的数据值, 而留下数据隐患. 建议在实现祖到孙的传递时, 可将方法定义在祖先中, 然后依次传递方法到孙子中, 然后再在孙子中调用其方法**

- provide`和`inject`提供依赖注入，功能类似 2.x 的`provide/inject
- 实现跨层级组件(祖孙)间的通信

`App.vue`

```vue
<template>
  <h1>父组件</h1>
  <p>当前颜色: {{color}}</p>
  <button @click="color='red'">红</button>
  <button @click="color='yellow'">黄</button>
  <button @click="color='blue'">蓝</button>
  
  <hr>
  <Son />
</template>

<script lang="ts">
import { provide, ref } from 'vue'
/* 
- provide` 和 `inject` 提供依赖注入，功能类似 2.x 的 `provide/inject
- 实现跨层级组件(祖孙)间通信
*/

import Son from './Son.vue'
export default {
  name: 'ProvideInject',
  components: {
    Son
  },
  setup() {
    const color = ref('red')
    // 传递 color 这个响应式 Ref 类型对象
    provide('color', color)
    return {
      color
    }
  }
}
</script>
```

`/components/Son.vue`

```vue
<template>
  <div>
    <h2>子组件</h2>
    <hr>
    <GrandSon />
  </div>
</template>

<script lang="ts">
import GrandSon from './GrandSon.vue'
export default {
  components: {
    GrandSon
  },
}
</script>
```

`/components/GrandSon.vue`

```vue
<template>
  <h3 :style="{color}">孙子组件: {{color}}</h3>
</template>

<script lang="ts">
import { inject } from 'vue'
export default {
  setup() {
    // 使用 inject 接收来自 provide 提供的数据
    const color = inject('color')
    return {
      color
    }
  }
}
</script>
```

#### 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

### 手写组合API

#### 手写 shallowReactive 与 reactive

```js
/* 
    手写shallowReactive(浅的劫持)与reactive(深的劫持)
*/
// 定义处理对象
const reactiveHandler = {
    // 拦截获取属性值
    get(traget, prop) {
        const result = Reflect.get(traget, prop)
        console.log(result)
        return result
    },
    // 拦截修改属性值或者添加属性值
    set(target, prop, value) {
        const result = Reflect.set(target, prop, value)
        console.log(result);
        return result
    },
    // 拦截删除某个属性
    deleteProperty(traget, prop) {
        const result = Reflect.deleteProperty(traget, prop)
        console.log(result);
        return result
    }
}

// 定义一个shallowReactive函数, 传入一个目标对象
function shallowReactive(target) {
    if(target && typeof target === 'object') {
        return new Proxy(target, reactiveHandler);
    }
    // 传入基本数据类型, 直接返回
    return target;
}

// 定义一个reactive函数, 传入一个目标对象
function reactive(target) {
    if(target && typeof target === 'object') {
        // 对数组或者对象中所有的数据进行reactive的递归处理
        if(Array.isArray(target)) {
            Array.forEach((item, index) => {
                target[index] = reactive(item)
            })
        }else {
            // 如果是对象
            Object.keys(target).forEach(key => {
                target[key] = reactive(target[key])
            })
        }
        return new Proxy(target, reactiveHandler);
    }
    // 传入基本数据类型, 直接返回
    return target;
}

/* 
    验证手写内容
*/
const proxyUser1 = shallowReactive({
    name: "小明",
    car: {
        color: 'red'
    }
})
// 拦截到读和写的数据  
proxyUser1.name += '小红'
// 拦截到读数据, 但是没有拦截写数据
// proxyUser1.car.color += '!!!'
// 拦截到删除属性数据
// delete proxyUser1.name
// 拦截到了car属性的读, 拦截不到删除属性数据
// delete proxyUser1.car.color

const proxyUser2 = reactive({
    name: "小明",
    car: {
        color: 'red'
    }
})
// 拦截到读和写数据
// proxyUser2.name += '小红'
// 拦截到读和写数据
// proxyUser2.car.color = '!!!'
// 拦截到读car对象, 读color属性; 拦截到写数据
// proxyUser2.car.color += '!!!'
// 拦截到删除数据
// delete proxyUser2.name
// 拦截到读和删除数据
// delete proxyUser2.car.color
```

#### 手写 shallowRef 与 ref

```js
// 定义一个shallowRef函数
function shallowRef(target) {
    return {
        // 把 target 数据保存起来
        _value: target,
        get value() {
            console.log('劫持到读数据')
            return this._value
        },
        set value(val) {
            console.log('劫持到修改数据, 准备更新界面')
            this._value = val
        },
    }
}

// 定义一个ref函数
function ref(target) {
  	// 和 shallowRef 的区别
    target = reactive(target)
    return {
        // 把 target 数据保存起来
        _value: target,
        get value() {
            console.log('劫持到读数据')
            return this._value
        },
        set value(val) {
            console.log('劫持到修改数据, 准备更新界面')
            this._value = val
        },
    }
}

const ref1 = shallowRef({
    name: "Leo",
    car: {
        color: 'blue'
    }
})
// console.log(ref1.value);
// 劫持到读数据
// {name: 'Leo', car: {…}}

// ref1.value = "new Vlaue"
// 劫持到修改数据, 准备更新界面

// 这里劫持不到修改数据, 只能劫持到读取数据
// ref1.value.car = "new Car Vlaue"  // 劫持到读数据

const ref2 = ref({
    name: "Leo",
    car: {
        color: 'blue'
    }
})
// console.log(ref2.value)
// 劫持到读数据
// {name: 'Leo', car: Proxy}

// ref2.value = "ref2 new Vlaue"  
// 劫持到修改数据, 准备更新界面

// ref2.value.car = "ref2 new Car Vlaue"
// 劫持到读数据
// true (reactive 中的 set() 拦截)
```

参考: https://24kcs.github.io/vue3_study/chapter4/03_%E6%89%8B%E5%86%99%E7%BB%84%E5%90%88API.html#_1-shallowreactive-%E4%B8%8E-reactive

## 其它新组合和API

参考: https://24kcs.github.io/vue3_study/chapter5/01_%E6%96%B0%E7%BB%84%E4%BB%B6.html#_1-fragment-%E7%89%87%E6%96%AD

## Vue2 和 Vue3 的联系与区别

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h20uuz1rtkj21l20c8dip.jpg)

### Composition API VS Option API

- 在传统的Vue OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 ，滚动条反复上下移动

#### Option API

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image)

#### Compisition API

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image)

#### 综合对比

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h20uy0n8nuj20u00u1jsx.jpg)

参考: https://24kcs.github.io/vue3_study/chapter4/04_Composition%20VS%20Option.html

# ES8

## `String.padStart()`和`String.padEnd()`

Noted: 将字符串用指定字符串填充到指定长度 (可从字符串前面或者尾部)

```js
// if you don't pass the second parameter, a space string(it's " ", not "") passed in by default
let product_cost = "2089".padStart(6);  
console.log(product_cost);   //   2089(there are two blank space in front)
console.log(product_cost.length);  // 6
console.log(product_cost === "  2089");  // true

/*
    test second paramter type:
    1. number     87 => "87"
    2. string     "GTR" => "GTR"
    3. boolean    true => "true"
    4. null       null => "null"
    5. undefined  undefined => same effect with don't pass the second paramter
*/
let product_str = "bar".padStart(8, true);
console.log(product_str);   // truetbar
console.log(product_str.length);  // 8

// return origin string when you pass the small number than itself
let product_small = "great".padStart(3, true);
console.log(product_small);   // great
console.log(product_small.length);  // 5

/*
    And a similar method: String.padEnd()
    just pad in end
*/
let product_end = "nice".padEnd(9, "123")
console.log(product_end);   // nice12312
console.log(product_end.length);  // 12
```









