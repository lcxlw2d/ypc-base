import styles from '../css/me/preLoad.css';

class PreLoad extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("PreLoad render");

        return(
            <div className={styles.box}>
                <img src="images/work/me/bg06.png"/>
                <img src="images/work/me/bg08.png"/>
                <img src="images/work/me/bg09.png"/>
                <img src="images/work/me/bg10.png"/>
                <img src="images/work/me/bg11.png"/>
                <img src="images/work/me/bg12.png"/>
                <img src="images/work/me/bg13.png"/>
                <img src="images/work/me/bg14.png"/>
                <img src="images/work/me/bg15.png"/>
            </div>
        );
    }

}

module.exports = PreLoad;
