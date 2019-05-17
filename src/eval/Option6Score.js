import React, { Component } from 'react';
import { Input,message,InputNumber, Button } from 'antd';


class App extends React.Component {
  state = {
    disabled: true,
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  setvalue=()=>{
      this.setState({
          num: this.state.value,
      });
      message.info('수정완료');
  }

  render() {
      console.log(this.state.num);
    return (
      <div>
        <div style={{textAlign:"center",marginTop:"15px"}}>
        <Input  className="up" value="근태" style={{ width: '20%',cursor:'default',textAlign:"center"}} readOnly/>
        <Input  className="up" value="보고서" style={{ width: '20%',cursor:'default',textAlign:"center"}} readOnly/>
        <Input  className="up" value="봉사" style={{ width: '20%',cursor:'default',textAlign:"center"}} readOnly/>
        <Input  className="up" value="성과" style={{ width: '20%',cursor:'default',textAlign:"center"}} readOnly/>
        </div>
        <div className="inNumber" style={{textAlign:"center"}}>
        <InputNumber style={{ width: '20%'}} min={0} max={100} disabled={this.state.disabled}  />
        <InputNumber style={{ width: '20%'}} min={0} max={100} disabled={this.state.disabled}  />
        <InputNumber style={{ width: '20%'}} min={0} max={100} disabled={this.state.disabled}  />
        <InputNumber style={{ width: '20%'}} min={0} max={100} disabled={this.state.disabled}  />
        </div>
        <div style={{ marginTop: 20, textAlign:"right" }}>
          <Button onClick={this.toggle} >수정</Button>
          <Button style={{marginLeft:"5px"}} onClick={this.setvalue} type="primary">확인</Button>
        </div>
      </div>
    );
  }
}


class Option6score extends Component {
    render() {
        return (
            <div>
                <App />
                </div>
        );
    }
}
 export default Option6score;