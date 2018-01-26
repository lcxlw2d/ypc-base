import {connect} from 'react-redux';
import {gotoDetail, FROM_HOME_PAGE} from '../../../../store/actions';

import styles from '../css/home/tradeRank.css';

//当日交易龙虎榜Item
class TradeItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        }
    }

    //点击跳转全景图
    itemClick = ()=>{
        var {CLIENT_ID} = this.props;
        this.props.gotoDetail(CLIENT_ID, FROM_HOME_PAGE);
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TradeItem render");

        var {CLIENT_NAME,FUND_ACCOUNT,TRADE_FLAG,BUSINESS_BALANCE,BUSINESS_BALANCE_MC,BUSINESS_BALANCE_MR,RN} = this.props,
            {touch} = this.state,
            type = TRADE_FLAG=="01"?"普通":"信用";

        return (
            <div className={this.mergeClassName(styles.single_rank, touch?styles.touch:"")} onClick={this.itemClick} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                <div className={styles.rank_tit}>
                    <i className={styles.rank_num}>Top{RN}</i>
                    <span className={styles.rank_nm}>{CLIENT_NAME}</span>
                    <span className={styles.rank_account}>[{FUND_ACCOUNT}]</span>
                    <i className={styles.rank_type}>{type}</i>
                    <div className={styles.fr}>
                        <span className={this.mergeClassName(styles.c6, Color.c6, styles.rank_deal)}>成交金额:</span>
                        <span className={this.mergeClassName(Color.red, styles.deal_num)}>{BUSINESS_BALANCE}</span>
                    </div>

                </div>
                <div className={styles.rank_detail}>
                	<span className={styles.rd_tit}>详情</span>
                    <div className={styles.rd_dt}>
                    	<span className={this.mergeClassName(styles.c6, Color.c6)}>买入:</span>
                        <span>{BUSINESS_BALANCE_MR}</span>
                        <span className={this.mergeClassName(styles.c6, Color.c6)}>/</span>
                        <span className={this.mergeClassName(styles.c6, Color.c6)}>卖出:</span>
                        <span>{BUSINESS_BALANCE_MC}</span>
                    </div>
                </div>
            </div>
        )

    }

}

function injectAction(){
    return {gotoDetail};
}

module.exports = connect(null,injectAction())(TradeItem);
