import CorpDetailItem from './CorpDetailItem';
import styles from '../../../pages/css/home/KingGloryPage.css';

class CorpDetail extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        systemApi.log("CorpDetail render");
        var {myTeam, rivalTeam} = this.props, length = rivalTeam.length;
        return (
            <div className={styles.team_live}>
                <div className={styles.wzrytit01}><img src="./images/work/home/wzry/wzry_tit03.png"/></div>
                <CorpDetailItem title='我的战队：' data={myTeam[0]}/>
                <CorpDetailItem title='对手战队：' data={rivalTeam[0]}/>
                {length>1?<CorpDetailItem title='对手战队：' data={rivalTeam[1]}/>:null}
            </div>

        )
    }
}

module.exports = CorpDetail;
