import {connect} from 'react-redux';

import TrckItem from './TrckItem';

import {getAccountList,setAccountList} from '../../../actions/home/tracking/trackAction';

import styles from '../../css/home/tracking/accountList.css';

class AccountList extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        super.componentDidMount();
    }
    componentWillUnmount() {
        super.componentWillUnmount();
    }

    //取数据函数
    getData(startIndex, isAppend, cb, props) {
        var params = {
            startIndex,
            length: 20,
            recentDay:props.recentDays,
            userStatus:props.win?12:"",
        };
        this.props.getAccountList(params, isAppend, cb, this, this.update);
    }

    //

    //更新数据
    update = (isAppend, data) => {
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

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    //获取表格主体位置
    getTablistStyle() {
        return styles.tableList;
    }

    renderHeader() {
        return (
            <tr>
                <th className={styles.boderleftno}>
                    <p>姓名</p>
                    <p>手机号</p>
                </th>
                <th>
                    <p>状态</p>
                    <p>开户营业部</p>
                </th>
                <th>
                    <p>渠道</p>
                    <p>更新时间</p>
                </th>
            </tr>
        )
    }

    renderList() {
        var list = [], {data} = this.state;
        return data.map((item, index) => {
            var {
                clientName,
                mobilePhone,
                acopUserStatusvalue,
                cooperationChannelvalue,
                updateTime,
                branchName,
            } = item;
            return (<TrckItem
                clientName={clientName}
                mobilePhone={mobilePhone}
                userStatusvalue={acopUserStatusvalue}
                cooperationChannelvalue={cooperationChannelvalue}
                branchName={branchName}
                updateTime={updateTime}/>)
        })
    }

}

function injectAction() {
    return {getAccountList,setAccountList};
}

function injectProps(state) {
   // console.log(state)
return {};
}

module.exports = connect(injectProps, injectAction(),null,{withRef:true})(AccountList);
