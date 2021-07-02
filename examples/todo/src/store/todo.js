import ppStore from 'pp-store';

const initialState = {
  list: ['Apple Watch 6'],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'addTodoList':
      const exist = state.list.find(goodsName => goodsName === payload);
      if (exist) {
        return state;
      }
      return { ...state, list: [...state.list, payload] };
    case 'removeTodoList':
      const index = state.list.findIndex(name => name === payload);
      state.list.splice(index, 1);
      return { ...state, list: [...state.list] };
    default:
      return state;
  }
};

const todoStore = ppStore.create({
  initialState,
  reducer,
  actions: {},
  middlewares: ['logger'],
  name: 'todoStore',
  mode: 'strict',
});

export default todoStore;

export function useStore(selector, isEqualFn) {
  const state = todoStore.useSelector(selector, isEqualFn);
  const setStore = todoStore.dispatch;
  return [state, setStore];
}
