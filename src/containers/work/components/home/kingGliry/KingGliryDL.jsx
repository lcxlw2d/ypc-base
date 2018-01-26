import styles from '../../css/home/kingGlory/kingGliryDL.css';
class KingGliryDL extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            showIcon: true
        }
    }
    componentDidMount() {
        let isOneKGDL = systemApi.getValue("isOne_WZRY_DL") || 0;
        if(isOneKGDL){
            this.setState({show: false})
        }
    }

    //关闭提示页面·
    close = () => {
        this.setState({show: false})
        systemApi.setValue("isOne_WZRY_DL", 1)
    }

    //跳转王者荣耀
    look = () => {
        this.setState({show: false})
        hashHistory.push("/work/home/kingGlory")
        systemApi.setValue("isOne_WZRY_DL", 1)
    }

    lookTo = () => {
        hashHistory.push("/work/home/kingGlory")
    }

    render() {
        systemApi.log("kingGliryDL render");
        let {show, showIcon} = this.state;
        return (
            <div>
                {show
                    ? <div className={styles.ecard_popup}>
                            <div className={styles.wzry_login}>
                                <div className={styles.wzry_lg_innerbox}>
                                    <div className={styles.wzry_close} onClick={this.close}></div>
                                    <div className={styles.wzry_look} onClick={this.look}></div>
                                </div>
                            </div>
                        </div>
                    : null}
                {showIcon?<div className={styles.wzry_icon} onClick={this.lookTo}></div>:null}
            </div>
        )
    }
}

module.exports = KingGliryDL;
