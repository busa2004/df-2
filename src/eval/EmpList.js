import React, { Component } from 'react';
import { Table, Button } from 'antd';
import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import '../ListAndSearchUi/ScrollList.css';
import { searchEval } from '../util/APIUtils';

class EmpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        title: '사번',
        dataIndex: 'user.id',
        key: 'user_id'
      }, {
        title: '사원 이름',
        dataIndex: 'user.name',
        key: 'name'
      }, {
        title: '업무 시작일',
        dataIndex: 'startDate',
        key: 'start_date'
      }, {
        title: '업무 마감일',
        dataIndex: 'endDate',
        key: 'end_date',
        isCompleted: []
      }],
      userTasks: this.props.userTasks, // 업무를 가진 사원리스트
    }
  }

  evalModal = (userTask) => { // 평가할 사원 업무 // userTasks랑 다름
    console.log(userTask);
    this.props.evalModal(userTask);
  }
  
// 평가? 수정?
  // setButtonName = (taskId) => {
  //   // eval 테이블에서 user_task가 있는지 확인
  //   searchEval(taskId)
  //     .then(response => {
  //       if (response == true) { // 평가완료
  //         this.state.isCompleted = "수정"          
  //       } else if (response == false) {          
  //         this.state.isCompleted = "평가"          
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  componentWillMount() {
    this.setState({
      columns: this.state.columns.concat({
        title: '평가',
        dataIndex: 'evalId',
        key: 'evalId',
        render: (text, record) => {
          // this.setButtonName(record.id);
          let evalModal = () => {
            this.evalModal(record);
          }
          // console.log(this.state.isCompleted);
          return <Button
            onClick={evalModal}
            disabled={this.props.evalButtonVisible}
          >평가</Button>
        }
      })
    });
  }
  // {this.state.isCompleted[record.id]}

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
        <Table
          columns={this.state.columns}
          dataSource={this.state.userTasks} />
      </div>
    );
  }
}

export default EmpList;