import {showLoading, hideLoading, showMessage, getNewCustomMOT, WARNING, ERROR, SUCCESS, EVENT_REFRESH_TODO_TOTAL} from '../../../../store/actions';

export const TODO_SET_TODO_DATA = "_TODO_SET_TODO_DATA_";
export const TODO_SET_DONE_DATA = "_TODO_SET_DONE_DATA_";
export const TODO_SET_CONTENT = "_TODO_SET_CONTENT_";
export const TODO_MOVE_TODO_DONE = "_TODO_MOVE_TODO_DONE_";

//设置待办数据
function setTodoRows(isAppend,data){
    return{
        type:TODO_SET_TODO_DATA,
        isAppend,
        data
    }
}

//设置待办数据
function setDoneRows(isAppend,data){
    return{
        type:TODO_SET_DONE_DATA,
        isAppend,
        data
    }
}

export function copyContent(content, cb, component) {
    return function(dispatch, state) {
        dispatch(showMessage("success", "复制成功"));
        Client.clipboard(content);
        if (cb) {
            cb(message);
        }

    }
}

function moveTODO_DONE(remindId, auditReason, status){
    return {
        type:TODO_MOVE_TODO_DONE,
        remindId,
        auditReason,
        status
    }
}

//获取待办列表
export function getTodoList(params,isAppend,cb,component){
    params = {
        length:20,
        ...params
    }
    return function(dispatch, state){
        //Client.cleanCachedPushMessage();
        component.requestJSON("appMot/todoReminder",params).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==20;
            dispatch(setTodoRows(isAppend, rows));
            cb && cb(null,hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取已办列表
export function getDoneList(params,isAppend,cb,component,updateList){
    params = {
        length:20,
        ...params
    }
    return function(dispatch, state){
        component.requestJSON("appMot/doneReminder",params).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==20;
            dispatch(setDoneRows(isAppend, rows));
            cb && cb(null,hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取待办详情
export function getTodoDetail(remindId,component,updateList){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("appMot/reminderDetail",{remindId}).done((data)=>{
            dispatch(hideLoading());
            updateList(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取已办详情
export function getDoneDetail(remindId,component,updateList){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("appMot/doneRemindDetail",{remindId}).done((data)=>{
            dispatch(hideLoading());
            updateList(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//打电话
export function call(phoneNum){
    return function(dispatch, state){
        Client.call(phoneNum);
    }
}

//发短信
export function sendMessage(phoneNum){
    return function(dispatch, state){
        Client.sendMessage(phoneNum);
    }
}

//发短信
export function toComplete(remindId,component,update){
    return function(dispatch, state){
        component.requestJSON("appMot/remindDone",{
            remindId
        }).done((data)=>{
            dispatch(moveTODO_DONE(remindId));
            dispatch(showMessage(SUCCESS,"处理成功！"));
            Event.fire(EVENT_REFRESH_TODO_TOTAL);
            update && update();
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });

    }
}

//获取待办列表
export function getTodoCount(component, update){
    var params = {
        length:1,
        startIndex:1,
        remindSubtype:getNewCustomMOT()
    }
    return function(dispatch, state){
        component.requestJSON("appMot/todoReminder",params).done((data)=>{
            var {tatal} = data;
            update && update(tatal);
        }).fail((data)=>{
            update && update(0);
        });
    }
}

//审批
export function approve(id,remindId,auditReason,status,component,callback){
    return function(dispatch, state){
        component.requestJSON("export/auditrecord",{
            id,status,auditReason
        }).done((data)=>{
            dispatch(moveTODO_DONE(remindId, auditReason, status));
            dispatch(showMessage(SUCCESS,"处理成功！"));
            Event.fire(EVENT_REFRESH_TODO_TOTAL);
            hashHistory.push("/work/todo/");
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });

    }
}

//获取审批详情
export function getMessageAuditor(component, params, update){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("sms/smsAuditDetail", params).done((data)=>{
            dispatch(hideLoading());
            update && update(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//短信审批提交
export function msgApprove(component, params){
    return function(dispatch, state){
        var {procInstId} = params;
        dispatch(showLoading());
        component.requestJSON("sms/smsAudit",params).done((data)=>{
            dispatch(hideLoading());
            dispatch(moveTODO_DONE(procInstId));
            dispatch(showMessage(SUCCESS,"处理成功！"));
            Event.fire(EVENT_REFRESH_TODO_TOTAL);
            hashHistory.push("/work/todo/");
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取手机发送列表
export function getPhoneList(component, params, isAppend, cb, update){
    var {length} = params;
    return function(dispatch, state){
        component.requestJSON("sms/smsPhoneList",params).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==length;
            update(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
