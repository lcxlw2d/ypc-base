import {connect} from 'react-redux';
import {getClientAgencyFundList} from '../../../actions/client/summary/transactionAction';

import styles from '../../css/client/detail/profitList.css';

//交易 - 委托 - 基金
class TradeAgencyFundList extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.interIndex = -1;
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
        this.props.getClientAgencyFundList(params, isAppend, cb, this, this.updateList);
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
                <th width="33%">交易时间</th>
                <th width="33%">委托数量</th>
                <th width="33%">状态</th>
            </tr>
        );
    }

    formatBalance(shares, balance){
        if(shares != 0){
            return shares+" 份";
        }
        return balance+" 元"
    }

    renderStockName(fundCode, fundName){
         if(fundName && fundName != "null") return fundName;
         if(fundCode && fundCode != "null") return fundCode;
         return "--";
     }

    renderList() {
        var list = [], {data} = this.state;
        return data.map((item, index) => {
            var {
                    fundcode,
                    fundname,
                    INITDATE,
                    shares,
                    balance,
                    BUSINESSFLAG,
                    ENTRUSTSTATUS
                } = item;

            return (
                <tr className={this.mergeClassName(styles.tr, styles.dataRow)} key={index}>
                    <td width="33%">
                        <p>{this.renderStockName(fundcode, fundname)}</p>
                        <p className={Color.c6}>{INITDATE}</p>
                    </td>
                    <td width="33%">
                        <p>{this.formatBalance(shares,balance)}</p>
                    </td>
                    <td width="33%">
                        <p className={Color.red}>{BUSINESSFLAG}</p>
                        <p >{ENTRUSTSTATUS}</p>
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
    return {getClientAgencyFundList};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(TradeAgencyFundList);
