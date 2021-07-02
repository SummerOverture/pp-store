# 小技巧

## 逻辑复用

通过以上章节的介绍，我们对 ppstore 宽松模式下的使用有了一个大体的认知，同时可能也产生了一些疑问点，比如目前为止都是介绍的都是状态共享功能，那关于状态管理呢？

正如 useState 对应的 userReducer 一样，在应对 state 逻辑较复杂的场景时我们会将逻辑抽离到 reducer 中，基于此点我们可以在 store 文件中做些事情：

```js
import ppStore from 'pp-store';

const initialState = {
  count: 1,
  loading: false,
};

const counterStore = ppStore.create({
  initialState,
  name: 'counterStore',
});

counterStore.actions = {
  increment() {
    return counterStore.dispatch(prev => {
      return {
        ...prev,
        count: prev.count + 1,
      };
    });
  },
};

export default counterStore;
```

```js
const { actions } = counterStore;

const onIncrement = () => {
  actions.increment();
};
```

这样，一个 count 自增的逻辑便抽离到 store 当中，在别的组件使用时便可以直接使用这个 actions 而不用重复的编写这部分逻辑。
