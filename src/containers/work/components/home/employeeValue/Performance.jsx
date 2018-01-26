import {connect} from 'react-redux';
// import {getAttendList, ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../../actions/home/attend/attendAction';
import BattlePower from './BattlePower';
import BarLine from './BarLine';
import Assets from './Assets';
import MyClient from './MyClient';
import Trade from './Trade';
import LazyLoad from '../../../../../components/common/subtabs/LazyLoad';
import DivScroll from '../../../../../components/common/iscroll/DivScroll';
import TabChange from '../../../components/home/kingGliry/TabChange';
import PerformanceTabChange from './PerformanceTabChange'
import {getMyCombatPower} from '../../../actions/home/employeeValue/PerformanceAction';
import styles from '../../css/home/employeeValue/Performance.css';

class Performance extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            myCombatPower:{},           //我的战力接口数据
            mySelect:false,             //我的战力切换按钮是否开启
            mySelectValue:"本年",       //我的战力切换按钮选择选项//在该项设置默认选择范围
            mySelectValue2:"本年",      //我的战力切换按钮未选择选项
            index:0,
            showTop:false,
            kernelDataUpdateTimes:'',
            isShow:false,
        }
        this.tabWeiZhi = 0;

    }

    componentDidMount() {
        // let {g_full} = this.refs;

        this.getData()
        this.getTab()

        // $(g_full).bind('scroll', this.tabToTop)
    }

    // componentDidUpdate() {
    //     this.getTab()
    // }

    // componentWillUnmount() {
    //     let {g_full} = this.refs;

    //     $(g_full).unbind();

    // }

    getData = () => {
        this.props.getMyCombatPower(myCombatPower => { this.setState({myCombatPower, isShow:!$.isEmptyObject(myCombatPower)}, () => {
            this.getTab()
        }) }, this)
    }

    //我的战力切换本月/本年按钮
    myFenZu1= e => {

        return;//关闭选择功能
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

     //切换tab
     tabChange = index => {
        let {g_full} = this.refs, { isScroll } = g_full.state;
        // console.log(isScroll)
        if(!isScroll){

            this.setState({index}, () => {

                let  { showTop } = this.state;

                if(showTop == false)return;
                if(index==3)this.setState({showTop:false});

                g_full.scrollTop(this.tabWeiZhi);
            });
        }
    }

    //获取vl_tab2位置
    getTab = () => {

        let  tab = this.refs.vl_tab2;
        this.tabWeiZhi = tab.offsetTop;


    }

    //vl_tab2绝对定位至顶部触发函数
    tabToTop = (scrollLeft, scrollTop) => {
        let{showTop = false} = this.state;

        if(scrollTop >=this.tabWeiZhi){

            this.setState({showTop:true})

        }else{

            this.setState({showTop:false})

        }
    }

    //
    toTop = () => {

        let {g_full} = this.refs;
        this.setState({showTop:false})
        g_full.scrollTop(0);

    }

    toKouJing = () => {
        hashHistory.push('/work/home/employeeValue/0/koujing')
    }

    setkernelDataUpdateTime = kernelDataUpdateTimes => {

        this.setState({kernelDataUpdateTimes})
    }


    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Performance render");
        //console.log(myCombatPower)
        let {myCombatPower={}, mySelectValue='', mySelectValue2='', mySelect, index=0, showTop=false, kernelDataUpdateTimes='', isShow} = this.state,
        {updateTime=0,
            kernelDataUpdateTime=0,
            userName='--',
            pictureUrl='./images/work/home/value/img01.png',
            employmentLevel='职级待定',
            employmentGrade='------',
            effectiveAssetCur=0,
            effectiveAsset=0,
            effectiveAssetComp=0,
            effectiveAssetCompText="--",
            netMarketincomeCur=0,
            netMarketioncome=0,
            netMarketincomeComp=0,
            netIncomeCompText="--",
            effectiveAssetM,
            effectiveAssetY,
            productIncomeM,
            productIncomeY,
            marginIncomeM,
            marginIncomeY,
            creditIncomeM,
            creditIncomeY,
            netFareIncomeM,
            netFareIncomeY,
            maxEffectiveAssetM,
            maxEffectiveAssetY,
            maxProductIncomeM,
            maxProductIncomeY,
            maxMarginIncomeM,
            maxMarginIncomeY,
            maxCreditIncomeM,
            maxCreditIncomeY,
            maxNetFareIncomeM=0,
            maxNetFareIncomeY,
            avgEffectiveAssetM,
            avgEffectiveAssetY,
            avgProductIncomeM,
            avgProductIncomeY,
            avgMarginIncomeM,
            avgMarginIncomeY,
            avgCreditIncomeM,
            avgCreditIncomeY,
            avgNetFareIncomeM,
            avgNetFareIncomeY,
            }=myCombatPower, gerenListM=[], gerenListY=[], pingjunListM=[], pingjunListY=[], updateTimes='';
            gerenListM = [netFareIncomeM, effectiveAssetM, productIncomeM, marginIncomeM, creditIncomeM];
            gerenListY = [netFareIncomeY, effectiveAssetY, productIncomeY, marginIncomeY, creditIncomeY];
            pingjunListM = [avgNetFareIncomeM, avgEffectiveAssetM, avgProductIncomeM, avgMarginIncomeM, avgCreditIncomeM];
            pingjunListY = [avgNetFareIncomeY, avgEffectiveAssetY, avgProductIncomeY, avgMarginIncomeY, avgCreditIncomeY];
            effectiveAssetComp = effectiveAsset==0?'--':`${effectiveAssetComp}%`;
            netMarketincomeComp = netMarketioncome==0?'--':`${netMarketincomeComp}%`;
        updateTimes=kernelDataUpdateTime?formatUtil.formatDate(kernelDataUpdateTime, "yyyy-MM-dd"):"--";
        kernelDataUpdateTimes = kernelDataUpdateTimes?kernelDataUpdateTimes:"--";
        // isShow = true

        return (
            //<DivScroll className={styles.frame} cb={this.tabToTop}>
            <div>
                <Content ref='g_full' probeType={3} className={styles.g_full_top} onScroll={this.tabToTop}>
                {/* <div ref='g_full' className={styles.g_full_content}> */}
                    <div className={styles.valuebox} style={{backgroundColor:"#e1624e"}}>
                        <div className={styles.valuebanner01}>
                            <a  className={styles.btn_explain} onClick={this.toKouJing}></a>
                            {/* <div className={styles.update_time}><span>最后更新时间：</span><span>{updateTimes}</span></div> */}
                        </div>
                        {isShow?<div className={styles.mybox}>
                            <div className={styles.myinnerbox}>
                                <div className={styles.myintro}>
                                    <div className={styles.my_portrait}><a><img src={pictureUrl} /></a></div>
                                    <div className={styles.my_grade}>
                                        <div className={styles.myname}>{userName}</div>
                                        <div className={styles.update_time}><span className={Color.c6}>更新时间：</span><span>{updateTimes}</span></div>
                                         <div className={styles.grade_ps}>
                                            <span className={styles.gradetext}>{employmentLevel}</span>
                                            <span className={styles.grade_right}></span>
                                            {/* <span className={styles.gradenum}>{`P${employmentLevel}`}</span> */}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.mytable}>
                                    <div className={styles.table_top}>
                                        <h1>我的目标</h1>
                                        <span className={styles.unit}>（单位：万元）</span>
                                    </div>
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <th>当前成绩</th>
                                                <th>目标值</th>
                                                <th>完成率</th>
                                                <th></th>
                                            </tr>
                                            <tr>
                                                <td>有效资产</td>
                                                <td className={effectiveAssetCur>=effectiveAsset?Color.red:Color.green}>{effectiveAssetCur}</td>
                                                <td>{effectiveAsset}</td>
                                                <td className={effectiveAssetCur>=effectiveAsset?Color.red:Color.green}>{effectiveAssetComp}</td>
                                                <td className={effectiveAssetCur>=effectiveAsset?Color.red:Color.green}>{effectiveAssetCompText}</td>
                                            </tr>
                                            <tr>
                                                <td>净创收</td>
                                                <td className={netMarketincomeCur>=netMarketioncome?Color.red:Color.green}>{netMarketincomeCur}</td>
                                                <td>{netMarketioncome}</td>
                                                <td className={netMarketincomeCur>=netMarketioncome?Color.red:Color.green}>{netMarketincomeComp}</td>
                                                <td className={netMarketincomeCur>=netMarketioncome?Color.red:Color.green}>{netIncomeCompText}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.mychart}>
                    	            <h1><strong>我的战力</strong></h1>
                                    <div style={{overflow:'hidden', height:'.1rem'}}>
                                        {/* <div className={styles.selectbtn} onClick={this.myFenZu1}>
                                            <a>{mySelectValue}</a>
                                            {mySelect?<ul><li><a>{mySelectValue2}</a></li></ul>:null}
                                        </div> */}
                                    </div>
                                    <div className={styles.chartbox}>
                                    {mySelectValue=='本月'?<BattlePower key='BattlePowerM' pingjunList={pingjunListM} gerenList={gerenListM} maxEffectiveAsset={maxEffectiveAssetM} maxProductIncome={maxProductIncomeM} maxMarginIncome={maxMarginIncomeM} maxCreditIncome={maxCreditIncomeM} maxNetFareIncome={maxNetFareIncomeM} />:<BattlePower key='BattlePowerY' pingjunList={pingjunListY} gerenList={gerenListY} maxEffectiveAsset={maxEffectiveAssetY} maxProductIncome={maxProductIncomeY} maxMarginIncome={maxMarginIncomeY} maxCreditIncome={maxCreditIncomeY} maxNetFareIncome={maxNetFareIncomeY} />}
                                    </div>
                                </div>
                            </div>
                        </div>:null}
                        <div ref='vl_tab2' className={this.mergeClassName(styles.vl_tab2)}>
                            <PerformanceTabChange  index={index} onTabChange={this.tabChange}>
                                <li className={index==0?styles.on:""}><a>资产</a></li>
                                <li className={index==1?styles.on:""}><a>客户</a></li>
                                <li className={index==2?styles.on:""}><a>交易</a></li>
                                <li className={index==3?styles.on:""}><a>重点产品</a></li>
                            </PerformanceTabChange>
                            <p className={styles.vl_tab2_p}>数据更新截止时间：{kernelDataUpdateTimes}</p>
                        </div>
                        <LazyLoad index={index}>
                            <Assets setUpdateTime={this.setkernelDataUpdateTime} />
                            <MyClient setUpdateTime={this.setkernelDataUpdateTime} />
                            <Trade setUpdateTime={this.setkernelDataUpdateTime} />
                            <div className={styles.vl_empty}>
          	                    <img src="./images/work/home/value/bg_vl_empty.png" />
          	                    <p>我们正在拼命开发中...<br />尽情期待!</p>
                            </div>
                        </LazyLoad>
                    </div>
                {/* </div> */}
                </Content>
                {showTop?(
                    <div className={this.mergeClassName(styles.vl_tab2, styles.vl_tab2Top)}>
                        <PerformanceTabChange  index={index} onTabChange={this.tabChange}>
                            <li className={index==0?styles.on:""}><a>资产</a></li>
                            <li className={index==1?styles.on:""}><a>客户</a></li>
                            <li className={index==2?styles.on:""}><a>交易</a></li>
                            <li className={index==3?styles.on:""}><a>重点产品</a></li>
                        </PerformanceTabChange>
                        <p className={styles.vl_tab2_p}>数据更新截止时间：{kernelDataUpdateTimes}</p>
                    </div>
                ):null}
                <div className={styles.totop} onClick={this.toTop}>
                    <a><span>回到顶部</span></a>
                 </div>
            </div>
        );
    }

}


function injectAction() {
    return {getMyCombatPower};
}

module.exports = connect(null, injectAction())(Performance);
