import {connect} from 'react-redux';
import TableList from './tableList';
import {FROM_MUSTSEE_TODAY_LIST,gotoDetail} from '../../../../../store/actions';

import {getPayMent} from '../../../actions/home/mustsee/mustSeeAction';

import styles from '../../css/home/mustsee/payMent.css';
class PayMent extends CursorList {

    //构造函数
    constructor(props,context) {
        super(props, context);
        this.state={
            data:[],
            hasList:[],
        }
    }

      //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    getListStyle(){
        return styles.tableList;
    }

    //获取数据
    getData(startIndex,isAppend,cb,props){
        this.props.getPayMent({
            startIndex,
            length:20,
        }, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data,
            hasList=[];
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        list.map((item,index)=>{
            hasList[index]=false;
        })
        this.setState({data: list,hasList});
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

    //显示中签详情
    hasTable = (obj) =>{
         var {hasList}=this.state,
            {index}=obj;
         hasList[index]=!hasList[index];
         this.setState({hasList:hasList.slice(0)});
    }

    renderListBefore(){
        return (
            <div className={styles.floatTitle}>
                <table cellpadding="0" cellspacing="0" width="100%">
                    <tr className={styles.header}>
                        <th width="24%" className={styles.boderleftno}><p>姓名</p></th>
                        <th width="22%"><p>中签金额</p><p>定投扣款金额</p></th>
                        <th width="22%"><p>补足金额</p><p>可用金额</p></th>
                        <th width="22%"><p>账户类型</p><p>更新日期</p></th>
                        <th width="10%"><p>查看</p><p>中签</p></th>
                    </tr>
                </table>
            </div>
        );
    }

    onRefresh=()=>{
      this.refresh();
    }

    renderList(){
        var {data,hasList} = this.state;

        return data.map((item,index)=>{
            var {fundAccount, clientName, lotWinningAmount,clientId,supplementAmount,fixedInvestmentAmount,usableAmount,accountType,accountTypevalue,updateDate}=item;
            return (
                <div>
                    <table className={styles.w100}>
                        <tr className={styles.case}>
                            <td width="24%" className={styles.noborder} onClick={this.jump.bind(this,clientId)}><span className={styles.floor_02_icon}><p >{clientName}</p></span><p>{fundAccount}</p></td>
                            <td width="22%" className={styles.noborder}><p>{lotWinningAmount}</p><p>{fixedInvestmentAmount}</p></td>
                            <td width="22%" className={styles.noborder}><p className={Color.red}>{supplementAmount}</p><p>{usableAmount}</p></td>
                            <td width="22%" className={styles.noborder}><p>{accountTypevalue}</p><p>{updateDate}</p></td>
                            <td width="10%" className={styles.noborder} onClick={this.hasTable.bind(this,{index,fundAccount})}><span className={hasList[index]?styles.floor_01_icon_f:styles.floor_01_icon}></span></td>
                        </tr>
                    </table>
                    {hasList[index]?<TableList fundAccount={fundAccount} refresh={this.onRefresh}/>:null}
                </div>
            );
        });
    }

}

function injectAction(){
    return{getPayMent,gotoDetail}
}

module.exports = connect(null, injectAction())(PayMent);
