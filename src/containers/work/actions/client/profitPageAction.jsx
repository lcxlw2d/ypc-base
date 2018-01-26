import {showLoading, hideLoading, showMessage, ERROR, SUCCESS} from '../../../../store/actions';

//查询客户盈亏分析信息
export function getListData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("clientstat/profit/analysis", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));
        });
    }
}

//查询指数盈亏分析信息
export function getIndexData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("indexstat/profit/analysis", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));
        });
    }
}

//分享到微信
export function shareECard(type,component, fulldiv, showdiv, callback){
    return function(dispatch, getState){
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
                      description: "盈亏分析分享",
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
            alert(err);
          }, newcanvas);
      });
        callback && callback();
    }
}

//查询客户资产信息
export function getAssetData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("clientstat/asset", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));
        });
    }
}

//查询客户操作信息
export function getAnalysisData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("clientstat/operation/analysis", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));
        });
    }
}

//查询客户行业盈亏信息
export function getIndustryData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("clientstat/profit/industry", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));
        });
    }
}

//查询客户盈亏TOP5股票信息
export function getTop5stockData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("clientstat/profit/topxstock", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));
        });
    }
}

//查询客户盈利构成信息
export function getCompositionData(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("clientstat/profit/composition", params).done(data => {
            dispatch(hideLoading());
            cb && cb(data);
        }).fail(data => {
          dispatch(hideLoading());
          dispatch(showMessage(ERROR, data.message));
        });
    }
}


