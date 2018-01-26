import Category from '../../../../components/common/category/Category';
import ChanceItem from './ChanceItem';

import LittleBenItem from './tracking/LittleBenItem';
import LittleBenList from './tracking/LittleBenList';

import styles from '../css/home/businessChance.css';

const FLAG_TRACKING = "_FLAG_TRACKING_";
const FLAG_SERVER_RECORD = "_FLAG_SERVER_RECORD_";
const FLAG_YXPM = "_FLAG_YXPM_";

class BusinessChance extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            trackFlag: false,
            servFlag: false,
            xypmFlag:false
        }
    }

    componentWillMount() {
        var trackFlag = systemApi.getValue(FLAG_TRACKING),
            servFlag = systemApi.getValue(FLAG_SERVER_RECORD),
            xypmFlag = systemApi.getValue(FLAG_YXPM);
        this.setState({
            trackFlag: !trackFlag,
            servFlag: !servFlag,
            xypmFlag:!xypmFlag

        });
    }

    //网开跟踪
    trackClick = () => {

        Client.trackEvent("1013", "HOME_CLICK_TRACKING");
        systemApi.setValue(FLAG_TRACKING, 1);
        this.setState({
            trackFlag: false
        });
        hashHistory.push("/work/home/tracking");
    }

    //服务记录
    serverClick = () => {
        Client.trackEvent("1011", "HOME_CLICK_SERVERSADD");
        systemApi.setValue(FLAG_SERVER_RECORD, 1);
        this.setState({
            servFlag: false
        });
        hashHistory.push("/work/home/serveradd");
    }

    goldenClick = () => {
        Client.trackEvent("1012", "HOME_CLICK_GOLDEN");
        hashHistory.push("/work/home/golden");
    }

    mustseeClick = () => {
        Client.trackEvent("1014", "HOME_CLICK_NEWSTOCKMUSTSEE");
        hashHistory.push("/work/home/mustsee/0");
    }

    deadlineClick = () => {
        Client.trackEvent("1015", "HOME_CLICK_PRODUCTDEADLINE");
        hashHistory.push("/work/home/deadline");
    }

    attendClick = () => {
        Client.trackEvent("1016", "HOME_CLICK_ATTEND");
        hashHistory.push("/work/home/attend");
    }

    productClick = () => {
        Client.trackEvent("1017", "HOME_CLICK_TIMEMACHINE");
        hashHistory.push("/work/home/product");
    }

    marginClick = () => {
        Client.trackEvent("1018", "HOME_CLICK_MARGIN");
        hashHistory.push("/work/home/margin");
    }

    marketingActivity = () => {
        //1035 HOME_CLICK_MARKETINGACTIVITY 首页 营销活动
        Client.trackEvent("1035", "HOME_CLICK_MARKETINGACTIVITY");
        systemApi.setValue(FLAG_YXPM, 1);
        this.setState({
            xypmFlag: false
        });
        hashHistory.push("/work/home/marketingActivity");
    }
    LoginOnPhoneClick = () => {
        window.plugins.XYCommonPlugin.scanQRcode()
    }
    IMChatClick = ()=>{
        window.plugins.XYCommonPlugin.getIMChatList()
    }
    scanPersonCardClick=()=>
    {
        window.plugins.XYCommonPlugin.scanPersonCard((data)=>{
            var {name,phone} = data;
        })
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("BusinessChance render");

        var {trackFlag, servFlag,xypmFlag} = this.state;

        return (
            // <Category title="小犇百宝口袋" borderColor="none">
            //   <div className={ styles.bb_list }>
            //     <ChanceItem name="新增服务记录" desc="服务记录快捷记录" iconCls="server" onClick={ this.serverClick } isNew={ servFlag } />
            //     <ChanceItem name="金钱豹追踪器" desc="探寻体外资产奥秘" iconCls="golden" onClick={ this.goldenClick } />
            //     <ChanceItem name="网开跟踪" desc="我的网开客户一览" iconCls="tracking" onClick={ this.trackClick } isNew={ trackFlag } />
            //     <ChanceItem name="新股必看" desc="新股内容针对展示" iconCls="newstock" onClick={ this.mustseeClick } />
            //     <ChanceItem name="产品到期提醒" desc="短期理财到期一览" iconCls="productdeadline" onClick={ this.deadlineClick } />
            //     <ChanceItem name="奋斗足迹" desc="记录每次拜访点滴" iconCls="footprint" onClick={ this.attendClick } />
            //     <ChanceItem name="时光宝盒" desc="分享盈亏对比曲线" iconCls="time" onClick={ this.productClick } />
            //     <ChanceItem name="两融开户" desc="两融开通锁定目标" iconCls="margin" onClick={ this.marginClick } />
            //     <ChanceItem name="营销活动" desc="短期理财到期一览" iconCls="productdeadline" onClick={ this.marketingActivity } />
            //     <ChanceItem name="登录扫码" desc="PC登录扫码测试" iconCls="productdeadline" onClick={ this.LoginOnPhoneClick } />
            //   </div>
            // </Category>
            <Category title="小犇百宝口袋" borderColor="none">
                <div className={styles.bb_list}>
                    <LittleBenList>
                        <LittleBenItem name="新增服务记录" desc="服务记录快捷记录" iconCls="server" onClick={this.serverClick}  />
                        <LittleBenItem name="金钱豹追踪器" desc="探寻体外资产奥秘" iconCls="golden" onClick={this.goldenClick}  />
                        <LittleBenItem name="新股必看" desc="新股内容针对展示" iconCls="newstock" onClick={this.mustseeClick}   />
                        <LittleBenItem name="产品到期提醒" desc="短期理财到期一览" iconCls="productdeadline" onClick={this.deadlineClick}  />
                        <LittleBenItem name="奋斗足迹" desc="记录每次拜访点滴" iconCls="footprint" onClick={this.attendClick}  />
                        <LittleBenItem name="时光宝盒" desc="分享盈亏对比曲线" iconCls="time" onClick={this.productClick}   />
                        <LittleBenItem name="营销排名" desc="营销活动排名一览" iconCls="marketingActivity" onClick={this.marketingActivity} isNew={xypmFlag}/>
                        <LittleBenItem name="网开跟踪" desc="我的网开客户一览" iconCls="tracking" onClick={this.trackClick} />
                        <LittleBenItem name="两融开户" desc="两融开通锁定目标" iconCls="margin" onClick={this.marginClick}  />
                        {/*<LittleBenItem name="扫描名片" desc="两融开通锁定目标" iconCls="margin" onClick={this.scanPersonCardClick}  />*/}
                        {/*<LittleBenItem name="登录扫码" desc="PC登录扫码测试" iconCls="productdeadline" onClick={this.LoginOnPhoneClick}  />
                        <LittleBenItem name="IM聊天" desc="IM聊天测试" iconCls="productdeadline" onClick={this.IMChatClick}  />*/}
                    </LittleBenList>
                </div>
            </Category>
            );
    }


}

module.exports = BusinessChance;
