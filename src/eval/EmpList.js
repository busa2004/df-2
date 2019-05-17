import React, { Component } from 'react';
import { Button, Input } from 'antd';
import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import '../ListAndSearchUi/ScrollList.css';
import Option4table from '../ListComponent/Option4table';

const Search = Input.Search;

class EmpList extends Component {
  constructor(props) {
    super(props);
    this.state={
      taskId: this.props.taskId,
      columns: [{
        title: '사번',
        dataIndex: 'user.id',
        key:'user_id'
      }, {
        title: '이름',
        dataIndex: 'user.name',
        key: 'name'
      }, {
        title: '업무 시작일',
        dataIndex: 'startDate',
        key: 'start_date'
      }, {
        title: '업무 마감일',
        dataIndex: 'endDate',
        key: 'end_date'
      }],
      tasks: this.props.tasks,
      search: '',
      evalButtonVisible: this.props.evalButtonVisible
    }
    console.log(this.state.tasks);
  }  

  getUser = (e) => {    
    console.log(e.target.value);
    // this.props.clickButton(e.target.value);
  }

  componentWillMount() {
    this.setState({
      columns: this.state.columns.concat({
          title: 'Evaluation',
          dataIndex: 'evalId',
          key: 'evalId',          
          render: () => {
            return <Button 
                      value={this.state.columns.dataIndex} 
                      onClick={this.getUser}
                      disabled={this.state.evalButtonVisible}
                    >평가</Button>
          }
      })
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }
    return (
      <div>
        <Option4table
          columns={this.state.columns}
          data={this.state.tasks} />
      </div>
    );
  }
}

export default EmpList;