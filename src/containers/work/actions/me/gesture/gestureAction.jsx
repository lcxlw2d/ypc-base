import {showMessage, WARNING} from '../../../../../store/actions';

//打开关闭手势开关
export function sendComplain(content, callback){
    return function(dispatch, getState){
        dispatch(showMessage(WARNING,"时间有点紧，提交稍后呈上！"));
        callback && callback();
    }
}
