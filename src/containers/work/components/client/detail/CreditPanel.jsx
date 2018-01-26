import {connect} from 'react-redux';
import {copyPhone} from '../../../actions/client/summary/summaryAction';
import ShowTip from './ShowTip';
import styles from '../../css/client/detail/creditPanel.css';

class CreditPanel extends PureComponent {

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
        systemApi.log("CreditPanel render");

        var showCopyBtn = true,
            {baseInfo} = this.state,
            {
                closeAssureBalance='--',
                netAsset='--',
                closeRate='--'
            } = baseInfo;
            if(closeRate===''||closeRate=='-100')
                closeRate='--';
            else {
                closeRate = closeRate+"%";
            }
            closeAssureBalance = (closeAssureBalance===''?"--":(closeAssureBalance));
            netAsset = (netAsset===''?"--":(netAsset));
        return (
            <div>
                <div className={styles.floor_item + " " + styles.mt0}>
                    <div className={styles.cums_asset}>
                        <div className={styles.assetFrame}>
                            <div className={styles.w50}>
                                <div className={styles.total_assets}>
                                    <p>
                                        <span className={styles.redbold}>{closeAssureBalance}</span>
                                    </p>
                                    <p onClick={this.toggleTip}><span className={styles.left}>总资产(元)</span>
                                    <i className={styles.icon_tip02}></i>
                                    </p>
                                </div>
                            </div>
                            <div className={styles.w50}>
                                <div className={styles.credit_h50}>
                                    <span className={styles.commission}>净资产</span>
                                    <span className={Color.red}>{netAsset}</span>
                                </div>
                                <div className={styles.credit_h50}>
                                    <span className={styles.commission}>维持担保比例</span>
                                    <span className={Color.red}>{closeRate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showTip?(<ShowTip title="总资产口径说明" content="信用账户总资产为证券市值+资金余额，包含通过融资买入或融券的证券市值。" closeFn={this.toggleTip}/>):""}
            </div>
        );
    }

}

function injectAction() {
    return {copyPhone};
}

module.exports = connect(null, injectAction())(CreditPanel);
