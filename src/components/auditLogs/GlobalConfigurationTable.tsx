import React, { Component } from 'react';
import { ReactComponent as Arrow } from '../../assets/icons/ic-chevron-down.svg';
import { AuditLogModal } from './AuditLogModal'
import { ViewType } from '../../config';
import { getglobalCofiguration } from './service'
import { Progressing, showError } from '../../components/common';
import { RouteComponentProps } from 'react-router-dom';
import { ReactComponent as Sort } from '../../assets/icons/ic-sort-down.svg';
import ReactSelect from 'react-select';
import {styles} from '../security/security.util';

interface AuditLogTableProps extends RouteComponentProps<{ id?: string, tab?: string }> {

}

interface AuditLogState {
  isShown: boolean;
  view: string;
  appList:any[];
  envList:any[];
  globalList: {
    date: string;
    component: string;
    action: string;
    user: string;
    ipaddress: string;
    
  }[];
}

export class GlobalConfigurationTable extends Component<AuditLogTableProps, AuditLogState>{
  constructor(props) {
    super(props)
    this.state = {
      isShown: false,
      view: ViewType.LOADING,
      globalList: [],
      appList: [],
      envList: []
    }
    this.onShowClick = this.onShowClick.bind(this);
  }

  componentDidMount() {
    getglobalCofiguration(this.props.match.params.id, this.props.match.params.tab).then((response) => {
      this.setState({ 
        globalList: response, 
        view: ViewType.FORM, });
    }).catch((error) => {
      showError(error);
    })

  
  }

  componentDidUpdate(prevProps,id,tab) {
    console.log(prevProps.match.params, this.props.match.params);
          if(prevProps.match.params.id !== this.props.match.params.id ){
            this.setState({view:ViewType.LOADING})
               getglobalCofiguration(id,tab).then((response) => {
                console.log(id,tab)
                  this.setState({
                    view:ViewType.FORM,
                    globalList: response,
                    
                      });
                    }).catch((error) => {
                      showError(error);
                    })
                  }
           if(prevProps.match.params.tab !== this.props.match.params.tab ){
            this.setState({view:ViewType.LOADING})
               getglobalCofiguration(id,tab).then((response) => {
                  this.setState({
                    view:ViewType.FORM,
                    globalList: response,
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

  renderRow(row) {
    if (row.ipaddress) {
      return <tr key={row.id} className="table__row" onClick={(event) => {
        this.onShowClick()
      }}>
        <td className="table__data table__data--1">{row.date}</td>
        <td className="table__data table__data--2" >{row.component}</td>
        <td className="table__data table__data--2">{row.action}</td>
        <td className="table__data table__data--2">{row.user}</td>
        <td className="table__data table__data--2">{row.ipaddress}</td>
        <td><div className="table__row-icon"><Arrow className="icon-dim-24 fcn-5" /></div></td>
      </tr>
    }
    else {
      return <tr key={row.id} className="table__row" onClick={(event) => { this.onShowClick() }}>
        <td className="table__data table__data--1">19 June 2019,04:02 PM</td>
        <td className="table__data table__data--2" colSpan={2}>Deployed on prod-devtroncd by utkarsh@devtron.ai</td>
        <td className="table__data table__data--2"></td>
        <td className="table__data table__data--2"></td>
        <td className="table__row-icon"><Arrow className="icon-dim-24 fcn-5" /></td>
      </tr>
    }
  }

  render() {
    return this.state.view == ViewType.LOADING ? <Progressing pageLoader />
      : <div>
       
        <div className="display-flx">
            <ReactSelect options={this.state.appList} 
                      placeholder={ "May 1,2020 - June 1,2020"}
                      styles={{ ...styles }}
                      className = "date-align-left"/>
                     
            <ReactSelect options= {this.state.envList}
                      placeholder= {"All users"}
                      styles= {{ ...styles }}
                      className = "users-align-rt"/> 
         </div>
        <div className="user__table"> <table >
        <tbody>
          <tr className="table__row__head"  >
            <th className="table__title table__title--1">DATE AND TIME<Sort className="icon-sort"/></th>
            <th className="table__title table__title--2">COMPONENT</th>
            <th className="table__title table__title--2">ACTION</th>
            <th className="table__title table__title--2">USER</th>
            <th className="table__title table__title--2">IP ADDRESS</th>
            <th className="table__title table__title--2"></th>
          </tr>
          {this.state.globalList.map((globalList) => {
            return this.renderRow(globalList)
          })}
        </tbody>
      </table>
        {this.renderAuditLogModal()}
      </div>
      </div>
  }
}