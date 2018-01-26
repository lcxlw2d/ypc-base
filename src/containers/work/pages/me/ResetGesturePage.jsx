import GestureSet from '../../../login/components/GestureSet';
import styles from '../css/me/resetGesturePage.css';

/** 我的-重置手势密码 **/
class ResetGesturePage extends PageComponent{

    constructor(props,context) {
        super(props,context);
    }

    goBack=()=>{
      hashHistory.goBack();
    }

    //获取页面名称
    getPageName(){ return "我的_重置手势密码"; }

    render(){
        systemApi.log("ResetGesturePage render");
        return (
            <GestureSet close={this.goBack}/>
        );
    }

}
module.exports = ResetGesturePage;
