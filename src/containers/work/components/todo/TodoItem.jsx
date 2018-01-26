import styles from '../css/todo/todoItem.less';

class TodoItem extends PureComponent{

    //默认属性值
    static defaultProps = {
        canTouch:false
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        }
    }

    //点击待办item点击事件
    itemClick = (event)=>{
        var {onClick} = this.props;
        onClick && onClick();
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    renderSubTitle(){
        var {remindSubtype, user_name, organizationName, name, fundAcct} = this.props;
        if(remindSubtype=="60001" || remindSubtype=="60002")
            return <p><span>{user_name}</span><span>-{organizationName}</span></p>;

        return <p><span>{name}</span><span>-{fundAcct}</span></p>;
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TodoItem render");

        var {user_name,organizationName,remindSubtype,name,type,typeNo,fundAcct,desc,time,onClick,canTouch} = this.props,
            {touch} = this.state,
            itemCls = this.mergeClassName(styles.single_mot, touch && canTouch?styles.touch:"");
        return(
            <div className={itemCls} onClick={this.itemClick} onTouchStart={this.touchStart} onTouchMove={this.touchEnd} onTouchEnd={this.touchEnd}>
           		<div className={styles.mot_innerbox}>
                    <div className={this.mergeClassName(styles.mot_img, styles["mot"+typeNo])}></div>
                    <div className={styles.mot_cont}>
                        <div className={styles.mot_inner01}>
                            <h3><a className={styles.title}>{type}</a><span className={styles.time}>{time}</span></h3>
                            {this.renderSubTitle()}
                            <p className={Color.c9}>{desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = TodoItem;
