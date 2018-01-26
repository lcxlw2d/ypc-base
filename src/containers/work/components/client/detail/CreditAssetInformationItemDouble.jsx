import styles from '../../css/client/detail/assetInformationItem.css';

class CreditAssetInformationItemDouble extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);

    }


    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("CreditAssetInformationItemDouble render");

        var {iconName,valueColor,value,title,titleArr} = this.props;
        return (
            <div className={styles.debt_w100+" "+styles.asset_innerbox+" "+styles.credit} >
                <div className={this.mergeClassName(styles.marketValue, styles[iconName],styles.credit_value)}>
                    <p><span  className={this.mergeClassName(styles.doubleBold, styles[valueColor])}>
                    {value}</span>&nbsp;<span  className={styles.linehg20}>{title}</span></p>
                        <div  className={styles.debt_detail}>
                            <p  className={Font.font13}>
                                <span  className={Color.c6}>融资 / 融券：</span>&nbsp;
                                <span>{titleArr[0]===''?'--':titleArr[0]}</span>
                                <span> /</span>
                                <span>{titleArr[1]===''?'--':titleArr[1]}</span></p>
                            <p  className={Font.font13}>
                            <span  className={Color.c6}>费用 / 利息：</span>&nbsp;
                            <span>{titleArr[2]===''?'--':titleArr[2]}</span>
                            <span> /</span>
                            <span>{titleArr[3]===''?'--':titleArr[3]}</span></p>
                            <p  className={Font.font13}>
                            <span  className={Color.c6}>其他：</span>&nbsp;
                            <span>{titleArr[4]===''?'--':titleArr[4]}</span>
                            </p>
                        </div>
                </div>
            </div>
        );
    }

}

module.exports = CreditAssetInformationItemDouble;
