import {connect} from 'react-redux';
import {getServTypeDict, addOrModRecord, showError, showWarning, addRecentTheme, removeRecentTheme} from '../../actions/client/summary/serverAction';
import {FileTransfer, deleteLocalRecordFile} from './../../actions/client/record/recordAction';
import ServerAddPage from './ServerAddPage';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import Calendar from '../../../../components/common/calendar/Calendar';
import ServerDetailItem from '../../components/client/detail/ServerDetailItem';
import ServerEditItem from '../../components/client/detail/ServerEditItem';
import ServerRecord from '../../components/client/detail/ServerRecord';
import RecordList from '../../components/client/detail/RecordList';
import ToggleButton from '../../components/client/detail/ToggleButton';
import ServeTypeSelect from '../../components/client/detail/ServeTypeSelect';
import ServThemeSelect from '../../components/client/detail/ServThemeSelect';
import ServerClientSelect from '../../components/client/detail/ServerClientSelect';
import {recordJumpService} from '../../../../store/actions';
import Upload from './../../components/client/record/Upload';

import styles from './css/serverDetailPage.css';

/** 首页进入服务记录添加 **/
class ServerConAddPage extends ServerAddPage {

    constructor(props, context) {
        super(props, context);
        this.state = Object.assign(this.state,{
            showClientSelect:false,
            fundAccount:"",
            clientName:"",
            clientId:"",
            clientType:1,
            potentialId:""

        })
    }

    //获取页面名称
    getPageName(){ return "首页_添加服务记录"; }

    renderClientInput(){
        var {clientId, clientName, fundAccount} = this.state;
        return (
            <div className={styles.right} onClick={this.servClientClick}>
                <span className={this.mergeClassName(Color.c9, styles.dw, clientId==""?styles.empty:"")}>{clientId==""?"请选择客户":(clientName+" "+fundAccount)}</span>
                <span className={styles.select}></span>
            </div>
        )
    }

    renderClientType(){
        var {clientType} = this.state;
        return (
            <div className={styles.pot_check}>
                <a  className={clientType==1?styles.on:""} onClick={this.formal}>正式客户</a>
                <a className={clientType==2?styles.on:""} onClick={this.potential}>潜在客户</a>
            </div>
        )
    }

    formal = () => {
      var {clientType}=this.state;
      if(clientType!=1){
        this.setState({clientType:1,clientId:"",potentialId:"",clientName:""})
      }

    }
    potential = () => {
      var {clientType}=this.state;
      if(clientType!=2){
        this.setState({clientType:2,clientId:"",potentialId:"",clientName:""})
      }
    }

    servClientClick = ()=>{
        this.setState({showClientSelect:true});
    }

    closeClientSelect = ()=>{
        this.setState({showClientSelect:false});
    }

    clientSelect = (clientId, clientName, fundAccount, potentialId)=>{
        this.setState({clientId, clientName, fundAccount, potentialId, showClientSelect:false});
    }

    preSubmit = ()=>{
        var {servThemeId, servThemeName, servTitle, servDate, serTypeKey, summary, clientId, params, otherParams, clientType,potentialId} = this.state,
            {url, title} = otherParams || {};
            if(clientType==2) clientId=potentialId;

        if(!this.validate(servTitle, servThemeId, serTypeKey, servDate, summary, clientId, potentialId)) return;

        if(params){
            // console.log('params')
            // console.log(params)
            this.setState({showUploading:true});
            this.props.FileTransfer(params, url, title, this.success, this.failure, this);
            return;
        }
        this.submit();
    }

    failure = ()=>{
        this.setState({showUploadFail:true,showUploading:false});
        setTimeout(()=>{this.setState({showUploadFail:false});},1000);
    }

    //多选上传成功回调
    success = (data)=>{
        var {params={}} = this.state,
            {progress=0, recordingInnerId} = data, fileName='';
        if(progress){
            this.setState({progress:Math.floor(progress*100)+"%"});
        }else if(recordingInnerId){
            if(params){
                fileName = params.recordingFile;
                this.props.deleteLocalRecordFile(fileName);
            }
            this.setState({recordingstreamId:recordingInnerId,showUploadOver:true,showUploading:false});
            setTimeout(()=>{this.setState({showUploadOver:false});},1000);
            this.submit();
        }
    }

    submit = ()=>{
        var {showError, showWarning, addOrModRecord} = this.props,
            {servThemeId, servThemeName, servTitle, servDate, serTypeKey, potentialId, summary, recordingstreamId, showRecord, clientId, clientType} = this.state,
            params = {
                servTitle,
                clientType,
                recordingInnerId:showRecord?recordingstreamId:"",
                servThemeConcat:servThemeId,
                servTime:servDate,
                servType:serTypeKey,
                servSummarize:summary};
            if(clientType == 1){
                params['clientId'] = clientId;
            }else if(clientType == 2){
                params['potentionId'] = potentialId;
            }
            //修改前参数
            // {
            //     clientId,
            //     servTitle,
            //     clientType,
            //     recordingInnerId:showRecord?recordingstreamId:"",
            //     servThemeConcat:servThemeId,
            //     servTime:servDate,
            //     servType:serTypeKey,
            //     servSummarize:summary
            // }
        addOrModRecord(params, this, (data)=>{
            if(data.succeed){
                addRecentTheme(this.userId,servThemeId,servThemeName);
                this.setState({
                    clientId:"",
                    fundAccount:"",
                    clientName:"",
                    servTitle:"",
                    summary:"",
                    potentialId:"",
                    recordingstreamId:"",
                    showRecord:false,
                    params:null,
                    otherParams:null
                })
            }
            else{
                if(data.code == "-2"){
                    removeRecentTheme(this.userId,servThemeId);
                }
                showError(data.msg);
            }
        })
    }

