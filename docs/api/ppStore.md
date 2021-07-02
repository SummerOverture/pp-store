# ppStore

通过 ppStore.create 创建的实例都会挂载在 ppStore 对象上，即 ppStore 是拥有所有 Store 的一个对象

## ppStore 的一些方法

- getStore
- config
- create

### [getStore(name?)]()
  name为可选参数
  返回对应name的store或者所有store

  #### 返回值
  Object: 单个Store实例或者包含所有Store的对象

### [Config(opts)]()
  配置ppStore的一些属性，如默认的middlewares和mode
  - opts
    - middlewares[array]:
    - mode[enum]: 'loose'或'strict', 默认为loose
  #### 返回值
  --

### [create(opts)]()
  创建store的参数
  在loose模式下，name和initialState是必需的
  - opts
    - `name`[string]: store的名称
    - `initialState`[any]: 初始值

