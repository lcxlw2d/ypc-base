
import {connect} from 'react-redux';
import {vipVerify} from '../../../../../store/actions';
import Category from '../../../../../components/common/category/Category';
import styles from '../../css/home/investadvice/businessChance.css';

const FLAG_TRACKING = "_FLAG_TRACKING_";
const FLAG_SERVER_RECORD = "_FLAG_SERVER_RECORD_";

class InvestAdvice extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            trackFlag:false,
            servFlag:false,
            isvip:true
        }
    }

    componentWillMount(){
        var trackFlag = systemApi.getValue(FLAG_TRACKING),
            servFlag = systemApi.getValue(FLAG_SERVER_RECORD);
        this.setState({
            trackFlag:! trackFlag,
            servFlag:!servFlag
        });
        // this.props.vipVerify("ROBOADVISOR", this, (vip)=>{
        //
        //   this.setState({
        //       isvip:(vip==1)
        //   });
        // });

    }

    //网开跟踪
    trackClick = ()=>{
        systemApi.setValue(FLAG_TRACKING,1);
        this.setState({trackFlag:false});
        hashHistory.push("/work/home/tracking");
    }

    //服务记录
    serverClick = ()=>{
        systemApi.setValue(FLAG_SERVER_RECORD,1);
        this.setState({servFlag:false});
        hashHistory.push("/work/home/serveradd");
    }
    gotoAuthority = ()=>()=>{
      Client.trackEvent("10102","HOME_CLICK_INVESTADVICE_APPLY");
      hashHistory.push('/work/home/investadviceintro');
    }

    checkAuthority = (id)=>()=>{
      if(id==1){
        Client.trackEvent("1010","HOME_CLICK_INVESTADVICE");
        hashHistory.push("/work/home/investadvice");
      }
      else {
        Client.trackEvent("10101","HOME_CLICK_INVESTADVICE_ROBOT");
        hashHistory.push("/robotinv");
      }

      // this.props.vipVerify("ROBOADVISOR", this, (vip)=>{
      //     if(vip == "0"){
      //         hashHistory.push('/work/home/investadviceintro');
      //     }
      //     else{
      //       if(id==1)
      //         hashHistory.push("/work/home/investadvice");
      //       else {
      //         hashHistory.push("/robotinv");
      //       }
      //     }
      // });
    }
    adviceClick = ()=>{
        hashHistory.push('/work/home/investadviceintro');
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("InvestAdvice render");

        var {trackFlag, servFlag,isvip} = this.state;

        return(
          <Category title="机智猫的智能引擎" borderColor="none">
          <div className={styles.content} >
                <div className={styles.bb_list}>
                  <div className={styles.bb_singlebox5} onClick={this.checkAuthority(1)}>
                      <div className={styles.bb_innerbox} >
                            <p className={styles.bb_black}>精准服务</p>
                            <span className={styles.home_c6}>精准定位、服务营销</span>
                        </div>
                    </div>
                    <div className={styles.bb_singlebox6} onClick={this.checkAuthority(2)}>
                        <div className={styles.bb_innerbox}>
                            <p className={styles.bb_black}>机器人投资</p>
                            <span className={styles.home_c7}>投资参考、智能AI</span>
                        </div>
                    </div>
                </div>
                {!isvip?(<div className={styles.bb_lock} onClick={this.gotoAuthority()} >
                <div className={styles.auth_btn}>
                    <img src="./images/work/home/investadvice/ktqx.png"/>
                </div>
                </div>):null}

          </div>


                </Category>
        );
    }


}
function injectAction() {
    return {vipVerify};
}

module.exports = connect(null, injectAction())(InvestAdvice);
