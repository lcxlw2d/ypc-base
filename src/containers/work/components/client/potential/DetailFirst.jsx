import ServiceList from './ServiceList';
import styles from '../../../../work/pages/client/css/AddPotentialPage.css';

class DetailFirst extends PureComponent{
    constructor(props, context) {
        super(props, context)

    }

    render() {
        systemApi.log("DetailFirst render");
        let {
            potentialId='',
            clientName = '',
            clientSex,
            mobileTel,
            mobileTelShow = '',
            owner,
            organizationName,
            isPositive,
            fundAccount,
            totalAsset,
            opendate
        } = this.props;

        return (
            <Content iscroll={false}>
                <div className={styles.floor}>
                    <div className={styles.potentialbox}>
                        <div className={styles.pot_textbox}>
                            <ul>
                                <li>
                                    <div className={styles.pot_label}>姓名</div>
                                    <div className={styles.pot_lb_line}></div>
                                    <div className={styles.pot_text}>
                                        <span>{clientName}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.pot_label}>性别</div>
                                    <div className={styles.pot_lb_line}></div>
                                    <div className={styles.pot_check}>
                                        <span>{clientSex}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.pot_label}>手机</div>
                                    <div className={styles.pot_lb_line}></div>
                                    <div className={styles.pot_text}>
                                        <span>{mobileTelShow}</span>
                                        <a onClick={this.props.callFunc} className={styles.pot_phone}></a>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.pot_label}>营业厅</div>
                                    <div className={styles.pot_lb_line}></div>
                                    <div className={styles.pot_text}>
                                        <span>{organizationName}</span>
                                    </div>
                                </li>
                                {isPositive=='1'
                                    ? <li>
                                            <div className={styles.pot_label}>资金账号</div>
                                            <div className={styles.pot_lb_line}></div>
                                            <div className={styles.pot_text}>
                                                <span>{fundAccount}</span>
                                                <a onClick={this.props.goToDetail} className={styles.icon_enter}>进入客户全景图</a>
                                            </div>
                                        </li>
                                    : null}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.floor}>
                    <div className={styles.ser_record}>
                        <div className={styles.ser_tit}>
                            <span>服务记录</span>
                            {isPositive==0?<a onClick={this.props.goToService}>新增服务记录</a>:null}
                        </div>
                        <div className={styles.ser_list}>
                            <ul>
                                <ServiceList potentialId={potentialId} isPositive={isPositive} />
                            </ul>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}

module.exports = DetailFirst;
