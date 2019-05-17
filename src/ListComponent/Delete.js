import React, { Component } from 'react';
import { Popconfirm, message, Button } from 'antd';
import { deleteTask } from '../util/APIUtils';
import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import Report from '../option/Report';
const text = 'Are you sure to delete this task?';


class Delete extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:this.props.text
        };
    }




    confirm = () => {
       Report.loadDelete(this.state.text);
    }

    render() {
       
        return (
            <div>
                <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>

                    <Popconfirm placement="top" title={text} onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button>Top</Button>
                    </Popconfirm>

                </div>
            </div>
        );
    }
}
export default Delete;