import React, { Component } from 'react';
import Editor from 'tui-editor';
import {
    Button
    } from 'antd';
import {html} from './html';
import 'tui-color-picker/dist/tui-color-picker.min';
import 'tui-editor/dist/tui-editor-extColorSyntax';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import 'tui-color-picker/dist/tui-color-picker.min.css';
import './TextEdit.css';
import { Input } from 'antd';
import { createTask } from '../util/APIUtils';
import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import { message } from 'antd';
let toastEditor;



class TextEdit extends Component {





    constructor(props){
        super(props);
        this.state = {
            ok: null,
            isLoading: false,
            content : '',
            title:''
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
      
        createTask(task)
        .then(response => {
            this.setState({
                ok:response,
                isLoading: false
            
              });
              toastEditor = new Editor({
                el: document.querySelector('#editSection'),
                initialEditType: 'wysiwyg', // 'markdown'
                previewStyle: 'vertical',
                height: '500px',
                exts: ['colorSyntax']
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
      
      




      handleChange = (e) => {
          console.log(e.target.title)
        this.setState({
          [e.target.title]: e.target.value
        });
      }
    componentDidMount(){
        toastEditor = new Editor({
            el: document.querySelector('#editSection'),
            initialEditType: 'markdown',//'wysiwyg', // 'markdown'
            previewStyle: 'vertical',
            height: '500px',
            exts: ['colorSyntax']
            
        });
        
        toastEditor.setMarkdown(html());
        console.log(toastEditor.getMarkdown())
    };
   
    
    onClick(){
       const task={content:'', title:''};
       
         task.content = toastEditor.getMarkdown();
         task.title = this.state.title;
        this.loadCreateTask(task);
    };
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
                <Input
                    placeholder="Basic usage"
                    value={this.state.title}
                    onChange={this.handleChange}
                    title="title"
                />
                <div id="toastEditor">
                    <div id="editSection"></div>
                </div>
                <div className='submit'>
                    <Button onClick={this.onClick}>등록하기</Button>
                </div>
                
            </div>
        );
    };

};
  

export default TextEdit;