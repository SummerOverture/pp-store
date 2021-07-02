# Store

通过 ppStore.create 方法调用后返回的对象

## Store 的一些方法

- useSelector
- dispatch
- subscribe
- getShareState
- useStore

### [useSelector(selector, equalFn)]()
  - selector[function] (state) => selectedState 用来获取指定state 同时会用来做性能优化
    - state[any]: 接受当前store的全量状态
    - selectedState[any]: 返回部分状态
  - equalFn[function] (currentState, nextState) => isEqual
    - currentState[any]: 当前组件使用的Store状态
    - nextState[any]: 当前更新后组件使用的Store状态
    - isEqual[boolean]: 是否需要更新当前组件的状态

  #### 返回值
  返回selector()返回后的值

### [dispatch(action)]()
  #### 参数
  action
  - 宽松模式下action即为payload






