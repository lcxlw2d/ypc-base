import {connect} from 'react-redux';
// //公共库
import _ from 'lodash';
//私有
// import {getAttendList, ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../../actions/home/attend/attendAction';
import BarLine from './BarLine';
import List from './List';
import {getAssetData} from '../../../actions/home/employeeValue/PerformanceAction';
import styles from '../../css/home/employeeValue/Performance.css';


class Assets extends PureComponent {

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
        this.props.getAssetData(data => { this.setState({data});this.props.setUpdateTime(data.updateTime) }, this)
    }

    //我的江湖总榜
    renderMyList = (...data) => {

        let { insideTotalasset='---', insideTotalassetGrowthM='---', insideTotalassetGrowthY='---', assetRankM='--', assetRankY='--' } = this.state.data;

        insideTotalasset = insideTotalasset.toLocaleString();
        insideTotalassetGrowthM = insideTotalassetGrowthM.toLocaleString();
        insideTotalassetGrowthY = insideTotalassetGrowthY.toLocaleString();


        return [<div className={styles.table_top}>
                    <h1 className={styles.h_left}>我的江湖总榜</h1>
                    <div className={styles.rt_ranking}>
                        <span>本月第</span>
                        <span className={styles.redbg}>{assetRankM}</span>
                        <span>名</span>
                        <span>本年第</span>
                        <span className={styles.bluebg}>{assetRankY}</span>
                        <span>名</span>
                    </div>
                </div>,
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <th>体内资产</th>
                            <th>本月净增</th>
                            <th>本年净增</th>
                        </tr>
                        <tr>
                            <td className={styles.tt_left}><span className={Color.red}>{insideTotalasset}</span>万元</td>
                            <td><span className={Color.red}>{insideTotalassetGrowthM}</span>万元</td>
                            <td><span className={Color.red}>{insideTotalassetGrowthY}</span>万元</td>
                        </tr>
                    </tbody>
                </table>]
    }

    //资产对比
    renderDuiBi = () => {
        let {outsideTotalasset='---', insideTotalasset='---'}=this.state.data, blue=0, red = 0;

        if(typeof(outsideTotalasset)=='number' && typeof(insideTotalasset)=='number'){

            blue = Math.floor(insideTotalasset/(insideTotalasset+outsideTotalasset)*100);
            red = 100-blue;
        }

        insideTotalasset = insideTotalasset.toLocaleString();
        outsideTotalasset = outsideTotalasset.toLocaleString();

        return [<div className={styles.processbar}>
                    <div className={styles.proc_bar}>
                        <ul>
                            <li className={styles.bar01} style={{width:`${blue}%`}}></li>
                            <li className={styles.bar02} style={{width:`${red}%`}}></li>
                        </ul>
                    </div>
                    <div className={styles.proc_text}>
                        <div className={styles.proctt01}>体内资产：<span className={styles.vl_blue}>{insideTotalasset}</span>万元</div>
                        <div className={styles.proctt01}>体外资产：<span className={styles.vl_red}>{outsideTotalasset}</span>万元</div>
                    </div>
                </div>]
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

        let{mySelectValue='本月', searchRange='1'}=this.state, {dateArray=[], insideTotalassetArray=[], outsideTotalassetArray=[]} = this.state.data, maxY2, maxY1;
        mySelectValue = mySelectValue=='本年'?'year':'month';
        maxY1 = insideTotalassetArray.length>0? _.max(insideTotalassetArray)+(outsideTotalassetArray.length>0?_.max(outsideTotalassetArray):0):0;
        maxY1 = maxY1?Math.ceil(maxY1/10)*10:0;
        maxY2 = 0;

        return (
                <div>
                    <div className={styles.myinnerbox}>
                        <div className={this.mergeClassName(styles.mytable, styles.myrank)}>
                            {this.renderMyList()}
                            {this.renderDuiBi()}
                        </div>
                        <BarLine title='近半年客户资产走势图' maxY2={maxY2} maxY1={maxY1} dateArray={dateArray} colorArray={['#e1624e', '#91dcf1']} seriesArray={[{name:'体内', stack: '总量', type:'bar', data:insideTotalassetArray },{name:'体外', stack: '总量', type:'bar', data:outsideTotalassetArray } ]} legendArray={['体内', '体外']} barName='(万元)' lineName='' showLine={false}/>
                        <div className={styles.vl_rank}>
                            {this.renderChaXun()}
                            <div className={styles.ranklistbox}>
                                <List danWei='万元'  orderField='TNZC' orderType={mySelectValue} searchRange={searchRange} title='谁的门派弟子资产量增长最快？' titleTip='客户体内资产增长榜'/>
                                <List danWei='万元'  orderField='LRYE' orderType={mySelectValue} searchRange={searchRange} title='谁的门派弟子信用业务增长最快？' titleTip='客户两融余额增长榜'/>
                                <List danWei='万元'  orderField='RJBZJ' orderType={mySelectValue} searchRange={searchRange} title='谁的门派弟子现金流最牛？' titleTip='客户日均保证金排行榜'/>
                                <List danWei='万元'  orderField='XKKHTNZC' orderType={mySelectValue} searchRange={searchRange} title='谁的门派弟子资产实力最高？' titleTip='今年新开客户体内资产排行榜'/>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}


function injectAction() {
    return {getAssetData};
}

module.exports = connect(null, injectAction())(Assets);
