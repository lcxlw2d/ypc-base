import { connect } from 'react-redux';
import { login,getNonce} from '../actions/loginAction';
import Input from '../../../components/form/Input';
import Button from '../../../components/form/Button';
import CheckBox from '../../../components/form/CheckBox';

import styles from './css/loginForm.css';

class LoginForm extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            userName:systemApi.getValue("loginName") || "",
            password:"",
            remenber:systemApi.getValue("isremenber")=="false"?false:true,
            errMsg:""
        }
        this.userNameChange = this.inputChange("userName");
        this.passwordChange = this.inputChange("password");
    }

    //点击记住密码
    loginCheckChange = (value)=>{
        systemApi.setValue("isremenber",value);
        this.setState({remenber:value});
    }

    //登录按钮点击回调
    loginClick = ()=>{
      //先获取nonce
      var {userName,password} = this.state;
        this.props.getNonce(userName,password, this,(nonce)=>{
          var {remenber} = this.state;
          this.props.login(userName,password,nonce,remenber,this,(nonce)=>{
            document.activeElement.blur();
            this.props.showDynamicPwd(nonce);
          });
        });

    }

    //输入框改变回调
    inputChange = (name)=>(value)=>{
        this.setState({[name]:value});
    }

    //点击键盘回车
    userInputKeyUp = (code)=>{
        //autoFocusconsole.log("userInputKeyUp");
        if(code == 13){
            var {nextInput} = this.refs;
            //console.log(nextInput);
            nextInput.focus();
        }
    }

    inputKeyUp = (code)=>{
        if(code == 13){
            document.activeElement.blur();
            this.loginClick();
        }
    }

    render(){
        systemApi.log("LoginForm render");

        var {userName,password,remenber} = this.state;

        if(userName&&userName!="")
            var passOn=true;
        else
            var passOn=false;
        return (
            <form className={styles.loginform}>
                <Input autoFocus={true} shape="round" icon="user" value={userName} onKeyUp={this.userInputKeyUp} placeholder="请输入用户名" onChange={this.userNameChange}/>
                <Input autoFocus={passOn} ref ='nextInput' type="password" shape="round" value={password} onKeyUp={this.inputKeyUp} icon="password" placeholder="登录密码" onChange={this.passwordChange} />
                <CheckBox checked={remenber} align="right" onChange={this.loginCheckChange} text="记住账号"/>
                <div className={styles.login_tip}><img src="./images/login/1480990787.png"/></div>
                <Button shape="round" value="登 录" onClick={this.loginClick} />
            </form>
        );

    }

}

function injectAction(){
    return{ login ,getNonce};
}

// module.exports = connect(null,injectAction())(LoginForm);
export default connect(null,injectAction())(LoginForm);
