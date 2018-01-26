import {showLoading, hideLoading, showMessage, ERROR, WARNING, SUCCESS} from '$redux/store/actions';

export const CLIENT_UPDATE_CLIENT_LIST = "CLIENT_UPDATE_CLIENT_LIST";
export const CLIENT_UPDATE_LATELY_LIST = "CLIENT_UPDATE_LATELY_LIST";
export const CLIENT_SET_BASE_INFO = "CLIENT_SET_BASE_INFO";

//跳转到客户全景图
export function gotoDetail(name, clientID) {
    return function(dispatch, state) {
        dispatch({type: "CLIENT_SET_NAME", name, clientID});
        hashHistory.push("/work/client/detail");
    }
}

export function saveAddtionalInfo(remark, clientId, cb, component) {
    return function(dispatch, state) {
        component.requestJSON("client/editRemarkInfo", {remark, clientId}).done((data) => {
            dispatch(showMessage(SUCCESS, "附言录入成功"));
            if (cb) {
                cb();
            }
        }).fail((data) => {
            dispatch(showMessage("error","附言录入失败"));
        });
    }
}
export function saveBaseInfo(mobileTel,clientStar,fundAccount,clientName,validClient,permitMap){
    return {type:CLIENT_SET_BASE_INFO,mobileTel,clientStar,fundAccount,clientName,validClient,permitMap};
}

function toggleClientStar(value){
    return {type:CLIENT_SET_BASE_INFO,clientStar:value}
}

//刷新客户列表关注图标
function updateClientList(clientId,clientStar){
    return {type:CLIENT_UPDATE_CLIENT_LIST,clientId,clientStar}
}

//更新最近访问列表
export function updateLatelyList(clientName,clientId,clientStar,validClient,fundAccount){
    return {
        type:CLIENT_UPDATE_LATELY_LIST,
        clientName,
        clientId,
        clientStar,
        validClient,
        fundAccount
    };
}

