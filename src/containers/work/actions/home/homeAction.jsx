import {showMessage, showLoading, hideLoading, ERROR} from '../../../../store/actions';

//获取新的日历信息
export function hasNewCalendar(update, component) {

    return function(dispatch, state) {
    //  update({hasNewCalendar:1,isVisitCalendar:0,imgId:111,attachmentUrl:"url",QRCodeParam:{x:10,y:10,w:20,h:20},openAccountPremission:1});
    //  return ;
        component.requestJSON("calendar/new").done((data) => {
          var {hasNewCalendar,isVisitCalendar,imgId,attachmentUrl,QRCodeParam,openAccountPremission} =data;
          update && update(data);

        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });

    }
}

export function visitCalendar(imgId,cb, component) {
    return function(dispatch, state) {
        component.requestJSON("calendar/visit/"+imgId).done((data) => {
            cb && cb();
        }).fail((data) => {
            cb && cb();
        });

    }
}

//获取新消息数
export function hasNews(update, component) {
    return function(dispatch, state) {
        component.requestJSON("notice/unread").done((data) => {
            var {count = 0} = data;
            if(count>0)
                update && update(true);
            else
                update && update(false);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });

    }
}

//获取广告列表
export function getAds(component, setAds) {
    return function(dispatch, state) {
        var overtime = systemApi.getValue("config_tab_home_overtime"),
            ads = Cache.getValue("home_ads_list", overtime);

        //先从缓存中读取数据，如果没有再发请求
        if (ads) {
            setAds && setAds(ads, true);
        } else {
            component.requestJSON("appImage/banner").done((data) => {
                setAds && setAds(data.rows, false);
                Cache.setValue("home_ads_list", data.rows);
            }).fail((data) => {
                dispatch(showMessage(ERROR, data.message));
            });
        }

    }
}

export function getJournel(component, update) {
    return function(dispatch, state) {
        var overtime = systemApi.getValue("config_tab_home_overtime"),
            journel = Cache.getValue("home_journel_data", overtime);

        //先从缓存中读取数据，如果没有再发请求
        if (journel) {
            update && update(journel);
        } else {
            dispatch(showLoading());
            component.requestJSON("appguide/guideinfo").done((data) => {
                dispatch(hideLoading());
                update && update(data);
                Cache.setValue("home_journel_data", data);
            }).fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
        }

    }
}

//获取交易龙虎榜
export function getTradeRank(force, component, update) {
    return function(dispatch, state) {
        var overtime = systemApi.getValue("config_tab_home_overtime"),
            trade = Cache.getValue("home_trade_rank", overtime);

        //先从缓存中读取数据，如果没有再发请求
        if (trade && !force) {
            update && update(trade);
        } else {
            component.requestJSON("apptrans/topper").done((data) => {
                update && update(data);
                Cache.setValue("home_trade_rank", data);
            }).fail((data) => {
                dispatch(showMessage(ERROR, data.message));
            });
        }

    }
}

//获取当日银证转账
export function getTransferRank(force, component, update) {
    return function(dispatch, state) {
        var overtime = systemApi.getValue("config_tab_home_overtime"),
            transfer = Cache.getValue("home_transfer_rank", overtime);

        //先从缓存中读取数据，如果没有再发请求
        if (transfer && !force) {
            update && update(transfer);
        }else{
            component.requestJSON("apptrans/banktransfer").done((data) => {
                update && update(data.list);
                Cache.setValue("home_transfer_rank", data.list);
            }).fail((data) => {
                dispatch(showMessage(ERROR, data.message));
            });
        }

    }
}

//获取MOT数量
export function getMotCount(component, updateCount) {
    return function(dispatch, state) {
        component.requestJSON("appMot/todoReminderCountByType").done((data) => {
            //更新界面数据
            updateCount(data);
        }).fail((data) => {
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
