import React, { Component } from 'react';
import { Table } from 'antd';
import Item from 'antd/lib/list/Item';
import TransferList from 'antd/lib/transfer/list';



  
const columns = [{
  title: '제목',
  dataIndex: 'name',
  filters: [{
    text: 'Joe',
    value: 'Joe',
  }, {
    text: 'Jim',
    value: 'Jim',
  }, {
    text: 'Submenu',
    value: 'Submenu',
    children: [{
      text: 'Green',
      value: 'Green',
    }, {
      text: 'Black',
      value: 'Black',
    }],
  }],
  // specify the condition of filtering result
  // here is that finding the name started with `value`
  onFilter: (value, record) => record.name.indexOf(value) === 0,
  sorter: (a, b) => a.name.length - b.name.length,
  sortDirections: ['descend'],
}, {
  title: '내용',
  dataIndex: 'age',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.age - b.age,
}, {
  title: '기한',
  dataIndex: 'address',
  filters: [{
    text: 'London',
    value: 'London',
  }, {
    text: 'New York',
    value: 'New York',
  }],
  filterMultiple: false,
  onFilter: (value, record) => record.address.indexOf(value) === 0,
  sorter: (a, b) => a.address.length - b.address.length,
  sortDirections: ['descend', 'ascend'],
}];

// const data = this.props.userTasks.map(
//   (userTask, index) => ({
//     key:index,
//     name : '1',
//     age:'1',
//     address:userTask.task.title
//   })
// );


function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class Option1Table extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      userTasks: this.props.userTask,
       length:this.props.userTask.length,
       
      
    }
  
  }

  a(){
    let a =new Object();
    let aJsonArray = new Array();
    for(let i = 0 ;  i < this.state.length; i++){
      
      a.key = i;
      a.name = this.state.userTasks[i].task.title;
      a.age = this.state.userTasks[i].task.title;
      a.address = 1;
      aJsonArray.push({"key":a.key,"name":a.name,"age":a.age,"address":a.address});

      
      console.log(a); 
      
     
      console.log(aJsonArray)
    }
    this.state ={
      aJsonArray:aJsonArray
    }
  }
   
  
    render() {
       this.a()
        return (
           
        
           
            
            <Table columns={columns} dataSource={this.state.aJsonArray} onChange={onChange} />
        );
    }
}
 export default Option1Table;