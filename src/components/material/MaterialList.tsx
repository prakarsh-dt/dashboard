import React, { Component } from 'react';
import { getGitProviderListAuth, getSourceConfig } from '../../services/service';
import { ErrorScreenManager, Progressing, showError, sortCallback } from '../common';
import { AppConfigStatus, ViewType,  DOCUMENTATION, } from '../../config';
import { withRouter } from 'react-router';
import { CreateMaterial } from './CreateMaterial';
import { UpdateMaterial } from './UpdateMaterial';
import { MaterialListProps, MaterialListState } from './material.types';
import './material.css';


class MaterialList extends Component<MaterialListProps, MaterialListState> {

    constructor(props) {
        super(props);
        this.state = {
            statusCode: 0,
            view: ViewType.LOADING,
            configStatus: AppConfigStatus.LOADING,
            materials: [],
            providers: [],
        }
        this.isGitProviderValid = this.isGitProviderValid.bind(this);
        this.isGitUrlValid = this.isGitUrlValid.bind(this);
        this.isCheckoutPathValid = this.isCheckoutPathValid.bind(this);
        this.refreshMaterials = this.refreshMaterials.bind(this);
    }

    componentDidMount() {
        Promise.all([getSourceConfig(this.props.match.params.appId), getGitProviderListAuth(this.props.match.params.appId)]).then(([sourceConfigRes, providersRes]) => {
            let materials = sourceConfigRes.result.material || [];
            let providers = providersRes.result;
            materials = materials.map((mat) => {
                return {
                    ...mat,
                    gitProvider: providers.find(p => mat.gitProviderId === p.id),
                }
            })
            this.setState({
                materials: materials.sort((a, b) => sortCallback("id", a, b)),
                providers: providersRes.result,
                view: ViewType.FORM,
            });
        }).catch((error) => {
            showError(error);
            this.setState({ view: ViewType.ERROR });
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.configStatus !== state.configStatus) {
            return {
                ...state,
                configStatus: props.configStatus,
            };
        }
        return null;
    }

    refreshMaterials() {
        if (this.state.materials.length < 1) {
            this.props.respondOnSuccess();
        }
        getSourceConfig(this.props.match.params.appId).then((response) => {
            let materials = response.result.material.map((mat) => {
                return {
                    ...mat,
                    gitProvider: this.state.providers.find(p => mat.gitProviderId === p.id),
                }
            })
            this.setState({
                materials: materials.sort((a, b) => sortCallback("id", a, b)),
            });
        })
    }

    isCheckoutPathValid(checkoutPath: string) {
        if (this.state.materials.length >= 1) { //Multi git
            if (!checkoutPath.length) { return "This is a required field"; }
            else {
                if (!checkoutPath.startsWith("./")) { return "Invalid Path. Checkout path should start with './'"; }
                else return;
            }
        }

        else {
            if (checkoutPath.length && !checkoutPath.startsWith("./")) {
                return "Invalid Path. Checkout path should start with './'";
            }
            return undefined;
        }
    }

    isGitUrlValid(url: string): string | undefined {
        if (!url.length) return "This is a required field"

        if (url.endsWith(".git")) return undefined;
        else return "Invalid Path. URL should end with .git"
    }

    isGitProviderValid(provider) {
        if (provider && provider.id) return undefined;

        return "This is required field"
    }

    renderPageHeader() {
        return <>
            <h1 className="form__title form__title--artifacts">Git Materials</h1>
            <p className="form__subtitle form__subtitle--artifacts">Manage source code repositories for this application. 
            <span><a rel="noreferrer noopener" target="_blank" className="learn-more__href" href={DOCUMENTATION.GLOBAL_CONFIG_GIT}> Learn more about Git Material</a> </span></p>
        </>
    }

    render() {
        if (this.state.view == ViewType.LOADING) return <Progressing pageLoader />
        else if (this.state.view == ViewType.ERROR) {
            return <ErrorScreenManager code={this.state.statusCode} />
        }
        else {
            return <div className="form__app-compose">
                {this.renderPageHeader()}
                <CreateMaterial key={this.state.materials.length}
                    appId={Number(this.props.match.params.appId)}
                    isMultiGit={this.state.materials.length > 0}
                    providers={this.state.providers}
                    refreshMaterials={this.refreshMaterials}
                    isGitUrlValid={this.isGitUrlValid}
                    isGitProviderValid={this.isGitProviderValid}
                    isCheckoutPathValid={this.isCheckoutPathValid} />
                {this.state.materials.map((mat) => {
                    return <UpdateMaterial key={mat.name}
                        appId={Number(this.props.match.params.appId)}
                        isMultiGit={this.state.materials.length > 0}
                        providers={this.state.providers}
                        material={mat}
                        refreshMaterials={this.refreshMaterials}
                        isGitUrlValid={this.isGitUrlValid}
                        isGitProviderValid={this.isGitProviderValid}
                        isCheckoutPathValid={this.isCheckoutPathValid} />
                })}
            </div>
        }
    }
}

export default withRouter(MaterialList);
