import React, { Component } from 'react';
import './cluster.css';

export class ClusterCollapsed extends Component<{}, {}> {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <><tr className="">
            <td className="cluster__data pl-20 pt-15 pb-15 cn-9 w-20 fw-600">bayern-cluster</td>
            <td className="cluster__data pt-15 pb-15 cn-9 cg-5 w-20">Normal</td>
            <td className="cluster__data pt-15 pb-15 cn-9 w-20"> 6</td>
            <td className="cluster__data pt-15 pb-15 cn-9 w-20">Multiple</td>
            <td className="cluster__data pt-15 pb-15 cn-9 w-20">6,503GHz</td>
            <td className="cluster__data pt-15 pb-15 cn-9 w-20">26TB</td>
        </tr>
            <div className="flex left pl-20">
                <span></span>
                <div className="cluster__alert ml-8">Major version diff identified among nodes. <a href="">View node</a></div>
            </div>
        </>
    }
}