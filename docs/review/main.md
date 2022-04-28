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

## 类型声明

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
n = {};   // Error
u = 123;  // Error
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
console.log(Color[0]);  // Red 
console.log(Color[1]);  // Green
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

#### unknown 和 any 的区别

`unknown`类型不可以赋值给其他变量, 而 `any`类型可以

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

可以给变量声明`void`类型, 但是意义不大, 以为只能给其赋值`undefined`

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

设置`object`类型的变量, 可以使用引用类型赋值

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

1. 一个类可以实现多个接口
2. 一个接口可以继承多个接口

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
function add(x: number, y: number) {
    return x + y;
}
let myAdd = function(x: number, y: number) {
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





### 泛型



### 其他

