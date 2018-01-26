import styles from "./css/asset.css";
class Asset extends PureComponent{
    // static defaultProps = {
    //     index:0
    // };

    //构造函数
    constructor(props, context) {
        super(props, context);
    }



    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Asset render");

        let {   initAsset,
            endAsset,
            netInflow,
            incomeBalance,
            inflowCount,
            outflowCount,
            inflowBalance,
            outflowBalance,
        } = this.props.data;
        netInflow = netInflow>=0?`+${netInflow}`:netInflow;
        incomeBalance = netInflow>=0?`+${incomeBalance}`:incomeBalance;
        inflowBalance = inflowBalance>=0?`+${inflowBalance}`:inflowBalance;
        outflowBalance = outflowBalance>=0?`+${outflowBalance}`:outflowBalance;

        // let {tabValue, tabValue2, myIncome='-', otherIncome='-'} = this.props, income='--';
        return(
            <div className={styles.columnbox}>
                <div className={styles.cl_tit}>
                    <center>资产情况</center>
                    <span className={styles.unitof}>(单位：元)</span>
                </div>
                <div className={styles.assetsbox}>
                    <div className={styles.final_at}>
                        <div className={styles.fncircle}>
                            <p className={styles.c6}>期末资产</p>
                            <p className={styles.red}>{endAsset}</p>
                        </div>
                    </div>
                    <div className={styles.assetlist}>
                        <div className={styles.asset01}>
                            <h3>期初资产</h3>
                            <p>{initAsset}</p>
                        </div>
                        <div className={this.mergeClassName(styles.asset01, styles.red)}>
                            <h3>净流入</h3>
                            <p>{netInflow}</p>
                        </div>
                        <div className={this.mergeClassName(styles.asset01, styles.green)}>
                            <h3>账户盈亏</h3>
                            <p>{incomeBalance}</p>
                        </div>
                        <div className={styles.clear}></div>
                        <div className={styles.inflow}>
                            <div>
                                <b className={styles.pt_top}><i className={styles.top_arrow1}></i><i className={styles.top_arrow2}></i></b>
                            </div>
                            <div className={styles.in_tit}>
                                <h1>净流入详情</h1>
                                <p>净流入数据统计包含银证转账及市值转托管</p>
                            </div>
                            <div className={styles.in_list}>
                                <div className={styles.in_into}>
                                    <div className={styles.inicon01}></div>
                                    <div className={styles.left}>
                                        <p className={styles.c3}>{inflowCount}</p>
                                        <p className={styles.c6}>流入笔数</p>
                                    </div>
                                    <div className={styles.left}>
                                        <p className={styles.red}>{inflowBalance}</p>
                                        <p className={styles.c6}>流入金额</p>
                                    </div>
                                </div>
                                <div className={styles.in_into}>
                                    <div className={styles.inicon02}></div>
                                    <div className={styles.left}>
                                        <p className={styles.c3}>{outflowCount}</p>
                                        <p className={styles.c6}>流出笔数</p>
                                    </div>
                                    <div className={styles.left}>
                                        <p className={styles.green}>{outflowBalance}</p>
                                        <p className={styles.c6}>流出金额</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>);
    }


}

module.exports = Asset;
