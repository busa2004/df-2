import React, { Component } from 'react';
import {
    Input, Select, Button, Modal, Radio
 } from 'antd';
 import Option4Search from './Option4Search';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
  };
class Option4Input extends Component {
    state = { value: '',
             visible: false 
            }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
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
        value: '',
        visible: false,
      });
    }
     
    
    render() {
        return (
     <div style={{width:"100%"}} >
        <InputGroup compact>
          <Select defaultValue="일일" style={{width: '30%' }}>
            <Option value="일일">일일 보고서</Option>
            <Option value="주간">주간 보고서</Option>
            <Option value="월간">월간 보고서</Option>
          </Select>
          <Input style={{ width: '60%' }} autoComplete="off" placeholder="업무" value={this.state.value} />
          <Button icon="search" style={{ width: '10%' }} onClick={this.showModal} ></Button>
          <Modal
          title="업무선택하기"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
         <Option4Search 
                searchValue={this.state.search}
                search={this.search}/>
                
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
 export default Option4Input;