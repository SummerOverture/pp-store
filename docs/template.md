# 代码结构

我们推荐 store 集中化配置如

```
├── index.html
├── main.js
└── store
    └── cart.js           # 购物车模块
    └── product.js        # 产品模块
```

当然如果需要拆分到各个组件也是可行的。
简洁模式下 store 的代码一般长这样

`store`

```jsx
import ppStore from 'ppstore';

const counterStore = ppStore.create({
  name: 'counterStore',
  state: 1,
});

export default counterStore;
```

`Component`

```jsx
import CounterStore from 'counterStore';

export function Counter() {
  const [count, setCount] = CounterStore.useStore();
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <p>current count: {count}</p>
    </div>
  );
}
```


