import { connect } from 'react-redux';
import {closeTip} from '../actions/loginAction';
import FullScreenView from '../../../components/fullscreen/FullScreenView';
import styles from './css/showTip.css';

class ShowTip extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }
    clickTip= ()=> {
        this.props.closeTip();
    }
    
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ShowTip render");
        var {message} = this.props;
        return (
            <FullScreenView >
                <div className={styles.viewport_new}>
                    <div className={styles.logintipbox}>
                        <div className={styles.lg_tipbox}>
                            <div className={styles.tb_top}>
                                <div className={styles.tbinnerbox}>
                                    <h3  className={Color.red}>温馨提示</h3>
                                    <div dangerouslySetInnerHTML={{__html: message}} />
                                </div>
                            </div>
                            <div className={styles.tb_bot}></div>
                        </div>
                        <div className={styles.lg_tipbtn} onClick={this.clickTip}>好的，朕知道了</div>
                        <div className={styles.lg_tipbg}></div>
                    </div>
                </div>

            </FullScreenView>
        );
    }

}
function injectProps(state){
    var {message} = state.login || {};

    return {message};
}

function injectAction(){

    return{ closeTip };

}

// module.exports = connect(injectProps, injectAction())(ShowTip);
export default connect(injectProps, injectAction())(ShowTip);
