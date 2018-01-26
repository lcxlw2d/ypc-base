import {connect} from 'react-redux';
import {getOfflineDetailPlan} from '../../../actions/home/stockoffline/stockOfflineAction';

import Category from '../../../../../components/common/category/Category';

import styles from '../../css/home/stockoffline/planList.css';

class PlanList extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            rows:[]
        }
    }

    componentDidMount(){
        var {stockCode} = this.props;
        this.props.getOfflineDetailPlan(stockCode, this, this.update);
    }

    //更新列表
    update = (data)=>{
        this.setState({rows:data});
    }

    //渲染计划条目
    renderList = ()=>{
        var {rows} = this.state;
        return rows.map((item, index)=>{
            var {trade_day, trade_date, arrangement} = item;
            return (
                <tr className={styles.rows}>
                	<td width="20%">
                    	<p className={Font.font13}>{trade_day}</p>
                    </td>
                    <td width="25%">
                    	<p className={Font.font13}>{trade_date}</p>
                    </td>
                    <td width="55%">
                    	<p className={Font.font13}>{arrangement}</p>
                    </td>
                </tr>
            );
        });
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("PlanList render");

        return(
            <Category title="日程安排" iconLeft="bluestick">
                <table width="100%">
                    <tbody>
                        <tr className={styles.header}>
                            <th width="20%">交易日</th>
                            <th width="25%">日期</th>
                            <th width="55%">发行安排</th>
                        </tr>
                        {this.renderList()}
                    </tbody>
                </table>
            </Category>
        );
    }

}

function injectAction(){
    return {getOfflineDetailPlan};
}

module.exports = connect(null,injectAction())(PlanList);
