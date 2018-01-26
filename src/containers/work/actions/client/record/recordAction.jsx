import {
    showLoading,
    hideLoading,
    showMessage,
    ERROR,
    WARNING,
    SUCCESS
} from '../../../../../store/actions';

//获取本地录音列表
export function getLocalRecordFileList(updateList,isAppend,cb,component) {
    return function (dispatch, state) {
        Client.getLocalRecordFileList((data)=>{
            updateList(isAppend,data);
            cb&&cb();
        },(data)=>{
            cb&&cb();
        });
    }
}

//录音重命名
export function renameLocalRecordFileName(oldFileName, newFileName, succ, component) {
    return function (dispatch, state) {
        Client.renameLocalRecordFileName(oldFileName, newFileName, succ, () => {
            dispatch(showMessage(ERROR, '重命名失败请重试'));
        });
    }
}

//删除录音
export function deleteLocalRecordFile(fileName, succ, component) {
    return function (dispatch, state) {
        Client.deleteLocalRecordFile(fileName, succ, () => {
            dispatch(showMessage(ERROR, '删除失败请重试'));
        });
    }
}

//上传
export function FileTransfer(params, filePath, name, success, failure,component) {
    return function(dispatch, state) {
        //dispatch(showLoading());
        // component.UpLoadRecording("recording/upload", params,filePath,name,success,failure).done((data) => {
        //    // dispatch(hideLoading());
        //     success(data);
        //     dispatch(showMessage(SUCCESS, succText));
        // }).fail((data)=>{
        //    // dispatch(hideLoading());
        //     failure(data)
        //     dispatch(showMessage(ERROR, data.message));
        // });

        component.UpLoadRecording("recording/upload", params, filePath, name,(data)=>{
            success(data);
            dispatch(showMessage(SUCCESS, succText));
        },(data)=>{
            failure(data);
            dispatch(showMessage(ERROR, data.message));
        });

    }
}


//获取云端列表
export function getCloudList(params, isAppend, cb, component, updateList) {
     var{length}=params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("recording/list", params)
            .done((data) => {
                dispatch(hideLoading());
                var {rows} = data,
                    hasMore = rows.length == length;
                updateList(isAppend, rows || []);
                cb && cb(null, hasMore);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
                cb && cb();
            });
    }
}

//getNetworkType
//获取设备状态
export function getNetworkType(succ) {
    return function (dispatch, state) {
        Client.getNetworkType(succ);
    }
}

//获取资金帐号
export function getNameAndFundAccount(params, component, cb) {
    var{clientId}=params;
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("appcustomer/clientbase/"+clientId)
            .done((data) => {
                dispatch(hideLoading());
                cb(data);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取服务id
export function getmatchservid(params, component, cb) {
    var{recordingInnerId}=params;
    return function (dispatch, state) {
         dispatch(showLoading());
        component
            .requestJSON("recording/getmatchservid",params)
            .done((data) => {
                dispatch(hideLoading());
                cb(data);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}
