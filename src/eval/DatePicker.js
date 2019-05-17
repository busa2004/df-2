import React, { Component } from 'react';
import Option4DatePick from '../ListComponent/Option4DatePicker';

// Report Component기반으로 만들어진 Component
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { status: this.props.status }, // date variable
    }
    var d = new Date();
    this.state.value.search = '';
    this.state.value.from = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.state.value.to = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);

  }
  search = (data) => {
    this.state.value.search = data;
  }
  dateSearch = (dateSearch) => {
    this.state.value.from = dateSearch[0];
    this.state.value.to = dateSearch[1];
    console.log(this.state.value); 
  }


  render() {
    return (
      <div className="Option4">
        <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginBottom: "10px" }}>
          <Option4DatePick
            to={this.state.value.to} 
            from={this.state.value.from}
            dateSearch={this.dateSearch} 
          />
        </div>
      </div>
    );
  }
}
export default DatePicker; 