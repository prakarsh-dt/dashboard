import React, { Component } from 'react';
import Checklist from '../../assets/img/ic-empty-checklist.png';
import { AppCheckListModalState, AppCheckListModalProps } from './checklist.type';
import { AppCheckList } from './AppCheckList';
import { ChartCheckList } from './ChartCheckList'
import { AllCheckModal } from './AllCheckModal';
import { AllChartsCheck } from './AllChartsCheck';
import './checklist.css';

export class AppCheckListModal extends Component<AppCheckListModalProps, AppCheckListModalState> {

    constructor(props) {
        super(props);
        this.state = {
            isAppCollapsed: false,
            isChartCollapsed: true,
        }
        this.toggleAppChecklist = this.toggleAppChecklist.bind(this);
        this.toggleChartChecklist = this.toggleChartChecklist.bind(this);
    }

    toggleAppChecklist(e): void {
        this.setState({ isAppCollapsed: !this.state.isAppCollapsed });
    }

    toggleChartChecklist(e): void {
        this.setState({ isChartCollapsed: !this.state.isChartCollapsed });
    }

    renderAppChecklist() {
        if (this.props.appStageCompleted < 6 && this.props.chartStageCompleted < 3) {
            //(app + chart) incomplete
            return <div>
                <img src={Checklist} className="applist__checklist-img" />
                <h2 className="cn-9 fw-6 fs-16 mt-16 mb-4">Let’s get you started!</h2>
                <p className="cn-9 mb-16 fs-13">Complete the required configurations to perform desired task</p>
                <AppCheckList appChecklist={this.props.appChecklist}
                    showDivider={true}
                    isAppCollapsed={this.state.isAppCollapsed}
                    appStageCompleted={this.props.appStageCompleted}
                    toggleAppChecklist={this.toggleAppChecklist} />
                <hr className="checklist__divider mt-0 mb-0" />
                <ChartCheckList chartChecklist={this.props.chartChecklist}
                    isChartCollapsed={this.state.isChartCollapsed}
                    showDivider={false}
                    chartStageCompleted={this.props.chartStageCompleted}
                    toggleChartChecklist={this.toggleChartChecklist} />
            </div>
        }
        else if (this.props.appStageCompleted >= 6 && this.props.chartStageCompleted >= 3) {
            //(app + chart) complete
            return <>
                <AllCheckModal />
            </>
        }
        else {
            //app incomplete, chart complete 
            return <div>
                <img src={Checklist} className="applist__checklist-img" />
                <h2 className="cn-9 fw-6 fs-16 mt-16 mb-4">Let’s get you started!</h2>
                <p className="cn-9 mb-16 fs-13">Complete the required configurations to perform desired task</p>
                <AppCheckList appChecklist={this.props.appChecklist}
                    showDivider={true}
                    isAppCollapsed={this.state.isAppCollapsed}
                    appStageCompleted={this.props.appStageCompleted}
                    toggleAppChecklist={this.toggleAppChecklist} />
                <AllChartsCheck />
            </div>
        }
    }

    render() {
        return (
            <div className="br-4 bcn-0 p-20 mt-20 mb-20 applist__checklist">
                {this.renderAppChecklist()}
            </div>
        )
    }
}