import React, { Component } from 'react';
import LoadingIndicator from '../common/LoadingIndicator';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { Input } from 'antd';
import { searchEval } from '../util/APIUtils';

class ModalInput extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      userTask: this.props.userTask,
      record: this.props.record,
      score : this.props.score,
      
    }
  }
  
  componentWillMount() {
     this.state.score.map((item) => {
            if(this.state.record.itemNo == item.score.evalItem.itemNo) {
              this.setState({
                score: item.score.score
              });
            }
          });
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
    return (
      
      <Input
        name={this.state.record.itemNo}
        value={this.state.score}
        style={{ cursor:'default' }}
        onChange={event => this.props.handleInputChange(event,this.state.record)}
        />
    )
  }
}

export default ModalInput;