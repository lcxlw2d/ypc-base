import {connect} from 'react-redux';
import {deleteDraft, getContent, attendSubmit} from '../../actions/home/attend/edit/editAction';
import {ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../actions/home/attend/attendAction';
import {gotoDetail, FROM_ATTEND_DETAIL_PAGE} from '../../../../store/actions';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import AttendDetailEdit from '../../components/home/attend/edit/AttendDetailEdit';
import AttendImage from '../../components/home/attend/edit/AttendImage';

import styles from '../css/home/attendDetailPage.css';

/** 首页-产品营销 **/
class AttendDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showEdit:false,
            showConfirm:false,
            isImageChange:false,
            userName:"",
            location:"",
            content:"",
            imgs:[],
            clients:[],
            startTime:"",
            positioned:false,
            longitude:"",
            latitude:"",
            shareable:"0",
            createUserImg:"-1",
            syncServRecord:false,
            owned:0,
            tmpContent:"",
            tmpImgs:[]
        };
    }

    //获取页面名称
    getPageName() {
        return "首页_外勤拜访_详情";
    }

    componentDidMount(){
        var {id} = this.props.params;
        this.props.getContent({visitId:id}, this, this.updateUI);
        super.componentDidMount();
    }

    updateUI = (data)=>{
        var {userName, location, content, imgs=[], clients, startTime, positioned, longitude, latitude, owned, shareable, syncServRecord, createUserImg, servThemeId,servThemeName} = data;
        this.setState({userName, location, content, imgs, clients, startTime, positioned, longitude, latitude, owned, shareable, syncServRecord, servThemeId,servThemeName, createUserImg, tmpContent:content, tmpImgs:imgs});
    }

    //点击编辑
    editClick = ()=>{
        this.setState({showEdit:true});
    }



    //渲染拜访图片
    renderImgs(imgs){
        return imgs.map((item)=>{
            var {url, urlSmall} = item;
            return (<AttendImage big={true} canDel={false} url={url} urlSmall={urlSmall} />);
        });
    }

     //渲染客户
     renderVisitor(clients){
        var {owned} = this.state;
        return clients.map((item)=>{
            var {clientId, clientName, potentialId, clientType} = item;
            return <span className={this.mergeClassName(styles.visitor, owned?Color.blue:"")} onClick={clientType==2?this.clientClick2(potentialId):this.clientClick(clientId)}>{item.clientName}</span>
        });
    }

    //点击客户
    clientClick = (clientId)=>()=>{
        var {id, address} = this.props.params,
            {owned} = this.state;
        if(owned){
            this.props.gotoDetail(clientId, FROM_ATTEND_DETAIL_PAGE, {attendId:id, address});
        }
    }

    //跳转潜在客户
    clientClick2 = (potentialId)=>(e)=>{
        var {owned, address} = this.props;
        if(owned){
            // this.props.gotoDetail(clientId,FROM_ATTEND_PAGE,{address});
            hashHistory.push("/work/client/potentialDetail/"+potentialId)
            e.stopPropagation();
        }
    }

    //编辑拜访描述
    textChange = (tmpContent)=>{
        this.setState({tmpContent})
    }

    //修改图片
    imgsChange = (tmpImgs)=>{
        var {imgs} = this.state;
        this.diffImgs(tmpImgs, imgs);
    }

    //可见范围改变
    scopeChange = (shareable)=>{
        this.setState({shareable});
    }

    //比较图片去掉删去的图片，正文在提交前只能删除照片
    diffImgs(tmpImgs, imgs){
        var newList = {},
            newImgs = [];
        for(var i=0;i<tmpImgs.length;i++){
            var {attachmentId} = tmpImgs[i];
            newList[attachmentId] = true;
        }
        for(var i=0;i<imgs.length;i++){
            var item = imgs[i],
                {attachmentId} = item;
            if(newList[attachmentId]){
                newImgs.push(item);
            }
        }
        this.setState({tmpImgs, imgs:newImgs, isImageChange:true});
    }

    closeEdit = ()=>{
        this.setState({showEdit:false});
    }

   //获取拜访客户数组
   renderClientParam(clients){
    return clients.map((item)=>{
    let { clientId, clientType, potentialId } = item;
        if(clientType==2){
            return potentialId+"|2";
        }else{
            return clientId+"|1";
        }
    })
}

    //编辑点击完成
    editSubmit = ()=>{
        var imgArr = [],
            {id} = this.props.params,
            {tmpContent, positioned, longitude, latitude, location, tmpImgs, clients, shareable, syncServRecord, servThemeId,servThemeName} = this.state,
            params = {
                positioned:(positioned?1:0),
                longitude,
                latitude,
                location,
                shareable,
                syncServRecord,
                servThemeId,
                servThemeName,
                content:tmpContent,
                clients:this.renderClientParam(clients).join(","),
                type:"1"
            };

        if(id) params.visitId = id;

        for(var i=0;i<tmpImgs.length;i++){
            var {attachmentId,url} = tmpImgs[i];
            if(attachmentId==""){
                imgArr.push(url);
            }
        }

        this.props.attendSubmit(params, imgArr, this, ()=>{
            Event.fire(ATTEND_REFRESH_ATTENDLIST);
            Event.fire(ATTEND_REFRESH_STATSTICBAR);
            this.setState({
                content:tmpContent,
                imgs:tmpImgs,
                showEdit:false
            })
        });
    }

    //点击删除
    delClick = ()=>{
        this.setState({showConfirm:true});
    }

    //关闭确认框
    closeConfirm = ()=>{
        this.setState({showConfirm:false});
    }

    //点击删除
    delAttend = ()=>{
        var {id} = this.props.params;
        this.props.deleteDraft({visitId:id}, this, ()=>{
            Event.fire(ATTEND_REFRESH_ATTENDLIST);
            hashHistory.goBack();
        });
    }

    //点击返回
    backClick = ()=>{
        var {isImageChange} = this.state, { address } = this.props.params;
        if(isImageChange){
            Event.fire(ATTEND_REFRESH_ATTENDLIST);
        }
        if(address == 1){
            hashHistory.push("/work/home/attend");
        }else if(address == 2){
            Cache.setValue("showAttendList", true)
            hashHistory.push("/work/home/attend/statistics");
        }
    }

    //是否同步服务记录
    syncChange = (syncServRecord)=>{
        this.setState({syncServRecord});
    }

    render() {
        systemApi.log("AttendDetailPage render");

        var {userName, location, content, imgs=[], clients, startTime, showEdit, showConfirm, tmpContent, tmpImgs, owned, shareable, syncServRecord, servThemeId,servThemeName, createUserImg} = this.state,
            userImg = createUserImg=="-1"?"./images/work/me/user_01.png":createUserImg;

        return (
            <FullScreenView>
                <AppHeader headerName="奋斗足迹详情" onBackClick={this.backClick}/>
                <Content>
                    <div className={styles.item}>
                        <div className={styles.attendance_user}>
                            <img src={userImg}/>
                        </div>
                        <div className={styles.attendance_intr}>
                            <p className={this.mergeClassName(Color.c6, Font.font13)}>
                                <span>{startTime}</span>
                                <span className={styles.ml5}>{location}</span>
                            </p>
                            <div className={styles.atten_innerbox}>
                            	<div className={styles.arrow_top}>
                                    <b className={styles.atten_innerbox_top}><i className={styles.top_arrow1}></i><i className={styles.top_arrow2}></i></b>
                                </div>
                                <h2><div className={Color.blue}>{userName}</div><div className={this.mergeClassName(Font.font15, styles.content)}>{content}</div></h2>
                                {imgs.length?(<p>{this.renderImgs(imgs)}</p>):null}
                                {clients.length?(<p><a className={styles.visit_cust}><i></i>{this.renderVisitor(clients)}</a></p>):null}
                            </div>
                        </div>
                    </div>
                    {owned?(
                        <div className={styles.hotnews_bot_btns}>
                            <div className={styles.bot_btn_left} onClick={this.editClick}><span>编辑</span></div>
                            <div className={styles.bot_btn_mid}></div>
                            <div className={styles.bot_btn_right} onClick={this.delClick}><span>删除</span></div>
                        </div>
                    ):null}
                </Content>
                {showEdit?(
                    <AttendDetailEdit value={tmpContent} imgs={tmpImgs} scope={shareable} sync={syncServRecord}
                     disabledSync={true} hasClient={!!clients.length} onTextChange={this.textChange}
                     onImageChange={this.imgsChange} onScopeChange={this.scopeChange} onSyncChange={this.syncChange}
                     servThemeId={servThemeId} servThemeName={servThemeName}
                     onSubmit={this.editSubmit} onClose={this.closeEdit}/>
                ):null}
                {showConfirm?(
                    <ConfirmDialog title="删除信息" text="是否删除该拜访信息？" subText="对应的服务记录同时会被删除" confirmText="是" cancelText="否" onCancel={this.closeConfirm} onSubmit={this.delAttend}/>
                ):null}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {deleteDraft, getContent, attendSubmit, gotoDetail};
}

module.exports = connect(null, injectAction())(AttendDetailPage);
