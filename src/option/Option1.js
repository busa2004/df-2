import React, { Component } from 'react';
import Option1Calendar from './Calendar';
import { getUserTask,getUserCalendar } from '../util/APIUtils';
import LoadingIndicator from '../common/LoadingIndicator';
import {Card} from 'antd';
class Option1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userTask: null,
            isLoading: true,
            cal:[],
        }
        this.loadUserTask = this.loadUserTask.bind(this);
        this.loadUserCalendar = this.loadUserCalendar.bind(this);
        
    }
    
    loadUserTask() {
      this.setState({
          isLoading: true
      });
    
      getUserTask()
      .then(response => {
          this.setState({
              userTask: response.content,
              isLoading: false
          });

      }).catch(error => {
          if(error.status === 404) {
              this.setState({
                  notFound: true,
                  isLoading: false
              });
          } else {
              this.setState({
                  serverError: true,
                  isLoading: false
              });        
          }
      });        
    }
    
    loadUserCalendar() {
        this.setState({
            isLoading: true
        });
        getUserCalendar(this.props.currentUser.username)
        .then(response => {
            this.setState({
                cal: response,
                isLoading: false
            });
          
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
      }


    componentDidMount() {
    // this.loadUserTask();
     this.loadUserCalendar();
    }
    
    
    render () {
        const cal = this.state.cal;
        if(this.state.isLoading) {
            return <LoadingIndicator />
          }
          else{  
          return (
            <div>
                <Card title='업무리스트'>
                <Option1Calendar calendar = {cal} />   
                </Card>            
            </div>
        );
          }
    }
}
 export default Option1;