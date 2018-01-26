import {showMessage, showLoading, hideLoading, ERROR, SUCCESS} from '../../../../../store/actions';

//新股必看-统计
export function getStatistics(component, params, update) {
    return function (dispatch, state) {
        component
            .requestJSON("newequityinfo/statistics", params)
            .done((data) => {
                update && update(data);
            })
            .fail((data) => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取今日缴款列表
export function getPayMent(params, isAppend, cb, component, updateList) {
     var{length}=params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("newequityinfo/payment", params)
            .done((data) => {
                dispatch(hideLoading());
                var {rows} = data,
                    hasMore = rows.length == length;
                updateList(isAppend, rows || []);
                cb && cb(null, hasMore);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
    }
}

//获取今日缴款列表-中签详情
export function getPayMentDetail(params, component, update) {
    return function (dispatch, state) {
      dispatch(showLoading());
        component
            .requestJSON("newequityinfo/payment/detail", params)
            .done((data) => {
                dispatch(hideLoading());
                var {rows} = data;
                update&&update(rows || []);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取今日中签列表
export function getWinTheLot(params, isAppend, cb, component, updateList) {
     var{length}=params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("newequityinfo/winTheLot", params)
            .done((data) => {
                dispatch(hideLoading());
                var {rows} = data,
                    hasMore = rows.length == length;
                updateList(isAppend, rows || []);
                cb && cb(null, hasMore);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
    }
}

//获取今日待打新列表
export function getTodayNew(params, isAppend, cb, component, updateList) {
    var{startIndex, length}=params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("newequityinfo/applynewshare",{startIndex, length})
            .done((data) => {
                dispatch(hideLoading());
                var {rows} = data,
                    hasMore = rows.length == length;
                updateList(isAppend, rows || []);
                cb && cb(null, hasMore);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
    }
}

//获取开板为卖出
export function getUnSold(params, isAppend, cb, component, updateList) {
    var{length}=params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("newequityinfo/unsold", params)
            .done((data) => {
                dispatch(hideLoading());
                var {rows} = data,
                    hasMore = rows.length == length;
                updateList(isAppend, rows || []);
                cb && cb(null, hasMore);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
    }
}

//选择是否提醒
export function getRemind(params, cb, component) {
    return function (dispatch, state) {
        component
            .requestJSON("newequityinfo/applynewshare/remind",params)
            .done((data) => {
                cb&&cb();
            })
            .fail((data) => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}
