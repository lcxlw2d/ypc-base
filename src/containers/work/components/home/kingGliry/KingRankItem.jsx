import styles from '../../../pages/css/home/KingGloryPage.css';

class KingRankItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
        }


    }

    renderKingRankItemList=(member)=>{
        return member.map((item,index)=>{
             var   {loginId,userName,pictureUrl,isMvp} = item;
            return(
                 <li className={isMvp?styles.user_mvp:null}>
                    <p>
                        <img src={pictureUrl}/> {isMvp
                            ? <i className={styles.mvpicon01}/>
                            : null}
                    </p>
                    <span>
                        {userName}
                    </span>
                </li>
            )
        })
    }

    render() {
        systemApi.log("KingRankItem render");
        var {data,className} = this.props,
            {teamName, reamId, fgsName,teamSumScore,teamRank,member} = data,styles_top;

        teamRank !=10? (styles_top = "top10_0"+teamRank) :(styles_top = "top10_"+teamRank);

        styles_top = styles[styles_top];

        return (
             <div className={this.mergeClassName(styles.top10_sg,styles_top)}>
                <h1>
                    {/*<span className={styles.yahei_bold}>战队:</span>*/}
                    <span className={styles.w_white}>{teamName}</span>
                    {/*<span className={styles.yahei_bold}>分公司:</span>*/}
                    <span className={styles.w_white}>({fgsName})</span>
                    <span className={styles.yahei_bold}>累计成绩:</span>
                    <span className={styles.w_white}>{teamSumScore}</span>
                </h1>
                <ul>
                    {this.renderKingRankItemList(member)}
                </ul>
             </div>

        )
    }
}

module.exports = KingRankItem;