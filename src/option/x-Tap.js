import { Tabs } from 'antd';
import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Option1Table from './Table';

import LoadingIndicator  from '../common/LoadingIndicator';
import NotFound from '../common/NotFound';
import ServerError from '../common/ServerError';
import { getUserTask } from '../util/APIUtils';
const TabPane = Tabs.TabPane;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

class Tap extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userTasks: this.props.userTasks,
        isLoading: false,
         choiceViews : []
    }
  
    //  this.loadUserTask = this.loadUserTask.bind(this);
}



componentDidMount() {
 
 // const username = this.props.match.params.username;
  // this.loadUserTask();
  //console.log(this.state.userTask)
}
componentDidUpdate() {
  console.log(this.props.userTasks)
  console.log(this.props.isAuthenticated)
  console.log(this.props.currentUser)
  
 // const username = this.props.match.params.username;
  // this.loadUserTask();
  //console.log(this.state.userTask)

}


// _renderUserTask = () => {

// const userTask =  this.state.userTask.map((userTask, index) => {
//   console.log(userTask)
//   return <TabPane 
//   tab={userTask.task.title}
//   key={index}>
//   <Option1Table/></TabPane>
//  }); 

//  return userTask;
// }
    render() {
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
          
            <StickyContainer>
            {/* <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}> */}
            {this.props.userTasks != null ?
            
            this.props.userTasks.map((userTask,index)=><TabPane key={index} tab={userTask.task.title}>
            <Option1Table userTask={userTask}/>
            <Option1Table userTask={this.props.userTasks}/>
            </TabPane>)
            :
            
            
            ""
            }
            {/* </Tabs> */}
          </StickyContainer>
        );
    }
}
 export default Tap;