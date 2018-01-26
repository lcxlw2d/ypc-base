import styles from '../../css/todo/list/todoIntro.less';

class TodoIntro extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            index:0
        }
    }

    onClose = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    //下一页
    nextPic = ()=>{
        var {index} = this.state;
        this.setState({index:index+1});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TodoIntro render");

        var {index} = this.state;

        return(
            <div className={styles.frame}>
                {index==0?(<div className={this.mergeClassName(styles.intro, styles.intr)} onClick={this.nextPic}></div>):null}
                {index==1?(<div className={this.mergeClassName(styles.intro2, styles.intr)} onClick={this.onClose}></div>):null}
            </div>
        );
    }

}

module.exports = TodoIntro;