    recordSelect = (recordingstreamId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue,params,otherParams)=>{
        this.setState({
            recordingstreamId,callTypevalue,passageTel,clientTel,
            recordingRuntimeValue,recordingBegindatevalue,params, otherParams,
            showRecord:true
            // //提示函数
        }, () => {
            let {showWarning} = this.props;
            if(!this.state.params) return;
            this.titleRecord()&&showWarning("你选择的录音不属于当前客户");
        });

        //修复bug
        setTimeout(()=>{this.setState({showRecordList:false});},100);
    }

    titleRecord = () => {
        if(!this.state.params) return false;
        let {params={}, clientType=1, clientId='', potentialId=''} = this.state, {showWarning} = this.props, listName='';
        if(clientType==2){
            listName = params.potentialId;
            if(potentialId != listName)return true;
        }else{
            listName = params.clientId;
            if(clientId != listName)return true;
        }
    }

    isComplete(){
        var {servThemeId, servTitle, servDate, serTypeKey, summary, clientId} = this.state;
        return servThemeId!="" && servTitle!="" && servDate!="" && serTypeKey!="" && summary!="" && clientId!="" && !this.titleRecord();
    }

    //返回上一页
    onBackClick = () => {
        let { fromRecord } = this.props;
        if(fromRecord!=""){
            this.props.recordJumpService("", {}, fromRecord)
        }else{
            hashHistory.push("/work/home")
        }
    }

    render() {
        systemApi.log("ServerConAddPage render");

        var {
                showRecord, showRecordList, showCalendar, showServTypeSelect, showDematchDialog, showUploading, showUploadFail, showUploadOver,
                showServThemeSelect, showClientSelect, servType, tmpSerTypeKey, year, month, day,
                callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue,clientType, progress=0
            } = this.state;
        return (
            <FullScreenView>
                <AppHeader headerName="新增服务记录" theme="red" onBackClick={this.onBackClick}/>
                <Content withBottom={false}>
                    <ServerEditItem iconClass={styles.customer} title="客户类型" elem={this.renderClientType()} />
                    <ServerEditItem iconClass={styles.customer} title="客户" elem={this.renderClientInput()} />
                    <ServerEditItem iconClass={styles.title} title="服务标题" elem={this.renderTitleInput()} />
                    <ServerEditItem iconClass={styles.theme} title="服务主题" elem={this.renderThemeSelect()}/>
                    <ServerEditItem iconClass={styles.entrust} title="服务方式" elem={this.renderServTypeSelect()}/>
                    <ServerEditItem iconClass={styles.time} title="服务时间" elem={this.renderServCalendar()}/>
                    <ServerEditItem iconClass={styles.summary} title="总结" elem={this.renderSummary()}/>
                    <ServerDetailItem iconClass={styles.record} title="匹配录音" iconRight={this.renderRecordBtn()} />
                    {showRecord?(
                        <ServerRecord callTypevalue={callTypevalue} passageTel={passageTel} clientTel={clientTel}
                            recordingRuntimeValue={recordingRuntimeValue} recordingBegindatevalue={recordingBegindatevalue}/>
                    ):null}
                    {showRecordList?(
                        <RecordList onClose={this.closeRecordList} onSelect={this.recordSelect}/>
                    ):null}
                    {showServTypeSelect?(
                        <ServeTypeSelect serTypeList={servType} value={tmpSerTypeKey} onChange={this.serTypeChange} onSelect={this.serTypeSelect} onClose={this.closeServType}/>
                    ):null}
                    {showCalendar?(
                        <Calendar year={year} month={month} day={day} onDateChange={this.calendarChange} onDateSelect={this.calendarSelect} onClose={this.closeCalendar}/>
                    ):null}
                    {showServThemeSelect?(
                        <ServThemeSelect onClose={this.closeThemeSelect} onSelect={this.themeSelect}/>
                    ):null}
                    {showDematchDialog?(
                        <ConfirmDialog title="解除匹配" text="该录音匹配确定要解除？" onSubmit={this.recordDematch} onCancel={this.recordCancel}/>
                    ):null}
                    {showClientSelect?(
                        <ServerClientSelect clientType={clientType} onClose={this.closeClientSelect} onSelect={this.clientSelect}/>
                    ):null}
                    {showUploading?(
                        <Upload icon="loading" title="小犇努力上传中..." jinDu={progress} max={1} over={0}/>
                    ):null}
                    {showUploadFail?(
                        <Upload icon="uploadFail" title="上传失败！" fail={this.fail}/>
                    ):null}
                    {showUploadOver?(
                        <Upload icon="uploadOver" title="上传完成！" fail={this.fail}/>
                    ):null}
                </Content>
                <div className={styles.bottom}>
                    <div className={this.mergeClassName(styles.button, this.isComplete()?styles.enabled:"")} onClick={this.preSubmit}>完成并继续</div>
                </div>
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {getServTypeDict, addOrModRecord, showError, showWarning, FileTransfer, deleteLocalRecordFile, recordJumpService};
}

function injectProps(state) {
    var {client = {}} = state.base || {},
        {fromRecord} = client;
    return {fromRecord};
}

module.exports = connect(injectProps, injectAction())(ServerConAddPage);
