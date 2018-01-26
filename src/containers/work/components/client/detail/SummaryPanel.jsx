import {connect} from 'react-redux';
import {copyPhone} from '../../../actions/client/summary/summaryAction';
import styles from '../../css/client/detail/summaryPanel.css';

class SummaryPanel extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state={
          baseInfo:props.baseInfo
        }
    }
    componentWillMount(){
      this.setState({
        baseInfo:this.props.baseInfo
      })
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        baseInfo:nextProps.baseInfo
      })
    }
    copyfunc(){
      this.props.copyPhone(this.state.baseInfo.mobileTel,null,this);
    }

    copyFundaccfunc(){
      this.props.copyPhone(this.state.baseInfo.fundAccount,null,this);
    }


    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("SummaryPanel render");

        var showCopyBtn = true,
            {baseInfo} = this.state,
            {
                clientName="--",
                pic='./images/work/client/user_01.png',
                age='--',
                fundAccount='--',
                fundCard='--',
                mobileTel='--',
                organizationName='--',
                totalAsset='--',
                mainBank='--',
                idAddress='--',
                validClient='0',
                idBegindate='--',
                sex='--',
                rate1='--',
                rate2='--',
                rate3='--'
            } = baseInfo;
        rate1 = rate1?(rate1+"‰"):"--";
        rate2 = rate2?(rate2+"‰"):"--";
        rate3 = rate3?(rate3+"‰"):"--";
        age = sex=="机构"?"":(age+"岁/");
        if(mobileTel.length>=11){
            mobileTel=mobileTel.substr(0,4)+"****"+mobileTel.substr(mobileTel.length-3);
        }
        else if(mobileTel.length<2){
            mobileTel="暂无";
            showCopyBtn=false;
        }

        return (
                <div className={styles.bg01}>
                    <div className={styles.serveybox}>
                        <div className={styles.sv_top}>
                            <div className={styles.sv_user}>
                                <div className={styles.cs_user_pic}>
                                    <img src="./images/work/client/user_01.png"/>
                                    <img src={pic} onError={(e)=>{e.target.src='./images/work/client/user_01.png'}}/>
                                </div>
                                <div className={styles.cs_left}>
                                    <div className={styles.cs_user_name}>{clientName}</div>
                                    <div className={styles.cs_uder_int}>
                                        <div className={styles.cs_user_account} onClick={this.copyFundaccfunc.bind(this)} ><span>{fundAccount}</span><a  className={styles.btn_copy+" "+styles.btn_copy_mt}></a></div>
                                        <div className={styles.cs_user_age}>
                                            <span>{age}</span>
                                            <span>{sex}</span>
                                        </div>
                                        {validClient=="1"?(<div className={styles.cs_user_effective}>有效</div>):null}
                                        {fundCard.length>0?(<div className={styles.cs_user_account_rong}><span>{fundCard}</span><span className={styles.rong}>融</span></div>):null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.sv_bot}>
                            <div>
                                <p className={this.mergeClassName(Color.white, Font.font12)}>开户日期</p>
                                <p className={Color.white}>{idBegindate}</p>
                            </div>
                            <div>
                                <p className={this.mergeClassName(Color.white, Font.font12)}>主存管银行</p>
                                <p className={Color.white}>{mainBank}</p>
                            </div>
                            <div>
                                <p className={this.mergeClassName(Color.white, Font.font12)}>
                                    <span>手机号码</span>
                                    {showCopyBtn?(<a className={styles.btn_copy} onClick={this.copyfunc.bind(this)}> </a>):null}
                                </p>
                                <p className={Color.white}>{mobileTel}</p>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

function injectAction() {
    return {copyPhone};
}

module.exports = connect(null, injectAction())(SummaryPanel);
