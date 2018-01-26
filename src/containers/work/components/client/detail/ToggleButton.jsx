import styles from '../../css/client/detail/toggleButton.css';

class ToggleButton extends PureComponent{

    //默认属性值
    static defaultProps = {
        open:false
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ToggleButton render");

        var {open,onClick} = this.props,
            boxCls = this.mergeClassName(styles.box, open?styles.open:"");

        return(
            <div className={boxCls} onClick={onClick}>
                <div className={styles.button}></div>
            </div>
        );
    }

}

module.exports = ToggleButton;
