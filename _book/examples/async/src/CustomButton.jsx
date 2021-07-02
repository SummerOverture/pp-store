import React, { forwardRef, useImperativeHandle, useRef } from 'react';

function MyInput({ injectRef }) {
  const inputRef = useRef()
  function log() {
    console.log(inputRef.current.value);
  }
  useImperativeHandle(injectRef, () => ({
    log
  }))
  return <input ref={inputRef} />
}



class ClassInput extends React.Component {
  constructor(props) {
    super()
    props.injectRef.current = this;
  }

  render() {
    return <input />
  }
}

const Component = forwardRef((props, ref) => {
  return <MyInput {...props} injectRef={ref}></MyInput>
  // return <ClassInput {...props} injectRef={ref}></ClassInput>
})



export default function Demo() {
  const ref = useRef();

  return <>
    <button onClick={() => {
      ref.current.log()
    }}>show</button>
    <Component ref={ref}></Component>
  </>
}