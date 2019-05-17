import React, { Component } from 'react';
import Option4table from '../ListComponent/Option4table';

class EvalTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: this.props.data,
      columns: this.props.colums
    };
  }

  render() {
    return (
      <div className="Option4">
        <Option4table
          columns={this.state.columns}
          data={this.state.datas} />
      </div>
    );
  }
}
export default EvalTask; 