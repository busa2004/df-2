import React, { Component } from 'react';
import { Input, Icon, Button, Card } from 'antd';
import Highlighter from 'react-highlight-words';

import { getTask, getByTask, searchEval } from '../util/APIUtils';
import EmpList from './EmpList';
import EvalModal from './EvalModal';
import EvalTask from './EvalTask';

import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';


// 업무리스트component 기반으로 만들어진 component
class Eval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        title: '업무 번호',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id')
      }, {
        title: '업무 제목',
        dataIndex: 'title',
        key: 'title',
        ...this.getColumnSearchProps('title')
      }, {
        title: '업무 내용',
        dataIndex: 'content',
        key: 'content',
        ...this.getColumnSearchProps('content')
      }],
      visible: false,
      evalDatas: null,
      taskId: 0,
      userTasks: null,
      isCompleted: false
    }
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => { this.searchInput = node; }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })


  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  load = () => {
    this.setState({
      isLoading: true,
    });
    getTask()
      .then(response => {
        this.setState({
          evalDatas: response,
          isLoading: false
        });
      }).catch(error => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false
          });
        }
      });
  }

  // 업무리스트 평가버튼
  componentWillMount() {
    this.setState({
      columns: this.state.columns.concat({
        title: '평가',
        dataIndex: 'id',
        key: 'id',
        render: (text) => {
          let getUser = () => {
            this.getUser(text);
          }
          return <Button onClick={getUser}>평가</Button>
        }
      })
    });
    this.load();
  }
  getUser = (childTaskId) => {
    this.setState({
      isLoading: true,
    });

    getByTask(childTaskId)
      .then(response => {
        this.setState({
          userTasks: response,
          taskId: childTaskId
        });
        console.log(this.state.userTasks); // 업무리스트에서 평가버튼을 누르면 업무를 가진 사원리스트 뜬다
        // console.log(response);
        // empList 가져오고 평가하기 버튼 활성화/비활성화여부
        var d = new Date();
        var tmpToday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var today = new Date(tmpToday);
        var endDate = new Date(response[0].endDate);

        if (today > endDate) {
          // 업무가 마감되지 않았으므로 평가를 할 수 없다.
          this.setState({
            evalButtonVisible: false, // 평가버튼 비활성화
          });
        } else {
          this.setState({
            evalButtonVisible: true, // 평가버튼 활성화
          });
        }
        this.setState({
          isLoading: false
        });
      })
      .catch(error => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false
          });
        }
      });
  }
  // 사원 선택하고나서 평가 모달띄우기..
  evalModal = (childUserTask) => {
    this.modalControl(true); // modal control.. true : visible
    this.setState({
      userTask: childUserTask
    });
  }

  modalControl = (v) => {
    this.setState({
      visible: v
    })
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
        <Card title='평가하기'>
          <EvalTask
            data={this.state.evalDatas}
            colums={this.state.columns} />

          <br /> <br />

          <EmpList
            userTasks={this.state.userTasks} // 업무를 가진 사원리스트
            evalModal={this.evalModal}
            evalButtonVisible={this.state.evalButtonVisible}
            buttonName={this.state.buttonName} />

          {/* 평가 component */}
          <EvalModal
            visible={this.state.visible}
            userTask={this.state.userTask} // 평가할 사원의 업무
            taskId={this.state.taskId}
            modalControl={this.modalControl}
          />
        </Card>
      </div>
    );
  }
}
export default Eval;