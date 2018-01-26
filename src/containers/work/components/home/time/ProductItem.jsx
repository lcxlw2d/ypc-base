import styles from '../../css/home/time/productItem.css';

class ProductItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        }
    }
    itemClick = (event)=>{
        var {onClick} = this.props;
        onClick && onClick(this.props.fundName,this.props.fundCode);
    }
    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ProductItem render");

        var {fundCode,fundName,purchageStatus,fundType,unitnv,yieldForOneYear,index} = this.props,
            {touch} = this.state,
            bgCls = this.mergeClassName(styles.sgj_single, index%2==1?styles.bg_f7:"",touch?styles.touch:"");

        return(
          <div className={bgCls} onClick={this.itemClick} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
            	<div className={styles.sgj_tit}>
                	<span className={styles.sgj_name}>{fundName}</span>
                    <span className={Color.c6}>[{fundCode}]</span>
                </div>
                <div className={styles.sgj_int}>
                    <div className={styles.int_layer}>
                        <div className={styles.sgj_w45}>
                        	<span className={Color.c6}>最新单位净值</span>
                            <span className={Color.red}>[{unitnv}]</span>
                        </div>
                        <div className={styles.sgj_w55}>
                        	<span className={Color.c6}>近一年收益率(%)</span>
                            <span className={Color.red}>[{yieldForOneYear}]</span>
                        </div>
                    </div>
                    <div className={styles.int_layer}>
                        <div className={styles.sgj_w45}>
                        	<span className={Color.c6}>产品类型</span>
                            <span>[{fundType}]</span>
                        </div>
                        <div className={styles.sgj_w55}>
                        	<span className={Color.c6}>申购赎回状态</span>
                            <span>[{purchageStatus}]</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = ProductItem;
