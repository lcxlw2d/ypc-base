import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

//持仓 - 股票
export function getClientStockList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("position/assetInfo", {
            assetType:"EJCC",
            length,
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows, hasMore);
            cb && cb(updateTime, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//持仓 - 基金
export function getClientFoundationList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("position/assetInfo", {
            assetType:"CWKJ",
            length,
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows, hasMore);
            cb && cb(updateTime, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//持仓 - 理财
export function getClientProductList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("position/financeInfo", {
            length,
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows, hasMore);
            cb && cb(updateTime, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//持仓 - 两融
export function getClientMarginList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("clientMargin/stockInfo", {
            length,
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows, hasMore);
            cb && cb(updateTime, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//持仓 - 负债 - 融资
export function getClientDebetAssetList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("clientMargin/debitInfo", {
            debitType:"0",
            length,
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows, hasMore);
            cb && cb(updateTime, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//持仓 - 负债 - 融券
export function getClientDebetStockList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("clientMargin/debitInfo", {
            debitType:"1",
            length,
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows, hasMore);
            cb && cb(updateTime, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//持仓 - 负债 - 其他
export function getClientDebetOtherList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var length = 20;
        component.requestJSON("clientMargin/debitInfo", {
            debitType:"2",
            length,
            ...params
        }).done((data) => {
            var {updateTime} = data.dictMap || {},
                {rows} = data,
                hasMore = rows.length==length;
            if(updateTime){
                updateTime = "最后同步时间："+updateTime;
            }
            updateList(isAppend, rows, hasMore);
            cb && cb(updateTime, hasMore);
        }).fail((data)=>{
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
