import {showLoading, hideLoading, showMessage, WARNING, ERROR, SUCCESS} from '../../../../../store/actions';

export const SERVER_REFRESH_SERVERLIST = "_SERVER_REFRESH_SERVERLIST_";
export const SERVER_RECENT_THEMES = "_SERVER_RECENT_THEMES_";

//获取服务记录列表
export function getServerList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("servrecord/list", params).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取云端录音列表
export function getServerCloudList(params, isAppend, cb, component, updateList){
    return function(dispatch, state) {
        var {matchStatus} = params;
        if(matchStatus == ""){
            Client.getLocalRecordFileList((data)=>{
                updateList(false, data);
                cb && cb();
            }, (data)=>{
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
        }
        else{
            var {length} = params;
            component.requestJSON("recording/list", params).done((data) => {
                var {rows} = data,
                    hasMore = rows.length==length;
                updateList(isAppend, rows);
                cb && cb(null, hasMore);
            }).fail((data) => {
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
        }

    }
}

//获取拜访方式字典
export function getServTypeDict(params, component, update) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("common/dict", params).done((data) => {
            dispatch(hideLoading());
            update && update(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取服务记录详情
export function getRecordDetail(servId, component, update) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("servrecord/detail/"+servId).done((data) => {
            dispatch(hideLoading());
            update && update(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取录音记录列表
export function getRecordList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("servrecord/recordinglist", params).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取服务主题列表
export function getThemeList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("servrecord/servthemelist", params).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

export function showWarning(text){
    return function(dispatch, state) {
        dispatch(showMessage(WARNING, text));
    }
}

export function showError(text){
    return function(dispatch, state) {
        dispatch(showMessage(ERROR, text));
    }
}

//新增服务记录
export function addOrModRecord(params, component, update) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("servrecord", params).done((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(SUCCESS, "操作成功"));
            update && update(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取使用历史列表
export function getRecentList(component, updateList) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("servrecord/servthemelatest").done((data) => {
            dispatch(hideLoading());
            updateList(data.list);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取最近主题
export function getRecentTheme(userId){
    var allThemes = JSON.parse(systemApi.getValue(SERVER_RECENT_THEMES) || '[]');
    for(var i=0;i<allThemes.length;i++){
        if(allThemes[i].userId == userId)
            return allThemes[i].themes || [];
    }
    return [];
}

//设置主题
export function setRecentTheme(userId, themes){
    var allThemes = JSON.parse(systemApi.getValue(SERVER_RECENT_THEMES) || '[]');
    for(var i=0;i<allThemes.length;i++){
        if(allThemes[i].userId == userId){
            allThemes.splice(i,1);
            break;
        }
    }
    allThemes.unshift({userId,themes:themes});
    if(allThemes.length > 5){
        allThemes = allThemes.slice(0,5);
    }
    systemApi.setValue(SERVER_RECENT_THEMES, JSON.stringify(allThemes));
}

//添加最近使用的主题
export function addRecentTheme(userId, id, text){
    var flag = false,
        themes = getRecentTheme(userId);
    for(var i=0;i<themes.length;i++){
        var item = themes[i];
        if(id == themes[i].id){
            flag = true;
            themes = themes.splice(i,1).concat(themes);
            break;
        }
    }
    if(!flag){
        themes.unshift({id,text});
    }
    if(themes.length>10){
        themes = themes.slice(0,10);
    }
    setRecentTheme(userId, themes);
}

//删除最近使用的主题
export function removeRecentTheme(userId, id, text){
    var themes = getRecentTheme(userId);
    for(var i=0;i<themes.length;i++){
        var item = themes[i];
        if(id == themes[i].id){
            themes.splice(i,1);
            setRecentTheme(userId, themes);
        }
    }
}
