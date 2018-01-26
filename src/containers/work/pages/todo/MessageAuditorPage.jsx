import {connect} from 'react-redux';
import {msgApprove, getMessageAuditor} from '../../actions/todo/todoAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import BottomTabs from '../../../../components/common/bottomtabs/BottomTabs';
import TabFlat from '../../../../components/common/bottomtabs/TabFlat';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import MessageList from '../../components/todo/auditor/MessageList';

import styles from '../css/todo/detailApprovePage.css';

/** 待办-审批页面 **/
class MessageAuditorPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {done} = this.props.params;
        this.state = {
            done,
            closeConfirm:false,
            detail:{},
            inputReason:"",
            showPhoneList:false,
            loaded:false
        }
    }

    //获取页面名称
    getPageName() {
        return "待办_短信审批审批详情";
    }

    componentDidMount() {
        var {id} = this.props.params;
        this.props.getMessageAuditor(this, {procInstId:id}, this.update);
        super.componentDidMount();
    }

    update = (detail)=>{
        this.setState({detail, loaded:true});
    }

    //接受审批
    approveClick = () => {
        var {detail, inputReason} = this.state,
            {procInstId} = detail;
        if(inputReason==""){
            inputReason="审批通过";
        }
        this.props.msgApprove(this,{
            procInstId,
            status:"1",
            auditReason:inputReason
        });
    }

    //拒绝审批
    rejectClick = () => {
        this.setState({closeConfirm:true});
    }

    outCancel = ()=>{
        this.setState({closeConfirm:false});
    }

    //退出确认
    outSubmit = ()=>{
        this.setState({closeConfirm:false});
        var {detail, inputReason} = this.state,
            {procInstId} = detail;
        if(inputReason==""){
            inputReason="审批不通过";
        }
        this.props.msgApprove(this,{
            procInstId,
            status:"0",
            auditReason:inputReason
        });
    }

    reasonChange = (e)=>{
        var {value} = e.target;
        this.setState({inputReason:value});
    }

    phoneClick = ()=>{
        this.setState({showPhoneList:true});
    }

    closeList = ()=>{
        this.setState({showPhoneList:false});
    }

    render() {
        systemApi.log("MessageAuditorPage render");

        var {done, detail, inputReason, closeConfirm, showPhoneList, loaded} = this.state,
            {procInstId, sendUser, sendTime, validSmsNumbers, smsContent, auditUser, auditReason, sendDestination, sendClientDescription, auditTime, auditStatus, batchId, organizationName} = detail;

        return (
            <FullScreenView>
                <AppHeader headerName={done=="1"?"已办审批":"待办审批"} backHash="/work/todo"/>
                <Content withHeader={true} withBottom={done=="1"?true:false}>
                    <div className={styles.approve_title}>
                        {done=="1"&&loaded?<div className={this.mergeClassName(styles.statusIcon, auditStatus=="1"?styles.succ:styles.fail)}></div>:null}
                        <h3 className={styles.approve_padding}>短信发送审批</h3>
                        <p className={styles.approve_padding}><span className={styles.approve_font_strong}>申请人: </span><span>{sendUser}</span><span className={styles.field}>{organizationName}</span></p>
                        <p className={styles.approve_padding}><span className={styles.approve_font_strong}>申请时间: </span><span>{sendTime}</span></p>
                    </div>
                    <div className={styles.approve_detail}>
                        <span className={styles.btnlist} onClick={this.phoneClick}>查看列表</span>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>发送数: </span><span className={Color.blue}>{validSmsNumbers}</span></p>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>信息类型: </span><span>短信</span></p>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>目标客户: </span><span>{sendClientDescription}</span></p>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>发送目的: </span><span>{sendDestination}</span></p>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>消息内容: </span></p>
                        <p className={styles.approve_detail_text}>{smsContent}</p>
                    </div>

                    {done=="1"?(
                        <div className={styles.approve_reason_input}>
                           <p className={styles.approve_detail_padding}><span class="font_strong">审批人: </span><span>{auditUser}</span></p>
                           <p className={styles.approve_detail_padding}><span class="font_strong">最后审批时间: </span><span>{auditTime}</span></p>
                           <p className={styles.approve_detail_padding}><span class="font_strong">审批理由: </span></p>
                           <p className={styles.approve_detail_text}>{auditReason}</p>
                        </div>
                    ):(
                        <div className={styles.approve_reason_title}>
                            <h3 className={styles.approve_padding}>审批理由：</h3>
                            <textarea className={styles.approve_reason_enter} placeholder="输入审批理由" value={inputReason} onChange={this.reasonChange}></textarea>
                        </div>
                    )}
                </Content>
                {done=="0"?(
                    <BottomTabs theme="white">
                        <TabFlat text="审批不通过" onClick={this.rejectClick}/>
                        <TabFlat theme="blue" text="审批通过" onClick={this.approveClick}/>
                    </BottomTabs>
                ):null}
                {closeConfirm?(<ConfirmDialog title="审批不通过" text="此条审批确定不通过？" onCancel={this.outCancel} onSubmit={this.outSubmit}/>):null}
                {showPhoneList?(<MessageList batchId={batchId} onClose={this.closeList}/>):null}
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {msgApprove, getMessageAuditor};
}

module.exports = connect(null, injectAction())(MessageAuditorPage);
