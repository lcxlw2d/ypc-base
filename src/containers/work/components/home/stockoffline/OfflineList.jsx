import {connect} from 'react-redux';
import {getOfflineStockList} from '../../../actions/home/stockoffline/stockOfflineAction';

import EmphaseText from '../../../../../components/common/text/EmphaseText';

import styles from '../../css/home/stockoffline/offlineList.css';

class OfflineList extends CursorTable{

    //构造函数
    constructor(props,context) {
        super(props,context);
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
        var {start,end,code} = props;
        this.props.getOfflineStockList({
            startIndex,
            inquiry_start_date:start,
            inquiry_end_date:end,
            q_stock_code:code
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

    renderHeader(){
        return (
            <tr className={styles.header}>
            	<th>申购代码</th>
                <th>询价开始日</th>
                <th>市值要求(万)</th>
                <th>东财估价</th>
            </tr>
        );
    }

    itemClick = (stockCode)=>()=>{
        hashHistory.push("/work/home/stockoffline/detail/"+stockCode);
    }

    renderList(){
        var {data} = this.state;

        return data.map((item,index)=>{

            var {code} = this.props,
                {stock_name, stock_code, inquiry_start_date, avg_market_value, eastmoney_estim_price1} = item;

            return (
                <tr className={styles.rows} onClick={this.itemClick(stock_code)}>
                    <td>
                        <p>{stock_name}</p>
                        <p className={Color.c6}><EmphaseText text={stock_code} emphase={code}/></p>
                    </td>
                    <td>
                        <p>{inquiry_start_date}</p>
                    </td>
                    <td>
                        <p className={Color.red}>{avg_market_value}</p>
                    </td>
                    <td>
                        <p className={Color.red}>{eastmoney_estim_price1}</p>
                    </td>
                </tr>
            );
        });
    }

}

function injectAction(){
    return {getOfflineStockList};
}

module.exports = connect(null,injectAction())(OfflineList);