export function getSummaryInfo(clientId, update, component) {
    return function(dispatch, state) {
        var cacheInfo = Cache.getValue("client_summary_info");
        if(cacheInfo){
            update && update(cacheInfo.baseInfo,cacheInfo.rights,
                cacheInfo.assets,cacheInfo.assetChart,
                cacheInfo.historyAsset,cacheInfo.risk,cacheInfo.remark,
                cacheInfo.hasFina, cacheInfo.creditToatalAssetsInfo, cacheInfo.creditAssetsInfo,
                cacheInfo.marginTradingContract, cacheInfo.relationMap,cacheInfo.tagMap);
            return;
        }
        dispatch(showLoading());
        component.requestJSON("appclientbase/clientbaseinfo", {clientId}).done((data) => {
            dispatch(hideLoading());
            var {baseinfo1, baseinfo2,hasFina, creditMap={}, marginMap={}, detail, permit, mainBank={}, risk, permitMap, relationMap,clientTipList,twentydayavgAsset} = data;

            if(permit == "0"){
                dispatch(showMessage(ERROR, "您没有足够的权限查看全景图"));
                return;
            }

            var {clientStar,validClient,fundAccount,fundCard,clientName,mobileTel} = baseinfo1,
                baseInfo = {     //用户基本信息
                    clientName,
                    age:baseinfo1.age,
                    validClient,
                    fundAccount,
                    fundCard,
                    mobileTel,
                    organizationName:baseinfo1.organizationName,
                    totalAsset:baseinfo1.totalAsset,
                    idAddress:baseinfo2.address,
                    idBegindate:detail.openDate,
                    mainBank:(mainBank.bankName) || "",
                    sex:baseinfo1.clientSexType,
                    pic:baseinfo1.url,
                    rate1:detail.balanceRatioSHHT,
                    rate2:detail.balanceRatioLRPT,
                    rate3:detail.balanceRatioLRXY
                },
                assets = detail,            //用户资产信息
                {rights} = data,            //用户权限
                assetChart = {              //资产图标数据
                    stocks:''+detail.currentMarketValue,
                    product:''+detail.productValue,
                    debt:''+detail.debt,
                    money:''+detail.combineBalance
                },
                historyAsset = {            //其他资产信息
                    peakValue:((detail.maxHoldTotalassetValue)||"").trim(),
                    peakDate:((detail.maxHoldTotalassetValueTime)||"").trim(),
                    hkTwentydayavgAsset:((twentydayavgAsset.hkTwentydayavgAsset)||"").trim(),
                    optTwentydayavgAsset:((twentydayavgAsset.optTwentydayavgAsset)||"").trim(),
                    outTotalAsset:((detail.outTotalAsset)||"0").trim()
                },
                risk = {                    //风险特征
                    bearRisk:risk.dict_riskBearAblity,
                    endDate:risk.corpEndDate,
                    dict_risktrait:risk.dict_risktrait,
                    traitHolddate:risk.traitHolddate
                },
                tagMap = clientTipList,
                remark = baseinfo2.remark,
                creditToatalAssetsInfo = {              //信用账号总资产信息
                    closeAssureBalance:marginMap.closeAssureBalance,
                    netAsset:marginMap.netAsset,
                    closeRate:marginMap.closeRate,
                },creditAssetsInfo = {              //信用账号资产信息
                    currentBalance:''+marginMap.currentBalance,
                    totalDebit:''+marginMap.totalDebit,
                    canUseAmount:''+marginMap.canUseAmount,
                    financeCloseBalance:''+marginMap.financeCloseBalance,
                    shortsellCloseBalance:''+marginMap.shortsellCloseBalance,
                    closeFareDebit:''+marginMap.closeFareDebit,
                    totalInterest:''+marginMap.totalInterest,

                    closeOtherDebit:''+marginMap.closeOtherDebit,
                    closeMarketValue:''+marginMap.closeMarketValue

                },marginTradingContract = {              //融资融券合约
                    highest:creditMap.highest,
                    highRZ:creditMap.highRZ,
                    highRQ:creditMap.highRQ,
                    financingRate:creditMap.financingRate,
                    shortSaleRate:creditMap.shortSaleRate,
                    begin:creditMap.begin,
                    end:creditMap.end
                };

            dispatch(saveBaseInfo(mobileTel,clientStar,fundAccount,clientName,validClient,permitMap));
            //更新最近访问列表
            dispatch(updateLatelyList(clientName,clientId,clientStar,validClient,fundAccount));
            Cache.setValue("client_summary_info",{
                baseInfo,rights,assets,assetChart,historyAsset,risk,remark, hasFina, creditToatalAssetsInfo,
                creditAssetsInfo,marginTradingContract, relationMap,tagMap
            });
            update && update(baseInfo,rights,assets,assetChart,historyAsset,risk,remark,hasFina,
                creditToatalAssetsInfo, creditAssetsInfo, marginTradingContract, relationMap,tagMap);

        }).fail((data) => {
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
export function getAddtionalInfo(clientId, cb, component) {
    return function(dispatch, state) {
        component.requestJSON("client/getRemarkInfo", {clientId}).done((data) => {
            if (cb) {
                var {clientSex} = data;
                data.clientSex = clientSex=='1'?'女':'男';
                cb(data);
            }
        }).fail(() => {});
    }
}
export function copyPhone(phone, cb, component) {
    return function(dispatch, state) {
        dispatch(showMessage("success", "复制成功"));
        Client.clipboard(phone);
        if (cb) {
            cb(message);
        }

    }
}
export function call(phone, systemType, name, clientId, succ,  cb, component) {
    return function(dispatch, state) {
           // hashHistory.push("/work/client/record/0");
      if(phone&&phone.length>=1){
          if(systemType!=2){
            Client.trackEvent("2003","CLIENT_CALL_IOS");
            Client.call(phone);
          }else{
            //Client.call(phone);
            Client.callPhoneWithRecord(succ, data => { dispatch(showMessage(ERROR, data.message)); }, phone, name, clientId);
          }
      }
      else
        dispatch(showMessage(WARNING, "电话号码暂无"));
        if (cb) {
            cb();
        }

    }
}
export function follow(clientId, isFollow, cb, component) {

    return function(dispatch, state) {

        if (isFollow) {
            component.requestJSON("appcustomer/delclientstar", {clientId}).done((data) => {
                dispatch(showMessage(SUCCESS, "取消关注成功！"));
                dispatch(toggleClientStar("0"));
                dispatch(updateClientList(clientId,"0"));
                cb && cb();
            }).fail((data) => {
              dispatch(showMessage(ERROR, data.message));
            });
        } else {
            component.requestJSON("appcustomer/addclientstar", {clientId}).done((data) => {
              dispatch(showMessage(SUCCESS, "关注成功！"));
                dispatch(toggleClientStar("1"));
                dispatch(updateClientList(clientId,"1"));
                cb && cb();
            }).fail((data) => {
              dispatch(showMessage(ERROR, data.message));
            });
        }

    }
}
