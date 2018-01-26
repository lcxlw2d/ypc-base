import {connect} from 'react-redux';
import {getClientTransferList} from '../../../actions/client/summary/transactionAction';

import styles from '../../css/client/detail/profitList.css';

//交易 - 委托 - 银证转账
class TradeTransferList extends CursorTable {

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
        this.props.getClientTransferList(params, isAppend, cb, this, this.updateList);
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
                <th width="28%">银行名称</th>
                <th width="45%">发生金额/后资金额</th>
                <th width="27%">状态</th>
            </tr>
        );
    }

    renderList() {
        var list = [], {data} = this.state;
        return data.map((item, index) => {
            var {
                  bankName,
                  transferDate,
                  occurBalance,
                  postBalance,
                  status,
                  transferType
                } = item;

            return (
                <tr className={this.mergeClassName(styles.tr, styles.dataRow)} key={index}>
                    <td width="28%">
                        <p>{bankName}</p>
                        <p className={Color.c6}>{transferDate}</p>
                    </td>
                    <td width="45%">
                        <p className={Color.red}>{occurBalance}</p>
                        <p>{postBalance}</p>
                    </td>
                    <td width="27%">
                        <p className={Color.red}>{status}</p>
                        <p className={Color.red}>{transferType}</p>
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
    return {getClientTransferList};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(TradeTransferList);
