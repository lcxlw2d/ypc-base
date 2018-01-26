import styles from '../../css/home/investadvice/Profile.css';
import  InterestItem  from './InterestItem';

class Interest extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    renderList() {
        var {recommend} = this.props;
       return recommend.map((item,index)=>{
            var {showType,productCode,productType,matchingDegree,productShortName,productShortName,secGrowthrate1,performanceBenchmarks ,lastYearYieldRate,latestNet,timeHorizon,unitnv,startingPoint,
}=item;
            if(showType==3){
                return(<InterestItem num={lastYearYieldRate} title="近一年涨幅" name={productShortName} num1={latestNet} num2={startingPoint} value="最新净值：" clos={matchingDegree}/>)
            }else if(showType==2){
                return(<InterestItem num={performanceBenchmarks} title="业绩基准" name={productShortName} num1={timeHorizon} num2={startingPoint} value="投资期限：" clos={matchingDegree}/>)
            }else{
              return(<InterestItem num={secGrowthrate1} title="7天年化收益率" name={productShortName} num1={unitnv} num2={startingPoint} value="万份收益：" clos={matchingDegree}/>)
            }

        })
    }

    render() {
        return (
            <div className={styles.cs_reason+" "+styles.investment}>
                <h3>
                    <span>TA可能感兴趣</span>
                </h3>
                <div className={styles.interestedbox}>
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

module.exports = Interest;