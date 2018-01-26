import {connect} from 'react-redux';
import {getTodoList,call,sendMessage,toComplete} from '../../actions/todo/todoAction';

import SlideList from '../../../../components/list/SlideList';
import SlideItem from '../../../../components/list/SlideItem';
import SlideIcon from '../../../../components/list/SlideIcon';
import TodoItem from './TodoItem';

import styles from '../css/todo/todoList.less';

class TodoList extends CursorList{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    componentDidMount(){
        var freshTime = systemApi.getValue("config_page_todo_refresh");
        this.interval = setInterval(()=>{
            this.refreshData();
        },freshTime);
        super.componentDidMount();
    }

    //已完成待办列表，复写函数，组织搜索框触发重刷界面
    componentWillReceiveProps(nextProps){
        if(nextProps.undoType != this.props.undoType){
            super.componentWillReceiveProps(nextProps);
        }
    }

    componentDidUpdate(){
        var {data} = this.props;
        this.nextIndex = data.length + 1;
        super.componentDidUpdate();
    }

    componentWillUnmount(){
        //清除计时器
        clearInterval(this.interval);
        super.componentWillUnmount();
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    //获取数据
    getData(startIndex,isAppend,cb,props){
        var remindSubtype = props.undoType;
        this.props.getTodoList({startIndex,remindSubtype}, isAppend, cb, this);
    }

    //点击打电话
    phoneClick = (phoneNum)=>()=>{
        this.props.call(phoneNum);
    }

    //点击发短信
    messageClick = (phoneNum)=>()=>{
        this.props.sendMessage(phoneNum);
    }

    //点击已完成
    completeClick = (id)=>()=>{
        this.props.toComplete(id,this);
    }

    //渲染滑块图标
    renderSlideIcon(phoneNum,remindId,remindSubtype){
        var iconList = [];
        if(phoneNum){
            iconList.push(<SlideIcon iconClass="phone" text="电话" onClick={this.phoneClick(phoneNum)} />);
            iconList.push(<SlideIcon iconClass="message" text="短信"  onClick={this.messageClick(phoneNum)}/>);
        }
        if(["60001","60002"].indexOf(remindSubtype)==-1){
            iconList.push(<SlideIcon iconClass="complete" text="标记完成" onClick={this.completeClick(remindId)} />);
        }
        return iconList;
    }

    //过滤参数
    filterParams(search, list){
        for(var i=0;i<list.length;i++){
            if((list[i]||"").indexOf(search)!=-1)
                return true;
        }
        return false;
    }

    renderList(){
        var list = [],
            {data} = this.props,
            {search} = this.props;

        return data.map((item,index)=>{

            var {user_name,organizationName,remindSubtype,clientName,remindTypename,fundAccount,remindContent,remindTime,remindSubtype,clientMobile,remindId} = item;
            //如果通过筛选条件，则渲染元素
            if(search == "" || this.filterParams(search,[user_name,organizationName,clientName,remindTypename,remindContent,fundAccount])){
                return (
                    <SlideItem icons={this.renderSlideIcon(clientMobile,remindId,remindSubtype)} key={remindId}>
                        <TodoItem
                            name={clientName} type={remindTypename} typeNo={remindSubtype}
                            fundAcct={fundAccount} desc={remindContent} time={remindTime} canTouch={true}
                            user_name={user_name} organizationName={organizationName} remindSubtype={remindSubtype}
                            onClick={this.itemClick(item)}/>
                    </SlideItem>
                )
            }
            return null;
        });
    }

    //点击条目
    itemClick = (item)=>()=>{
        var {remindId,remindSubtype} = item;
        if (remindSubtype=="60001") {
            var state = item,
                pathname = "/work/todo/detailApprove/"+remindId+"/0",
                nextLocation = hashHistory.createLocation({pathname,state});
            hashHistory.push(nextLocation)
        }
        else if(remindSubtype == "60002"){
            hashHistory.push("/work/todo/auditor/"+remindId+"/0");
        }
        else{
            hashHistory.push("/work/todo/detail/"+remindId+"/0");
        }
    }

    renderListFrame(list){
        return (
            <SlideList>
                {list}
            </SlideList>
        )
    }

}

function injectProps(state){
    var {todo={}} = state,
        {todolist=[]} = todo;

    return {data:todolist};
}

function injectAction(){
    return {getTodoList,call, sendMessage,toComplete};
}

module.exports = connect(injectProps,injectAction(),null,{withRef:true})(TodoList);
