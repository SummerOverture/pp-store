import { useCounterStore, TYPES } from './store';

export default function Inject(Selector) {
  return WrappedComponent => {
    function Inject() {
      const injectProps = useCounterStore(Selector);

      console.log('injectProps', injectProps);
      return <WrappedComponent {...injectProps} />;
    }
    return Inject;
  };
}
