import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';

import styles from '../../css/me/adviceDialog.css';

class AdviceDialog extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AdviceDialog render");

        var {show, onClose} = this.props;

        return(
            <FullScreenView mask={true} show={show}>
                <div className={styles.complaint}>
                    <div className={styles.pp_mid}>
                        <p className={styles.pp_p02}>意见已提交！</p>
                    </div>
                    <div className={styles.pp_btns2}>
                        <a onClick={onClose}>好的，朕知道了</a>
                    </div>
                </div>
            </FullScreenView>
        );
    }

}

module.exports = AdviceDialog;
