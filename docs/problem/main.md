# 上海莉莉丝游戏

## 「 Vue2报错 」Avoid mutating a prop directly since the value will be overwritten ...

> 报错源

父组件`Father.vue`

```vue
<template>
	<button @click="onShowSonComponent">点击显示子组件</button>
	<son :show="showDialog"></son>
</template>
<script>
export default {
  name: "Father",
  data(){
    return{
      showDialog: false
    }
  },
  methods: {
    onShowSonComponent() {
      this.showDialog = true;
    }
  }
};
</script>
```

子组件`Son.vue`

```vue
<template>
  <!-- 补充代码 -->
</template>
<script>
export default {
  name: "Son",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
    }
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    }
  }
};
</script>
```

报错信息: 针对子组件报错(`Son.vue`)

```html
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "show"
```

> 明确问题 & 造成原因

存在一个父组件和一个子组件,  父组件调用子组件并需要传递一个数据 (boolean值) 到子组件中, 并在子组件中直接修改了接收的`props`数据

概述: 子组件中直接修改由父组件传来的`props`数据

> 解决方法

父组件`Father.vue`

```vue
<template>
	<button @click="onShowSonComponent">点击显示子组件</button>
	<son :show="showDialog" @update:show="onUpdateShow"></son>
</template>
<script>
export default {
  name: "Father",
  data(){
    return{
      showDialog: false
    }
  },
  methods: {
    onShowSonComponent() {
      this.showDialog = true;
    },
    onUpdateShow(value) {
      this.showDialog = value;
    }
  }
};
</script>
```

子组件`Son.vue`

```vue
<template>
  <!-- 补充代码 -->
</template>
<script>
export default {
  name: "Son",
  props: {
    // 父 => 子
    show: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      // 为避免在子组件中直接修改 this.show
      isShow : this.show
    }
  },
  // 关键步骤
  watch() {
    show: function(val) {
      this.isShow = val;
    } 
  },
  methods: {
    onClose() {
      // 当点击关闭时, 会改变 isShow 为 false, 需要将此时的 isShow 的值传回父组件, 实现双向绑定
      // 子 => 父
      this.$emit('update:show', false)
    }
  }
};
</script>
```

**这样便实现了父子组件间数据的双向绑定**, 解决该问题