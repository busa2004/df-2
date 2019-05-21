import React, { Component } from 'react';
import { Table } from 'antd';

class Option4table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      columns: this.props.columns,
    };
    console.log(this.props.data);
  }
  render() {
    return <Table columns={this.state.columns} dataSource={this.state.data} />;
  }
}


export default Option4table;