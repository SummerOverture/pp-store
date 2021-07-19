import React, { useState } from 'react';
import todoStore from '../store/todo';

export default function TodoList(props) {
  const [todoList, setTodoList] = todoStore.useStore();

  const [todoItem, setTodoItem] = useState('');

  const onAdd = () => {
    setTodoList({ type: 'addTodoList', payload: todoItem });
    setTodoItem('')
  }

  const onRemove = (todoItem) => () => {
    setTodoList({ type: 'removeTodoList', payload: todoItem });
  }

  return <div>
    <input value={todoItem} onChange={(e) => setTodoItem(e.target.value)}></input>
    <button onClick={onAdd}>add todoList</button>
    <ul>
      {todoList.list.map((todoItem) => <li key={todoItem}>
        <span style={{ verticalAlign: 'middle' }}>{todoItem}</span>
        <svg onClick={onRemove(todoItem)} t="1625034000778" style={{ verticalAlign: 'middle', cursor: 'pointer' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3716" width="32" height="32"><path d="M512 472.66826911L367.84855732 328.484375a27.81129776 27.81129776 0 1 0-39.33173008 39.33173089L472.63581768 512l-144.18389492 144.15144268a27.81129776 27.81129776 0 1 0 39.3317309 39.33173008L512 551.36418232l144.15144268 144.18389492a27.81129776 27.81129776 0 1 0 39.33173008-39.3317309L551.36418232 512l144.18389492-144.15144268a27.81129776 27.81129776 0 1 0-39.3317309-39.33173008L512 472.63581768z" p-id="3717"></path></svg>
      </li>)}
    </ul>
  </div>
}