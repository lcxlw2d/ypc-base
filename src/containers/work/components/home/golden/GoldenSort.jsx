import TableTip from './TableTip';

import styles from '../../css/home/golden/goldSort.css';

class GoldenSort extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            tipIndex:"-1"
        };
        this.timeoutIndex = -1;
    }

    componentWillUnmount(){
        if(this.timeoutIndex != -1){
            clearTimeout(this.timeoutIndex);
        }
        super.componentWillUnmount();
    }

    //点击可排序字段
    orderClick = (newOrder)=>()=>{
        var {onChange,orderName,asc} = this.props;
        if(orderName == newOrder){
            asc = !asc;
        }
        else{
            orderName = newOrder;
            asc = true;
        }
        onChange && onChange(orderName, asc);
    }

    //点击tip
    tipClick = (index)=>(e)=>{
        clearTimeout(this.timeoutIndex);
        this.setState({tipIndex:index});
        this.timeoutIndex = setTimeout(()=>{
            this.setState({tipIndex:-1});
        },4000);
        e.stopProgation();
    }

    render(){

        //打印渲染日志，必写
        systemApi.log("GoldenSort render");

        var {tipIndex} = this.state,
            {asc,orderName} = this.props,
            sortCls = asc?styles.up:styles.down;

        return (
            <div className={styles.sort}>
                <span className={styles.sorttit}>排序</span>
                <div className={styles.sorttab}>
                    <i className={styles.icon_tip01} onClick={this.tipClick(1)}></i>
                    <span onClick={this.orderClick("OUT_TOTAL_ASSET")}>体外市值</span>
                    <i className={this.mergeClassName(styles.icon_sort,orderName=="OUT_TOTAL_ASSET"?sortCls:"")}></i>
                    {tipIndex=="1"?(<TableTip onClick={this.tipClick} text="信息技术中心根据大数据预算出的客户体外A股市值，与实际情况或许存在一定误差，仅供参考。" left="15%"/>):null}
                </div>
                <div className={styles.sorttab}>
                    <i className={styles.icon_tip01} onClick={this.tipClick(2)}></i>
                    <span onClick={this.orderClick("max_total_asset")}>资本预测</span>
                    <i className={this.mergeClassName(styles.icon_sort,orderName=="max_total_asset"?sortCls:"")}></i>
                    {tipIndex=="2"?(<TableTip onClick={this.tipClick} text="信息技术中心根据大数据预算出的客户资本实力，与实际情况或许存在一定误差，仅供参考。" left="50%"/>):null}
                </div>
                <div className={styles.sorttab}>
                    <i className={styles.icon_tip01} onClick={this.tipClick(3)}></i>
                    <span onClick={this.orderClick("ASSET_MULTIPLE")}>服务深度</span>
                    <i className={this.mergeClassName(styles.icon_sort,orderName=="ASSET_MULTIPLE"?sortCls:"")}></i>
                    {tipIndex=="3"?(<TableTip onClick={this.tipClick} text="资产服务深度 体内A股市值/（体内A股市值+体外A股市值）*100%，小数点四舍五入取两位小数点。" left="75%"/>):null}
                </div>
            </div>
        );
    }

}

module.exports = GoldenSort;
