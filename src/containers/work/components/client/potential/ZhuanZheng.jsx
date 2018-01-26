import styles from '../../../../work/pages/client/css/AddPotentialPage.css';

class zhuanzheng extends PureComponent {

    //默认属性值
    static defaultProps = {};

    //构造函数
    constructor(props, context) {
        super(props, context);
        //默认状态
        this.state = {}
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("zhuanzheng render");

        return (
            <div className={styles.ecard_popup}>
                <div className={styles.ecard_box}>
                    <div className={styles.pp_top}>转正确认</div>
                    <div className={styles.pp_mid}>
                        <p className={this.mergeClassName(styles.pp_text, styles.text_left)}>请输入转正资金账号</p>
                        <p><input type="text" className={styles.text_password} onChange={this.props.Change} value={this.props.TurnValue} placeholder=""/></p>
                    </div>
                    <div className={styles.pp_btns}>
                        <a className={styles.btn_pp_cancel} onClick={this.props.cancelTurn}>取消</a>
                        <a className={styles.btn_pp_ok} onClick={this.props.TurnYes}>确定</a>
                    </div>
                </div>
                <div className={styles.ecard_layer}></div>
            </div>
        );
    }

}

module.exports = zhuanzheng;
