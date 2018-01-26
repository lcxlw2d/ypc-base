import styles from './css/checkbox.css';

class CheckBox extends PureComponent{

    static defaultProps = {
        checked:false,
        align:"left"
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        this.props.onChange(!this.props.checked);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("CheckBox render");

        var {text,checked,align} = this.props,
            frmCls = this.mergeClassName(styles.box, styles[align]),
            checkCls = this.mergeClassName(styles.checkbox, checked?styles.checked:"");

        return(
            <div className={frmCls} onClick={this.itemClick}>
                <span className={checkCls}></span>
                <span>{text}</span>
            </div>

        );
    }

}

// module.exports = CheckBox;
export default CheckBox;
