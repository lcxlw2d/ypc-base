import styles from './../../css/home/kingGlory/ImgPreload.css';
class ImgPreload extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        systemApi.log("ImgPreload render");
        return (
            <div className={styles.box}>
                <img src="./images/work/home/wzry/wzry_box_top02.png"/>
                <img src="./images/work/home/wzry/wzry_box_bot02.png"/>
                <img src="./images/work/home/wzry/yyb_on.png"/>
                <img src="./images/work/home/wzry/fgs_on.png"/>
                <img src="./images/work/home/wzry/5v5.png"/>
            </div>
        )
    }
}

module.exports = ImgPreload;
