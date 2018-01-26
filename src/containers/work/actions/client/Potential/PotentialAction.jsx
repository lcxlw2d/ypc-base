import {
    showLoading,
    hideLoading,
    showMessage,
    ERROR,
    WARNING,
    SUCCESS
} from '../../../../../store/actions';

export let showErrorTip = tip => {
    return (dispatch, state) => {
        dispatch(showMessage(WARNING, tip))
    }
}

//获取用户基本信息
export function getUser(component, cb) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("user/baseinfo")
            .done( data => {
                dispatch(hideLoading());
                cb&&cb(data)
            })
            .fail(data => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//新增或者修改潜在客户
export function setPotentialClient(component, params, cb) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("potentialclient/addormod", params)
            .done( data => {
                dispatch(hideLoading());
                cb&&cb(data)
                dispatch(showMessage(SUCCESS, data.msg));
            })
            .fail( data => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//删除潜在客户
export function deletePotentialClient(component, params, cb) {
    let { potentialId } = params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON(`potentialclient/delete/${potentialId}`)
            .done( (data)  => {
                dispatch(hideLoading());
                cb&&cb()
                dispatch(showMessage(SUCCESS, data.msg));
            })
            .fail( (data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//potentialclient/regular potentialId  fundAccount
//潜在客户转正
export function regularPotentialClient(component, params, cb) {
    let { potentialId,fundAccount } = params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON(`potentialclient/regular`, params)
            .done( data  => {
                dispatch(hideLoading());
                cb&&cb()
                dispatch(showMessage(SUCCESS, data.msg));
            })
            .fail( data => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

export function updatePotentialList(turnStarId,turnStarFundcode) {
    return function (dispatch, state) {
        dispatch(setTurnStarId(turnStarId,turnStarFundcode));

    }
}
function setTurnStarId(turnStarId,turnStarFundcode) {
    return {
        type: "POTENTIAL_SET_TURNSTART",
        turnStarId,
        turnStarFundcode
    }
}
//潜在客户详情
export function getPotentialDetail(component, params, cb) {
    let { potentialId } = params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON(`potentialclient/detail/${potentialId}`)
            .done( data => {
                dispatch(hideLoading());
                cb&&cb(data)
            })
            .fail( data => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
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

//打电话
export function callTel(phone, systemType, name, clientId, potentialId, succ,  cb) {
    return function(dispatch, state) {
           // hashHistory.push("/work/client/record/0");
      if(phone&&phone.length>=1){
          if(systemType!=2){
            Client.call(phone);
          }else{
            //Client.call(phone);
            Client.callPhoneWithRecord(succ, data => { dispatch(showMessage(ERROR, data.message)); }, phone, name, clientId,  potentialId);
          }
      }
      else{

          dispatch(showMessage(WARNING, "电话号码暂无"));
          cb&&cb();
        }

    }
}

//获取服务记录列表
export function getServerList(params, isAppend, cb, component, updateList) {
    return function(dispatch, state) {
        var {length} = params;
        component.requestJSON("servrecord/list", params).done((data) => {
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows);
            cb && cb(null, hasMore);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
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
