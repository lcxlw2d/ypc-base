import {connect} from 'react-redux';
import {getProductDeadlineList} from '../../../actions/home/deadline/deadlineAction';
import {gotoDetail, FROM_DEADLINE_PAGE} from '../../../../../store/actions';

import TableTip from '../golden/TableTip';

import styles from '../../css/home/deadline/deadlineTable.css';

class DeadlineTable extends CursorTable{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = Object.assign(this.state,{
            showTip:false
        });
        this.tIndex = -1;
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
        var {productCode, search} = props;
        this.props.getProductDeadlineList({
            productCode:productCode.join(","),
            search,
            startIndex
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

    toggleTip = ()=>{
        var {showTip} = this.state;
        showTip?this.tipClose():this.tipClick();
    }

    tipClick = ()=>{
        this.setState({showTip:true});
        this.tIndex = setTimeout(()=>{
            this.setState({showTip:false});
        },20000);
    }

    tipClose = ()=>{
        clearTimeout(this.tIndex);
        this.setState({showTip:false});
    }

    renderHeader(){
        var {showTip} = this.state;
        return (
            <tr className={styles.header}>
            	<th width="30%">
                    <p>姓名</p>
                    <p>资金账号</p>
                </th>
                <th width="30%">
                    <p>到期产品</p>
                    <p>代码</p>
                </th>
                <th width="40%">
                    <p>
                        <span className={styles.middle}>预计释放资金额</span>
                        <i className={styles.expire_icon_tip01} onClick={this.toggleTip}></i>
                    </p>
                    <p>到期日</p>
                    {showTip?(<TableTip onClick={this.tipClose} text="预计释放资金额取持有份额*今日净值，为预估值，未考虑净值波动及手续费等因素，可能与实际存在一定差异" left="92%"/>):null}
                </th>
            </tr>
        );
    }

    itemClick = (clientId)=>()=>{
        this.props.gotoDetail(clientId, FROM_DEADLINE_PAGE);
    }

    renderList(){
        var {data} = this.state;

        return data.map((item,index)=>{

            var {CLIENT_ID, CLIENT_NAME, FUND_ACCOUNT, PRODUCT_NAME, PROD_CODE, DUE_DATE, OCCUR_BALANCE} = item;

            return (
                <tr className={styles.rows}>
                    <td width="30%" onClick={this.itemClick(CLIENT_ID)}>
                        <p>{CLIENT_NAME}</p>
                        <p className={Color.c6}>{FUND_ACCOUNT}</p>
                    </td>
                    <td width="30%">
                        <p>{PRODUCT_NAME}</p>
                        <p className={Color.c6}>{PROD_CODE}</p>
                    </td>
                    <td width="40%">
                        <p>{DUE_DATE}</p>
                        <p className={Color.red}>{OCCUR_BALANCE}</p>
                    </td>
                </tr>
            );
        });
    }

}

function injectAction(){
    return {getProductDeadlineList, gotoDetail};
}

module.exports = connect(null,injectAction())(DeadlineTable);
