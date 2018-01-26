import {connect} from 'react-redux';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import AccountList from '../../../work/components/home/tracking/AccountList';
import PartnerList from '../../../work/components/home/tracking/PartnerList';
import Enlist from '../../../work/components/home/tracking/Enlist';
import ECardBox from '../../../work/components/me/ECardBox';
import {getstatistics} from '../../actions/home/tracking/trackAction';
import styles from '../../components/css/home/tracking/Track.css';

/** 首页-我的网开 **/
class TrackingPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var index = 0;
        this.state = {
            index: index,
            showEslist: false,
            recentDays: 1,
            clickTime: 0,
            ongoingCount: 0,
            complatedCount: 0,
            win:false,
            ecard:false,
        }
    }

    //获取页面名称
    getPageName(){ return "首页_我的网开"; }

    //返回首页
    onBackClick = () => {
        hashHistory.push("/work/home");
    }

    //点击二维码看信息
    qrcodeClick = ()=>{
        this.setState({ecard:true});
    }

    //关闭ecard
    closeECard = ()=>{
        this.setState({ecard:false});
    }

    //头部左侧图标
    renderIconLeft(index) {
        return [index? <i/>: <HeaderIcon iconCls="qrcode" onClick={this.qrcodeClick}/>];
    }

    //UI更新后，对列表刷新
    componentDidUpdate() {
        var {accountList, partnerList} = this.refs;

        if (accountList) {
            accountList
                .getWrappedInstance()
                .getScroll()
                .refresh();
        }
        if (partnerList) {
            partnerList
                .getWrappedInstance()
                .getScroll()
                .refresh();
        }

    }
    componentDidMount() {
       this.getData(this.state.recentDays);
    }

    //切换Tab
    tabChange = (index) => {
        var {showEslist} = this.state;
        this.setState({index});
        if (index == 0) {
            this.setState({showEslist: false});
        }
    }
    //招募合伙人
    toEnlist = () => {
        var {showEslist} = this.state;
        if (showEslist) return;
        this.setState({showEslist: true});
    }

    //今天
    toDay = () => {
        this.setState({recentDays: 1},function(){
             this.componentDidMount();
        });

    }
    //一周
    toWeek = () => {
        this.setState({recentDays: 7},function(){
            this.componentDidMount();
        });

    }
    //是否成功
    toWin = ()=>{
        this.setState({win: !this.state.win});
    }
    //取数据函数
    getData = (recentDays)=> {
        var params = {
            recentDay: recentDays,
        };
        this.props.getstatistics(params,this,this.setdata);
    }
    //更新数据
    setdata = (data,datas)=>{
        this.setState({ongoingCount:data});
        this.setState({complatedCount:datas});
    }

    render() {
        systemApi.log("TrackingPage render");
        var {index, showEslist, recentDays,ongoingCount, complatedCount,win,ecard} = this.state, {} = this.props,
            clo = this.mergeClassName(styles.customer, styles.pd0),
            clos = this.mergeClassName(styles.cus_tit, styles.noborder);

        return (
            <FullScreenView>
                <AppHeader
                    headerName="我的网开"
                    onBackClick={this.onBackClick}
                    iconRight={this.renderIconLeft(index)}/>
                <Content iscroll={false}>
                    {/*<SubTabs index={index} onTabChange={this.tabChange}>
                        <UlineTab text="我的网开客户"/>
                        <UlineTab text="我的合伙人"/>
                    </SubTabs>*/}
                    <div className="blank"></div>
                    <div className={clo}>
                        <div className={index? styles.hidehead: null}>
                            <div className={clos}>
                                <div className={styles.lefttabs}>
                                    <a className={recentDays==1?styles.on:null} onClick={this.toDay}>今天</a>
                                    <a className={recentDays==7?styles.on:null} onClick={this.toWeek}>近一周</a>
                                </div>
                                <div className={styles.righttabs}>
                                    <a className={win?styles.on:null} onClick={this.toWin}>仅成功</a>
                                </div>
                            </div>
                            <div className={styles.cus_num_tip}>
                                <div className={styles.cus_num_left_line}></div>
                                <div className={styles.cus_num_mid_text}>进行中<span>{ongoingCount}</span>名、已成功<span>{complatedCount}</span>名</div>
                                <div className={styles.cus_num_right_line}></div>
                            </div>
                        </div>
                        <LazyLoad index={index}>
                            <AccountList ref="accountList" recentDays={recentDays} win={win} />
                             {showEslist?<Enlist/>:<PartnerList ref="partnerList"/>}
                        </LazyLoad>
                        <div className={index ? styles.btn_out : styles.hidehead} onClick={this.toEnlist}>
                            <a>{showEslist? "分享": "招募合伙人"}</a>
                        </div>
                    </div>
                </Content>
                {ecard?(<ECardBox onClose={this.closeECard}/>):null}
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {getstatistics};
}

module.exports = connect(null, injectAction())(TrackingPage);
