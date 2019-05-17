import React, { Component } from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
  } from 'antd';
import Password from 'antd/lib/input/Password';
import {changePassword } from '../../util/APIUtils';
import LoadingIndicator from '../../common/LoadingIndicator';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
  class RegistrationForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      id:this.props.id
      };
      this.load = this.load.bind(this);
    };
    load(values) {
      this.setState({
          isLoading: true
      });
      changePassword(values)
      .then(response => {
          this.setState({
              ok:response,
              isLoading: false
            });
          this.success();
            console.log(this.state.ok)
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
  

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          values.id=this.state.id;
          console.log(values)
          this.load(values);

        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
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
      const { getFieldDecorator } = this.props.form;

  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
     
  
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="Exist-Password"
          >
            {getFieldDecorator('existPassword', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="New-Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>
         
         
          <Form.Item {...tailFormItemLayout}>
            <Button htmlType="submit">변경</Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const PasswordChange = Form.create({ name: 'register' })(RegistrationForm);
  
  export default PasswordChange;