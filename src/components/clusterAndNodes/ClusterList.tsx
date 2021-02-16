import React, { Component } from 'react';
import { ViewType } from '../../config';
import { ReactComponent as Add } from '../../assets/icons/ic-add.svg';

interface ClusterListState {

}
export class ClusterList extends Component<{}, any> {

    constructor(props) {
        super(props);
        this.state = {
            statusCode: 0,
            view: ViewType.LOADING,
            searchObject: { label: "application", value: 'appName' },
            searchObjectValue: "",
            searchApplied: false,
            filters: {
                environments: [],
                clusters: [],
                severity: [],
            },
            filtersApplied: {
                environments: [],
                clusters: [],
                severity: [],
            },
            showAddFilter: false,
        }
    }

    toggleAddFilter() {
        this.setState({ showAddFilter: !this.state.showAddFilter });
    }

    renderAddFilter() {
        return <input type="text" />
    }

    render() {
        return <div>
            <h1>Cluster & Nodes</h1>
            <button type="button" onClick={this.toggleAddFilter}>
                <Add className="icon-dim-20" />
                Add Filter
            </button>
        </div>
    }
}