import styles from '../../../pages/css/home/KingGloryPage.css';
class CorpsVsItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            bln: false
        }
    }

    componentDidMount() {
        this.isRender()
    }

    renderList = data => {
        return data.map((item, index) => {

            var {loginId, userName, pictureUrl, isMvp} = item;
            if (!isMvp) {
                return (
                    <li>
                        <p><img src={pictureUrl}/></p>
                        <span>{userName}</span>
                    </li>
                )
            }
        })
    }

    renderMvp = data => {
        var {isTwo} = this.props;
        if (data.length === 1) {

            var {loginId, userName, pictureUrl, isMvp} = data[0];
            return (
                <div className={styles.left_user_mvp}>
                    <p><img src={pictureUrl}/>
                        <i></i>
                    </p>
                    <span>{userName}</span>
                </div>
            )
        } else {
            return data.map((item, index) => {

                var {loginId, userName, pictureUrl, isMvp} = item;
                if (isMvp) {

                    return (
                        <div className={styles.left_user_mvp}>
                            <p><img src={pictureUrl}/>
                                <i
                                    className={isTwo
                                    ? styles.mvpicon01
                                    : styles.mvpicon02}></i>
                            </p>
                            <span>{userName}</span>
                        </div>
                    )
                }
            })
        }

    }

    isRender = () => {
        let {member} = this.props.data;
        for (let i = 0; i < member.length; i++) {
            let {isMvp} = member[i];
            if (isMvp) {
                this.setState({bln: true})
            }
        }

    }

    render() {
        systemApi.log("CorpsVsItem render");
        var {data} = this.props, {bln} = this.state, {
                teamName,
                reamId,
                fgsName,
                teamScore,
                isWin,
                member
            } = data,
            members = [];
        fgsName = `（${fgsName}）`;
        members = member.slice(1);
        return (
            <div className={styles.vs_left}>
                <h1>
                    <p className={styles.names}>{teamName}</p>
                    <p className={styles.names}>{fgsName}</p>
                    <p className={styles.teamScore}>{teamScore}</p>
                </h1>
                {bln
                    ? this.renderMvp(member)
                    : this.renderMvp(member.slice(0, 1))}
                <ul>
                    {bln
                        ? this.renderList(member)
                        : this.renderList(members)}
                </ul>
            </div>
        )
    }
}

module.exports = CorpsVsItem;
