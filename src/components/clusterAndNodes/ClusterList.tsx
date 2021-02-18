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

    renderClusterTable() {
      return  <table className="pl-20 mw-768 w-100 mt-21">
        <tbody>
          <tr className="table__row-head">
            <th className="pt-11 pl-20 pb-11 w-16 cn-5 fs-12 fw-600 lh-1.5">CLUSTER NAME</th>
            <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-600 lh-1.5 ">STATUS</th>
            <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-600 lh-1.5">NODES</th>
            <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-600 lh-1.5">K8sVERSION</th>
            <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-600 lh-1.5">CPU CAPACITY</th>
            <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-600 lh-1.5">MEMORY CAPACITY</th>
            <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-600 lh-1.5"><div className="icon-dim-20" /></th>
          </tr>
          </tbody>
          </table>
    }

    render() {
        return <div className="bcn-0">
            <div className="pl-20 pt-18 fw-600 fs-20" >Cluster & Nodes</div>
            <hr className="" />
            <form className="pl-20 pr-20 mb-16" >
                <input className="cluster__search pl-8 pt-6 pb-6 br-4 fs-13 bcn-1 w-100" type="text" placeholder="Search nodes by label, taint, role, annotations, schedulable (eg. label:diskType=gp2)" />
            </form>
            <button className="cluster__add-button bcn-0 ml-20 cb-5 flex left" type="button" onClick={this.toggleAddFilter}>
                Add Filter
                <div className="pt-5"><Add className="icon-dim-20 fcb-5" /></div>
            </button>
            {this.renderClusterTable()}
        </div>

    }
}