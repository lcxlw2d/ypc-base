import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

export function getBroductList(params,isAppend,cb,component,updateList){
    return function(dispatch, state){
        var {length} = params,
            {productCode,...otherParams} = params;
        component.requestJSON("roboadvisor/"+productCode+"/accounts",otherParams).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend, rows || []);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}
