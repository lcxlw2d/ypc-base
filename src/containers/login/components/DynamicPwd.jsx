import {connect} from 'react-redux';
import {checkDynamicPwd,checkMessagePwd,getMessagePwd} from '../actions/loginAction';
import styles from './css/dynamicPwd.css';
import FullScreenView from '../../../components/fullscreen/FullScreenView';

class DynamicPwd extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        var showbutton=true,messageInfo="首次登录请输入短信验证码",{phonecode} = props;
        if(phonecode.length<1){
            messageInfo="请先设置手机号码";
            showbutton=false;
        }

        this.state={
          err:"首次登录请验证动码令",
          messageInfo:messageInfo,
          type:true,
          button:0,
          restTime:60,
          message:"",
          dynamic:"",
          showtip:false,
          showbutton:showbutton
        }

        this.messageChange = this.inputChange("message");
        this.dynamicChange = this.inputChange("dynamic");

    }

    //输入框改变回调
    inputChange = (name)=>(e)=>{
        this.setState({[name]:e.target.value});
    }

    getMessage=()=>{
        if(this.state.showbutton)
        this.props.getMessagePwd(this.props.nonce,(msg,countdownTime)=>{
            //成功的回调
            this.setState({
                messageInfo:msg,
                button:1,
                restTime:countdownTime
            });
            var start = new Date().getTime();
            var {restTime} = this.state;
            var i = setInterval(()=>{
                var curTime = new Date().getTime(),
                    restTime = Math.round(countdownTime-(curTime-start)/1000);
                if(restTime>0)
                    this.setState({
                        restTime
                    });
                else{
                    this.setState({
                        button:0,
                        restTime:countdownTime
                    });
                    clearInterval(i);
                }

            },500);
        }, this,(msg)=>{
            this.setState({
              messageInfo:msg
            })
        });



    }
    clickTip() {
        this.props.closeTip();
    }
    messageLogin = ()=>{
        if(!this.state.type)
        this.setState({
            type:true
        });
    }
    dynamicLogin = ()=>{
        if(this.state.type)
        this.setState({
            type:false
        });
    }
    onClickFun() {
        if(this.state.type){
            this.props.checkMessagePwd(this.refs.message.value,this.props.nonce,()=>{
              this.props.closeFn();
            },(message)=>{
              this.setState({
                messageInfo:message
              })
            }, this);
        }else{
            this.props.checkDynamicPwd(this.refs.dynamic.value,this.props.nonce,()=>{
              this.props.closeFn();
            },(message)=>{
              this.setState({
                err:message
              })
            }, this);
        }

    }
    showtip =()=>{

        this.setState({showtip:!this.state.showtip});
    }
    inputKeyUp = (e)=>{
        var {keyCode} = e.nativeEvent;
        if(keyCode==13)
        {
            this.onClickFun();
        }
    }

    render() {
        systemApi.log("DynamicPwd render");
        var {type,button,restTime,message,dynamic,showtip,showbutton} = this.state;
        var styleMessage=this.mergeClassName(styles.left,type?styles.on:""),
        styleDynamic=this.mergeClassName(styles.right,type?"":styles.on),
        messageButtonStyel = this.mergeClassName(styles.password_button,showbutton?"":styles.grey);

        return (
            <FullScreenView transparent={true}>

                <div className={styles.ecard_popup}>
                    <div className={styles.ecard_box + " " + styles.nobg}>
                        <div className={styles.pp_top}>
                            <div className={styleMessage} onClick={this.messageLogin}>短信认证</div>
                            <div className={styleDynamic} onClick={this.dynamicLogin}>动码令认证</div>
                        </div>
                        {type?(
                            <div className={styles.pp_mid}>
                            <p className={styles.first+" "+Color.red}>{this.state.messageInfo}</p>
                                <input ref="message" name="message" value={message} onChange={this.messageChange}  onKeyUp={this.inputKeyUp} className={styles.text_password_left} placeholder="请输入短信验证码"/>
                                    {button==0?(<button className={messageButtonStyel} onClick={this.getMessage}>点击获取</button>):
                                    (<button className={styles.password_button+" "+styles.send_ok} >{restTime}s</button>)}
                                    <div className={styles.edit_phone_tip}>
                        	<div className={styles.edit_phone_text} onClick={this.showtip}><a >设置手机号？</a></div>
                            <div className={styles.clear}></div>
                            {showtip?(<div className={styles.edit_phone_box}>
                                <p>需要员工本人在电脑上进行<span className={Color.blue}>OA</span>-><span className={Color.blue}>员工自助</span>->
                                <span className={Color.blue}>个人信息</span>->
                                <span className={Color.blue}>修改手机号</span>
                                ，填写新的手机号，然后由分支机构人力专员审核通过，T+1日同步至员工通讯录，即可生效。</p>
                            	<div >
                                    <b className={styles.edit_top}><i className={styles.topArrow1}></i><i className={styles.topArrow2}></i></b>
                                </div>
                            </div>):null}
                        </div>
                            </div>
                        ):(
                            <div className={styles.pp_mid}>
                            <p className={Color.red + " " + styles.first}>{this.state.err}</p>
                                <input ref="dynamic" name="dynamic"  value={dynamic} onChange={this.dynamicChange} onKeyUp={this.inputKeyUp} className={styles.text_password} placeholder="请输入动码令"/>

                            </div>
                        )
                        }
                        <div className={styles.pp_btns}>
                            <a className={styles.btn_pp_cancel} onClick={this.props.closeFn}>取消</a>
                            <a className={styles.btn_pp_ok} onClick={this.onClickFun.bind(this)}>确定</a>
                        </div>

                    </div>
                    <div className={styles.ecard_layer}></div>
                </div>
            </FullScreenView>
        );

    }

}

function injectProps(state){
    var {userInfo} = state.base || {},
    {phonecode=''} = userInfo ||{};
    return {phonecode};
}

function injectAction() {
    return {checkDynamicPwd,checkMessagePwd,getMessagePwd};
}

// module.exports = connect(injectProps, injectAction())(DynamicPwd);
export default connect(injectProps, injectAction())(DynamicPwd);
