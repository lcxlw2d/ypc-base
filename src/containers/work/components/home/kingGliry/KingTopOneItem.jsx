import styles from '../../../../work/pages/css/home/KingGloryPage.css';

class KingTopOneItem extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    renderItem = maxValue => {
        var {index} = this.props;
        switch (index) {
            case 'maxKing':

                return (
                    <p className={styles.w_font12}>
                        <span className={styles.w_white}>二级股基净佣金：</span>
                        <span className={styles.w_white}>{maxValue}</span>
                        <span className={styles.w_white}>元</span>
                    </p>
                )
            case 'maxShooter':

                return (
                    <p className={styles.w_font12}>
                        <span className={styles.w_white}>交易客户数：</span>
                        <span className={styles.w_white}>{maxValue}</span>
                        <span className={styles.w_white}>人</span>
                    </p>
                )
            case 'maxTank':

                return (
                    <p className={styles.w_font12}>
                        <span className={styles.w_white}>人均资产：</span>
                        <span className={styles.w_white}>{maxValue}</span>
                        <span className={styles.w_white}>元</span>
                    </p>
                )
            case 'maxKiller':
                return (
                    <p className={styles.w_font12}>
                        <span className={styles.w_white}>换手率：</span>
                        <span className={styles.w_white}>{maxValue}</span>
                        <span className={styles.w_white}></span>
                    </p>
                )

            case 'maxMaster':
                return (
                    <p className={styles.w_font12}>
                        <span className={styles.w_white}>净佣金率：</span>
                        <span className={styles.w_white}>{maxValue}</span>
                        <span className={styles.w_white}>%</span>
                    </p>
                )

            default:
                break;
        }
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("KingTopOneItem render");

        var {index, data} = this.props, {userName, teamName, fgsName, pictureUrl, maxValue} = data;
        fgsName = `（${fgsName}）`;
        return (
            <li>
                <div className={styles.tp_name}><img src={"./images/work/home/wzry/" + index + ".png"}/></div>
                <div className={styles.tp_int}>
                    <div className={styles.my_pic}><img src={pictureUrl}/>
                        <i></i>
                    </div>
                    <div className={styles.my_int}>
                        <p>
                            <span className={styles.w_font16}>{userName}</span>
                        </p>
                        <p className={styles.w_font12}>
                            <span className={styles.w_white}>{teamName}</span>
                            <span className={styles.w_white}>{fgsName}</span>
                        </p>
                        {this.renderItem(maxValue)}
                    </div>
                </div>
            </li>
        );
    }

}

module.exports = KingTopOneItem;
