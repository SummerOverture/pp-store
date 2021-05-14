import ppStore from 'ppstore';

export const TYPES = {
  SET_COUNT: 'A_SET_COUNT',
  DECRESE: 'A_DECRESE',
  INCRESE: 'A_INCRESE',
};

const sleep = s =>
  new Promise(res => {
    setTimeout(() => {
      res();
    }, s);
  });

const initialState = {
  count: 1,
};

const actions = {
  [TYPES.SET_COUNT]: params => async dispatch => {
    dispatch({ type: 'fetching' });
    await sleep(1000);
    dispatch({ type: 'fetched', params });
  },
  [TYPES.DECRESE]: () => async dispatch => {
    dispatch({ type: 'decrement' });
  },
  [TYPES.INCRESE]: () => dispatch => {
    dispatch({ type: 'increment' });
  },
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
  actions,
  middlewares: ['logger'],
  name: 'counterStore',
});

export default counterStore;

export function useCounterStore(selector, isEqualFn) {
  const state = counterStore.useSelector(selector, isEqualFn);
  const setStore = counterStore.useDispatch;
  return [state, setStore];
}
