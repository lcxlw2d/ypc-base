import {showLoading, hideLoading, showMessage, ERROR, WARNING} from '../../../../../store/actions';

//获取年度账单url
export function getAnualInfo(fundAccount,component,callback){
    return function(dispatch, state){
        if(fundAccount){
            dispatch(showLoading());
            component.requestJSON("appAnnualStatement/sharecreate",{fundAccount}).done((data)=>{
                dispatch(hideLoading());
                callback && callback(data);
            }).fail((data)=>{
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
        }
        else{
            dispatch(showMessage(WARNING, "请先输入自己账号"));
        }

    }
}

//获取年度账单url
export function getAnualShareImg(url, verCode, component, callback){
    var vCode = new Base64().encode(verCode);
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("appImage/weChat",{
            imgTitle:"NDZD"
        }).done((data)=>{
            dispatch(hideLoading());
            var {imgUrl,titleAndDescription=""} = data,
                sharesList = titleAndDescription.split("#"),
                title = sharesList[0] || "",
                desc = sharesList[1] || "";
            Client.openAppBrowser(url+"?vCode="+vCode,{
                isShowShareBtn:"yes",
                shareURL:url,
                shareTitle:title,
                shareDescription:desc,
                shareImageURL:imgUrl
            });
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
