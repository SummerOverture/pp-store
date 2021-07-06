# Store

通过 ppStore.create 方法调用后返回的对象

## Store 的一些方法

| 属性          | <div style="width: 350px">类型</div>                                                         | 描述                              |
| ------------- | ------------------------------------------------------------ | --------------------------------- |
| useSelector   | (selector: [Selector](#selector), equalFn: [EqualFn](#equalfn)) => selectedState  | 从 store 选取 selector 对应的值，equalFn 用来决定是否需要更新 state，           |
| dispatch      | (payload &#124; action)  => Void                     | 宽松模式下，传入一个 payload 直接改变 store，严格模式下派发一个 action 来改变 store |
| subscribe     | (listener) => Void                                       | 订阅数据更新             |
| getShareState | () => state                                       | 获取 store 的 state         |
| useStore      | (selector: [Selector](#selector), equalFn: [EqualFn](#equalfn)) => [selectedState, dispatch]       | 获取 selectedState 和 dispatch 方法，是对 useSelector 和 dispatch 的封装        |

### [Selector](#selector)

| <div style="width: 350px">类型</div>                        | 描述                              |
| ------------------------------------------------------------ | --------------------------------- |
| (state) => selectedState  | 从 store 选取 selector 对应的值   |

### [EqualFn](#equalfn)

|  <div style="width: 350px">类型</div>                        | 描述                              |
| ------------------------------------------------------------ | --------------------------------- |
| (currentState, nextState) => isEqual  | 是否需要更新当前组件的状态           |
