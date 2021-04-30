import defalutMiddlewares from '../middlewares';

function compoese(middlewares, store) {
	return middlewares
		.map((middleware) => middleware(store))
		.reduce((a, b) => (...arg) => a(b(...arg)));
}

function applyMiddleware(middlewares, store) {
	const compoesedFn = compoese([defalutMiddlewares.logger], store);
	return compoesedFn(store.dispatch);
}

export default applyMiddleware;
