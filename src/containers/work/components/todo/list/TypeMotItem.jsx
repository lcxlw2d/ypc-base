import styles from '../../css/todo/list/typeMotItem.less';

class TypeMotItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    itemClick = ()=>{
        var {id, onClick, type} = this.props;
        if(type != "on"){
            onClick && onClick(id, type);
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TypeMotItem render");

        var {icoCls, text, type, id} = this.props,
            cls = this.mergeClassName(styles[icoCls], styles.icon);

        return(
            <div className={cls} onClick={this.itemClick}>
                <a>{text}</a>
                <i className={styles[type]}></i>
            </div>
        );
    }

}

module.exports = TypeMotItem;
