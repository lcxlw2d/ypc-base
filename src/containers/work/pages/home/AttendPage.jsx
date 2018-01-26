import {connect} from 'react-redux';
import {getAnualInfo, getAnualShareImg} from '../../actions/home/anualbill/AnualBillAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import Intro from '../../../../components/common/popup/Intro';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import StatisticsBar from '../../components/home/attend/StatisticsBar';
import AttendList from '../../components/home/attend/AttendList';
import FilterBar from '../../components/home/attend/FilterBar';

import styles from '../css/home/attendPage.css';

/** 首页-产品营销 **/
class AttendPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            year:"",
            month:"",
            day:"",
            searchRange:"1",
            showFilter:false
        }
    }

    componentWillMount(){
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();

        this.setState({year,month,day});
    }

    //获取页面名称
    getPageName(){ return "首页_奋斗足迹"; }

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
            <HeaderIcon iconCls="filter" onClick={this.toggleFilter}/>,
            <HeaderIcon iconCls="add" onClick={this.addRecord}/>
        ];
    }

    //格式化时间
    renderDateTime(){
        var {year,month,day} = this.state;
        month = month<10?"0"+month:""+month;
        day = day<10?"0"+day:""+day;

        return year+month+day;
    }

    //计算父级元素定位高度
    positionTop = () => {
        let height = 3.08, deviceHeight = document.documentElement.clientHeight, style={};
        height = deviceHeight - (height*window.remUnit + 64);
        style = {height:`${height}px`};
        return style
    }

    //选择过滤
    filterSelect = (searchRange)=>{
        this.setState({
            searchRange,
            showFilter:false
        });
    }

    closeFilter = ()=>{
        this.setState({showFilter:false});
    }

    render() {
        systemApi.log("AttendPage render");

        var {year,month,day,searchRange,showFilter} = this.state,
            subTitle = searchRange=="1"?"全部":"我的",
            dateTime = this.renderDateTime();

        return (
            <FullScreenView>
                <AppHeader headerName="奋斗足迹" subTitle={subTitle} backHash="/work/home" iconRight={this.renderIconRight()} />
                <Content iscroll={false}>
                    <StatisticsBar year={year} month={month} day={day} dateTime={dateTime}/>
                    <div className={styles.positionFu} style={this.positionTop()}>
                        <AttendList address={1} searchRange={searchRange}/>
                    </div>
                </Content>
                {showFilter?(<FilterBar searchRange={searchRange} onClose={this.closeFilter} onSelect={this.filterSelect}/>):null}
                {this.props.children}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {getAnualInfo, getAnualShareImg};
}

module.exports = connect(null, injectAction())(AttendPage);
