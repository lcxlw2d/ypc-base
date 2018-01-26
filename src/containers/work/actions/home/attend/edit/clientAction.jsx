import {showMessage, ERROR, SUCCESS} from '../../../../../../store/actions';

//获取客户列表
export function getClientList(params, isAppend, cb, component, update) {
    return function(dispatch, state) {
        var {search, ...sendParams} = params,
            {length} = params;

        setParams(sendParams, search);
        component.requestJSON("appcustomer/specialuser", {
            specialFlag: 1,
            ...sendParams
        }).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;
            update(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}


//潜在客户列表
export function getPotentialList(params, isAppend, cb, component, update){
    return function(dispatch, state){
        var {search, ...sendParams} = params,
        {length} = params;

        setParams(sendParams, search);
        component.requestJSON('potentialclient/list', sendParams).done(data => {
            var {rows} = data,
                hasMore = rows.length==length;
                update(isAppend, rows || []);
            cb && cb(null, hasMore);
        }).fail( data =>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
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
			args["fundAccountId"] = q;
		}
	}
	return args;
}
