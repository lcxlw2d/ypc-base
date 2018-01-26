import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';


//设置网开客户列表
export function setAccountList(isAppend, data) {
    return { type:ACCOUNT_SET_ACCOUNTLIST,isAppend,data};
}

//设置列表范围
export function setToDay() {

}




//获取网开客户简单统计
export function getstatistics(params, component,update) {
    return function (dispatch, state) {
        component
            .requestJSON("openaccountonline/statistics", params)
            .done((data) => {
                var {ongoingCount, complatedCount} = data;
                update(ongoingCount, complatedCount);
            })
            .fail((data) => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取我的网开客户列表
export function getAccountList(params, isAppend, cb, component, update) {
    return function (dispatch, state) {

        var {length} = params;
        component
            .requestJSON("openaccountonline/myclients", params)
            .done((data) => {
                var {rows} = data,
                    hasMore = rows.length == length;
                update(isAppend, rows);
                cb && cb(null, hasMore);
            })
            .fail((data) => {
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
    }
}
