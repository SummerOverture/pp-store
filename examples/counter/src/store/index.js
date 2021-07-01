import ppStore from 'pp-store';

const initialState = {
  count: 1,
  loading: false,
};

const counterStore = ppStore.create({
  initialState,
  name: 'counterStore',
});

export default counterStore;
