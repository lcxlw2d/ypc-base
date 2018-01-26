import {connect} from 'react-redux';
import {getAttentionList, setAttentionList, CLIENT_CACHE_ATTENTION} from '../../actions/client/clientAction';

import ClientItem from './ClientItem';

import styles from '../css/client/list.css';

class AttentionList extends CursorCachedList{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    componentWillReceiveProps(nextProps){
        var {vaild, star, fundCode, stockCode} = this.props;
        if(vaild!=nextProps.vaild || star!=nextProps.star || fundCode!=nextProps.fundCode || stockCode!=nextProps.stockCode){
            Cache.remove(CLIENT_CACHE_ATTENTION);
            super.componentWillReceiveProps(nextProps);
        }
    }

    componentDidUpdate(){
        var {attentionList} = this.props;
        this.nextIndex = attentionList.length + 1;
        super.componentDidUpdate();
    }

    //获取缓存数据
    getCachedData(props, requestServer, cb){
        var data = Cache.getValue(CLIENT_CACHE_ATTENTION);
        if(data){
            var {attentionList, hasMore} = data;
            this.props.setAttentionList(false, attentionList, hasMore);
            cb(null, hasMore);
        }
        else{
            requestServer();
        }
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    //取数据函数
    getData(startIndex,isAppend,cb,props){
        var {fundCode, stockCode} = props,
            params = {
                startIndex,
                productCode:fundCode,
                stockCode,
                validClient:props.vaild,
                clientStar:props.star,
                length:50
            };
        this.props.getAttentionList(params,isAppend,cb,this);
    }

    //绘制列表
    renderList(){
        var list = [],
            {attentionList} = this.props;
        return attentionList.map((item,index)=>{
            var {clientName,clientStar,validClient,clientId,fundAccount} = item,
                favorCls = this.mergeClassName(styles.follow,clientStar=="1"?styles.on:"");
            return (
                <ClientItem
                    key={clientId}
                    clientName={clientName}
                    clientStar={clientStar}
                    validClient={validClient}
                    clientId={clientId}
                    fundAccount={fundAccount}/>
            );
        });
    }

}

function injectAction(){
    return {getAttentionList, setAttentionList};
}

function injectProps(state) {
    var {client={}} = state.base,
        {vaild, star, fundCode, stockCode} = client,
        {attentionList=[]} = state.client || {};
    return {attentionList, vaild, star, fundCode, stockCode};
}

module.exports = connect(injectProps,injectAction(),null,{withRef:true})(AttentionList);
