1. 箭头函数是匿名函数，不能作为构造函数，故不可使用`new`
   
   ```js
   let fn = () => {
     console.log(123);
   }
   fn();  // 123
   
   let bar = new fn();  // Uncaught TypeError: fn is not a constructor
   ```

2. 箭头函数不绑定`arguments`，取而代之用`rest`参数解决
   
   ```js
   let fn = () => {
     console.log(arguments);
   }
   fn(11, 22);  //  Uncaught ReferenceError: arguments is not defined
   
   let bar = (...argsArray) => {
     console.log(argsArray);
   }
   bar(33, 44);  // [33, 44]
   ```

3. 箭头函数不绑定`this`，会捕获其所在的上下文的`this`值，作为自己的值
   
   ```js
   let person = {
     name: 'leo',
     skill: function() {
       let fn = () => {
         console.log(this);
       }
       fn();
     },
     hobby: () => {
       console.log(this);
     }
   };
   person.skill();  // {name: "leo", skill: ƒ}
   /* 
     因为person本身是没有作用域的，故
     箭头函数要往更外层寻找，所以找到
     Window对象
   */
   person.hobby();  // Window对象
   ```

4. 箭头函数没有原型属性`prototype`
   
   ```js
   let fn = () => {
     return 1;
   }
   
   console.log(fn.prototype);  // undefined
   ```

5. 箭头函数不能当做`Generator`函数，不能使用`yield`关键字