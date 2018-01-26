import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';
import { CLIENT_SET_BASE_INFO } from '../../actions/client/summary/summaryAction';

export const CLIENT_SET_LATELY_LIST = "CLIENT_SET_LATELY_LIST";
export const CLIENT_SET_ATTENTION_LIST = "CLIENT_SET_ATTENTION_LIST";
export const CLIENT_SET_NAME = "CLIENT_SET_NAME";
export const CLIENT_CACHE_LATELY = "client_lately";
export const CLIENT_CACHE_ATTENTION = "client_attention";


//为全景图设置用户名和clientId
function setSummaryInfo(name, clientID, clientStar, validClient, fundAccount) {
    return {
        type: CLIENT_SET_NAME,
        name,
        clientID,
        clientStar,
        validClient,
        fundAccount
    }
}

function setDetailParams(clientId, mobileTel, clientName, fundAccount) {
    return {
        type: CLIENT_SET_BASE_INFO,
        clientId,
        mobileTel,
        clientName,
        fundAccount
    }

}

//设置全景图模式
function setDetailMode(detailMode){
    return {
        type:CLIENT_SET_DETAIL_MODE,
        detailMode
    }
}

//设置最近访问列表
export function setLatelyList(isAppend, data, diffTime, hasMore) {
    return {type: CLIENT_SET_LATELY_LIST, isAppend, data, diffTime, hasMore}
}

//设置关注客户列表
export function setAttentionList(isAppend, data, hasMore) {
    return {type: CLIENT_SET_ATTENTION_LIST, isAppend, data, hasMore}
}

//获取关注客户列表
export function getAttentionList(params, isAppend, cb, component) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("appcustomer/specialuser", {
            specialFlag: 1,
            ...params
        }).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;
            dispatch(setAttentionList(isAppend, rows, hasMore));
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取最近访问客户列表
export function getLatelyList(params, isAppend, cb, component) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("appcustomer/specialuser", {
            specialFlag: 0,
            ...params
        }).done((data) => {
            var {rows, currentTime} = data,
                hasMore = rows.length==length,
                diffTime = new Date().getTime() - currentTime;
            dispatch(setLatelyList(isAppend, rows, diffTime, hasMore));
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//跳转到客户全景图
export function gotoDetail(clientName, clientId, clientStar, validClient, fundAccount) {
    return function(dispatch, state) {
        dispatch(setSummaryInfo(clientName, clientId, clientStar, validClient, fundAccount));
        hashHistory.push("/work/client/detail");
    }
}

//跳转客户全景图新方法(目前用于RecordPage.jsx.)
export function gotoDetailTwo(clientId, mobileTel, clientName, fundAccount) {
    return function(dispatch, state) {
        dispatch(setDetailParams(clientId, mobileTel, clientName, fundAccount));
        hashHistory.push("/work/client/detail");
    }
}