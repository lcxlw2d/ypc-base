import {connect} from 'react-redux';
import {copyPhone} from '../../../actions/client/summary/summaryAction';
import ShowTip from './ShowTip';
import styles from '../../css/client/detail/summaryPanel.css';

class OrdinaryPanel extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state={
          showTip:false,
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

    toggleTip = ()=>{
        this.setState({
            showTip:!this.state.showTip
        })
    }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("OrdinaryPanel render");

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
            <div>
                <div className={styles.floor_item + " " + styles.mt0}>
                    <div className={styles.cums_asset}>
                        <div className={styles.assetFrame}>
                            <div className={styles.w45}>
                                <div className={styles.total_assets}>
                                    <p>
                                        <span className={styles.redbold}>{totalAsset}</span>
                                    </p>
                                    <p onClick={this.toggleTip}><span className={styles.left}>总资产(元)</span><i className={styles.icon_tip02}></i></p>
                                </div>
                            </div>
                            <div className={styles.w55}>
                                <div className={styles.h50}>
                                    <span className={styles.commission}>佣金费率</span>
                                </div>
                                <div className={styles.h50}>
                                    <div className={styles.single_commission}>
                                        <p className={styles.sgcs_tit}>上海后台</p>
                                        <p className={styles.red}>{rate1}</p>
                                    </div>
                                    <div className={styles.single_commission}>
                                        <p className={styles.sgcs_tit}>两融普通</p>
                                        <p className={styles.red}>{rate2}</p>
                                    </div>
                                    <div className={styles.single_commission}>
                                        <p className={styles.sgcs_tit}>两融信用</p>
                                        <p className={styles.red}>{rate3}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.w10}>联系地址：{idAddress}</div>
                    </div>
                </div>
                {this.state.showTip?(<ShowTip title='总资产口径说明'
                content='兴业体系内各账户资产总和，二级保证金+二级市值+港股通市值（人民币，
                换算汇率口径按当日清算港股通卖出汇率）+开放式基金市值+资管产品市值+两融账户净资产+未到账资金+约定购回净资产+银行理财
                产品额+证券理财产品额+股权质押净资产（计算净资产时，因不含限售股做股票质押式回购的限售股市值，会产生负数），按日更新。'
                closeFn={this.toggleTip}/>):""}
            </div>
        );
    }

}

function injectAction() {
    return {copyPhone};
}

module.exports = connect(null, injectAction())(OrdinaryPanel);
