import {connect} from 'react-redux';
import {getTodayNew} from '../../../actions/home/mustsee/mustSeeAction';
import {FROM_MUSTSEE_TODAY_LIST, gotoDetail} from '../../../../../store/actions';
import styles from '../../css/home/mustsee/todayNew.css';
class TodayNew extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            hasAlert: false
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
    jump = (clientId) => {
        var {index} = this.props;
        this
            .props
            .gotoDetail(clientId, FROM_MUSTSEE_TODAY_LIST, {index})
    }

    //获取数据
    getData(startIndex, isAppend, cb, props) {
        this
            .props
            .getTodayNew({
                startIndex,
                length: 20,
                refresh: props.refresh
            }, isAppend, cb, this, this.updateList);
    }

    removeUser = (alertParam) => {
        this
            .props
            .hasAlert(alertParam);
    }

    addUser = (alertParam) => {
        this
            .props
            .addUser(alertParam);
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
                <th width="27%" className={styles.boderleftno}>
                    <p>姓名</p>
                </th>
                <th width="25%">
                    <p>可申购额度</p>
                </th>
                <th width="25%">
                    <p>账户类型</p>
                    <p>更新日期</p>
                </th>
                <th width="23%">
                    <p>屏蔽/开启</p>
                </th>
            </tr>
        );
    }

    renderList() {
        var {data} = this.state;
        return data.map((item, index) => {
            var {
                clientName,
                fundAccount,
                marketType,
                marketTypevalue,
                accountType,
                accountTypevalue,
                updateDate,
                clientId,
                maxAccount,
                remind
            } = item;
            return (
                <tr
                    className={remind != "0"
                    ? styles.case
                    : this.mergeClassName(styles.case, styles.shield)}>
                    <td
                        width="27%"
                        className={styles.noborder}
                        onClick={this
                        .jump
                        .bind(this, clientId)}>
                        <span className={styles.floor_02_icon}>
                            <p className={styles.max360}>{clientName}</p>
                            <p className={styles.max360}>{fundAccount}</p>
                        </span>
                    </td>
                    <td width="25%" className={styles.noborder}>
                        <p className={styles.max360}>{maxAccount}</p>
                        <p className={styles.max360}>{marketTypevalue}</p>
                    </td>
                    <td width="25%" className={styles.noborder}>
                        <p className={styles.max360}>{accountTypevalue}</p>
                        <p className={styles.max360}>{updateDate}</p>
                    </td>
                    {remind != "0"
                        ? <td
                                width="23%"
                                onClick={this
                                .removeUser
                                .bind(this, {clientId, remind})}>
                                <span className={styles.floor_03_icon}></span>
                            </td>
                        : <td
                            width="23%"
                            onClick={this
                            .addUser
                            .bind(this, {clientId, remind})}>
                            <span className={styles.floor_05_icon}></span>
                        </td>}
                </tr>
            );
        });
    }

}

function injectAction() {
    return {getTodayNew, gotoDetail}
}

module.exports = connect(null, injectAction())(TodayNew);
