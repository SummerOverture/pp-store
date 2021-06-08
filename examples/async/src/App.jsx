import React, { useCallback, useState, useEffect, Component, memo, createElement, createRef, useRef, useMemo } from 'react'
import counterStore from './store/counter';
import cartStore from './store/cart';
import ReactDOM from "react-dom";
import { inject } from 'pp-store';
import CustomButton from './CustomButton';



function Counter(props) {
  // const [counter, setCounter] = counterStore.useStore();
  const { counter, setCounter } = props;
  return <div>
    <button onClick={() => setCounter({ type: 'increment' })}>increment</button>
    <p>{counter.count}</p>
  </div>
}

function Cart(props) {
  // const [cart, setCart] = cartStore.useStore();
  const { cart, setCart } = props;
  return <div>
    <button onClick={() => setCart({ type: 'addCart', payload: Date.now() })}>add cart</button>
    <ul>
      {cart.list.map((goodsName) => <li key={goodsName}>{goodsName}</li>)}
    </ul>
  </div>
}

class Demo extends Component {
  constructor(props) {
    super()
    console.log(props);
  }

  render() {
    const { counter, setCounter, cart, setCart, children } = this.props;
    return <div>
      {/* <Counter counter={counter} setCounter={setCounter} />
      <Cart cart={cart} setCart={setCart} /> */}
      <div>
        <button onClick={() => setCounter({ type: 'increment' })}>increment</button>
        <p>{counter.count}</p>
      </div>

      <div>
        <button onClick={() => setCart({ type: 'addCart', payload: Date.now() })}>add cart</button>
        <ul>
          {cart.list.map((goodsName) => <li key={goodsName}>{goodsName}</li>)}
        </ul>
      </div>
      {children}
    </div>
  }
}


// const Child = memo(function C(props) {
//   return <p>{JSON.stringify(props)}</p>
// }, (p, c) => {
//   console.log(JSON.stringify(p));
//   console.log(JSON.stringify(c));
//   return p.user === c.user;
// })

const InjectDemo = inject((stores) => {
  // console.log(stores);
  const [counter, setCounter] = stores.counterStore.useStore();
  const [cart, setCart] = stores.cartStore.useStore();

  return { counter, setCounter, cart, setCart };
})(Demo);

console.log(InjectDemo);

function App() {
  const [id, setId] = useState(1);
  const [user, setUser] = useState({ name: 'zzp' })
  const ref = useRef();


  const children = useMemo(() => <p>123</p>, [])

  return <div>
    <button onClick={() => setId(id + 1)}>add Id</button>
    <button onClick={() => {
      console.log(ref.current);
    }}>showRef</button>
    <p>{id}</p>

    <InjectDemo setId={setId} ref={ref} >
    </InjectDemo>
    <CustomButton></CustomButton>
    {/* <Child user={user}></Child> */}
  </div>
  // return <>
  //   <Counter></Counter>
  //   <Cart></Cart>
  // </>
}
export default App
