import {connect} from 'react-redux';
import {checkPassword} from '../../actions/me/meAction';

import FullScreenView from '../../../../components/fullscreen/FullScreenView';
// import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from '../css/me/passwordDialog.css';

class PasswordDialog extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state={
          err:""
        }
    }

    submitClick = ()=>{
        var {value} = this.refs.input,
            {onSuccess} = this.props;

        this.props.checkPassword(value,(isSuccess,message)=>{
          if(isSuccess){
            onSuccess();
          }else{
            this.setState({err:message});
          }

        },this);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("PasswordDialog render");

        var {onClose} = this.props;

        return(
            <FullScreenView mask={true}>
                <div className={styles.nobg}>
                    <div className={styles.pp_top}>输入密码</div>
                    <div className={styles.pp_mid}>
                        <input type="password" className={styles.text_password} placeholder="请输入账户密码" ref="input" />
                        <p className={Color.red+" "+styles.err }>{this.state.err}</p>
                    </div>
                    <div className={styles.pp_btns}>
                        <a className={styles.btn_pp_cancel} onClick={onClose}>取消</a>
                        <a className={styles.btn_pp_ok} onClick={this.submitClick}>确定</a>
                    </div>
                </div>
            </FullScreenView>
        );
    }

}

function injectAction(){
    return {checkPassword};
}

// module.exports = connect(null,injectAction())(PasswordDialog);
export default connect(null,injectAction())(PasswordDialog);
