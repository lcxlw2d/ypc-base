import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

//获取交易-委托-股票
export function getClientAgencyStockList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("apptradeinfo/entrustToday", {
            length,
            ...params
        }).done((data) => {
            var {updatetime, rows} = data,
                hasMore = rows.length==length;
            if(updatetime){
                updatetime = "最后同步时间："+updatetime;
            }
            updateList(isAppend, rows);
            cb && cb(updatetime, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}


//获取交易-委托-产品
export function getClientAgencyFundList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("apptradeinfo/ofentrust", {
            length,
            ...params
        }).done((data) => {
            var {updatetime, rows} = data,
                hasMore = rows.length==length;
            if(updatetime){
                updatetime = "最后同步时间："+updatetime;
            }
            updateList(isAppend, rows);
            cb && cb(updatetime, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取交易-委托-两融委托
export function getClientAgencyMarginList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("appmargintrading/todaytrade", {
            length,
            assetType:"01",
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows);
            cb && cb(updateTime, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取交易-委托-成交
export function getClientDealList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("apptradeinfo/turnovertoday", {
            length,
            ...params
        }).done((data) => {
            var {updatetime,rows} = data,
                hasMore = rows.length==length;
            if(updatetime){
                updatetime = "最后同步时间："+updatetime;
            }
            updateList(isAppend, rows);
            cb && cb(updatetime, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取交易-委托-两融成交
export function getClientDealMarginList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("appmargintrading/todaytrade", {
            length,
            assetType:"02",
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows);
            cb && cb(updateTime, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取交易-委托-信用划转
export function getClientCreditList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("appmargintrading/todaytrade", {
            length,
            assetType:"04",
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows);
            cb && cb(updateTime, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取交易-委托-银证转账
export function getClientTransferList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("apptradeinfo/banktransfer", {
            length,
            ...params
        }).done((data) => {
            var {updatetime,rows} = data,
                hasMore = rows.length==length;
            if(updatetime){
                updatetime = "最后同步时间："+updatetime;
            }
            updateList(isAppend, rows);
            cb && cb(updatetime, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取交易-委托-两融转账
export function getClientTransferMarginList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("appmargintrading/todaytrade", {
            length,
            assetType:"03",
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows);
            cb && cb(updateTime, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//打电话
export function call(phoneNum){
    return function(dispatch, state){
        Client.call(phoneNum);
    }
}
