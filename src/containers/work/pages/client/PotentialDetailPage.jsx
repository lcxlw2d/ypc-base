import {connect} from 'react-redux';
import AppHeader from './../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Alert from '../../../../components/common/popup/Alert';
import DetailFirst from '../../components/client/potential/DetailFirst';
import DetailXiu from '../../components/client/potential/DetailXiu';
import {gotoDetail, FROM_POTENTIALDETAIL_PAGE, recordJumpService} from '../../../../store/actions';
import {getPotentialDetail, callTel, setPotentialClient, deletePotentialClient, regularPotentialClient,  updatePotentialList} from './../../actions/client/Potential/PotentialAction';
import { saveBaseInfo } from '../../actions/client/summary/summaryAction';
import styles from './css/AddPotentialPage.css';

class PotentialDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {},
            show: false,
            variable:false
        }
    }

    getPageName(){ return "客户_潜在客户详情"; }

    componentDidMount() {
        super.componentDidMount()
        this.getPotentialDetail()
    }

      //返回上一层
    onBackClick = () => {
        let {
            from = ''
        } = this.props, {show, variable=false} = this.state;
        if(!show){
            if (from != '') {
                hashHistory.push(from)
            } else {
                hashHistory.push("/work/client")
                variable&&Event.fire('potentialList_getData', this.getData)
            }
        }else{
            this.setState({showAlert:true})
        }
        this.props.saveBaseInfo('')
    }

    submitOut = () => {
        this.hideAlert()
            let {
                from = ''
            } = this.props, {show} = this.state;
        if(show){
            this.setState({show:false})
            return
        }
        if (from != '') {
            hashHistory.push(from)
        } else {
            hashHistory.push("/work/client")
        }
    }

    //关闭页面提示框
    hideAlert = () => {
        this.setState({showAlert:false})
    }

    //获取详情信息
    getPotentialDetail = () => {
        let {potentialId} = this.props.params;
        // if(potentialId==''){
        //     potentialId = potentialIdTwo;
        // }
        this
            .props
            .getPotentialDetail(this, {
                potentialId
            }, this.PotentialDetailsucc);
    }

    PotentialDetailsucc = data => {
       this.setState({data}, () => { this.props.saveBaseInfo(this.state.data.mobileTel) })
    }

    //拨打电话
    callFunc = () => {
        var {
                mobileTel,
                clientName = '',
                clientId = '',
                potentialId = ''
            } = this.state.data,
            systemType = systemApi.getValue("systemType");

            this.props.callTel(mobileTel, systemType, clientName, clientId, potentialId, this.succ);
    }

    succ = blen => {
        let {potentialId} = this.props.params;
        if (blen) {
            systemApi.setValue("recordpage", 1);
            hashHistory.push("/work/client/record/" + potentialId)
        }
    }

    //渲染右上角图标
    renderRightIcon = () => {
        let child = [], {show} = this.state;
        if (show) {
            child.push(
                <a onClick={this.hideModify} className={styles.head_right_text}>完成</a>
            )
        } else {
            child.push(
                <a onClick={this.showModify} className={styles.head_right_text}>编辑</a>
            )

        }

        return child
    }

    //右上角点击进入修改页面
    showModify = () => {
        this.setState({show: true});
    }

    //关闭修改页面
    hideModify = () => {
        let { nameValue, telValue, index } = this.refXiu.getWrappedInstance().state, {mobileTelShow='', clientName='', clientSex} = this.state.data;
        if((nameValue == '' && telValue == '' && index ==clientSex) || (nameValue ==clientName && telValue == mobileTelShow && index ==clientSex)){

            this.setState({show: false});
        }else{

            // this.showConfirmDialog()
            this.submit();
        }
    }

    //关闭页面前确认对话框开启
    showConfirmDialog = () => {
        this.refXiu.getWrappedInstance().showConfirmDialog()
    }
    //关闭页面前确认对话框关闭
    hideConfirmDialog = () => {
        this.refXiu.getWrappedInstance().hideConfirmDialog()
        this.setState({show: false})
    }

    //确认修改
    submit = () => {
        let { nameValue, telValue, index } = this.refXiu.getWrappedInstance().state, {potentialId, mobileTel, mobileTelShow='', clientName='', clientSex} = this.state.data, params = {potentialId};
        telValue = telValue.trim();
        this.refXiu.getWrappedInstance().nameTipShow();
        this.refXiu.getWrappedInstance().telTipShow();
        if(!this.refXiu.getWrappedInstance().nameTipShow()&&!this.refXiu.getWrappedInstance().telTipShow()){
            params['clientName'] = nameValue;
            params['clientSex'] = index;
            telValue != mobileTelShow?params['mobileTel'] = telValue :params['mobileTel'] = mobileTel;
            this.props.setPotentialClient(this, params, () => { this.hideConfirmDialog();this.setState({variable:true}); this.getPotentialDetail() })
        }
    }
    //转正
    regularPotentialClient = (component, params, cb) => {
        this.props.regularPotentialClient(component, params, () => { cb&&cb();this.setState({show:false, variable:true});this.getPotentialDetail(); })

    }

    //删除
    deletePotentialClient = (component, params, cb) => {

        this.props.deletePotentialClient(component, params, () => { cb&&cb();this.setState({show:false}) })
    }



    //跳转正式客户全景图
    goToDetail = () => {
        var {potentialId} = this.props.params, {clientId}=this.state.data;
        this
            .props
            .gotoDetail(clientId, FROM_POTENTIALDETAIL_PAGE, {potentialId})
    }

    //跳转新增服务记录
    goToService = () => {
        let {clientId, clientName, mobileTel, fundAccount, potentialId, isPositive} = this.state.data, toPath='/work/client/addPotential/add';
        if(isPositive=='1'){
            toPath = '/work/client/addPotential/add';
        }
        this
        .props
        .recordJumpService('/work/client/potentialDetail/'+potentialId, {
            clientId:'',
            potentialId,
            clientType:2,
            clientName,
            fundAccount,
        }, toPath)

    }

    //显示性别
    showSex = sex => {
        if (sex == 0) {
            return "男"
        } else if (sex == 1) {
            return "女"
        } else if (sex == 2) {
            return "机构"
        } else {
            return "男"
        }
    }

    //设置ref
    refSet = ref => { this.refXiu = ref }

    render() {
        systemApi.log("PotentialDetailPage render");

        let{show, showAlert, data}=this.state, {
            clientName = '',
            clientSex,
            mobileTel,
            mobileTelShow = '',
            owner=0,
            organizationName,
            isPositive,
            fundAccount,
            totalAsset,
            opendate,
        } = data,
        {potentialId} = this.props.params,
        sex = clientSex;
        clientSex = this.showSex(clientSex);

        return (
            <FullScreenView>
                <AppHeader
                    headerName="潜在客户详情"
                    onBackClick={this.onBackClick}
                    iconRight={owner==1?this.renderRightIcon():null}/>
                {!show?<DetailFirst
                    callFunc={this.callFunc}
                    goToDetail={this.goToDetail}
                    goToService={this.goToService}
                    potentialId={potentialId}
                    clientName={clientName}
                    clientSex={clientSex}
                    mobileTel={mobileTel}
                    mobileTelShow={mobileTelShow}
                    owner={owner}
                    organizationName={organizationName}
                    isPositive={isPositive}
                    fundAccount={fundAccount}
                    totalAsset={totalAsset}
                    opendate={opendate}/>:<DetailXiu isPositive={isPositive} fundAccount={fundAccount} sex={sex}  deletePotentialClient={this.deletePotentialClient } regularPotentialClient={this.regularPotentialClient} potentialId={potentialId} submit={this.submit} ref={this.refSet} clientName={clientName} mobileTelShow={mobileTelShow} branchName={organizationName}/>}
                    {showAlert?<Alert title = '返回确认' text='是否放弃所有修改?' style={{ zIndex:10000 }} onLeft={this.hideAlert} onRight = {this.submitOut}/>:null}
            </FullScreenView>
        )
    }

}
function injectProps(state) {
    var {from, potentialId} = state.potential || {},
    {client = {}} = state.base || {},
    {potentialIdTwo} = client;
    return {from, potentialIdTwo};
}

function injectAction() {
    return {gotoDetail, getPotentialDetail, callTel, setPotentialClient, recordJumpService, deletePotentialClient, regularPotentialClient, updatePotentialList, saveBaseInfo};
}

module.exports = connect(injectProps, injectAction())(PotentialDetailPage);
