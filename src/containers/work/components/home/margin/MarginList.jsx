import {connect} from 'react-redux';
import {getMarginList} from '../../../actions/home/margin/marginAction';

import MarginItem from './MarginItem';

import styles from '../../css/home/margin/marginList.css';

class MarginList extends CursorList{

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
        var {search} = props;
        this.props.getMarginList({startIndex,search},isAppend,cb,this,this.updateList);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    getTablistStyle(){
        return styles.tableList;
    }

    renderList(){
        var list = [],
            {data} = this.state;
        return data.map((item,index)=>{
            var {clientId,clientName,fundAccount,avgAsset,outTotalAsset,riskTraitName} = item,
                newObj = {clientId,clientName,fundAccount,avgAsset,outTotalAsset,riskTraitName};

            return (<MarginItem {...newObj}/>);
        });
    }

}

function injectAction(){
    return {getMarginList};
}

module.exports = connect(null,injectAction())(MarginList);
