import {connect} from 'react-redux';
import {getClientList} from '../../../../actions/home/attend/edit/clientAction';

import styles from '../../../css/home/attend/edit/list.css';

class ClientList extends CursorList{

    //默认属性值
    static defaultProps = {
        selectArr:{}
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    //如果过滤条件改变才刷新界面
    componentWillReceiveProps(nextProps){
        var {filter} = this.props;
        if(filter != nextProps.filter){
            super.componentWillReceiveProps(nextProps);
        }
    }

    //取数据函数
    getData(startIndex,isAppend,cb,props){
        var params = {
            startIndex,
            validClient:0,
            clientStar:0,
            length:20,
            search:props.filter
        };
        this.props.getClientList(params,isAppend,cb,this,this.updateList);
    }

    updateList = (isAppend,data)=>{
        var list = data;
        if(isAppend){
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data:list});
    }

    //点击客户
    itemClick = (clientName, clientId) => () => {
        var {onSelect} = this.props;
        onSelect && onSelect(clientName, clientId, 1);
    }

    //判断是否选中
    hasSelected(selectArr, clientId){
        for(var i=0;i<selectArr.length;i++){
            if(selectArr[i].clientId == clientId) return true;
        }
        return false;
    }

    //绘制列表
    renderList(){
        var {selectArr} = this.props,
            {data} = this.state;
        return data.map((item,index)=>{
            var {clientName,clientId,fundAccount} = item;
            return (
                <li className={styles.item} onClick={this.itemClick(clientName, clientId)}>
                    <span>{clientName}</span>
                    <span className={this.mergeClassName(Color.c6, styles.ml5)}>{fundAccount}</span>
                    <span className={this.mergeClassName(styles.dot, this.hasSelected(selectArr, clientId)?styles.selected:"")}></span>
                </li>
            );
        });
    }

}

function injectAction(){
    return {getClientList};
}

module.exports = connect(null,injectAction())(ClientList);
