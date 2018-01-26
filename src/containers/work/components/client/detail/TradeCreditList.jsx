import {connect} from 'react-redux';
import {getClientCreditList} from '../../../actions/client/summary/transactionAction';

import styles from '../../css/client/detail/profitList.css';

//交易 - 信用划转
class TradeCreditList extends CursorTable {

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
                clientId
            };
        this.props.getClientCreditList(params, isAppend, cb, this, this.updateList);
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
                <th width="23%">交易时间</th>
                <th width="30%">划转账户</th>
                <th width="22%">委托数量</th>
                <th width="25%">状态</th>
            </tr>
        );
    }

    renderStockName(stockCode, stockName){
        if(stockName && stockName!="null") return stockName;
        if(stockCode && stockCode!="null") return stockCode;
        return '--';
    }

    renderList() {
        var list = [], {data} = this.state;
        return data.map((item, index) => {
            var {
                  stockCode,
                  stockName,
                  transferDate,
                  stockAccountOut,
                  stockAccountIn,
                  occurBalance,
                  entrustStatus,
                  ghType
                } = item;

            return (
                <tr className={this.mergeClassName(styles.tr, styles.dataRow)} key={index}>
                    <td width="23%">
                        <p>{this.renderStockName(stockCode, stockName)}</p>
                        <p className={Color.c6}>{transferDate}</p>
                    </td>
                    <td width="30%">
                        <p className={Color.red}>
                            <span className={styles.mid}>{stockAccountOut}</span>
                            <span className={this.mergeClassName(styles.icon_out, styles.mid)}></span>
                        </p>
                        <p className={Color.red}>
                            <span className={styles.mid}>{stockAccountIn}</span>
                        </p>
                    </td>
                    <td width="22%">
                        <p>{occurBalance}</p>
                    </td>
                    <td width="25%">
                        <p className={Color.red}>{entrustStatus}</p>
                        <p className={Color.red}>{ghType}</p>
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
    return {getClientCreditList};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(TradeCreditList);
