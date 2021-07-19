import ppStore from 'pp-store';

const initialState = {
  list: ['Apple Watch 6']
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'addCart':
      return { ...state, list: [...state.list, payload] }
    default:
      return state;
  }
};

const cartStore = ppStore.create({
  initialState,
  reducer,
  actions: {},
  middlewares: ['logger'],
  name: 'cartStore',
});

export default cartStore;

export function useStore(selector, isEqualFn) {
  const state = cartStore.useSelector(selector, isEqualFn);
  const setStore = cartStore.dispatch;
  return [state, setStore];
}
