import {connect} from 'react-redux';
import {getClientMarginList} from '../../../actions/client/summary/positionAction';

import styles from '../../css/client/detail/profitList.css';

//持仓 - 理财
class PositionMarginList extends CursorCachedTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //获取缓存数据
    getCachedData(props, requestServer, cb){
        var data = Cache.getValue("client_position_margin");
        if(data){
            var {list,hasMore} = data;
            this.updateList(false,list,hasMore);
            cb(null, hasMore);
        }
        else{
            requestServer();
        }
    }

    updateList = (isAppend, data, hasMore) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
        Cache.setValue("client_position_margin",{list,hasMore});
    }

    getData(startIndex, isAppend, cb) {
        var {clientId} = this.props;
        this.props.getClientMarginList({
            startIndex,
            clientId
        }, isAppend, cb, this, this.updateList);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    //获取表格主体位置
    getTablistStyle(){
        return styles.tableList;
    }

    renderHeader() {
        return (
            <tr className={styles.tr}>
                <th width="25%">市值</th>
                <th width="25%">盈亏</th>
                <th width="25%">持仓/可用</th>
                <th width="25%">成本/昨收盘</th>
            </tr>
        );
    }

    renderColor(num){
        num = num || "0";
        var value = num.replace(/,/g,"").replace("%","");
        return +value>=0 ? Color.red : Color.green;
    }

    renderStockName(stockCode, stockName){
        if(stockName) return stockName;
        if(stockCode) return stockCode;
        return '--';
    }

    renderList() {
        var list = [], {data} = this.state;
        return data.map((item, index) => {

            var {
                    stockCode,
                    stockName,
                    currentBalance,
                    ykBalance,
                    ykRate,
                    currentAmount,
                    KYAMOUNT,
                    costPrice,
                    assetPrice
                } = item;

            return (
                <tr className={this.mergeClassName(styles.tr, styles.dataRow)} key={index}>
                    <td width="25%">
                        <p>{this.renderStockName(stockCode, stockName)}</p>
                        <p>{currentBalance}</p>
                    </td>
                    <td width="25%">
                        <p className={this.renderColor(ykBalance)}>{ykBalance}</p>
                        <p className={this.renderColor(ykRate)}>{ykRate}</p>
                    </td>
                    <td width="25%">
                        <p>{currentAmount}</p>
                        <p>{KYAMOUNT}</p>
                    </td>
                    <td width="25%">
                        <p>{costPrice}</p>
                        <p>{assetPrice}</p>
                    </td>
                </tr>
            );
        });
    }

}

function injectProps(state){
    var {client={}} = state.base || {},
        {clientId} = client;
    return {clientId};
}

function injectAction() {
    return {getClientMarginList};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(PositionMarginList);
