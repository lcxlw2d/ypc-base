import {showLoading, hideLoading, showMessage, ERROR, WARNING} from '../../../../../store/actions';

//提示信息
export function warn(message){
    return function(dispatch, state){
        dispatch(showMessage(WARNING, message));
    }
}

//获取到期产品列表
export function getProductDeadlineList(params, isAppend, cb, component, updateList){
    return function(dispatch, state){
        var length = 20,
            {search, ...otherParasms} = params,
            sendParams = {
                length,
                ...otherParasms
            };
        setParams(sendParams, search);
        component.requestJSON("productExpiration/list",sendParams).done((data)=>{
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

//获取产品列表
export function getProductDetailList(component, updateList){
    return function(dispatch, state){
        component.requestJSON("productExpiration/products").done((data)=>{
            updateList(data.rows);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

function setParams(args,q) {
    if(!q) return args;

    var re = /[\u4E00-\u9FA5]/g;
	if(re.test(q)){
		args["clientName"] = q;
	}else{
		re = /\d{15}|\d{18}|\d{17}x|\d{17}X/g;
		if(re.test(q)){
			args["idNo"] = q;
		}else{
			args["fundAccount"] = q;
		}
	}
	return args;
}
