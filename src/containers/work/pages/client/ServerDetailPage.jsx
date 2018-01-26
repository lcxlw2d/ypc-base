import {connect} from 'react-redux';
import {getRecordDetail, getServTypeDict, addOrModRecord, addRecentTheme, removeRecentTheme, showError, showWarning, SERVER_REFRESH_SERVERLIST} from '../../actions/client/summary/serverAction';
import {FileTransfer, deleteLocalRecordFile} from './../../actions/client/record/recordAction';
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
import Upload from './../../components/client/record/Upload';

import styles from './css/serverDetailPage.css';

/** 客户-全景图-服务记录详情 **/
class ServerDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var date = new Date();
        this.userId = systemApi.getValue("userId");
        this.state = {
            year:date.getFullYear(),
            month:date.getMonth()+1,
            day:date.getDate(),
            servType:{},
            servTitle:"",
            servTimevalue:"",
            tmpSerTypeKey:"",
            servTypeKey:"",
            servTypevalue:"",
            servUsername:"",
            servSummarize:"",
            callTypevalue:"",
            localPhone:"",
            clientPhone:"",
            talkTimeValue:"",
            talkBegintime:"",
            recordingstreamId:"",
            owned:0,
            expireStatus:1,
            showRecord:false,
            showRecordList:false,
            showCalendar:false,
            showServTypeSelect:false,
            showServThemeSelect:false,
            editMode:false,
            loaded:false,
            showUploading:false,
            showUploadFail:false,
            showUploadOver:false,
            progress:0,
            params:null,
            otherParams:null,
            data:null,
        }
    }

    //获取页面名称
    getPageName(){ return "客户全景图_服务记录详情"; }

    componentDidMount(){
        var {id} = this.props.params;
        this.props.getRecordDetail(id, this, this.update);
        this.props.getServTypeDict({dictKeys:"servType"}, this, this.updateTheme);
    }

    updateTheme = (data)=>{
        var {servType} = data;
        this.setState({servType});
    }

    update = (data)=>{
        var {servTitle, servThemeConcat, recordingstreamId, servTimevalue, servType, servTypevalue, servUsername, servSummarize, localPhone, callTypevalue, clientPhone, talkTimeValue, talkBegintime, expireStatus, expireDate, owned} = data,
            year = +servTimevalue.split("-")[0],
            month = +servTimevalue.split("-")[1],
            day = +servTimevalue.split("-")[2],
            servCommaIndex = servThemeConcat.indexOf(";"),
            servThemeId = servThemeConcat.substring(0,servCommaIndex),
            servTheme = servThemeConcat.substring(servCommaIndex+1);

        this.setState({
            year, month, day, servTitle, servThemeId, servTheme, servTimevalue, servTypevalue,expireDate,
            servTypeKey:servType, tmpSerTypeKey:servType, servUsername, servSummarize,  callTypevalue,
            localPhone, clientPhone, talkTimeValue, talkBegintime, expireStatus, recordingstreamId, owned,
            showRecord:!!recordingstreamId,loaded:true,data
        });
    }

    renderDisabledRecordBtn(){
        var {showRecord, loaded} = this.state;
        return [
            loaded && !showRecord?(<span className={styles.recordText}>无</span>):null
        ]
    }

    renderRecordBtn(){
        var {showRecord} = this.state;
        return [
            <ToggleButton open={showRecord} onClick={this.recordClick}/>
        ]
    }

    recordClick = ()=>{
        var {showRecord} = this.state;
        if(showRecord){
            this.setState({showDematchDialog:true});
        }
        else{
            this.setState({showRecordList:true})
        }
    }

    renderTitleInput(){
        var {servTitle} = this.state;
        return (
            <div className={styles.right}>
                <input type="text" placeholder="请填写服务标题" className={styles.titleInput} value={servTitle} onChange={this.titleChange} />
                {servTitle?(<span className={styles.close} onClick={this.titleClear}></span>):null}
            </div>
        )
    }

    titleClear = ()=>{
        this.setState({servTitle:""});
    }

    titleChange = (e)=>{
        var {value} = e.target;
        this.setState({servTitle:value});
    }

    renderThemeSelect(){
        var {servTheme} = this.state;
        return (
            <div className={styles.right} onClick={this.servThemeClick}>
                <span className={this.mergeClassName(Color.c9, styles.dw, servTheme==""?styles.empty:"")}>{servTheme==""?"请选择主题":servTheme}</span>
                <span className={styles.select}></span>
            </div>
        )
    }

    servThemeClick = ()=>{
        this.setState({showServThemeSelect:true});
    }

    closeThemeSelect = ()=>{
        this.setState({showServThemeSelect:false});
    }

    themeSelect = (servThemeId, servTheme)=>{
        this.setState({servThemeId, servTheme,showServThemeSelect:false});
    }


    renderServTypeSelect(){
        var {servTypevalue} = this.state;
        return (
            <div className={styles.right} onClick={this.servTypeClick}>
                <span className={this.mergeClassName(Color.c9, servTypevalue==""?styles.empty:"")}>{servTypevalue==""?"请选择方式":servTypevalue}</span>
                <span className={styles.select}></span>
            </div>
        )
    }

    servTypeClick = ()=>{
        this.setState({showServTypeSelect:true});
    }


    renderServCalendar(){
        var {servTimevalue} = this.state;
        return (
            <div className={styles.right} onClick={this.servDateClick}>
                <span className={this.mergeClassName(Color.c9, servTimevalue==""?styles.empty:"")}>{servTimevalue==""?"请选择时间":servTimevalue}</span>
                <span className={styles.select}></span>
            </div>
        )
    }

    servDateClick = ()=>{
        this.setState({showCalendar:true});
    }

    renderSummary = ()=>{
        var {servSummarize} = this.state;
        return (
            <div className={styles.right}>
                <textarea className={styles.recruit_textarea} value={servSummarize} onChange={this.summaryChange} placeholder="请输入服务总结"></textarea>
            </div>
        )
    }

    summaryChange = (e)=>{
        var {value} = e.target;
        this.setState({servSummarize:value});
    }

    calendarChange = (year,month,day)=>{
        this.setState({year,month,day});
    }

    calendarSelect = (year, month, day)=>{
        this.setState({servTimevalue:year+"-"+month+"-"+day});
    }

    closeCalendar = ()=>{
        var {servTimevalue} = this.state,
            newState = {showCalendar:false};
        if(servTimevalue != ""){
            var list = servTimevalue.split("-");
            newState.year = +list[0];
            newState.month = +list[1];
            newState.day = +list[2];
        }
        this.setState(newState);
    }

    serTypeChange = (tmpSerTypeKey)=>{
        this.setState({tmpSerTypeKey});
    }

    serTypeSelect = (servTypeKey)=>{
        var servTypevalue = this.state.servType[servTypeKey];
        this.setState({servTypeKey,servTypevalue,showServTypeSelect:false});
    }

    closeServType = ()=>{
        this.setState({showServTypeSelect:false});
    }

    renderRight(){
        var {owned, expireStatus,editMode} = this.state;
        if(owned==1 && expireStatus==0 && !editMode){
            return <span className={styles.pattern} onClick={this.toEditMode}>编辑</span>;
        }
        if(owned==1 && expireStatus==0 && editMode){
            return <span className={styles.pattern} onClick={this.preSubmit}>修改</span>;
        }
        return null;
    }

    toEditMode = ()=>{
        this.setState({editMode:true});
    }

    validate(servTitle, servThemeId, serTypeKey, servDate, summary){
        var {showWarning} = this.props, { showRecord } = this.state;
        if(servThemeId==""){
            showWarning("请输入服务主题");
            return;
        }
        if(servTitle==""){
            showWarning("请输入服务标题");
            return;
        }
        if(serTypeKey==""){
            showWarning("请输入服务方式");
            return;
        }
        if(servDate==""){
            showWarning("请输入服务时间");
            return;
        }
        if(summary==""){
            showWarning("请输入服务总结");
            return;
        }
        if(showRecord && this.titleRecord()){
            showWarning("你选择的录音不属于当前客户");
            return;
        }
        return true;
    }

    preSubmit = ()=>{
        var {clientId} = this.props,
            {servThemeId, servTitle, servTimevalue, servTypeKey, servSummarize, params, otherParams, showRecord} = this.state,
            {url, title} = otherParams || {};

        if(!this.validate(servTitle, servThemeId, servTypeKey, servTimevalue, servSummarize)) return;

        if(params){
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
            {progress, recordingInnerId} = data, fileName='';
        if(progress){
            this.setState({progress:Math.floor(progress*100)+"%"});
        }else if(recordingInnerId){
            if(params){
                fileName = params.recordingFile;
                this.props.deleteLocalRecordFile(fileName);
            }
            // this.props.deleteLocalRecordFile(fileName);
            this.setState({recordingstreamId:recordingInnerId,showUploadOver:true,showUploading:false});
            setTimeout(()=>{this.setState({showUploadOver:false});},1000);
            this.submit();
        }
    }

    submit = ()=>{
        var {id} = this.props.params,
            {clientId, showError, showWarning, addOrModRecord} = this.props,
            {servThemeId, servTheme, servTitle, servTimevalue, servTypeKey, servSummarize, recordingstreamId, showRecord} = this.state;

        addOrModRecord({
            servId:id,
            clientId,
            servTitle,
            clientType:"1",
            recordingInnerId:showRecord?recordingstreamId:"",
            servThemeConcat:servThemeId,
            servTime:servTimevalue,
            servType:servTypeKey,
            servSummarize
        }, this, (data)=>{
            if(data.succeed){
                addRecentTheme(this.userId, servThemeId,servTheme);
                Event.fire(SERVER_REFRESH_SERVERLIST);
                this.setState({editMode:false});
            }
            else{
                if(data.code == "-2"){
                    removeRecentTheme(this.userId, servThemeId);
                }
                showError(data.msg);
            }
        });
    }

    closeRecordList = ()=>{
        this.setState({showRecordList:false});
    }

    recordSelect = (recordingstreamId,callTypevalue,localPhone,clientPhone,talkTimeValue,talkBegintime,params,otherParams)=>{

        this.setState({
            recordingstreamId,callTypevalue,localPhone,talkTimeValue,talkBegintime,clientPhone,params,otherParams,
            showRecord:true
        }, () => {
            if(!this.state.params) return;
            let { showWarning } = this.props;
            this.titleRecord()&&showWarning('你选择的录音不属于当前客户');
;        });
        //修复bug
        setTimeout(()=>{this.setState({showRecordList:false});},100);
    }

    titleRecord = () => {
        if(!this.state.params) return false;
        if(!this.state.data) return false;
        let {params={}, data={} } = this.state, { clientType, clientId='', potentialId='' } = data, listName='';
        if(clientType==2){
            listName = params.potentialId;
            if(potentialId != listName)return true;
        }else{
            listName = params.clientId;
            if(clientId != listName)return true;
        }
    }

    recordDematch = ()=>{
        this.setState({showDematchDialog:false,showRecord:false, params:null});
    }

    recordCancel = ()=>{
        this.setState({showDematchDialog:false});
    }

    render() {
        systemApi.log("ServerDetailPage render");

        var {
                showRecord, showRecordList, showCalendar, showServTypeSelect, showServThemeSelect, showDematchDialog,
                tmpSerTypeKey, year, month, day, servTitle, servTheme, servTimevalue, servType, servTypevalue,
                servUsername, servSummarize,  callTypevalue, localPhone, clientPhone, talkTimeValue, talkBegintime,
                expireStatus, expireDate, recordingstreamId, owned, editMode, loaded, showUploading, showUploadFail, showUploadOver,
                progress
            } = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="服务记录详情" theme="red" iconRight={this.renderRight()}/>
                <Content>
                    {(owned==1 && expireStatus==0 && editMode)?(
                        [
                            <ServerEditItem iconClass={styles.title} title="服务标题" elem={this.renderTitleInput()} />,
                            <ServerEditItem iconClass={styles.theme} title="服务主题" elem={this.renderThemeSelect()}/>,
                            <ServerEditItem iconClass={styles.entrust} title="服务方式" elem={this.renderServTypeSelect()}/>,
                            <ServerEditItem iconClass={styles.time} title="服务时间" elem={this.renderServCalendar()}/>,
                            <ServerDetailItem iconClass={styles.customer} title="服务人" text={servUsername} />,
                            <ServerEditItem iconClass={styles.summary} title="总结" elem={this.renderSummary()}/>,
                            <ServerDetailItem iconClass={styles.record} title="匹配录音" iconRight={this.renderRecordBtn()} />
                        ]
                    ):(
                        [
                            <ServerDetailItem iconClass={styles.title} title="服务标题" text={servTitle} />,
                            <ServerDetailItem iconClass={styles.theme} title="服务主题" text={servTheme} />,
                            <ServerDetailItem iconClass={styles.entrust} title="服务方式" text={servTypevalue} />,
                            <ServerDetailItem iconClass={styles.time} title="服务时间" text={servTimevalue} />,
                            <ServerDetailItem iconClass={styles.customer} title="服务人" text={servUsername} />,
                            <ServerDetailItem iconClass={styles.summary} title="总结" text={servSummarize} />,
                            <ServerDetailItem iconClass={styles.record} title="匹配录音" iconRight={this.renderDisabledRecordBtn()}/>
                        ]
                    )}
                    {showRecord?(
                        <ServerRecord callTypevalue={callTypevalue} passageTel={localPhone} clientTel={clientPhone}
                            recordingRuntimeValue={talkTimeValue} recordingBegindatevalue={talkBegintime}/>
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
                    {loaded && expireStatus==1?(
                        <div className={styles.expireTip}>*记录已过期，{expireDate}后不能修改</div>
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
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {getRecordDetail, getServTypeDict, addOrModRecord, showError, showWarning, FileTransfer, deleteLocalRecordFile};
}

function injectProps(state){
    var {clientName, mobileTel} = state.client || {},
        {client} = state.base || {},
        {clientId} = client;
    return {clientName,  mobileTel, clientId};
}
module.exports = connect(injectProps, injectAction())(ServerDetailPage);
