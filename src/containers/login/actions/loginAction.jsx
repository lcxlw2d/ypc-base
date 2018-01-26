import {showLoading, hideLoading, showMessage, setUserInfo, SUCCESS, ERROR, WARNING} from '../../../redux/store/actions';

/*
 * action 创建函数
 */

export function getNonce(uName, password, component, cb) {
    return function(dispatch, getState) {

      if (uName == "") {
          dispatch(showMessage(WARNING, "请输入用户名"));
          return;
      }

      if (password == "") {
          dispatch(showMessage(WARNING, "请输入密码"));
          return;
      }
        dispatch(showLoading());
        component.requestJSON("applogin/nonce", {}, null, {needNonce: false}).done((data) => {
            //systemApi.setValue("nonce", data.nonce);//登录成功后再保存nonce
            dispatch(hideLoading());
            cb && cb(data.nonce);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));

        });
    }
}
export function checkNonce(cb, component) {
    return function(dispatch, getState) {

        var nonce = Cache.getValue("nonce");
        if(nonce){
            dispatch(showLoading());
            component.requestJSON("applogin/loginStatus",{nonce},null, {needNonce:false}).done((data) => {
                //systemApi.setValue("nonce", data.nonce);//登录成功后再保存nonce
                dispatch(hideLoading());
                cb && cb(data.loggedIn);
            }).fail((data) => {
                dispatch(hideLoading());
                cb && cb(false);

            });
        }else{
            cb && cb(false);
        }

    }
}
export function showTip(message){
    return {
        type:"showTip",
        message
    };
}

export function closeTip(message){
    return function(dispatch, getState) {
        dispatch({type:"closeTip"});
    }
}
export function login(uName, password, nonce, remenber, component, cb) {
    return function(dispatch, getState) {
        if (uName == "") {
            dispatch(showMessage(WARNING, "请输入用户名"));
            return;
        }

        if (password == "") {
            dispatch(showMessage(WARNING, "请输入密码"));
            return;
        }

        if (remenber) {
            systemApi.setValue("loginName", uName);
        } else {
            systemApi.removeValue("loginName");
        }

        dispatch(showLoading());
        //password = md5(md5(password) + nonce);
        password = new Base64().encode(password);
        //生产环境获取硬件信息
        Client.getHardwareInfo((info) => {
            var {
                mac = "xyzq",
                macName = "xyzq",
                systemType = "1",
                systemVersion = "xyzq"
            } = info;
            systemApi.setValue("systemType", systemType);
            component.requestJSON("applogin/login", { //调用登录接口
                username: uName,
                password: password,
                mac: mac,
                macName: macName,
                systemType: systemType,
                systemVersion: systemVersion
            },null,{
              nonce:nonce
            }).done((data) => {
                var {
                    departId,
                    departmentOrgName,
                    nonce,
                    userId,
                    userName,
                    phonecode,
                    gestureSet = "0",
                    gestureSwitch = "0",
                    dmlNeedValidate = "0"
                } = data;
                //存储用户信息
                dispatch(setUserInfo(userName, departId, departmentOrgName, userId, gestureSet, gestureSwitch,phonecode));
                dispatch(hideLoading());
                if (dmlNeedValidate == "1") { //动态口令认证
                    //所有信息应该等动态口令验证过后再setValue！！！！
                    cb && cb(nonce);
                } else {

                    //存入nonce值,userId等，userId作为判断是否首次登录的标志
                    if(systemApi.getValue("userId")!=userId){
                      //如果切换用户，清空历史查询数据
                      systemApi.removeValue("clientSearchHistory");
                      Session.remove("SESSION_PUSH_PARAMS");
                    }
                    if (!systemApi.getValue("userId") && gestureSet == "0") { //设置手势
                        systemApi.setValue("nonce", nonce);
                        systemApi.setValue("userId", userId);
                        systemApi.setValue("userName", userName);
                        hashHistory.replace("/login/gesture");

                        Client.changeUserId(userId);
                        Client.setAndroidKeyboardResponseOpen(false);
                        return;
                    }
                    dispatch(showMessage(SUCCESS, data.promptMsg, 3000));
                    systemApi.setValue("nonce", nonce);
                    Cache.setValue("nonce",nonce);
                    systemApi.setValue("userId", userId);
                    systemApi.setValue("userName", userName);
                    hashHistory.replace("/work");

                    Client.changeUserId(userId);
                    Client.setAndroidKeyboardResponseOpen(false);
                    var push_params = Session.getValue("SESSION_PUSH_PARAMS");
                    if(push_params){
                        Event.fire("_BASE_EVENT_GET_PUSHMESSAGE_",push_params);
                        Session.remove("SESSION_PUSH_PARAMS");
                    }else{
                        Client.invokeCachedPushMessage();
                    }

                }
            }).fail((data) => {
                //显示错误信息
                dispatch(hideLoading());
                if(data.promptCode == "1005"){
                    dispatch(showTip(data.message));
                    return;
                }else if(data.promptCode == "2000"){
                    dispatch(showMessage(WARNING, data.message, 3000));
                    return;
                }
                dispatch(showMessage(ERROR, data.message, 3000));
            });
        });

    }
}

