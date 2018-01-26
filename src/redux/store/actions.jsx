export const SHOW_LOADING = '_BASE_SHOW_LOADING_';
export const HIDE_LOADING = '_BASE_HIDE_LOADING_';
export const SHOW_GESTURE = '_BASE_SHOW_GESTURE_';
export const HIDE_GESTURE = '_BASE_HIDE_GESTURE_';
export const SHOW_MESSAGE = '_BASE_SHOW_MESSAGE_';
export const HIDE_MESSAGE = '_BASE_HIDE_MESSAGE_';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const WARNING = 'warning';
export const TIP = 'tip';

export const CLIENT_SET_FILTER = "_BASE_CLIENT_SET_FILTER_";
export const RESET_DATAS = "_BASE_RESET_DATAS_";
export const BASE_SET_UINFO = '_BASE_SET_UINFO_';
export const SET_DETAIL_MODE = '_BASE_SET_DETAIL_MODE_';
export const BASE_SET_UNDO_TYPE = '_BASE_SET_UNDO_TYPE_';
export const BASE_ROLL_BACK_UNDO_TYPE = '_BASE_ROLL_BACK_UNDO_TYPE_';
export const BASE_SET_CLIENT_NAME = '_BASE_SET_CLIENT_NAME_';
export const SET_CLIENT_BACK = '_BASE_SET_CLIENT_BACK_';
export const SET_INVEST_PARAM = '_BASE_SET_INVEST_PARAM_';
export const SET_SERVICE_PARAM = '_BASE_SET_SERVICE_PARAM_';
export const SET_INVEST_PRODUCT = '_BASE_SET_INVEST_PRODUCT_';
export const SET_INVEST_PRODUCT_ORDER = '_BASE_SET_INVEST_PRODUCT_ORDER_';
export const CLEAR_INVEST_PRODUCT = '_BASE_CLEAR_INVEST_PRODUCT_';
export const RESET_INVEST_DATA = '_BASE_RESET_INVEST_DATA_';
export const SET_POTENTIALDETAIL_PARAM = '_BASE_POTENTIALDETAIL_DATA_';

export const FROM_CLIENT_PAGE = '_BASE_FROM_CLIENT_PAGE_';
export const FROM_CLIENT_SEARCH_PAGE = '_BASE_FROM_CLIENT_SEARCH_PAGE_';
export const FROM_HOME_PAGE = '_BASE_FROM_HOME_PAGE_';
export const FROM_GOLDEN_PAGE = '_BASE_FROM_GOLDEN_PAGE_';
export const FROM_MARGIN_PAGE = '_BASE_FROM_MARGIN_PAGE_';
export const FROM_ATTEND_PAGE = '_BASE_FROM_ATTEND_PAGE_';
export const FROM_ATTEND_DETAIL_PAGE = '_BASE_FROM_ATTEND_DETAIL_PAGE_';
export const FROM_ATTENDSHOW_DETAIL_PAGE = '_BASE_FROM_ATTENDSHOW_DETAIL_PAGE_';
export const FROM_DEADLINE_PAGE = '_BASE_FROM_DEADLINE_PAGE_';
export const FROM_TODO_DETAIL_PAGE = '_BASE_FROM_TODO_DETAIL_PAGE_';
export const FROM_INVEST_BRODUCT_PAGE = '_BASE_FROM_INVEST_BRODUCT_PAGE_';
export const FROM_INVEST_CUSTOMER_PAGE = '_BASE_FROM_INVEST_CUSTOMER_PAGE_';
export const FROM_INVEST_DETAIL_PAGE = '_BASE_FROM_INVEST_DETAIL_PAGE_';
export const FROM_MUSTSEE_TODAY_LIST='_BASE_FROM_MUSTSEE_TODAY_LIST_';
export const FROM_POTENTIALDETAIL_PAGE = '_BASE_FROMPOTENTIALDETAIL_PAGE_';
export const FROM_CUSIOMERRADAR_PAGE = '_BASE_CUSIOMERRADAR_PAGE_';


