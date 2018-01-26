
import styles from './css/input.css';

class Input extends PureComponent{

    static defaultProps = {
        value:"",
        shape:"rect",
        icon:"",
        disabled:false,
        type:"text"
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    changeHandler = (e)=>{
        this.props.onChange(e.target.value);
    }

    inputKeyUp = (e)=>{
        var {onKeyUp} = this.props,
            {keyCode} = e.nativeEvent;
        onKeyUp && onKeyUp(keyCode);
    }

    focus()
    {
        this.refs.thisInput.focus();
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Input render");

        var {placeholder,disabled,label,shape,icon,type,value,autoFocus} = this.props,
            inputFrmCls = this.mergeClassName(styles[shape], styles.formelem, label?styles.hasLabel:"", disabled?styles.disabled:"", icon==""?"":styles[icon]);
        return(
            <div className={styles.box}>
                {label?(
                    <div className={styles.label}>{label}</div>
                ):null}
                <div className={inputFrmCls}>
                    <input ref="thisInput" type={type} value={value} autoFocus={autoFocus} onKeyUp={this.inputKeyUp} onChange={this.changeHandler} placeholder={placeholder} disabled={disabled} />
                </div>
            </div>
        );
    }


}

// module.exports = Input;
export default Input;
