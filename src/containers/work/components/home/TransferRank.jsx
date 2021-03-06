import {connect} from 'react-redux';
import {getTransferRank} from '../../actions/home/homeAction';

import Category from '../../../../components/common/category/Category';
import SwipeableTable from '../../../../components/common/swipeable/SwipeableTable';
import TextFlat from '../../../../components/common/category/TextFlat';
import TransferItem from './TransferItem';

import styles from '../css/home/tradeRank.css';

//当日银证转账
class TransferRank extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            data:[],
            loading:true
        }
    }

    componentDidMount(){
        //获取停留页面刷新时间
        var freshTime = systemApi.getValue("config_page_home_refresh");
        this.props.getTransferRank(false, this, this.setRanks);

        this.interval = setInterval(()=>{
            this.props.getTransferRank(true, this, this.setRanks);
        },freshTime);
    }

    componentWillUnmount(){
        //清除计时器
        clearInterval(this.interval);
        super.componentWillUnmount();
    }

    setRanks = (list)=>{
        this.setState({data:list,loading:false});
    }

    renderItems(data){
        return data.map((item,index)=>{
            var {CLIENT_ID, CLIENT_NAME,FUND_ACCOUNT,OCCUR_BALANCE,IN_BALANCE,OUT_BALANCE,RN} = item,
                newObj = {CLIENT_ID, CLIENT_NAME,FUND_ACCOUNT,OCCUR_BALANCE,IN_BALANCE,OUT_BALANCE,RN};
            return (<TransferItem {...newObj}/>);
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

        if(data.length){
            return (
                <SwipeableTable>
                    {this.renderTable(data,0,5)}
                    {this.renderTable(data,5,10)}
                    {this.renderTable(data,10,15)}
                </SwipeableTable>
            );
        }
        else{
            return (
                <div className={this.mergeClassName(styles.opening, styles.data_empty)}>
                	<p className={this.mergeClassName(styles.font18, Font.font18)}>哎呦喂！</p>
                    <p className={styles.c6}>你名下客户没有资金进出哦！</p>
                </div>
            );
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("TransferRank render");
        return (
            <div>
                <Category title="当日银证转账" borderColor="none" iconElement={<TextFlat type="normal" text="单位:(万元)"/>}>
                    {this.renderUI()}
                </Category>
                <div className="blank"></div>
            </div>
        );
    }

}

function injectAction(){
    return {getTransferRank};
}

module.exports = connect(null,injectAction())(TransferRank);
