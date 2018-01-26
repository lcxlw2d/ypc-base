import {connect} from 'react-redux';
import {call} from '../../actions/client/summary/summaryAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import ServerList from '../../components/client/detail/ServerList';
import {recordJumpService} from '../../../../store/actions';

import styles from './css/serverPage.css';

/** 客户-全景图-服务记录 **/
class ServerPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }

    //获取页面名称
    getPageName(){ return "客户全景图_服务记录"; }

    //增加服务记录
    addFunc = ()=>{
        Client.trackEvent("1011", "HOME_CLICK_SERVERSADD");
        hashHistory.push("/work/client/detail/server/add")
    }

    renderIcons() {
        return [
            <HeaderIcon iconCls="add" onClick={this.addFunc}/>
        ]
    }

    onBackClick=()=>{
        var {fromRecord}=this.props;
        if(fromRecord){
            this.props.recordJumpService("", {}, fromRecord);
        }else{
            this.props.onBackClick();
        }
    }


    render() {
        systemApi.log("ServerPage render");

        var {clientName} = this.props;

        return (
            <div>
                <AppHeader headerName={clientName} theme="red" iconRight={this.renderIcons()} onBackClick={this.onBackClick}/>
                <Content withBottom={false} iscroll={false}>
                    <ServerList/>
                </Content>
                {this.props.children}
            </div>

        );
    }

}

function injectProps(state){
    var {clientName} = state.client || {},
        {client} = state.base || {},
        {fromRecord} = client;
    return {clientName,fromRecord};
}

function injectAction() {
    return {recordJumpService};
}

module.exports = connect(injectProps, injectAction())(ServerPage);
