
import styles from './css/select.css';

class Select extends PureComponent{

    static defaultProps = {
        data:[]
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    renderItems(){
        var {data} = this.props;
        return data.map((item,i)=>{
            var {name,value} = item;
            return(
                <option key={i} value={value}>{name}</option>
            );
        });
    }

    changeHandler = (e)=>{
        this.props.onChange(e.target.value);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Select render");

        var {disabled,label,value} = this.props;

        return(
            <div className={styles.box}>
                {label?(
                    <div className={styles.label}>{label}</div>
                ):null}
                <div className={this.mergeClassName(styles.formelem, label?styles.hasLabel:"", disabled?styles.disabled:"")}>
                    <select value={value} onChange={this.changeHandler} className={styles.select} disabled={disabled} ref="select">
                        {this.renderItems()}
                    </select>
                </div>
            </div>

        );
    }


}

module.exports = Select;
