import styles from "./css/compared.css";
class Compared extends PureComponent{
    static defaultProps = {
        index:0
    };

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    renderBar = income => {

        let width = Math.abs(income);

        if(income < 0){

            return [<div className={styles.probg}>
                        <div className={styles.show_left}>
                            <div className={styles.numbox}>
                                <div className={styles.pronum} style={{width:`${width*0.75}%`}}></div>
                                <div className={styles.arrowright}></div>
                            </div>
                        </div>
                        <div className={styles.show_right}> </div>
                    </div>]
        }else{

            return [<div className={styles.probg}>
                        <div className={styles.show_left}>
                        </div>
                        <div className={styles.show_right}>
                            <div className={styles.numbox}>
                                <div className={styles.pronum} style={{width:`${width*0.75}%`}}></div>
                                <div className={styles.arrowright}></div>
                            </div>
                        </div>
                    </div>]
        }

    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Compared render");

        let {tabValue='--', tabValue2='--', myIncome='-', otherIncome='-'} = this.props, income='--';
        income = Number.isNaN(myIncome - otherIncome)?'--':myIncome - otherIncome;
        return(
            <div className={styles.cldiv03}>
                <div className={styles.clinner_tit}>
                    <h3>{tabValue}跑赢<span>{tabValue2}</span></h3>
                    <div className={this.mergeClassName(styles.clrt_num, income<0?styles.green:'')}> {income}%</div>
                </div>
                <div className={styles.competition}>
                    <ul>
                        <li>
                            <div className={styles.cp_label}>我的收益</div>
                            <div className={styles.cp_show}>
                                {this.renderBar(myIncome)}
                            </div>
                            <div className={this.mergeClassName(styles.cp_num, myIncome<0?styles.green:'')}>{myIncome}%</div>
                        </li>
                        <li>
                            <div className={styles.cp_label}>{tabValue2}</div>
                            <div className={styles.cp_show}>
                                {this.renderBar(otherIncome)}
                            </div>
                            <div className={this.mergeClassName(styles.cp_num, otherIncome<0?styles.green:'')}>{otherIncome}%</div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }


}

module.exports = Compared;
