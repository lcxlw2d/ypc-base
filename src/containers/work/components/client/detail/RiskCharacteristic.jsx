import styles from '../../css/client/detail/riskCharacteristic.css';

class RiskCharacteristic extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("RiskCharacteristic render");

        var {
            bearRisk='未评测',
            endDate='暂无',
            dict_risktrait='未评测',
            traitHolddate='暂无'
        } = this.props.risk;

        bearRisk=(bearRisk==''?'未评测':bearRisk);
        dict_risktrait=(dict_risktrait==''?'未评测':dict_risktrait);

        return (
            <div className={styles.service_gk}>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>风险承受</i>
                                        <i className={styles.border_radius}>{bearRisk}</i>
                                    </span>
                                </div>
                            </td>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>测评到期</i>
                                        <i className={styles.border_radius}>{endDate}</i>
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr className={styles.borderBottom}>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>综合风险特征</i>
                                        <i className={styles.border_radius}>{dict_risktrait}</i>
                                    </span>
                                </div>
                            </td>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>认定日期</i>
                                        <i className={styles.border_radius}>{traitHolddate}</i>
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

module.exports = RiskCharacteristic;
