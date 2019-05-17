import { Table, Divider, Tag } from 'antd';
import React, { Component } from 'react';
import ModalTest from './ModalTest';
import { Popconfirm, message,Button } from 'antd';

class DatePickers extends Component {

  constructor(props) {
    super(props);
    this.state = {
        reports: this.props.reports,
        columns : [{
          title: '제목',
          dataIndex: 'title',
          key: 'title',
        }, {
          title: '작성일자',
          dataIndex: 'date',
          key: 'date',
          render: (text, row, index) => {
            let date = new Date(text);
            return <div>{date.getFullYear()+"-"+
                        (date.getMonth()+1)+"-"+
                        date.getDate()}<br/>{
                        date.getHours()+":"+
                        date.getMinutes()+":"+
                        date.getSeconds()
                         }</div>
          }
        },{
          title: '상태',
          dataIndex: 'status',
          key: 'status',
        } , {
          title: '보고서 보기',
          key: 'description',
          dataIndex: 'description',
          render: (text, row, index) => (
           <ModalTest hold={this.props.hold} data={row} modify={this.props.modify} modifyConfirm={this.props.modifyConfirm} />          
           ),
        }],
        
        
    }
    if(this.props.columns != undefined){
        this.state.columns = this.state.columns.concat(this.props.columns)
    }
   
}

 






  render() {

    return (<div>
     
      <Table columns={this.state.columns} dataSource={this.state.reports} />
      </div>
    );
  }
}
export default DatePickers;