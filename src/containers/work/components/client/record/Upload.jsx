import styles from '../../css/client/record/Upload.css';
class UploadFail extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Upload render");
        var{title,icon,jinDu,over,max}=this.props;
        return (
            <div className={styles.ecard_popup} onClick={this.props.fail}>
                <div className={styles.process_prompt}>
                    <div className={styles[icon]}></div>
                    <p className={styles.white}>{title}</p>
                {icon=="loading"?<div><p className={Color.green}>{jinDu}</p><p className={Color.red}><span>{over}</span><span>/</span><span>{max}</span></p></div>:null}
                </div>
                <div></div>
            </div>

        );
    }

}

module.exports = UploadFail;
