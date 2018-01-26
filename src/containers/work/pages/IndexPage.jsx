import {connect} from 'react-redux';
import {checkGesture, EVENT_REFRESH_TODO_TOTAL} from '../../../store/actions';
import {logout} from '../actions/me/meAction';
import {getTodoCount} from '../actions/todo/todoAction';
import GestureLogin from '../../login/components/GestureLogin';
import BottomTabs from '../../../components/bottomtabs/BottomTabs';
import TabItem from '../../../components/bottomtabs/TabItem';
import TabText from '../../../components/bottomtabs/TabText';
/** 首页构件 **/
class WorkPage extends PureComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            flag:false,
            todoTotal:0
        }
    }

    componentDidMount(){
        Event.register("Event_Check_Gesture",this.callGesture);
        Event.register(EVENT_REFRESH_TODO_TOTAL,this.getTodoCount);
        this.getTodoCount();
    }

    componentWillMount(){
        var date = new Date(),
            yearStart = date.getFullYear(),
            monthStart = date.getMonth()+1,
            dayStart = date.getDate(),
            yearEnd = date.getFullYear(),
            monthEnd = date.getMonth()+1,
            dayEnd = date.getDate();
            Cache.setValue("startDateArr", [yearStart, monthStart, dayStart])
            Cache.setValue("endDateArr", [ yearEnd, monthEnd, dayEnd])
    }

    componentWillUnmount(){
        Event.unregister("Event_Check_Gesture",this.callGesture);
        Event.unregister(EVENT_REFRESH_TODO_TOTAL,this.getTodoCount);
        super.componentWillUnmount();
    }

    //检查是否需要手势
    callGesture = ()=>{
        this.props.checkGesture((flag)=>{
          if(flag){
              this.setState({flag:true});
          }
        },this);
    }


    //获取待办数量
    getTodoCount = ()=>{
        this.props.getTodoCount(this, (todoTotal)=>{
            this.setState({todoTotal});
        })
    }

    //其他方式登录
    closeGesture = ()=>{
        this.props.logout(this);
    }
    success = ()=>{
        this.setState({flag:false});
    }

    //机智猫
    onJzmClick=()=>
    {
        Client.trackEvent("10102","HOME_CLICK_SMART_CAT");
        window.location.href = "../dist/index.html";
    }
    render(){
        systemApi.log("WorkPage render");
        var {flag, todoTotal} = this.state;

        return (
            <div>
                <div className='g_main'>
                    {this.props.children}
                </div>
                <BottomTabs>
                    <TabItem hash="/work/home" iconClass="home" text="首页"/>
                    <TabItem hash="/work/client" iconClass="client" text="客户"/>
                    <TabText iconClass="cat" text="机智猫"  onClick={this.onJzmClick}/>
                    <TabItem hash="/work/todo" iconClass="todo" text="待办" count={todoTotal}/>
                    <TabItem hash="/work/me" iconClass="me" text="我的"/>
                </BottomTabs>
                {flag?<GestureLogin success={this.success} close={this.closeGesture} resetSuccess={this.success} />:null}
            </div>

        );
    }

}

function injectAction() {
    return {checkGesture,logout,getTodoCount};
}
module.exports = connect(null,injectAction())(WorkPage);
