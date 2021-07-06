# ppStore

通过 ppStore.create 创建的实例都会挂载在 ppStore 对象上，即 ppStore 是拥有所有 Store 的一个对象

## ppStore 的一些方法

| 属性          | <div style="width: 360px">类型</div>                           | 描述                              |
| ------------- | ------------------------------------------------------------ | --------------------------------- |
| getStore   | (name?: String) => <a href="/docs/api/store.html">Store</a> &#124; {[name: string]: <a href="/docs/api/store.html">Store</a>}  | 返回对应 name 的 store 或者所有 store           |
| config      | (options: [StoreOptions](#storeoptions)) => Void                     | 配置 ppStore 的一些属性，如默认的 middlewares 和 mode |
| create     | (options: [StoreOptions](#storeoptions)) => <a href="/docs/api/store.html">Store</a>                                       | 创建 store 实例  |

### [StoreOptions](#storeoptions)

创建store的参数 在loose模式下，name和initialState是必需的

| 属性          | <div style="width: 350px">类型</div>                          | 描述                              | 默认值                              |
| ------------- | ------------------------------------------------------------ | --------------------------------- | --------------------------------- |
| name   | String  | store 的名称           | -           |
| mode   | Enum {'strict', 'loose'}  | store 的模式           | 'loose'           |
| initialState   | any  | store 初始值           | -           |
| middlewares   | Array&lt;String &#124; Function&gt;  | 中间件，自带的中间件可以直接用字符串，如：logger。其他需要自己扩展           | ['logger']           |
| reducer      | (state, action) => nextState                     | reducer | - |
| actions     |                                        | actions         | - |
