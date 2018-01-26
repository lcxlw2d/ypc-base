import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

//获取热门产品
export function getHotProducts(params, component, update) {
    return function (dispatch, state) {
        component
            .requestJSON("product/hotProducts", params)
            .done((data) => {
                var {rows} = data;
                update&&update(rows || []);
            })
            .fail((data) => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//搜索商品
export function getBroductSearch(params,isAppend,cb,component,updateList) {
    return function (dispatch, state) {
        var {length} = params;
        component.requestJSON("product/products",params).done((data)=>{
            var {rows,tatal} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows || [], tatal);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

//获取热门产品
export function getRandomHotProducts(params, component, update) {
    return function (dispatch, state) {
        //获取热门产品并随机
        dispatch(getHotProducts(params, component,(data)=>{
            var length = data.length,
                random = Math.floor(Math.random()*length),
                {productShortName,productName} = data[random] || {};
            if(length == 0)
                update && update("");
            else
                update && update(productShortName || productName);
        }));
    }
}
