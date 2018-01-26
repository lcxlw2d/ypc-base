import Promise from 'es6-promise';
import {showLoading, hideLoading, showMessage, setUserInfo, resetData, SUCCESS, WARNING, ERROR} from '../../../../redux/store/actions'

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

//登出
export function logout(component){
    var userId = systemApi.getValue("userId");
    return function(dispatch,getState){
        dispatch(showLoading());
        component.requestJSON("applogin/logout").done((data)=>{
            dispatch(hideLoading());
            dispatch(resetData());
            Client.unbindAccountWithPushMessage(userId);
            Cache.removeAll();
            hashHistory.push("/login");
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//投顾二维码信息
export function getQrCodeInfo(params,component,update,err){
    return function(dispatch,getState){
        dispatch(showLoading());
        component.requestJSON("QRCode/userInfo",params).done((data)=>{
            dispatch(hideLoading());
            if(params.forceRefresh){
                dispatch(showMessage(SUCCESS,"生成成功"));
            }
            update && update(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            err && err();
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//保存投顾名片描述
export function saveRemark(remark, component){
    return function(dispatch,getState){
        component.requestJSON("QRCode/updateUserInfo",{remark}).done((data)=>{
            dispatch(showMessage(SUCCESS,"更新成功"));
        }).fail((data)=>{
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//保存二维码图片到本地
export function saveQRcode(callback){
    return function(dispatch, getState){
        dispatch(showMessage(WARNING,"时间有点紧，功能稍后呈上！"));
        callback && callback();
    }
}

//分享到微信
export function shareECard(type,component,callback){
    return function(dispatch, getState){
      var {fulldiv, showdiv} = component.refs;
      fulldiv.scrollTop = fulldiv.scrollHeight;
      var w = showdiv.scrollWidth;
      var h = showdiv.scrollHeight;
      var left = showdiv.getBoundingClientRect().left;
      var top = showdiv.getBoundingClientRect().top;
      //要将 canvas 的宽高设置成容器宽高的 2 倍
      var canvas = document.createElement("canvas"),
          scaleImg = window.devicePixelRatio;
        //  scaleImg =3;
      //    alert(scaleImg);
          if(scaleImg ==null ||scaleImg == undefined) scaleImg=3;

      canvas.width = w * scaleImg+left*scaleImg*2;
      canvas.height = h * scaleImg+top*scaleImg*2;
      canvas.left = 0;
      canvas.top = 0;
      canvas.style.width = (w+left*2) + "px";
      canvas.style.height = (h+top*2) + "px";
      var context = canvas.getContext("2d");
      //然后将画布缩放，将图像放大两倍画到画布上
      context.fillStyle='rgba(0, 0, 0, 0xFF)';
      context.fillRect(0,0,canvas.width,canvas.height);
      context.scale(scaleImg,scaleImg);

      html2canvas(showdiv,{canvas:canvas}).then(function(canvas) {
          var newcanvas = document.createElement("canvas");
          newcanvas.width = w * scaleImg;
          newcanvas.height = h * scaleImg;
          newcanvas.left = 0;
          newcanvas.top = 0;
          newcanvas.style.width = (w) + "px";
          newcanvas.style.height = (h) + "px";
          var newctx= newcanvas.getContext("2d");
          newctx.drawImage(canvas,left*scaleImg,top*scaleImg,w*scaleImg,h*scaleImg,0,0,w*scaleImg, h*scaleImg);

          window.canvas2ImagePlugin.saveImageDataToLibrary(function(msg) {
              Wechat.share({
                  message: {
                      title: "兴业证券",
                      thumb:msg,
                      description: "投顾二维码分享",
                      media: {
                          type: Wechat.Type.IMAGE,
                          image: msg
                      },
                  },
                  scene: type=="wechat"?Wechat.Scene.SESSION:Wechat.Scene.TIMELINE // share to Timeline
              }, function() {
                  console.log("Success");
              }, function(reason) {
                  console.log("Failed: " + reason);
              });

          }, function(err) {
              console.log(err);
          }, newcanvas);
      });
        callback && callback();
    }
}

//分享到微信
export function shareECard2(type,component,callback){
    return function(dispatch, getState){
      var {fulldiv, showdiv} = component.refs;
      fulldiv.scrollTop = fulldiv.scrollHeight;
      var w = showdiv.scrollWidth;
      var h = showdiv.scrollHeight;
      var left = showdiv.getBoundingClientRect().left;
      var top = showdiv.getBoundingClientRect().top;
      //要将 canvas 的宽高设置成容器宽高的 2 倍
      var canvas = document.createElement("canvas");
      canvas.width = w * 2+left*4;
      canvas.height = h * 2+top*4;
      canvas.left = 0;
      canvas.top = 0;
      canvas.style.width = (w+left*2) + "px";
      canvas.style.height = (h+top*2) + "px";
      var context = canvas.getContext("2d");
      //然后将画布缩放，将图像放大两倍画到画布上
      context.fillStyle='rgba(0, 0, 0, 0xFF)';
      context.fillRect(0,0,canvas.width,canvas.height);
      context.scale(2,2);

      html2canvas(showdiv,{canvas:canvas}).then(function(canvas) {
          var newcanvas = document.createElement("canvas");
          newcanvas.width = w * 2;
          newcanvas.height = h * 2;
          newcanvas.left = 0;
          newcanvas.top = 0;
          newcanvas.style.width = (w) + "px";
          newcanvas.style.height = (h) + "px";
          var newctx= newcanvas.getContext("2d");
          newctx.drawImage(canvas,left*2,top*2,w*2,h*2,0,0,w*2, h*2);

          window.canvas2ImagePlugin.saveImageDataToLibrary(function(msg) {
              Wechat.share({
                  message: {
                      title: "兴业证券",
                      thumb:msg,
                      description: "投顾二维码分享",
                      media: {
                          type: Wechat.Type.IMAGE,
                          image: msg
                      },
                  },
                  scene: type=="wechat"?Wechat.Scene.SESSION:Wechat.Scene.TIMELINE // share to Timeline
              }, function() {
                  console.log("Success");
              }, function(reason) {
                  console.log("Failed: " + reason);
              });

          }, function(err) {
              console.log(err);
          }, newcanvas);
      });
        callback && callback();
    }
}

export function checkPassword(pwd,callback,component){
    return function(dispatch, getState){
      if(!pwd||pwd.length<1){
         callback && callback(false,"请输入登录密码");
         return;
      }
      dispatch(showLoading());
      //pwd = md5(md5(pwd)+systemApi.getValue("nonce"));
      pwd = new Base64().encode(pwd);
      component.requestJSON("applogin/validatePassword",{
          passType:"1",
          password:pwd
      }).done((data)=>{
        dispatch(hideLoading());
        callback && callback(true);
      }).fail((data)=>{
          //显示错误信息
          dispatch(hideLoading());
          //dispatch(showMessage(ERROR,data.message));
          callback && callback(false,data.message);
      });

    }
}

//获取头像照片
export function getHeadImageData(params,force, component, update){
    return function(dispatch, getState){
        var overtime = systemApi.getValue("config_tab_me_overtime"),
            summary = Cache.getValue("me_headImageURL_table",overtime);

        //先从缓存中读取数据，如果没有再发请求
        if(summary && !force){
            update && update(summary);
        }
        else{
            component.requestJSON("head/url",params).done((data)=>{
                var url = data.url;
                update && update(url);
                Cache.setValue("me_headImageURL_table",url);
            }).fail((data)=>{
                dispatch(showMessage(ERROR,data.message));
            });
        }

    }
}

//获取服务客户概况
export function getClientsSummary(force, component, update){
    return function(dispatch, getState){
        var overtime = systemApi.getValue("config_tab_me_overtime"),
            summary = Cache.getValue("me_summary_table",overtime);

        //先从缓存中读取数据，如果没有再发请求
        if(summary && !force){
            update && update(summary);
        }
        else{
            component.requestJSON("appcustomer/userinfodata").done((data)=>{
                update && update(data);
                Cache.setValue("me_summary_table",data);
            }).fail((data)=>{
                dispatch(showMessage(ERROR,data.message));
            });
        }

    }
}
//打开关闭手势开关
export function switchGesture(flag,isSet,isSwitch,callback,component){
    return function(dispatch, getState){
      if(flag&&isSet=="0"){//设置打开时，且未设置手势密码，跳转到设置页面
        hashHistory.push("/work/me/resetGesture");
        return;
      }
    //  dispatch(setUserInfo(null,null,null,null,null,flag?"1":"0"));
      //调用登录接口
      component.requestJSON("applogin/setGesture",{
          setType:"2",
          setContent:flag?"1":"0"
      }).done((data)=>{
        dispatch(hideLoading());
          var {gestureSet="0",gestureSwitch="0"} = data;
          if(gestureSwitch!="1"){//关闭状态
            dispatch(setUserInfo(null,null,null,null,gestureSet,"0"));
            return;
          }
          if(gestureSet=="1"){//打开，且设置了密码
            dispatch(setUserInfo(null,null,null,null,gestureSet,gestureSwitch));
          }else{
            hashHistory.push("/work/me/resetGesture");//去设置手势密码，成功后才能设置开关为1
          }



      }).fail((data)=>{
          //显示错误信息
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));
      });
    }
}

export function setGesture(value,callback,component){
    return function(dispatch, getState){
      if(value.length>9||value.length<4){
         dispatch(showMessage(ERROR,"请输入正确的手势密码"));
         return;
      }
      value = md5(value);
      dispatch(showLoading());
      //调用登录接口
      component.requestJSON("applogin/setGesture",{
          setType:"1",
          setContent:value
      }).done((data)=>{
         dispatch(hideLoading());
          var {gestureSet="0",gestureSwitch="0"} = data;
          dispatch(setUserInfo(null,null,null,null,gestureSet,gestureSwitch));
          callback && callback();
      }).fail((data)=>{
          //显示错误信息
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));
      });
    }
}

export function showWarning(message){
    return function(dispatch, getState){
        dispatch(showMessage(WARNING,message));
    }
}

//获取投顾生成二维码权限
export function getGenerateRight(params, component, callback){
    return function(dispatch, getState){
        dispatch(showLoading());
        component.requestJSON("QRCode/status",params).done((data)=>{
            dispatch(hideLoading());
            callback && callback(data.openAccountPremission, data.generated);
        }).fail((data)=>{
            //显示错误信息
            dispatch(hideLoading());
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//获取营业部信息
export function getBranch(component, updateList){
    return function(dispatch, getState){
        dispatch(showLoading());
        component.requestJSON("QRCode/openAccountBranches").done((data)=>{
            dispatch(hideLoading());
            updateList && updateList(data.branches);
        }).fail((data)=>{
            //显示错误信息
            dispatch(hideLoading());
            dispatch(showMessage(ERROR,data.message));
        });
    }
}
