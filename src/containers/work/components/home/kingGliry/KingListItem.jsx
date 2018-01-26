import styles from '../../../../work/pages/css/home/KingGloryPage.css';

class KingListItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("KingListItem render");
        var {data}=this.props,{userName,
pictureUrl,
isMvp,
teamName,
fgsName,
score,
}=data;

fgsName=`（${fgsName}）`;

        return (
            <div className={styles.target_sg}>
                <div className={styles.my_pic}><img src={pictureUrl}/>
                    <i></i>
                </div>
                <div className={styles.my_int}>
                    <p>
                        <span className={styles.w_font18}>{userName}</span>
                    </p>
                    <p className={styles.w_font13}>
                        <span className={styles.w_white}>{teamName}</span>
                        <span className={styles.w_white}>{fgsName}</span>
                        <span className={this.mergeClassName(styles.w_yellow, styles.w_font18)}>{score}</span>
                    </p>
                </div>
            </div>
        );
    }

}

module.exports = KingListItem;
