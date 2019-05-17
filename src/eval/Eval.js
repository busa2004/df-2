import React, { Component } from 'react';
import { Input, Icon, Button, Card, Modal } from 'antd';
import Highlighter from 'react-highlight-words';

import { getTask, getByTask } from '../util/APIUtils';
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
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id')
      },{
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        ...this.getColumnSearchProps('title')
      }, {
        title: 'content',
        dataIndex: 'content',
        key: 'content',
        ...this.getColumnSearchProps('content')
      }],
      visible: false,
      // empNo: 0, // 평가할 사원의 id
      evalDatas: null,
      taskId: 0,
      users: null,
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
  
  // 날짜 선택하고 task list를 가져올 때 평가하기 버튼 추가 삽입
  componentWillMount() {
    this.setState({
      columns: this.state.columns.concat({
          title: 'Evaluation',
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
          users: response,
          taskId: childTaskId
        });

        // empList 가져오고 평가하기 버튼 활성화/비활성화여부
        var d = new Date();
        var tmpToday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        var today = new Date(tmpToday);
        var endDate = new Date(response[0].endDate);
        
        if(today > endDate){
          // 업무가 마감되지 않았으므로 평가를 할 수 없다.
          this.setState({
            evalButtonVisible: false,
          });
        } else {
          this.setState({
            evalButtonVisible: true,
          });
        }
        this.setState({
          isLoading:false
        })
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
  
  // 사원 선택하고나서 평가하기..
  clickButton = (childEmpNo) => {
    console.log('hi'); // 평가할 사원의 no
    this.setState({
      empNo: childEmpNo,
      visible: true
    });
  }

  // modal
  handleOk = () => {
    console.log("Eval.js >> handleOk()");
    this.setState({
      visible: false
    });
  }

  handleCancel = () => {
    console.log("Eval.js >> handleCancel()");
    this.setState({
      visible: false
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
        <Card title='평가하기'>
          <EvalTask
            data={this.state.evalDatas}
            colums={this.state.columns}/>
          
          <br/> <br/>

          <EmpList 
            taskId={this.state.taskId} 
            tasks={this.state.users}
            clickButton={this.clickButton}
            evalButtonVisible={this.state.evalButtonVisible} />

          <Modal title="평가하기" 
            visible={this.state.visible} 
            onOk={this.handleOk} 
            onCancel={this.handleCancel}
          >
            <div>
              {/* 평가 component */}
              <EvalModal />
            </div>            
          </Modal>
        </Card>
      </div>
    );
  }
}
export default Eval;