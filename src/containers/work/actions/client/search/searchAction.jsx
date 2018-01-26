import {showLoading, hideLoading, showMessage, SUCCESS, WARNING, ERROR} from '../../../../../store/actions';

export function getClientSearchList(startIndex,isAppend,cb,component,updateList,keyWord,type){
    return function(dispatch, state){
        var length = 20,
            condition = {
            startIndex,
            length,
            searchType:type
        };
        setParams(condition,keyWord);
        component.requestJSON("appcustomer/simpleuser",condition).done((data)=>{
            var list = data.rows,
                hasMore = list==length;
            updateList(isAppend,list);
            cb && cb(null, hasMore);
        }).fail((data) => {
           dispatch(showMessage(ERROR,data.message));
        });
    }
}

//潜在客户列表
export function getPotentialList(params, isAppend, cb, component, updateList, keyWord, type){
    return function(dispatch, state){
        var {length} = params;
        if(keyWord&&keyWord!='')setParams(params, keyWord);
        component.requestJSON('potentialclient/list', params).done(data => {
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows || []);
            cb && cb(null, hasMore);
        }).fail( data =>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}

export function getIsClientOwner(cb,component,id){
    return function(dispatch, state){
        var clientId = id;
        dispatch(showLoading());
        component.requestJSON("appclientbase/clientsimpleinfo",{clientId}).done((data)=>{
            dispatch(hideLoading());
            var {permit,detail} = data;
            cb && cb(permit== "1",detail);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

export function showTip(text){
    return function(dispatch, state){
        dispatch(showMessage(WARNING,text));
    }
}


function setParams(args,q) {
    if(!q) return;

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
