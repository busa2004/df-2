import React, { Component } from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}


class TabForm extends Component {
    render() {
        return (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="추가" key="1">추가</TabPane>
    <TabPane tab="삭제" key="2">삭제</TabPane>
    
  </Tabs>
        )
    };
}
export default TabForm;