const logger = (store) => (next) => (action) => {
	console.log('before', store.getShareState());
	next(action);
	console.log('after', store.getShareState());
};

export default logger;