export const INVEST_TYPE_SHORT = '_BASE_INVEST_TYPE_SHORT_';
export const INVEST_TYPE_STABLE = '_BASE_INVEST_TYPE_STABLE_';
export const INVEST_TYPE_LONG = '_BASE_INVEST_TYPE_LONG_';

export const DFT_TODO_TYPE = '50033,50046,50051,50055,45,50029,50030,50041,50042,50043,50048,50049,50053,50056,60001,60002';
//MOT列表显示顺序
export const MOTORDER = ["50033","50046","50051","50055","45","50029","50030","50041","50042","50043","50048","50049","50053","50056","50032","41","60001","60002"];
export const MOTDATA = {
    //name:MOT名称，shortName:MOT缩写名，icoCls：图标className，field：MOT数量字段，evtId：首页MOT点击事件id，evtTag：首页MOT点击事件label
    "45":   {name:"融资融券负债到期提醒", shortName:"两融到期", icoCls:"margin", field:"rzrqRemind", evtId:"1022", evtTag:"HOME_CLICK_RZRQREMIND"},
    "50033":{name:"新股中签", shortName:"新股中签", icoCls:"newstock", field:"NewShareTheSuccess", evtId:"1019", evtTag:"HOME_CLICK_NEWSHARETHESUCCESS"},
    "50053":{name:"新股中签缴款", shortName:"新股缴款", icoCls:"stockfee", field:"AfaSecuIpoShort", evtId:"1025", evtTag:"HOME_CLICK_AFASECUIPOSHORT"},
    "50046":{name:"资金异动", shortName:"资金异动", icoCls:"fund", field:"LargeTrnsfrDerive", evtId:"1020", evtTag:"HOME_CLICK_LARGETRNSFRDERIVE"},
    "50051":{name:"生日祝福", shortName:"生日提醒", icoCls:"birthday", field:"BirthdayWishes", evtId:"1021", evtTag:"HOME_CLICK_BIRTHDAYWISHES"},
    "50032":{name:"开户首月无资金转入", shortName:"首月无资金", icoCls:"nomoneyin", field:"FirstMonTrnsfrDerive", evtId:"1024", evtTag:"HOME_CLICK_FIRSTMONTRNSFRDERIVE"},
    "41":   {name:"下次服务备忘提醒", shortName:"服务备忘", icoCls:"nexttip", field:"NextServ", evtId:"1023", evtTag:"HOME_CLICK_NEXTSERV"},
    "50042":{name:"证件有效期到期提醒", shortName:"证件到期", icoCls:"deadline", field:"IDCardExpiresDerive", evtId:"1026", evtTag:"HOME_CLICK_IDCARDEXPIRESDERIVE"},
    "50029":{name:"融资融券担保比例预警", shortName:"两融维保比例", icoCls:"marginratio", field:"GuaranteeMarginRatio", evtId:"1027", evtTag:"HOME_CLICK_GUARANTEEMARGINRATIO"},
    "50030":{name:"约定式购回履约保障比例提醒", shortName:"约定购回比例", icoCls:"buyratio", field:"PerformanceRate", evtId:"1028", evtTag:"HOME_CLICK_PERFORMANCERATE"},
    "50041":{name:"分红提示", shortName:"分红提示", icoCls:"profit", field:"BonusPrompt", evtId:"1029", evtTag:"HOME_CLICK_BONUSPROMPT"},
    "50043":{name:"退市提示", shortName:"退市提示", icoCls:"quit", field:"DelistingPrompt", evtId:"1030", evtTag:"HOME_CLICK_DELISTINGPROMPT"},
    "50048":{name:"股票配股提示", shortName:"股票配股", icoCls:"stockdeli", field:"StockAllotePrompt", evtId:"1031", evtTag:"HOME_CLICK_STOCKALLOTEPROMPT"},
    "50049":{name:"增发提示", shortName:"增发提示", icoCls:"stockadd", field:"SEOPrompt", evtId:"1032", evtTag:"HOME_CLICK_SEOPROMPT"},
    "50055":{name:"客户流失预警提醒", shortName:"客户流失", icoCls:"clientflow", field:"warnLostClientCEP", evtId:"1033", evtTag:"HOME_CLICK_WARNLOSTCLIENTCEP"},
    "50056":{name:"新股开板预警", shortName:"新股开板预警", icoCls:"opentip", field:"SecuipoNoopenStockCEP", evtId:"1034", evtTag:"HOME_CLICK_SECUIPONOOPENSTOCKCEP"},
    "60001":{name:"AFA导出审批", shortName:"导出审批", icoCls:"approve", field:"exportAuditor", evtId:"HOME_MOTCLICK_EXPORTAUDITOR", evtTag:"HOME_CLICK_EXPORTAUDITOR"},
    "60002":{name:"AFA短信审批", shortName:"短信审批", icoCls:"message", field:"AfaSmsAuditCount", evtId:"HOME_MOTCLICK_MESSAGEAUDITOR", evtTag:"HOME_CLICK_MESSAGEAUDITOR"}
};

