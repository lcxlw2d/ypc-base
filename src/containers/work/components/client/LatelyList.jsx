import {connect} from 'react-redux';
import {getLatelyList,setLatelyList, CLIENT_CACHE_LATELY} from '../../actions/client/clientAction';

import ClientItem from './ClientItem';

import styles from '../css/client/list.css';

class LatelyList extends CursorCachedList{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    componentDidUpdate(){
        var {latelyList} = this.props;
        this.nextIndex = latelyList.length + 1;
        super.componentDidUpdate();
    }

    //获取缓存数据
    getCachedData(props, requestServer, cb){
        var cache = Cache.getValue(CLIENT_CACHE_LATELY);
        if(cache){
            var {latelyList, diffTime, hasMore} = cache;
            this.props.setLatelyList(false,latelyList,diffTime,hasMore);
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
        var params = {
            startIndex,
            length:100
        };
        this.props.getLatelyList(params,isAppend,cb,this);
    }

    //渲染最后访问时间
    renderLastTime(time){
        var diff = new Date().getTime() - time,
            minute = 60 * 1000,
            hour = 60 * minute,
            day = 24 * hour,
            month = 30 * day,
            year = 365 * day;

        if(diff < minute){
            return "刚刚";
        }
        if(diff < hour){
            return Math.floor(diff/minute)+"分钟前";
        }
        if(diff < day){
            return Math.floor(diff/hour)+"小时前";
        }
        if(diff < month){
            return Math.floor(diff/day)+"天前";
        }
        if(diff < year){
            return Math.floor(diff/month)+"个月前";
        }
        return Math.floor(diff/year)+"年前";
    }

    //绘制列表
    renderList(){
        var list = [],
            {latelyList, diffTime} = this.props;
        return latelyList.map((item,index)=>{
            var {clientName,clientStar,validClient,clientId,fundAccount,lastTime} = item,
                favorCls = this.mergeClassName(styles.follow,clientStar=="1"?styles.on:"");
            return (
                <ClientItem
                    key={clientId}
                    clientName={clientName}
                    clientStar={clientStar}
                    validClient={validClient}
                    clientId={clientId}
                    lastTime={this.renderLastTime(lastTime + diffTime)}
                    fundAccount={fundAccount}/>
            );
        });
    }

}

function injectAction(){
    return {getLatelyList,setLatelyList};
}

function injectProps(state) {
    var {latelyList=[], diffTime=0} = state.client || {};
    return {latelyList, diffTime};
}

module.exports = connect(injectProps,injectAction(),null,{withRef:true})(LatelyList);
