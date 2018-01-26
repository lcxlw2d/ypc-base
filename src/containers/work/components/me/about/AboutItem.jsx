import styles from '../../css/me/aboutItem.css';

class AboutItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //点击事件
    itemClick = ()=>{
        var {onTouchTap} = this.props;
        onTouchTap && onTouchTap();
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AboutItem render");

        var {title, value} = this.props;

        return(
            <li className={styles.li} onTouchTap={this.itemClick}>
                <a>
                    <span>{title}</span>
                    <span className={this.mergeClassName(Color.c9, styles.content)}>{value}</span>
                </a>
            </li>
        );
    }

}

module.exports = AboutItem;
