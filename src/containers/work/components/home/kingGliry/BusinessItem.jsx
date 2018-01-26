import styles from '../../../pages/css/home/KingGloryPage.css';
import BusinessSubItem from './BusinessSubItem';
class BusinessItem extends PureComponent {

    static defaultProps = {
        isTwo: false
    }

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        systemApi.log("BusinessItem render");
        var {isTwo, data={}, Attribute=''} = this.props, {myBranch=[], myFgs=[], rivalFgs=[], rivalBranch=[]} = data,rivalFgsLength= rivalFgs.length,rivalBranchLength = rivalBranch.length,
        clos = isTwo
            ? styles.wzrybot03
            : "",
        clas = isTwo
            ? styles.wzrytop03
            : "";
        return (
            <div>
                <div className={this.mergeClassName(styles.wzrytop02, clas)}></div>
                <div className={this.mergeClassName(styles.wzrybot02, clos)}>
                    <BusinessSubItem Attribute={Attribute} data={Attribute=='Fgs'?myFgs[0]:myBranch[0]}/>
                    <div className={styles.text_vs_bottom}>vs</div>
                    <BusinessSubItem Attribute={Attribute} data={Attribute=='Fgs'?rivalFgs[0]:rivalBranch[0]}/>
                    {rivalFgsLength === 2?<div><div className={styles.text_vs_bottom}>vs</div><BusinessSubItem Attribute={Attribute} data={Attribute=='Fgs'?rivalFgs[1]:rivalBranch[1]}/></div>:null}
                    {rivalBranchLength === 2?<div><div className={styles.text_vs_bottom}>vs</div><BusinessSubItem Attribute={Attribute} data={Attribute=='Fgs'?rivalFgs[1]:rivalBranch[1]}/></div>:null}
                </div>
            </div>
        )
    }
}

module.exports = BusinessItem;