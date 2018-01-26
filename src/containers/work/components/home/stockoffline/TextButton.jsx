
import styles from '../../css/home/stockoffline/textButton.css';

class TextButton extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TextButton render");

        var {text, onClick,selected} = this.props;

        return(
            <span className={this.mergeClassName(styles.flatText, selected?styles.on:"")} onClick={onClick}>{text}</span>
        );
    }


}

module.exports = TextButton;
