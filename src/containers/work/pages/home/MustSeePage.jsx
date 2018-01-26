import {connect} from 'react-redux';
import AppHeader from './../../../../components/common/appheader/AppHeader';
import BottomTabs from '../../../../components/common/bottomtabs/BottomTabs';
import TabItem from '../../../../components/common/bottomtabs/TabItem';
import TabText from '../../../../components/common/bottomtabs/TabText';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import PayMent from '../../components/home/mustsee/payMent';
import TodayCode from '../../components/home/mustsee/todayCode';
import TodayNew from '../../components/home/mustsee/todayNew';
import UnSold from '../../components/home/mustsee/unSold';
import Alert from '../../components/home/mustsee/alert';
import {getStatistics, getRemind} from '../../actions/home/mustsee/mustSeeAction';

import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from '../css/home/mustSeePage.css';

/** 首页-**/
class mustSeePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: this.props.params.index || 0,
            statistics: {},
            hasAlert: false,
            refresh: null,
            alertParam: {},
            style: {
                width: "33.3%"
            },
            headerTitle: ["今日缴费", "今日中签", "今日待打新", "开板未卖出"]
        };
    }

    componentDidMount() {
        this.getStatisticsData();
    }

    //获取统计信息
    getStatisticsData() {
        this
            .props
            .getStatistics(this, {
                field: "offLineCount,newStockCount,lotWinningCount"
            }, (data) => {
                this.setState({statistics: data})
            })
    }

    //获取页面名称
    getPageName() {
        return "首页_新股必看";
    }

    setIndex0 = () => {
        this.setState({
            index: 0
        })
    }
    setIndex1 = () => {
        this.setState({
            index: 1
        })
    }
    setIndex2 = () => {
        this.setState({
            index: 2
        })
    }
    setIndex3 = () => {
        this.setState({
            index: 3
        })
    }

    //弹出提示框
    hasAlert = (alertParam) => {
        var {remind, clientId} = alertParam;
        this.setState({hasAlert: true, alertParam: alertParam})
    }

    addUser = (alertParam) => {
        var {remind, clientId} = alertParam;
        this
            .props
            .getRemind({
                clientId,
                status: 1
            },()=>{this.setState({refresh: clientId+"1"})}, this);
    }

    //关闭提示框
    abolished = () => {
        this.setState({hasAlert: false})
    }

    //确认取消关注
    affirm = () => {
        var {alertParam} = this.state, {clientId, remind} = alertParam;
        this
            .props
            .getRemind({
                clientId,
                status: 0
            },()=>{this.setState({refresh: clientId+"0"})}, this)
        this.abolished()

    }

    render() {
        systemApi.log("mustSeePage render");
        var {
                index,
                statistics,
                style,
                bottomCss,
                headerTitle,
                hasAlert,
                refresh
            } = this.state, {offLineCount, newStockCount, lotWinningCount} = statistics;
        return (
            <FullScreenView>
                <AppHeader backHash="/work/home" headerName={headerTitle[index]}/>
                <Content withBottom={false} iscroll={false}>
                    <div className={styles.footer_top}>
                        <TabItem
                            hash="/work/home/newstock"
                            style={style}
                            iconClass="subscribe"
                            text="今日新股申购"
                            count={newStockCount}/>
                        <TabItem
                            hash="/work/home/newstock"
                            style={style}
                            iconClass="winningtop"
                            text="今日公布中签"
                            count={lotWinningCount}/>
                        <TabItem
                            hash="/work/home/stockoffline"
                            style={style}
                            iconClass="newstop"
                            text="网下打新"
                            count={offLineCount}/>
                    </div>
                    <div className="blank"></div>
                    <LazyLoad index={index}>
                        <PayMent index={index}/>
                        <TodayCode index={index}/>
                        <TodayNew index={index} hasAlert={this.hasAlert} addUser={this.addUser} refresh={refresh}/>
                        <UnSold index={index}/>
                    </LazyLoad>
                </Content>
                <BottomTabs>
                    <TabText iconClass={index==0?"moneyon":"money"} text="今日缴款" onClick={this.setIndex0}/>
                    <TabText iconClass={index==1?"winningon":"winning"} text="今日中签" onClick={this.setIndex1}/>
                    <TabText iconClass={index==2?"mnewon":"mnew"} text="今日待打新" onClick={this.setIndex2}/>
                    <TabText iconClass={index==3?"plateon":"plate"} text="开板未卖出" onClick={this.setIndex3}/>
                </BottomTabs>
                {hasAlert
                    ? <Alert abolished={this.abolished} affirm={this.affirm}/>
                    : null}
                {this.props.children}
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {getStatistics, getRemind};
}

module.exports = connect(null, injectAction())(mustSeePage);
