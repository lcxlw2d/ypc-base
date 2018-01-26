import { connect } from 'react-redux';
import {getNonce} from '../actions/loginAction';
import {getGestureStatus,gestureLogin} from '../actions/gestureAction';
import DynamicPwd from '../components/DynamicPwd';
import ShowTip from '../components/ShowTip';
import GestureLogin from '../components/GestureLogin';
import LoginForm from '../components/LoginForm';
import styles from './css/loginPage.css';


/** 登录页 **/
class LoginPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            type: false,
            dynamicPwd:false,
            nonce:"",
            focus:false
        }
    }

    //获取页面名称
    getPageName(){ return "登录页"; }

    componentDidMount(){
        //进入登录页即清缓存
        //Cache.removeAll();
        var nonce = systemApi.getValue("nonce");
        if(nonce){
            this.props.getGestureStatus((isOpen)=>{
                this.setState({type:isOpen});
            },this);
        }
        //改成每次登录的时候先获取nonce
        // else{
        //     this.props.getNonce(this);
        // }
        window.addEventListener("resize", this.onResize);
        super.componentDidMount();
        //打开android手机上键盘自适应功能
        Client.setAndroidKeyboardResponseOpen(true);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.onResize);
        super.componentWillUnmount();
    }

    //界面尺寸变化回调
    onResize = ()=>{
        var {activeElement} = document,
            {tagName} = activeElement,
            {availHeight} = screen,
            {innerHeight} = window;

        if(availHeight-innerHeight > 100)
            this.setState({focus:true});
        else
            this.setState({focus:false});

        if(tagName=="INPUT" || tagName=="TEXTAREA") {
           window.setTimeout(function() {
               activeElement.scrollIntoViewIfNeeded(true);
           },0);
        }
    }

    toggleDynamicPwd = ()=>{
        this.setState({
            dynamicPwd:!this.state.dynamicPwd
        })
    }

    inputDynamic = (nonce)=>{
        this.setState({
          dynamicPwd:true,
          nonce:nonce
        })
    }
    closeGesture=()=>{
        this.setState({type:false});
    }
    resetSuccess=(value)=>{
        var nonce = systemApi.getValue("nonce");
        this.props.gestureLogin(value, nonce, this);
    }
    render() {
        systemApi.log("LoginFrame render");
        var {type,focus,message,nonce} = this.state;
        return (
          <div>
          {!type?(
            <div>
                <div className={styles.bglogin}>
                    <img src="images/login/bg_login.jpg"/>
                </div>
                <LoginForm showDynamicPwd={this.inputDynamic}/>
                {!focus?(<div className={styles.lg_copyright}>©兴业证券股份有限公司版权所有</div>):null}
                {this.props.children}
            </div>
        ):(<GestureLogin close={this.closeGesture} resetSuccess={this.resetSuccess}/>)}

            {this.state.dynamicPwd?(<DynamicPwd nonce={nonce} closeFn={this.toggleDynamicPwd}/>):""}
            {this.props.showTip?(<ShowTip message={message} />):""}
            </div>

        );
    }

}

function injectProps(state){
    var {showTip} = state.login || {};

    return {showTip};
}

function injectAction(){

    return{ getGestureStatus, getNonce, gestureLogin };

}

export default connect(injectProps, injectAction())(LoginPage);
