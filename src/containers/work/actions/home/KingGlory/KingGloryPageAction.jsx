import {
    showLoading,
    hideLoading,
    showMessage,
    WARNING,
    ERROR,
    SUCCESS
} from '../../../../../store/actions';

//获取我的档案
export function getMyFile(component, update) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("glory/personbaseinfo")
            .done(data => {
                dispatch(hideLoading());
                update(data || []);
            })
            .fail(data => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//如果是8月，提示信息
    export const isAugustTip=() => {
        return function(dispatch, state) {
            dispatch(showMessage('tip', '8月是抢擂赛哦，前10名即可瓜分15万元奖金'))
        }
    }

//获取单项TOP1
export function getSingleMax(component, update) {
    return function (dispatch, state) {
        component
            .requestJSON("glory/individualstrengths")
            .done(data => {
                update(data || []);
            })
            .fail(data => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取攻擂目标值
export function getTargetValue(component, update) {
    return function (dispatch, state) {
        component
            .requestJSON("glory/targetvalue")
            .done(data => {
                var {targetValue} = data;
                update(targetValue || []);
            })
            .fail(data => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取个人攻擂赛——王者之路列表
export function getKingofTheroad(params, component, updateList) {
    return function (dispatch, state) {
        component
            .requestJSON("glory/kingoftheroad", params)
            .done(data => {
                var {rows} = data;
                updateList(rows || []);
            })
            .fail(data => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取王者峡谷——5v5列表
export function getFiveVFive(params, component, updateList) {
    return function (dispatch, state) {
        component
            .requestJSON("glory/kingcanyon/teamtacticalsituation", params)
            .done(data => {
                var {rows} = data;
                updateList(rows || []);
            })
            .fail(data => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取王者峡谷——营业部列表
export function getBusiness(params, component, updateList) {
    return function (dispatch, state) {
        component
            .requestJSON("glory/kingcanyon/branchtacticalsituation", params)
            .done(data => {
                var {rows} = data;
                if (rows.length == 0)
                {
                    dispatch(showMessage(SUCCESS, "暂无数据了！"));
                }
                updateList(rows || []);
            })
            .fail(data => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取王者峡谷——公司列表
export function getCompany(params, component, updateList) {
    return function (dispatch, state) {
        component
            .requestJSON("glory/kingcanyon/fgsrealtimesituation", params)
            .done(data => {
                var {rows} = data;
                if (rows.length == 0)
                {
                    dispatch(showMessage(SUCCESS, "暂无数据了！"));
                }
                updateList(rows || []);
            })
            .fail(data => {
                dispatch(showMessage(ERROR, data.message));
            });
    }
}
