import {connect} from 'react-redux';
import {getDoneList} from '../../actions/todo/todoAction';

import TodoItem from './TodoItem';

import styles from '../css/todo/todoList.less';

class DoneList extends CursorList{

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

    getData(startIndex,isAppend,cb,props){
        var remindSubtype = props.undoType;
        this.props.getDoneList({startIndex,remindSubtype},isAppend,cb,this);
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
            var {user_name,organizationName,remindSubtype,clientName,remindTypename,fundAccount,remindContent,remindTime,remindSubtype,remindId} = item;

            if(search == "" || this.filterParams(search,[user_name,organizationName,clientName,remindTypename,remindContent,fundAccount])){
                return (<TodoItem
                            name={clientName} type={remindTypename} canTouch={true}
                            typeNo={remindSubtype} fundAcct={fundAccount}
                            desc={remindContent} time={remindTime} key={remindId}
                            user_name={user_name} organizationName={organizationName} remindSubtype={remindSubtype}
                            onClick={this.itemClick(item)} />);
            }
            return null;
        });
    }

    //点击条目
    itemClick = (item)=>()=>{
        var {remindId,remindSubtype} = item;
        if (remindSubtype=="60001") {
            var state = item,
                pathname = "/work/todo/detailApproved/"+remindId+"/1",
                nextLocation = hashHistory.createLocation({pathname,state});

            hashHistory.push(nextLocation)
        }
        else if(remindSubtype == "60002"){
            hashHistory.push("/work/todo/auditor/"+remindId+"/1");
        }
        else{
            hashHistory.push("/work/todo/detail/"+remindId+"/1");
        }
    }

}

function injectProps(state){
    var {todo={}} = state,
        {donelist=[]} = todo;

    return {data:donelist};
}

function injectAction(){
    return {getDoneList};
}

module.exports = connect(injectProps,injectAction(),null,{withRef:true})(DoneList);
