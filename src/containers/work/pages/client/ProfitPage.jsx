import {connect} from 'react-redux';
import {call, } from '../../actions/client/summary/summaryAction';
import { shareECard, getAssetData, getAnalysisData, getIndustryData, getIndexData, getTop5stockData, getCompositionData, getListData} from '../../actions/client/profitPageAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import ProfitTabChange from '../../components/client/profit/ProfitTabChange';
import Compared from '../../components/client/profit/Compared';
import Asset from '../../components/client/profit/Asset';
import KouJing from '../../components/client/profit/KouJing';
import ProfitChart from '../../components/client/profit/ProfitChart';
import ProPie from '../../components/client/profit/ProPie';
import ProTwoTable from '../../components/client/profit/ProTwoTable';
import BarNoY from '../../components/client/profit/BarNoY';
import ProfitRadar from '../../components/client/profit/ProfitRadar';
import ProfitShaiXuan from '../../components/client/profit/ProfitShaiXuan';
import styles from './css/profitPage.css';

/** 客户-全景图-盈亏 **/
class ProfitPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state ={
            showTop:false,
            tabValue:'本月',
            index:0,
            index2:0,
            tabValue2:'上证',
            canvas:'',
            showKouJing:false,
            showShaiXuan:false,
            ShaiXuanList:[],
            assetData:{},          //资产情况
            AnalysisData:{},       //偏好分析
            industrynameXData:[],  //行业盈亏-行业名称
            industryIncomeDate:[], //行业盈亏-行业收益
            Top5False:[],          //亏损TOP5
            Top5True:[],           //盈利TOP5
            CompositionData:[],    //客户盈利构成
            ListData:{record:[]},  //盈亏分析折线图
            indexData:{record:[]}, //盈亏分析折线图
            incomeRangeRate:'--',  //客户收益率
            indexRangeRate:'--',   //入参收益率
            subindexRate:'--',     //收益率差额(已废弃)
            incomeBalance:'--',    //盈亏
            rateMaxDate:'',        //客户最大收益率出现日期
        }
        this.tabWeiZhi = 0;
    }

    //获取页面名称
    getPageName(){ return "客户全景图_盈亏"; }

    //拨打电话
    callFunc = ()=>{
        var {mobileTel,clientName,clientId} = this.props,systemType = systemApi.getValue("systemType");
        this.props.call(mobileTel,systemType,clientName,clientId,this.succ);
    }

    succ = (blen)=>{
        let {mobileTel, clientName, clientId, fundAccount} = this.props, params={};
        params = {mobileTel, clientName, clientId, fundAccount};
        params = JSON.stringify(params);
        if(blen){
            systemApi.setValue("quanjingtu_recordpage", params);
            systemApi.setValue("recordpage", 1);
            hashHistory.push("/work/client/record/0")
        }
    }

    renderIcons() {
        return [
            <HeaderIcon iconCls="phone" onClick={this.callFunc}/>
        ]
    }
//以下为新增方法//////////////////////////////////////////////////////////////////////////////////////////////////////////


componentDidMount(){
    let { index, index2 } = this.state;
    window.addEventListener("resize", this.onResize);
    Client.setAndroidKeyboardResponseOpen(true);
    this.getTab()
    this.getListData(index, this.props)
    this.getIndexData(index, index2, this.props)
    this.getAssetData(index, this.props)
    this.getAnalysisData(index, this.props)
    this.getIndustryData(index, this.props)
    this.getTop5stockData(index, 1, this.props)
    this.getTop5stockData(index, 2, this.props)
    this.getCompositionData(index, this.props)
}

componentWillUnmount(){
    window.removeEventListener("resize", this.onResize);

}

onResize = ()=>{
    var {activeElement} = document,
        {tagName} = activeElement;
    if(tagName=="INPUT" || tagName=="TEXTAREA") {
       window.setTimeout(function() {
           activeElement.scrollIntoViewIfNeeded(true);
       },0);
    }
}

//获取资产情况数据
getAssetData = (index, props) => {
    this.props.getAssetData({range:index+1, clientId:props.clientId}, assetData => {
        this.setState({ assetData})
     }, this)
}

//获取偏高分析数据
getAnalysisData = (index, props) => {
    this.props.getAnalysisData({range:index+1, clientId:props.clientId}, analysisData => {
        this.setState({ analysisData })
     }, this)
}

