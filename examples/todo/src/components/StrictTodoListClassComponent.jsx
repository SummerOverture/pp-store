import React, { Component } from 'react'
import { inject } from 'pp-store';

class TodoListComponent extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      todoItem: '',
    }
  }

  onInput = (e) => {
    this.setState({ todoItem: e.target.value })
  }

  onAdd = () => {
    const { setTodoList } = this.props;
    setTodoList({ type: 'addTodoList', payload: this.state.todoItem });
    this.setState({ todoItem: '' })
  }

  onRemove = (todoItem) => () => {
    const { setTodoList } = this.props;
    setTodoList({ type: 'removeTodoList', payload: todoItem });
  }

  render() {
    const { todoList } = this.props;
    return <div>
      <input value={this.state.todoItem} onChange={this.onInput}></input>
      <button onClick={this.onAdd}>add todoList</button>
      <ul>
        {todoList.list.map((todoItem) => <li key={todoItem}>
          <span style={{ verticalAlign: 'middle' }}>{todoItem}</span>
          <svg onClick={this.onRemove(todoItem)} t="1625034000778" style={{ verticalAlign: 'middle', cursor: 'pointer' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3716" width="32" height="32"><path d="M512 472.66826911L367.84855732 328.484375a27.81129776 27.81129776 0 1 0-39.33173008 39.33173089L472.63581768 512l-144.18389492 144.15144268a27.81129776 27.81129776 0 1 0 39.3317309 39.33173008L512 551.36418232l144.15144268 144.18389492a27.81129776 27.81129776 0 1 0 39.33173008-39.3317309L551.36418232 512l144.18389492-144.15144268a27.81129776 27.81129776 0 1 0-39.3317309-39.33173008L512 472.63581768z" p-id="3717"></path></svg>
        </li>)}
      </ul>
    </div>
  }
}

const InjectTodoListComponent = inject((stores) => {
  const [todoList, setTodoList] = stores.todoStore.useStore();

  return { todoList, setTodoList };
})(TodoListComponent);

export default InjectTodoListComponent;