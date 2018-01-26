import {connect} from 'react-redux';
import {gestureLogin,setGesture} from '../actions/gestureAction';
import PasswordDialog from '../../work/components/me/PasswordDialog';
import styles from './css/gestureLogin.css';
import GestureLock from '../../../components/gesturelock/GestureLock';
import GestureSet from './GestureSet';
import FullScreenView from '../../../components/fullscreen/FullScreenView';
import AppHeader from '../../../components/appheader/AppHeader';

class GestureLogin extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this._times = 1;
        this._complete = false;
        this.lastPwd = "";
        this.state = {
            title: "手势密码登录",
            error: false,
            password: false,
            set:false
        }
    }

    componentDidMount(){
        systemApi.registerDoNothing();
    }
    componentWillUnmount(){
        systemApi.unregisterDoNothing();
        super.componentWillUnmount();
    }
    openPwd=()=>{
      this.setState({
        password:!this.state.password
      });
    }
    closeGesture = () => {
        Cache.removeAll();
        this.props.close();
    }
    closeSet=()=>{
      this.setState({
        set:false
      });
    }
    gestureEnd = (value) => {
        var nonce = systemApi.getValue("nonce");
        var cb=this.props.success;
        this.props.gestureLogin(value, nonce, this,cb);
    }
    //密码框验证成功
    checkSuccess = ()=>{
        //关闭密码框
        this.setState({
          password:false,
          set:true
        })
    }

    //密码框输入点击取消
    closePassword = ()=>{
        this.setState({password:false})
    }
    render() {
        systemApi.log("GestureLogin render");
        var {title, error, password,set} = this.state;
        return (
            <div>
                {set ? (
                    <GestureSet close={this.closeSet} resetSuccess={this.props.resetSuccess}/>
              ):(
                        <FullScreenView>
                            <GestureLock
                            title={title}
                            error={error}
                            secTitle={systemApi.getValue("userName")}
                            className={styles.frame}
                            gestureEnd={this.gestureEnd}/>
                            <div className={styles.toggleBtn+" "+styles.left}
                            onClick={this.openPwd}>忘记手势密码?</div>
                            <div className={styles.toggleBtn+" "+styles.right}
                            onClick={this.closeGesture}>用其他账号登录</div>
                            {password?(<PasswordDialog onSuccess={this.checkSuccess} onClose={this.closePassword}/>):null}
                        </FullScreenView>
                    )}

            </div>
        );

    }

}
function injectAction() {
    return {gestureLogin,setGesture};
}

// module.exports = connect(null, injectAction())(GestureLogin);
export default connect(null, injectAction())(GestureLogin);