//查询客户行业盈亏信息
getIndustryData = (index, props) => {
    this.props.getAnalysisData({range:index+1, clientId:props.clientId}, data => {
        let industrynameXData=[], industryIncomeDate=[];
        data.record.map((item, index) => {
            let {industryname, industryIncome} = item;
            industrynameXData[index] = industryname;
            industryIncomeDate[index] = industryIncome;
        })
        this.setState({industrynameXData, industryIncomeDate})
     }, this)
}

//查询客户盈亏TOP5股票信息
getTop5stockData = (index, incmtype, props) => {
    this.props.getTop5stockData({range:index+1, clientId:props.clientId, incmtype:incmtype}, data => {
        if(incmtype==2){
            this.setState({Top5False:data.record})
        }else{
            this.setState({Top5True:data.record})
        }

    }, this)
}

//查询客户盈利构成信息
getCompositionData = (index, props) => {
    this.props.getAnalysisData({range:index+1, clientId:props.clientId}, data => {
        let { stockIncome, fundIncome, financeIncome, otherIncome} = data, CompositionData = [stockIncome, fundIncome, financeIncome, otherIncome];
        this.setState({ CompositionData })
     }, this)
}

//查询客户证券数据
getListData = (range, props) => {
    this.props.getListData({range:range+1, clientId:props.clientId}, ListData => {
        let {incomeRangeRate, incomeBalance, rateMaxDate} = ListData;
        this.setState({ListData, incomeRangeRate, incomeBalance, rateMaxDate})
    }, this)
}

//查询选中的基金数据
getIndexData = ( range, index, props ) => {
    this.props.getIndexData({range:range+1, index:index+1, clientId:props.clientId}, indexData => {
        let { indexRangeRate } = indexData;
        this.setState({indexData, indexRangeRate})
    }, this)
}


//渲染回到顶部按钮
renderToTop = () => {
    return[<div className={styles.totop} onClick={this.toTop}><span>回<br />到<br />顶<br />部</span></div>]
}

//回到顶部方法
toTop = () => {
    let {Profit_position} = this.refs;
    this.setState({showTop:false})
    Profit_position.scrollTop(0);
}

//tab定位监听
tabToTop = (scrollLeft, scrollTop) => {
    let{showTop = false} = this.state;

    if(scrollTop >=this.tabWeiZhi){

        this.setState({showTop:true})

    }else{

        this.setState({showTop:false})

    }
}

//获取tab按钮的位置
getTab = () => {
    let  tab = this.refs.pro_tabs;
    this.tabWeiZhi = tab.offsetTop;
}

//切换主Tab页
tabChange = index => {
    let {Profit_position} = this.refs, { isScroll } = Profit_position.state, tabValue='本月';
    // console.log(isScroll)
    switch (index) {
        case 0:
            tabValue='本月'
            break;
        case 1:
            tabValue='近三月'
            break;
        case 2:
            tabValue='近半年'
            break;
        case 3:
            tabValue='近一年'
            break;
        default:
            break;
    }
    if(!isScroll){
        this.setState({index, tabValue}, () => {

            let  { showTop } = this.state;

            if(showTop == false)return;
            // if(index==3)this.setState({showTop:false});
            Profit_position.scrollTop(this.tabWeiZhi);
        });
    this.getListData(index, this.props)
    this.getIndexData(index, this.state.index2, this.props)
    this.getAssetData(index, this.props)
    this.getAnalysisData(index, this.props)
    this.getIndustryData(index, this.props)
    this.getTop5stockData(index, 1, this.props)
    this.getTop5stockData(index, 2, this.props)
    this.getCompositionData(index, this.props)
    }
}

tabChange2 = index2 => {
    let   tabValue2='上证';
    switch (index2) {
        case 0:
            tabValue2='上证'
            break;
        case 1:
            tabValue2='深证'
            break;
        case 2:
            tabValue2='创业板'
            break;
        case 3:
            tabValue2='沪深300'
            break;
        default:
            break;
    }

    this.setState({index2, tabValue2})
    this.getIndexData(this.state.index, index2, this.props)


}

goToJzm = () => {
        window.location.href = "../dist/index.html";
}

//分享到微信
goToWechat = () => {
    var {showdiv} = this.refs, {main, origin} = this.refs.Profit_position.refs;
    if(main){
        this.props.shareECard('', this, main, showdiv, () => {})
    }
    if(origin){
        this.props.shareECard('', this, main, showdiv, () => {})
    }
}

//关闭口径说明
closeKouJing = () => {
    this.setState({showKouJing:false})
    this.props.hiddrenBottom(false)
}

