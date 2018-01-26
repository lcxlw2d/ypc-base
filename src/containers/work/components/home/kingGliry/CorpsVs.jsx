import styles from '../../../pages/css/home/KingGloryPage.css';
import CorpsVsItem from './CorpsVsItem';
class CorpsVs extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        systemApi.log("CorpsVs render");
        var{myTeam,rivalTeam}=this.props;
        return (
            <div className={styles.corpsVsAfter}>
                <div className={this.mergeClassName(styles.wzrytop02, styles.wzrytop03)}></div>
                <div className={this.mergeClassName(styles.wzrybot02, styles.wzrybot03)}>
                    <CorpsVsItem data={myTeam[0]} isTwo={false}/>
                    <div className={styles.text_vs_center}>vs</div>
                    <CorpsVsItem data={rivalTeam[0]} isTwo={true}/>
                </div>
            </div>
        )
    }
}

module.exports = CorpsVs;