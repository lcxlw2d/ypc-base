import styles from '../css/me/toggleButton.css';

class ToggleButton extends PureComponent{

    //默认属性值
    static defaultProps = {
        open:false
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    buttonClick = ()=>{
        var {onChange,open} = this.props;
        onChange && onChange(!open);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ToggleButton render");

        var {open} = this.props,
            boxCls = this.mergeClassName(styles.box, open?styles.open:"");

        return(
            <div className={boxCls} onClick={this.buttonClick}>
                <div className={styles.button}></div>
            </div>
        );
    }

}

module.exports = ToggleButton;
