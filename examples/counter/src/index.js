import React, { useEffect } from 'react';
import { render } from 'react-dom';
import Counter from './counterExample';
import Test from './Test';
// import counterStore, { useCounterStore, TYPES } from './store';

function App(props) {
  return (
    <div>
      Test:
      <Test />
      <p>====</p>
      <Counter />
    </div>
  );
}

render(<App />, document.getElementById('root'));
