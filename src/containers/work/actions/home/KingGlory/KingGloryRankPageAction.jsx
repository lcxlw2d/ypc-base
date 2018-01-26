import {showLoading, hideLoading, showMessage, WARNING, ERROR, SUCCESS} from '../../../../../store/actions';

//获取teamTop10团队
export function getTeamTop10(component, update) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("glory/kingcanyon/teamtop")
            .done((data) => {
                dispatch(hideLoading());
                update(data || []);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取王者峡谷——5v5列表
export function getFiveVFive(params, component, updateList) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("glory/kingcanyon/teamtacticalsituation", params)
            .done((data) => {
                dispatch(hideLoading());
                var {rows} = data;
                if (rows.length == 0)
                 {
                    dispatch(showMessage(SUCCESS, "暂无数据了！"));
                }
                updateList(rows || []);
            })
            .fail((data) => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取王者峡谷——营业部列表
export function getBusiness(params, component, updateList) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("glory/kingcanyon/branchtacticalsituation", params)
            .done(data => {
                dispatch(hideLoading());
                var {rows} = data;
                if (rows.length == 0)
                {
                    dispatch(showMessage(SUCCESS, "暂无数据了！"));
                }
                updateList(rows || []);
            })
            .fail(data => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}

//获取王者峡谷——公司列表
export function getCompany(params, component, updateList) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("glory/kingcanyon/fgsrealtimesituation", params)
            .done(data => {
                dispatch(hideLoading());
                var {rows} = data;
                if (rows.length == 0)
                {
                    dispatch(showMessage(SUCCESS, "暂无数据了！"));
                }
                updateList(rows || []);
            })
            .fail(data => {
                dispatch(hideLoading());
                dispatch(showMessage(ERROR, data.message));
            });
    }
}
