import {connect} from 'react-redux';

import styles from '../../css/home/tracking/PartnerList.css';

class PartnerList extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
            this.state = {
           PartnerList:[]
        }
    }

    componentDidUpdate() {
        super.componentDidUpdate();
    }

    componentDidMount() {
        super.componentDidMount();
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
        var cls = this.mergeClassName(styles.th,styles.boderleftno);
        return (
            <tr className={styles.thead}>
                <th className={cls}>
                    推荐人
                </th>
                <th className={styles.th}>
                   今日客户数
                </th>
                <th className={styles.th}>
                   累计客户数
                </th>
            </tr>
        )
    }

    renderList() {
        var {PartnerList}=this.state;
        return PartnerList.map((item,index)=>{
            var {name, num}=item;
            return(<tr className={styles.tr}>
                	<td className={styles.td}>{name}</td>
                    <td className={styles.td}>{num}</td>
                    <td className={styles.td}>{num}</td>
                </tr>)
        })
    }

}

function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(PartnerList);
