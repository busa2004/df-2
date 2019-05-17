import React, { Component } from 'react';
import {
    Button
    } from 'antd';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import { createTask,createReport } from '../util/APIUtils';
import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import { message } from 'antd';
import {
    Input, Select
 } from 'antd';
 import {html} from './html';
 const Option = Select.Option;
const InputGroup = Input.Group;
class TextEdit extends Component {
    constructor(props){
        super(props);
        this.state = {
            ok: null,
            isLoading: false,
            content : '',
            title:'',
            router:this.props.router
        };
        this.onClick = this.onClick.bind(this);
        this.loadCreateTask = this.loadCreateTask.bind(this);
    };
    success = () => {
        message.success('새로운 업무를 등록하였습니다.');
    };
    loadCreateTask(task) {
        this.setState({
            isLoading: true
        });
        if(this.state.router=='task'){
        createTask(task)
        .then(response => {
            this.setState({
                ok:response,
                isLoading: false
              });
            this.success();
              console.log(this.state.ok)
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
    }else if(this.state.router=='report'){
        createReport(task)
        .then(response => {
            this.setState({
                ok:response,
                isLoading: false
              });
            this.success();
              console.log(this.state.ok)
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
    }


     
    componentDidMount(){

    };
   
    
    onClick(){
       const task={content:'', title:''};
       
         task.content = this.state.content;
         task.title = this.state.title;
         if(this.state.router=='report'){
            task.userTaskId = 1;
         }
        this.loadCreateTask(task);
    };
    onChange=(e)=>{
        this.setState({
            [e.target.title]: e.target.value
          });
    }
    updateContent = (value) => {
        this.setState({content:value})
    }
    /**
     * @property Jodit jodit instance of native Jodit
     */
	jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        width: '100%',
        height: 600
    }
    render(){
        if(this.state.isLoading) {
            return <LoadingIndicator />;
          }
          
          if(this.state.notFound) {
            return <NotFound />;
          }
          
          if(this.state.serverError) {
            return <ServerError />;
          }
        return (
            <div>
                <div className="information" >
        <InputGroup compact>
          <Select defaultValue="일일" style={{ width: '20%' }} onChange={this.updateContent}>
            <Option value="일일">일일 보고서</Option>
            <Option value={html()}>주간 보고서</Option>
            <Option value="월간">월간 보고서</Option>
          </Select>
          <Input title={'title'} value={this.state.title} style={{ width: '65%' }} placeholder="제목" onChange={this.onChange}/>
          <Select style={{ width: '15%' }} placeholder="결제선 지정">
            <Option value="팀장">팀장</Option>
          </Select>
        </InputGroup>
    </div>
                 <JoditEditor
            	editorRef={this.setRef}
                value={this.state.content}
                config={this.config}
                onChange={this.updateContent}
                />
                <div className='submit'>
                    <Button onClick={this.onClick}>등록하기</Button>
                </div>
               
            </div>
        );
    };

};



export default TextEdit;