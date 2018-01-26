import {showLoading, hideLoading, showMessage, ERROR} from '../../../../../store/actions';

export const EVENT_UNREAD_NUM = 'SET_UNREAD_NUM';

//设置拜访列表
export function setAttendList(isAppend, data) {
    return { type: ATTEND_SET_ATTENDLIST, isAppend, data };
}

//获取拜访列表
export function getNewsList(params, isAppend, cb, component, update) {
    return function(dispatch, state) {

        var {length} = params;
        component.requestJSON("notice/list", params).done((data) => {
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

//获取拜访列表
export function getHeadLine(update, component) {
    return function(dispatch, state) {
        component.requestJSON("notice/headline").done((data) => {
            var {rows} = data;
            update(rows);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取拜访列表
export function shareNews(type, url, noticeTitle,abstracts,cb,component) {
    return function(dispatch, state) {
        component.requestJSON("appImage/weChat",{
            imgTitle:"XXKD"
        }).done((data)=>{
            var {imgUrl,titleAndDescription=""} = data;
            url = systemApi.getValue("rootUrl")+url;
            Wechat.share({
                message: {
                    title: noticeTitle,
                    description: abstracts,
                    thumb: imgUrl,
                    media: {
                        type: Wechat.Type.WEBPAGE,   // webpage
                        webpageUrl: url    // webpage
                    }
                },
                scene: type=="SESSION"?Wechat.Scene.SESSION:Wechat.Scene.TIMELINE // share to Timeline
            }, function() {
                cb && cb();
            }, function(reason) {
                console.log("Failed: " + reason);
                dispatch(showMessage(ERROR, reason));
                cb && cb();
            });



        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取拜访列表
export function praise(noticeId,likeStatus,update, component) {
    return function(dispatch, state) {
        component.requestJSON("notice/like/"+noticeId,{likeStatus}).done((data) => {
            var {likeStatus,likeCounts} = data;
            update(likeStatus,likeCounts);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}


export function getContent(noticeId,cb, component) {
    return function(dispatch, state) {


        component.requestJSON("notice/detail/"+noticeId).done((data) => {
            // var {title,abstract,type,readCounts,likeCounts,
            //     createDate,readStatus,content,likeStatus,shareUrl} = data;
            cb(data);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
