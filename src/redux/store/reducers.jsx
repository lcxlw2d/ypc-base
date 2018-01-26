import { combineReducers } from 'redux';
import {
    SHOW_GESTURE,HIDE_GESTURE,SHOW_LOADING, HIDE_LOADING, SHOW_MESSAGE, HIDE_MESSAGE, RESET_DATAS,
    BASE_SET_UINFO, BASE_SET_CLIENT_NAME, SET_DETAIL_MODE, SET_CLIENT_BACK, CLIENT_SET_FILTER,SET_INVEST_PARAM,
    BASE_ROLL_BACK_UNDO_TYPE, BASE_SET_UNDO_TYPE, DFT_TODO_TYPE, FROM_CLIENT_SEARCH_PAGE, EVENT_REFRESH_TODO_TOTAL,
    INVEST_TYPE_SHORT,INVEST_TYPE_STABLE,INVEST_TYPE_LONG,SET_INVEST_PRODUCT,CLEAR_INVEST_PRODUCT,RESET_INVEST_DATA,
    SET_INVEST_PRODUCT_ORDER,SET_SERVICE_PARAM, SET_POTENTIALDETAIL_PARAM, getOldCustomMOT, getOldCustomMOTKey,
    getNewCustomMOTKey, getNewCustomMOT
} from './actions';
import { CLIENT_SET_BASE_INFO } from "../../containers/work/actions/client/summary/summaryAction";

let loadingNum = 0;

export function injectReducer(store, reducers){
    reducers = Object.assign(reducers, {
        base:baseReducer
    });
    store.replaceReducer(combineReducers(reducers));
}

export function resetLoadingNum(){
    loadingNum = 0;
}

//是否包含AFA审批
function judgeAndAddType(typeList){
    var list = Array.prototype.slice.call(arguments, 1);
    for(var i=0;i<list.length;i++){
        var item = list[i];
        typeList += typeList.split(",").indexOf(item)==-1?","+item:"";
    }
    return typeList;
}

