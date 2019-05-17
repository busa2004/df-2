import React, { Component } from 'react';

import VersionSelect from './VersionSelect';
import ItemTable from './ItemTable';
import VersionAdd from './VersionAdd';
import './ManageEvalItem.css';


class ManageEvalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: null,
            version: ''
        };
    }

    itemListCallback = (childItemList) => {
        this.setState({
            itemList: childItemList
        });
    }

    refresh = () => {
        window.location.reload();
    }

    render() {
        return (
            <div className="Option8">
                <h1 className="title"> 평가항목관리 </h1>
                <VersionSelect getItemList={this.itemListCallback} />
                <ItemTable itemList={this.state.itemList} />
                <VersionAdd refresh={ this.refresh }/>
            </div>
        );
    }
}
export default ManageEvalItem;