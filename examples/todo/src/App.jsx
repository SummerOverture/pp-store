import React, { Component, useState } from 'react'
import todoStore from './store/todo';
import { inject } from 'pp-store';
import LooseTodoListFC from './components/LooseTodoListFunctionComponent.jsx';
import LooseTodoListCC from './components/LooseTodoListClassComponent';
import StrictTodoListFC from './components/StrictTodoListFunctionComponent';
import StrictTodoListCC from './components/StrictTodoListClassComponent';







function App() {
  return <div>
    <p>=========宽松模式Function Component==========</p>
    <LooseTodoListFC></LooseTodoListFC>

    <p>=========宽松模式Class Component==========</p>
    <LooseTodoListCC></LooseTodoListCC>

    <p>=========严格模式Function Component==========</p>
    <StrictTodoListFC></StrictTodoListFC>

    <p>=========宽松模式Class Component==========</p>
    <StrictTodoListCC></StrictTodoListCC>
  </div>

}
export default App
