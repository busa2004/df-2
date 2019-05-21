import React, { Component } from 'react';
import { Table } from 'antd';

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
        <Table
          columns={this.state.columns}
          dataSource={this.state.datas} />
      </div>
    );
  }
}
export default EvalTask; 