# 设计模式

## 前序了解

### 多态在设计中的作用

对于Java这样的强类型语言，多态的实现是要比JS复杂一些，由于JS这样的弱类型语言，要到程序运行时，待变量赋值后，才知道自己的类型，所以**JS天生就能很好的实现多态**

举例子：

我们现在需要调用谷歌地图的API

```js
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};
var renderMap = function () {
    googleMap.show();
};
renderMap(); // 输出：开始渲染谷歌地图
```

后来由于某些原因，我们需要将谷歌地图的API，换成百度地图的API

```js
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};
var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};
var renderMap = function (type) {
    if (type === 'google') {
        googleMap.show();
    } else if (type === 'baidu') {
        baiduMap.show();
    }
};
renderMap('google'); // 输出：开始渲染谷歌地图
renderMap('baidu'); // 输出：开始渲染百度地图
```

如果我们没有使用多态的方式，像上面的代码一样，那后来的业务需要我们把百度地图换成搜狗地图的时候，我们又需要去改动原来的`renderMap`函数，这样代码往往都不具备良好的弹性（说白了就是拉！）

```js
var googleMap = {
    show: function () {
        console.log('开始渲染谷歌地图');
    }
};
var baiduMap = {
    show: function () {
        console.log('开始渲染百度地图');
    }
};
var renderMap = function (useMapType) {
    if (useMapType.show instanceof Function) {
        useMapType.show();
    }
};

renderMap(googleMap);  // 输出：开始渲染谷歌地图
renderMap(baiduMap);  // 输出：开始渲染百度地图

var sougouMap = {
    show: function () {
        console.log('开始渲染搜狗地图');
    }
}
renderMap(sougouMap);  // 输出：开始渲染搜狗地图
```

利用多态，我们良好的分离了“做什么”和“怎么做”，提高了代码的可扩展性！

在`命令模式`,`组合模式`,`策略模式`中都是用到了多态的设计思路。

### 分时函数

需求：在页面中创建大量DOM节点

> 一开始

```js
var ary = [];
for (var i = 1; i <= 1000; i++) {
    ary.push(i); // 假设 ary 装载了 1000 个好友的数据
};
var renderFriendList = function (data) {
    for (var i = 0, l = data.length; i < l; i++) {
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
    }
};
renderFriendList(ary);
```

在短时间内往页面中大量添加 DOM 节点显然也会让浏览器吃不消，我们看到的结果往往就 是浏览器的卡顿甚至假死

> 利用分时函数

```js
var timeChunk = function (ary, fn, count) {
    var obj,
        t;
    var len = ary.length;
    var start = function () {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    };
    return function () {
        t = setInterval(function () {
            if (ary.length === 0) { // 如果全部节点都已经被创建好
                return clearInterval(t);
            }
            start();
        }, 200); // 分批执行的时间间隔，也可以用参数的形式传入
    };
};

var ary = [];
for (var i = 1; i <= 1000; i++) {
    ary.push(i);
};
var renderFriendList = timeChunk(ary, function (n) {
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8);
renderFriendList();
```

所以利用分时函数，能够很好的将创建大量`DOM`的任务分开来做，减缓浏览器的压力

## 单例模式

```js
function Person(name) {
    this.name = name;
    this.instance = null;
}
Person.prototype.getName = function() {
    return this.name;
}
Person.getInstance = function(name) {
    if(!this.instance) {
        this.instance = new Person(name);
    }
    return this.instance;
}

let p1 = Person.getInstance('leo1');
let p2 = Person.getInstance('leo2');
console.log(p1 === p2);  // true
console.log(p1);  // Person {name: 'leo1', instance: null}
console.log(p2);  // Person {name: 'leo1', instance: null}
```

上面的代码虽然实现了单例，但是是通过调用构造函数的`getInstance`的方法去调用的

```js
// 自执行函数看返回值
var Person = (function() {
    var PersonConstructor = function(name) {
        this.name = name;
    }
    // 单例（局部变量防止全局污染）
    let instance = null;
    var foo = function(personName) {
        if(!instance) {
            instance = new PersonConstructor(personName);
        }
        return instance;
    }
    return foo;
})();

let person1 = new Person('leo');
let person2 = new Person('kang');
console.log(person1);  // PersonConstructor {name: 'leo'}
console.log(person2);  // PersonConstructor {name: 'leo'}
console.log(person1 === person2);  // true
```

通过使用自执行函数和闭包，我们可以通过直接`new`构造函数的方式去创建单例

> 实际业务场景

通过单例，一些业务场景就得了更好的实现，比如QQ的登录框，当用户点击登陆时，我们应该是只能创建一个登录窗口，而非点一次创建一个的形式

