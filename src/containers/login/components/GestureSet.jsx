import { connect } from 'react-redux';
import {gestureLogin,setGesture} from '../actions/gestureAction';
// import AppHeader from '../../../components/common/appheader/AppHeader';
import AppHeader from '../../../components/appheader/AppHeader';
import FullScreenView from '../../../components/fullscreen/FullScreenView';
import GestureLock from '../../../components/gesturelock/GestureLock';
import styles from './css/gestureSet.css';

/** 手势密码设置页面 **/
class GestureSet extends PageComponent{

  constructor(props,context) {
      super(props,context);
      this._times = 1;
      this._complete = false;
      this.lastPwd = "";
      this.state = {
          title:"请绘制解锁图案",
          error:false
      }
  }

  backFunc =()=>{
    var back=this.props.close;
    if(back){
      back();
    }else{
      hashHistory.goBack();
    }
  }
  gestureEnd = (value)=>{
      if(this._complete) return;
      if(value.length < 4){
          this._times = 1;
          this.setState({ title:"解锁图案少于4个点", error:true });
      }
      else if(this._times == 1){
          this.lastPwd = value;
          this._times++;
          this.setState({ title:"请再次输入密码", error:false });
      }
      else{
          if(this.lastPwd == value){

              this.props.setGesture(value,()=>{
                this.setState({ title:"设置成功！", error:false });
                this._complete = true;
                var resetSuccess=this.props.resetSuccess;
                if(resetSuccess){
                    resetSuccess(value);
                }else
                    this.backFunc();
              },this);

          }
          else{
              this._times = 1;
              this.setState({ title:"密码不一致，请重新设置", error:true });
          }
      }
  }

      render(){
          systemApi.log("GestureSet render");

          var {title, error} = this.state;
          return (
              <FullScreenView>
                  <AppHeader headerName="设置手势密码" onBackClick={this.backFunc}/>
                  <div className="g_full_content_no_scroll">
                      <GestureLock
                          title={title}
                          error={error}
                          secTitle="解锁图案应至少连接4个不同的点。"
                          className={styles.frame}
                          gestureEnd={this.gestureEnd}/>
                  </div>
                  {this.props.skip?(<div className={styles.closebtn}
                      onClick={this.backFunc}>跳过手势密码设置</div>):null}
              </FullScreenView>

          );
      }

  }
  function injectAction(){
      return{ gestureLogin,setGesture };
  }

//   module.exports = connect(null,injectAction())(GestureSet);
export default connect(null,injectAction())(GestureSet);
