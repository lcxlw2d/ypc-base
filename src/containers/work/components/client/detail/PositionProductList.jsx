import {connect} from 'react-redux';
import {getClientProductList} from '../../../actions/client/summary/positionAction';

import styles from '../../css/client/detail/profitList.css';

//持仓 - 理财
class PositionProductList extends CursorCachedTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //获取缓存数据
    getCachedData(props, requestServer, cb){
        var data = Cache.getValue("client_position_product");
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
        Cache.setValue("client_position_product",{list, hasMore});
    }

    getData(startIndex, isAppend, cb) {
        var {clientId} = this.props;
        this.props.getClientProductList({
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
                <th width="25%">产品</th>
                <th width="25%">盈亏</th>
                <th width="25%">持仓/可用</th>
                <th width="25%">市值/净值</th>
            </tr>
        );
    }

    renderColor(num){
        num = num || "0";
        var value = num.replace(/,/g,"").replace("%","");
        return +value>=0 ? Color.red : Color.green;
    }

    renderList() {
        var list = [], {data} = this.state;
        return data.map((item, index) => {

            var name,code,profit,profitRate,position,available,market,net;
            if(item.type == "XYZG"){
                name = item.fundName;
                code = item.fundCode;
                profit = item.profitAndLoss;
                profitRate = item.profitAndLossRate;
                position = item.fundAmout;
                available = item.fundUsableAmout;
                market = item.marketValue;
                net = item.netValue;
            }
            else if(item.type == "YHLC"){
                name = item.prodName;
                code = item.prodCode;
                profit = "-";
                profitRate = item.prodPreRatio;
                position = item.currentAmount;
                available = item.usableAmount;
                market = "-";
                net = "-";
            }
            else if(item.type == "ZQLC"){
                name = item.prodName;
                code = item.prodCode;
                profit = "-";
                profitRate = item.prodPreRatio;
                position = item.fundAmout;
                available = item.usableAmount;
                market = item.marketValue;
                net = item.tMinOneNetValue;
            }

            return (
                <tr className={this.mergeClassName(styles.tr, styles.dataRow)} key={index}>
                    <td width="25%">
                        <p>{name}</p>
                        <p>{code}</p>
                    </td>
                    <td width="25%">
                        <p className={this.renderColor(profit)}>{profit}</p>
                        <p className={this.renderColor(profitRate)}>{profitRate}</p>
                    </td>
                    <td width="25%">
                        <p>{position}</p>
                        <p>{available}</p>
                    </td>
                    <td width="25%">
                        <p>{market}</p>
                        <p>{net}</p>
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
    return {getClientProductList};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(PositionProductList);
