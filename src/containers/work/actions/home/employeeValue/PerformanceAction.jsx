import {showMessage, showLoading, hideLoading, ERROR, SUCCESS, WARNING} from '../../../../../store/actions';

export function getListData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("employeevalue/list", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data.rows);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));


        });
    }
}

//获取我的战力
export function getMyCombatPower(cb, component) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("employeevalue/mycombateffectiveness").done((data) => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取资产数据
export function getAssetData(cb, component) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("employeevalue/asset").done((data) => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}




//获取客户数据
export function getMyClientData(cb, component) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("employeevalue/client").done((data) => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取交易数据
export function getTradeData(cb, component) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("employeevalue/trade").done((data) => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}


