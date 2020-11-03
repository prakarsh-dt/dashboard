import React, { Component } from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { getAppListMin, getEnvironmentListMinPublic } from '../../services/service';
import ReactSelect from 'react-select';
import arrowIcon from '../../assets/icons/appstatus/ic-dropdown.svg'

interface NavItemType {
    label: string;
    tab?: string;
    url?: string;
    isCollapsed?: boolean;
    items?: {
        label: string;
        tab: string;
        url: string;
    }[]
};

function AuditLogNavHOC(AuditLogsNavType) {
    return class extends React.Component<any, { navItems: NavItemType[] }> {
        constructor(props) {
            super(props);
            let baseUrl = `/audit-logs/${props.type}/${props.match.params.id}`;
            this.state = {
                navItems: [{
                    label: "All",
                    tab: "all",
                    url: `${baseUrl}/all`,
                },
                {
                    label: "Create / Update",
                    tab: "edit",
                    url: `${baseUrl}/edit`,
                },
                {
                    label: "Build Configuration",
                    items: [{
                        label: "Build Pipeline Configuration",
                        tab: "build",
                        url: `${baseUrl}/build`,
                    },
                    {
                        label: "Pre Build",
                        tab: "pre-build",
                        url: `${baseUrl}/pre-build`,
                    },
                    {
                        label: "Post Build",
                        tab: "post-build",
                        url: `${baseUrl}/post-build`,
                    }],
                    isCollapsed: false,
                },
                {
                    label: "Deployment Configuration",
                    items: [{
                        label: "Deployment Template",
                        tab: "deployment-template",
                        url: `${baseUrl}/deployment-template`,
                    },
                    {
                        label: "CD Pipeline Configuration",
                        tab: "deploy",
                        url: `${baseUrl}/deploy`,
                    },
                    {
                        label: "Pre CD",
                        tab: "pre-deploy",
                        url: `${baseUrl}/pre-deploy`,
                    },
                    {
                        label: "Post CD",
                        tab: "post-deploy",
                        url: `${baseUrl}/post-deploy`,
                    }],
                    isCollapsed: false,
                },
                {
                    label: "Configmap",
                    tab: "configmap",
                    url: `${baseUrl}/configmap`,
                },
                {
                    label: "Secret",
                    tab: "secret",
                    url: `${baseUrl}/secret`,
                }]
            }
            this.toggleCollapse = this.toggleCollapse.bind(this);
            this.renderNavItems = this.renderNavItems.bind(this);
        }

        componentDidUpdate(prevProps) {
            if (this.props.match.params.id && prevProps.match.params.id !== this.props.match.params.id) {
                let items = this.state.navItems;
                let id = this.props.match.params.id;
                items = items.map((item) => {
                    let subItems = item.items;
                    subItems = subItems?.map((subitem) => {
                        return {
                            ...subitem,
                            url: `/audit-logs/${this.props.type}/${id}/${subitem.tab}`,
                        }
                    })
                    return {
                        ...item,
                        url: `/audit-logs/${this.props.type}/${id}/${item.tab}`,
                        items: subItems,
                    }
                })
                this.setState({ navItems: items });
            }
        }

        toggleCollapse(index: number) {
            let navItems = this.state.navItems;
            navItems[index].isCollapsed = !navItems[index].isCollapsed;
            this.setState({ navItems })
        }

        renderNavItems() {
            return this.state.navItems.map((item, index) => {
                if (item.items) {
                    return <div className='secondary-nav__item secondary-nav__collapsible-item'>
                        <span className="flexbox flex-justify cursor" onClick={(event) => { this.toggleCollapse(index) }}> {item.label}
                            <img src={arrowIcon} className="rotate" alt="" style={{ ['--rotateBy' as any]: `${Number(!item.isCollapsed) * 180}deg` }} />
                        </span>

                        {item.isCollapsed ? <div></div> : item.items.map((subItem) => {
                            return (<div><NavLink to={subItem.url} className='secondary-nav__item'>
                                {subItem.label}
                            </NavLink></div>)
                        })}
                    </div>
                }
                else return <NavLink to={item.url} className='secondary-nav__item'>
                    {item.label}
                </NavLink>
            })
        }

        render() {
            return <AuditLogsNavType
                {...this.props}
                navItems={this.state.navItems}
                renderNavItems={this.renderNavItems}
            />;
        }
    };
}

