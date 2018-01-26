import {connect} from 'react-redux';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import StatisticsBar from '../../components/home/attend/StatisticsBar';
import AttendList from '../../components/home/attend/AttendList';
import StatisticsList from '../../components/home/attend/StatisticsList';
import CalendarRange from '../../../../components/common/carouselselect/CalendarRange';

import { getStatisticsInfo, ATTEND_REFRESH_ATTENDLIST} from '../../actions/home/attend/attendAction';

import styles from "../css/home/statisticsPage.css";

/** 首页_奋斗足迹_统计列表 **/
class StatisticsPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchRange:"1",
            showFilter:false,
            showTime:false,
            showAttendList:Cache.getValue("showAttendList")?Cache.getValue("showAttendList"):false,
            style:{},
            userId:'',
            userName:'',
            yearStart:Cache.getValue("startDateArr")?Cache.getValue("startDateArr")[0]:'',
            monthStart:Cache.getValue("startDateArr")?Cache.getValue("startDateArr")[1]:'',
            dayStart:Cache.getValue("startDateArr")?Cache.getValue("startDateArr")[2]:'',
            yearEnd:Cache.getValue("endDateArr")?Cache.getValue("endDateArr")[0]:'',
            monthEnd:Cache.getValue("endDateArr")?Cache.getValue("endDateArr")[1]:'',
            dayEnd:Cache.getValue("endDateArr")?Cache.getValue("endDateArr")[2]:'',
            totalUser:'--',
            totalClient:'--'
        }
    }

    componentDidMount(){
        this.positionTop();
        this.loadData();
        super.componentDidMount()
    }

    componentWillUnmount() {
        Cache.remove("showAttendList")
        super.componentWillUnmount()

    }

    // componentDidUpdate(){
    //     // this.positionTop();
    // }

    //重新获取数据
    loadData = ()=>{
        var {yearStart, monthStart, dayStart, yearEnd, monthEnd, dayEnd} = this.state, params, startDate, endDate;
        startDate = this.renderDateTime(yearStart, monthStart, dayStart);
        endDate = this.renderDateTime(yearEnd, monthEnd, dayEnd);

            params = {
                startDate,
                endDate,
                searchRange:"1"
            }

        this.props.getStatisticsInfo(params, this, this.update);
    }

    //更新数据
    update = (data) => {

        let { totalUser, totalClient } = data;
        this.setState({ totalUser, totalClient });
    }

    //获取页面名称
    getPageName(){ return "首页_奋斗足迹_统计列表"; }

    addRecord=()=>{
        this.setState({showFilter:false});
        hashHistory.push("work/home/attend/add");
    }

    toggleFilter = ()=>{
        var {showFilter} = this.state;
        this.setState({showFilter:!showFilter});
    }

    //头部右侧图标
    renderIconRight(){
        return [
            <HeaderIcon iconCls="time" onClick={this.showTimeSelect}/>
        ];
    }

    //格式化时间
    renderDateTime(year, month, day){
        month = month<10?"0"+month:""+month;
        day = day<10?"0"+day:""+day;

        return year+month+day;
    }

    //计算父级元素定位高度
    positionTop = () => {
        let { statistics } = this.refs, deviceHeight = document.documentElement.clientHeight, style={}, height=0;
        // console.log(deviceHeight)
        height = deviceHeight - $(statistics).height()-64;
        style = {height:`${height}px`};
        this.setState({style})
    }

    // //选择过滤
    // filterSelect = (searchRange)=>{
    //     this.setState({
    //         searchRange,
    //         showFilter:false
    //     });
    // }

    // closeFilter = ()=>{
    //     this.setState({showFilter:false});
    // }

    //显示起止时间选择器
    showTimeSelect = () => {
        this.setState({showTime:true});
    }

    closeTimeSelect = () => {
        this.setState({showTime:false})
    }

    //确认修改时间
    onDateSelect = (startDateArr, endDateArr) => {
        Cache.setValue("startDateArr", startDateArr)
        Cache.setValue("endDateArr", endDateArr)
        this.setState({ yearStart:startDateArr[0], monthStart:startDateArr[1], dayStart:startDateArr[2], yearEnd:endDateArr[0], monthEnd:endDateArr[1], dayEnd:endDateArr[2], showTime:false},()=>{
            this.state.showAttendList?null:this.loadData();
            // Event.fire(ATTEND_REFRESH_ATTENDLIST)
        })
    }

    //显示足迹列表
    showAttendList = (userId, userName) => {
        this.setState({showAttendList:true, userId, userName}, () => {
            // console.log(this.state.userId)
            this.positionTop()
        })
    }

    //返回按钮事件
    onBackClick = () => {
         let { showAttendList } = this.state;
         if(showAttendList){
             this.setState({showAttendList:false, userName:'', userId:''}, () => {
                this.positionTop()
                this.loadData()
             })
         }else{
             hashHistory.push('/work/home/attend')
             Cache.remove("showAttendList")
         }

    }

    render() {
        systemApi.log("StatisticsPage render");
        var {year, month, day, searchRange, showFilter, showAttendList, style, userId, userName, yearStart, monthStart, dayStart, yearEnd, monthEnd, dayEnd, totalUser, totalClient, showTime} = this.state,
            subTitle = userName,  endDate, startDate, startDateArr, endDateArr;
            // monthStart = 2;
            startDate = this.renderDateTime(yearStart, monthStart, dayStart);
            endDate = this.renderDateTime(yearEnd, monthEnd, dayEnd);
            startDateArr = [yearStart, monthStart, dayStart];
            endDateArr = [yearEnd, monthEnd, dayEnd];

        return (
            <FullScreenView>
                <AppHeader headerName="奋斗足迹区间统计" subTitle={subTitle} onBackClick={this.onBackClick} iconRight={this.renderIconRight()} />
                <Content iscroll={false}>
                    <div ref='statistics'>
                        <div className={styles.fttop}>
                        {/* yearStart, monthStart, dayStart, yearEnd, monthEnd, dayEnd */}
                            <div className={styles.fttime}><span>{yearStart}年{monthStart}月{dayStart}日</span>-<span>{yearEnd}年{monthEnd}月{dayEnd}日</span></div>
                        {showAttendList?null:[<div className={styles.tdd_left}>
                                <div><span className={styles.tdd_num}>{totalUser}</span><span>人</span></div>
                                <div>留下足迹</div>
                            </div>,
                            <div className={styles.tdd_left}>
                                <div><span className={styles.tdd_num}>{totalClient}</span><span>人</span></div>
                                <div>拜访客户</div>
                            </div>]}
                        </div>
                        <div className={styles.ftline}></div>
                        <div className='blank'></div>
                    </div>
                    <div className={styles.positionFu} style={style}>
                        {showAttendList?
                        <AttendList address={2} startDate={startDate} endDate={endDate} userId={userId} searchRange={searchRange}/>:
                        <StatisticsList Click={this.showAttendList} startDate={startDate} endDate={endDate}/>}
                    </div>
                </Content>
                {showTime?<CalendarRange onCancel={this.closeTimeSelect} startDate={startDateArr} endDate={endDateArr} onSelect={this.onDateSelect}/>:null}
                {this.props.children}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {getStatisticsInfo};
}

module.exports = connect(null, injectAction())(StatisticsPage);
