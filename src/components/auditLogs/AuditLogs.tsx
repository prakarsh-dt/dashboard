import React, { Component } from 'react';
import { NavLink, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { AuditLogApplicationNav, AuditLogEnvironmentNav, AuditLogGlobalConfigNav } from './AuditLogNav';
import { AuditLogTable } from './AuditLogTable';
import {EnvironmentTable} from './EnvironmentTable'
import { GlobalConfigurationTable} from './GlobalConfigurationTable'
import {UserAccess} from './UserAccess'
import './auditLogs.css';

export default class AuditLogs extends Component<RouteComponentProps<{}>, {}>{

    renderHeader() {
        return <div className="page-header page-header--audit-logs">
            <h1 className="page-header__title mt-12">Audit Logs</h1>
            <ul role="tablist" className="tab-list">
                <li className="tab-list__tab ellipsis-right">
                    <NavLink className="tab-list__tab-link" activeClassName="active" to={"/audit-logs/applications"} >
                        Applications
                    </NavLink>
                </li>
                <li className="tab-list__tab">
                    <NavLink className="tab-list__tab-link" activeClassName="active" to={"/audit-logs/environments"} >
                        Environments
                    </NavLink>
                </li>
                <li className="tab-list__tab">
                    <NavLink className="tab-list__tab-link" activeClassName="active" to={"/audit-logs/global-config"} >
                        Global Configurations
                    </NavLink>
                </li>
                <li className="tab-list__tab">
                    <NavLink className="tab-list__tab-link" activeClassName="active" to={"/audit-logs/user-auth"} >
                        User Access
                    </NavLink>
                </li>
            </ul>
        </div>
    }

    render() {
        return <div className="page-grid-with-secondary-nav">
            {this.renderHeader()}
            <Switch>
                <Route exact path={`/audit-logs/applications/:id?/:tab?`}
                    render={(props) => {
                        return <>
                            <AuditLogApplicationNav type="applications" {...props} />
                            <AuditLogTable history={props.history}
                                location={props.location}
                                match={props.match} />
                        </>
                    }}
                />
                <Route path={`/audit-logs/applications/:id?`}
                    render={(props) => {
                        return <>
                            <AuditLogApplicationNav type="applications" {...props} />
                            <AuditLogTable history={props.history}
                                location={props.location}
                                match={props.match} />
                        </>
                    }} />
                <Route exact path={`/audit-logs/environments/:id/:tab?`}
                    render={(props) => {
                        return <>
                            <AuditLogEnvironmentNav type="environments" {...props} />
                            <EnvironmentTable history={props.history}
                                location={props.location}
                                match={props.match} />
                        </>
                    }} />
                <Route path={`/audit-logs/environments/:id?`}
                    render={(props) => {
                        return <>
                            <AuditLogEnvironmentNav type="environments" {...props} />
                            <EnvironmentTable history={props.history}
                                location={props.location}
                                match={props.match} />
                        </>
                    }} />
                <Route path={`/audit-logs/global-config/:tab?`}
                    render={(props) => {
                        return <>
                            <AuditLogGlobalConfigNav {...props} />
                            <GlobalConfigurationTable history={props.history}
                                location={props.location}
                                match={props.match} />
                        </>
                    }} />
                    <Route path={`/audit-logs/user-auth/:tab?`}
                    render={(props) => {
                        return <>
                            <AuditLogGlobalConfigNav {...props} />
                            <UserAccess history={props.history}
                                location={props.location}
                                match={props.match} />
                        </>
                    }} />
            </Switch>
        </div>
    }
}