import {showMessage, showLoading,hideLoading,ERROR, SUCCESS} from '../../../../../store/actions';

export function mktProdAfamList(params,cb,errCb,component){
    //search、orderName、sort需要特殊处理，先取出；如果orderName有值，把排序名称和顺序传入参数


    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("MktProdAfaM/list",params).done((data)=>{
            dispatch(hideLoading());
            cb && cb(data);
        }).fail((data)=>{
          dispatch(hideLoading());
          //dispatch(showMessage(data.code));
          if(data.statuscode=="404" || data.statuscode=="500"){
            dispatch(showMessage(ERROR,data.message));
          }

          else{
              errCb && errCb();
          }

        });
    }
}

export function getSheetMap(params,cb,component){
    //search、orderName、sort需要特殊处理，先取出；如果orderName有值，把排序名称和顺序传入参数

    return function(dispatch, state){
      var {hasMore,currsheet,sort,desc,...param}=params;
      if(hasMore==false){
        dispatch(showMessage(SUCCESS, "没有更多数据了"));
        return;
      }
        dispatch(showLoading());
        if(sort) param = {sort,desc,...param};
        component.requestJSON("MktProdAfaM/list",param).done((data)=>{
          dispatch(hideLoading());
          if(currsheet!=null){
            if(data.sheetMap.MktProdRankData[currsheet].mktReportList.total==0){
              dispatch(showMessage(SUCCESS, "没有更多数据了"));
            }else{
              cb && cb(data);
            }
          }else{
              cb && cb(data);
          }

        }).fail((data)=>{
          dispatch(hideLoading());
          cb && cb({sheetMap:{MktProdRankData:[]}})
          //  dispatch(showMessage(ERROR, data.message));
        });
    }
}

export function getActivityConditionMap(params,cb,component){
    //search、orderName、sort需要特殊处理，先取出；如果orderName有值，把排序名称和顺序传入参数

    return function(dispatch, state){
      dispatch(showLoading());
        component.requestJSON("MktProdAfaM/list",params).done((data)=>{
          dispatch(hideLoading());
            cb && cb(data);
        }).fail((data)=>{
          dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
