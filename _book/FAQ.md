现有的状态管理库：Redux
  Redux遵循单一数据源、只读State、使用纯函数来执行修改三大原则，这三者都是试图让 状态的变化变得可预测，其中纯函数的执行修改引入了reducer和action的概念，所有的状态发生和修改都在reducer中。

  - 新的概念：reducer和action需要一定的时间学习和适应，虽然学习成本较低，但繁琐的概念仍然会增加心智负担
  - 拆分 Reducer
    - 为了更好的管理state tree，redux推荐拆分细小的reducer，但散落在各个文件模块下的reducers、actionTypes就像是隔离业务的一堵围墙，而业务中调用的方法是来自组件还是mapDispatchToProps也不得而知，虽然这是高阶组件的问题，但官方给与标志性的引导还是很有必要的。
    - 在官方性能优化章节中我们看到 `每个 action 都调用 “所有的 reducer” 会不会很慢？`和`Redux 常见的误解： 需要深拷贝 state。实际情况是：如果内部的某些数据没有改变，继续保持统一引用即可。`，基于数据不可变的redux却推荐浅拷贝的重要原因就是因为浅拷贝更快，想象一下如果每一次的变更都需要最顶层state进行深拷贝，性能会有多糟糕，这也是redux需要开发者维护范式化及扁平化state的充分理由
  - 超多的api：除了上述的一些api，还有如`bindActionCreators`、 `connect` 、 `Provider`、 `createStore` 、 `applyMiddleware`、 `compose`···，使用时这些api是从redux来的还是从react-redux中来的，确实是个繁杂的任务。 

为什么不使用redux？
  react-redux集合了状态共享和状态管理两部分，可能项目中虽然更倾向于状态共享的需求，却也不得不学习它的状态管理，基于此点我们一直在寻求一种心智负担更小的状态共享工具或者类库，或者说在状态管理上能够更加的使用友好。

为什么是pp-store，为什么不用已有的轮子
  mobx和redux是比较热门和成熟的方案，mobx的优点是`不需要使数据标准化`,这减轻了状态设计的负担。那为什么不使用mobx，mobx的api并不比redux少,对于习惯了react写法的开发者来说可能需要一段时间适应这种基于数据突变的函数式响应编程。

React hook版本的更新使得逻辑复用更加的轻便简洁，包含state的hook可以被提炼成自定义的hooks函数，这使得各个组件间的状态共享更加简单。

而基于hook的状态共享也十分简单：原理是在自定义的hookA中使用公共的变量，并把变量return给每个使用到该hook的组件即可，在组件进行状态更新时，把状态更新同步到公共变量中，随后再通知到各个使用到该hook的组件。

为什么不使用context

pp-store的优点和特性

- 基于hook： 整个的状态共享过程使用并只使用hook特性，所以使用起来安全简单，并且维护这份状态就像维护state一样，不需要担心性能问题，React的性能优化和协调同样适用于该hook。

- api简洁： 在我们的宽松模式设计中，使用store将会特别简单，可能只需要关注createStore和userStore这两个api即可，是的，连Provider都不需要使用。前者用来创建hook，后者则是使用，使用方式与useState保持一致。

- 模块数据隔离：我们推荐尽可能的创建多个store以此来达到更好的性能，当使用useStore去共享某个模块的数据时，`组件将只会使用到该模块的数据`，不用担心redux中`每个 action 都调用 “所有的 reducer” 会不会很慢？` 或者关注是否需要使用` redux-ignore`来确保只有某几个reducer响应特定的action。 同时也能减少前期的状态设计负担。

- 单一store单一文件： 由于api简洁，状态也够简单，所以单一store单一文件即可，管理和维护成本都要降低不少。
