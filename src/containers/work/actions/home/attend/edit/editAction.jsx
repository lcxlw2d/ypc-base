import {showMessage, showLoading, hideLoading, ERROR, SUCCESS, WARNING} from '../../../../../../store/actions';

//提示信息
export function warn(message, duration){
    return function(dispatch, state){
        dispatch(showMessage(WARNING, message, duration));
    }
}

//选择头像相册或拍照--cocoAdd
export function chooseHeadPhoto(params, success, error){
    var {type} = params;
    return function(dispatch, state){
        dispatch(showLoading());
        Client.getHeadImageData(type, (urls)=>{
            dispatch(hideLoading());
            success && success(urls);
        }, ()=>{
            dispatch(hideLoading());
            error && error();
        });
    }
}

//上传头像文件--cocoAdd
export function submitHeadImage(params, imageFilePath,name, component, update) {

    return function(dispatch, state) {
        dispatch(showLoading());
        component.uploadFile("head/upload", params, imageFilePath,name).done((data) => {
            dispatch(hideLoading());
            var {url} = data;
            Cache.setValue("me_headImageURL_table",url);
            update(data);
            dispatch(showMessage(SUCCESS, "上传头像成功!"));
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, "上传失败失败!"));
        });
    }
}



//选择相册或拍照
export function choosePhoto(params, success, error){
    var {type, remain} = params;
    return function(dispatch, state){
        dispatch(showLoading());
        Client.openAlbum(type, remain, (url)=>{
            dispatch(hideLoading());
            success && success(url);
        }, ()=>{
            dispatch(hideLoading());
            error && error();
        });
    }
}

//获取打卡详情
export function getContent(params, component, update) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("fieldvisit/detail",params).done((data) => {
            dispatch(hideLoading());
            update(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//删除草稿
export function deleteDraft(params, component, update) {
    return function(dispatch, state) {
        dispatch(showLoading());
        component.requestJSON("fieldvisit/delete",params).done((data) => {
            dispatch(hideLoading());
            update(data);
            dispatch(showMessage(SUCCESS, "删除成功"));
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//打卡提交
export function attendSubmit(params, imgs, component, update) {
    var {type} = params,
        succText = type=="0"?"保存成功":"提交成功",
        sendParams = {
            contentType:"1",
            ...params
        };

    return function(dispatch, state) {
        dispatch(showLoading());
        component.uploadMultiFile("fieldvisit", params, imgs).done((data) => {
            dispatch(hideLoading());
            update(data);
            dispatch(showMessage(SUCCESS, succText));
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//删除图片
export function deletePic(params, component, update){
    return function(dispatch, state) {
        var {attachmentId} = params;
        if(attachmentId){
            dispatch(showLoading());
            component.requestJSON("fieldvisit/deleteImg", params).done((data) => {
                dispatch(hideLoading());
                update();
                dispatch(showMessage(SUCCESS, "删除成功"));
            }).fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
        }
        else{
            update();
            dispatch(showMessage(SUCCESS, "删除成功"));
        }

    }
}

//获取评论列表
export function getCommentList(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("fieldvisitComment/list", params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data.rows);
        }).fail((data)=>{
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));


        });
    }
}


//添加评论
export function addComment(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("fieldvisitComment/add", params).done((data)=>{
            dispatch(hideLoading());
            cb&&cb()
            dispatch(showMessage(SUCCESS, '新增评论成功'));
        }).fail((data)=>{
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));


        });
    }
}


//删除评论
export function deleteComment(params, cb, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("fieldvisitComment/delete", params).done((data)=>{
            dispatch(hideLoading());
            cb&&cb()
            dispatch(showMessage(SUCCESS, "删除成功"));
        }).fail((data)=>{
          dispatch(hideLoading());
          dispatch(showMessage(ERROR,data.message));


        });
    }
}
