import ppStore from 'pp-store';

export const TYPES = {
  SET_COUNT: 'SET_COUNT',
  DECRESE: 'DECRESE',
  INCRESE: 'INCRESE',
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
  name: 'counterStore',
});

export default counterStore;

export function useCounterStore({ selector, isEqualState }) {
  const state = counterStore.getStore({ selector, isEqualState });
  const setStore = counterStore.setStore;
  return [state, setStore];
}
