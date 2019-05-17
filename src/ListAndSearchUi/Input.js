import React, { Component } from 'react';
import {
    Input, Select, Button, Modal, Radio
 } from 'antd';
 import { DatePicker } from 'antd';

 const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
 
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const radioStyle = {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
  };
class OptionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      visible: false 
    }
    this.onChange = this.onChange.bind(this);
}
onChange(date, dateString) {
    console.log(date, dateString);
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
     <div className="information" >
        <div style={{marginBottom:'5px'}}>
        <InputGroup compact>
          <Input className="up" value="사원선택" style={{ width: '20%',cursor:'default'}} readOnly/>
          <Input style={{ width: '70%' }} placeholder="업무" value={this.state.value} />
          <Button icon="search" style={{ width: '10%' }} onClick={this.showModal} ></Button>
          <Modal
          title="업무선택하기"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
           >
        <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio style={radioStyle} value={'호우'}>호우</Radio>
        <Radio style={radioStyle} value={'쮓'}>쮓</Radio>
        <Radio style={radioStyle} value={'찌아쓰'}>찌아쓰</Radio>
          </RadioGroup>
        </Modal>
        </InputGroup>
        </div>


        <InputGroup compact>
          <Input className="up" value="업무선택" style={{ width: '20%',cursor:'default'}} readOnly/>
          <Input style={{ width: '70%' }} placeholder="업무" value={this.state.value} />
          <Button icon="search" style={{ width: '10%' }} onClick={this.showModal} ></Button>
          <Modal
          title="업무선택하기"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
           >
        <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio style={radioStyle} value={'호우'}>호우</Radio>
        <Radio style={radioStyle} value={'쮓'}>쮓</Radio>
        <Radio style={radioStyle} value={'찌아쓰'}>찌아쓰</Radio>
          </RadioGroup>
        </Modal>
        </InputGroup>


        <RangePicker onChange={this.onChange} />
    </div>
        );
    }
}
 export default OptionInput;