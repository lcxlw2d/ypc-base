import styles from '../../css/home/investadvice/Profile.css';

class ProfileItem  extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        var {num, title, titles, Date, showDate=false, clos} = this.props;
        return(
                <div className={styles.network_w3}>
                    <p className={clos}>{num}</p>
                    {showDate?<p>{Date}</p>:null}
                    <p className={styles.c6}>{title}</p>
                    <p className={styles.c6}>{titles}</p>
                 </div>
        )
    }
}

module.exports = ProfileItem;
