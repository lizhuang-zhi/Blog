# Vue

## 简单说下MVVM和MVC的区别

> MVC

![](https://tva1.sinaimg.cn/large/008i3skNgy1gy0h12e8icj30f409y74b.jpg)

MVC的核心在于使用 Controller 将 Model 数据显示在 View 上（在 MVC 中，用户在 View 上事件操作，都是通过 JS 监听事件，然后通过 AJAX 请求 Controller 中的路由，也就是说 MVC 并没有涉及 View -> Controller 和 View -> Model ）

> MVVM

![](https://tva1.sinaimg.cn/large/008i3skNgy1gy0haw8s25j30fq08r3yj.jpg)

MVVM 重心在于实现 View 和 Model 的数据自动同步，而非手动操作 DOM 元素

> 总结

整体看来，MVVM 比 MVC 精简很多，不仅简化了业务与界面的依赖，还解决了数据频繁更新的问题，不用再用选择器操作 DOM 元素。因为在 MVVM 中，View 不知道 Model 的存在，Model 和 ViewModel 也观察不到 View，这种低耦合模式提高代码的可重用性。

## 为什么 data 是一个函数

![](https://tva1.sinaimg.cn/large/008i3skNgy1gy0iulwhlaj30eh0jeq43.jpg)

每一次复用组件时，希望各自组件的数据不会相互影响，所以将 data 设置为函数，每次返回一个新对象。这样以来，多次复用的组件之间的 data 数据不会相互关联，如果单纯的写成对象形式，那么每处使用这个组件的地方都会通过引用而找到这唯一的数据，就会出现改动一处全都改变的情况。

## Vue 组件通讯有哪几种方式

1. props 和 `$emit` (父传子通过 props，子传父通过 `$emit`触发事件进行传递)

2. `$refs`获取组件实例 

   父组件

   ```js
   this.$refs.foo // 获取子组件实例，通过子组件实例我们就能拿到对应的数据
   ```

3. `$children`和`$parent`（前者获取当前组件的父组件，后者获取当前组件的子组件）

4. `$attrs`和`$listeners`

   ```js
   // 子组件：并未在props中声明foo  
   <p>{{$attrs.foo}}</p>  
   
   // 父组件
   <HelloWorld foo="foo"/>  
   ```

5. vuex状态管理

6. eventBus 兄弟组件数据传递（这种情况下可以使用事件总线的方式）

7. provide / inject（父组件中通过 provide 来提供变量，然后在子组件中通过 inject 来注入变量。官方不推荐在实际业务中使用，但是写组件库时很常用）

[vue组件通信方式](https://segmentfault.com/a/1190000019208626)

[面试官：Vue组件之间的通信方式都有哪些？ | web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/communication.html#%E4%B8%89%E3%80%81%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E4%BF%A1%E7%9A%84%E6%96%B9%E6%A1%88)

## v-if 和 v-show 的区别

**v-if** 是**真正**的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**。

**v-show** 就简单得多，不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

> 使用场景

v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景

v-show 适用于需要非常频繁切换条件的场景

> <mark>扩展补充：display:none、visibility:hidden 和 opacity:0 之间的区别？</mark>

三者共同点都是隐藏。

不同点：

1. 是否占据空间

   `display:none`：隐藏后不占据位置

   `visibility:hidden` 和 `opacity:0`：隐藏后仍然占据位置

2. 子元素是否继承

   `display:none`：不会被子元素继承，父元素都不存在了，子元素也不会显示出来

   `visibility:hidden`：会被子元素继承，通过设置子元素 `visibility:visible` 来显示子元素

   `opacity:0`：会被子元素继承，但是不能通过设置子元素 `opacity:1` 来重新显示

3. 事件绑定

   `display:none`：元素都已经不在页面中存在，因此无法触及它绑定的事件

   `visibility:hidden`：不会触发它上面绑定的事件

   `opacity:0`：可以触发它上面绑定的事件

4. 过渡动画（`transition属性`）

   `display:none`：对于它无效

   `visibility:hidden`：对于它无效

   `opacity:0`：对于它有效

## keep-alive实现缓存组件

将需要频繁变更的组件放置在标签`keep-alive`中进行缓存,这样频繁的组件就不会被销毁然后重新渲染.

参考: https://www.bilibili.com/video/BV1fX4y1G7iT?p=17

## 怎么理解Vue的单向数据流

数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原始数据进行修改。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

> 注意：在子组件直接用 v-model 绑定父组件传过来的 prop 这样是不规范的写法 开发环境会报警告

## computed 和 watch 的区别和运用的场景

computed 是计算属性，依赖其他属性计算值，并且 computed 的值有缓存，只有当计算值变化才会返回内容，它可以设置 getter 和 setter。

watch 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。

计算属性一般用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑

## v-if 与 v-for 为什么不建议一起使用

同一个标签中如果同时使用这两个，那么会先解析`v-for`再解析`v-if`！

如果遇到需要同时使用时，可以考虑写成计算属性的方式。

## Vue 的生命周期方法有哪些 一般在哪一步发请求

**beforeCreate** 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问

**created** 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。这里没有$el,如果非要想与 Dom 进行交互，可以通过 vm.$nextTick 来访问 Dom

**beforeMount** 在挂载开始之前被调用：相关的 render 函数首次被调用。

**mounted** 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点

**beforeUpdate** 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁（patch）之前。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程

**updated** 发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新，该钩子在服务器端渲染期间不被调用。

**beforeDestroy** 实例销毁之前调用。在这一步，实例仍然完全可用。我们可以在这时进行善后收尾工作，比如清除计时器。

**destroyed** Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

**activated** keep-alive 专属，组件被激活时调用

**deactivated** keep-alive 专属，组件被销毁时调用

> 异步请求在哪一步发起？

可以在钩子函数 created、beforeMount、mounted 中进行异步请求，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。

如果异步请求不需要依赖 Dom 推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## 虚拟 DOM 是什么 有什么优缺点

由于在浏览器中操作 DOM 是很昂贵的。频繁的操作 DOM，会产生一定的性能问题。这就是虚拟 Dom 的产生原因。Vue2 的 Virtual DOM 借鉴了开源库 snabbdom 的实现。

<mark>Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，</mark><mark>是对真实 DOM 的一层抽象。</mark>

**优点：**

1. 保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；

2. 无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；

3. 跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

**缺点:**

1. 无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

2. 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。

## v-model 原理

v-model 只是语法糖而已

v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 value property 和 input 事件；
- checkbox 和 radio 使用 checked property 和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

> 注意:对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。

在普通标签上

```javascript
    <input v-model="sth" />  //这一行等于下一行
    <input v-bind:value="sth" v-on:input="sth = $event.target.value" />
复制代码
```

在组件上

```html
<currency-input v-model="price"></currentcy-input>
<!--上行代码是下行的语法糖 <currency-input :value="price" @input="price = arguments[0]"></currency-input>-->

<!-- 子组件定义 -->
Vue.component('currency-input', {
 template: `
  <span>
   <input
    ref="input"
    :value="value"
    @input="$emit('input', $event.target.value)"
   >
  </span>
 `,
 props: ['value'],
})
```

## v-for 为什么要加 key

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。Vue 的 diff 过程可以概括为：oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比，即一共有4种比较方式：新前旧前 、新后旧后 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex，如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。具体有无 key 的 diff 过程，可以查看作者写的另一篇详解虚拟 DOM 的文章《[深入剖析：Vue核心之虚拟DOM](https://juejin.cn/post/6844903895467032589#heading-14 "https://juejin.cn/post/6844903895467032589#heading-14")》

**所以 Vue 中 key 的作用是：key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速**

**更准确**：因为带 key 就不是就地复用了，在 sameNode 函数 `a.key === b.key` 对比中可以避免就地复用的情况。所以会更加准确。

**更快速**：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快，源码如下：

```js
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

## 为什么不建议用index做key?

同上一个问题, 也是因为在进行虚拟节点的对比时, 如果是用index作为key, 那么新增的那个在头顶的元素的 key 为0, 这样进行 diff 四命中比较的时候, 会由于前三次都是新前与旧前命中, 最后将新节点中剩余的节点(该节点本来就在原来旧的节点的最后一个)添加到旧节点中,导致原来不用更新的节点也被更新, 降低效率.

具体过程可自己模拟

参考: [15张图，20分钟吃透Diff算法核心原理，我说的！！！ - 掘金](https://juejin.cn/post/6994959998283907102#heading-10)

## vue-router 动态路由是什么 有什么问题

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const User = {
  template: "<div>User</div>",
};

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User },
  ],
});
```

> 问题:vue-router 组件复用导致路由参数失效怎么办？

解决方法：

1.通过 watch 监听路由参数再发请求

```javascript
watch: { //通过watch来监听路由变化

 "$route": function(){
     this.getData(this.$route.params.xxx);
 }
}
```

2.用 :key 来阻止“复用”

```html
<router-view :key="$route.fullPath" />
```

## 谈一下对 vuex 的个人理解

vuex 是专门为 vue 提供的全局状态管理系统，用于多个组件中数据共享、数据缓存等。（无法持久化、内部核心原理是通过创造一个全局实例 new Vue）

![vuex.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb545e2edc0a4dcb94a412db0625799c~tplv-k3u1fbpfcp-watermark.awebp)

主要包括以下几个模块：

- State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
- Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
- Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

## Vuex 页面刷新数据丢失怎么解决

需要做 vuex 数据持久化，一般使用本地存储的方案来保存数据，可以自己设计存储方案，也可以使用第三方插件

推荐使用 vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中

## Vuex 为什么要分模块并且加命名空间

**模块**:由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

**命名空间**：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

## vue 中使用了哪些设计模式

1.工厂模式 - 传入参数即可创建实例

虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

2.单例模式 - 整个程序有且仅有一个实例

vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉

3.发布-订阅模式 (vue 事件机制)

4.观察者模式 (响应式数据原理)

5.装饰模式: (@装饰器的用法)

6.策略模式 策略模式指对象有某个行为,但是在不同的场景中,该行为有不同的实现方案-比如选项的合并策略

## Vue3 — ref 和 reactive、toRef、toRefs 区别

* `ref`和`reactive`区别

1. `reactive`只能用于为对象或者数组添加响应式状态 ( 因为`proxy`只接受引用类型 ) ,而`ref`既可用于对原始数据添加响应式, 也可用于对象和数组添加响应式 ( 因为`ref`内部会调用`reactive` ) (<mark>vue3利用proxy实现响应式，而proxy不能代理基础类型，vue3就只能给他包装成一个对象再进行代理，所以大家可以看到基础类型变成响应式读取值的时候需要.value</mark>)
2. `ref()` 有一个 `.value` 属性可以用来重新赋值，而 `reactive()` 不可重新赋值（会丢失响应性）
3. `ref()`要通过`.value`对数据进行操作, 而`reactive()`直接操作
4. <mark>尤大说创建`ref`目的是为了包装一个内部值而服务, 不应该被当作一个一般响应式对象处理, 因为对于响应式对象要做的事会更多, 所以对性能的影响也会更大; 如果都为了简便的一概使用`ref`(因为`ref`内部会判断传入的参数是否是一个对象, 如果是对象, 则会再去调用`reactive`), 看起来是一劳永逸, 但是对程序的性能会有很大的问题</mark>

* ref 和 toRef 区别

> toRef

`toRef`用于为源响应式对象上的属性新建一个`ref`,从而保持对源对象属性的响应式连接.

接收两个参数: 一个是源响应式对象, 一个是属性名

返回值: `ref`属性

例如使用父组件传递的`props`数据时, 要引用`props`的某个属性且要保持响应式连接时就很有用.

1. 获取数据值的时候需要加.value
2. `toRef`后的`ref`数据如果是复杂类型数据时，不是原始数据的拷贝，而是引用，改变结果数据的值也会同时改变原始数据

> 区别

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

* toRefs

作用其实和 toRef 类似，只不过 toRef 是对一个个属性手动赋值，而 toRefs 是自动解构赋值。

```js
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: [title],
  
  setup (props) {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    const stateAsRefs = toRefs(state)
    /*
      stateAsRefs 的类型:
      {
        foo: Ref<number>,
        bar: Ref<number>
      }
    */
    // ref 和原始 property 已经“链接”起来了
    state.foo++
    console.log(stateAsRefs.foo.value) // 2

    stateAsRefs.foo.value++
    console.log(state.foo) // 3
  }
})
```

参考: 

https://www.php.cn/vuejs/483317.html

https://juejin.cn/post/7071978771808518180#heading-6

https://v3.cn.vuejs.org/api/refs-api.html#toref

## Vue3 — Vue3.0里为什么要用Proxy API替代defineProperty API？

Object.defineProperty只能通过遍历对象属性的方式进行数据劫持，而**Proxy则直接可以劫持整个对象**，相当于我们直接操作这个对象就可以达到相应式目的；除此之外，除此之外Object.defineProperty API，只能劫持getter和setter，Proxy除getter和setter外还可以劫持`apply`、`has`等13种劫持方法

## Vue3 — watch 和 watchEffect 区别

1. 每次代码加载`watchEffect`都会执行。而 watch 是**惰性执行**，也就是只有监听的值发生变化的时候才会执行.

   ```js
   let activeEffect = null
   function effect(eff) {
     activeEffect = eff
     // 立即执行
     activeEffect()
     activeEffect = null
   }
   ```

2. `watch`显式指定依赖源(可侦听单一源或者多个源)，依赖源更新时执行回调函数; 而`watchEffect`自动收集依赖源，依赖源更新时重新执行自身

   ```js
   // 自动体现在执行 effect 回调函数时, 会触发响应式数据的 get 函数, 从而触发 track 进行依赖添加
   ```

3. `watch`允许我们访问侦听状态的先前值和当前值, 而`watchEffect`不能做到

> `watch` 与 [`watchEffect`](https://v3.cn.vuejs.org/api/computed-watch-api.html#watcheffect) 在[手动停止侦听](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#停止侦听)、[清除副作用](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#清除副作用) (将 `onInvalidate` 作为第三个参数传递给回调)、[刷新时机](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#副作用刷新时机)和[调试](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#侦听器调试)方面有相同的行为。

## Vue3 — 手写 shallowReactive 和 reactive

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

## Vue3 — 手写 shallowRef 和 ref

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
  	// 源码中会对 target 进行 isRef 的检查, 如果是 ref 类型直接返回传入值
  	// 如果不是则会判断是否是 object, 是的话会调用 reactive()
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

## Vue3 Reactivity Course

视频链接: https://www.bilibili.com/video/BV1SZ4y1x7a9?spm_id_from=333.999.0.0

### Simple Try

> 简单实现

```js
let price = 5
let quantity = 2
let total = 0

// 容器: 保存对象属性的依赖函数
let dep = new Set()
// 操作(后的影响)
let effect = () => { total = price * quantity }
// 为容器添加 effect
function track() {
    dep.add(effect)
}
// 将容器中的依赖全部执行
function trigger() {
    dep.forEach(effect => effect())
}

track()
// run this code for the first time
effect()
```

调用过程

```bash
> total
10
> quantity = 3
3
> total
10
> trigger()
undefined
> total
15
```

使用`Dep`作为存储容器, 存储下函数`effect (操作后的影响)`,通过调用`track`将`effect`添加到`Dep`容器, 当需要对数据的更新进行重新操作时, 我们会调用`trigger`去执行保存在`Dep`容器中所有依赖的`effect`, 这个过程就是实现了一个简单的发布订阅模式.

> 为多个属性添加不同的 Dep 容器

将刚才的`price`和`quantity`存入`product`对象中, 为每一个属性添加对应的`Dep`容器(`Set`集合), 然后将映射信息存为一个`Map`, 以属性名为`key`, 对应`Dep`容器为`value`, 如下图

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2xg8k2e6kj20yy0jwgop.jpg)

```js
// 将不同属性保存在 product 对象中
let product = {
    price: 5,
    quantity: 2
}
let total = 0
let effect = () => {
    total = product.price * product.quantity
}

const depsMap = new Map();
/* 
    为属性添加 effect 到对应的 Dep 容器中
    @key: 对象中某个属性
*/
function track(key) {
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}
/* 
    执行对应属性的所有依赖 effect
    @key: 对象中某个属性
*/
function trigger(key) {
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}
track('quantity')
effect()
```

操作过程

```bash
> total
10
> product.quantity = 3
3
> trigger('quantity')
undefined
> total
15
```

> 在此基础上, 面对更多的对象时

我们需要创建一个`WeakMap`去保存, 每一个对象作为`key`, 对应的`value`是一个`Map`

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2xqexuplqj210n0g1q5j.jpg)

```js
let product = {
    price: 5,
    quantity: 2
}
// 其他的对象
let user = {
    firstName: 'Joe',
    lastName: 'Smith'
}
let total = 0
let effect = () => {
    total = product.price * product.quantity
}
// 使用 WeakMap 对象作为 key, 有效做到 GC
const targetMap = new WeakMap()

function track(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}

function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}

track(product, 'quantity')
effect()
```

执行过程

```bash
> total
10
> roduct.quantity = 3
3
> total
10
> trigger(product, 'quantity')
undefined
> total
15
```

### Proxy and Reflect

> 三种获取对象中属性的方式

```js
let product = {
    price: 5,
    quantity: 2
}
// three notations are vaild, Reflect has a super power
console.log(product.quantity)
console.log(product['quantity'])
console.log(Reflect.get(product, 'quantity'))
```

> 书写 reactive 源逻辑

```js
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            return Reflect.set(target, key, value, receiver)
        }
    }
    return new Proxy(target, handler)
}

let proxiedProduct = reactive({
    price: 5,
    quantity: 2
})
proxiedProduct.quantity = 3
console.log(proxiedProduct.quantity)  // 3
```

> 实现自动化

```js
const targetMap = new WeakMap()

function track(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(effect)
}

function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}

// 新增代码
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            // automatically
            track(target, key)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if (oldValue != value)[
                // automatically
                trigger(target, key)
            ]
            return result
        }
    }
    return new Proxy(target, handler)
}

let product = reactive({
    price: 5,
    quantity: 2
})
let total = 0
let effect = () => {
    total = product.price * product.quantity
}
effect()
// console.log(targetMap)   // 查看添加后的 WeakMap
```

验证过程

```bash
> total
10
> product.price = 10
10
> total
20
```

调用`effect()`时, 获取`product`对象的属性时, 由于是响应式对象, 所以会触发对应的`handler(处理程序)`中的`get`和`set`, 从而执行`track()`和`trigger()`进行依赖添加和遍历执行对应依赖中的全部`effect`

![](https://tva1.sinaimg.cn/large/e6c9d24ely1h2xszf7vq1j21ov0u00xq.jpg)

### activeEffect & ref

如果将上一节的代码加上如下这段

```js
console.log(total);  // 10
product.quantity = 3
/* 
    触发 track(product, 'quantity'), 然后去找到对应
    targetMap、depsMap, 然后存储依赖到 dep 中, 但是
    这是不必要的, 我们只想在 effect 中追踪(track)和
    触发(trigger)
*/
console.log('Update quantity to: ' + product.quantity);  // Update quantity to: 3
console.log(total);  // 15
```

会存在像注释里的问题, 所以要对代码进行优化

```js
const targetMap = new WeakMap()
// 新增变量, 管理 effect 执行
let activeEffect = null

// 改动
function track(target, key) {
    // 添加判断 activeEffect
    if (activeEffect) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        // 存在时, 才添加 activeEffect
        dep.add(activeEffect)
    }
}

function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}

function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            // automatically
            track(target, key)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if (oldValue != value)[
                // automatically
                trigger(target, key)
            ]
            return result
        }
    }
    return new Proxy(target, handler)
}

let product = reactive({
    price: 5,
    quantity: 2
})
let total = 0
// 修改函数 effect
function effect(eff) {
    activeEffect = eff
    activeEffect()
    activeEffect = null
}
// 将原本的 effect 作为回调函数传入
effect(() => {
    total = product.price * product.quantity
})
```

> 添加需求: 添加一个销售价格, 去计算 total

```js
const targetMap = new WeakMap()
let activeEffect = null

function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        dep.add(activeEffect)
    }
}

function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}

function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            // automatically
            track(target, key)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if (oldValue != value)[
                // automatically
                trigger(target, key)
            ]
            return result
        }
    }
    return new Proxy(target, handler)
}

let product = reactive({
    price: 5,
    quantity: 2
})
let total = 0
function effect(eff) {
    activeEffect = eff
    activeEffect()
    activeEffect = null
}

/* 
    需求: 添加一个销售价格, 去计算 total
*/
let salePrice = ref(0)
// 现在的 total 是依据销售价格, 而非产品价格
effect(() => {
    total = salePrice.value * product.quantity
})
// 产品价格打九折 => 销售价格
effect(() => {
    salePrice.value = product.price * 0.9
})

// ref core code
function ref(raw) {
    // 方式一: 对于这个例子可行, 但是不是 Vue3 中写的形式
    // return reactive({
    //     value: raw
    // })

    // 方式二: Vue3 Core Code
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newValue) {
            if(newValue != raw) {
                raw = newValue
                trigger(r, 'value')
            }
        }
    }
    return r
}

console.log("total: " + total + " || salePrice.value: " + salePrice.value)  // total: 9 || salePrice.value: 4.5 
product.quantity = 3
console.log("total: " + total + " || salePrice.value: " + salePrice.value)  // total: 13.5 || salePrice.value: 4.5
product.price = 10
console.log("total: " + total + " || salePrice.value: " + salePrice.value)  // total: 27 || salePrice.value: 9
```

### Computed & Vue 3 Source

> 将 total 和 salePrice 改为计算属性

```js
const targetMap = new WeakMap()
let activeEffect = null

function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        dep.add(activeEffect)
    }
}

function trigger(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => {
            effect()
        });
    }
}

function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            // automatically
            track(target, key)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            if (oldValue != value)[
                // automatically
                trigger(target, key)
            ]
            return result
        }
    }
    return new Proxy(target, handler)
}

let product = reactive({
    price: 5,
    quantity: 2
})
function effect(eff) {
    activeEffect = eff
    activeEffect()
    activeEffect = null
}

function ref(raw) {
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newValue) {
            if(newValue != raw) {
                raw = newValue
                trigger(r, 'value')
            }
        }
    }
    return r
}

/* 
    将 total 和 salePrice 改变为计算属性
*/
let salePrice = computed(() => {
    return product.price * 0.9
})
let total = computed(() => {
    return salePrice.value * product.quantity
})

// 书写 computed 
function computed(getter) {
    let result = ref()
    effect(() => {
        result.value = getter()
    })
    return result
}

console.log("total: " + total.value + " || salePrice.value: " + salePrice.value)  // total: 9 || salePrice.value: 4.5 
product.quantity = 3
console.log("total: " + total.value + " || salePrice.value: " + salePrice.value)  // total: 13.5 || salePrice.value: 4.5
product.price = 10
console.log("total: " + total.value + " || salePrice.value: " + salePrice.value)  // total: 27 || salePrice.value: 9
```

### Q & A

#### Vue2 和 Vue3 响应式区别

Vue2 响应式原理: https://www.processon.com/diagraming/625194eef346fb1da675e628

Vue3 响应式原理: https://www.processon.com/diagraming/629c5a997d9c08070f990ef6

核心还是发布订阅模式, 但是在 Vue2 中使用的是`forEach`去循环遍历对象属性, 通过`Object.defineProperty()`为其添加`get`和`set`, 从而实现对依赖的添加(`dep.addSub()`)和对依赖的触发执行(`dep.notify()`); 而在 Vue3 中, 是通过`Proxy`和对象访问器(`get\set`)来实现的对数据的响应式操作, 当获取数据时 (触发数据的`get`时),  执行`track`为对应的对象属性添加`effect`, 当设置数据时 (触发数据的`set`时),  执行`trigger`遍历对应属性的`Set`集合中存储的`effect`,  从而实现响应式

> 为什么 Vue3 中会想到使用`targetMap、depsMap、dep` 去存储整个数据?

因为 Vue2 中使用`forEach`遍历对象时, 会形成一个闭包, 为其属性存储关联的`Dep`;  但是在 Vue3 中的`Proxy`的`handler`中直接传递参数`target`和`key`, 没有形成一个闭包为每个属性存储关联依赖项.

#### `ref`中两种方式的区别

<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1h2ziqa9946j21ay0k8jsi.jpg" style="zoom:77%;" />

尤大说创建`ref`目的是为了包装一个内部值而服务, 不应该被当作一个一般响应式对象处理, 因为对于响应式对象要做的事会更多, 所以对性能的影响也会更大, 对程序的性能会有很大的问题.

所以在`ref`的源码中, 是将这两种方式进行结合, 对于基础数据类型来说, 会将其包装为一个只有`value`属性的`ref`对象返回, 而对于传入的对象, 会通过调用`reactive`进行处理

源码如下:

```typescript
export function ref(value?: unknown) {
  // 如果是 ref 类型的值, 直接返回该值
  if (isRef(value)) {
    return value
  }
  // 如果 value 是一个对象, 则调用 reactive
  value = convert(value)
  // 如果是基础数据类型, 并且不是 ref 类型, 则将基础类型包装为一个对象返回
  const r = {
    _isRef: true,
    get value() {
      track(r, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newVal) {
      value = convert(newVal)
      trigger(
        r,
        TriggerOpTypes.SET,
        'value',
        __DEV__ ? { newValue: newVal } : void 0
      )
    }
  }
  return r
}
```

所以二者的区别在于面对不同的类型做不同的判断处理, 提高程序执行性能

#### Vue3 中的 Proxy 和 Reflect 会带来哪些好处?

对于 Vue2 来说, 无法对数组长度变化、增删元素操作、对象新增属性进行感知,  所以在 Vue 层面不得不重写数组的一些方法(push、pop、unshift、shift、splice、reverse、sort),  动态添加响应式属性,  也要使用 `$set` 方法(`Vue.set(object, property, value)`)等. 而 Proxy 则完美的从根上解决了这些问题

## **<mark>Vue2源码探究系列</mark>**

### mustache模版引擎

#### 什么是模版引擎

定义：解决数据到视图的最优雅的方法

> 历史上出现过的数据 -> 视图的方法

1. 纯DOM法（渲染速度快于第二种的字符串渲染）

2. 数组join法（利于书写查看）

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
       <ul id="list">
       </ul>
   
       <script>
           var arr = [
               {"name": "小明", "age": 12, "sex": "男"},
               {"name": "小红", "age": 22, "sex": "女"},
               {"name": "小亮", "age": 32, "sex": "男"},
           ];
   
           let list = document.querySelector("#list");
   
           for(let i = 0; i < arr.length; i++) {
               list.innerHTML += [
                   '<li>', 
                       '<div class="hd">' + arr[i].name +'的信息</div>', 
                       '<div class="bd">', 
                           '<p>姓名：' + arr[i].name + '</p>', 
                           '<p>年龄：' + arr[i].age + '</p>', 
                           '<p>性别：' + arr[i].sex + '</p>', 
                       '</div>', 
                   '</li>'
               ].join('');
           }
       </script>
   </body>
   </html>
   ```

3. ES6的反引号法（使用模版字符串即可）

   ```js
           list.innerHTML += `
                   <li>
                       <div class="hd">${arr[i].name}的信息</div> 
                       <div class="bd">
                           <p>姓名：${arr[i].name}</p>
                           <p>年龄：${arr[i].age}</p> 
                           <p>性别：${arr[i].sex}</p> 
                       </div>
                   </li>
           `;
   ```

4. **模版引擎**

#### mustache的基本使用

这里的代码，同步更新到`Github`上：[GitHub - lizhuang-zhi/VueSourceExploration: 探究学习Vue源码](https://github.com/lizhuang-zhi/VueSourceExploration)

#### 使用正则表达式模拟实现数据填充

这里的代码，同步更新到`Github`上：[GitHub - lizhuang-zhi/VueSourceExploration: 探究学习Vue源码](https://github.com/lizhuang-zhi/VueSourceExploration)

#### mustache库的机理

> 利用tokens

![](https://tva1.sinaimg.cn/large/008i3skNgy1gyot4gz70hj313y0hy75h.jpg)

<mark>编译</mark>：模版字符串 => tokens数组

1. `parseTemplateToTokens.js`：将模版字符串 => 单层级的tokens数组（这个过程会用到`Scanner.js`扫描类）

   ![](https://tva1.sinaimg.cn/large/008i3skNgy1gytr8zapn0j30dt09pq39.jpg)

   转变为

   ![](https://tva1.sinaimg.cn/large/008i3skNgy1gytr9ivmt6j30jb0a3t9x.jpg)

2. `nestTokens.js`：将单层级的tokens数组 => 嵌套的tokens数组

   最终变为

   ![](https://tva1.sinaimg.cn/large/008i3skNgy1gytrdawq3ij30ax03kwem.jpg)

   ![](https://tva1.sinaimg.cn/large/008i3skNgy1gytrcv9buzj30bi0a7gmi.jpg)

   ![](https://tva1.sinaimg.cn/large/008i3skNgy1gytrikz4tlj30c60fnq45.jpg)

   ![](https://tva1.sinaimg.cn/large/008i3skNgy1gytrkrmwi2j30cl0fqq4b.jpg)

<mark>解析</mark>：tokens数组 + data数据 => dom字符串

1. `renderTemplate.js`：分情况讨论tokens数组中将会遇到的不同类型（'text'、'name'、'#'）

   1. ‘text‘：直接拼接

   2. 'name'：判断是否存在点（是否是洋葱型属性），然后拼接

   3. '#'：碰到#，说明又是一个数组，递归遍历即可

这里的代码，同步更新到`Github`上：[GitHub - lizhuang-zhi/VueSourceExploration: 探究学习Vue源码/Mustache机理](https://github.com/lizhuang-zhi/VueSourceExploration/tree/main/SGG_TemplateEngine)

### **虚拟DOM和diff算法**

虚拟DOM在Vue中主要做的事：

1. 提供与真实DOM节点所对应的虚拟节点

2. 将虚拟节点vnode和旧虚拟节点oldVnode进行比对，然后更新视图

> 虚拟dom(vue和react都在使用)比原生dom快在哪里?
>     首先明确vue和react并没有优化dom操作。vue和react做了以下两点:
>
> * 减少dom操作(将需要进行多次操作dom，整理为最后一次)
> * 虚拟dom借助dom diff，省掉多余操作，做到最小量更新

![](https://tva1.sinaimg.cn/large/008i3skNly1gyx97f8b1zj310r0u041z.jpg)

更多图片内容：[ProcessOn上有源码流程以及关于diff算法的步骤展示](https://www.processon.com/diagraming/6169645563768921fa246af3)

这里的代码，同步更新到`Github`上：[模拟实现snabbdom](https://github.com/lizhuang-zhi/VueSourceExploration/blob/main/%E6%A8%A1%E6%8B%9F%E5%AE%9E%E7%8E%B0/mySnabbdom.js)

### 数据响应式原理

> 非侵入式和侵入式

![](https://tva1.sinaimg.cn/large/008i3skNgy1gz65ou9hi8j311p0scq6f.jpg)

#### 初识`Object.defineProperty()`

为对象添加的属性添加`get`与`set`方法，这样就可以在`set`中做其他操作（重写数据等...）

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
    const per = {};
    let age = 20;

    // 给per对象添加一个具有set和get的age属性
    Object.defineProperty(per, 'age', {
      get: function() {
        return age;
      },
      set: function(value) {
        // 监听数据变化
        console.log('数据变化');  
        /*
           重新渲染
         */
        age = value;
      }
    })

    console.log(per.age);  // 20
    per.age = 123;   // 触发set方法：数据变化
    console.log(per.age);  // 123

  </script>
</body>
</html>
```

#### 基本的响应式实现

```js
let data = {
    name: 'leo',
    age: 20
}

function observer(target) {
    if(typeof target !== 'object' || target === null) {
        return target;
    }

    for(let key in target) {
        defineReactive(target, key, target[key]);
    }
}

function defineReactive(target, key, value) {
    Object.defineProperty(target, key, {
        get() {
            return value;
        },
        set(newValue) {
            if(newValue !== value) {
                value = newValue;
                console.log('视图更新');
            }
        }
    })
}

/*
   为data对象的属性添加get与set方法
   作用：这样可以监听数据变化，并且可再操作等
 */
observer(data);

console.log(data);  // 打印结果如下
```

如果不执行`observer(data)`，打印如下

```js
{name: 'leo', age: 20}
```

#### 处理值为复杂对象情况

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>处理值为复杂对象情况</title>
</head>
<body>

  <h1>Vue响应式</h1>

  <script>

    let data = {
      name: 'leo',
      age: 20,
      // 需要深度观察的属性（1）
      skill: {
        work: 'code'
      }
    }

    function observer(target) {
      if(typeof target !== 'object' || target === null) {
        return target;
      }

      for(let key in target) {
        defineReactive(target, key, target[key]);
      }
    }

    function defineReactive(target, key, value) {
      /* 
        如果遍历的属性又是一个引用类型
        进行深度观察（1）
      */
      observer(value);

      Object.defineProperty(target, key, {
        get() {
          return value;
        },
        set(newValue) {
          //（2）
          observer(newValue);

          if(newValue !== value) {
            value = newValue;
            console.log('视图更新');
          }
        }
      })
    }

    observer(data);

    // 需要深度监听的属性（1）
    data.skill.work = 'player';

    // 被修改属性为引用属性时，深度观察修改值（2）
    data.name = { number: 77 };
    data.name.number = 23;

    /* 
      当我们添加或者删除属性时，
      只能分别使用 Vue.delete 和 Vue.set 来观察数据更新
    */
    delete data.age;
    data.test = '新加的属性';

  </script>

</body>
</html>
```

`(1)`和`(2)`是对应要点

#### 处理值为数组的情况

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>处理值为复杂对象情况</title>
</head>
<body>

  <h1>Vue响应式</h1>

  <script>

    let data = {
      name: 'leo',
      age: 20,
      skill: {
        work: 'code'
      },
      // 数组
      colors: ['red', 'orange', 'green']
    }

    /*
      为数组方法添加响应（重写数组原型的方法）
    */
    let oldArrayProto = Array.prototype;
    let newArray = Object.create(oldArrayProto);
    ['push', 'pop', 'unshift', 'shift', 'splice'].forEach(item => {
      newArray[item] = function() { 
        oldArrayProto[item].call(this, ...arguments);
        console.log('视图更新');
      }
    })

    function observer(target) {
      if(typeof target !== 'object' || target === null) {
        return target;
      }

      // 添加部分！
      if(Array.isArray(target)) {
        target.__proto__ = newArray;
      }

      for(let key in target) {
        defineReactive(target, key, target[key]);
      }
    }

    function defineReactive(target, key, value) {
      /* 
        如果遍历的属性又是一个引用类型
        进行深度观察
      */
      observer(value);

      Object.defineProperty(target, key, {
        get() {
          return value;
        },
        set(newValue) {
          observer(newValue);

          if(newValue !== value) {
            value = newValue;
            console.log('视图更新');
          }
        }
      })
    }

    observer(data);

    // data.colors[0] = 'yellow';   // 本来就会打印：视图更新
    data.colors.push('white');   // 添加代码后：视图更新
  </script>

</body>
</html>
```

### AST抽象语法树

![](https://tva1.sinaimg.cn/large/008i3skNgy1gzb53xny7fj31dp0u0tbd.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNgy1gzb558n02rj31j60u0n1h.jpg)

> **抽象语法树和虚拟节点有什么关系**

![](https://tva1.sinaimg.cn/large/008i3skNgy1gzb5lv21h9j31hs0u0tcr.jpg)

这里的代码，同步更新到`Github`上：[模拟实现AST](https://github.com/lizhuang-zhi/VueSourceExploration/tree/main/study-ast)

