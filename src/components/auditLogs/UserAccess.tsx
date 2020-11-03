import React, { Component } from 'react';
import { ReactComponent as Arrow } from '../../assets/icons/ic-chevron-down.svg';
import { ReactComponent as Sort } from '../../assets/icons/ic-sort-down.svg';
import { AuditLogModal } from './AuditLogModal'
import { ViewType } from '../../config';
import {getuseraccess} from './service'
import { Progressing, showError } from '../../components/common';
import { RouteComponentProps } from 'react-router-dom';
import { getAppListMin } from '../../services/service';
import { getenvironmentList } from './service'
import ReactSelect from 'react-select';
import {  getEnvironmentListMinPublic } from '../../services/service';
import { DropdownIndicator, styles, ValueContainer, Option } from '../security/security.util';


interface UserAccessTableProps extends RouteComponentProps<{ id?: string, tab?: string }> {

}

interface UserAccessState {
  isShown: boolean;
  view: string;
  appList: any[];
  envList: any[];
  useraccessList: {
    date: string;
    component: string;
    action: string;
    actionby: string;
    ipaddress: string;
    
  }[];
}

export class UserAccess extends Component<UserAccessTableProps, UserAccessState>{
  constructor(props) {
    super(props)
    this.state = {
      isShown: false,
      appList:[],
      envList:[],
      view: ViewType.LOADING,
      useraccessList: [],
      
    }
    this.onShowClick = this.onShowClick.bind(this);
    this.envHandler = this.envHandler.bind(this);
    this.appHandler = this.appHandler.bind(this);
   
  }

  componentDidMount() {
    getuseraccess(this.props.match.params.id, this.props.match.params.tab).then((response) => {
      this.setState({ 
        useraccessList: response, 
        view: ViewType.FORM, });
    }).catch((error) => {
      showError(error);
    })
        getAppListMin().then((response)=>{
          let appList= response.result?.map((app)=> {
            return{ 
              label: app.name,
              value: app.id   }
          })
      this.setState({appList : appList || []
                })
    }
    
    )
  
    getEnvironmentListMinPublic().then((response) => {
      let envList = response.result?.map((app) => {
          return {
              label: app.environment_name,
              value: app.id,
              
          }
      });
      this.setState({ envList: envList || [] });
  })
}

  componentDidUpdate(prevProps,id,tab) {
          if(prevProps.match.params.id !== this.props.match.params.id ){
            this.setState({view:ViewType.LOADING})
            getuseraccess(id,tab).then((response) => {
                console.log(id,tab)
                  this.setState({
                    view:ViewType.FORM,
                    useraccessList: response,
                    
                      });
                    }).catch((error) => {
                      showError(error);
                    })
                  }
           if(prevProps.match.params.tab !== this.props.match.params.tab ){
            this.setState({view:ViewType.LOADING})
              getuseraccess(id,tab).then((response) => {
                  this.setState({
                    view:ViewType.FORM,
                    useraccessList: response,
                      });
                    }).catch((error) => {
                      showError(error);
                    })
              }
            }
    
  
  onShowClick() {
    this.setState({ isShown: !this.state.isShown })
  }

  /*apphandler(app) {
Let ob = URLSearchParams(location.search)
let env = ob.get('env');
qs = ${app}`&env=`${env}`
}*/
 
  appHandler(app) {
    let url = `app=${app.map((val)=>val.value)}`; 
    let appurl = new URLSearchParams(this.props.location.search);
   // console.log(appurl.toString());  //app=88
   let getenvurl = appurl.get('env');
    this.props.history.push(`${this.props.match.url}?${url}&env=${getenvurl}`)
  console.log(appurl.toString())    

}

 envHandler(env) {
  let url = `env=${env.map((val)=>val.value)}`; 
  let envurl = new URLSearchParams(this.props.location.search);
  //console.log(envurl.toString());
  let getappurl = envurl.get('app');
  this.props.history.push(`${this.props.match.url}?${url}&app=${getappurl}`)
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
        <td className="table__data table__data--2">{row.actionby}</td>
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
      :<div >
        <div className="display-flx">
            <ReactSelect options={this.state.appList} 
                      placeholder={ "May 1,2020 - June 1,2020"}
                      styles={{ ...styles }}
                      className = "date-align-left"/>
                     
            <ReactSelect options= {this.state.envList}
                      onChange= {this.envHandler}
                      placeholder= {"All users"}
                      styles= {{ ...styles }}
                      className = "users-align-rt"/>   

            <ReactSelect options= {this.state.envList}
                      onChange= {this.envHandler}
                      placeholder= {"Action by"}
                      styles= {{ ...styles }}
                      className = "action-w-117"/>

            <ReactSelect options={this.state.appList} 
                      onChange={this.appHandler} 
                      placeholder={ "All applications"}
                      className = "align-right"
                      name= "All applications"
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
       
            <ReactSelect  
                  className = "align-right"
                  name= "All environments"
                  isSearchable= {false}
                  isMulti = {true}
                  placeholder={ "All environments"}
                  onChange={this.envHandler} 
                  options={this.state.envList}
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
                    }}
            
              />

         
         </div>
      <div className="user__table"> <table >
        <tbody>
          <tr className="table__row__head"  >
            <th className="table__title table__title--1"> DATE AND TIME<Sort className="icon-sort"/></th>
            <th className="table__title table__title--2">COMPONENT</th>
            <th className="table__title table__title--2">ACTION</th>
            <th className="table__title table__title--2">ACTION BY</th>
            <th className="table__title table__title--2">IP ADDRESS</th>
            <th className="table__title table__title--2"></th>
          </tr>
          {this.state.useraccessList.map((auditList) => {
            return this.renderRow(auditList)
          })}
        </tbody>
      </table>
        {this.renderAuditLogModal()}
      </div>
      </div>
  }
}