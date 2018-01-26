import ProfileItem from './ProfileItem';
import styles from '../../css/home/investadvice/Profile.css';
import {connect} from 'react-redux';
import {gotoDetail, FROM_INVEST_DETAIL_PAGE} from '../../../../../store/actions';
class Profile extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

     //点击条目，跳转至全景图
    btnClick = ()=>{
        var {params, from} = this.props,
            {clientId} = params,
            pageParams = Object.assign({},params,{from});
        this.props.gotoDetail(clientId,FROM_INVEST_DETAIL_PAGE,pageParams);
    }

    render() {
        var {userProfile} = this.props,
            {
                tyEarnRateOpt,
                maxHoldProductSingleValue,
                tyBalanceNetflow,
                hisBalanceNetflow,
                tyBuyOfstockBalance,
                lastestFundTradeDay,
                lyTurnOverRateDouble,
                maxHoldStockDayNum,
                maxHoldOfstockNumber,
                maxHoldProductSingleDate
            } = userProfile;

        return (
            <div className={this.mergeClassName(styles.cs_reason, styles.investment)}>
                <h3>
                    <span>相关投资概况(单位:元)</span>
                    <a onClick={this.btnClick}>查持仓详情</a>
                </h3>
                <div className={this.mergeClassName(styles.network_list, styles.investment_data)}>
                    <div className={styles.network_list_floor}>
                       <ProfileItem num={tyEarnRateOpt} title='今年自主操作' titles='盈亏率(%)' clos={styles.blue}/>
                       <ProfileItem num={maxHoldProductSingleValue} title='历史产品峰值' titles='(日期)' Date={maxHoldProductSingleDate} showDate={true} clos={styles.red}/>
                       <ProfileItem num={tyBalanceNetflow} title='近一年资金' titles='净流入' clos={styles.red}/>
                   </div>
                   <div className={styles.network_list_floor}>
                       <ProfileItem num={hisBalanceNetflow} title='历史资金' titles='净流入' clos={styles.red}/>
                       <ProfileItem num={tyBuyOfstockBalance} title='近一年产品' titles='购买量' clos={styles.black}/>
                       <ProfileItem num={lastestFundTradeDay} title='最近购买产品' titles='时间' clos={styles.black}/>
                    </div>
                    <div className={styles.network_list_floor}>
                       <ProfileItem num={lyTurnOverRateDouble} title='近一年综合' titles='周转率(%)' clos={styles.blue}/>
                       <ProfileItem num={maxHoldStockDayNum} title='历史单只产品' titles='最长持有天数' clos={styles.black}/>
                       <ProfileItem num={maxHoldOfstockNumber} title='历史持仓产品' titles='数量峰值' clos={styles.black}/>
                    </div>
                </div>
            </div>
        )
    }
}

function injectAction() {
    return {gotoDetail};
}

function injectProps(state){
    var {investadvice} = state.base || {},
        {from,params} = investadvice;
    return {from,params};
}

module.exports = connect(injectProps, injectAction())(Profile);
