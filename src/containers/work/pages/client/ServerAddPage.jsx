import {addRecentTheme, removeRecentTheme, SERVER_REFRESH_SERVERLIST} from '../../actions/client/summary/serverAction';

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
class ServerAddPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        this.userId = systemApi.getValue("userId");
        this.state = {
            year,
            month,
            day,
            summary:"",                 //服务总结
            servThemeId:"",             //服务主题
            servThemeName:"",
            servType:{},
            servTitle:"",               //服务标题
            serTypeKey:"",
            serTypeVal:"",
            tmpSerTypeKey:"",
            servDate:year+"-"+month+"-"+day,

            recordingstreamId:"",
            callTypevalue:"",
            passageTel:"",
            clientTel:"",
            clientType: 1,    //客户类型
            recordingRuntimeValue:"",
            recordingBegindatevalue:"",
            params:null,
            otherParams:null,

            progress:0,

            showRecord:false,
            showRecordList:false,
            showServTypeSelect:false,
            showCalendar:false,
            showServThemeSelect:false,
            showDematchDialog:false,
            showUploading:false,
            showUploadFail:false,
            showUploadOver:false
        }
    }

    //获取页面名称
    getPageName(){ return "客户全景图_新增服务记录"; }

    componentDidMount(){
		var {recordingInnerId,callTypevalue,clientTel,recordingRuntime,recordingBegindate} = this.props,
            passageTel='';
        if(clientTel){
            this.recordSelect(recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntime,recordingBegindate);
        }
        this.props.getServTypeDict({dictKeys:"servType"}, this, this.update);
    }

    getDftKey(servKeys){
        for(var k in servKeys){
            if(servKeys[k] == "电话回访"){
                return {key:k,name:servKeys[k]};
            }
        }
        return {key:"",name:""};
    }

    update = (data)=>{
        var {servType} = data,
            dftObj = this.getDftKey(servType);
        this.setState({servType,serTypeKey:dftObj.key,serTypeVal:dftObj.name,tmpSerTypeKey:dftObj.key});
    }

    renderRight(){
        return (
            <span className={styles.pattern} onClick={this.preSubmit}>完成</span>
        )
    }

    validate(servTitle, servThemeId, serTypeKey, servDate, summary, clientId,  potentialId, ){
        var {showWarning} = this.props, { showRecord } = this.state;

        if(clientId=="" &&  potentialId==""){
            showWarning("请选择客户");
            return false;
        }
        if(servTitle==""){
            showWarning("请输入服务标题");
            return false;
        }
        if(servThemeId==""){
            showWarning("请输入服务主题");
            return false;
        }
        if(serTypeKey==""){
            showWarning("请输入服务方式");
            return false;
        }
        if(servDate==""){
            showWarning("请输入服务时间");
            return false;
        }
        if(summary==""){
            showWarning("请输入服务总结");
            return false;
        }
        if(showRecord && this.titleRecord()){
            showWarning("你选择的录音不属于当前客户");
            return false;
        }
        return true;
    }

    preSubmit = ()=>{
        var {clientId='', potentialId=''} = this.props,
            {servThemeId, servTitle, servDate, serTypeKey, summary, params, otherParams, showRecord} = this.state,
            {url, title} = otherParams || {};
        // console.log(showRecord+"showRecord")
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
            {progress=0, recordingInnerId} = data, fileName;
            if(params){
                fileName = params.recordingFile;
            }
        if(progress){
            this.setState({progress:Math.floor(progress*100)+"%"});
        }else if(recordingInnerId){
            this.props.deleteLocalRecordFile(fileName);
            this.setState({recordingstreamId:recordingInnerId,showUploadOver:true,showUploading:false});
            setTimeout(()=>{this.setState({showUploadOver:false});},1000);
            this.submit();
        }
    }

    submit = ()=>{
        var {potentialId, clientType, clientId, showError, showWarning, addOrModRecord} = this.props,
            {servThemeId, servThemeName, servTitle, servDate, serTypeKey, summary, recordingstreamId, showRecord, params} = this.state, supParams={
                servTitle,
                recordingInnerId:showRecord?recordingstreamId:"",
                servThemeConcat:servThemeId,
                servTime:servDate,
                servType:serTypeKey,
                servSummarize:summary};

        if(clientType != 2){
            supParams['clientType'] = 1;
            supParams['clientId'] = clientId;

        }else{
            supParams['clientType'] = 2;
            supParams['potentionId'] = potentialId;
        }
        //console.log(supParams)
        //修改前上传接口参数
        // {
        //     clientId,
        //     servTitle,
        //     clientType:"1",
        //     recordingInnerId:showRecord?recordingstreamId:"",
        //     servThemeConcat:servThemeId,
        //     servTime:servDate,
        //     servType:serTypeKey,
        //     servSummarize:summary
        // }
        addOrModRecord(supParams, this, (data)=>{
            if(data.succeed){
                var {clientTel,fromRecord, potentialIdTwo}=this.props;
                addRecentTheme(this.userId,servThemeId,servThemeName);
                Event.fire(SERVER_REFRESH_SERVERLIST);
                fromRecord?this.props.recordJumpService("", {}, fromRecord):hashHistory.push("/work/client/detail/server");
            }
            else{
                if(data.code == "-2"){
                    removeRecentTheme(this.userId,servThemeId);
                }
                showError(data.msg);
            }

        })
    }

    renderRecordBtn(){
        var {showRecord} = this.state;
        return [
            <ToggleButton open={showRecord} onClick={this.recordClick}/>
        ]
    }

    recordClick = ()=>{
        var {showRecord,  clientName=''} = this.state;
        if(showRecord){
            this.setState({showDematchDialog:true});
        }
        else{
            if(this.props.location.pathname =="/work/home/serveradd"){

                if(clientName!=''){
                    this.setState({showRecordList:true})
                }else{
                    this.props.showWarning('请先选择客户')
                }
            }else{
                this.setState({showRecordList:true})
            }
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

    titleChange = (e)=>{
        var {value} = e.target;
        this.setState({servTitle:value});
    }

    titleClear = ()=>{
        this.setState({servTitle:""});
    }

    renderThemeSelect(){
        var {servThemeName} = this.state;
        return (
            <div className={styles.right} onClick={this.servThemeClick}>
                <span className={this.mergeClassName(Color.c9, styles.dw, servThemeName==""?styles.empty:"")}>{servThemeName==""?"请选择主题":servThemeName}</span>
                <span className={styles.select}></span>
            </div>
        )
    }

    servThemeClick = ()=>{
        this.setState({showServThemeSelect:true});
    }

    renderServTypeSelect(){
        var {serTypeVal} = this.state;
        return (
            <div className={styles.right} onClick={this.servTypeClick}>
                <span className={this.mergeClassName(Color.c9, serTypeVal==""?styles.empty:"")}>{serTypeVal==""?"请选择方式":serTypeVal}</span>
                <span className={styles.select}></span>
            </div>
        )
    }

    servTypeClick = ()=>{
        this.setState({showServTypeSelect:true});
    }

    renderServCalendar(){
        var {servDate} = this.state;
        return (
            <div className={styles.right} onClick={this.servDateClick}>
                <span className={this.mergeClassName(Color.c9, servDate==""?styles.empty:"")}>{servDate==""?"请选择时间":servDate}</span>
                <span className={styles.select}></span>
            </div>
        )
    }

    servDateClick = ()=>{
        this.setState({showCalendar:true});
    }

    renderSummary = ()=>{
        var {summary} = this.state;
        return (
            <div className={styles.right}>
                <textarea className={styles.recruit_textarea} value={summary} onChange={this.summaryChange} placeholder="请输入服务总结"></textarea>
            </div>
        )
    }

    summaryChange = (e)=>{
        var {value} = e.target;
        this.setState({summary:value});
    }

    serTypeChange = (tmpSerTypeKey)=>{
        this.setState({tmpSerTypeKey});
    }

    serTypeSelect = (serTypeKey)=>{
        var serTypeVal = this.state.servType[serTypeKey];
        this.setState({serTypeKey,serTypeVal,showServTypeSelect:false});
    }

    closeServType = ()=>{
        this.setState({showServTypeSelect:false});
    }

    calendarChange = (year,month,day)=>{
        this.setState({year,month,day});
    }

    calendarSelect = (year, month, day)=>{
        this.setState({servDate:year+"-"+month+"-"+day});
    }

    closeCalendar = ()=>{
        var {servDate} = this.state,
            newState = {showCalendar:false};
        if(servDate != ""){
            var list = servDate.split("-");
            newState.year = +list[0];
            newState.month = +list[1];
            newState.day = +list[2];
        }
        this.setState(newState);
    }

    closeThemeSelect = ()=>{
        this.setState({showServThemeSelect:false});
    }

    themeSelect = (servThemeId, servThemeName)=>{
        this.setState({servThemeId, servThemeName,showServThemeSelect:false});
    }

    closeRecordList = ()=>{
        this.setState({showRecordList:false});
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
        let {params={}, } = this.state, {showWarning, clientType=1, clientId='', potentialId=''} = this.props, listName='';
        if(clientType==2){
            listName = params.potentialId;
            if(potentialId != listName) return true;
        }else{
            listName = params.clientId;
            if(clientId != listName) return true;
        }
    }

    recordDematch = ()=>{
        this.setState({showDematchDialog:false,showRecord:false, params:null});
    }

    recordCancel = ()=>{
        this.setState({showDematchDialog:false});
    }

    renderClientType(){
        var {clientType = 1} = this.props;
        return (
            <div className={styles.pot_check}>
                <a  className={clientType==1?styles.on:""}>正式客户</a>
                <a className={clientType==2?styles.on:""}>潜在客户</a>
            </div>
        )
    }

    render() {
        systemApi.log("ServerAddPage render");

        var {clientName, fundAccount} = this.props,
            {
                showRecord, showRecordList, showCalendar, showServTypeSelect, showDematchDialog, showUploading, showUploadFail, showUploadOver,
                showServThemeSelect, servType, tmpSerTypeKey, year, month, day, progress,
                callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue
            } = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="新增服务记录" theme="red" iconRight={this.renderRight()}/>
                <Content>
                    <ServerEditItem iconClass={styles.customer} title="客户类型" elem={this.renderClientType()} />
                    <ServerDetailItem iconClass={styles.customer} title="客户" text={clientName + " " + fundAccount} />
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

module.exports = ServerAddPage;
