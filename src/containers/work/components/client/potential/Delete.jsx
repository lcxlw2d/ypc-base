import styles from '../../../../work/pages/client/css/AddPotentialPage.css';

class Delete extends PureComponent {

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
        systemApi.log("Delete render");

        return (
            <div className={styles.ecard_popup}>
                <div className={styles.ecard_box}>
                    <div className={styles.pp_top}>删除确认</div>
                    <div className={styles.pp_mid}>
                        <p className={styles.pp_text}>确定删除该潜在客户？数据删除后不可恢复！</p>

                    </div>
                    <div className={styles.pp_btns}>
                        <a className={styles.btn_pp_cancel} onClick={this.props.cancelDelete}>取消</a>
                        <a className={styles.btn_pp_ok} onClick={this.props.DeleteYes}>确定</a>
                    </div>
                </div>
                <div className={styles.ecard_layer}></div>
            </div>
        );
    }

}

module.exports = Delete;
