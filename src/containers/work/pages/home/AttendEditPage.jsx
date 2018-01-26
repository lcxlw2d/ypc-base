import {connect} from 'react-redux';
import {getContent, deleteDraft,attendSubmit,warn} from '../../actions/home/attend/edit/editAction';
import {ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../actions/home/attend/attendAction';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Intro from '../../../../components/common/popup/Intro';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import CurrentPosition from '../../components/home/attend/edit/CurrentPosition';
import AttendInfoEdit from '../../components/home/attend/edit/AttendInfoEdit';
import MyClient from '../../components/home/attend/edit/MyClient';
import VisitScope from '../../components/home/attend/edit/VisitScope';
import DraftTip from '../../components/home/attend/edit/DraftTip';
import ServThemeSelect from '../../components/client/detail/ServThemeSelect';
import styles from '../css/home/attendEditPage.css';

/** 首页-外勤打卡编辑页面 **/
class AttendEditPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showClient:false,
            showConfirm:false,
            showDelConfirm:false,
            isImageChange:false,
            loaded:false,
            clients:[],
            positioned:false,
            longitude:"",
            latitude:"",
            location:"",
            content:"",
            shareable:"1",
            syncServRecord:false,
            imgs:[],
            startTime:"",
            posState:0,             // 0-开始定位；1-定位成功；2-定位失败
            showServThemeSelect:false
        }
    }

    //获取页面名称
    getPageName(){ return "首页_外勤打卡编辑页面"; }

    componentWillMount(){
        var {id} = this.props.params;
        if(!id){
            this.setState({startTime:this.renderDateTime(),loaded:true});
        }
    }

    servTypeClick = ()=>{
        this.setState({showServThemeSelect:true});
    }
    closeServType =()=>{
        this.setState({showServThemeSelect:false});
    }
    componentDidMount(){
        var {id} = this.props.params;
        if(id){
            this.props.getContent({visitId:id}, this, this.updateUI);
        }
        super.componentDidMount();
    }

    updateUI = (data)=>{
        var {clients,positioned,longitude,latitude,content,startTime,imgs=[],location,shareable,syncServRecord,servThemeId,servThemeName} = data,
            posState = positioned?"1":"0";
        this.setState({clients,positioned,longitude,latitude,content,imgs,startTime,loaded:true,location,shareable,syncServRecord,servThemeId,servThemeName});
    }

    //格式化时间
    renderDateTime(){
        var date = new Date(),
            month = date.getMonth()+1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes();

        month = month<10?"0"+month:month;
        day = day<10?"0"+day:day;
        hour = hour<10?"0"+hour:hour;
        minute = minute<10?"0"+minute:minute;

        return month+"-"+day+" "+hour+":"+minute;
    }

    //渲染拜访客户
    renderRalatedClient(){
        var {clients} = this.state;

        if(clients.length == 0) return null;

        return clients.map((item)=>{
            var {clientName} = item;
            return <span>{clientName}</span>;
        });
    }

    //显示删除确认框
    showDelDialog = ()=>{
        this.setState({showDelConfirm:true});
    }

    //隐藏删除确认框
    hideDelDialog = ()=>{
        this.setState({showDelConfirm:false});
    }

    //显示名下客户
    showMyClient = ()=>{
        this.setState({showClient:true});
    }

    //关闭名下客户
    closeMyClient = ()=>{
        this.setState({showClient:false});
    }

    //删除草稿
    delDraft = ()=>{
        var {id} = this.props.params;
        this.props.deleteDraft({visitId:id},this, this.delDraftCb);
    }

    //删除草稿回调
    delDraftCb = ()=>{
        var {id, address} = this.props.params;

        if(address == 2){
            Cache.setValue("showAttendList", true)
            hashHistory.push(`/work/home/attend/statistics`)
        }else{
            Event.fire(ATTEND_REFRESH_ATTENDLIST);
            Event.fire(ATTEND_REFRESH_STATSTICBAR);
            hashHistory.goBack();

        }
    }

    //保存草稿
    saveDraft = ()=>{
        var {positioned} = this.state;
        if(positioned){
            this.attendSubmit("0");
        }
        else{
            this.props.warn("定位后才能保存草稿");
        }
    }

    //点击完成
    submit = ()=>{

        var {content, positioned,syncServRecord,servThemeId,servThemeName,servthemeId} = this.state;
          if(syncServRecord && !servThemeId){
            this.props.warn("请选择服务主题");
            return;
          }

        if(!positioned){
            this.props.warn("定位后才能提交");
            return;
        }
        if(!content){
            this.props.warn("请输入拜访信息");
            return;
        }

        this.attendSubmit("1");
    }

    //获取拜访客户数组
    renderClientParam(clients){
        return clients.map((item)=>{
            let {clientType, clientId, potentialId} = item;
            if(clientType == 2){
                return potentialId+"|2";
            }else{
                return clientId+"|1";
            }
        });
    }

    //提交草稿或正文
    attendSubmit(type){
        var imgArr = [],
            {id} = this.props.params,
            {content, positioned, longitude, latitude, location, imgs, clients, shareable, syncServRecord,servThemeId} = this.state,
            params = {
                positioned:(positioned?"1":"0"),
                longitude,
                latitude,
                location,
                content,
                shareable,
                syncServRecord:syncServRecord?"1":"0",
                servThemeId,
                clients:this.renderClientParam(clients).join(","),
                type
            };

        if(id) params.visitId = id;

        for(var i=0;i<imgs.length;i++){
            var {attachmentId,url} = imgs[i];
            if(attachmentId==""){
                imgArr.push(url);
            }
        }

        this.props.attendSubmit(params, imgArr, this, this.submitCb);
    }

    //完成回调
    submitCb = ()=>{
        var {id, address} = this.props.params;
        if(address == 2){
            Cache.setValue("showAttendList", true)
            hashHistory.push(`/work/home/attend/statistics`)
        }else{
            Event.fire(ATTEND_REFRESH_ATTENDLIST);
            hashHistory.goBack();

        }
    }

    renderIcon(){
        return [
            <span className={styles.pattern} onClick={this.submit}>提交</span>
        ];
    }

    //图片列表改变
    imageChange = (imgs)=>{
        this.setState({imgs,isImageChange:true});
    }

    //拜访描述改变
    textChange = (content)=>{
        this.setState({content});
    }

    //定位成功
    posSucc = (longitude, latitude, location)=>{
        this.setState({
            positioned:true,
            longitude,
            latitude,
            location,
            posState:1
        })
    }

    //定位失败
    posErr = (errorMsg)=>{
        this.setState({
            positioned:false,
            longitude:"",
            latitude:"",
            location:"",
            posState:2
        })
    }

    //重新定位
    rePos = ()=>{
        this.setState({
            positioned:false,
            longitude:"",
            latitude:"",
            location:"",
            posState:0
        });
    }

    //客户选择
    clientSelect = (selectArr)=>{
        var {syncServRecord} = this.state;
        this.setState({
            clients:selectArr,
            showClient:false,
            syncServRecord:selectArr.length?true:false
        });
    }

    backClick = ()=>{
        this.setState({showConfirm:true});
    }

    //不保存为草稿
    notSave = ()=>{
        var {id, address} = this.props.params,
            {isImageChange} = this.state;
        if(isImageChange && id){
            Event.fire(ATTEND_REFRESH_ATTENDLIST);
        }
        if(address == 2){
            Cache.setValue("showAttendList", true)
            hashHistory.push(`/work/home/attend/statistics`)
        }else{
            hashHistory.goBack();
        }
    }

    //可见范围修改
    scopeChange = (shareable)=>{
        this.setState({shareable});
    }

    //是否同步到服务记录
    syncChange = (syncServRecord)=>{
        this.setState({syncServRecord});
    }
    themeSelect = (servThemeId, servThemeName)=>{
        this.setState({servThemeId, servThemeName,showServThemeSelect:false});
    }
    render() {
        systemApi.log("AttendEditPage render");

        var {id} = this.props.params,
            headerName = id?"编辑奋斗足迹":"印上奋斗足迹",
            {
                showClient, shareable, syncServRecord, startTime, content, imgs, longitude, latitude, location,
                posState, showConfirm, positioned, loaded, clients, showDelConfirm,showServThemeSelect,servThemeId, servThemeName
            } = this.state;

        posState = positioned?"1":posState;

        return (
            <FullScreenView>
                <AppHeader headerName={headerName} iconRight={this.renderIcon()} onBackClick={this.backClick}/>
                <Content>
                    {loaded?(<CurrentPosition posState={posState} needPos={!positioned} dateTime={startTime} longitude={longitude} latitude={latitude} addressName={location} onRepos={this.rePos} onSuccess={this.posSucc} onError={this.posErr}/>):null}
                    <AttendInfoEdit servTypeClick={this.servTypeClick}
                        close={this.closeServType} imgs={imgs} value={content}
                        scope={shareable} sync={syncServRecord}
                        disabledSync={false} hasClient={!!clients.length}
                        servThemeId={servThemeId}  servThemeName={servThemeName}
                        onImageChange={this.imageChange} onTextChange={this.textChange}
                        onScopeChange={this.scopeChange} onSyncChange={this.syncChange}/>
                    <div className="blank"></div>
                    <div className={styles.atten_cust} onClick={this.showMyClient}>
                        <i className={styles.footprint}></i>
                        <span className={styles.mid}>拜访客户</span>
                        <span className={styles.arrow}></span>
                    </div>
                    <div className={styles.choose_cust}>{this.renderRalatedClient()}</div>
                </Content>
                <div className={styles.bottom_btn_draft}>
                    {id?(
                        <span className={styles.btn_delete_draft} onClick={this.showDelDialog}>删除草稿</span>
                    ):[
                        positioned?(<DraftTip/>):null,
                        <span className={styles.btn_save_draft} onClick={this.saveDraft}>保存为草稿</span>
                    ]}
                </div>
                {showClient?(
                    <MyClient onSelect={this.clientSelect} clients={clients.slice(0)} onClose={this.closeMyClient}/>
                ):null}
                {showConfirm?(
                    <ConfirmDialog title="保存草稿" text="是否要保存草稿?" confirmText="是" cancelText="否" onSubmit={this.saveDraft} onCancel={this.notSave}/>
                ):null}
                {showDelConfirm?(
                    <ConfirmDialog title="删除草稿" text="是否要删除草稿?" confirmText="是" cancelText="否" onSubmit={this.delDraft} onCancel={this.hideDelDialog}/>
                ):null}
                {showServThemeSelect?(
                    <ServThemeSelect onClose={this.closeServType} onSelect={this.themeSelect}/>
                ):null}
                {this.props.children}
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {getContent, deleteDraft,attendSubmit, warn};
}

module.exports = connect(null, injectAction())(AttendEditPage);
