import {connect} from 'react-redux';
import {getBroductList} from '../../../actions/home/investadvice/BroductAction';
import {gotoInvestDetail,investGotoTimeMachine,FROM_INVEST_BRODUCT_PAGE} from '../../../../../store/actions';

import styles from '../../css/home/investadvice/BroductList.css';

class BroductList extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    //获取表格内容样式
    getTablistStyle() {
        return styles.tableList;
    }

    //获取数据
    getData(startIndex, isAppend, cb, props) {
        var {orderBy, sortName} = props,
            params = {
                startIndex,
                length:20,
                productCode:props.productCode,
                order:orderBy,
                sort:sortName
            };
        this.props.getBroductList(params, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    //跳转详情页
    toDetail = (clientId, fundAccount)=>()=> {
        var {index,productCode,productName} = this.props;
        this.props.gotoInvestDetail(FROM_INVEST_BRODUCT_PAGE, {
            subType:index,
            clientId,
            fundAccount,
            category:1,
            productCode,
            productName
        });
    }

    toProductClick = (clientId)=>()=>{
        this.props.investGotoTimeMachine({clientId});
    }

    renderStar(num) {
       var list = [];
        for(let i=0;i<num;i++){
            list.push(<span className={styles.star}></span>);
        }
        for(let i=0;i<5-num;i++){
            list.push(<span className={styles.star0}></span>)
        }
        return list;
    }

    sortClick = (newSortName)=>()=>{
        var {sortName, orderBy, onSortChange} = this.props;
        orderBy = sortName==newSortName?(orderBy=="asc"?"desc":"asc"):"desc";
        sortName = newSortName;
        onSortChange && onSortChange(sortName, orderBy);
    }

    //获取没有数据是的提示文本
    getEmptyTip(){
        return (
            <div className={styles.emptyImg}>
                <img src="./images/work/home/investadvice/list_empty.png"/>
                <div>哎呀，没找到合适的呢</div>
            </div>
        )
    }

    renderHeader() {
        var {sortName,orderBy} = this.props;
        return (
            <tr className={styles.header}>
                <th><p>客户</p></th>
                <th onClick={this.sortClick("totalAsset")}>
                    <p>资本实力</p>
                    <p>(万元)</p>
                    <i className={this.mergeClassName(styles.icon_sort,sortName=="totalAsset"?styles[orderBy]:"")}></i>
                </th>
                <th onClick={this.sortClick("matchingDegree")}>
                    <p>匹配度</p>
                    <i className={this.mergeClassName(styles.icon_sort,sortName=="matchingDegree"?styles[orderBy]:"")}></i>
                </th>
                <th onClick={this.sortClick("buyable")}>
                    <p>概率指数</p>
                    <i className={this.mergeClassName(styles.icon_sort,sortName=="buyable"?styles[orderBy]:"")}></i>
                </th>
            </tr>
        );
    }

    renderList() {
        var {data} = this.state;
        return data.map((item, index) => {
            var {matchingDegree, buyable, clientName, totalAsset, clientId, fundAccount, timeMachineFlag} = item;
            matchingDegree='progress'+matchingDegree;

            return (
                <tr className={styles.rows}>
                    <td onClick={this.toDetail(clientId, fundAccount)}>
                        <p>{clientName}</p>
                        <p className={this.mergeClassName(Color.c6, styles.nowrap)}>{fundAccount}</p>
                    </td>
                    <td onClick={this.toDetail(clientId, fundAccount)}>
                        <p className={Color.red}>{totalAsset}</p>
                    </td>
                    <td onClick={this.toDetail(clientId, fundAccount)}>
                        <div className={styles[matchingDegree]}>
                            <div className={styles.progress_bar}></div>
                        </div>
                    </td>
                    <td>
                        <div className={styles.index_star}>{this.renderStar(buyable)}</div>
                        {timeMachineFlag=="1"?(
                            <div className={styles.btn_sgj} onClick={this.toProductClick(clientId)}>
                                <a>时光机</a>
                            </div>
                        ):null}
                    </td>
                </tr>
            );
        });
    }

}

function injectAction() {
    return {getBroductList, gotoInvestDetail, investGotoTimeMachine};
}

module.exports = connect(null, injectAction(), null, {withRef:true})(BroductList);
