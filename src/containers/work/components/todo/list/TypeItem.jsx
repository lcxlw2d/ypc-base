import styles from '../../css/todo/list/typeItem.less';

class TypeItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    itemClick = ()=>{
        var {id, onClick} = this.props;
        onClick && onClick(id);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TypeItem render");

        var {icoCls, text, selected} = this.props,
            cls = this.mergeClassName(styles[icoCls], styles.icon, selected?styles.on:"");

        return(
            <div className={cls} onClick={this.itemClick}>
                <a>{text}</a>
            </div>
        );
    }

}

module.exports = TypeItem;
