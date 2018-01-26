import {connect} from 'react-redux';
// //公共库
import _ from 'lodash';
//私有
// import {getAttendList, ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../../actions/home/attend/attendAction';
import BarLine from './BarLine';
import List from './List';
import {getTradeData} from '../../../actions/home/employeeValue/PerformanceAction';
import styles from '../../css/home/employeeValue/Performance.css';


class Trade extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:{},
            mySelect:false,
            mySelectValue:"本月",
            mySelectValue2:"本年",
            searchRangeValue:"全司",
            searchRange:1,
        }

    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.props.getTradeData(data => { this.setState({data});this.props.setUpdateTime(data.updateTime) }, this)
    }

    //我的江湖总榜
    renderMyList = (...data) => {

        let {stocktradeVolumeM='---', stocktradeVolumeY='---', stocktradeVolumeOrgM='---', stocktradeVolumeBraM='---', stocktradeVolumeOrgY='---', stocktradeVolumeBraY='---', stocktradeRankM='--', stocktradeRankY='--' } = this.state.data;

        stocktradeVolumeM=stocktradeVolumeM.toLocaleString();
        stocktradeVolumeY=stocktradeVolumeY.toLocaleString();

        return [<div className={styles.table_top}>
                    <h1 className={styles.h_left}>我的江湖总榜</h1>
                    <div className={styles.rt_ranking}>
                        <span>本月第</span>
                        <span className={styles.redbg}>{stocktradeRankM}</span>
                        <span>名</span>
                        <span>本年第</span>
                        <span className={styles.bluebg}>{stocktradeRankY}</span>
                        <span>名</span>
                    </div>
                </div>,
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <th>指标</th>
                            <th>本月</th>
                            <th>本年</th>
                        </tr>
                        <tr>
                            <td className={styles.tt_left}>股基交易量</td>
                            <td><span className={Color.red}>{stocktradeVolumeM}</span>万</td>
                            <td><span className={Color.red}>{stocktradeVolumeY}</span>万</td>
                        </tr>
                        <tr>
                            <td className={styles.tt_left}>股基交易份额<br />营业部/分公司</td>
                            <td><span className={Color.red}>{`${stocktradeVolumeOrgM}%/${stocktradeVolumeBraM}%`}</span></td>
                            <td><span className={Color.red}>{`${stocktradeVolumeOrgY}%/${stocktradeVolumeBraY}%`}</span></td>
                        </tr>
                    </tbody>
                </table>]
    }

    //我的江湖总榜表格2
    renderMyList2 = (...data) => {

                let { netfareStockRankM='---', netfareStockRankY='---', netfareStockGrowthM='---',  netfareStockGrowthY='--'} = this.state.data;

                netfareStockGrowthM = netfareStockGrowthM.toLocaleString();
                netfareStockGrowthY = netfareStockGrowthY.toLocaleString();

                return [<div className={this.mergeClassName(styles.table_top, styles.padtp)}>
                            <div className={styles.rt_ranking}>
                                <span>本月第</span>
                                <span className={styles.redbg}>{netfareStockRankM}</span>
                                <span>名</span>
                                <span>本年第</span>
                                <span className={styles.bluebg}>{netfareStockRankY}</span>
                                <span>名</span>
                            </div>
                        </div>,
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <th>指标</th>
                                    <th>本月</th>
                                    <th>本年</th>
                                </tr>
                                <tr>
                                    <td className={styles.tt_left}>股基净佣金</td>
                                    <td><span className={Color.red}>{netfareStockGrowthM}</span>元</td>
                                    <td><span className={Color.red}>{netfareStockGrowthY}</span>元</td>
                                </tr>

                            </tbody>
                        </table>]
            }
    //列表查询条件
    renderChaXun = () => {
        let {mySelect, mySelectValue='', mySelectValue2='', searchRangeValue='全司'}=this.state;
        return[<div className={styles.rank_tab}>
                    <ul onClick={this.getSearchRange} style={{overflow:"hidden"}}>
                        <li className={this.mergeClassName(styles.rktab01, searchRangeValue=='全司'?styles.on:'')}><a>全司</a></li>
                        <li className={this.mergeClassName(styles.rktab02, searchRangeValue=='分公司'?styles.on:'')}><a>分公司</a></li>
                        <li className={this.mergeClassName(styles.rktab03, searchRangeValue=='营业部'?styles.on:'')}><a>营业部</a></li>
                    </ul>
                </div>,
                <div className={styles.selectbtn} onClick={this.myFenZu1}>
                    <a className={styles.on}>{mySelectValue}</a>
                    {mySelect?<ul><li><a>{mySelectValue2}</a></li></ul>:null}
                </div>]
            }

        //列表获取查询范围
        getSearchRange = e => {
            let {searchRangeValue='全司', searchRange} = this.state, text='';
            text = e.target.innerText;
            this.setState((prevState, props) => {
                if(prevState.searchRangeValue==text)return{};
                if(text=='全司') searchRange = 1;
                if(text=='分公司') searchRange = 2;
                if(text=='营业部') searchRange = 3;

                return {searchRangeValue:text, searchRange:searchRange}

            })


        }

        //列表切换本月/本年按钮
        myFenZu1= e => {
            let {mySelect, mySelectValue='', mySelectValue2 = ''} = this.state, text='';
            text = e.target.innerText.length>2?mySelectValue:e.target.innerText;
            this.setState((prevState, props) => {
                if(prevState.mySelect==false){
                    if(prevState.mySelectValue=='本月'){
                        mySelectValue2 = '本年'
                    }else if(prevState.mySelectValue=='本年'){
                        mySelectValue2 = '本月'
                    }
                    return{mySelect: !prevState.mySelect, mySelectValue2}
                }else{
                    return {mySelect: !prevState.mySelect,  mySelectValue:text}
                }
             });
        }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Assets render");

        let{mySelectValue='本月', searchRange='1'}=this.state, {dateArray=[], stocktradeArray=[], netfareStockArray=[]} = this.state.data, maxY1, maxY2;
        mySelectValue = mySelectValue=='本年'?'year':'month';
        //console.log(netfareStockArray)
        maxY1 = stocktradeArray.length>0? _.max( stocktradeArray):0;
        maxY2 = netfareStockArray.length>0? _.max(netfareStockArray):'';
        maxY1 = maxY1?Math.ceil(maxY1/10)*10:0;
        maxY2 = maxY2?Math.ceil(maxY2/10)*10:0;

        return (
                <div>
                    <div className={styles.myinnerbox}>
                        <div className={this.mergeClassName(styles.mytable, styles.myrank)}>
                            {this.renderMyList()}
                            {this.renderMyList2()}
                        </div>
                        <BarLine title='近半年交易走势图' maxY1={maxY1} maxY2={maxY2} dateArray={dateArray} colorArray={['#e1624e', '#91dcf1']} seriesArray={[{name:'交易量', stack: '总量', type:'bar', data:stocktradeArray }, {name:'净佣金', type:'line', yAxisIndex: 1, data:netfareStockArray } ]} legendArray={['交易量', '净佣金']} barName='' lineName='' showLine={true}/>
                        <div className={styles.vl_rank}>
                            {this.renderChaXun()}
                            <div className={styles.ranklistbox}>
                                <List danWei='%'  orderField='KHGJJYLZB' orderType={mySelectValue} searchRange={searchRange} title='谁的门派份额最多？' titleTip='名下客户股基交易量占比排名'/>
                                <List danWei='万'  orderField='XKKHGJJYL' orderType={mySelectValue} searchRange={searchRange} title='谁的门派新弟子交易最多？' titleTip='名下新开客户股基交易量排名'/>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}


function injectAction() {
    return {getTradeData};
}

module.exports = connect(null, injectAction())(Trade);
