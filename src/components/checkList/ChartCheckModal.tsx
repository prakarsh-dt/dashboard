import React, { Component } from 'react';
import Checklist from '../../assets/img/ic-empty-checklist.png';
import { AppCheckList } from './AppCheckList';
import { ChartCheckList } from './ChartCheckList'
import { ChartCheckListModalProps, ChartCheckListModalState } from './checklist.type';
import { AllChartsCheck } from './AllChartsCheck';
import { AllCheckModal } from './AllCheckModal';
import { showError } from '../common';
import { getAppCheckList } from '../../services/service';
import './checklist.css';

export class ChartCheckListModal extends Component<ChartCheckListModalProps, ChartCheckListModalState> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isAppCreated: false,
            isChartCollapsed: false,
            isAppCollapsed: true,
            appChecklist: undefined,
            chartChecklist: undefined,
            appStageCompleted: 0,
            chartStageCompleted: 0,
        }
        this.toggleChartChecklist = this.toggleChartChecklist.bind(this);
        this.toggleAppChecklist = this.toggleAppChecklist.bind(this);
    }


    componentDidMount() {
        getAppCheckList().then((response) => {
            let appChecklist = response.result.appChecklist;
            let chartChecklist = response.result.chartChecklist;
            let appStageArray: number[] = Object.values(appChecklist);
            let chartStageArray: number[] = Object.values(chartChecklist);
            let appStageCompleted: number = appStageArray.reduce((item, sum) => {
                sum = sum + item;
                return sum;
            }, 0)
            let chartStageCompleted: number = chartStageArray.reduce((item, sum) => {
                sum = sum + item;
                return sum;
            }, 0)

            this.setState({
                isLoading: false,
                isAppCreated: response.result.isAppCreated,
                appChecklist,
                chartChecklist,
                appStageCompleted,
                chartStageCompleted,
            })
        }).catch((error) => {
            showError(error);
        })
    }

    toggleAppChecklist(e): void {
        this.setState({ isAppCollapsed: !this.state.isAppCollapsed });
    }

    toggleChartChecklist(e): void {
        this.setState({ isChartCollapsed: !this.state.isChartCollapsed });
    }

    renderChartChecklist() {
        if (this.state.appStageCompleted < 6 && this.state.chartStageCompleted < 3) {
            //(app + chart) incomplete
            return <div>
                <img src={Checklist} className="applist__checklist-img" />
                <div className="cn-9 fw-6 fs-16 mt-16 mb-4">Let’s get you started!</div>
                <div className="cn-9 mb-16">Complete the required configurations to perform desired task</div>
                <ChartCheckList chartChecklist={this.state.chartChecklist}
                    isChartCollapsed={this.state.isChartCollapsed}
                    chartStageCompleted={this.state.chartStageCompleted}
                    toggleChartChecklist={this.toggleChartChecklist}
                />
                <AppCheckList appChecklist={this.state.appChecklist}
                    isAppCollapsed={this.state.isAppCollapsed}
                    appStageCompleted={this.state.appStageCompleted}
                    toggleAppChecklist={this.toggleAppChecklist} />
            </div>
        }
        else if (this.state.appStageCompleted >= 6 && this.state.chartStageCompleted >= 3) {
            //(app + chart) complete
            return <AllCheckModal />
        }
        else {
            //app incomplete, chart complete 
            return <div>
                <img src={Checklist} className="applist__checklist-img" />
                <div className="cn-9 fw-6 fs-16 mt-16 mb-4">Let’s get you started!</div>
                <div className="cn-9 mb-16">Complete the required configurations to perform desired task</div>
                <AppCheckList appChecklist={this.state.appChecklist}
                    isAppCollapsed={this.state.isAppCollapsed}
                    appStageCompleted={this.state.appStageCompleted}
                    toggleAppChecklist={this.toggleChartChecklist} />
                <AllChartsCheck />
            </div>
        }
    }

    render() {
        if (!this.state.isLoading && !this.state.isAppCreated) {
            return <div className="mt-36 ml-20 mr-20 mb-20 bcn-0 br-4 p-20 applist__checklist">
                {this.renderChartChecklist()}
            </div>
        }
        return null;
    }
}