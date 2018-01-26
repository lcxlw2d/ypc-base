import {connect} from 'react-redux';
import {setClientSearchBack,FROM_HOME_PAGE} from '../../../../store/actions';
import {hasNews,hasNewCalendar,visitCalendar,SET_UNREAD_NUM} from '../../actions/home/homeAction';
import {checkMOTQusetionnaire} from '../../actions/home/questionnaire/QuestionaireAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import Intro from '../../../../components/common/popup/Intro';
import AdCarousel from '../../components/home/AdCarousel';
import SearchBar from '../../components/home/SearchBar';
import CalendarCard from '../../components/me/CalendarCard';
import MOTPanel from '../../components/home/MOTPanel';
import BusinessChance from '../../components/home/BusinessChance';
import InvestAdvice from '../../components/home/investadvice/InvestAdvice';
//王者荣耀入口
import KingGliryDL from '../../components/home/kingGliry/KingGliryDL';

import TradeRank from '../../components/home/TradeRank';
import TransferRank from '../../components/home/TransferRank';
import HotInformation from '../../components/home/HotInformation';
import MotInvestPage from './MotInvestPage';
import styles from '../css/home/homePage.css';

/** 首页 **/
class HomePage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            showCalendar:false,
            theme:"transparent",
            searchBarTheme:"white",
            hasNews:false,
            introFlag:false,
            showNewCalendar:false,
            showMOTAdvice:false
        };
        this.introList = ["./images/work/home/jzm.png", "./images/work/home/saoma.png"];
        this._calendarParam = {};
    }

    componentDidMount(){
        Event.register(SET_UNREAD_NUM, this.unreadNum);
        Event.fire(SET_UNREAD_NUM);
        super.componentDidMount();
        //检查今天是否有日历
        this.props.hasNewCalendar((data)=>{
            var {hasNewCalendar,isVisitCalendar}=data;
            this._calendarParam = data;
            this.setState({showNewCalendar:(hasNewCalendar==1 && isVisitCalendar==0)});
        },this);

        // //检查是否已经调查过mot
        // this.props.checkMOTQusetionnaire((data)=>{
        //     var {isVote}=data;
        //     if (isVote == 0) {
        //         this.setState({showMOTAdvice:true});
        //     }
        // },this);
    }

    componentWillMount(){
        var introFlag = systemApi.getValue("FLAG_HOME_INTRO_V1.1.2");
        this.setState({introFlag:!introFlag});
    }

    componentWillUnmount(){
        Event.unregister(SET_UNREAD_NUM, this.unreadNum);
        super.componentWillUnmount();
    }

    //获取页面名称
    getPageName(){ return "首页"; }

    unreadNum = ()=>{
         this.props.hasNews((hasNews)=>{
            this.setState({hasNews});
        },this);
    }

    newsClick = ()=>{
        Client.trackEvent("1006","HOME_CLICK_MESSAGECERNTER");
        hashHistory.push("/work/home/news");
    }

    //点击二维码看信息
    qrcodeClick = ()=>{
        //  Client.trackEvent("1007","HOME_CLICK_ECARD");
        var {hasNewCalendar,isVisitCalendar} =  this._calendarParam;
        if(hasNewCalendar==1){
            Client.trackEvent("10071","HOME_CLICK_CALENDAR");
            if(isVisitCalendar==0){
                this.props.visitCalendar(this._calendarParam.imgId,()=>{
                    this._calendarParam.isVisitCalendar=1;
                    this.setState({showNewCalendar:false});
                },this);
            }

            this.setState({showCalendar:true});
        }
        else{
            //this.setState({ecard:true});
            hashHistory.push("/work/home/newstock")
        }
    }


    //关闭ecard
    closeECard = ()=>{
        this.setState({ecard:false});
    }
    closeCalendarCard = ()=>{
        this.setState({showCalendar:false});
    }

    //扫码登录
    scanClick = ()=>
    {
        Client.trackEvent("1040","HOME_CLICK_SCANLOGIN");
        var nonce = systemApi.getValue("nonce");
        window.plugins.XYCommonPlugin.scanQRcode(nonce)
    }

    //头部左侧图标
    renderIconLeft(){
        var {showNewCalendar} =this.state;
        return [
            <HeaderIcon iconCls="qrcode" hasNew={showNewCalendar} onClick={this.qrcodeClick}/>
        ];
    }

    //头部右侧图标
    renderIconRight=()=>{
        return [
            <HeaderIcon iconCls="ico_scan" hasNew={this.state.hasNews} onClick={this.scanClick}/>,
            <HeaderIcon iconCls="news" hasNew={this.state.hasNews} onClick={this.newsClick}/>
            // <div><HeaderIcon iconCls="news" hasNew={this.state.hasNews} onClick={this.newsClick}/></div>
        ];
    }

    //搜索框文本改变
    searchClick = ()=>{
        Client.trackEvent("1008","HOME_CLICK_SEARCH");
        this.props.setClientSearchBack(FROM_HOME_PAGE);
        hashHistory.push('/work/client/search');
    }

    adviceClick = ()=>{
        Client.trackEvent("1010","HOME_CLICK_INVESTADVICE");
        hashHistory.push('/work/home/investadviceintro');
    }

    //滚轮事件，变动头部背景色
    scroll = (scrollLeft, scrollTop)=>{
        var theme = scrollTop>25?"blue":"transparent",
            searchBarTheme = scrollTop>25?"black":"white";

        this.setState({theme,searchBarTheme});
    }

    //关闭引导
    closeIntro = ()=>{
        systemApi.setValue("FLAG_HOME_INTRO_V1.1.2","1");
        this.setState({introFlag:false});
    }

    //机智猫
    onJzmClick=()=>
    {
        Client.trackEvent("10102","HOME_CLICK_SMART_CAT");
        window.location.href = "../dist/index.html";
    }

    //业绩琅琊榜
    onEmployeeValue1=()=>{
        Client.trackEvent("1041","HOME_CLICK_LANYABANG");
        hashHistory.push('/work/home/employeeValue/0');
    }

    //小牛荣誉榜
    onEmployeeValue2=()=>{
        Client.trackEvent("1042","HOME_CLICK_LONGYUBANG");
        hashHistory.push('/work/home/employeeValue/1');
    }

    render(){
        systemApi.log("HomePage render");

        var { showCalendar, theme, searchBarTheme, introFlag,showMOTAdvice} = this.state;

        return (
            <div>
                <AppHeader
                    showBack={false} theme={theme} animate={true}
                    titleClssName="searchbox02"
                    headerName={<SearchBar theme={searchBarTheme} placeholder="姓名/资金账号/身份证号" onClick={this.searchClick}/>}
                    iconLeft={this.renderIconLeft()}
                    iconRight={this.renderIconRight()}/>

                <Content withHeader={true} withBottom={false} onScroll={this.scroll}>
                    <AdCarousel/>
                    <MOTPanel/>
                    <HotInformation/>
                    <div className="blank"></div>
                    {/*<div className={styles.investAdvice} onClick={this.adviceClick}></div>*/}
                    {/*<InvestAdvice/>*/}
                    <div className={styles.jzm}>
                        <img src="./images/work/home/banner2.png"/>
                        <div className={styles.jzm_con}>
                            <div className={styles.left}  onClick={this.onEmployeeValue1}>&nbsp;</div>
                            <div className={styles.right}  onClick={this.onEmployeeValue2}>&nbsp;</div>
                        </div>
                    </div>
                    <div className="blank"></div>
                    <BusinessChance/>
                    <div className="blank"></div>
                    <TransferRank/>
                    <TradeRank/>
                </Content>
                {showCalendar?(<CalendarCard params={this._calendarParam} onClose={this.closeCalendarCard}/>):null}
                {introFlag?(<Intro introList={this.introList} onClose={this.closeIntro}/>):null}
                {/* <KingGliryDL/>
                {showMOTAdvice?<MotInvestPage/>:""} */}
                {this.props.children}
            </div>

        );
    }

}

function injectAction(){
    return {setClientSearchBack,hasNews,hasNewCalendar,visitCalendar,checkMOTQusetionnaire};
}

module.exports = connect(null, injectAction())(HomePage);
