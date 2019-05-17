import React, { Component } from 'react';
import Tap from './Tap';
import { getReport,deleteReport,modifyReport } from '../util/APIUtils';
import  DatePickers from '../ListAndSearchUi/DatePickers';
import  SerachForm from '../ListAndSearchUi/SearchForm';
import  TabForm from '../ListAndSearchUi/TabForm';
import { Row, Col } from 'antd';
import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import moment from 'moment';
import {Card} from 'antd';
import { Popconfirm, message,Button } from 'antd';
class Option3 extends Component {

    constructor(props) {
        super(props);
        var d = new Date();
        this.state = {
            reports: null,
            isLoading: false,
            from:d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(),
            to:d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()+1),
            search:'',
            columns: 
                {
                title: '삭제',
                dataIndex: 'id',
                key: 'id',
                
                render: (text) => {
                  let confirm = () => {
                    this.loadDelete(text)
                  }
                  return <Popconfirm placement="top" title={'정말로 삭제하시겠습니까?'} onConfirm={confirm} okText="Yes" cancelText="No">
                    <Button>Top</Button>
                  </Popconfirm>
  
  
                }
                }
        }
        this.loadReport = this.loadReport.bind(this);
             
    }
    
    loadDelete(id) {
        this.setState({
            isLoading: true
        });
      
        deleteReport(id)
        .then(response => {
            this.setState({
              ok: response,
                isLoading: false
            
              });
              this.loadReport({search:this.state.search,from:this.state.from,to:this.state.to});
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


      loadModify(content,id) {
        this.setState({
            isLoading: true
        });
      
        modifyReport(content,id)
        .then(response => {
            this.setState({
              ok: response,
                isLoading: false
            
              });
              this.loadReport({search:this.state.search,from:this.state.from,to:this.state.to});
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

    loadReport(data) {
      this.setState({
          isLoading: true
      });
      getReport(data)
      .then(response => {
        console.log('ss')
          this.setState({
            reports: response,
              isLoading: false
          
            });
            console.log(this.state.reports)
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
    
    componentWillMount() {
     this.loadReport({search:this.state.search,from:this.state.from,to:this.state.to});
    }
    
    modifyConfirm=(content,id)=>{
       this.loadModify(content,id)

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
    
    search= (data) => {
        this.setState({
            search:data
        })
       let body={search:data,from:this.state.from,to:this.state.to}
        this.loadReport(body);
        console.log(data)
    }
    dateSearch= (dateSearch) => {

        
         console.log(dateSearch[0],dateSearch[1])
         this.setState({
            from:dateSearch[0],
            to:dateSearch[1],
        });
        let body={search:this.state.search,from:dateSearch[0],to:dateSearch[1]}
        this.loadReport(body);
        // this.setState({
        //     startDate:date[0]._i,
        //     end:date[1]._i
        // });
    }
    render () {
        console.log(this.state.isLoading)
        if(this.state.isLoading) {
            return <LoadingIndicator />;
          }
          
          if(this.state.notFound) {
            return <NotFound />;
          }
          
          if(this.state.serverError) {
            return <ServerError />;
          }
          console.log(this.state.reports);
          console.log('-------------------'+this.state.from)   
          
     
        
        
        
         return (
            
            <div>
               
                <div>
                <Card title='보고서관리'>
                     <Row>
                         <Col span={12}><DatePickers dateSearch={this.dateSearch} to={this.state.to} from={this.state.from} /></Col>
                         <Col span={12}><SerachForm search={this.search} value={this.state.search}/></Col>
                     </Row>
                     <Row>
                         <Col span={24}><TabForm modifyConfirm={this.modifyConfirm} reports={this.state.reports} columns={this.state.columns}/></Col>
                     </Row>
                </Card>
                 </div>
                {/* <Tap isAuthenticated={this.props.isAuthenticated} currentUser={this.props.currentUser}
                    userTasks={userTask} />  */}
            </div>
        );
    }
}
 export default Option3;
