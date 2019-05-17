import { Input } from 'antd';
import React, { Component } from 'react';
const Search = Input.Search;

class SearchForm extends Component {
    
    render() {
       
        return (
            <div>
                
                <Search
                    placeholder="input search text"
                    onSearch={value =>  this.props.search(value)}
                    defaultValue={this.props.value}
                    enterButton
                />
               
            </div>
        );
    }
}
export default SearchForm;