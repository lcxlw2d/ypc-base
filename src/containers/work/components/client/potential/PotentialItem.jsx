import {connect} from 'react-redux';
import styles from '../../../pages/client/css/AddPotentialPage.css';
import {recordJumpService} from '../../../../../store/actions';
class PotentialItem extends PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    onClick = () => {
        let {potentialId, clientId} = this.props;
        hashHistory.push("/work/client/potentialDetail/"+potentialId)


    }
    render() {
        systemApi.log("PotentialItem render");
        let {potentialId, clientName='', clientSex, isPositive, fundAccount, totalAsset, opendate} = this.props, favorCls = '';
        clientName = clientName.length >6?(clientName.substring(0, 6)+'...'):clientName;
        favorCls = clientSex=='1'?styles.icon_cuswoman:styles.icon_cusman;
        //<i class="icon_cuswoman"></i>
       // <i class="icon_cusman"></i>
       if(fundAccount==null||fundAccount=="未转正"||fundAccount=="") isPositive="0"

        return (
            <li className={this.mergeClassName(styles.tr)} onClick={this.onClick}>
                <i className={styles.arrow_right}></i>
                {clientSex == '2'?<span className={styles.jigou}>机构</span>:<i className={favorCls}></i>}
                {isPositive=="1"?(<span className={styles.textborder}>已转正</span>):(<span className={styles.textborder}>未转正</span>)}
                <div className={styles.info}>
                    <div className={styles.info_left}>
                        {isPositive=="1"?
                        <div className={this.mergeClassName(styles.text, styles.flex)}>
                            <p>{clientName}</p>
                            <p className={styles.fundcode}>{fundAccount}</p>
                        </div>
                        :<div className={styles.text}>
                            <p style={{lineHeight:"37px"}}>{clientName}</p>
                        </div>}

                        <p className={this.mergeClassName(Color.c9, styles.right)}>

                            <span className={styles.ml}>{opendate}</span>
                        </p>
                    {/* //{opendate?(<span className={styles.time}><p>{opendate}</p></span>):null} */}
                    </div>
                </div>
            </li>
        )
    }
}

function injectAction() {
    return {recordJumpService};
}


module.exports = connect(null, injectAction())(PotentialItem);
