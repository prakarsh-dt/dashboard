import React,{useState, useEffect, useReducer, useRef, useCallback} from 'react'
import {useParams} from 'react-router'
import {getDeploymentTemplate, createDeploymentTemplate, updateDeploymentTemplate, deleteDeploymentTemplate, createNamespace, toggleAppMetrics, chartRefAutocomplete} from './service'
import fileIcon from '../../assets/icons/ic-file.svg'
import arrowTriangle from '../../assets/icons/appstatus/ic-dropdown.svg'
import {Override} from './ConfigMapOverrides'
import {Select, mapByKey, showError, not, Progressing, ConfirmationDialog, Info, useEffectAfterMount, useJsonYaml} from '../common'
import CodeEditor from '../CodeEditor/CodeEditor';
import { toast } from 'react-toastify'
import {OptApplicationMetrics} from '../deploymentConfig/DeploymentConfig'
import warningIcon from '../../assets/img/warning-medium.svg'
import YAML from 'yaml'

export default function DeploymentTemplateOverride({parentState, setParentState, ...props}){
    const {appId, envId} = useParams()
    const [loading, setLoading] = useState(false)
    const [chartRefLoading, setChartRefLoading] = useState(null)

    const memoisedReducer = useCallback((state, action)=>{
        switch(action.type){
            case 'toggleCollapse':
                return {...state, collapsed: !Boolean(state.collapsed)}
            case 'setResult':
                return {
                    ...state, data: action.value, duplicate: (action.value.IsOverride || state.duplicate) ? (action.value.environmentConfig.envOverrideValues || action.value.globalConfig ):  null}
            case 'setCharts':
                return { ...state, charts: mapByKey(action.value.chartRefs, 'id'), selectedChartRefId: state.selectedChartRefId || action.value.latestEnvChartRef || action.value.latestAppChartRef || action.value.latestChartRef}
            case 'createDuplicate':
                return {...state, duplicate: action.value, selectedChartRefId : state.data.globalChartRefId}
            case 'removeDuplicate':
                return {...state, duplicate: null}
            case 'selectChart':
                return {...state, selectedChartRefId: action.value}
            case 'appMetricsLoading':
                return {...state, appMetricsLoading: true}
            case 'success':
            case 'error':
                return {...state, appMetricsLoading: false}
            case 'toggleDialog':
                return { ...state, dialog: !state.dialog }
            case 'reset':
                return {collapsed: true, charts: new Map(), selectedChartRefId: null}
            default:
                return state
        }
    },[appId, envId])
    const initialState={
        collapsed: true,
        charts: new Map(),
    }
    const [state, dispatch] = useReducer(memoisedReducer, initialState)

    useEffect(() => {
        dispatch({type:'reset'})
        setLoading(true)
        initialise();
    }, [envId])

    useEffect(() => {
        if (typeof chartRefLoading === 'boolean' && !chartRefLoading && state.selectedChartRefId) {
            fetchDeploymentTemplate()
        }
    }, [chartRefLoading])

    useEffectAfterMount(()=>{
        if(!state.selectedChartRefId) return
        initialise();
    },[state.selectedChartRefId])

    async function initialise(){
        setChartRefLoading(true)
        try{
            const { result } = await chartRefAutocomplete(+appId, +envId)
            dispatch({type:'setCharts', value: result})
        }
        catch(err){
            setParentState('failed')
            showError(err)
        }
        finally{
            setChartRefLoading(false)
        }
    }

    async function handleAppMetrics(isOpted){
        dispatch({type:'appMetricsLoading'})
        try{
            const {result} = await toggleAppMetrics(+appId, +envId, {
                isAppMetricsEnabled: isOpted
            })
            initialise()
        }
        catch(err){
            showError(err)
        }
    }

    async function fetchDeploymentTemplate(){
        try{
            const {result} = await getDeploymentTemplate(+appId, +envId, (state.selectedChartRefId || state.latestAppChartRef || state.latestChartRef))
            dispatch({type:'setResult', value: result})
            setParentState('loaded')
        }
        catch(err){
            setParentState('failed')
            showError(err)
        }
        finally{
            setLoading(false)
            if(state.appMetricsLoading){
                toast.success(`Successfully ${state.data.appMetrics ? 'deactivated' : 'activated'} app metrics.`, { autoClose: null })
                dispatch({type:'success'})
            }
        }
    }

    async function handleOverride(e) {
        e.preventDefault();
        if(state.duplicate){//permanent delete
            if(state.data.IsOverride){
               dispatch({type:'toggleDialog'}) 
            }
            else{
                //remove copy
                dispatch({type:'removeDuplicate'})
            }
        }
        else{
            //create copy
            dispatch({type:'createDuplicate', value: state.data.globalConfig})
        }
    }

    async function handleDelete(){
        try{
            const { result } = await deleteDeploymentTemplate(state.data.environmentConfig.id, +appId, +envId);
            toast.success('Restored to global.', { autoClose: null })
            dispatch({type:'removeDuplicate'})
            initialise()
        }catch(err){}
        finally{
            dispatch({type:'toggleDialog'})
        }
    }

    if(loading || state.loading) return null
    if(parentState === 'loading') return null
    return (
        <>
        {state.data && state.charts && <NameSpace originalNamespace={state.data.namespace} chartRefId={state.latestAppChartRef || state.latestChartRef} id={state.data.environmentConfig.id}/>}
        <section className="deployment-template-override white-card white-card--list">
            <div className="environment-override-list pointer flex left" onClick={e => dispatch({type:'toggleCollapse'})}>
                <img src={ fileIcon} alt="file-icon"/>
                <div className="flex left">Deployment template</div>
                { state.data && state.data.IsOverride && <div className="flex tag">modified</div>}
                <img alt="arrow" className={`pointer rotate`} style={{ ['--rotateBy' as any]: `${state.collapsed ? '0' : '180'}deg` }} src={arrowTriangle} />
            </div>
            {!state.collapsed && state.data && state.charts && <DeploymentTemplateOverrideForm chartRefLoading={chartRefLoading} state={state} handleOverride={handleOverride} dispatch={dispatch} initialise={initialise} handleAppMetrics={handleAppMetrics} handleDelete={handleDelete}/>}
        </section>
        </>
    )
}

