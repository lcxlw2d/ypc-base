import styles from '../../css/home/newstock/list.css';

class AvailableList extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    renderList(){
        var {data} = this.props;
        if(data.length){
            return data.map((item,index)=>{
                var {SECUNAME,APPLYCODE,ISSUEPRICE,DILUTEDPERATIO,APPLYMAXONLINE} = item;
                return (
                    <tr className={styles.tr} key={index}>
                        <td>
                            <p className={Color.purpple}>{SECUNAME}</p>
                            <p className={Color.c6}>{APPLYCODE}</p>
                        </td>
                        <td className={this.mergeClassName(Color.red, styles.center)}>{ISSUEPRICE}</td>
                        <td className={styles.center}>{DILUTEDPERATIO}</td>
                        <td className={styles.center}>{APPLYMAXONLINE}</td>
                    </tr>
                );
            });
        }
        else{
            return (
                <tr className={styles.tr}>
                    <td className={styles.center} colSpan="4">暂无</td>
                </tr>
            )
        }

    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AvailableList render");

        return(
            <table width="100%">
            	<tbody>
                	<tr className={styles.header}>
                    	<th>申购代码</th>
                        <th>发行价(元)</th>
                        <th>发行市盈率(倍)</th>
                        <th>申购上限(万股)</th>
                    </tr>
                    {this.renderList()}
                </tbody>
            </table>
        );
    }

}

module.exports = AvailableList;