export function getMessagePwd(nonce, cb, component,cb2) {
    return function(dispatch, getState) {

        //  var nonce = systemApi.getValue("nonce");
        dispatch(showLoading());
        var info = {};
        Client.getHardwareInfo((info) => {
            var {
                mac = "xyzq",
            } = info;
            //调用动码令接口
            component.requestJSON("applogin/sendSms", {
                mac: mac
            },null,{nonce:nonce}).done((data) => {
                dispatch(hideLoading());
                var {sendMessage='',countdownTime=60} =data;
                cb && cb(sendMessage,countdownTime);
            }).fail((data) => {

                dispatch(hideLoading());
                cb2 && cb2(data.message);
            });

        });


    }
}

export function checkMessagePwd(password,nonce, cb, cb2, component) {
    return function(dispatch, getState) {
        if (password == "") {
            cb2 && cb2('短信验证码不能为空');
            //dispatch(showMessage(WARNING,"短信验证码不能为空"));
            return;
        }
        //  var nonce = systemApi.getValue("nonce");
        dispatch(showLoading());
        var info = {};
        Client.getHardwareInfo((info) => {
            var {
                mac = "xyzq",
            } = info;
            //调用动码令接口
            component.requestJSON("applogin/verifySms", {
                mac: mac,
                verifyCode: password
            },null,{nonce:nonce}).done((data) => {
                dispatch(hideLoading());
                var {
                    departId,
                    departmentOrgName,
                    userId,
                    userName,
                    gestureSet = "0",
                    gestureSwitch = "0"
                } = data;
                dispatch(showMessage(SUCCESS, data.promptMsg, 3000));
                //存储用户信息
                dispatch(setUserInfo(userName, departId, departmentOrgName, userId, gestureSet, gestureSwitch));
                systemApi.setValue("nonce", nonce);
                if(systemApi.getValue("userId")!=userId){
                  //如果切换用户，清空历史查询数据
                  systemApi.removeValue("clientSearchHistory");
                }
                if (!systemApi.getValue("userId") && gestureSet == "0") {
                    systemApi.setValue("userId", userId);
                    systemApi.setValue("userName", userName);
                    hashHistory.replace("/login/gesture");
                    return;
                }
                systemApi.setValue("userId", userId);
                systemApi.setValue("userName", userName);
                hashHistory.replace("/work");
            }).fail((data) => {
                dispatch(hideLoading());
                cb2 && cb2(data.message);
            });

        });


    }
}
export function checkDynamicPwd(password,nonce, cb, cb2, component) {
    return function(dispatch, getState) {
        if (password == "") {
            cb2 && cb2('动态口令不能为空');
            return;
        }
        //  var nonce = systemApi.getValue("nonce");
        dispatch(showLoading());
        var info = {};
        Client.getHardwareInfo((info) => {
            var {
                mac = "xyzq",
            } = info;
            //调用动码令接口
            component.requestJSON("applogin/validateDML", {
                mac: mac,
                DMLcode: password
            },null,{nonce:nonce}).done((data) => {
                dispatch(hideLoading());
                var {
                    departId,
                    departmentOrgName,
                    userId,
                    userName,
                    gestureSet = "0",
                    gestureSwitch = "0"
                } = data;
                dispatch(showMessage(SUCCESS, data.promptMsg, 3000));
                //存储用户信息
                dispatch(setUserInfo(userName, departId, departmentOrgName, userId, gestureSet, gestureSwitch));
                systemApi.setValue("nonce", nonce);
                if(systemApi.getValue("userId")!=userId){
                  //如果切换用户，清空历史查询数据
                  systemApi.removeValue("clientSearchHistory");
                }
                if (!systemApi.getValue("userId") && gestureSet == "0") {
                    systemApi.setValue("userId", userId);
                    systemApi.setValue("userName", userName);
                    hashHistory.replace("/login/gesture");
                    return;
                }
                systemApi.setValue("userId", userId);
                systemApi.setValue("userName", userName);
                hashHistory.replace("/work");
            }).fail((data) => {
                dispatch(hideLoading());
                if(data.promptCode == "1005"){
                    dispatch(showTip(data.message));
                    return;
                }
                dispatch(showMessage(ERROR, data.message));
            });

        });


    }
}
