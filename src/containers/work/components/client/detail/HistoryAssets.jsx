import styles from '../../css/client/detail/historyAssets.css';

class HistoryAssets extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("HistoryAssets render");

        var {historyAsset} = this.props,
            {
                peakValue = '--',
                peakDate = '--',
                hkTwentydayavgAsset = '--',
                optTwentydayavgAsset = '--',
                outTotalAsset = '--'
            } = historyAsset;

        return (
            <div className={styles.service_gk}>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody >
                        <tr className={styles.borderBottom}>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>资产峰值</i>
                                        <i className={Color.red}>{peakValue}</i>
                                    </span>
                                </div>
                            </td>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>峰值日期</i>
                                        <i className={Color.red}>{peakDate}</i>
                                    </span>
                            </div>
                        </td>
                    </tr>
                    <tr className={styles.borderBottom}>
                        <td className={styles.w50} colSpan="2">
                            <div className={styles.w25}>
                                <span className={styles.pdl10}>
                                    <i className={styles.text}>20日日均资产（港股通）</i>
                                    <i className={Color.red}>{hkTwentydayavgAsset}</i>
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr className={styles.borderBottom}>
                        <td className={styles.w50} colSpan="2">
                            <div className={styles.w25}>
                                <span className={styles.pdl10}>
                                    <i className={styles.text}>20日日均资产（期权）</i>
                                    <i className={Color.red}>{optTwentydayavgAsset}</i>
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr >
                        <td className={styles.w50} colSpan="2">
                            <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>体外资产（万元）</i>
                                        <i className={Color.red}>{outTotalAsset}</i>
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

module.exports = HistoryAssets;
