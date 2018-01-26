import {showLoading, hideLoading, showMessage, ERROR} from '../../../../../store/actions';

export function getOfflineStockList(params, isAppend, cb, component, updateList){
    return function(dispatch, state){
        var length = 20,
            sendParams = {
                length,
                ...params
            };
        component.requestJSON("appofflinenew/list",sendParams).done((data)=>{
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

//获取网下打新详情
export function getOfflineDetail(stockCode, component, update){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("appofflinenew/detail",{
            stock_code:stockCode
        }).done((data)=>{
            dispatch(hideLoading());
            update(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取网下打新详情
export function getOfflineDetailPlan(stockCode, component, update){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("appofflinenew/schedule",{
            stock_code:stockCode
        }).done((data)=>{
            dispatch(hideLoading());
            update(data.rows || []);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
