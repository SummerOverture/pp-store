import ppStore from 'pp-store';

const initialState = {
  count: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return { ...state, loading: true };
    case 'fetched':
      return { ...state, loading: false, ...action.params };
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const counterStore = ppStore.create({
  initialState,
  reducer,
  actions: {},
  middlewares: ['logger'],
  name: 'counterStore',
});

export default counterStore;

export function useStore(selector, isEqualFn) {
  const state = counterStore.useSelector(selector, isEqualFn);
  const setStore = counterStore.dispatch;
  return [state, setStore];
}
