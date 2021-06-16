import createStore from './createStore';
import { logError } from './utils';

const ppStore = {
  // TODO stores最好无法被外界访问 防止误操作
  // 子store合集
  stores: {},
  // ppStore 主要用来配置middlewares
  config(opts) {
    ppStore = {
      ...ppStore,
      opts,
    };
  },
  // applyMiddleware时传入的中间件， 默认加载logger
  middlewares: ['logger'],
  // store创建函数
  create(opts) {
    const { stores } = ppStore;
    const { initialState, reducer, actions, name } = opts;

    if (!reducer || !initialState || !name || !actions) {
      logError(
        'propertie [reducer]  [initialState]  [actions] [name] is required'
      );
    }

    if (stores[name]) {
      logError(`store ${name} exist, please check the store name`);
    }

    if (!opts.middlewares) {
      opts.middlewares = ppStore.middlewares;
    }

    const thisStore = createStore(opts);

    stores[name] = thisStore;
    return thisStore;
  },
  getStore(name) {
    if (!name) {
      return ppStore.stores;
    }
    return ppStore.stores[name];
  },
};

export default ppStore;

export {inject} from './inject';
