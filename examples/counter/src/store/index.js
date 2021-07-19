import ppStore from 'pp-store';

const initialState = {
  count: 1,
  loading: false,
};

const counterStore = ppStore.create({
  initialState,
  name: 'counterStore',
});

counterStore.actions = {
  increment() {
    return counterStore.dispatch(prev => {
      return {
        ...prev,
        count: prev.count + 1,
      };
    });
  },
};

export default counterStore;
