import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';

const columns = [{
  title: '상태',
  dataIndex: 'state',
  filters: [{
    text: '시작',
    value: 'start',
  }, {
    text: '마감',
    value: 'end',
  }],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value, record) => record.state.indexOf(value) === 0,
}, {
  title: '제목',
  dataIndex: 'title',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.title - b.title,
}, {
  title: '내용',
  dataIndex: 'content',
  sorter: (a, b) => a.content.length - b.content.length,
  sortDirections: ['descend', 'ascend'],
}];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
  
}

class Option1Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[],
        cnt:0,
    }
  }

    render() {
     // console.log(this.props.time.format('YYYY-MM-DD'));
      //console.log(moment(this.props.data[0].createdAt).format('YYYY-MM-DD'));
      const datas = this.props.data;
      const size = 3;
      for(let i=0;i<this.state.cnt;i++){
      this.state.data.pop();
      }
      
      for(let i=0;i<datas.length;i++){
        if(this.props.time.format('YYYY-MM-DD')===moment(this.props.data[i].startDate).format('YYYY-MM-DD')) {
          
          if(moment(this.props.data[i].startDate).format('YYYY-MM-DD')===moment(this.props.data[i].endDate).format('YYYY-MM-DD')){
            this.state.data.push({title:this.props.data[i].title, content: this.props.data[i].content, state:'마감day'}); 
            this.state.cnt++;
          }else{
            this.state.data.push({title:this.props.data[i].title, content: this.props.data[i].content, state:'시작day'}); 
            this.state.cnt++
          }
        }else if(this.props.time.format('YYYY-MM-DD')===moment(this.props.data[i].endDate).format('YYYY-MM-DD')){
          this.state.data.push({title:this.props.data[i].title, content: this.props.data[i].content, state:'마감day'}); 
          this.state.cnt++
        }
      }

      return (
            <Table columns={columns} dataSource={this.state.data} onChange={onChange} pagination={{ defaultPageSize: 3 }} />
        );
       

    }
}
 export default Option1Table;