//Event
export const EVENT_REFRESH_TODO_TOTAL = '_BASE_EVENT_REFRESH_TODO_TOTAL_';


const STORAGE_CLIENT_SEARCH_HISTORY = "clientSearchHistory";
let msgIndex = -1;

export function showGesture(){
    return {
        type:SHOW_GESTURE
    };
}

export function hideGesture(){
    return {
        type:HIDE_GESTURE
    };
}
export function showLoading(){
    return {
        type:SHOW_LOADING
    };
}

export function hideLoading(){
    return {
        type:HIDE_LOADING
    };
}
/*
    @param type
        信息提示类型（success|error|warning）
    @param message
        显示消息内容
    @param duration
        显示时长（默认2000ms）
*/
export function showMessage(type, message, duration){
    duration = duration || 1500;
    return function(dispatch, state){
        clearTimeout(msgIndex);
        dispatch({type:SHOW_MESSAGE,msgType:type,message});

        msgIndex = setTimeout(function(){
            dispatch({type:HIDE_MESSAGE});
        },duration);
    }
}

/*********MOT类型配置获取**********/
export function getOldCustomMOTKey(){
    return "TODO_TYPE_LIST_NEW_1";
}
export function getOldCustomMOT(){
    return systemApi.getValue(getOldCustomMOTKey());
}
export function getNewCustomMOTKey(){
    return "TODO_TYPE_LIST_NEW_2";
}
export function getNewCustomMOT(){
    return systemApi.getValue(getNewCustomMOTKey());
}
/*********MOT类型配置获取**********/

//设置用户信息
export function setUserInfo(userName,departId,departmentOrgName,userId,gestureSet,gestureSwitch,phonecode){
    return {
        type:BASE_SET_UINFO,
        userName,
        departId,
        departmentOrgName,
        userId,
        gestureSet,
        gestureSwitch,phonecode
    };
}

//检查手势开关
export function checkGesture(cb,component){
    return function(dispatch, state){
        dispatch(showLoading());
        //查询是否开启手势密码
        component.requestJSON("applogin/getGestureStatus").done((data)=>{
            dispatch(hideLoading());
            var {departId,departmentOrgName,nonce,userId,userName,gestureSet="0",gestureSwitch="0"} = data;
            //存储用户信息
            dispatch(setUserInfo(userName,departId,departmentOrgName,userId,gestureSet,gestureSwitch));

            cb && cb(gestureSwitch=="1"?true:false);

        }).fail((data)=>{
            //显示错误信息
            dispatch(hideLoading());
            //dispatch(showMessage("error",data.message));
        });
    }
}

//验证手势密码
export function checkGesturePwd(password,component,succ,err){
    return function(dispatch, state){
        var nonce = systemApi.getValue("nonce");
        password = md5(md5(password)+nonce)
        component.requestJSON("applogin/validatePassword",{
            passType:"2",
            password
        }).done((data)=>{
            //执行成功回调
            succ && succ();
        }).fail((data)=>{
            dispatch(showMessage(ERROR,data.message));
            err && err();
        });
    }
}

//设置待办过滤类型
export function setUndoType(undoType, willBack){
    willBack = willBack || false;
    return {
        type:BASE_SET_UNDO_TYPE,
        undoType,
        willBack
    }
}

