import React, { Component } from 'react';
import { ViewType } from '../../config';
import { ReactComponent as Add } from '../../assets/icons/ic-add.svg';
import { Progressing } from '../common';
import ReactSelect from 'react-select';
import { ClusterCollapsed } from './ClusterCollapsed';
import { ClusterExpanded } from './ClusterExpanded';

interface ClusterListState {

}

const AddFilterProperty = [{ label: "Memory limit", value: "ram" }, { label: "CPU limit", value: "cpu" }]
const AddFilterCondition = [{ label: "Greater than", value: ">" }, { label: "Less tthan", value: "<" }]
export class ClusterList extends Component<{}, any> {

    constructor(props) {
        super(props);
        this.state = {
            statusCode: 0,
            view: ViewType.LOADING,
            filtersApplied: [],
            addFilter: {
                property: undefined,
                condtion: undefined,
                value: "",
            },
            showAddFilter: false,
        }
        this.toggleAddFilter = this.toggleAddFilter.bind(this);
        this.cancelAddFilter = this.cancelAddFilter.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidMount() {
        this.setState({ view: ViewType.FORM });
    }

    toggleAddFilter(): void {
        this.setState({ showAddFilter: !this.state.showAddFilter });
    }

    cancelAddFilter(): void {
        this.setState({
            addFilter: {
                property: undefined,
                condtion: undefined,
                value: "",
            }
        })
    }

    handleAddFilterInput(event): void {
        this.setState({
            addFilter: {
                ...this.state.filter,
                value: event.target.value
            }
        })
    }

    handleAddFilterProperty(selected): void {
        this.setState({
            addFilter: {
                ...this.state.filter,
                property: selected,
            }
        })
    }

    handleAddFilterCondition(selected): void {
        this.setState({
            addFilter: {
                ...this.state.filter,
                condition: selected
            }
        })
    }

    applyFilter(e): void {
        e.preventDefault();

        this.setState({
            view: ViewType.LOADING,
        })

        this.setState({
            view: ViewType.FORM,
            showAddFilter: false,
        })

    }

    renderAddFilter() {
        if (this.state.showAddFilter) {
            return <form onSubmit={this.applyFilter}>
                <ReactSelect
                    tabIndex="1"
                    autoFocus
                    value={this.state.addFilter.property}
                    placeholder="Select Filter"
                    onChange={(selected) => { this.handleAddFilterProperty(selected) }}
                    options={AddFilterProperty} />
                <ReactSelect
                    value={this.state.addFilter.condition}
                    tabIndex="2"
                    placeholder="Select Condition"
                    onChange={(selected) => { this.handleAddFilterCondition(selected) }}
                    options={AddFilterCondition} />
                <input type="text"
                    value={this.state.addFilter.value}
                    tabIndex={3}
                    onChange={this.handleAddFilterInput} />
                <button type="button" tabIndex={4} onClick={this.cancelAddFilter}>Cancel</button>
                <button type="submit" tabIndex={5}>Apply Filter</button>
            </form>
        }
    }

    renderPageHeader() {
        return <>
            <div className="pl-20 pt-18 fw-6 fs-20" >Cluster & Nodes</div>
            <hr className="" />
        </>
    }

    renderClusterTable() {
        return <table className="pl-20 w-100 mt-21">
            <tbody>
                <tr className="table__row-head">
                    <th className="pt-11 pl-20 pb-11 w-16 cn-5 fs-12 fw-6 lh-1.5">CLUSTER NAME</th>
                    <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-6 lh-1.5 ">STATUS</th>
                    <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-6 lh-1.5">NODES</th>
                    <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-6 lh-1.5">K8sVERSION</th>
                    <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-6 lh-1.5">CPU CAPACITY</th>
                    <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-6 lh-1.5">MEMORY CAPACITY</th>
                    <th className="pt-11 pb-11 w-16 cn-5 fs-12 fw-6 lh-1.5"><div className="icon-dim-20" /></th>
                </tr>
            </tbody>
            <ClusterCollapsed />
            <ClusterExpanded />
        </table>
    }

    render() {
        if (this.state.view === ViewType.LOADING) {
            return <Progressing pageLoader />
        }
        return <div className="bcn-0">
            {this.renderPageHeader()}
            <form className="pl-20 pr-20 mb-16" >
                <input className="cluster__search pl-8 pt-6 pb-6 br-4 fs-13 bcn-1 w-100" type="text" placeholder="Search nodes by label, taint, role, annotations, schedulable (eg. label:diskType=gp2)" />
            </form>
            <button className="cluster__add-button bcn-0 ml-20 cb-5 flex left" type="button" onClick={this.toggleAddFilter}>
                Add Filter<Add className="icon-dim-20 fcb-5 pt-5" />
            </button>
            {this.renderAddFilter()}
            {this.renderClusterTable()}
        </div>
    }
}