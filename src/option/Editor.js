import React, { Component } from 'react';
import {
    Button
} from 'antd';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
import {
    Input, Select
} from 'antd';
import { html, html2 } from './html';
const Option = Select.Option;
const InputGroup = Input.Group;
class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: '',

        };
    };
    updateContent = (value) => {
        this.setState({ content: value })
    }
    jodit;
    setRef = jodit => this.jodit = jodit;
    config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    
    render() {
        return (
            <div>
                <div className="information" >
                    <InputGroup compact>
                        <Select defaultValue="일일" style={{ width: '20%' }} onChange={this.updateContent}>
                            <Option value="일일">일일 보고서</Option>
                            <Option value={html()}>주간 보고서</Option>
                            <Option value="월간">월간 보고서</Option>
                        </Select>
                        <Input style={{ width: '65%' }} placeholder="제목" />
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



export default Editor;