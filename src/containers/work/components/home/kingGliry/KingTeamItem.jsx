import styles from '../../../pages/css/home/KingGloryPage.css';

class KingTeamItem extends PageComponent{

     constructor(props,content){
        super(props,content);
        this.state = {
        }
    }

     renderKingTeamItemList=(member)=>{
        return member.map((item,index)=>{
            var {loginId,userName,pictureUrl,isMvp}=item;
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

    render(){
        systemApi.log("KingTeamItem33333 render");

        var {data} = this.props,
        {teamName,reamId,fgsName,teamScore,isWin,member}=data;
        return(

            <div className={styles.vs_innebox}>
                   <h1><span>{teamName}（{fgsName}）：</span><span>{teamScore}</span></h1>
                    <ul>
                        {this.renderKingTeamItemList(member)}
                    </ul>
            </div>

        )
    }
}

module.exports = KingTeamItem;
