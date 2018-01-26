import styles from '../../css/client/detail/accountRights.css';

class AccountRights extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state={
            more:false
        }
    }

    clickmore = ()=>{
        var {more} = this.state;
        this.setState({more:!more});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AccountRights render");

        var {rights} = this.props,
            {more} = this.state,
            {
                accountPriHA, accountPriSA, openFundAccount, openMargin, openAgreeRepurchase, openFutures,
                openGrowthboard, signElectronicContract, accountpriBankMoney, accountHK, accountSZHK, stockPledge,
                accountpriStockMoney, openOfferRepurchase,involbusiPrivatePlacement
            } = rights;

        return(
            <div>
                <div className={styles.top_icons}>
                    <a  className={this.mergeClassName(styles.t_ico01, accountPriHA=='1'?styles.on:"")}><span>沪A</span></a>
                    <a  className={this.mergeClassName(styles.t_ico02, accountPriSA=='1'?styles.on:"")}><span>深A</span></a>
                    <a  className={this.mergeClassName(styles.t_ico03, openFundAccount=='1'?styles.on:"")}><span>基金户</span></a>
                    <a  className={this.mergeClassName(styles.t_ico04, openMargin=='1'?styles.on:"")}><span>融资融券</span></a>
                    {more?(
                        <a className={styles.t_ico05_focus} onClick={this.clickmore}><span>收起</span></a>
                    ):(
                        <a  className={styles.t_ico05} onClick={this.clickmore}><span>更多</span></a>
                    )}
                </div>
                {more?(
                    <div className={this.mergeClassName(styles.top_icons, styles.open)}>
                        <a  className={this.mergeClassName(styles.t_ico06, openAgreeRepurchase=='1'?styles.on:"")}><span>约定回购</span></a>
                        <a  className={this.mergeClassName(styles.t_ico07, openFutures=='1'?styles.on:"")}><span>期货IB</span></a>
                        <a  className={this.mergeClassName(styles.t_ico08, openGrowthboard=='1'?styles.on:"")}><span>创业板</span></a>
                        <a  className={this.mergeClassName(styles.t_ico09, signElectronicContract=='1'?styles.on:"")}><span>资管合同</span></a>
                        <a  className={this.mergeClassName(styles.t_ico011, accountpriBankMoney=='1'?styles.on:"")}><span>银行理财</span></a>
                        <a  className={this.mergeClassName(styles.t_ico012, accountHK=='1'?styles.on:"")}><span>沪港通</span></a>
                        <a  className={this.mergeClassName(styles.t_ico012, accountSZHK=='1'?styles.on:"")}><span>深港通</span></a>
                        <a  className={this.mergeClassName(styles.t_ico013, stockPledge=='1'?styles.on:"")}><span>股票质押</span></a>
                        <a  className={this.mergeClassName(styles.t_ico014, accountpriStockMoney=='1'?styles.on:"")}><span>证券理财</span></a>
                        <a  className={this.mergeClassName(styles.t_ico015, openOfferRepurchase=='1'?styles.on:"")}><span>报价回购</span></a>
                        <a  className={this.mergeClassName(styles.t_ico016, involbusiPrivatePlacement=='1'?styles.on:"")}><span>私募权限</span></a>
                    </div>
                ):null}
            </div>
        );
    }

}

module.exports = AccountRights;
