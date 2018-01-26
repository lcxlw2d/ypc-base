import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

//获取客户信息
export function getUser(params,component, update) {
    var {fundAccount, category, productCode} = params,
        sendParams = {category};
    if(productCode) sendParams.productCode = productCode;
    return function(dispatch, state) {
        component.requestJSON("roboadvisor/baseinfo/"+fundAccount, sendParams).done((data) => {
            update && update(data);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取头像
export function getImgURL(params,component, update) {
    var {clientId}=params;
    return function(dispatch, state) {
        component.requestJSON("appclientbase/avatar/"+clientId).done((data) => {
            var{avatarUrl}=data;
            update && update(avatarUrl);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取用户投资概况
export function getUserProfile(params,component, update) {
    var {clientId}=params;
    return function(dispatch, state) {
        component.requestJSON("roboadvisor/investmentbehavior/"+clientId).done((data) => {
            update && update(data);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取推荐产品
export function getRecommend(params,component, update){
     var {fundAccount}=params;
    return function(dispatch, state) {
        component.requestJSON("roboadvisor/recommendproducts/"+fundAccount).done((data) => {
            var {rows}=data;
            update && update(rows);
        }).fail((data) => {
            //dispatch(showMessage(ERROR, data.message));
        });
    }
}
