import React, { Component } from 'react';
import { ReactComponent as Dropdown } from '../../assets/icons/appstatus/ic-dropdown.svg';
import { ChartCheckListProps } from './checklist.type';
import { NavLink } from 'react-router-dom';
import { URLS } from '../../config';
import { ReactComponent as Check } from '../../assets/icons/ic-outline-check.svg';
import Uncheck from '../../assets/img/ic-success@2x.png';

export class ChartCheckList extends Component<ChartCheckListProps, {}> {

    render() {
        let { gitOps, environment, project } = this.props.chartChecklist;

        return (
            <>
                <div className="cursor cn-9 pt-12 pb-12 fw-6 flex" onClick={this.props.toggleChartChecklist}>
                    <div>To deploy chart ({this.props.chartStageCompleted}/3 completed)</div>
                    <span className="checklist__dropdown">
                        <Dropdown className="icon-dim-20 rotate " style={{ ['--rotateBy' as any]: this.props.isChartCollapsed ? '180deg' : '0deg' }} />
                    </span>
                </div>
                {!this.props.isChartCollapsed ? <div className="">
                    <hr className="checklist__divider mt-0 mb-0" />
                    <NavLink to={`${URLS.GLOBAL_CONFIG_GITOPS}`} className="no-decor  mt-8 flex left" style={{ ['color']: gitOps ? `#767d84` : `#0066cc` }}>
                        {!this.props.chartChecklist.gitOps ? <img src={Uncheck} className="icon-dim-16 mr-8" /> : <Check className="icon-dim-16 mr-8" />}
                    Configure GitOps</NavLink>
                    <NavLink to={`${URLS.GLOBAL_CONFIG_CLUSTER}`} className="no-decor mt-8 flex left" style={{ ['color']: environment ? `#767d84` : `#0066cc` }}>
                        {!this.props.chartChecklist.environment ? <img src={Uncheck} className="icon-dim-16 mr-8" /> : <Check className="icon-dim-16 mr-8" />}
                    Add cluster & environment</NavLink>
                    <NavLink to={`${URLS.GLOBAL_CONFIG_PROJECT}`} className="no-decor  mt-8 pb-8 flex left" style={{ ['color']: project ? `#767d84` : `#0066cc` }}>
                        {!this.props.chartChecklist.project ? <img src={Uncheck} className="icon-dim-16 mr-8" /> : <Check className="icon-dim-16 mr-8" />}
                    Add project</NavLink>
                </div> : ''}
            </>
        )
    }
}