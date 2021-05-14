import React, { Component } from 'react';
import inject from './inject';

class Test extends Component {
  constructor(props) {
    super(props);
    console.log(this, this.props);
  }

  render() {
    return (
      <div>
        hello world
        {JSON.stringify(this.props)};
      </div>
    );
  }
}
export default inject(state => state.count)(Test);
