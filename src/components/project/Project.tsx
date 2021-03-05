import React, { Component } from 'react';
import { ButtonWithLoader } from '../../components/common';
import folder from '../../assets/icons/ic-folder.svg';

export interface ProjectProps {
    id: number;
    name: string;
    active: boolean;
    isCollapsed: boolean;
    saveProject: (index) => void;
    onCancel: (index) => void;
    handleChange: (Event, index: number, key: 'name') => void;
    loadingData: boolean;
    index: number;
    isValid: { name: boolean };
    errorMessage: { name: string };
}

export class Project extends Component<ProjectProps>  {

    renderCollapsedView() {
        return <div className="white-card white-card--add-new-item mb-16">
            <img src={folder} alt="" className="icon-dim-24 mr-16" />
            <span className="project-title">{this.props.name}</span>
        </div>
    }

    isFormValid() {
        let allKeys = Object.keys(this.props.isValid);
        let isValid = allKeys.reduce((valid, key) => {
            return valid = valid && this.props.isValid[key];
        }, true);
        return isValid;
    }

    renderForm() {
        let isValid = this.props.isValid;
        let errorMessage = this.props.errorMessage;
        return <div>
            <form onSubmit={(e) => { this.props.saveProject(this.props.index) }} className="white-card p-24 mb-16" >
                <div className="white-card__header"> {this.props.id ? "Edit project" : "Add Project"} </div>
                <label className="form__row">
                    <span className="form__label">Project name*</span>
                    <input type="text"
                        autoComplete="off"
                        name="name"
                        value={this.props.name}
                        placeholder="e.g. My Project"
                        className="form__input"
                        autoFocus
                        onChange={(event) => { this.props.handleChange(event, this.props.index, 'name') }} />
                    {isValid.name ? null : <span className="form__error">
                        {errorMessage.name}
                    </span>}
                </label>
                <div className="form__buttons">
                    <button type="button" className="cta cancel mr-16" onClick={this.props.onCancel} >
                        Cancel
                </button>
                    <ButtonWithLoader rootClassName="cta"
                        loaderColor="#ffffff"
                        isLoading={this.props.loadingData}
                        onClick={(event) => { event.preventDefault(); this.props.saveProject(this.props.index) }}>
                        Save
                </ButtonWithLoader>
                </div>
            </form >
        </div>
    }

    render() {
        if (this.props.isCollapsed) return this.renderCollapsedView();
        else return this.renderForm();
    }
}