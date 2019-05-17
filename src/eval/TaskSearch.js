import React, { Component } from 'react';
import {
  Input, Select, Button, Modal, Radio
} from 'antd';
import Option4Search from '../ListComponent/Option4Search';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const radioStyle = {
  display: 'block',
  height: '40px',
  lineHeight: '40px',
};
class TaskSearch extends Component {
  state = {
    value: '',
    visible: false,
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  // select Report
  handleChange = (selectedReport) => {
    console.log(selectedReport);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  search = (searchValue) => {
    console.log(searchValue);
    this.setState({
      visible:false
    });
  }

  // handleInputChange = (e) => {
  //   const target = e.target;
  //   const inputSearch = target.name; // input 안에 name이 가리키는 값 -> search
  //   const inputValue = target.value; // search에 들어간 값

  //   this.setState({
  //     [inputSearch]: inputValue
  //   });
  //   console.log(this.state.search);
  // }


  render() {
    return (
      <div style={{ width: "100%", marginLeft: 10 }} >
        <InputGroup compact>
          <Select defaultValue="보고서 선택" style={{ width: '30%' }} onChange={this.handleChange}>
            <Option value="일일">일일 보고서</Option>
            <Option value="주간">주간 보고서</Option>
            <Option value="월간">월간 보고서</Option>
          </Select>
          {/* <Input style={{ width: '60%' }} autoComplete="off" placeholder="업무" name="search" value={this.state.search} onChange={event => this.handleInputChange(event)} /> */}
          
          <Button icon="search" style={{ width: '10%', marginLeft: 5}} onClick={this.showModal} ></Button>
          <Modal
            title="업무선택하기"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onOk={this.handleOk}
          >
          
          <Option4Search search={this.search} />
            {/* <Option4Search
              searchValue={this.state.search}
              search={this.search} /> */}
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <Radio style={radioStyle} value={'호우'}>호우</Radio>
              <Radio style={radioStyle} value={'쮓'}>쮓</Radio>
              <Radio style={radioStyle} value={'찌아쓰'}>찌아쓰</Radio>
            </RadioGroup>
          </Modal>
        </InputGroup>
      </div>
    );
  }
}
export default TaskSearch;