```js
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));/
    }
};

var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);

// 需要先在页面中创建一个 #loginBtn 的按钮
document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};
```

## 策略模式

在公司里，不同的工作者有不同的工资，同时每个人在年末也会根据业绩获得不同倍数的奖金，下面通过一段代码来实现

```js
var calculateBonus = function (performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return salary * 4;
    }
    if (performanceLevel === 'A') {
        return salary * 3;
    }
    if (performanceLevel === 'B') {
        return salary * 2;
    }
};
calculateBonus('B', 20000); // 输出：40000
calculateBonus('S', 6000); // 输出：24000
```

这样实现的代码，存在以下一些缺点

* calculateBonus 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的逻辑 分支
* calculateBonus 函数缺乏弹性，如果增加了一种新的绩效等级 C，或者想把绩效 S 的奖金 系数改为 5，那我们必须深入 calculateBonus 函数的内部实现，这是违反开放-封闭原则的
* 算法的复用性差。如果在程序的其他地方需要重用这些计算奖金的算法呢？我们的选择 只有复制和粘贴

> 基于传统面向对象语言的模仿

```js
/* **************** 策略对象 **************** */
var PerformanceS = function () { }
PerformanceS.prototype.calculate = function (salary) {
    return salary * 6;
}

var PerformanceA = function () { }
PerformanceA.prototype.calculate = function (salary) {
    return salary * 4;
}

/* **************** 校验器 **************** */
var Bouns = function (salary, level) {
    this.salary = null;   // 设置初始工资
    this.level = null;
}
Bouns.prototype.setSalary = function (salary) {
    this.salary = salary;
}
Bouns.prototype.setLevel = function (level) {
    this.level = level;
}

Bouns.prototype.getMoney = function () {
    return this.level.calculate(this.salary);
}

let bouns = new Bouns();
bouns.setSalary(3000);
bouns.setLevel(new PerformanceS());
console.log(bouns.getMoney());  // 18000
bouns.setLevel(new PerformanceA());
console.log(bouns.getMoney());  // 12000

let bouns2 = new Bouns();
bouns2.setSalary(10000);
bouns2.setLevel(new PerformanceS());
console.log(bouns2.getMoney()); // 60000
```

> JS版本的策略模式

```js
/* **************** 策略对象 **************** */
var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
}

/* **************** 校验器 **************** */
var calculateBouns = function (level, salary) {
    return strategies[level](salary);
}

console.log(calculateBouns('S', 2000));  // 8000
console.log(calculateBouns('A', 5000));  // 15000
```

## 代理模式

### 一个代理的简单例子

> 小明直接追女神

```js
function Flower() {}
let xiaoMing = {
    sendFlower(target) {
        let flower = new Flower();
        // 直接送给女神
        target.receiveFlower(flower);
    }
}
let goddess = {
    receiveFlower(flower) {
        console.log('goddess get the' + flower);
    }
}

xiaoMing.sendFlower();
```

> 小明通过朋友追女神

```js
function Flower() {}
let xiaoMing = {
    sendFlower(target) {
        let flower = new Flower();
        target.receiveFlower(flower);
    }
}
let friend = {
    receiveFlower(flower) {
        console.log('friend get the flower');
        // 转送给女神
        goddess.receiveFlower(flower);
    }
}
let goddess = {
    receiveFlower(flower) {
        console.log('goddess get the' + flower);
    }
}

xiaoMing.sendFlower(friend);
```

通过`friend`，小明将花送给了女神，在这个过程中，我们并没有去改变主体的任何内容，只是增加了代理者，以后那天小明成了一个真男人后，他要自己去送花的时候，我们只需要将`friend`的代码删去，让小明直接访问主体，而不影响任何地方，降低代码的解耦性，满足单一职责原则。

### 通过代理实现节流

```html
<body>
    <input type="checkbox" id="1"></input>1
    <input type="checkbox" id="2"></input>2
    <input type="checkbox" id="3"></input>3
    <input type="checkbox" id="4"></input>4
    <input type="checkbox" id="5"></input>5
    <input type="checkbox" id="6"></input>6
    <input type="checkbox" id="7"></input>7
    <input type="checkbox" id="8"></input>8
    <input type="checkbox" id="9"></input>9
</body>
```