function DeploymentTemplateOverrideForm({state, handleOverride, dispatch, initialise, handleAppMetrics, handleDelete, chartRefLoading}){
    const [tempValue, setTempValue]=useState("")
    const [obj, json, yaml, error] = useJsonYaml(tempValue,4, 'yaml', true)
    const [loading, setLoading] = useState(false)
    const { appId, envId } = useParams()
    async function handleSubmit(e) {
        e.preventDefault();
        if (!obj) {
            toast.error(error)
            return
        }
        const api = state.data.environmentConfig && state.data.environmentConfig.id > 0 ? updateDeploymentTemplate : createDeploymentTemplate
        const payload={
            envOverrideValues:obj,
            chartRefId: state.selectedChartRefId,
            IsOverride: true,
            ...(state.data.environmentConfig.id > 0 ? {
                id: state.data.environmentConfig.id,
                status: state.data.environmentConfig.status,
                manualReviewed: true,
                active: state.data.environmentConfig.active,
                namespace: state.data.environmentConfig.namespace } : {}),

        }
        try{
            setLoading(not)
            await api(+appId, +envId, payload);
            toast.success(
                <div className="toast">
                    <div className="toast__title">{state.data.environmentConfig && state.data.environmentConfig.id > 0 ? 'Updated override' : 'Overridden'}</div>
                    <div className="toast__subtitle">Changes will be reflected after next deployment.</div>
                </div>
            , { autoClose: null })
            initialise()
        }
        catch(err){
            showError(err)
        }
        finally{
            setLoading(not)
        }
    }
    const appMetricsEnvironmentVariableEnabled = window._env_ && window._env_.APPLICATION_METRICS_ENABLED;
    return(
        <>
        <form className="deployment-template-override-form" style={{marginBottom:'16px'}} onSubmit={handleSubmit}>
            <Override
                external={false}
                overridden={!!state.duplicate}
                onClick={handleOverride}
                type="deployment template"
            />
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gridColumnGap:'16px', marginBottom:'16px'}}>
                <div className="flex left column">
                    <label htmlFor="" className="form__label">Template version {state.duplicate ? '(app default)' : ''}</label>
                    <input autoComplete="off" value={state.charts.get(state.data.globalChartRefId).version} className="form__input" disabled />
                </div>
                {state.duplicate && <div className="flex left column">
                        <label htmlFor="" className="form__label">Template version (environment override)</label>
                        <Select onChange={e => dispatch({ type: 'selectChart', value: e.target.value })} value={state.selectedChartRefId} rootClassName="chart-version">
                            <Select.Button style={{ height: '40px', paddingLeft: '8px', width:'100%' }}>
                                {state.selectedChartRefId ? state.charts.get(state.selectedChartRefId).version : 'Select chart'}
                            </Select.Button>
                            {state.charts && Array.from(state.charts).map((value, idx) => <Select.Option key={idx} value={value[0]}>{value[1].version}</Select.Option>)}
                        </Select>
                </div>}
            </div>
            <div className="code-editor-container">
                <CodeEditor
                    value={state ? state.duplicate ? YAML.stringify(state.duplicate, {indent: 4}) : YAML.stringify(state.data.globalConfig, {indent: 4}) : ""}
                    onChange={res=>setTempValue(res)}
                    defaultValue={state && state.data && state.duplicate ? YAML.stringify(state.data.globalConfig, {indent: 4}) : ""}
                    mode="yaml"
                    tabSize={4}
                    readOnly={!state.duplicate}
                    loading={chartRefLoading}
                >
                    <CodeEditor.Header>
                        <CodeEditor.LanguageChanger/>
                        <CodeEditor.ValidationError/>
                    </CodeEditor.Header>
                </CodeEditor>
            </div>
            <div className="form__buttons mt-12">
                <button className="cta" disabled={!state.duplicate}>{loading ? <Progressing />  : 'Save'}</button>
            </div>
        </form>
        {appMetricsEnvironmentVariableEnabled && <OptApplicationMetrics
            currentVersion={state.charts.get(state.selectedChartRefId).version}
            minimumSupportedVersion={"3.7.0"}
            onChange={handleAppMetrics}
            className=""
            opted={!!state.data.appMetrics}
            loading={state.appMetricsLoading}
            disabled={!state.duplicate || (state.data && !state.data.IsOverride)}
        />}
        
        {state.dialog && <ConfirmationDialog>
            <ConfirmationDialog.Icon src={warningIcon} />
            <ConfirmationDialog.Body title="This action will cause permanent removal." subtitle="This action will cause all overrides to erase and app level configuration will be applied" />
            <ConfirmationDialog.ButtonGroup>
                <button type="button" className="cta cancel" onClick={e => dispatch({ type: 'toggleDialog' })}>Cancel</button>
                <button type="button" className="cta delete" onClick={handleDelete}>Confirm</button>
            </ConfirmationDialog.ButtonGroup>
        </ConfirmationDialog>}
        </>
    )
}

