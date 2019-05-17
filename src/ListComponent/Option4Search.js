import React, { Component } from 'react';
import { Input } from 'antd';
import './Option3Search.css';

const Search = Input.Search;

class Option4Search extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }
    render () {
          
         return (
            <div className="Option4Search" >
            <Search
                defaultValue={this.props.searchValue}
                placeholder="input search text"
                onSearch={value => this.props.search(value)}
             />
          </div>
        );
    }
}
 export default Option4Search;