```js
var synchronousFile = function (id) {
    console.log('开始同步文件，id 为: ' + id);
};
var proxySynchronousFile = (function () {
    var cache = [], // 保存一段时间内需要同步的 ID
        timer; // 定时器
    return function (id) {
        cache.push(id);
        if (timer) { // 保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function () {
            synchronousFile(cache.join(',')); // 2 秒后向本体发送需要同步的 ID 集合
            clearTimeout(timer); // 清空定时器
            timer = null;
            cache.length = 0; // 清空 ID 集合
        }, 2000);
    }
})();

var checkbox = document.getElementsByTagName('input');
for (var i = 0, c; c = checkbox[i++];) {
    c.onclick = function () {
        if (this.checked === true) {
            proxySynchronousFile(this.id);
        }
    }
};
```

### 通过代理实现记忆化计算

```js
var calculate = function() {
    let res = 1;
    for(let i = 0; i < arguments.length; i++) {
        res *= arguments[i];
    }
    return res;
}
calculate(1,2,3)  // 6
calculate(2,2,2)  // 8

var proxyCalculate = (function() {
    // 存储已经计算的值
    let remember = {};
    return function() {
        let record = Array.prototype.join.call(arguments, ',');
        if(record in remember) {
            return remember[record];
        }
        return remember[record] = calculate.apply(this, arguments);
    }
})();
let p1 = proxyCalculate(2,3,4);
let p2 = proxyCalculate(2,3,4);
console.log(p1);  // 24
console.log(p2);  // 24
```

通过`proxyCalculate`,我们可以在用户访问主体前，通过缓存代理减轻服务器或者一些运算压力

### **代理的意义**

很多时候，我们感觉代理其实只是增加了很多不必要的代码，其实不然；代理本身很好的体现了==单一职责原则==（单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因，如果一个对象承担多个职责，意味着这个对象将变得巨大，这样极大的增加了职责的耦合性），假若我们哪一天由于某些原因，不再需要代理（比如面对代理要付出一些佣金之类的），而删去代理的部分，也并不会影响直接对本体的访问。

### 代理的用处

预处理、作为节流的代码、缓存代理减轻服务器压力或者重复性计算等

## 装饰者模式

### 一开始的装饰者

这种给对象动态增加职责的方式，并没有真正地改动对象自身，而是将对象放入另一个对象 之中，这些对象以一条链的方式进行引用，形成一个聚合对象

> 传统模式下

```js
var Plane = function () { }
Plane.prototype.fire = function () {
    console.log('launch the normal bullet');
}

var MissileDecorator = function (plane) {
    this.plane = plane;
}
MissileDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('launch the guided missile（导弹）');
}

var AtomDecorator = function (plane) {
    this.plane = plane;
}
AtomDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('launch the atomic bomb（原子弹）');
}

var plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);

plane.fire();

// launch the normal bullet
// designMode.js:693 launch the guided missile（导弹）
// designMode.js:701 launch the atomic bomb（原子弹）
```

> 回到JavaScript的装饰者

```js
var plane = {
    fire() {
        console.log('发射子弹');
    }
};

missileDecorator = function() {
    console.log('发射导弹');
}
atomDecorator = function() {
    console.log('发射原子弹');
}

var fire1 = plane.fire;

plane.fire = function() {
    fire1();
    missileDecorator();
}

var fire2 = plane.fire;

plane.fire = function() {
    fire2();
    atomDecorator();
}

plane.fire();
// 发射子弹
// 发射导弹
// 发射原子弹
```

这样可以在不改变原函数（对象）的情况下，为其添加新的功能，这也非常符合开放-封闭的原则。

但是这样的代码存在两个问题：

* 必须维护`fire1`和`fire2`这个中间变量，虽然看起来并不起眼，但如果函数的装饰链较长，或者 需要装饰的函数变多，这些中间变量的数量也会越来越多。
* 其实还遇到了`this`被劫持的问题，也就是`this`的指向问题

> `this`劫持问题例子

```js
var _getElementById = document.getElementById;
document.getElementById = function (id) {
    alert(1);
    console.log(this);  // #document
    return _getElementById(id); // (1)
}
var button = document.getElementById('button');
```

代码中的`(1)`处报错：Illegal invocation，因为此时的`_getElementById`是一个全局函数，调用全局函数时，`this`指向`window`，而 `document.getElementById` 方法的内部实现需要使用` this`引用，`this`在这个方法内预期是指向 `document`，而不是 `window`, 这是错误发生的原因

### 引入`AOP`装饰函数

```js
Function.prototype.before = function(beforefn) {
    var _self = this;
    return function() {
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    }
}
Function.prototype.after = function(afterfn) {
    var _self = this;
    return function() {
        let res = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return res;
    }
}

function Person() {
    console.log('i am iron man');
}

Person.before(function() {
    console.log('i am thor');
})();
// i am thor
// i am iron man

Person.after(function() {
    console.log('i am Captain America');
})();
// i am iron man
// i am Captain America
```

