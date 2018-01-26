import CreditAssetInformationItem from './CreditAssetInformationItem';
import CreditAssetInformationItemDouble from './CreditAssetInformationItemDouble';
import styles from '../../css/client/detail/AssetInformation.css';

class CreditAssetInformation extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("CreditAssetInformation render");

        var {assets} = this.props,
            {
                currentBalance='--',
                totalDebit='--',
                closeMarketValue='--',
                financeCloseBalance='--',
                shortsellCloseBalance='--',
                closeFareDebit='--',
                totalInterest='--',
                closeOtherDebit='--'
            }=assets;

        return(
            <div className={styles.asset_list}>
                <CreditAssetInformationItem clickAble={false} title="市值(证券市值)" iconName="market" value={closeMarketValue} valueColor="red"/>
                <CreditAssetInformationItem clickAble={false} title="资金(资金余额)" iconName="as_capital" value={currentBalance} valueColor="blue"  />
                <CreditAssetInformationItemDouble title="负债" iconName="as_debat"
                    value={totalDebit} valueColor="green"  titleArr={[financeCloseBalance,shortsellCloseBalance,closeFareDebit,totalInterest,closeOtherDebit]} />
            </div>
        );
    }
}

module.exports = CreditAssetInformation;
