
import styles from './css/button.css';

class Input extends PureComponent{

    static defaultProps = {
        shape:"rect"
    }

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Input render");

        var {value,onClick,shape} = this.props;

        return(
            <div className={styles.box}>
                <span className={this.mergeClassName(styles.button, styles[shape])} onClick={onClick}>{value}</span>
            </div>
        );
    }


}

// module.exports = Input;
export default Input;
