import styles from '../../css/home/attend/StatisticsItem.css';

class StatisticsItem extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    Click = () => {

        let { createUserId, Click, userName } = this.props;
        Click&&Click(createUserId, userName)
    }


    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("StatisticsItem render");
        var {
            userName = "",
            createUserImg,
            createUserId,
            branchNo,
            branchName,
            teamNo,
            teamName,
            visitNumber='--',
            clientNumber='--',

            } = this.props,
            userImg = createUserImg=="-1"?"./images/work/me/user_01.png":createUserImg;

        return (
            <div className={styles.singleft} onClick={this.Click}>
                <i></i>
                <p><span className={styles.ft_name}>{userName}</span><span className={Color.c6}>{branchName}  {teamName}</span></p>
                <p><span className={styles.ft_num01}>{visitNumber}</span><span className={Color.c6}>条足迹</span><span className={styles.ft_num02}>{clientNumber}</span><span class={Color.c6}>位客户</span></p>
            </div>
        );
    }
}


module.exports = StatisticsItem;