通过在`Function`的原型上添加`before`和`after`方法，我们可以很好的解决`this`指向的问题

> 解决`document.getElementById`的`this`指向问题

```js
Function.prototype.before = function (beforefn) {
    console.log(this);  // ƒ getElementById() { [native code] }
    var __self = this;
    return function () {
        console.log(this);  // #document
        beforefn.apply(this, arguments);
        return __self.apply(this, arguments);
    }
}
document.getElementById = document.getElementById.before(function () {
    alert(1);
});
var button = document.getElementById('button');  // 这里才是真正在调用 before 方法中的 return 内容
```

通过`AOP`，我们很好的解决了`this`的劫持问题

> `AOP`污染原型

因为这样有些开发者认为污染了`Function`的原型，所以也可以改为`before`函数同时接收`fn`和`beforefn`函数

```js
var before = function(fn, beforefn) {
    return function() {
        beforefn.apply(this, arguments);
        return fn.apply(this, arguments);
    }
}

var a = before(
    function() {console.log(3);},
    function() {console.log(2);}
)

a = before(a, function() {
    console.log(1);
})

a();
// 1
// 2
// 3 
```

### 用`AOP`动态改变函数的参数

```js
Function.prototype.before = function (beforefn) {
    var __self = this;
    return function () {
        beforefn.apply(this, arguments); // (1)
        return __self.apply(this, arguments); // (2)
    }
}

var func = function (param) {
    console.log(param); // 输出： {a: "a", b: "b"}
}
func = func.before(function(param) {
    param.b = 'b';
})
func( {a: 'a'} ); 
```

代码执行到`(1)`处时，会执行

```js
function(param) {
    param.b = 'b';
}
```

来为`(1)`处中`arguments`添加属性`b`，从而增加改变传入`__self.apply(this, arguments)`的`arguments`参数

> 实际应用

平常都会写 ajax 请求

```js
var ajax = function (type, url, param) {
    console.dir(param);
    // 发送 ajax 请求的代码略
};
ajax('get', 'http:// xxx.com/userinfo', { name: 'sven' });
```

突然有一天，遭受了 CSRF 攻击，而解决 CSRF 攻击最简单的一个办法就是在 HTTP 请求中带上一个 Token 参数

```js
var getToken = function () {
    return 'Token';
}
```

现在的任务是给每个 ajax 请求都加上 Token 参

```js
var getToken = function () {
    return 'Token';
}
var ajax = function (type, url, param) {
    param = param || {};
    param.Token = getToken(); // 发送 ajax 请求的代码略...
};
```

虽然已经解决了问题，但我们的 ajax 函数相对变得僵硬了，每个从 ajax 函数里发出的请求 都自动带上了 Token 参数，虽然在现在的项目中没有什么问题，但如果将来把这个函数移植到其 他项目上，或者把它放到一个开源库中供其他人使用，Token 参数都将是多余的。

为了解决这个问题，先把 ajax 函数还原成一个干净的函数：

```js
var ajax = function (type, url, param) {
    console.log(param); // 发送 ajax 请求的代码略
};
```

然后把 Token 参数通过 Function.prototyte.before 装饰到 ajax 函数的参数 param 对象中：

```js
var getToken = function () {
    return 'Token';
}
ajax = ajax.before(function (type, url, param) {
    param.Token = getToken();
});
ajax('get', 'http:// xxx.com/userinfo', { name: 'sven' });
```

从 ajax 函数打印的 log 可以看到，Token 参数已经被附加到了 ajax 请求的参数中:

```js
{name: "sven", Token: "Token"}
```

### 代理模式和装饰者模式

代理模式和装饰者模式最重要的区别在于它们的意图和设计目的。代理模式的目的是，当直 接访问本体不方便或者不符合需要时，为这个本体提供一个替代者。本体定义了关键功能，而代 理提供或拒绝对它的访问，或者在访问本体之前做一些额外的事情。装饰者模式的作用就是为对 象动态加入行为。换句话说，代理模式强调一种关系（Proxy 与它的实体之间的关系），这种关系 可以静态的表达，也就是说，这种关系在一开始就可以被确定。而装饰者模式用于一开始不能确 定对象的全部功能时。代理模式通常只有一层代理本体的引用，而装饰者模式经常会形成一条 长长的装饰链。

## 观察者模式（发布-订阅模式）

### 简单的发布-订阅

其实这个模式经常出现在我们的日常代码中

```js
document.body.addEventListener('click', function () {
    alert(2);
}, false);
document.body.click(); // 模拟用户点击
```

我们可以任意的添加订阅者

