import {connect} from 'react-redux';
import {FROM_MUSTSEE_TODAY_LIST,gotoDetail} from '../../../../../store/actions';
import {getWinTheLot} from '../../../actions/home/mustsee/mustSeeAction';
import styles from '../../css/home/mustsee/todayCode.css';
class TodayCode extends CursorTable {

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

     //跳转全景图
    jump=(clientId)=>{
        var {index}=this.props;
       this.props.gotoDetail(clientId,FROM_MUSTSEE_TODAY_LIST,{index})
    }

     //获取是否显示loading框
    getIsShowLoading(){
        return false;
    }

    //获取数据
    getData(startIndex, isAppend, cb, props) {
        var {orderBy, sortName} = this.state;
        this
            .props
            .getWinTheLot({
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
                    <p>中签股票</p>
                </th>
                <th width="23%">
                    <p>股数/价格</p>
                </th>
                <th width="28%">
                    <p>认购资金</p>
                    <p>缴款日期</p>
                </th>
            </tr>
        );
    }

    renderList() {
        var {data, hasList} = this.state;
        return data.map((item, index) => {
            var {
                succeed,
                statuscode,
                message,
                secuName,
                secuCode,
                quantity,
                price,
                subscribedCapital,
                payDate,
                clientName,
                fundAccount,
                clientId
            } = item;
            return (
                <tr className={styles.case}>
                    <td width="28%" className={styles.noborder} onClick={this.jump.bind(this,clientId)}>
                        <span className={styles.floor_02_icon}>
                            <p >{clientName}</p>
                        </span>
                        <p>{fundAccount}</p>
                    </td>
                    <td width="21%" className={styles.noborder}>
                        <p>{secuName}</p>
                        <p>{secuCode}</p>
                    </td>
                    <td width="23%" className={styles.noborder}>
                        <p>{quantity}</p>
                        <p>{price}</p>
                    </td>
                    <td width="28%" className={styles.noborder}>
                        <p>{subscribedCapital}</p>
                        <p>{payDate}</p>
                    </td>
                </tr>
            );
        });
    }

}

function injectAction() {
    return {getWinTheLot,gotoDetail}
}

module.exports = connect(null, injectAction())(TodayCode);
