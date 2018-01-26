
import styles from './css/gesturePage.css';
import GestureSet from '../components/GestureSet';
/** 手势密码设置页面 **/
class GesturePage extends PageComponent{

  constructor(props,context) {
      super(props,context);
  }

  //获取页面名称
  getPageName(){
    return "手势设置页";
  }
  gotoHome=()=>{
    hashHistory.replace("/work");
  }

      render(){
          systemApi.log("GesturePage render");

          return (
              <GestureSet close={this.gotoHome} skip={true}/>

          );
      }

  }


  module.exports = GesturePage;
