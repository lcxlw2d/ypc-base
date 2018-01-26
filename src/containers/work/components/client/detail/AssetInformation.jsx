import AssetInformationItem from './AssetInformationItem';
import styles from '../../css/client/detail/AssetInformation.css';

class AssetInformation extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AssetInformation render");

        var {assets} = this.props,
            {currentMarketValue='--',productValue='--',combineBalance='--',debt='--'}=assets,
            itemArr=[{
                titleArr:['二级总市值：'],
                valueArr:[assets.currentMarketValue]
            },{
                titleArr:['开放式基金：','资管产品：','理财产品：'],
                valueArr:[assets.fundValue,assets.financialValue,assets.financialProduct]
            },{
                titleArr:['二级保证金：','在途资金：'],
                valueArr:[assets.totalBalance,assets.outstandingBalance]
            },{
                titleArr:['两融：','约定购回：'],
                valueArr:[assets.marginAsset,assets.agreeRepurchaseAsset]
            }];

        return(
          <div className={styles.asset_list}>
            <AssetInformationItem title="市值" iconName="market" value={currentMarketValue} valueColor="red" subTitle="二级市值" itemArr={itemArr[0]}/>
            <AssetInformationItem title="产品" iconName="as_product" value={productValue} valueColor="purple" subTitle="开基\理财市值" itemArr={itemArr[1]}/>
            <AssetInformationItem title="资金" iconName="as_capital" value={combineBalance} valueColor="blue" subTitle="二级保证金" itemArr={itemArr[2]}/>
            <AssetInformationItem title="净资产" iconName="as_liabilities" value={debt} valueColor="orange" subTitle="两融\约定购回" itemArr={itemArr[3]}/>
          </div>
        );
    }

}

module.exports = AssetInformation;
