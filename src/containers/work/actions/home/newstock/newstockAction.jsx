import {showMessage, ERROR} from '../../../../../store/actions';

export function getNewStockList(component, updateList){
    return function(dispatch, state){
        component.requestJSON("appnewsharescal/newsharescal").done((data)=>{
            updateList && updateList(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取今日可申购
export function getAvailableList(component,updateList){
    return function(dispatch, state){
        component.requestJSON("getAvailable").done((data)=>{
            var list = data.data;
            updateList(list);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取公布中签
export function getPublicList(component,updateList){
    return function(dispatch, state){
        component.requestJSON("getAvailable").done((data)=>{
            var list = data.data;
            updateList(list);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取今日公布配号
export function getDistribList(component,updateList){
    return function(dispatch, state){
        component.requestJSON("getAvailable").done((data)=>{
            var list = data.data;
            updateList(list);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//获取今日公布配号
export function getWillApplyList(component,updateList){
    return function(dispatch, state){
        component.requestJSON("getAvailable").done((data)=>{
            var list = data.data;
            updateList(list);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