//打开口径说明
goToKouJing = () => {
    this.setState({showKouJing:true, showTop:false})
    this.props.hiddrenBottom(true)

}

//打开纠错
goToShaiXuan = () => {
    setTimeout(() => {
        this.setState({showShaiXuan:true})
    }, 0);
}


//关闭纠错
closeShaiXuan = () => {
    this.setState({showShaiXuan:false})
}


//更新纠错列表
changeShaiXuan = ShaiXuanList => {
    this.setState({ShaiXuanList})
}







//以上为新增方法//////////////////////////////////////////////////////////////////////////////////////////////////////////
    render() {
        systemApi.log("ProfitPage render");

        var {clientName} = this.props,
        { tabValue, index, showTop, tabValue2, index2, showKouJing, ShaiXuanList, showShaiXuan, assetData, analysisData={}, industrynameXData, industryIncomeDate, Top5False, Top5True, CompositionData, ListData, indexData, incomeRangeRate, indexRangeRate, subindexRate, incomeBalance, rateMaxDate} = this.state,
        { avgDailyRate,	avgDailyRank, sectorPrefer, sectorRank, backMax, backMaxRank, holdCntl, timeSelect,	stockSelect, profitGain, riskMgr, incomeRank, } = analysisData;

        return (
            //旧页面
            // <div>
            //     <AppHeader headerName={clientName} theme="red" iconRight={this.renderIcons()} onBackClick={this.props.onBackClick}/>
            //     <Content withBottom={false} iscroll={false}>
            //         <div className={styles.coming}>
            //             <img src="./images/work/client/bg_coming.gif"/>
            //             <p>我们的程序员正在挑灯夜战努力建设中......</p>
            //             <div className={styles.text_coming}></div>
            //         </div>
            //     </Content>
            // </div>
            <div>
                {showKouJing?<AppHeader headerName="口径说明" theme="red" onBackClick={this.closeKouJing}/>:<AppHeader headerName={clientName} theme="red" iconRight={this.renderIcons()} onBackClick={this.props.onBackClick}/>}
                {/*  */}
                {showKouJing?<KouJing />:
                    <Content  ref='Profit_position' probeType={3}  onScroll={this.tabToTop} withBottom={false}>
                    <div ref='showdiv' >
                        <div className={styles.profit_banner}>
           		            <div className={styles.prodiv01}>{tabValue}盈亏</div>
                            <div className={styles.prodiv02}><span className={styles.f76}></span><span className={styles.f76}>{incomeBalance!='--'?(incomeBalance>=0?`+${incomeBalance}`:incomeBalance):'--'}</span><span className={styles.f30}>元</span></div>
                            <div className={styles.prodiv03}><span>收益率</span><span></span><span className={styles.f42}>{incomeRangeRate!='--'?(incomeRangeRate>=0?`+${incomeRangeRate*100}%`:incomeRangeRate*100+'%'):'--%'}</span></div>
                            <div className={styles.jzm_flag} onClick={this.goToJzm}></div>
                        </div>
                        <div ref='pro_tabs' className={styles.pro_tabs}>
                            <ProfitTabChange index={index} onTabChange={this.tabChange}>
                                <a className={index==0?styles.on:""}>本月</a>
                                <a className={index==1?styles.on:""}>近三月</a>
                                <a className={index==2?styles.on:""}>近半年</a>
                                <a className={index==3?styles.on:""}>近一年</a>
                            </ProfitTabChange>
                        </div>
                        <div className={styles.columnbox}>
                            <ProfitChart ListData={ListData} rateMaxDate={rateMaxDate} indexData ={indexData} />
                            <div className={styles.cldiv02}>
                            <ProfitTabChange index={index} onTabChange={this.tabChange2}>
                	            <a className={index2 == 0?styles.on:''}>上证 </a>
                                <a className={index2 == 1?styles.on:''}>深证</a>
                                <a className={index2 == 2?styles.on:''}>创业板</a>
                                <a className={index2 == 3?styles.on:''}>沪深300</a>
                            </ProfitTabChange>
                            </div>
                            <Compared tabValue={tabValue} tabValue2={tabValue2} myIncome={incomeRangeRate} otherIncome={indexRangeRate} />
                        </div>
                        <Asset data={assetData}/>
                        <div className={styles.columnbox}>
                            <div className={styles.cl_tit}>
                	            <center>盈利构成</center>
                                <span className={styles.unitof}>(单位：元)</span>
                            </div>
                            <BarNoY end={4} data={CompositionData}/>
                            <ProTwoTable data={Top5False} name='盈利个股'  color='red' />
                            <ProTwoTable data={Top5True} name='亏损个股' color='green' />
                            <div className={styles.cldiv04}>
                                <h1><span>行业盈利概览</span><span className={styles.unitof}>(单位：元)</span></h1>
                                <BarNoY data={industryIncomeDate} xData={industrynameXData} end={8}/>
                            </div>
                        </div>
                        <div className={styles.columnbox}>
                            <div className={styles.cl_tit}>
                	            <center>偏好分析</center>
                            </div>
                            <div className={styles.circle05}>
                                <ProPie name="日均换手率" value = {avgDailyRate} rank={avgDailyRank} color={'#ff4433'}/>
                                <ProPie name='投资偏好中小板' value = {sectorPrefer} rank={sectorRank} color={'#3492e9'}/>
                                <ProPie name='最大回撤' value = {backMax} rank={backMaxRank} color={'#ff9743'}/>
                            </div>
                            <div className={styles.ac_chart}>
                	            <i onClick={this.goToKouJing}></i>
                                {/* <img src="./images/work/client/account/img05.png" /> */}
                                <ProfitRadar holdCntl={holdCntl} timeSelect={timeSelect} stockSelect={stockSelect}	profitGain={profitGain} riskMgr={riskMgr}/>
                            </div>
                            <div className={styles.rate}>
                	            <h1>收益率超过<span>{incomeRank?`${incomeRank*100}%`:'--%'}</span>的股民</h1>
                                {/* <div className={styles.rate_pro}>
                                    <div className={styles.probox}>
                                        <div className={styles.pro_num} style={{width:'60%'}}></div>
                                        <div className={styles.pro_addr} style={{left:'30%'}}>
                                            <i className={styles.proi}></i>
                                            <div className={styles.protipbox}>
                                                <p>您的位置</p>
                                                <div>
                                                    <b className={styles.pt_top}><i className={styles.top_arrow1}></i><i className={styles.top_arrow2}></i></b>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={styles.ct_intro}>
                                        <span className={styles.left}>亏损股民</span>
                                        <span className={styles.left}>盈利股民</span>
                                    </div>
                                </div> */}
                            </div>
                            <div className={styles.chartint}>以上数据分析仅供投资者参考,不构成任何投资建议,也不作为投资者作出投资决策的唯一参考因素，投资者应自主决定投资决策,本公司不对投资者的投资决策承担任何责任。投资者需了解投资品种的具体情况,并根据风险承受能力及偏好选择适合的投资品种自主作出投资决策。市场有风险,投资需谨慎。
                            </div>
                        </div>
                        {/* <!--投资意见 star--> */}
                        <div  className={styles.opinion}>
           	                <div className={styles.op_text}><textarea placeholder="请填写给客户的投资意见（非必填）"></textarea></div>
                            <div className={styles.op_btn}>
                                <a>保存</a>
                                <a onClick={this.goToWechat}>分享至微信</a>
                            </div>
                        </div>
                        {/* <!--投资意见 over--> */}
                        <div className={styles.error_correct}>
                            <p>纠错：数据不准确<span className={styles.red} onClick={this.goToShaiXuan}>点这里</span></p>
                        </div>
                        {/* <!--纠错 over--> */}
                    </div>
                    </Content>}
                    {showShaiXuan?<ProfitShaiXuan list={ShaiXuanList} close={this.closeShaiXuan} change={this.changeShaiXuan}/>:null}
                    {showKouJing?null:this.renderToTop()}
                    {showTop?<div  className={this.mergeClassName(styles.pro_tabs, styles.Top)}><ProfitTabChange index={index} onTabChange={this.tabChange}>
                                <a className={index==0?styles.on:""}>本月</a>
                                <a className={index==1?styles.on:""}>近三月</a>
                                <a className={index==2?styles.on:""}>近半年</a>
                                <a className={index==3?styles.on:""}>近一年</a>
                            </ProfitTabChange></div>:null}
            </div>

        );
    }

}

function injectAction() {
    return {call, shareECard, getIndexData, getAssetData, getAnalysisData, getIndustryData, getTop5stockData, getCompositionData, getListData};
}

function injectProps(state){
    var {client}=state.base || {},
    {clientId} = client, {clientName, mobileTel, fundAccount} = state.client || {};
    return {clientName,  mobileTel, clientId, fundAccount};
}
module.exports = connect(injectProps, injectAction())(ProfitPage);
