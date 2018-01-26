import {showMessage, showLoading,hideLoading,ERROR, SUCCESS,WARNING} from '../../../../../store/actions';

export function getFirstEmployee(params,cb,component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("employeevalue/honor/list",params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data.rows);
        }).fail((data)=>{
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));


        });
    }
}

//获取拜访列表
export function getEmployeeList(params, isAppend, cb, component, update) {
    return function(dispatch, state) {

        var {length} = params;
        component.requestJSON("employeevalue/honor/list", params).done((data) => {
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


export function praise(params,cb,component){
    return function(dispatch, state){//operatorType
        dispatch(showLoading());
        component.requestJSON("employeevalue/honor/praise",params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data.isPraise,data.praiseCount);
        }).fail((data)=>{
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));
          cb && cb(1,51);


        });
    }
}

export function submitComment(params,cb,component){
    return function(dispatch, state){
      var {honorId} = params;
      if(honorId==null||honorId==undefined) {
      //  dispatch(showMessage(WARNING,""));
        return;
      }
        dispatch(showLoading());
        component.requestJSON("employeevalue/honor/addordeletecomment",params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data)=>{
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));
      //    cb && cb(false);


        });
    }
}
