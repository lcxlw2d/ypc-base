import {connect} from 'react-redux';
import {getPhoneList} from '../../../actions/todo/todoAction';

import styles from '../../css/todo/auditor/messagePhoneList.less';

class MessagePhoneList extends CursorTable{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    //获取表格主体位置
    getTablistStyle(){
        return styles.tableList;
    }

    getData(startIndex,isAppend,cb,props){
        var {batchId} = this.props,
            params = {
                startIndex, batchId,
                length:20
            };
        this.props.getPhoneList(this, params, isAppend, cb, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    renderMaskPhone(phone){
        return phone.split("").map((item, index)=>{
            return index>=4&&index<=7?"*":item;
        });
    }

    renderHeader() {
        return (
            <tr className={styles.tr}>
                <th width="35%">目标地址</th>
                <th width="65%">内容</th>
            </tr>
        );
    }

    renderList(){
        return this.state.data.map((item,index)=>{
            var {phone, smsContent} = item;
            return (
                <tr className={styles.tr}>
                	<td width="35%">{this.renderMaskPhone(phone)}</td>
                    <td width="65%"><div className={styles.content}>{smsContent}</div></td>
                </tr>
            );
        });
    }

}

function injectAction(){
    return {getPhoneList};
}

module.exports = connect(null, injectAction())(MessagePhoneList);
