import React, { useRef } from 'react';
import counterStore from './store';

export default function Counter(props) {
  const [value] = counterStore.useStore(s => s.count);
  const renderTimes = useRef(0);

  renderTimes.current += 1;
  return (
    <div>
      <h2>CountShow</h2>
      <p>current store count: {value}</p>
      <p>
        current component render times (will not render if store.loading
        change): {renderTimes.current}
      </p>
    </div>
  );
}
