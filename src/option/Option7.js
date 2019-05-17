import React, { Component } from 'react';
import TextEdit from './TextEdit';
import {Card} from 'antd';
import './edit.css'

class Option7 extends Component {
    render() {
        return (
                <Card title='업무등록'> 
                <div className="edit">
                <TextEdit router={'task'}/>
                </div>
                </Card>
        );
    }
}
 export default Option7;