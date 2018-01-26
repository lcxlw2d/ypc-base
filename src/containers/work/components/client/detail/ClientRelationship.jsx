import styles from '../../css/client/detail/clientRelationship.css';

class ClientRelationship extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ClientRelationship render");

        var {relationMap} = this.props,
            {ISMAINSERV, mainServ="无主服务人", developer="--", tempServ } = relationMap||{};

        return (
            <div className={styles.service_gk}>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody >
                        <tr className={styles.borderBottom}>
                            <td className={styles.w50}>
                                <div className={styles.w25}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>开发关系</i>
                                        <i className={styles.text}>{developer}</i>
                                    </span>
                                </div>
                            </td>
                            <td className={styles.w50}>
                                <div className={styles.w25+' '+styles.overflow_inherit}>
                                    <span className={styles.pdl10+' '+styles.overflow_inherit}>
                                        <i className={styles.text}>责权关系</i>
                                        <i className={styles.text}>{mainServ}</i>
                                        {(ISMAINSERV=="1")?(<i className={styles.icon_tip03}>主服务人</i>):null}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        {tempServ?(<tr >
                            <td className={styles.w50} colSpan="2">
                                <div className={styles.w25+' '+styles.overflow_inherit}>
                                    <span className={styles.pdl10}>
                                        <i className={styles.text}>临时关系</i>
                                        <i className={styles.text}>{tempServ}</i>
                                    </span>
                                </div>
                            </td>
                        </tr>):null}

                    </tbody>
                </table>
            </div>
        );
    }
}

module.exports = ClientRelationship;
