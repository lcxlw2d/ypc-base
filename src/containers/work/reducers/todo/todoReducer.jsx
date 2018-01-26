import {TODO_SET_TODO_DATA, TODO_SET_DONE_DATA, TODO_SET_CONTENT, TODO_MOVE_TODO_DONE} from '../../actions/todo/todoAction';

function formatNum(num){
    return num<10?"0"+num:num;
}

function formatTime(){
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    return year+"-"+formatNum(month)+"-"+formatNum(day)+" "+formatNum(hour)+":"+formatNum(min)+":"+formatNum(sec);

}

module.exports = function todoReducer(state, action){
    var {type} = action;
    state = state || {
        todolist:[],
        donelist:[],
        detail:{
            remindId:"",
            clientName:"",
            remindTypename:"",
            fundAccount:"",
            remindContent:"",
            clientMobile:"",
            remindTime:""
        }
    };

    if(type == TODO_SET_CONTENT){
        //设置详情页数据
        var {remindId, clientName, remindTypename, fundAccount, remindContent, clientMobile, remindTime} = action;
        return Object.assign({},state,{
            detail:{
                remindId,
                clientName,
                remindTypename,
                fundAccount,
                remindContent,
                clientMobile,
                remindTime
            }
        });
    }
    else if(type == TODO_SET_TODO_DATA){
        //设置待办列表
        var {isAppend, data} = action,
            {todolist} = state;

        todolist = isAppend ? todolist.concat(data) : data;
        return Object.assign({},state,{todolist});
    }
    else if(type == TODO_SET_DONE_DATA){
        //设置已办列表
        var {isAppend, data} = action,
            {donelist} = state;

        donelist = isAppend ? donelist.concat(data) : data;
        return Object.assign({},state,{donelist});
    }
    else if(type == TODO_MOVE_TODO_DONE){
        //已办后待办数移到已办
        var list = [],
            removeList = [],
            {remindId,auditReason,status} = action,
            {todolist,donelist} = state;

        for(var i=0;i<todolist.length;i++){
            var item = todolist[i],
                curRemindId = item.remindId;
            if(curRemindId != remindId){
                list.push(item);
            }
            else{
                //AFA审批，加入审批理由
                if(item.remindSubtype == "60001"){
                    item = Object.assign(item, {auditReason,exportStatus:status,validTime:formatUtil.formatDate()});
                }
                removeList.push(item);
            }
        }

        return Object.assign({},state,{
            todolist:list,
            donelist:removeList.concat(donelist)
        });
    }

    return state;

}
