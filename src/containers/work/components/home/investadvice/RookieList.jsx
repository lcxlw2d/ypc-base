import {connect} from 'react-redux';
import {getRookieList} from '../../../actions/home/investadvice/investAdviceAction';

import styles from '../../css/home/investadvice/attentionList.css';

class RookieList extends CursorTable{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = Object.assign(this.state,{
            sortName:"",
            orderBy:""
        });
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    //获取表格内容样式
    getTablistStyle(){
        return styles.tableList;
    }

    //获取数据
    getData(startIndex,isAppend,cb,props){
        var {tag} = props,
            {orderBy,sortName} = this.state;
        this.props.getRookieList({
            startIndex,
            tag,
            length:20,
            order:orderBy,
            sort:sortName
        }, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    sortClick = (newSortName)=>()=>{
        var {sortName, orderBy} = this.state;
        orderBy = sortName==newSortName?(orderBy=="asc"?"desc":"asc"):"desc";
        sortName = newSortName;
        this.state.orderBy = orderBy;
        this.state.sortName = sortName;
        this.refreshData();
    }

    renderHeader(){
        var {sortName,orderBy} = this.state;
        return (
            <tr className={styles.header}>
            	<th width="20%">
                    <p>客户</p>
                </th>
                <th width="25%" onClick={this.sortClick("totalAsset")}>
                    <p>资本实力</p>
                    <p>(万元)</p>
                    <i className={this.mergeClassName(styles.icon_sort,sortName=="totalAsset"?styles[orderBy]:"")}></i>
                </th>
                <th width="30%">
                    <p>上版理由</p>
                </th>
                <th width="25%">
                    <p>关注产品</p>
                </th>
            </tr>
        );
    }

    renderProduct(productList){
        return productList.map((item)=>{
            return <span className={styles.productItem}>{item.productShortName}</span>
        });
    }

    renderList(){
        var {data} = this.state;
        return data.map((item,index)=>{
            var {clientName, clientId, fundAccount, totalAsset, reason, productList} = item;
            return (
                <tr className={styles.rows}>
                    <td width="20%">
                        <p>{clientName}</p>
                        <p className={Color.c6}>{fundAccount}</p>
                    </td>
                    <td width="25%">
                        <p className={Color.red}>{totalAsset}</p>
                    </td>
                    <td width="30%">
                        <p>{reason}</p>
                    </td>
                    <td width="25%">
                        <p className={Color.blue}>{this.renderProduct(productList)}</p>
                    </td>
                </tr>
            );
        });
    }

}

function injectAction(){
    return {getRookieList};
}

module.exports = connect(null,injectAction(),null,{withRef:true})(RookieList);
