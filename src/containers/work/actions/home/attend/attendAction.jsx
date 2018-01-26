import {showLoading, hideLoading, showMessage, ERROR} from '../../../../../store/actions';

export const ATTEND_SET_ATTENDLIST = "_ATTEND_SET_ATTENDLIST_";
export const ATTEND_REFRESH_ATTENDLIST = "_ATTEND_REFRESH_ATTENDLIST_";
export const ATTEND_REFRESH_STATSTICBAR = "_ATTEND_REFRESH_STATSTICBAR_";

//外勤拜访统计
export function getStatisticsInfo(params, component, callback) {
    return function(dispatch, state) {
        component.requestJSON("fieldvisit/statistics", params).done((data) => {
            callback && callback(data);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//设置拜访列表
export function setAttendList(isAppend, data) {
    return { type: ATTEND_SET_ATTENDLIST, isAppend, data };
}

//获取拜访列表
export function getAttendList(params, isAppend, cb, component, update) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("fieldvisit/list", params).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;

            update(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取统计列表
export function getStatisticsList(params, isAppend, cb, component, update) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("fieldvisit/statisticsList", params).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;

            update(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

