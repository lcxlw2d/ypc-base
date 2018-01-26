import H5lock from '../../lib/H5lock';

import styles from './css/gestureLock.css';

class GestureLock extends PureComponent{

    static defaultProps = {
        title:"请解锁",
        chooseType:3,
        gestureEnd:function(){}
    }

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    componentDidMount(){
        var {chooseType,gestureEnd} = this.props,
            {frame} = this.refs,
            width = $(frame).width(),
            height = $(frame).height();
        this._instance = new H5lock({
            frame,
            width,
            height,
            chooseType,
        	callback:gestureEnd
        });
        this._instance.init();
    }

    componentWillUnmount(){
        if(this._instance){
            this._instance.destroy();
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("GestureLock render");

        var {title,className,secTitle,error} = this.props,
            frameCls = this.mergeClassName(styles.frame, className),
            titleCls = this.mergeClassName(styles.title, error?styles.error:"");

        return(
            <div className={frameCls}>
                <div className={titleCls}>{title}</div>
                {secTitle?(<div className={styles.secTitle}>{secTitle}</div>):null}
                <div className={styles.pwdFrame} ref="frame"></div>
            </div>
        );
    }


}

// module.exports = GestureLock;
export default GestureLock;
