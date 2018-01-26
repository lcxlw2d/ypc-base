import styles from '../../css/home/mustsee/alert.css';

class Alert extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }
    abolished=()=>{
        this.props.abolished()
    }
    affirm=()=>{
        this.props.affirm()
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Alert render");
        return (
              <div className={styles.ecard_popup}>
                <div className={styles.ecard_box_01}>
                    <div className={styles.pp_top}>该客户将屏蔽打新提醒</div>
                    <div className={styles.pp_center}>
                        <span>确定屏蔽客户</span>
                        <p>（可在列表下方再次开启）</p>
                    </div>
                    <div className={styles.pp_btns}>
                        <span className={styles.btn_pp_cancel} onClick={this.abolished}>取消</span>
                        <span className={styles.btn_pp_ok} onClick={this.affirm}>确定</span>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = Alert;
