const logger = store => next => action => {
  console.log('before', action, store.getShareState());
  next(action);
  console.log('after', action, store.getShareState());
};

export default logger;
