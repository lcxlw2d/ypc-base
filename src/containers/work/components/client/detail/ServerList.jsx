import {connect} from 'react-redux';
import {getServerList,SERVER_REFRESH_SERVERLIST} from '../../../actions/client/summary/serverAction';

import styles from '../../css/client/detail/serverList.css';

//服务记录列表
class ServerList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.interIndex = -1;
    }

    componentDidMount(){
        Event.register(SERVER_REFRESH_SERVERLIST, this.reloadData);
        super.componentDidMount();
    }

    componentWillUnmount(){
        Event.unregister(SERVER_REFRESH_SERVERLIST, this.reloadData);
        super.componentWillUnmount();
    }

    reloadData = ()=>{
        this.refreshData();
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    getData(startIndex, isAppend, cb, props) {
        var {clientId} = props,
            params = {
                startIndex,
                clientId,
                searchRange:5,
                length:50
            };
        this.props.getServerList(params, isAppend, cb, this, this.updateList);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    itemClick = (servId)=>()=>{
        hashHistory.push("/work/client/detail/server/detail/"+servId);
    }

    renderList() {
        var {data} = this.state;
        return data.map((item) => {
            var {servThemeConcat, servTypevalue, matchStatus, servSummarize, servTime, servId} = item,
                servCommaIndex = servThemeConcat.indexOf(";"),
                servThemeId = servThemeConcat.substring(0,servCommaIndex),
                servTheme = servThemeConcat.substring(servCommaIndex+1);
            return (
                <li className={styles.item} onClick={this.itemClick(servId)}>
                    <div className={styles.hotnews_list_tit}>{servTheme}</div>
                    <div className={styles.hotnews_list_text}>{servSummarize}</div>
                    <div className={styles.hotnews_list_other}>
                        <div className={styles.other_left}>
                            <span>{servTypevalue}</span>
                            {matchStatus=="1"?(<i>录音已匹配</i>):null}
                        </div>
                        <div className={styles.other_right}>{servTime}</div>
                    </div>
                </li>
            );
        });
    }

}

function injectProps(state){
    var {client={}} = state.base || {},
        {clientId} = client;
    return {clientId};
}

function injectAction() {
    return {getServerList};
}

module.exports = connect(injectProps, injectAction())(ServerList);
