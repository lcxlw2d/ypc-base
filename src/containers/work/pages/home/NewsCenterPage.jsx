import {connect} from 'react-redux';
import {getAnualInfo, getAnualShareImg} from '../../actions/home/anualbill/AnualBillAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import TitleIcon from '../../../../components/common/appheader/TitleIcon';
import StatisticsBar from '../../components/home/attend/StatisticsBar';
import NewsList from '../../components/home/newscenter/NewsList';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import EVENT_UNREAD_NUM from '../../../work/actions/home/newscenter/newscenterAction';
import styles from '../css/home/anualBillPage.css';

/** 首页-产品营销 **/
class NewsCenterPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            year:"",
            month:"",
            day:""
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
    getPageName(){ return "首页_消息中心"; }

    //返回首页刷新未读消息条数
    onBackClick = ()=>{
        Event.fire(EVENT_UNREAD_NUM);
        hashHistory.push("/work/home");
    }



    //格式化时间
    renderDateTime(){
        var {year,month,day} = this.state;
        month = month<10?"0"+month:month;
        day = day<10?"0"+day:day;

        return year+month+day;
    }

    render() {
        systemApi.log("NewsCenterPage render");

        var {year,month,day} = this.state,
            dateTime = this.renderDateTime();

        return (
            <FullScreenView>
                <AppHeader headerName={<TitleIcon iconCls="newsCenter" />}  onBackClick={this.onBackClick}  />
                <Content iscroll={false}>
                    <NewsList/>
                </Content>
                {this.props.children}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {getAnualInfo, getAnualShareImg};
}

module.exports = connect(null, injectAction())(NewsCenterPage);
