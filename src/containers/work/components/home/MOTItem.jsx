import {connect} from 'react-redux';
import {setUndoType,showMessage,TIP, MOTDATA} from '../../../../store/actions';

import styles from '../css/home/motPanel.css';

class MOTItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        }
    }

    itemClick = ()=>{

        var {typeId,num} = this.props,
            item = MOTDATA[typeId];

        if(item){
            var {evtId, evtTag} = item;
            Client.trackEvent(evtId,evtTag);
        }

        if(num != 0){
            this.props.setUndoType(typeId, true);
            Cache.remove("todo_tab_type");
            hashHistory.push('/work/todo');
        }
        else{
            this.props.showMessage(TIP, "没有该类待办任务");
        }

    }

    renderCount(num){
        return num?(<span className={styles.count}>{num}</span>):null;
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("MOTPanel render");

        var {name,num,iconCls} = this.props,
            {touch} = this.state;

        return(
            <div className={this.mergeClassName(styles.iconBox, touch?styles.touch:"")} onClick={this.itemClick} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                <div className={this.mergeClassName(styles.icon, styles[iconCls])}>
                    {this.renderCount(num)}
                </div>
                <a>{name}</a>
            </div>
        );
    }
}

function injectAction(){
    return {setUndoType,showMessage};
}

module.exports = connect(null,injectAction())(MOTItem);
