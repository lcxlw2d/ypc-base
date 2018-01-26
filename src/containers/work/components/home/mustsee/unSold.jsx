import { connect } from 'react-redux';
import {FROM_MUSTSEE_TODAY_LIST,gotoDetail} from '../../../../../store/actions';
import {getUnSold} from '../../../actions/home/mustsee/mustSeeAction';
import styles from '../../css/home/mustsee/unsold.css';
class UnSold extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }
    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    getTablistStyle() {
        return styles.tableList;
    }

     //获取是否显示loading框
    getIsShowLoading(){
        return false;
    }

      //跳转全景图
    jump=(clientId)=>{
        var {index}=this.props;
       this.props.gotoDetail(clientId,FROM_MUSTSEE_TODAY_LIST,{index})
    }

    //获取数据
    getData(startIndex, isAppend, cb, props) {
        var {orderBy, sortName} = this.state;
        this
            .props
            .getUnSold({
                startIndex,
                length: 20
            }, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this
                .state
                .data
                .concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    renderHeader() {
        return (
            <tr className={styles.header}>
                <th width="28%" className={styles.boderleftno}>
                    <p>姓名</p>
                </th>
                <th width="21%">
                    <p>开板新股</p>
                </th>
                <th width="21%">
                    <p>持仓数量</p>
                    <p>市值</p>
                </th>
                <th width="30%">
                    <p>首次开板日期</p>
                    <p>收益金额</p>
                </th>
            </tr>
        );
    }

    renderList() {
        var {data} = this.state;
        return data.map((item, index) => {
           var  {
                clientName,
                fundAccount,
                secuName,
                secuCode,
                position,
                marketValue,
                date,
                clientId,
                surplusAmount
            } = item;
            return (
                <tr width="28%" className={styles.case}>
                    <td className={styles.noborder} onClick={this.jump.bind(this,clientId)}>
                        <span className={styles.floor_02_icon}>
                            <p >{clientName}</p>
                        </span>
                        <p>{fundAccount}</p>
                    </td>
                    <td width="21%" className={styles.noborder}>
                        <p>{secuName}</p>
                        <p>{secuCode}</p>
                    </td>
                    <td width="21%" className={styles.noborder}>
                        <p>{position}</p>
                        <p>{marketValue}</p>
                    </td>
                    <td width="30%" className={styles.noborder}>
                        <p>{date}</p>
                        <p
                            className={surplusAmount > 0
                            ? Color.red
                            : Color.green}>{surplusAmount}</p>
                    </td>
                </tr>
            );
        });
    }

}

function injectAction() {
    return {getUnSold,gotoDetail}
}

module.exports = connect(null, injectAction())(UnSold);