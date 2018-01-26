import {connect} from 'react-redux';
import {getTradeRank} from '../../actions/home/homeAction';
import {gotoDetail} from '../../../../store/actions';

import Category from '../../../../components/common/category/Category';
import SwipeableTable from '../../../../components/common/swipeable/SwipeableTable';
import TextFlat from '../../../../components/common/category/TextFlat';
import TradeItem from './TradeItem';

import styles from '../css/home/tradeRank.css';

//当日交易龙虎榜
class TradeRank extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            data:{},
            loading:true,
            touch:false
        }
    }

    componentDidMount(){
        //获取停留页面刷新时间
        var freshTime = systemApi.getValue("config_page_home_refresh");
        this.props.getTradeRank(false, this, this.setRanks);

        this.interval = setInterval(()=>{
            this.props.getTradeRank(true, this, this.setRanks);
        },freshTime);
    }

    componentWillUnmount(){
        //清除计时器
        clearInterval(this.interval);
        super.componentWillUnmount();
    }

    setRanks = (data)=>{
        this.setState({data,loading:false});
    }

    //点击跳转全景图
    itemClick = (clientId)=>()=>{
        this.props.gotoDetail(clientId);
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    renderItems(data){
        var {touch} = this.state;

        return data.map((item,index)=>{
            var {CLIENT_ID,CLIENT_NAME,FUND_ACCOUNT,TRADE_FLAG,BUSINESS_BALANCE,BUSINESS_BALANCE_MC,BUSINESS_BALANCE_MR,RN} = item,
                newObj = {CLIENT_ID,CLIENT_NAME,FUND_ACCOUNT,TRADE_FLAG,BUSINESS_BALANCE,BUSINESS_BALANCE_MC,BUSINESS_BALANCE_MR,RN};

            return (<TradeItem {...newObj} />);
        });
    }

    //渲染table
    renderTable(data, start, end){
        if(data.length < start+1) return null;

        return (
            <div className={styles.rank_list}>
                {this.renderItems(data.slice(start,end))}
            </div>
        );
    }

    renderUI(){
        var {data,loading} = this.state;
        if(loading){
            return (
                <div className={styles.noData}>加载中...</div>
            );
        }

        if(data.isValidTime == "0"){
            return (
                <div className={styles.opening}>
                    <p className={this.mergeClassName(styles.font18, Font.font18)}>开市时间</p>
                    <p className={Color.c6}>暂不提供龙虎榜查询</p>
                </div>
            );
        }
        else{
            var list = data.list;
            if(list.length){
                return (
                    <SwipeableTable>
                        {this.renderTable(list,0,5)}
                        {this.renderTable(list,5,10)}
                        {this.renderTable(list,10,15)}
                    </SwipeableTable>
                );
            }
            else{
                return (
                    <div className={this.mergeClassName(styles.opening, styles.data_empty)}>
                    	<p className={this.mergeClassName(styles.font18, Font.font18)}>哎呦喂！</p>
                        <p className={styles.c6}>你名下客户居然没有交易哦!</p>
                    </div>
                );
            }
        }

    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TradeRank render");
        return (
            <div>
                <Category title="当日交易龙虎榜" borderColor="none" iconElement={<TextFlat type="normal" text="单位:(万元)"/>}>
                    {this.renderUI()}
                </Category>
            </div>
        );
    }

}

function injectAction(){
    return {getTradeRank,gotoDetail};
}

module.exports = connect(null,injectAction())(TradeRank);
