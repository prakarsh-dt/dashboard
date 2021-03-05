import React, { Component } from 'react';
import Checklist from '../../assets/img/ic-empty-checklist.png';
import { AppCheckList } from './AppCheckList';
import { ChartCheckList } from './ChartCheckList';
import { GlobalConfigCheckListState, GlobalConfigCheckListProps } from './checklist.type';
import { GlobalAllCheckModal } from './GlobalAllCheckModal';
import { GlobalChartsCheck } from './GlobalChartCheck';
import './checklist.css';

export class GlobalConfigCheckList extends Component<GlobalConfigCheckListProps, GlobalConfigCheckListState> {

    constructor(props) {
        super(props);
        this.state = {
            isAppCollapsed: false,
            isChartCollapsed: true,
        }
        this.toggleChartChecklist = this.toggleChartChecklist.bind(this);
        this.toggleAppChecklist = this.toggleAppChecklist.bind(this);
    }

    toggleAppChecklist(e): void {
        this.setState({ isAppCollapsed: !this.state.isAppCollapsed });
    }

    toggleChartChecklist(e): void {
        this.setState({ isChartCollapsed: !this.state.isChartCollapsed });
    }

    renderGlobalChecklist() {
        if (this.props.appStageCompleted < 6 && this.props.chartStageCompleted < 3) {
            //(app + chart) incomplete
            return <div className="">
                <img src={Checklist} className="applist__checklist-img" />
                <div className="cn-9 fw-6 fs-16 mt-16 mb-4">Configuration checklist</div>
                <div className="cn-9 mb-16">Complete the required configurations to perform desired task</div>
                <AppCheckList appChecklist={this.props.appChecklist}
                    isAppCollapsed={this.state.isAppCollapsed}
                    appStageCompleted={this.props.appStageCompleted}
                    toggleAppChecklist={this.toggleAppChecklist} />
                <hr className="checklist__divider mt-0 mb-0" />
                <ChartCheckList chartChecklist={this.props.chartChecklist}
                    isChartCollapsed={this.state.isChartCollapsed}
                    chartStageCompleted={this.props.chartStageCompleted}
                    toggleChartChecklist={this.toggleChartChecklist} />
            </div>
        }
        else if (this.props.appStageCompleted >= 6 && this.props.chartStageCompleted >= 3) {
            //(app + chart) complete
            return <GlobalAllCheckModal />
        }
        else {
            //app incomplete, chart complete 
            return <div className="">
                <img src={Checklist} className="applist__checklist-img" />
                <div className="cn-9 fw-6 fs-16 mt-16 mb-4">Configuration checklist</div>
                <div className="cn-9 mb-16">Complete the required configurations to perform desired task</div>
                <AppCheckList appChecklist={this.props.appChecklist}
                    isAppCollapsed={this.state.isAppCollapsed}
                    appStageCompleted={this.props.appStageCompleted}
                    toggleAppChecklist={this.toggleAppChecklist} />
                <GlobalChartsCheck />
            </div>
        }
    }

    render() {
        if (!this.props.isLoading && !this.props.isAppCreated) {
            return <div className="mt-36 ml-20 mr-20 mb-20 global__checklist">
                {this.renderGlobalChecklist()}
            </div>
        }
        return null;
    }
}
