import {connect} from 'react-redux';
import {logout, switchGesture, showWarning} from '../../actions/me/meAction';

import AppHeader from '../../../../components/common/appheader/AppHeader';

import List from '../../../../components/common/list/List';
import IconItem from '../../../../components/common/list/IconItem';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import SummaryTable from '../../components/me/SummaryTable';
import ToggleButton from '../../components/me/ToggleButton';
import PasswordDialog from '../../components/me/PasswordDialog';


import styles from '../css/me/mePage.css';

/** 个人中心 **/
class MePage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this._nextGestureCmd = false;
        this.state = {
            password:false,
            closeConfirm:false
        }
    }

    //获取页面名称
    getPageName(){ return "我的"; }

    //点击登出
    logOut = ()=>{
        this.setState({closeConfirm:true});
    }

    //点击关于版本
    aboutClick = ()=>{
        hashHistory.push("/work/me/about");
    }

    //跳转本地录音列表
    recordClick=()=>{
        hashHistory.push("/work/client/record/1");
    }

    //点击我要吐槽
    complainClick = ()=>{
        hashHistory.push("/work/me/complain");
    }

    //点击新手指引
    introClick = ()=>{
        Client.showGuidePageVC();
    }

    //点击重置手势密码
    resetGestureClick = ()=>{
        if(this.props.gestureSwitch!="1"){
            this.props.showWarning("请先打开手势密码");
            return;
        }
        this._curStep = "reset";
        this.setState({password:true});
    }

    gestureChange = (value)=>{
        this._curStep = "switchGesture";
        this._nextGestureCmd = value;
        this.setState({password:true});
    }

    renderRightIcons = ()=>{
        var gestureOpen = this.props.gestureSwitch=="1"?true:false;
        return [
            <ToggleButton open={gestureOpen} onChange={this.gestureChange}/>
        ];
    }

    //密码框验证成功
    checkSuccess = ()=>{
        //关闭密码框
        this.closePassword();

        if(this._curStep == "switchGesture"){
            //更新手势开关状态
            this.props.switchGesture(this._nextGestureCmd,this.props.gestureSet,this.props.gestureSwitch,null,this)
        }
        else{
            hashHistory.push("/work/me/resetGesture");
        }
    }

    //密码框输入点击取消
    closePassword = ()=>{
        this.setState({password:false})
    }

    //退出取消
    outCancel = ()=>{
        this.setState({closeConfirm:false});
    }

    //退出确认
    outSubmit = ()=>{
        this.setState({closeConfirm:false});
        this.props.logout(this);
    }

    render(){
        systemApi.log("MePage render");
        var {password,closeConfirm} = this.state,systemType=systemApi.getValue("systemType");
        return (
            <div>
                <AppHeader showBack={false}  headerName="个人中心"/>
                <Content withHeader={false} withBottom={false}>
                    <SummaryTable/>
                    <div className="blank"></div>
                    <List>
                        {systemType==="2"?<IconItem icon="record" text="录音文件" arrow={true} onClick={this.recordClick} />:""}
                        <IconItem icon="about" text="关于版本" arrow={true} onClick={this.aboutClick} />
                        <IconItem icon="advice" text="我要吐槽" arrow={true}  onClick={this.complainClick}/>
                        <IconItem icon="intro" text="新手指引" arrow={true}  onClick={this.introClick}/>
                        <IconItem icon="gesture" text="手势密码" arrow={false} rightIcons={this.renderRightIcons()}/>
                        <IconItem icon="resetGesture" text="重置手势密码" arrow={true}  onClick={this.resetGestureClick}/>
                    </List>
                    <div className={styles.btn_out} onClick={this.logOut}>
                        <a>退出登录</a>
                    </div>
                </Content>
                {password?(<PasswordDialog onSuccess={this.checkSuccess} onClose={this.closePassword}/>):null}
                {closeConfirm?(<ConfirmDialog title="退出登录" text="确认退出当前账号？" onCancel={this.outCancel} onSubmit={this.outSubmit}/>):null}
                {this.props.children}
            </div>

        );
    }

}

function injectAction(){
    return {logout,switchGesture,showWarning};
}
function injectProps(state){
    var {userInfo={}} = state.base || {},
    {gestureSet,gestureSwitch}=userInfo;
    return {gestureSet,gestureSwitch};
}
module.exports = connect(injectProps,injectAction())(MePage);
