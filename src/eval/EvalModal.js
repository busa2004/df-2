import React, { Component } from 'react';
import VersionSelect from './VersionSelect';
import EvalTable from './EvalTable';

import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import { Button } from 'antd';
import Option4table from '../ListComponent/Option4table';

class EvalModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        columns: [{
          title: 'no',
          dataIndex: 'no',
          key: 'no',
        }, {
          title: 'content',
          dataIndex: 'content',
          key: 'content'
        }],

        itemList: null,
        version: ''
      };
  }

  componentWillMount() {
    this.setState({
      columns: this.state.columns.concat({
          title: 'score',
          dataIndex: 'id',
          key: 'id',          
          render: (text) => {
            return <Button>점수</Button>
          }
      }),
    });
  }
  
  itemListCallback = (childItemList) => {
    this.setState({
        itemList: childItemList
    });
    console.log(childItemList);
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }
    return(
      <div>
        <VersionSelect getItemList={this.itemListCallback} />
        <Option4table
          columns={this.state.columns}
          data={this.state.itemList} />
      </div>
    );
  }
}

export default EvalModal;