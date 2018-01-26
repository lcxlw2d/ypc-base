import {connect} from 'react-redux';
import {call, sendMessage, toComplete, getTodoDetail, getDoneDetail,copyContent} from '../../actions/todo/todoAction';
import {gotoDetail,FROM_TODO_DETAIL_PAGE} from '../../../../store/actions';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import BottomTabs from '../../../../components/common/bottomtabs/BottomTabs';
import TabText from '../../../../components/common/bottomtabs/TabText';

import styles from '../css/todo/detailPage.css';

/** 待办-详情 **/
class DetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        var {done} = this.props.params;
        var time = null;
        this.state = {
            isDone: (done == "0"? false: true) || false,
            client_name: "-",
            remindTypename: "-",
            fundAccount: "-",
            remindContent: "-",
            clientMobile: "-",
            remindTime: "-",
            clientId:""
        }
    }

    //获取页面名称
    getPageName() {
        return "待办_详情";
    }

    componentDidMount() {
        var {id} = this.props.params, {isDone} = this.state;
        if (isDone) {
            this.props.getDoneDetail(id, this, this.update);
        } else {
            this.props.getTodoDetail(id, this, this.update);
        }
        super.componentDidMount();
    }

    update = (data) => {
        this.setState(data);
    }

    //点击打电话
    phoneClick = () => {
        var {clientMobile} = this.state;
        this.props.call(clientMobile);
    }

    //点击发短信
    messageClick = () => {
        var {clientMobile} = this.state;
        this.props.sendMessage(clientMobile);
    }

    //点击已完成
    completeClick = () => {
        var {remindId} = this.state;
        this.props.toComplete(remindId, this, this.updateUI);
    }

    updateUI = () => {
        this.setState({isDone: true});
    }

    touchStart = () => {
        this.timer = setTimeout(() => {
            this.props.copyContent(this.state.remindContent);
        }, 1500); //这里设置时间
    }

    touchEnd = () => {
        clearTimeout(this.timer);
    }

//跳转到客户详情页
    gotoClientDetail =()=>{
        var {id,done} = this.props.params;
        this.props.gotoDetail(this.state.clientId,FROM_TODO_DETAIL_PAGE,{id,done});
    }

    render() {
        systemApi.log("DetailPage render");

        var contentCls = this.mergeClassName("g_content", styles.bk), {
                client_name,
                remindTypename,
                fundAccount,
                remindContent,
                clientMobile,
                remindTime
            } = this.state, {isDone} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="待办详情" backHash="/work/todo"/>
                <div className={contentCls}>
                    <div className={styles.waiting_detail}>
                        <h1>{remindTypename}</h1>
                        <p onClick={this.gotoClientDetail}>
                            <span className={styles.underline}>{client_name+" "+fundAccount}</span>
                        </p>
                    </div>
                    <div className={styles.waiting_box}>
                        <div className={styles.wt_innerboz}>
                            <p onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>{remindContent}</p>
                            <p className={this.mergeClassName(Color.c9, styles.time)}>{remindTime}</p>
                        </div>
                    </div>
                </div>
                <BottomTabs>
                    {clientMobile
                        ? (<TabText iconClass="phone" text="电话" onClick={this.phoneClick}/>)
                        : null}
                    {clientMobile
                        ? (<TabText iconClass="message" text="短信" onClick={this.messageClick}/>)
                        : null}
                    {!isDone
                        ? (<TabText iconClass="complete" text="已办" onClick={this.completeClick}/>)
                        : null}
                </BottomTabs>
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {call, sendMessage, toComplete, getTodoDetail, getDoneDetail,copyContent,gotoDetail};
}

module.exports = connect(null, injectAction())(DetailPage);
