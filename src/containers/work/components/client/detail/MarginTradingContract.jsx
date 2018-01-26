import styles from '../../css/client/detail/marginTradingContract.css';

class MarginTradingContract extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("MarginTradingContract render");

        var {highest='--',highRZ='--',highRQ='--',begin='--',end='--',financingRate='',shortSaleRate=''} = this.props.marginTradingContract;

        highest=(highest===''?'--':highest);
        highRZ=(highRZ===''?'--':highRZ);
        highRQ=(highRQ===''?'--':highRQ);
        begin=(begin===''?'--':begin);
        end=(end===''?'--':end);
        financingRate=(financingRate===''?'--':financingRate+'%');
        shortSaleRate=(shortSaleRate===''?'--':shortSaleRate+'%');

        return (
            <div className={styles.service_gk}>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr >
                            <td className={styles.w50} colSpan="2">
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>最大总额度</i>
                                        <i className={styles.border_radius}>{highest}</i>
                                    </span>
                                </div>
                            </td>

                        </tr>
                        <tr className={styles.borderBottom}>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text+" "+styles.displayBlock}>最高融资额度</i>
                                        <i className={styles.border_radius}>{highRZ}</i>
                                    </span>
                                </div>
                            </td>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text+" "+styles.displayBlock}>最高融券市值额度</i>
                                        <i className={styles.border_radius}>{highRQ}</i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className={styles.borderBottom}>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>融资利率</i>
                                        <i className={styles.border_radius}>{financingRate}</i>
                                    </span>
                                </div>
                            </td>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>融券利率</i>
                                        <i className={styles.border_radius}>{shortSaleRate}</i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className={styles.borderBottom}>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>生效日期</i>
                                        <i className={styles.border_radius}>{begin}</i>
                                    </span>
                                </div>
                            </td>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>失效日期</i>
                                        <i className={styles.border_radius}>{end}</i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}


module.exports = MarginTradingContract;
