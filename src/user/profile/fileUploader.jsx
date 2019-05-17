import React, { Component } from 'react';
import { FileService } from './file-service.jsx';
import { Avatar } from 'antd';
import {BASE_URL} from '../../constants/index'
import { Upload, Button, Icon } from 'antd';
import './fileUploader.css';
export class FileUploader extends Component {
    constructor() {
        super();
        this.fileService = new FileService();
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        //using File API to get chosen file
        let file = event.target.files[0];
        console.log("Uploading file", event.target.files[0]);
        data.append('file', event.target.files[0]);
        data.append('name', 'my_file');
        data.append('description', 'this file is uploaded by young padawan');
        let self = this;
        //calling async Promise and handling response or error situation
        this.fileService.uploadFileToServer(data).then((response) => {
            console.log("File " + file.name + " is uploaded");
            this.props.refresh()
        }).catch(function (error) {
            console.log(error);
            if (error.response) {
                //HTTP error happened
                console.log("Upload error. HTTP error/status code=",error.response.status);
            } else {
                //some other error happened
               console.log("Upload error. HTTP error/status code=",error.message);
            }
        });
        
    };

    render() {
        return (
               <div className="filebox"> 
               <label htmlFor="ex_file">
               <Avatar  icon="user" src={BASE_URL+"test/"+this.props.profile} className="user-avatar-circle"/>
               </label> 
               <input type="file" id="ex_file"  onChange={this.handleUploadFile}/> 
               </div>

        )
    };
}