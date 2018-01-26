import styles from '../../css/client/detail/clientTag.css';

class ClientTag extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }
   
    //客户标签列表
    renderItem(arr){
        var list = [];
        for(var key in arr){
            var {clientTipType, clientTipRemark} = arr[key];
            list.push(
                <tr className={styles.borderBottom}>
                    <td className={styles.w50} colSpan="2">
                        <div className={styles.w25}>
                            <span className={styles.pdl10}>
                                <i className={styles.text}>{clientTipType}</i>
                                <i className={Color.red}>{clientTipRemark}</i>
                            </span>
                        </div>
                    </td>
                </tr>
            )
        }
        return list;
    }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ClientTag render");

        var {tagMap} = this.props;
        return (
            <div className={styles.service_gk}>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody >
                        {this.renderItem(tagMap)}
                    </tbody>
                </table>
            </div>
        );
    }

}

module.exports = ClientTag;
