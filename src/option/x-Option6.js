import { Table, Divider, Tag } from 'antd';
import React, { Component } from 'react';
import { Pagination } from 'antd';
import { getTask } from '../util/APIUtils';
class Option6 extends Component {



    constructor(props) {
        super(props);
        this.state = {
            tasks: null,
            isLoading: false,
            columns : [{
                title: '제목',
                dataIndex: 'title',
              
                key: 'title',
                render: text => <a href="javascript:;">{text}</a>,
              }, {
                title: '내용',
                dataIndex: 'content',
                key: 'content',
              }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a href="javascript:{console.log('a')};">Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">Delete</a>
                  </span>
                ),
              }],
              
              data : [{
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
              }, {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
              }, {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
              }]
             
        }
        this.loadTask = this.loadTask.bind(this);
        
    }
    
    loadTask() {
      this.setState({
          isLoading: true
      });
    
      getTask()
      .then(response => {
          this.setState({
            tasks: response,
              isLoading: false
          
            });

      }).catch(error => {
          if(error.status === 404) {
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
    
    componentWillMount() {
     this.loadTask('');
     console.log(this.state.tasks)
    }



   
    render () {
        return (
            <div>

<Table pagination={{ defaultPageSize: 10 }} columns={this.state.columns} dataSource={this.state.tasks}/>
</div>
        )
    }
}
export default Option6;