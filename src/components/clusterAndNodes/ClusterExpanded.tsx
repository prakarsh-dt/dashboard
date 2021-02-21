import React, { Component } from 'react';
import './cluster.css';
export class ClusterExpanded extends Component<{}, {}> {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderExpandableHeding() {
        return <table className="pl-20 w-100 mt-21">
            <tr className="table__row-head">
                <th className="w-18 pt-11 pl-20 pb-11 cn-5 fs-12 fw-6">NAME</th>
                <th className="w-18 pt-11 pb-11 cn-5 fs-12 fw-6 ">STATUS</th>
                <th className="w-18 pt-11 pb-11 cn-5 fs-12 fw-6">ROLES</th>
                <th className="w-18 pt-11 pb-11 cn-5 fs-12 fw-6">CPU CAPACITY</th>
                <th className="w-18 pt-11 pb-11 cn-5 fs-12 fw-6">MEMORY CAPACITY</th>
            </tr>
            {this.renderExpandableTable()}
        </table>
    }

    renderExpandableTable() { return <><tr className="">
            <td className="cluster__data-25 pl-20 pt-15 pb-15 cn-9">ip-172-31-2-152.us-east-2.compute.internal</td>
            <td className="cluster__data pt-15 pb-15 cn-9 cg-5 ">Ready</td>
            <td className="cluster__data pt-15 pb-15 cn-9 "> master</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">40%</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">30%</td>
        </tr>
        <tr className="">
            <td className="cluster__data-25 pl-20 pt-15 pb-15 cn-9">ip-172-31-2-152.us-east-2.compute.internal</td>
            <td className="cluster__data pt-15 pb-15 cn-9 cg-5 ">Ready</td>
            <td className="cluster__data pt-15 pb-15 cn-9 "> master</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">40%</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">30%</td>
        </tr>
        <tr className="">
            <td className="cluster__data-25 pl-20 pt-15 pb-15 cn-9">ip-172-31-2-152.us-east-2.compute.internal</td>
            <td className="cluster__data pt-15 pb-15 cn-9 cg-5 ">Ready</td>
            <td className="cluster__data pt-15 pb-15 cn-9 "> master</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">40%</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">30%</td>
        </tr>
        <div className=""></div>
        <tr className="">
            <td className="cluster__data-25 pl-20 pt-15 pb-15 cn-9">ip-172-31-2-152.us-east-2.compute.internal</td>
            <td className="cluster__data pt-15 pb-15 cn-9 cg-5 ">Ready</td>
            <td className="cluster__data pt-15 pb-15 cn-9 "> master</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">40%</td>
            <td className="cluster__data pt-15 pb-15 cn-9 ">30%</td>
        </tr>
    </>

    }

    render() {
        return <div>
            <div className="pt-10 pb-10 fs-16 cn-9 pl-20">bayern-cluster</div>
            <div className="flex left pl-20">
                <span></span>
                <div className="cluster__alert ml-8">Major version diff identified among nodes. <a className="cb-5" href="">View node</a></div>
            </div>
            {this.renderExpandableHeding()}
        </div>
    }
}