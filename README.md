# pp-store
  `基于hook的轻量级状态共享模式`

## Try It Online

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pp-store-count-n9g1u)  

## Features
  - 基于hook
  - api简洁
  - 模块数据隔离

## Install

```
yarn add pp-store
# 或者
npm install --save pp-store
```

## 快速上手

### 创建一个store

```js
import {create} from 'pp-store';

const initialState = {
  count: 1,
  preCount: 2,
  loading: false,
};

const counterStore = create({
  initialState,
  name: 'counterStore',
});

export default counterStore;
```

> 通过`create`api便可创建一个独立的数据模块，该api接受两个参数： 初始值`initialState`和模块名称`name`
### 使用store

具体的api使用可以查阅api文档，在大部分的情况下，只需要了解useStore这一个api即可

#### 在函数组件中使用
```js
import counterStore from './store';

const [counter, setStore] = counterStore.useStore();
```

#### 自定义hooks
我们推荐将数据拆分成多个模块，然后再使用的地方再组合它们使用
```js
import counterStore from './counterStore';
import cartStore from './cartStore';

const [counter, setCountStore] = counterStore.useStore();
const [cart, setCartStore] = cartStore.useStore();
```
在多个组件都需要这两个store的逻辑时，我们甚至可以自定义一个hook来组合他们

```js
  import counterStore from './counterStore';
  import cartStore from './cartStore';

  export default function useCartAndCountStoreData() {
    const [counter] = counterStore.useStore();
    const [cart] = cartStore.useStore();

    return {
      counter,
      cart
    }
  }
```


#### 在类组件中使用
使用内置的高阶组件`inject`，便可连接store数据到类组件中
```js
import { inject } from 'pp-store';

class Demo extends React.Component {
  render() {
    const { counter } = this.props;
    return (
      <div>
        <p>current count: {counter.count}</p>
      </div>
    );
  }
}

export default inject(stores => {
  const [counter, setCounter] = stores.counterStore.useStore();
  return { counter, setCounter };
})(Demo);
```
### 性能优化
我们可以通过给useStore传入函数来决定订阅依赖项数据，而不是store全量的数据。

例如，组件内只需要count属性时
```js
const [counter, setStore] = counterStore.useStore(s => s.count);
```
> 对于性能优化的原理，可以查阅文档

## 小技巧
### 创建附带逻辑的store或者hooks
在上述使用中我们不难发现，如果组件A和组件B都有一段相似的增加count的逻辑操作如：
```js
import counterStore from './store';

const [counter, setStore] = counterStore.useStore();

const onIncrement = () => {
  setStore((prev) => ({
    ...prev,
    count: prev+1
  }));
}
```
那么`increment`是可以被抽象的：
``` js
import ppStore from 'pp-store';

const initialState = {
  count: 1,
  loading: false,
};

const counterStore = ppStore.create({
  initialState,
  name: 'counterStore',
});

export const actions = {
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

## API
  ### create 
  > (options: { name: string, initialState: any }
  ) => Store

  创建一个store，参数为store名称`name`和初始值`initialState`

  返回值为[Store]()实例

  ### inject
  > (stores) => any
  
  可以通过该函数组件注入store数据到class组件中。

  ### Store

  #### useSelector
  > (selector: Selector, equalFn: EqualFn) => selectedState

  > Selector: (state) => selectedState	

  > EqualFn: (currentState, nextState) => bool	

  从 store 选取 selector 对应的值，equalFn 用来决定是否需要更新 state，

  #### dispatch
  > (payload) => Void	

  传入一个 payload 直接改变 store

  #### subscribe
  > (listener) => Void	

  订阅数据更新

  #### useStore
  > (selector: Selector, equalFn: EqualFn) => [selectedState, dispatch]

  获取 selectedState 和 dispatch 方法，是`useSelector`和`dispatch`的
  语法糖。







    
    
  