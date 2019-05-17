import React, { Component } from 'react';
import Option4table from '../ListComponent/Option4table';
import { getAllReport, getAllTask, ReportConverter, deleteTask } from '../util/APIUtils';
import Option4DatePick from '../ListComponent/Option4DatePicker';
import TaskSearch from './TaskSearch';
import Option4modal from '../ListComponent/Option4modal';
import LoadingIndicator from '../common/LoadingIndicator';
import ServerError from '../common/ServerError';
import NotFound from '../common/NotFound';
import { Popconfirm, message, Button } from 'antd';

class EvalReport extends Component {
  constructor(props) {
    super(props);

    var d = new Date();
    this.progress = this.progress.bind(this);
    this.state = {
      buttonTitle: this.props.buttonTitle,
      value: { status: this.props.status }, // date variable
      title: this.props.title,
      route: this.props.route,
      datas: null,
      ok: null
    }
    this.state.value.search = '';
    this.state.value.from = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.state.value.to = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);
    this.load = this.load.bind(this);
    this.loadDelete = this.loadDelete.bind(this);
    console.log('--------------' + this.props.text)
  }

  load() {
    this.setState({
      isLoading: true,
    });

    console.log(this.state.value);
    //여기부터
    //getAllTask구현
    //column과 data 수정
    getAllTask(this.state.value)
      .then(response => {
        this.setState({
          datas: response,
          isLoading: false
        });
        console.log(this.state.datas);
      }).catch(error => {
        if (error.status === 404) {
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

  loadDelete(id) {
    this.setState({
      isLoading: true,
    });
    deleteTask(id)
      .then(response => {
        this.setState({
          ok: response,
          isLoading: false

        });
        this.load();
      }).catch(error => {
        if (error.status === 404) {
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

  ModalLoad(state) {
    console.log(state)
    this.setState({
      isLoading: true,
    });
    if (this.state.route == 'report') {
      ReportConverter(state)
        .then(response => {
          this.setState({
            ok: response,
            isLoading: false


          });
          this.load();
          this.success();
        }).catch(error => {
          if (error.status === 404) {
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
    } else if (this.state.route == 'task') {

    }
  }

  progress = (idData, stateData, textArea) => {
    let state = { state: stateData, id: idData, description: textArea };
    this.ModalLoad(state);
  }

  componentWillMount() {
    if (this.state.route == 'report') {
      this.setState({
        columns: this.props.columns.concat({
          title: 'action',
          key: 'id',
          render: (record, columns) => (

            <span>
              <Option4modal
                progress={this.progress}
                route={this.state.route} record={record} title={this.state.buttonTitle} />
            </span>
          )
        }),
      });
    } else if (this.state.route == 'task') {
      this.setState({
        columns: this.props.columns.concat({
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
        })
      })
    } else {
      this.setState({
        columns: this.props.columns
      })
    }
    this.load();

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

    return (
      <div className="Option4">
        <div style={{ display: "flex", flexDirection: "row", marginTop: "10px", marginBottom: "10px" }}>
          <Option4DatePick to={this.state.value.to} from={this.state.value.from} dateSearch={this.dateSearch} />
          <TaskSearch />
        </div>

        {/* <Option4table
          route={this.state.route}
          columns={this.state.columns}
          buttonTitle={this.state.buttonTitle} data={this.state.datas} /> */}
      </div>
    );
  }
}
export default EvalReport; 