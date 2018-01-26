import {connect} from 'react-redux';
import {getGoldenList} from '../../../actions/home/golden/goldenAction';

import GoldenItem from './GoldenItem';

import styles from '../../css/home/golden/goldenList.css';

class GoldenList extends CursorList{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    updateList = (isAppend,data)=>{
        var list = data;
        if(isAppend){
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data:list});
    }

    getData(startIndex,isAppend,cb,props){
        var {search,orderName,asc} = props,
            order=asc?"asc":"desc";
        this.props.getGoldenList({startIndex,search,orderName,order},isAppend,cb,this,this.updateList);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    //获取表格数据样式，用于定位
    getTablistStyle(){
        return styles.tableList;
    }

    renderList(){
        var {data} = this.state;
        return data.map((item,index)=>{
            var {clientId, clientName,fundAccount,outTotalAsset,inTotalAsset,maxTotalAsset,assetMultiple} = item,
                newObj = {clientId,clientName,fundAccount,outTotalAsset,inTotalAsset,maxTotalAsset,assetMultiple};

            return (<GoldenItem {...newObj}/>);
        });
    }

}

function injectAction(){
    return {getGoldenList};
}

module.exports = connect(null,injectAction())(GoldenList);
