import {connect} from 'react-redux';
import {getClientAgencyMarginList} from '../../../actions/client/summary/transactionAction';

import styles from '../../css/client/detail/profitList.css';

//交易 - 委托 - 股票
class TradeAgencyMarginList extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        var freshTime = systemApi.getValue("config_page_client_trade_refresh");
        this.interIndex = setInterval(()=>{
            this.refreshData();
        },freshTime);
        super.componentDidMount();
    }

    componentWillUnmount(){
        clearInterval(this.interIndex);
        super.componentWillUnmount();
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    getData(startIndex, isAppend, cb, props) {
        var {clientId} = props,
            params = {
                startIndex,
                clientId,
            };
        this.props.getClientAgencyMarginList(params, isAppend, cb, this, this.updateList);
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
                <th width="25%">委托均价</th>
                <th width="25%">委托数量</th>
                <th width="25%">状态</th>
            </tr>
        );
    }

    renderStockName(stockName, stockCode){
         if(stockName && stockName != "null") return stockName;
         if(stockCode && stockCode != "null") return stockCode;
         return "--";
     }

    renderList() {
        var list = [], {data} = this.state;
        return data.map((item, index) => {
            var {
                    stockCode,
                    stockName,
                    entrustDate,
                    entrustPrice,
                    entrustAmount,
                    entrustFlag,
                    entrustType
                } = item;

            return (
                <tr className={this.mergeClassName(styles.tr, styles.dataRow)} key={index}>
                    <td width="25%">
                        <p>{this.renderStockName(stockName, stockCode)}</p>
                        <p className={Color.c6}>{entrustDate}</p>
                    </td>
                    <td width="25%">
                        <p className={Color.red}>{entrustPrice}</p>
                    </td>
                    <td width="25%">
                        <p>{entrustAmount}</p>
                    </td>
                    <td width="25%">
                        <p className={Color.red}>{entrustFlag}</p>
                        <p >{entrustType}</p>
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
    return {getClientAgencyMarginList};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(TradeAgencyMarginList);
