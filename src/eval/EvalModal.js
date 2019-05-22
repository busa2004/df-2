import React, { Component } from 'react';
import VersionSelect from './VersionSelect';

import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import { Table, Modal, notification } from 'antd';
import { setEvalScore } from '../util/APIUtils';
import ModalInput from './ModalInput';

class EvalModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        columns: [{
          title: '버전 번호',
          dataIndex: 'itemNo',
          key: 'no',
          width: '20%'
        }, {
          title: '버전 내용',
          dataIndex: 'content',
          key: 'content',
          width: '50%'
        }],
        isLoading: true,
        itemList: null,
        version: '',
        scores: [], // { itemList }, score,
        userTask: this.props.userTask
      };
  }

  // modal
  handleOk = () => {
    // 사번, 평가항목들, 업무번호
    console.log("Eval.js >> handleOk()");
    console.log(this.props.userTask);
    console.log(this.state.scores); // modal table.. itemList랑 score 다 있음
    console.log(this.state.version);

    // 점수 입력 확인
    let notifyUser = false;
    this.state.scores.map( (item) => {
      if(item.score == -12345) {
        notifyUser = true
      }
    });
    if(notifyUser) { alert('점수를 입력해주세요.'); }

    const evalUserTask = {
      scores: this.state.scores,
      version : this.state.version,
      userTask: this.props.userTask
    }
    
    // 1. 평가항목점수 setting
    setEvalScore(evalUserTask)
      .then(response => {
        console.log(response); // 디비에 저장된 eval row가 넘어옴
        notification.success({ // 옆에 표시 띄우기
          message: 'version',
          description: "Successfully saved score! Automatically refreshes now!"
        });
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: 'version',
          description: "Failed to save eval score.."
        })
      });

    this.props.modalControl(false);
    this.props.refresh();
  }

  handleCancel = () => {
    this.props.modalControl(false);
  }


  handleInputChange = ( event, record) => {
    const target = event.target;
    const inputValue = target.value;   

    this.state.scores.map( (item, key) => {
      if(record.itemNo == item.evalItem.itemNo) {
        this.state.scores[key].score = Number(inputValue);
      }
    });
  }
  
  componentWillMount() {
    this.setState({
      // userTask: this.props.userTask,
      columns: this.state.columns.concat({
          title: '점수',
          dataIndex: 'score',
          key: 'score',  
          width: '20%',        
          render: (text, record) => { // record = version에 따른 itemList
            console.log(this.props.userTask);
            return <ModalInput 
                      userTask={this.props.userTask}
                      record={record}
                      handleInputChange={this.handleInputChange} />
          }
      }),
      isLoading: false
    });
  }

  itemListCallback = (childItemList) => { 
    childItemList.map( (item) => {
      const newData = {
        evalItem : item,
        score: -12345
      }
      this.setState({
        scores: [...this.state.scores, newData]
      })
    });
    this.setState({
        itemList: childItemList,
        isLoading: false
    });
  }

  setVersion = (childVersion) => {
    this.setState({
      version: childVersion // version json임
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

    return(
      <div>
      <Modal title="평가하기" 
        visible={this.props.visible} 
        onOk={this.handleOk} 
        onCancel={this.handleCancel}
      >
        <VersionSelect 
          getItemList={this.itemListCallback}
          setVersion={this.setVersion}
          disabled={true} />
        <Table
          columns={this.state.columns}
          dataSource={this.state.itemList}
          pagination={false} />     
      </Modal>
      </div>
    );
  }
}

export default EvalModal;