import {CLIENT_UPDATE_CLIENT_LIST, CLIENT_UPDATE_LATELY_LIST, CLIENT_SET_BASE_INFO} from '../../actions/client/summary/summaryAction';
import {CLIENT_SET_LATELY_LIST, CLIENT_SET_ATTENTION_LIST, CLIENT_CACHE_LATELY, CLIENT_CACHE_ATTENTION, CLIENT_SET_DETAIL_MODE} from '../../actions/client/clientAction';
import {SET_SERVICE_PARAM} from './../../../../store/actions';

module.exports = function client(state, action) {
    var {type} = action;
    state = state || {
        mobileTel: "",
        clientStar: "0",
        fundAccount: "",
        clientName: "",
        validClient: "0",
        detailMode: "0", //全景图类型模式
        permitMap: {
            positionPermit: "0", //持仓1是0否
            entrustPermit: "0", //交易-委托
            dealPermit: "0", //交易-成交
            moneypipePermit: "0" //交易-银证转账
        },
        diffTime: 0, //本地时间与服务器时间的差
        latelyList: [],
        attentionList: []
    }
    switch (type) {
        case CLIENT_SET_BASE_INFO:
            var newInfo = {}, {
                    mobileTel,
                    clientStar,
                    fundAccount,
                    clientName,
                    validClient,
                    permitMap
                } = action;

            if (mobileTel!=undefined)
                newInfo.mobileTel = mobileTel;
            if (clientStar!=undefined)
                newInfo.clientStar = clientStar;
            if (fundAccount!=undefined)
                newInfo.fundAccount = fundAccount;
            if (clientName!=undefined)
                newInfo.clientName = clientName;
            if (validClient!=undefined)
                newInfo.validClient = validClient;
            if (permitMap!=undefined)
                newInfo.permitMap = permitMap;

            return Object.assign({}, state, newInfo);
            break;

        case CLIENT_SET_LATELY_LIST: //记录最近浏览客户列表
            var {isAppend, data, diffTime, hasMore} = action, {latelyList} = state;
            latelyList = isAppend
                ? latelyList.concat(data)
                : data;
            Cache.setValue(CLIENT_CACHE_LATELY, {latelyList, diffTime, hasMore});
            return Object.assign({}, state, {latelyList, diffTime});
            break;

        case CLIENT_SET_ATTENTION_LIST: //记录关注客户列表
            var {isAppend, data, hasMore} = action, {attentionList} = state;
            attentionList = isAppend
                ? attentionList.concat(data)
                : data;
            Cache.setValue(CLIENT_CACHE_ATTENTION, {attentionList, hasMore});
            return Object.assign({}, state, {attentionList});
            break;

        case CLIENT_UPDATE_CLIENT_LIST: //关注客户触发列表更新
            var {clientId, clientStar} = action, {
                    latelyList,
                    attentionList,
                    clientName,
                    validClient,
                    fundAccount,
                    diffTime
                } = state;

            if (latelyList.length) {
                latelyList = latelyList.slice(0);
                for (var i = 0; i < latelyList.length; i++) {
                    var item = latelyList[i];
                    if (item.clientId == clientId) {
                        item.clientStar = clientStar;
                    }
                }
                Cache.setValue(CLIENT_CACHE_LATELY, {latelyList, diffTime});
            }
            if (attentionList.length) {
                attentionList = attentionList.slice(0);
                if (clientStar == "0") {
                    for (var i = 0; i < attentionList.length; i++) {
                        var item = attentionList[i];
                        if (item.clientId == clientId) {
                            attentionList.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    attentionList.unshift({clientId, clientStar, clientName, validClient, fundAccount});
                }
                Cache.setValue(CLIENT_CACHE_ATTENTION, attentionList);
            }

            return Object.assign({}, state, {latelyList, attentionList});
            break;

        case CLIENT_UPDATE_LATELY_LIST: //更新最近访问列表顺序
            var {clientName, clientId, clientStar, validClient, fundAccount} = action, {latelyList, diffTime} = state,
                newItem = {
                    clientName,
                    clientId,
                    clientStar,
                    validClient,
                    fundAccount
                };
            if (latelyList.length) {
                latelyList = latelyList.slice(0);
                for (var i = 0; i < latelyList.length; i++) {
                    var item = latelyList[i];
                    if (item.clientId == clientId) {
                        newItem = latelyList.splice(i, 1)[0];
                        break;
                    }
                }
                newItem.lastTime = new Date().getTime() - diffTime;
                latelyList.unshift(newItem);
                Cache.setValue(CLIENT_CACHE_LATELY, {latelyList, diffTime});
                return Object.assign({}, state, {latelyList});
            } else {
                return state;
            }
            break;

        case CLIENT_SET_DETAIL_MODE:
            var {detailMode} = action;
            return Object.assign({}, state, {detailMode});
            break;
        case SET_SERVICE_PARAM:
            let {params} = action, {
                    clientName = "",
                    fundAccount = "",
                    clientTel = "",
                    recordingInnerId = "",
                    recordingBegindate = "",
                    recordingRuntime = "",
                    callType = "",
                    callTypevalue = ""
                } = params;
            return Object.assign({}, state, {
                clientName,
                fundAccount,
                clientTel,
                recordingInnerId,
                recordingBegindate,
                recordingRuntime,
                callType,
                callTypevalue
            });
            break;
        default:
            return state;
    }
}
