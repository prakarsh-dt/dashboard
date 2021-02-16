import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ClusterList } from './ClusterList';
import { URLS } from '../../config';
import { ClusterDetail } from './ClusterDetail';

export default class ClusterAndNode extends Component<{}, {}> {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <div>
            <Switch>
                <Route path={`${URLS.CLUSTER_NODE}`} component={ClusterList} />
                <Route path={`${URLS.CLUSTER_NODE}/:clusterId`} component={ClusterDetail} />
                <Redirect to={`${URLS.CLUSTER_NODE}`} />
            </Switch>
        </div>
    }
}