interface AuditLogApplicationNavProps extends RouteComponentProps<{ id?: string; tab?: string }> {
    renderNavItems: () => any;
}

class AuditLogApplication extends Component<AuditLogApplicationNavProps, any>{

    constructor(props) {
        super(props);
        this.state = {
            appList: []
        }
        this.appHandler = this.appHandler.bind(this)
    }

    componentDidMount() {
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

    appHandler(app) {
        let url = `/audit-logs/applications/${app.value}`;
        if (this.props.match.params.tab) url = `${url}/${this.props.match.params.tab}`;
        this.props.history.push(url);
    }

    render() {
        return <div className="secondary-nav">
            <span className="form__label">Applications</span>
            <ReactSelect options={this.state.appList} onChange={this.appHandler} />
            {this.props.match.params.id ? this.props.renderNavItems() : null}
        </div>
    }
}

interface AuditLogEnvironmentNavProps extends RouteComponentProps<{ id?: string; tab?: string; }> {
    renderNavItems: () => any;
}

class AuditLogEnvironment extends Component<AuditLogEnvironmentNavProps, { envList: any[] }>{

    constructor(props) {
        super(props);
        this.state = {
            envList: []
        }
        this.envHandler = this.envHandler.bind(this);
    }

    componentDidMount() {
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
    envHandler(env) {
        let url = `/audit-logs/environments/${env.value}`;
        if (this.props.match.params.tab) url = `${url}/${this.props.match.params.tab}`;
        this.props.history.push(url);
    }

    render() {
        return <div className="secondary-nav">
            <span className="form__label">Environments</span>
            <ReactSelect options={this.state.envList} onChange={this.envHandler} />
            {this.props.match.params.id ? this.props.renderNavItems() : null}
        </div>
    }
}

export class AuditLogGlobalConfigNav extends Component<RouteComponentProps<{}>, any>{

    constructor(props) {
        super(props);
        this.state = {
            navItems: [{
                label: "Git Accounts",
                url: `${this.props.match.url}/git`,
            },
            {
                label: "Docker Registries",
                url: `${this.props.match.url}/docker`,
            },
            {
                label: "Cluster",
                url: `${this.props.match.url}/cluster`,
            },
            {
                label: "Environment",
                url: `${this.props.match.url}/env`,
            },
            {
                label: "Projects",
                url: `${this.props.match.url}/project`,
            },
            {
                label: "Notifications",
                url: `${this.props.match.url}/notification`,
            }],
        }
    }

    toggleCollapse(index: number) {
        let navItems = this.state.navItems;
        navItems[index].isCollapsed = !navItems[index].isCollapsed;
        this.setState({ navItems })
    }

    render() {
        return <div className="secondary-nav">
            {this.state.navItems.map((item, index) => {
                if (item.items) {
                    return <div className='secondary-nav__item secondary-nav__collapsible-item'>
                        <span className="flexbox flex-justify cursor" onClick={(event) => { this.toggleCollapse(index) }}> {item.label}
                            <img src={arrowIcon} className="rotate" alt="" style={{ ['--rotateBy' as any]: `${Number(!item.isCollapsed) * 180}deg` }} />
                        </span>
                        {item.isCollapsed ? <div></div> : item.items.map((subItem) => {
                            return <NavLink to={subItem.url} className='secondary-nav__item'>
                                {subItem.label}
                            </NavLink>
                        })}
                    </div>
                }
                else return <NavLink to={item.url} className='secondary-nav__item'>
                    {item.label}
                </NavLink>
            })}
        </div>
    }
}
export const AuditLogEnvironmentNav = AuditLogNavHOC(AuditLogEnvironment)
export const AuditLogApplicationNav = AuditLogNavHOC(AuditLogApplication)
