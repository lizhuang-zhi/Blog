# 上海莉莉丝游戏

## 「 Vue2报错 」Avoid mutating a prop directly since the value will be overwritten ...

> 报错源

```html
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "value"
```

> 明确问题

存在一个父组件和一个子组件,  父组件需要传递一个”showReportDialog“ (boolean值)

