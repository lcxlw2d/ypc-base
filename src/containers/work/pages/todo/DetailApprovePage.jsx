import {connect} from 'react-redux';
import {approve} from '../../actions/todo/todoAction';
import {gotoDetail,FROM_TODO_DETAIL_PAGE} from '../../../../store/actions';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import BottomTabs from '../../../../components/common/bottomtabs/BottomTabs';
import TabFlat from '../../../../components/common/bottomtabs/TabFlat';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';

import styles from '../css/todo/detailApprovePage.css';

/** 待办-审批 **/
class DetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {done} = this.props.params;
        var time = null;
        this.state = this.props.location.state;
        this.state.closeConfirm = false;
    }

    //获取页面名称
    getPageName() {
        return "待办_详情";
    }

    componentDidMount() {
        super.componentDidMount();
    }

    //接受审批
    approveClick = () => {
        var {id,remindId} = this.state;
        var auditReason = this.refs.approve_reason.value;
        if(auditReason==""){
          auditReason="审批通过";
        }
        this.props.approve(id,remindId,auditReason,'5',this,()=>{});
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

        var {id,remindId} = this.state;
        var auditReason = this.refs.approve_reason.value;
        if(auditReason==""){
          auditReason="审批不通过";
        }
        this.props.approve(id,remindId,auditReason,'6',this,()=>{});
    }

    render() {
        systemApi.log("DetailPage render");
        var contentCls = this.mergeClassName("g_content", styles.bk), {
                remindTitle,//标题
                remindTypename,//审批类型
                user_name,//申请者
                remindTime,//申请时间
                modularName,//菜单名称
                exportReason,//导出理由
                expCount,//记录数
                expColum,//导出字段
                closeConfirm
            } = this.state;

        return (
            <FullScreenView>
                  <AppHeader headerName="待办审批" backHash="/work/todo"/>
                  <div className={styles.approve_content}>
                      <div className={styles.approve_title}>
                            <h3 className={styles.approve_padding}>{remindTitle}</h3>
                            <p className={styles.approve_padding}><span className={styles.approve_font_strong}>操作类型: </span><span>{remindTypename}</span></p>
                            <p className={styles.approve_padding}><span className={styles.approve_font_strong}>申请人: </span><span>{user_name}</span></p>
                            <p className={styles.approve_padding}><span className={styles.approve_font_strong}>申请时间: </span><span>{remindTime}</span></p>
                      </div>
                      <div className={styles.approve_detail}>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>菜单名称: </span><span>{modularName}</span></p>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>导出理由: </span></p>
                        <p className={styles.approve_detail_text}>{exportReason}</p>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>记录数: </span><span>{expCount}</span></p>
                        <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>导出字段: </span></p>
                        <p className={styles.approve_detail_text}>{expColum}</p>
                      </div>

                      <div className={styles.approve_reason_title}>
                        <h3 className={styles.approve_padding}>审批理由：</h3>
                        <textarea className={styles.approve_reason_enter} placeholder="输入审批理由" ref="approve_reason"></textarea>
                      </div>
                </div>
                <BottomTabs theme="white">
                    <TabFlat text="审批不通过" onClick={this.rejectClick}/>
                    <TabFlat theme="blue" text="审批通过" onClick={this.approveClick}/>
                </BottomTabs>
                {closeConfirm?(<ConfirmDialog title="审批不通过" text="此条审批确定不通过？" onCancel={this.outCancel} onSubmit={this.outSubmit}/>):null}
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {approve};
}

module.exports = connect(null, injectAction())(DetailPage);
