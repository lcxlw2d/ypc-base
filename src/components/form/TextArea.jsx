
import styles from './css/textarea.css';

class TextArea extends PureComponent{

    static defaultProps = {
        value:""
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    changeHandler = (e)=>{
        this.props.onChange(e.target.value);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TextArea render");

        var {placeholder,disabled,label,value} = this.props;

        return(
            <div className={styles.box}>
                {label?(
                    <div className={styles.label}>{label}</div>
                ):null}
                <div className={styles.formelem + " " + (label?styles.hasLabel:"") + " " + (disabled?styles.disabled:"")}>
                    <textarea value={value} onChange={this.changeHandler} disabled={disabled} placeholder={placeholder}></textarea>
                </div>
            </div>

        );
    }


}

module.exports = TextArea;
