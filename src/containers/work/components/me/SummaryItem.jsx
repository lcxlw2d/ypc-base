import styles from '../css/me/summaryItem.css';

class SummaryItem extends PureComponent{

    //默认属性值
    static defaultProps = {
        color:"blue"
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //点击条目
    itemClick = ()=>{
        var {onClick} = this.props;
        onClick && onClick();
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SummaryItem render");

        var {color,text,value,onClick} = this.props,
            hasClick = !!onClick,
            valueCls = this.mergeClassName(styles.text, styles.color, Color[color], hasClick?styles.canClick:"");

        return(
            <div className={styles.item} onClick={this.itemClick}>
                <span className={valueCls}>{value}</span>
                <span className={styles.text}>{text}</span>
            </div>
        );
    }

}

module.exports = SummaryItem;
