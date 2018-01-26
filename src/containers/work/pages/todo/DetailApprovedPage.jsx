import {connect} from 'react-redux';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from '../css/todo/detailApprovePage.css';

/** 已办-审批 **/
class DetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);

        var {done} = this.props.params;
        var time = null;
        this.state = this.props.location.state;
    }

    //获取页面名称
    getPageName() {
        return "已办审批";
    }

    componentDidMount() {
        super.componentDidMount();
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
                auditNames,//审批人
                exportStatus,//审批结果
                validTime,//最后审批时间
                auditReason//审批理由
            } = this.state;

        return (
            <FullScreenView>
              <AppHeader headerName="已办审批" backHash="/work/todo"/>
              <div className={styles.approve_content}>
                <div className={styles.approve_title}>
                    <div className={styles.approve_title_left}>
                      <h3 className={styles.approve_padding}>{remindTitle}</h3>
                      <p className={styles.approve_padding}><span className={styles.approve_font_strong}>操作类型: </span><span>{remindTypename}</span></p>
                      <p className={styles.approve_padding}><span className={styles.approve_font_strong}>申请人: </span><span>{user_name}</span></p>
                      <p className={styles.approve_padding}><span className={styles.approve_font_strong}>申请时间: </span><span>{remindTime}</span></p>
                    </div>
                    <div className={exportStatus==5?styles.approve_icon_pass:styles.approve_icon_fail}></div>
                </div>

                <div className={styles.approve_detail}>
                    <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>菜单名称: </span><span>{modularName}</span></p>
                    <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>导出理由: </span></p>
                    <p className={styles.approve_detail_text}>{exportReason}</p>
                    <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>记录数: </span><span>{expCount}</span></p>
                    <p className={styles.approve_detail_padding}><span className={styles.approve_font_strong}>导出字段: </span></p>
                    <p className={styles.approve_detail_text}>{expColum}</p>
                </div>
                <div className={styles.approve_reason_input}>
                   <p className={styles.approve_detail_padding}><span class="font_strong">审批人: </span><span>{auditNames}</span></p>
                   <p className={styles.approve_detail_padding}><span class="font_strong">最后审批时间: </span><span>{validTime}</span></p>
                   <p className={styles.approve_detail_padding}><span class="font_strong">审批理由: </span></p>
                   <p className={styles.approve_detail_text}>{auditReason}</p>
                </div>
              </div>
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(DetailPage);