function baseReducer(state,action){
    var {type} = action,
        old_todo_type_list = getOldCustomMOT(),
        todo_type_list = getNewCustomMOT();

    if(old_todo_type_list){
        if(old_todo_type_list!="deprecated"){
            old_todo_type_list = judgeAndAddType(old_todo_type_list, "60001", "60002");
            systemApi.setValue(getNewCustomMOTKey(),old_todo_type_list);
            systemApi.setValue(getOldCustomMOTKey(),"deprecated");
        }
    }
    else{
        if(!todo_type_list){
            systemApi.setValue(getNewCustomMOTKey(),DFT_TODO_TYPE);
        }
    }

    state = state || {
        loading:false,
        messageshow:false,
        message:"",
        msgType:"",
        gesture:false,
        undoType:getNewCustomMOT(),
        userInfo:{
            userName:""
        },
        client:{
            clientId:"",
            potentialId:"",
            clientType:1,
            from:"",
            fromRecord:"",
            detailMode:"0",
            params:{},
            searchBack:"",
            vaild: 0,
            potentialIdTwo:'',
            star: 0,
            stockCode:"",
            fundCode:""
        },
        potentialDetail:{
            from:''
        },
        investadvice:{
            shortProductCode:"",
            shortProductName:"",
            shortSortName:"",
            shortOrderBy:"",
            stableProductCode:"",
            stableProductName:"",
            stableSortName:"",
            stableOrderBy:"",
            longerProductCode:"",
            longerProductName:"",
            longerSortName:"",
            longerOrderBy:"",
            from:"",
            params:{}
        },
        todo:{}
    };
    if(type == SHOW_GESTURE){
        return Object.assign({}, state, {gesture:true});
    }else if(type == HIDE_GESTURE){
        return Object.assign({}, state, {gesture:false});
    }else if(type == SHOW_LOADING){
        loadingNum++;
        return Object.assign({}, state, {loading:true});
    }
    else if(type == HIDE_LOADING){
        loadingNum = loadingNum>0 ? loadingNum-1 : 0;
        if(loadingNum==0){
            return Object.assign({}, state, {loading:false});
        }
        return state;
    }
    else if(type == SHOW_MESSAGE){
        var {message,msgType} = action;
        return Object.assign({}, state, {messageshow:true,msgType,message});
    }
    else if(type == HIDE_MESSAGE){
        var {message} = action;
        return Object.assign({}, state, {messageshow:false});
    }
    else if(type == BASE_SET_UINFO){
        var {userInfo} = state,
            {userName,departId,departmentOrgName,userId,gestureSet,gestureSwitch,phonecode} = action;
        if(userName){
          userInfo.userName = userName;
        }
        if(departId){
          userInfo.departId = departId;
        }
        if(departmentOrgName){
          userInfo.departmentOrgName = departmentOrgName;
        }
        if(userId){
          userInfo.userId = userId;
        }
        if(gestureSet){
          userInfo.gestureSet = gestureSet;
        }
        if(gestureSwitch){
          userInfo.gestureSwitch = gestureSwitch;
        }
        if(phonecode){
            userInfo.phonecode = phonecode;
        }

        return Object.assign({}, state, {userInfo});
    }
    else if(type == BASE_SET_UNDO_TYPE){
        var {undoType,willBack} = action,
            curType = state.undoType;
        if(!willBack){
            systemApi.setValue(getNewCustomMOTKey(), undoType);
            Event.fire(EVENT_REFRESH_TODO_TOTAL);
        }
        return Object.assign({}, state, {undoType});
    }
    else if(type == BASE_ROLL_BACK_UNDO_TYPE){
        var undoType = getNewCustomMOT();
        return Object.assign({}, state, {undoType});
    }
    else if(type == BASE_SET_CLIENT_NAME){
        var {clientId, from, params} = action,
            {client} = state;
        client = Object.assign(client,{clientId, from, params});
        return Object.assign({}, state, {client});
    }
    else if(type == SET_DETAIL_MODE){
        var {detailMode} = action,
            {client} = state;
        client = Object.assign(client,{detailMode});
        return Object.assign({}, state, {client});
    }
    else if(type == SET_CLIENT_BACK){
        var {searchBack} = action,
            {client} = state;
        client = Object.assign(client,{searchBack});
        return Object.assign({},state,{client});
    }
    else if(type == CLIENT_SET_FILTER){
        var {vaild, star, stockCode, fundCode} = action,
            {client} = state;
        client = Object.assign(client,{vaild, star, stockCode, fundCode});
        return Object.assign({},state,{client});
    }
    else if(type == RESET_DATAS){
        var {client} = state;
        client = Object.assign(client,{vaild:0, star:0, stockCode:"", fundCode:""});
        return Object.assign({},state,{client});
    }
    else if(type == SET_INVEST_PARAM){
        var {from, params} = action,
            {investadvice} = state;
        investadvice = Object.assign(investadvice,{from, params});
        return Object.assign({}, state, {investadvice});
    }
    else if(type == SET_INVEST_PRODUCT){
        var {subType, productCode, productName} = action,
            {investadvice} = state;
        if(subType == INVEST_TYPE_SHORT)
            investadvice = Object.assign(investadvice,{shortProductCode:productCode,shortProductName:productName});
        if(subType == INVEST_TYPE_STABLE)
            investadvice = Object.assign(investadvice,{stableProductCode:productCode,stableProductName:productName});
        if(subType == INVEST_TYPE_LONG)
            investadvice = Object.assign(investadvice,{longerProductCode:productCode,longerProductName:productName});
        return Object.assign({}, state, {investadvice});
    }
    else if(type == SET_INVEST_PRODUCT_ORDER){
        var {subType, sortName, orderBy} = action,
            {investadvice} = state;
        if(subType == INVEST_TYPE_SHORT)
            investadvice = Object.assign(investadvice,{shortSortName:sortName,shortOrderBy:orderBy});
        if(subType == INVEST_TYPE_STABLE)
            investadvice = Object.assign(investadvice,{stableSortName:sortName,stableOrderBy:orderBy});
        if(subType == INVEST_TYPE_LONG)
            investadvice = Object.assign(investadvice,{longerSortName:sortName,longerOrderBy:orderBy});
        return Object.assign({}, state, {investadvice});
    }
    else if(type == CLEAR_INVEST_PRODUCT){
        var {investadvice} = state;
        investadvice = Object.assign(investadvice,{
            shortProductCode:"",shortProductName:"",
            stableProductCode:"",stableProductName:"",
            longerProductCode:"",longerProductName:""
        });
        return Object.assign({}, state, {investadvice});
    }
    else if(type == RESET_INVEST_DATA){
        var {investadvice} = state;
        investadvice = Object.assign(investadvice,{
            shortProductCode:"",shortProductName:"",
            shortSortName:"",shortOrderBy:"",
            stableProductCode:"",stableProductName:"",
            stableSortName:"",stableOrderBy:"",
            longerProductCode:"",longerProductName:"",
            longerSortName:"",longerOrderBy:"",
            from:"",params:{}
        });
        return Object.assign({}, state, {investadvice});
    }
    else if(type == SET_SERVICE_PARAM){
        let {client}=state, {fromRecord = '', params = {}} = action, {clientId = '', potentialId = '', clientType=1}=params;
        client = Object.assign(client, {fromRecord, clientId, potentialId, clientType});
        return Object.assign({}, state, {client})
    }
    else if(type == SET_POTENTIALDETAIL_PARAM){
        let {potentialDetail} = state, { params = {}, from='' } = action;
        potentialDetail = Object.assign(potentialDetail, { from });
        return Object.assign({}, state, {potentialDetail})

    }
    else if(type == CLIENT_SET_BASE_INFO){
        let { clientId } = action, {client} = state;
        if(clientId != undefined){
            client = Object.assign(client, { clientId });
            return Object.assign({}, state, {client})
        }else{
            return state;
        }
    }

    return state;
}
