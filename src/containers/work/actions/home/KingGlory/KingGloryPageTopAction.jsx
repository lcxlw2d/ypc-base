import {showLoading, hideLoading, showMessage, WARNING, ERROR, SUCCESS} from '../../../../../store/actions';

//获取王者kingoftheroad
export function kingOfTheRoad(params, component, updateList) {
    return function (dispatch, state) {
        dispatch(showLoading());
        component
            .requestJSON("glory/kingoftheroad", params)
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
