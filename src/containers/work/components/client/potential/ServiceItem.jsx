import {connect} from 'react-redux';
import styles from '../../../pages/client/css/AddPotentialPage.css';
import {recordJumpService} from '../../../../../store/actions';
class ServiceItem extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    onClick = () => {
        let {servId, clientId} = this.props;
        servId="/work/client/detail/server/detail/"+servId;
        this
            .props
            .recordJumpService("/work/client/potentialDetail", {
                clientId
            }, servId)
    }

    render() {
        systemApi.log("PotentialDetailPage render");
        let {servUserName, servSummarize, servTime} = this.props;
        return (
            <li onClick={this.onClick}>
                <div className={styles.ser_top}>
                    <span className={styles.ser_time}>{servTime}</span>
                    <div className={styles.ser_member}>
                        <span className="c9">服务人员：</span>
                        <span>{servUserName}</span>
                    </div>
                </div>
                <div className={styles.ser_dec}>
                    {servSummarize}
                </div>
            </li>
        )
    }
}

function injectAction() {
    return {recordJumpService};
}

module.exports = connect(null, injectAction())(ServiceItem);
