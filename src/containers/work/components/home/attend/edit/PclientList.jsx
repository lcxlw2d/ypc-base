import {connect} from 'react-redux';
import {getPotentialList} from '../../../../actions/home/attend/edit/clientAction';
import ClientList from './ClientList';
import styles from '../../../css/home/attend/edit/list.css';

class PclientList extends CursorList{

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
            length:20,
            search:props.filter
        };
        this.props.getPotentialList(params,isAppend,cb,this,this.updateList);
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
    itemClick = (clientName, potentialId) => () => {
        var {onSelect} = this.props;
        onSelect && onSelect(clientName, potentialId, 2);
    }

    //判断是否选中
    hasSelected(selectArr, potentialId){
        for(var i=0;i<selectArr.length;i++){
            if(selectArr[i].potentialId == potentialId) return true;
        }
        return false;
    }

    //绘制列表
    renderList(){
        var {selectArr} = this.props,
            {data} = this.state;
        return data.map((item,index)=>{
            var {clientName, potentialId, fundAccount} = item;
            return (
                <li className={styles.item} onClick={this.itemClick(clientName, potentialId)}>
                    <span>{clientName}</span>
                    <span className={this.mergeClassName(Color.c6, styles.ml5)}>{fundAccount}</span>
                    <span className={this.mergeClassName(styles.dot, this.hasSelected(selectArr, potentialId)?styles.selected:"")}></span>
                </li>
            );
        });
    }

}
function injectAction(){
    return {getPotentialList};
}

module.exports = connect(null,injectAction())(PclientList);
