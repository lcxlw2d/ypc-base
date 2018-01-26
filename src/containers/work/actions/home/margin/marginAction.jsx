import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

function setParams(q) {
    if(!q) return {};

    var re = /[\u4E00-\u9FA5]/g;
	if(re.test(q)){
        return {clientName:q};
	}else{
		re = /^\d{15}|\d{18}|\d{17}x|\d{17}X$/g;
		if(re.test(q)){
            return {idNo:q};
		}else{
            return {clientId:q};
		}
	}
	return {};
}

export function getMarginList(params,isAppend,cb,component,updateList){
    var length = 20,
        {search, ...sendParams} = params;
    sendParams = Object.assign(sendParams,{length},setParams(search));

    return function(dispatch, state){
        component.requestJSON("appClient/marginDetail",sendParams).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend,rows);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}