```js
// 随意增加订阅者
document.body.addEventListener('click', function () {
    alert(2);
}, false);
document.body.addEventListener('click', function () {
    alert(3);
}, false);
document.body.addEventListener('click', function () {
    alert(4);
}, false);
document.body.click(); // 模拟用户点击（发布）
```

### 售楼部案例

在我们的买房经历中，由于售楼部有些房屋暂时没有开售，往往购房者会将自己的电话留在售楼部，当用户中意的房屋开售时，售楼部会安排工作人员遍历登记名册中的用户，挨个电话通知情况

```js
let salesOffices = {};  // 售楼部
salesOffices.clientList = {};   // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function (key, fn) {   // 添加订阅者
    if (!(key in this.clientList)) {   // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[key] = [];
    }
    this.clientList[key].push(fn);   // 订阅的消息添加进缓存列表
}
salesOffices.trigger = function () {
    let key = Array.prototype.shift.call(arguments);
    let fnList = this.clientList[key];

    if (fnList.length == 0) {
        return false;
    }

    for (let i = 0; i < fnList.length; i++) {
        fnList[i].apply(this, arguments);  // arguments 是发布消息时带上的参数（例如一些房屋的价格与面积等）
    }
}

salesOffices.listen('squareMeter88', function (price) { // 小明订阅消息
    console.log('价格= ' + price);   // 价格= 2000000
});
salesOffices.listen('squareMeter110', function (price) { // 小红订阅消息
    console.log('价格= ' + price);   // 价格= 3000000
});
salesOffices.trigger('squareMeter88', 2000000); 
salesOffices.trigger('squareMeter110', 3000000); 
```

### 更换售楼部（通用实现）

假如某个用户，不止在某一家卖房中心登记了自己的电话，还可能在其他的售楼部也留了电话，供日后通知，那我们还需要再去重新创建一个售楼部对象吗？所以我们要改进上面的代码

```js
var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments), // (1);
            fns = this.clientList[key];
        if (!fns || fns.length === 0) { // 如果没有绑定对应的消息
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments); // (2) // arguments 是 trigger 时带上的参数
        }
    }
};

var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
};

var salesOffices = {};
installEvent(salesOffices);
salesOffices.listen('squareMeter88', function (price) { // 小明订阅消息
    console.log('价格= ' + price);
});
salesOffices.listen('squareMeter100', function (price) { // 小红订阅消息
    console.log('价格= ' + price);
});
salesOffices.trigger('squareMeter88', 2000000); // 输出：2000000
salesOffices.trigger('squareMeter100', 3000000); // 输出：3000000 
```

### 取消订阅

基于上面的内容，当用户想取消订阅时

```js
event.remove = function (key, fn) {
    var fns = this.clientList[key];
    if (!fns) { // 如果 key 对应的消息没有被人订阅，则直接返回
        return false;
    }
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
        fns && (fns.length = 0);
    } else {
        for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
            var _fn = fns[l];
            if (_fn === fn) {
                fns.splice(l, 1); // 删除订阅者的回调函数
            }
        }
    }
};

var salesOffices = {};
var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
}
installEvent(salesOffices);
salesOffices.listen('squareMeter88', fn1 = function (price) { // 小明订阅消息
    console.log('价格= ' + price);
});
salesOffices.listen('squareMeter88', fn2 = function (price) { // 小红订阅消息
    console.log('价格= ' + price);
});
salesOffices.remove('squareMeter88', fn1); // 删除小明的订阅
salesOffices.trigger('squareMeter88', 2000000); // 输出：2000000
```

### 全局的发布-订阅

之前的代码还是存在一定的问题：

* 我们给每个发布者对象都添加了 listen 和 trigger 方法，以及一个缓存列表 clientList， 这其实是一种资源浪费。
* 小明跟售楼处对象还是存在一定的耦合性，小明至少要知道售楼处对象的名字是 salesOffices，才能顺利的订阅到事件。

```js
var Event = (function () {
    var clientList = {},
        listen,
        trigger,
        remove;
    listen = function (key, fn) {
        if (!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };
    trigger = function () {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };
    remove = function (key, fn) {
        var fns = clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (var l = fns.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };
    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

Event.listen('squareMeter88', function (price) { // 小红订阅消息
    console.log('价格= ' + price); // 输出：'价格=2000000'
});
Event.listen('squareMeter108', function (price) { // 小红订阅消息
    console.log('价格= ' + price); // 输出：'价格=3000000'
});
Event.trigger('squareMeter88', 2000000); // 售楼处发布消息
Event.trigger('squareMeter108', 3000000); // 售楼处发布消息
```
