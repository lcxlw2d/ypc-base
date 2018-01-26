import styles from '../../css/home/stockoffline/detailPanelItem.css';

class DetailPanelItem extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("DetailPanelItem render");

        var {color, value, text, column} = this.props,
            style = {
                width:Math.floor(99/column)+"%"
            }

        return(
            <div className={styles.network} style={style}>
                <p className={this.mergeClassName(Color[color], styles.value)}>{value}</p>
                <p>{text}</p>
            </div>
        );
    }


}

module.exports = DetailPanelItem;
