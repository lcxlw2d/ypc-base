import styles from '../../../pages/css/home/KingGloryPage.css';

class CorpAll extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}

    }

    renderList = () => {
        var {data} = this.props;
        if (!data) {
            return
        }
        return data.map((item, index) => {
            var {
                loginId,
                userName,
                pictureUrl,
                isMvp = false
            } = item;
            return (
                <li
                    className={isMvp
                    ? styles.user_mvp
                    : null}>
                    <p>
                        <img src={pictureUrl}/> {isMvp
                            ? <i className={styles.mvpicon01}/>
                            : null}
                    </p>
                    <span>{userName}</span>
                </li>
            )
        })
    }

    render() {
        systemApi.log("CorpAll render");
        return (
            <ul style={{
                height: "76px"
            }}>
                {this.renderList()}
            </ul>
        )
    }
}

module.exports = CorpAll;