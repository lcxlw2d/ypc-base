import {showMessage, showLoading, hideLoading, ERROR, SUCCESS, WARNING} from '../../../../../store/actions';

export function getProductList(params, isAppend, cb, component, update) {
    return function(dispatch, state) {
        var length = 20,
            {search, ...param} = params,
            searchParam = formatParams(search),
            sendParam = Object.assign({},param,searchParam,{length});

        component.requestJSON("clientadvicebymobile/products", sendParam).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;
            update && update(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}
export function getTimeMachineUrl(funcAcc, product, cb,component) {
    return function(dispatch, state) {
        if(!funcAcc){
          dispatch(showMessage(WARNING, "请输入资金账号"));
          return;
        }
        component.requestJSON("clientadvicebymobile/productgroupurl", {
          productId:product,
          fundAccount:funcAcc
        }).done((data) => {
          var url=data.url+"&productId="+product;
            cb && cb(url);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));

        });
    }
}

//获取时光机分享信息
export function getShareInfo(url, component){
    return function(dispatch, state) {
        component.requestJSON("appImage/weChat",{
            imgTitle:"SGJ"
        }).done((data)=>{
            var {imgUrl,titleAndDescription=""} = data,
                sharesList = titleAndDescription.split("#"),
                title = sharesList[0] || "",
                desc = sharesList[1] || "";
            Client.openAppBrowser(url,{
                isShowShareBtn:"yes",
                shareURL:url,
                shareTitle:title,
                shareDescription:desc,
                shareImageURL:imgUrl
            });
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//搜索过滤条件
function formatParams(q) {
    if(!q) return {};
    var re = /^\d+$/g;
    if(re.test(q)){
        return {fundCode:q};
    }else{
        return {fundName:q};
    }
    return {};
}
