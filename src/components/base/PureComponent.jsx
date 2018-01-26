import shallowCompare from 'react-addons-shallow-compare';
import { PropTypes } from 'prop-types';

class PureComponent extends React.Component {

    //构造函数，创建请求清单
    constructor(props,context) {
        super(props,context);
        if(context){
            this.store = context.store;
        }
        this._reqList = [];
    }


    //比较属性和状态是否改变
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    //合并className; mergeClassName(a,b,c) => a+" "+b+" "+c
    mergeClassName(){
        return Array.prototype.join.call(arguments," ");
    }

    //发送Ajax请求，并记录请求标记，在元素销毁时清除回调
    requestJSON(url,params,callBack,otherParams){

        var obj = NetWork.requestJSON(url, params || {}, otherParams || {}),
            {promise,ver} = obj;
        //添加请求标识
        this._reqList.push(ver);
        if(callBack){
            //执行用户回调
            promise.done(function(data){
                callBack(data);
            });
        }
        return promise;
    }

    //发送Ajax请求，并记录请求标记，在元素销毁时清除回调
    requestJSONOther(url,type,params,callBack){

        var obj = NetWork.requestJSONOther(url, type, params || {}),
            {promise,ver} = obj;

        //添加请求标识
        this._reqList.push(ver);
        if(callBack){
            //执行用户回调
            promise.done(function(data){
                callBack(data);
            });
        }
        return promise;
    }
    // 多文件上传
    uploadMultiFile(url,params,imagesURLArray,otherParams){
        var obj = NetWork.uploadMultiFile(url, params || {}, imagesURLArray || [], otherParams || {}),
            {promise,ver} = obj;
        //添加请求标识
        this._reqList.push(ver);
        return promise;
    }
    // 单文件上传
    uploadFile(url,params,imageFilePath,name,otherParams){
        var obj = NetWork.uploadFile(url, params || {}, imageFilePath || [],name || [], otherParams || {}),
            {promise,ver} = obj;
        //添加请求标识
        this._reqList.push(ver);
        return promise;
    }

    UpLoadRecording(url, params, recordUrl, name, succ, fails, otherParams){
        var obj = NetWork.UploadRecording(url, params || {}, recordUrl, name,  otherParams || {}, succ, fails),
            {ver} = obj;
        //添加请求标识
        this._reqList.push(ver);
    }

    //元素销毁时，清掉未完成Ajax回调函数
    componentWillUnmount(){
        if(this._reqList.length){
            systemApi.log("cancelRequest:"+this._reqList);
        }
        NetWork.cancelRequest(this._reqList);
    }

    //获取子元素
    getChildren() {
        var children = [];
        React.Children.forEach(this.props.children, (child) => {
          if (React.isValidElement(child)) {
            children.push(child);
          }
        });
        return children;
    }

}

PureComponent.contextTypes = {
  store: PropTypes.object
};
console.log(PureComponent,typeof PureComponent)
export default PureComponent;
