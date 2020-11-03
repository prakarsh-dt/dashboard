import React, { Component } from 'react';
import { ReactComponent as Arrow } from '../../assets/icons/ic-chevron-down.svg';
import { AuditLogModal } from './AuditLogModal'
import { ViewType } from '../../config';
import { getenvironmentList } from './service'
import { Progressing, showError } from '../../components/common';
import { RouteComponentProps } from 'react-router-dom';
import { ReactComponent as Sort } from '../../assets/icons/ic-sort-down.svg';
import ReactSelect from 'react-select';
import {getAppListMin} from '../../services/service'
import { DropdownIndicator, styles, ValueContainer, Option } from '../security/security.util';

interface EnvironmentTableProps extends RouteComponentProps<{ id?: string, tab?: string }> {

}

interface EnvironmentState {
  isShown: boolean;
  view: string;
  appList: any[];
  environmentList: {
    date: string;
    component: string;
    action: string;
    user: string;
    ipaddress: string;
    application:string;
  
  }[];
}

export class EnvironmentTable extends Component<EnvironmentTableProps, EnvironmentState>{
  constructor(props) {
    super(props)
    this.state = {
      isShown: false,
      view: ViewType.LOADING,
      environmentList: [],
      appList: []
    }
    this.onShowClick = this.onShowClick.bind(this);
    this.appHandler = this.appHandler.bind(this);
  }

  componentDidMount() {
    getenvironmentList(this.props.match.params.id, this.props.match.params.tab).then((response) => {
      this.setState({ 
        environmentList: response, 
        view: ViewType.FORM, });
    }).catch((error) => {
      showError(error);
    })

    getAppListMin().then((response) => {
      let appList = response.result?.map((app) => {
          return {
              label: app.name,
              value: app.id,
          }
      });
      this.setState({ appList: appList || [] });
  })
  }

  componentDidUpdate(prevProps,id,tab) {
          if(prevProps.match.params.id !== this.props.match.params.id ){
            this.setState({view:ViewType.LOADING})
               getenvironmentList(id,tab).then((response) => {
                  this.setState({
                    view:ViewType.FORM,
                    environmentList: response,
                    
                      });
                    }).catch((error) => {
                      showError(error);
                    })
                  }
           if(prevProps.match.params.tab !== this.props.match.params.tab ){
            this.setState({view:ViewType.LOADING})
               getenvironmentList(id,tab).then((response) => {
                  this.setState({
                    view:ViewType.FORM,
                    environmentList: response,
                      });
                    }).catch((error) => {
                      showError(error);
                    })
              }
            }
    
  
  onShowClick() {
    this.setState({ isShown: !this.state.isShown })
  }

  renderAuditLogModal() {
    if (this.state.isShown) {
      return <AuditLogModal history={this.props.history}
        match={this.props.match}
        location={this.props.location}
        close={this.onShowClick} />
    }
  }
  appHandler(app) {
    let url = `app=${app.map((val)=>val.value)}`; 
    this.props.history.push(`${this.props.match.url}?${url}`) 
    let envurl = new URLSearchParams(this.props.location.search);
    console.log(envurl);
   let getEnv = envurl.get('env');
   //getEnv.set('app' ,)
   console.log(getEnv)
}

  renderRow(row) {
    if (row.ipaddress) {
      return <tr key={row.id} className="table__row" onClick={(event) => {
        this.onShowClick()
      }}>
        <td className="table__data table__data--1 w-25">{row.date}</td>
        <td className="table__data table__data--2" >{row.component}</td>
        <td className="table__data table__data--2 w-10">{row.action}</td>
        <td className="table__data table__data--2">{row.user}</td>
        <td className="table__data table__data--2">{row.ipaddress}</td>
        <td className="table__data table__data--2">{row.application}</td>
        <td><div className="table__row-icon"><Arrow className="icon-dim-24 fcn-5" /></div></td>
      </tr>
    }
    else {
      return <tr key={row.id} className="table__row" onClick={(event) => { this.onShowClick() }}>
        <td className="table__data table__data--1 w-25">19 June 2019,04:02 PM</td>
        <td className="table__data table__data--2" colSpan={2}>Deployed on prod-devtroncd by utkarsh@devtron.ai</td>
        <td className="table__data table__data--2"></td>
        <td className="table__data table__data--2"></td>
        <td className="table__data table__data--2"></td>
        <td className="table__row-icon"><Arrow className="icon-dim-24 fcn-5" /></td>
      </tr>
    }
  }

  render() {
    return this.state.view == ViewType.LOADING ? <Progressing pageLoader />
      :  <div>
              <div className="display-flx">
                  <ReactSelect options={this.state.appList} 
                      placeholder={ "May 1,2020 - June 1,2020"}
                      styles={{ ...styles }}
                      className = "date-align-left"/>
                
                  <ReactSelect options={this.state.appList} 
                      onChange={this.appHandler} 
                      placeholder={ "All applications"}
                      className = "align-right"
                      name= "All environments"
                      isSearchable= {false}
                      isMulti = {true}
                      hideSelectedOptions={false}
                      components={{
                        DropdownIndicator,
                        ValueContainer,
                        Option: Option,
                      }}
                      styles={{
                          container: (base, state) => {
                            return ({
                              ...base,
                              height: '36px',
                            })
                          },
                          control: (base, state) => ({
                            ...base,
                            minHeight: '36px',
                          }),
                          ...styles,
                        }}/>
                  
                  <ReactSelect options= {this.state.appList}
                      placeholder= {"All users"}
                      styles= {{ ...styles }}
                      className = "users-align-rt "/>

            </div>
            <div className="user__table"> <table >
            <tbody>
              <tr className="table__row__head"  >
                <th className="table__title table__title--1 w-25">DATE AND TIME <Sort className="icon-sort"/></th>
                <th className="table__title table__title--2">COMPONENT</th>
                <th className="table__title table__title--2 w-10">ACTION</th>
                <th className="table__title table__title--2">USER</th>
                <th className="table__title table__title--2">IP ADDRESS</th>
                <th className="table__title table__title--2">APPLICATION</th>
                <th className="table__title table__title--2"></th>
              </tr>
              {this.state.environmentList.map((globalList) => {
                return this.renderRow(globalList)
              })}
            </tbody>
          </table>
            {this.renderAuditLogModal()}
          </div>
      </div>
  }
}