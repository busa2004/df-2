import React, { Component } from 'react';
import { Input, Select, notification } from 'antd';
import { getAllEvalVersion, getEvalItemByVersion, getVersionObj } from '../util/APIUtils';
import LoadingIndicator from '../common/LoadingIndicator';

import './VersionSelect.css';

const { Option } = Select;
const InputGroup = Input.Group;

class VersionSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isLoading: false, // sync 여부
      version: "",
      versionObj: null,
      versionList: new Array(), // Select에서 보여질 version List
      itemList: null // 버전 선택시 테이블에 들어갈 평가 항목 리스트
    };
  }

  // First run function
  // select version list 
  loadVersion = () => {
    this.setState({
      isLoading: true
    });

    getAllEvalVersion()
      .then(response => {
        let array = new Array();
        response.map((date) => {
          array.push(date);
        });
        this.setState({
          isLoading: false,
          versionList: array,
          version: array[array.length - 1]      // array == versionList // 화면 할당시 최근 버전으로 셋팅
        });

        this.handleChange(this.state.version);  // 초기 화면 갱신 시 버전에 맞는 item list를 테이블에 뿌리기 위해서
      })
      .catch(error => {
        console.error(error);
        notification.error({
          message: 'versionList',
          description: "loadVersion : Version List call failed..."
        });
        this.setState({
          isLoading: false
        });
    });
  }

  // Select a version to get a list of items.
  handleChange = (selectedVersion) => {
    console.log(`selected ${selectedVersion}`);

    // version Name으로 version JSON 가져오기
    getVersionObj(selectedVersion)
      .then(response => {
        this.setState({
          versionObj: response
        });
        this.props.setVersion(this.state.versionObj);        
      })
      .catch(error => {
        console.error(error);
      });

    // 버전에 맞는 itemList가져오기
    getEvalItemByVersion(selectedVersion)
      .then(response => { 
        this.setState({
          itemList: response, // 버전에 맞는 itemList들
          version: selectedVersion
        });

        // Forward data to parent component for table setting.
        this.props.getItemList(this.state.itemList);
      })
      .catch(error => {
        console.error(error);
      });
   }

  componentDidMount() {
    this.loadVersion();
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    
    return (
      <div style={{ textAlign: "right", width: "100%", marginBottom: 5 }}>
        <InputGroup compact>
          <Select 
            defaultValue={this.state.version} 
            style={{ width: 200 }} 
            onChange={this.handleChange}
            disabled={this.props.disabled} >
            { this.state.versionList.map((date) => <Option value={date}>{ date }</Option>) }
          </Select>
        </InputGroup>
      </div>
    );
  }
}

export default VersionSelect;