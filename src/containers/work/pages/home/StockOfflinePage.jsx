import {connect} from 'react-redux';
import {} from '../../actions/home/stockoffline/stockOfflineAction';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Category from '../../../../components/common/category/Category';
import TextButton from '../../components/home/stockoffline/TextButton';
import SearchBar from '../../components/home/stockoffline/SearchBar';
import OfflineList from '../../components/home/stockoffline/OfflineList';

import styles from '../css/home/anualBillPage.css';

/** 首页-网下打新列表 **/
class StockOfflinePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index:1,
            code:"",
            start:"",
            end:""
        }
        this.monthDay = [31,28,31,30,31,30,31,31,30,31,30,31];
    }

    //获取页面名称
    getPageName(){ return "首页_网下打新列表"; }

    componentWillMount(){
        this.weekClick();
    }

    //搜索条件
    searchClick = (code)=>{
        this.setState({code});
    }

    //获取当月天数
    getMonthDay = (year, month)=>{
        if(month != 2){
            return this.monthDay[month-1];
        }
        return this.isRunnar(year)?29:28;
    }

    //判断是否是闰年
    isRunnar = (year)=>{
        return year%100==0 ? year%400==0 : year%4==0;
    }

    //点击今日
    todayClick = ()=>{
        this.setState({
            index:0,
            start:formatUtil.formatDate(null, "yyyy-MM-dd"),
            end:formatUtil.formatDate(null, "yyyy-MM-dd")
        });
    }

    //点击本周
    weekClick = ()=>{
        var today = new Date(),
            weekFirst = new Date(),
            weekLast = new Date(),
            day = today.getDay()==0?7:today.getDay(),
            dayTime = 1000*60*60*24,
            firstDiff = day-1,
            lastDiff = 7-day;
        weekFirst.setTime(today.getTime() - firstDiff*dayTime);
        weekLast.setTime(today.getTime() + lastDiff*dayTime);
        this.setState({
            index:1,
            start:formatUtil.formatDate(weekFirst.getTime(),"yyyy-MM-dd"),
            end:formatUtil.formatDate(weekLast.getTime(),"yyyy-MM-dd")
        });
    }

    //点击本月
    monthClick = ()=>{
        var date = new Date(),
            monthFirst = new Date(),
            monthLast = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()+1;
        monthFirst.setDate(1);
        monthLast.setDate(this.getMonthDay(year,month));
        this.setState({
            index:2,
            start:formatUtil.formatDate(monthFirst.getTime(),"yyyy-MM-dd"),
            end:formatUtil.formatDate(monthLast.getTime(),"yyyy-MM-dd")
        });
    }

    //渲染category筛选条件
    renderIcons = ()=>{
        var {index} = this.state;
        return [
            <TextButton text="今天" selected={index==0} onClick={this.todayClick}/>,
            <TextButton text="本周内" selected={index==1} onClick={this.weekClick}/>,
            <TextButton text="本月内" selected={index==2} onClick={this.monthClick}/>
        ]
    }

    render() {
        systemApi.log("StockOfflinePage render");

        var {code,start,end} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="网下打新列表"/>
                <Content iscroll={false}>
                    <SearchBar onSearch={this.searchClick} />
                    <div className="blank"></div>
                    <Category title="网下打新详情" iconLeft="bluestick" iconElement={this.renderIcons()}>
                        <OfflineList code={code} start={start} end={end} />
                    </Category>
                </Content>
                {this.props.children}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(StockOfflinePage);
