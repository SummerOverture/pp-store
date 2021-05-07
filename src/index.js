import createStore from './createStore';

const YsStore = {
  // 子store合集
	stores: {},
  // 配置YsStore 主要用来配置middlewares
	config(opts) {
		YsStore = {
			...YsStore,
			opts,
		};
	},
  // applyMiddleware时传入的中间件， 默认加载logger
	middlewares: ['logger'],
  // store创建函数
	create(opts) {
		const { stores } = YsStore;
		const { reducer, initialState, name } = opts;

		if (!reducer || !initialState || !name) {
			throw new Error('propertie [reducer 、 initialState 、 name] is required');
		}

		if (stores[name]) {
			throw new Error(`store ${name} exist, please check the store name`);
		}

		if (!opts.middlewares) {
			opts.middlewares = YsStore.middlewares;
		}

		const thisStore = createStore(opts);

		stores[name] = thisStore;
		return thisStore;
	},
	getStore(name) {
		if (!name) {
			return YsStore.stores;
		}
		return YsStore.stores[name];
	},
};

export default YsStore;
