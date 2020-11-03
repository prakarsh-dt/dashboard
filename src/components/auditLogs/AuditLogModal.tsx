import React, { Component } from 'react';
import { VisibleModal } from '../common/modals/VisibleModal'
import { ReactComponent as Close } from '../../assets/icons/ic-close.svg';
import { RouteComponentProps } from 'react-router-dom';

export interface AuditLogModalProps extends RouteComponentProps<{}> {
    close: () => void;
}

export class AuditLogModal extends Component<AuditLogModalProps, {}>{

    render() {
        return <VisibleModal className="">
            <div className="">
                <div className="audit__block">
                    <div className="audit__header">
                        <div className="audit__title">Deployment Template</div>
                        <div className="flex-right">
                            <button type="button" className="transparent" onClick={(event) => { this.props.close() }}>
                                <Close className="icon-dim-20" />
                            </button>
                        </div>
                    </div>
                    <div className="audit__body">
                        <div>
                            <div className="audit__body audit__content--name mr-20">Date and Time</div>
                            <div className="audit__body audit__content--name">Action</div>
                            <div className="audit__body audit__content--value">Update</div>
                            <div className="audit__body audit__content--name">User</div>
                            <div className="audit__body audit__content--value">utkarsh@devtron.ai</div>
                            <div className="audit__body audit__content--name">IP Address</div>
                            <div className="audit__body audit__content--value">203.0.113.6</div>
                            <div className="audit__body audit__content--name">Environment</div>
                            <div className="audit__body audit__content--value">prod-devtroncd,demo-devtroncd,bp-devtroncd,stage-devtroncd</div>
                            <div className="audit__body audit__content--name">Chart version</div>
                            <div className="audit__body audit__content--value">3.8.0</div>
                            <div className="audit__body audit__content--name">Configuration</div>
                            <p className="audit__body ">ContainerPort:
                            <div className="sub__value">
                                    <div className="sub__value--modal-value">name:app</div>
                                    <div className="sub__value--modal-value">Port:8080</div>
                                    <div className="sub__value--modal-value">ServicePort:80</div>
                                </div>
                                <div className="audit__body ">EnvVariable:[]</div>
                                <div className="audit__body ">GracePeriod:30</div>
                                <div className="audit__body ">LivenessProbe:
                                    <div className="sub__value">
                                        <div className="sub__value--modal-value">Path:""</div>
                                        <div className="sub__value--modal-value">command:[]</div>
                                        <div className="audit__body ">failureThreshold:3</div>
                                        <div className="audit__body ">
                                            <div className="sub__value">httpHeader:
                                        <div className="">name:""</div>
                                                <div className="">value:""</div>
                                                <div className="">failureThreshold:3</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>  </p>
                        </div>
                    </div>{/*audit__body */}
                </div>{/*audit__body*/}
            </div>{/*modal__body*/}
        </VisibleModal>
    }

}