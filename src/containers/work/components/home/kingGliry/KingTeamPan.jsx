import styles from '../../../pages/css/home/KingGloryPage.css';
import KingTeamItem from './KingTeamItem';

class KingTeamPan extends PureComponent {
     //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("KingTeamPan render");
        var {myTeam,rivalTeam,data} = this.props,
         rivalTeamLength= rivalTeam.length;

        return (
            <div>
                <div>
                    <KingTeamItem data={myTeam[0]}/>
                        <div className={styles.text_vs}>vs</div>
                    <KingTeamItem data={rivalTeam[0]}/>
                    {rivalTeamLength === 2?<div><div className={styles.text_vs}>vs</div><KingTeamItem data={rivalTeam[1]}/></div>:null}
                 </div>
            </div>
        );
    }

}

module.exports = KingTeamPan;