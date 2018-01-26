import {showLoading,hideLoading,showMessage, ERROR, SUCCESS, WARNING} from '../../../../../store/actions';

const CACHE_INVEST_USERLEVEL = "_cache_invest_userlevel_";
const CACHE_INVEST_TYPE = "_cache_invest_type_";

export function getAttetionList(params,isAppend,cb,component,updateList){
    return function(dispatch, state){
        var {length} = params;
        component.requestJSON("roboadvisor/motclients",params).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows || []);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

export function getRookieList(params,isAppend,cb,component,updateList){
    return function(dispatch, state){
        var {length} = params;
        component.requestJSON("roboadvisor/newclients",params).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows || []);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取客户分类字典
export function getInvestTypeDict(component, update) {
    var dict = "AFAM_ROBOADVISOR_TAGTYPE";
    return function(dispatch, state) {
        var investType = Session.getValue(CACHE_INVEST_TYPE);
        if(investType){
            update && update(investType);
        }
        else{
            dispatch(showLoading());
            component.requestJSON("common/dict", {dictKeys:dict}).done((data) => {
                dispatch(hideLoading());
                Session.setValue(CACHE_INVEST_TYPE, data[dict]);
                update && update(data[dict]);
            }).fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
        }
    }
}

//获取风险等级分类字典
export function getUserLevelDict(component, update) {
    var dict = "AFAM_ROBOADVISOR_RISKTYPE";
    return function(dispatch, state) {
        var userLevel = Session.getValue(CACHE_INVEST_USERLEVEL);
        if(userLevel){
            update && update(userLevel);
        }
        else{
            dispatch(showLoading());
            component.requestJSON("common/dict", {dictKeys:dict}).done((data) => {
                dispatch(hideLoading());
                Session.setValue(CACHE_INVEST_USERLEVEL, data[dict]);
                update && update(data[dict]);
            }).fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
        }

    }
}

export function showWarning(message){
    return function(dispatch, state) {
        dispatch(showMessage(WARNING, message));
    }
}
