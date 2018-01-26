import CorpAll from './CorpAll';
import styles from '../../../pages/css/home/KingGloryPage.css';

class CorpDetailItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        systemApi.log("CorpDetailItem render");
        var {data={}, title} = this.props, {
            fgsName,
            teamScore,
            teamRank,
            isWin,
            member,
            teamName,
            teamSumScore
        } = data;

        return (
            <div className={styles.team_inner}>
                <h1>
                    <span>{title}</span>
                    <span>{teamName}</span>
                </h1>
                <CorpAll data={member}/>
                <div className={styles.team_achievement}>
                    <div>
                        <span className={styles.yahei_bold}>战队本月成绩</span>
                        <span className={this.mergeClassName(styles.w_white, styles.w_bold)}>{teamScore}</span>
                    </div>
                    <div>
                        <span className={styles.yahei_bold}>战队累计成绩</span>
                        <span className={styles.w_white}>{teamSumScore}</span>
                        <span className={styles.w_white}>(第<span className={styles.w_yellow}>{teamRank}</span>名)</span>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = CorpDetailItem;