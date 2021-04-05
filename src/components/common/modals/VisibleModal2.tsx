import React from 'react';
import ReactDOM from 'react-dom';

export class VisibleModal2 extends React.Component<{ className: string; close?: (e) => void; }> {

    modalRef = document.getElementById('visible-modal-2');

    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    escFunction(event) {
        if (event.keyCode === 27 && this.props.close) {
            this.props.close(event);
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction);
        this.modalRef.classList.add("show-with-bg");
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction);
        this.modalRef.classList.remove("show-with-bg");
    }

    render() {
        return ReactDOM.createPortal(
            <div className={`visible-modal__body ${this.props.className}`} onClick={this.props?.close}>
                {this.props.children}
            </div>, document.getElementById('visible-modal-2'))
    }
}