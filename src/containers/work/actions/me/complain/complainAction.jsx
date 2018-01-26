import {showMessage, WARNING, ERROR} from '../../../../../store/actions';

//打开关闭手势开关
export function sendComplain(problemDescribe,appVersion, component, callback){
    return function(dispatch, getState){
        if(problemDescribe){
            Client.getHardwareInfo((info)=>{
                var {macName, systemVersion} = info;
                component.requestJSON("appFeedBack/saveInfo",{
                    problemDescribe,
                    deviceInfo:macName+systemVersion,
                    mobileVersion:appVersion
                }).done((data)=>{
                    callback && callback();
                }).fail((data)=>{
                    dispatch(showMessage(ERROR, data.message));
                });
            });
        }
        else{
            dispatch(showMessage(WARNING, "您还没开始吐槽呢"));
        }


    }
}
