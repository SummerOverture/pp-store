import defalutMiddlewares from './middlewares';
import { logError } from './utils';

function compose(middlewares, store) {
  return middlewares
    .map(middleware => middleware(store))
    .reduce((a, b) => (...arg) => a(b(...arg)));
}

function applyMiddleware(middlewares, store) {
  const resultMiddleware = [];

  if (!middlewares.length) {
    logError(`middlewares should not be empty`);
  }

  middlewares.forEach(item => {
    if (typeof item === 'function') {
      resultMiddleware.push(item);
    } else if (typeof item === 'string') {
      if (defalutMiddlewares[item]) {
        resultMiddleware.push(defalutMiddlewares[item]);
      } else {
        logError(
          `middleware ${item} is not exist, please check and reconfigure middlewares`
        );
      }
    } else {
      logError(
        `middleware should be a string or function，but got ${typeof item}`
      );
    }
  });
  const composedFn = compose(resultMiddleware, store);
  return composedFn(store.dispatch);
}

export default applyMiddleware;
