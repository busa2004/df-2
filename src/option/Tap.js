import { Tabs } from 'antd';
import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Option1Table from './Table';


const TabPane = Tabs.TabPane;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    )}
  </Sticky>
);

class Tap extends Component {
    render() {
        return (
            <StickyContainer>
            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
              <TabPane tab="일일" key="1"><Option1Table/></TabPane>
              <TabPane tab="주간" key="2"><Option1Table/></TabPane>
              <TabPane tab="월간" key="3"><Option1Table/></TabPane>
            </Tabs>
          </StickyContainer>
        );
    }
}
 export default Tap;