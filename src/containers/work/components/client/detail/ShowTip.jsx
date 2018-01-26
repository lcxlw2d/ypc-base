import {connect} from 'react-redux';
import {closeTip} from '../../../actions/client/summary/summaryAction';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import styles from '../../css/client/detail/showTip.css';

class ShowTip extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }
    clickTip() {
        this.props.closeTip();
    }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ShowTip render");
        var {title,content} = this.props;

        return (
            <FullScreenView transparent={true}>

                <div className={styles.ecard_popup} onClick={this.props.closeFn}>
                    <div className={styles.ecard_box + " " + styles.nobg}>
                        <div className={styles.pp_mid}>
                            <div className={styles.zcbox}>
                                <h2 className={Color.red}>{title}</h2>
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ecard_layer}></div>
                </div>
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {closeTip};
}
function injectProps(state) {
    var {showTip} = state.client || {};
    return {showTip};
}
module.exports = connect(injectProps, injectAction())(ShowTip);
