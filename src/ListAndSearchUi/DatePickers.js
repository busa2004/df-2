import { DatePicker } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
// function onChange(value, dateString) {
//     console.log('Selected Time: ', value);
//     console.log('Formatted Selected Time: ', dateString);

//   }
  


//   value =>  this.props.dateSearch(value)

class DatePickers extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)

    }
    onChange(value, dateString) {
        this.props.dateSearch(dateString)
    }

    render() {

        return (
            <div>
                

                <RangePicker onChange={this.onChange}  
                defaultValue={[moment(this.props.from, dateFormat),
                 moment(this.props.to, dateFormat)]}
                format={dateFormat}
                />

            </div>
        )
    }
}
export default DatePickers;