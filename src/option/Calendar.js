import React, { Component } from 'react';
import './Calendar.css';
import { Calendar, Badge, Alert } from 'antd';
import moment from 'moment';
import Option1Table from './Table';

class Option1Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
        cal: this.props.calendar,
        selectedValue: moment(),
        
    }
    this.getListData = this.getListData.bind(this);
    this.dateCellRender = this.dateCellRender.bind(this);
    this.getMonthData = this.getMonthData.bind(this);
    this.monthCellRender = this.monthCellRender.bind(this);
  }

   getListData(value) {
    let listData = [];
    let key = 0;
   for(let i=0;i<this.state.cal.length;i++){
    let year = parseInt(moment(this.state.cal[i].startDate).format('YYYY'),10);
    let endyear = parseInt(moment(this.state.cal[i].endDate).format('YYYY'),10);
    let month = parseInt(moment(this.state.cal[i].startDate).format('MM'),10)-1;
    let endmonth = parseInt(moment(this.state.cal[i].endDate).format('MM'),10)-1;
    let date = parseInt(moment(this.state.cal[i].startDate).format('DD'),10);
    let enddate = parseInt(moment(this.state.cal[i].endDate).format('DD'),10) ;

    switch(value.year()){
             case year :
                 switch(value.month()){
                    case month:
                       switch (value.date()) {
                           case date:
                             listData.push({year: year, month: month+1, date: date, type: 'success', content: this.state.cal[i].title
                            ,key:  key}); 
                            key++;
                            console.log('--'+key)
                              break;
                              default:
                            }
                    default:
                  }
             case endyear :
                switch(value.month()){
                   case endmonth:
                     switch (value.date()) {
                       case enddate:
                         listData.push({endyear: endyear, endmonth: endmonth+1, enddate: enddate, type: 'error', content: this.state.cal[i].title+'마감'
                        ,key:key });
                        key++; 
                        console.log('--'+key)
                         break;
                       default:
                      }
                   default:
                }
           default:
      }
}
    return listData || [];
}
  
   dateCellRender(value) {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.key}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))
        }
      </ul>
    );
  }
  
   getMonthData(value) {
    if (value.month() === 8) {
      return '8월';
    }
  }
  
   monthCellRender(value) {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
 
  onSelect = (value) => {
    this.setState({
      selectedValue: value,
    });
  }

  onPanelChange = (value) => {
    this.setState({ value });
  }
    render() {
      return (
          <div>
            <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
            <Alert message={`${this.state.selectedValue && this.state.selectedValue.format('YYYY-MM-DD')} 업무`} />
            <Option1Table  data={this.props.calendar} time={this.state.selectedValue} />    
            </div>
        );
    }
}

export default Option1Calendar;