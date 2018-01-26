import styles from '../../css/home/golden/tableTip.css';

class TableTip extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TableTip render");

        var {text, left, onClick} = this.props,
            arrowCls = {
                left:left
            };

        return(
            <div className={styles.tipFrame} onClick={onClick}>
                <div>
                    <b className={styles.tiptop} style={arrowCls}>
                        <i className={styles.arrow1}></i>
                        <i className={styles.arrow2}></i>
                    </b>
                </div>
                <p>{text}</p>
            </div>
        );
    }

}

module.exports = TableTip;
