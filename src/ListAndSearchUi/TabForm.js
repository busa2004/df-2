import React, { Component } from 'react';
import TableForm from './Table';
import { Tabs, Icon } from 'antd';


const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class TabForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: this.props.reports,
            length:this.props.reports.length,
            holdArray:[],
            waitArray:[],
            progressArray:[],
            columns:this.props.columns
        }
        console.log(';llllllllllllllllllllll' + this.state.columns)
    }

    pushProperty(i){
        
        return {
            "key": i, "title": this.state.reports[i].title,
            "content": this.state.reports[i].content,"date": this.state.reports[i].createdAt,
             "status": this.state.reports[i].status,
             "description" : this.state.reports[i].description,
             "id" :this.state.reports[i].id,
            tags: ['cool', 'teacher']
            };
    }

    init(){
      
        let holdArray= [];
        let waitArray= [];
        let progressArray = [];
     
        for(let i = 0 ;  i < this.state.length; i++){
            if (this.state.reports[i].status == 'PROGRESS') {
                progressArray.push(this.pushProperty(i));
            }else if(this.state.reports[i].status == 'WAIT'){
                waitArray.push(this.pushProperty(i));
            }else if(this.state.reports[i].status == 'HOLD'){
                holdArray.push(this.pushProperty(i));
            }
            
        }
        this.state={
            holdArray:holdArray,
            waitArray:waitArray,
            progressArray:progressArray,
        }
       
    }

    render() {
        this.init();
        return (
         
            <div>
            <p></p>
            <Tabs  type="card" defaultActiveKey="1" onChange={callback}>
                <TabPane tab="대기" key="1"><TableForm modifyConfirm={this.props.modifyConfirm} reports={this.state.waitArray} columns={this.props.columns} modify={true} /></TabPane>
                <TabPane tab="진행" key="2"><TableForm reports={this.state.progressArray}/></TabPane>
                <TabPane tab="보류" key="3"><TableForm reports={this.state.holdArray} hold={true} /></TabPane> 
                
            </Tabs>
            </div>
        );
    }
}
export default TabForm;