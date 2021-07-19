import React, { Component } from 'react';
import { inject } from 'pp-store';

class LooseTodoListCC extends Component {
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

  onRemove = (todoItem) => {
    const { todoData, setTodoData } = this.props;
    const index = todoData.list.findIndex((item) => item === todoItem);

    todoData.list.splice(index, 1);
    setTodoData({ list: [...todoData.list] });
  }

  onAdd = () => {
    const { todoData, setTodoData } = this.props;
    const { todoItem } = this.state;
    if (todoData.list.includes(todoItem)) {
      return;
    }

    setTodoData({ list: [...todoData.list, todoItem] });
    this.setState({ todoItem: '' })
  }

  render() {
    const { todoData } = this.props;
    return <div>
      <input value={this.state.todoItem} onChange={this.onInput}></input>
      <button onClick={this.onAdd}>add todoData</button>
      <ul>
        {todoData.list.map((todoItem) => <li key={todoItem}>
          <span style={{ verticalAlign: 'middle' }}>{todoItem}</span>
          <svg onClick={() => this.onRemove(todoItem)} t="1625034000778" style={{ verticalAlign: 'middle', cursor: 'pointer' }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3716" width="32" height="32"><path d="M512 472.66826911L367.84855732 328.484375a27.81129776 27.81129776 0 1 0-39.33173008 39.33173089L472.63581768 512l-144.18389492 144.15144268a27.81129776 27.81129776 0 1 0 39.3317309 39.33173008L512 551.36418232l144.15144268 144.18389492a27.81129776 27.81129776 0 1 0 39.33173008-39.3317309L551.36418232 512l144.18389492-144.15144268a27.81129776 27.81129776 0 1 0-39.3317309-39.33173008L512 472.63581768z" p-id="3717"></path></svg>
        </li>)}
      </ul>
    </div>
  }
}

const InjecttodoListComponent = inject((stores) => {
  const [todoData, setTodoData] = stores.looseTodoStore.useStore();

  return { todoData, setTodoData };
})(LooseTodoListCC);

export default InjecttodoListComponent;