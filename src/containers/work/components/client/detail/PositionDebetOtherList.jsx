import {connect} from 'react-redux';
import {getClientDebetOtherList} from '../../../actions/client/summary/positionAction';

import styles from '../../css/client/detail/profitList.css';

//持仓 - 负债 - 融券
class PositionDebetOtherList extends CursorCachedTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //获取缓存数据
    getCachedData(props, requestServer, cb){
        var data = Cache.getValue("client_position_debet_other");
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
        Cache.setValue("client_position_debet_other",{list,hasMore});
    }

    getData(startIndex, isAppend, cb) {
        var {clientId} = this.props;
        this.props.getClientDebetOtherList({
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
                <th width="25%">交易时间</th>
                <th width="25%">负债/归还</th>
                <th width="25%">利息/归还</th>
                <th width="25%">到期日</th>
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

            var {
                    stockName,
                    initDate,
                    debitBalance,
                    debitReturnBalance,
                    realCompactInterest,
                    debitReturnInterest,
                    backDate,
                    debitStatus
                } = item;

            return (
                <tr className={this.mergeClassName(styles.tr, styles.dataRow)} key={index}>
                    <td width="25%">
                        <p>{stockName}</p>
                        <p>{initDate}</p>
                    </td>
                    <td width="25%">
                        <p>{debitBalance}</p>
                        <p>{debitReturnBalance}</p>
                    </td>
                    <td width="25%">
                        <p>{realCompactInterest}</p>
                        <p>{debitReturnInterest}</p>
                    </td>
                    <td width="25%">
                        <p>{backDate}</p>
                        <p>{debitStatus}</p>
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
    return {getClientDebetOtherList};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(PositionDebetOtherList);
