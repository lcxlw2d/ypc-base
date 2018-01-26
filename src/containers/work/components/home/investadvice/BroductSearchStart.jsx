import styles from '../../css/home/investadvice/BroductSearch.css';

class BroductSearchStart extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    renderHot=()=>{
        var {hot} = this.props;
        return (hot || []).map((item)=>{
            var {productShortName,productName} = item;
            return <a onClick={this.onHot(item)}>{productShortName || productName}</a>;
        })
    }

    onHot=(item)=>()=>{
        this.props.onHotSelect(item);
    }

    renderHistory=()=> {
        var {dataH} = this.props;
        return (dataH || []).map((item)=>{
            return <a onClick={this.onSeartch(item)}>{item}</a>;
        });
    }

    onSeartch=(item)=>()=>{
        this.props.onSearchList(item);
    }

    //删除搜索历史缓存
    removeSh=()=>{
        systemApi.removeValue("SEARCH_HISTORY_"+this.props.index);
        this.props.onRemove();
    }

    render() {

        return (
                <div className={styles.floor}>
                    <div className={styles.mot_search}>
                        <h3>
                            <span>历史搜索</span>
                            <a className={styles.btn_mot_delete} onClick={this.removeSh}></a>
                        </h3>
                        <div className={styles.mot_product}>
                            {this.renderHistory()}
                        </div>
                        <div className={styles.line}></div>
                        <h3>
                            <span>热销产品</span>
                        </h3>
                        <div className={styles.mot_product}>
                            {this.renderHot()}
                        </div>
                    </div>
                </div>
        )
    }
}

module.exports = BroductSearchStart;
