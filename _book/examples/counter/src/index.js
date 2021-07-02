import React, { useEffect } from 'react';
import { render } from 'react-dom';
import Counter from './Counter';
import CountShow from './CountShow';

function App(props) {
  return (
    <div>
      <Counter />
      <CountShow />
    </div>
  );
}

render(<App />, document.getElementById('root'));