//设置待办过滤类型
export function rollBackUndoType(){
    return {
        type:BASE_ROLL_BACK_UNDO_TYPE
    }
}

//获取配置参数
export function getSystemConfig(component, updateConfig){
    return function(dispatch, state){
        component.requestJSON("appParam/info",{
            type:"version"
        },null,{
            needNonce:false
        }).done((data)=>{
            updateConfig && updateConfig(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//获取热更新资源配置
export function getResUpdateConfig(component, updateConfig){
    return function(dispatch, state){
        component.requestJSON("appParam/resource").done((data)=>{
            updateConfig && updateConfig(data);
        }).fail((data)=>{
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//为全景图设置用户名和clientId
function setSummaryInfo(clientId,from,params){
    params = params || {};
    return {
        type: BASE_SET_CLIENT_NAME,
        clientId,
        from,
        params
    }
}

/*
    设置全景图模式
    detailMode: 0-普通；1-信用
*/
export function setDetailMode(detailMode){
    return {
        type:SET_DETAIL_MODE,
        detailMode
    }
}

export function setDetailModeAction(detailMode){
    return function(dispatch, state) {
        if(detailMode=='0')
            dispatch(showMessage(SUCCESS,'切换至普通账户'));
        else {
            dispatch(showMessage(SUCCESS,'切换至信用账户'));
        }

        dispatch({
            type:SET_DETAIL_MODE,
            detailMode
        });

    }
}

//跳转到客户全景图
export function gotoDetail(clientId,from,params) {
    return function(dispatch, state) {
        dispatch(setSummaryInfo(clientId,from,params));
        dispatch(setDetailMode("0"));
        hashHistory.push("/work/client/detail");
    }
}

//为投顾精灵产品详情设置参数
function setInvestInfo(from,params){
    params = params || {};
    return {
        type: SET_INVEST_PARAM,
        from,
        params
    }
}

//为服务记录列表传递参数clientId
function setServiceClientId(fromRecord,params) {
    params = params || {};
    return {
        type: SET_SERVICE_PARAM,
        fromRecord,
        params
    }
}

//设置产品代码和名称
export function setInvestProduct(subType,productCode,productName){
    return {
        type: SET_INVEST_PRODUCT,
        subType, productCode, productName
    }
}

//设置产品代码和名称
export function setInvestOrder(subType,sortName,orderBy){
    return {
        type: SET_INVEST_PRODUCT_ORDER,
        subType, sortName,orderBy
    }
}

//设置产品代码和名称
export function clearInvestProduct(){
    return {
        type: CLEAR_INVEST_PRODUCT
    }
}

//清空投顾精灵reducer数据
export function resetInvestData(){
    return {
        type: RESET_INVEST_DATA
    }
}

function getInvestFromStr(from){
    if(from == FROM_INVEST_BRODUCT_PAGE) return "broduct";
    if(from == FROM_INVEST_CUSTOMER_PAGE) return "customer";
}

//跳转到投顾精灵产品详情页
export function gotoInvestDetail(from, params) {
    return function(dispatch, state) {
        var {subType, clientId} = params;
        dispatch(setInvestInfo(from,params));
        hashHistory.push("/work/home/investadvice/"+getInvestFromStr(from)+"/"+subType+"/behavior/"+clientId);
    }
}

//跳转到时光机界面
export function investGotoTimeMachine(params) {
    return function(dispatch, state) {
        dispatch(setInvestInfo("",params));
        hashHistory.push("/work/home/product");
    }
}

//录音跳转服务列表
export function  recordJumpService(fromRecord,params,to) {
    return function(dispatch, state) {
        dispatch(setServiceClientId(fromRecord,params));
        hashHistory.push(to);
    }
}

//设置客户搜索进入途径
export function setClientSearchBack(enterRoute) {
    return {
        type:SET_CLIENT_BACK,
        searchBack:enterRoute
    }
}

//设置过滤条件
export function setClientListFilter(vaild, star, stockCode, fundCode, cb) {
    return function(dispatch, state) {
        dispatch({type: CLIENT_SET_FILTER, vaild, star, stockCode, fundCode});
        cb && cb();
    }
}

//重置数据
export function resetData(){
    return {
        type:RESET_DATAS
    }
}

export function oaLogin(username, oaToken, component, cb) {
    return function(dispatch, getState) {
        dispatch(showLoading());
        //清除信息，模拟logout操作
        dispatch(resetData());
        //Cache.removeAll();
        //生产环境获取硬件信息
        Client.getHardwareInfo((info) => {
            var {
                mac = "xyzq",
                macName = "xyzq",
                systemType = "1",
                systemVersion = "xyzq"
            } = info;
            component.requestJSON("applogin/login", { //调用登录接口
                loginType:1,
                oatoken:oaToken,
                username: username,
                mac: mac,
                macName: macName,
                systemType: systemType,
                systemVersion: systemVersion
            },null,{
              needNonce: false
            }).done((data) => {
                var {
                    departId,
                    departmentOrgName,
                    nonce,
                    userId,
                    userName,
                    phonecode,
                    gestureSet = "0",
                    gestureSwitch = "0",
                    dmlNeedValidate = "0"
                } = data;
                //存储用户信息
                dispatch(setUserInfo(userName, departId, departmentOrgName, userId, gestureSet, gestureSwitch,phonecode));
                dispatch(hideLoading());

                    //存入nonce值,userId等，userId作为判断是否首次登录的标志
                    if(systemApi.getValue("userId")!=userId){
                      //如果切换用户，清空历史查询数据
                      systemApi.removeValue(STORAGE_CLIENT_SEARCH_HISTORY);
                    }
                    if (!systemApi.getValue("userId") && gestureSet == "0") { //设置手势
                        systemApi.setValue("nonce", nonce);
                        systemApi.setValue("userId", userId);
                        systemApi.setValue("userName", userName);
                        hashHistory.replace("/login/gesture");

                        Client.changeUserId(userId);
                        return;
                    }
                    dispatch(showMessage(SUCCESS, data.promptMsg, 3000));
                    systemApi.setValue("nonce", nonce);
                    systemApi.setValue("userId", userId);
                    systemApi.setValue("userName", userName);
                    hashHistory.replace("/work");

                    Client.changeUserId(userId);
                    Client.invokeCachedPushMessage();

            }).fail((data) => {
                //显示错误信息
                dispatch(hideLoading());
                Client.oaLoginFail(data.message);
                if(data.promptCode == "1005"){
                    dispatch(showTip(data.message));
                    return;
                }else if(data.promptCode == "2000"){
                    dispatch(showMessage(WARNING, data.message, 3000));
                    return;
                }
                dispatch(showMessage(ERROR, data.message, 3000));
            });
        });

    }
}

//VIP申请
export function vipApply(params,component,update){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("vip", params).done((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(SUCCESS,"申请成功！"));
            update && update(data);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//VIP验证
export function vipVerify(modularName,component,update){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("vip/check", {modularName}).done((data)=>{
            dispatch(hideLoading());
            update && update(data.permission);
        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR,data.message));
        });
    }
}

//获取最近搜索历史
export function getRecentClientSearch(){
    return JSON.parse(systemApi.getValue(STORAGE_CLIENT_SEARCH_HISTORY) || "[]");
}

//设置最近搜索历史
export function setRecentClientSearch(list){
    systemApi.setValue(STORAGE_CLIENT_SEARCH_HISTORY,JSON.stringify(list));
}

//添加或更新客户搜索历史
export function addRecentClientSearch(value){
    if(!value) return;

    var templist = getRecentClientSearch();

    var index = templist.indexOf(value);
    if (index > -1) {
        templist.splice(index, 1);
    }

    templist.unshift(value);
    templist = templist.slice(0,10);

    setRecentClientSearch(templist);
}

//给潜在客户详情添加redux数据
export function setPotentialDetail(from, params) {
    params = params || {};
    return {
        type: SET_POTENTIALDETAIL_PARAM,
        from,
        params
    }
}

export function goToPotentialDetail(from, params, ID) {
    return function (dispatch, state) {
        dispatch(setPotentialDetail(from, params))
        hashHistory.push('/work/client/potentialDetail/'+ID)
    }
}
