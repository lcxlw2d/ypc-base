import {connect} from 'react-redux';
import {setDetailModeAction,showMessage,WARNING,FROM_CLIENT_PAGE} from '../../../../store/actions';

import styles from '../css/client/toggle.css';

class Toggle extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    switchCredit = ()=>{
        var {detailMode,hasFina} = this.props;
        if(detailMode!="1")
        if(hasFina=='1')
            this.props.setDetailModeAction("1");
        else
            this.props.showMessage(WARNING,"该客户没有信用账户");

    }

    switchOrdinary = ()=>{
        var {detailMode} = this.props;
        if(detailMode!="0")
          this.props.setDetailModeAction("0");
    }

    render(){

        systemApi.log("Toggle render");

        var {detailMode,hasFina} = this.props,
            ordinary = this.mergeClassName(styles.accont_ordinary,detailMode=="0"?styles.on:""),
            credit = this.mergeClassName(styles.accont_credit,detailMode=="1"?styles.on:"");

        return (
            <div className={styles.cus_classify}>
              	 <a  className={ordinary} onClick={this.switchOrdinary}>普通</a>
                 <a  className={credit} onClick={this.switchCredit}>信用</a>
             </div>
        )

    }

}

function injectAction(){
    return {setDetailModeAction,showMessage};
}

function injectProps(state){
    var {detailMode="0"} = state.base.client || {};
    return {detailMode};
}

module.exports = connect(injectProps,injectAction())(Toggle);
