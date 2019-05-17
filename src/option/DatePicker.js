import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


class DatePick extends Component {

   
  render () {
        
       return (
        <div>
        <RangePicker
          defaultValue={[moment( moment(), dateFormat), moment(moment(), dateFormat)]}
          format={dateFormat}
        />
      </div>
      );
  }
}
export default DatePick;