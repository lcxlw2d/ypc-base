import styles from '../../css/client/detail/recordSearch.css';

class RecordSearch extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    onValueChange = (e)=>{
        var {onValueChange} = this.props,
            {value} = e.target;

        onValueChange && onValueChange(value);
    }

    typeChange = (e)=>{
        var {onTypeChange} = this.props,
            {value} = e.target;

        onTypeChange && onTypeChange(value);
    }

    searchClick = ()=>{
        var {onSearch,value} = this.props;
        onSearch && onSearch(value);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("RecordSearch render");

        var {value,searchType,onClose} = this.props;

        return (
            <div className={styles.header}>
                <div className={styles.header_innerbox}>
                    <div className={styles.record_search}>
                        <div className={styles.record_choose}>
                            <div className={styles.record_innerbox}>
                                <div className={styles.record_cs}>
                                    <select className={styles.select} value={searchType} onChange={this.typeChange}>
                                        <option value="0">未匹配</option>
                                        <option value="">全部</option>
                                    </select>
                                </div>
                                <div className={styles.record_text}>
                                    <input type="text" value={value} onChange={this.onValueChange} placeholder="请输入客户号码"/>
                                    <span className={styles.search} onClick={this.searchClick}></span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.record_cancel} onClick={onClose}><a>取消</a></div>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = RecordSearch;