function NameSpace({ originalNamespace="", chartRefId, id }) {
    const [loading, setLoading]=useState(false)
    const {appId, envId} = useParams()
    const [namespace, setNamespace] = useState(originalNamespace)
    useEffect(()=>{
        setNamespace(originalNamespace)
    },[originalNamespace])
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(not)
        try{
            const {result} = await createNamespace(appId, envId, {
                "namespace": namespace,
                "chartRefId": chartRefId,
                id
            })
        }
        catch(err){
            showError(err)
        }
        finally{
            setLoading(not)
        }
    }
    return (
        <form className="namespace" onSubmit={handleSubmit}>
            <label htmlFor="" className="form__label">Namespace</label>
            <div className="flex">
                <input type="text" autoComplete="off" className="form__input" disabled={!!originalNamespace} onChange={e=>setNamespace(e.target.value)} value={namespace}/>
                {!originalNamespace && <button className="cta" type="submit" style={{ marginLeft: '16px' }}>{loading ? <Progressing /> : 'Save'}</button>}
            </div>
            {!originalNamespace && <div className="flex left">
                <Info color="#b1b7bc" style={{ width: '14px' }} />
                <span style={{ color: '#6b778c', marginLeft: '4px' }} className="form__error form__error--info">Cannot be edited after saving.</span>
            </div>}
        </form>
    )
}