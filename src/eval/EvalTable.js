import React, { Component } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import "./ItemTable.css"

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title, // content
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EvalTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'no',
      dataIndex: 'itemNo',
      width: '20%'
    }, {
      title: 'content',
      dataIndex: 'content',
      editable: false
    }, {
      title: 'score',
      dataIndex: 'score',
      editable: true 
    }];

    this.state = {
      dataSource: [{
        key: 1,
        itemNo: 1,
        content: 'input text',
        score: 'input value'
      }],
      count: 2,
      show: this.props.show, // modal=하단에 버튼 나타남,
    };
  }

  // render 후 props로부터 받는 값이 변동이 생겼을 때 state 값을 바꿔준다.
  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps.itemList !== prevProps.itemList) {
        return {
          dataSource: nextProps.itemList // dataSource가 table에서 값을 뿌리는 역할
        };
    }
    return null;
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });

    // version에 새로 등록된 newData 넘겨줌
    this.props.getDataSource(newData);
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}

export default EvalTable;