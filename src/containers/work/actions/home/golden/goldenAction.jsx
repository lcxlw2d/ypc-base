import {showMessage, ERROR, SUCCESS} from '../../../../../store/actions';

function setParams(q) {
    if(!q) return {};

    var re = /[\u4E00-\u9FA5]/g;
	if(re.test(q)){
        return {clientName:q};
	}else{
		re = /^\d{15}|\d{18}|\d{17}x|\d{17}X$/g;
		if(re.test(q)){
            return {idNo:q};
		}else{
            return {clientId:q};
		}
	}
	return {};
}

export function getGoldenList(params,isAppend,cb,component,updateList){
    //search、orderName、sort需要特殊处理，先取出；如果orderName有值，把排序名称和顺序传入参数
    var length = 20,
        {search,orderName,order, ...sendParams} = params,
        sort = orderName?{sort:orderName,order}:{};

    sendParams = Object.assign(sendParams,{length},setParams(search),sort);

    return function(dispatch, state){
        component.requestJSON("appClient/jarguarDetail",sendParams).done((data)=>{
            var {rows} = data,
                hasMore = rows.length==length;
            updateList(isAppend,rows);
            cb && cb(null, hasMore);
        }).fail((data)=>{
            dispatch(showMessage(ERROR, data.message));
            cb && cb();
        });
    }
}
