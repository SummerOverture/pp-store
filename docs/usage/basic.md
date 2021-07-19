# 基本使用

在使用 React 开发中，当需要多个组件需要反映相同的变化数据时，我们需要进行 [状态提升](https://reactjs.org/docs/lifting-state-up.html)，但当组件层级较深时，会变得比较麻烦。基于此场景下 ppStore 上场了

`创建store`
在组件文件夹下创建，或者在根目录的 store 文件夹下创建皆可

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

export default counterStore;
```

ppStore.create 调用后将返回改模块实例，以 name 作为 store 名称，之后也可通过 ppStore.counterStore 来获取该组件实例。实例中挂载了`useStore`的的方法，是我们最常用的 api 之一

### 如何共享数据

在 store 创建完成之后，不同组件便能通过 store 进行状态共享，只需要两步即可：

```js
import counterStore from './store';
```

```js
const [counter, setStore] = counterStore.useStore();
```

useStore 具体的用法在 api 章节中有介绍，上面的使用中将会默认返回 Store 的所有状态，
其中一个使用技巧是： `因为所有返回的状态都将在组件的state中存在，所以所有状态的变更都会使得组件重新渲染`,所以尽量只使用该组件依赖的状态，比如我们的`CountShow`组件只需要`count`状态

```js
const [counter, setStore] = counterStore.useStore(s => s.count);
```

store 中的 loading 状态的变化将不再使得 CountShow 组件重新渲染

## 在 class 组件中使用

ppStore 提供了高阶组件 inject 以便于在 class 组件中使用共享状态

```js
import { inject } from 'pp-store';

class Demo extends React.Component {
  onIncrement = () => {
    this.props.setCounter((...prevStore) => ({
      ...prevStore,
      count: prevStore.count + 1,
    }));
  };

  render() {
    const { counter } = this.props;

    return (
      <div>
        <p>current count: {counter.count}</p>
        <button onClick={this.onIncrement}>+</button>
      </div>
    );
  }
}

export default inject(stores => {
  const [counter, setCounter] = stores.counterStore.useStore();
  return { counter, setCounter };
})(Demo);
```

### 使用多个store
同上面的示例一致，创建了另一个store后，组件中只需引入该Store即可

```js
import counterStore from './store';
import cartStore from './cartStore';
```

```js
const [counter, setCountStore] = counterStore.useStore();
const [cart, setCartStore] = cartStore.useStore();
```
可以把他们当做

```js
  const [counter, setCounter] = useState();
  const [cart, setCart] = useCart();
```
useStore本质就是以useState存在于组件中，所以不用担心性能问题。