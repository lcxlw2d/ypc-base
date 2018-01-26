import styles from '../../../pages/css/home/KingGloryPage.css';
class BusinessSubItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        systemApi.log("BusinessSubItem render");
        var {
                data = {},
                Attribute=''
            } = this.props, {
                branchName,
                branchScore,
                branchNetCommission,
                branchNetCommissionShare,
                branchVolume,
                branchVolumeShare,
                fgsName,
                fgsScore,
                fgsNetCommission,
                fgsNetCommissionShare,
                fgsVolume,
                fgsVolumeShare,
                isWin
            } = data;

        branchName = `${Attribute=='Fgs'?fgsName:branchName}`;
        branchNetCommission = `${Attribute=='Fgs'?fgsNetCommission:branchNetCommission}元`;
        branchNetCommissionShare = `${Attribute=='Fgs'?fgsNetCommissionShare:branchNetCommissionShare}%`;
        branchVolume = Attribute=='Fgs'?fgsVolume:branchVolume;
        branchVolume = branchVolume>10000?`${Math.floor(branchVolume/10000)}万元`:`${branchVolume}元`;
        branchVolumeShare = `${Attribute=='Fgs'?fgsVolumeShare:branchVolumeShare}%`;
        branchScore = `：${Attribute=='Fgs'?fgsScore:branchScore}%`;
        return (
            <div className={styles.vs_innebox}>
                <div className={styles.vs_tit}>
                    <span className={styles.vs_tit_span1} style={{maxWidth:"70%"}}>{branchName}</span>
                    <span className={styles.vs_tit_span2}  style={{width:"22%"}}>{branchScore}</span>
                </div>
                <h1 className={styles.vs_h1}>
                    <span className={styles.w_yellow}>股基净佣金</span>&nbsp;<span className={styles.w_yellow2}>{branchNetCommission}</span>&nbsp;<span>占公司</span>&nbsp;<span className={styles.w_yellow2}>{branchNetCommissionShare}</span>
                </h1>
                <h1 className={styles.vs_h1}>
                    <span className={styles.w_yellow}>股基交易量</span>&nbsp;<span className={styles.w_yellow2}>{branchVolume}</span>&nbsp;<span>占公司</span>&nbsp;<span className={styles.w_yellow2}>{branchVolumeShare}</span>
                </h1>
            </div>
        )
    }
}

module.exports = BusinessSubItem;