import {showLoading, hideLoading, showMessage, setUserInfo, ERROR, WARNING} from '../../../redux/store/actions';
/*
 * action 创建函数
 */

export function getGestureStatus(cb, component) {
    return function(dispatch, getState) {

        dispatch(showLoading());
        //查询是否开启手势密码
        component.requestJSON("applogin/getGestureStatus", {},null,{timeoutToLogin:false}).done((data) => {
            dispatch(hideLoading());
            var {
                departId,
                departmentOrgName,
                nonce,
                userId,
                userName,
                gestureSet = "0",
                gestureSwitch = "0"
            } = data;
            //存储用户信息
            dispatch(setUserInfo(userName, departId, departmentOrgName, userId, gestureSet, gestureSwitch));

            cb && cb(gestureSwitch == "1"
                ? true
                : false);

        }).fail((data) => {
            //显示错误信息
            dispatch(hideLoading());
            //dispatch(showMessage(ERROR,data.message));
        });
    }
}
export function gestureLogin(password, nonce, component, cb) {
    return function(dispatch, getState) {

        dispatch(showLoading());
        password = md5(md5(password) + nonce);
        //调用登录接口
        component.requestJSON("applogin/validatePassword", {
            passType: "2",
            password: password
        }).done((data) => {
            dispatch(hideLoading());
            if (cb) { //切入后台情况，调用手势验证
                cb();
                return;
            }
            //手势登录时用
            var {
                departId,
                departmentOrgName,
                userId,
                userName,
                gestureSet = "0",
                gestureSwitch = "0"
            } = data;
            //存储用户信息
            dispatch(setUserInfo(userName, departId, departmentOrgName, userId, gestureSet, gestureSwitch));
            Cache.setValue("nonce",nonce);
            hashHistory.push("/work");
            var push_params = Session.getValue("SESSION_PUSH_PARAMS");

            if(push_params){
                Event.fire("_BASE_EVENT_GET_PUSHMESSAGE_",push_params);
                Session.remove("SESSION_PUSH_PARAMS");
            }else{
                Client.invokeCachedPushMessage();
            }

        }).fail((data) => {
            //显示错误信息
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
export function setGesture(value, callback, component) {
    return function(dispatch, getState) {
        if (value.length > 9 || value.length < 4) {
            dispatch(showMessage(WARNING, "请输入正确的手势密码"));
            return;
        }
        value = md5(value);
        dispatch(showLoading());
        //调用登录接口
        component.requestJSON("applogin/setGesture", {
            setType: "1",
            setContent: value
        }).done((data) => {
            dispatch(hideLoading());
            var {
                gestureSet = "0",
                gestureSwitch = "0"
            } = data;
            dispatch(setUserInfo(null, null, null, null, gestureSet, gestureSwitch));
            callback && callback();
        }).fail((data) => {
            //显示错误信息
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
