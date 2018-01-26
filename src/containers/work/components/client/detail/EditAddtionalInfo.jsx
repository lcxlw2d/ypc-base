import {connect} from 'react-redux';
import {saveAddtionalInfo} from '../../../actions/client/summary/summaryAction';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../../components/common/appheader/AppHeader';

import styles from '../../css/client/detail/editAddtionalInfo.css';

const MAX_SIZE = 128;

class EditAddtionalInfo extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //保存备注
    mark = ()=>{
        var addInfo=this.refs.addtionalInfo.value,
            clienid=this.props.clientId;
        this.props.saveAddtionalInfo(addInfo,clienid,()=>{
            this.props.saveFn(addInfo);
        }, this);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("EditAddtionalInfo render");

        var {closeFn,addtionalInfo} = this.props;

        return (
            <FullScreenView >
                <AppHeader headerName="编辑附加信息" onBackClick={closeFn} theme="red" />
                <Content>
                    <div className={styles.edit_postscript}>
                        <div className={styles.pos_innerbox}>
                            <textarea maxLength={MAX_SIZE} ref="addtionalInfo" >{addtionalInfo}</textarea>
                            <div className={styles.byte}>最多可输入<span className={Color.red}>128</span>个字</div>
                        </div>
                    </div>
                    <div className={styles.pd10_2}>
                        <div className={this.mergeClassName(styles.lg_div, styles.lg_btn)}>
                            <div className={styles.lg_text} onClick={this.mark}>
                                <input type="button" value="保 存"/>
                            </div>
                        </div>
                    </div>
                </Content>
            </FullScreenView>
        );
    }
}
function injectAction() {
    return {saveAddtionalInfo};
}
function injectProps(state){
    var {client={}} = state.base || {},
        {clientId} = client;
    return {clientId};
}
module.exports = connect(injectProps, injectAction())(EditAddtionalInfo);
