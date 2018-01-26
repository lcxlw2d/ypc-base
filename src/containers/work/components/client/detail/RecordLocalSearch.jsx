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

        var {isAndroid} = systemApi,
            {value,searchType,onClose} = this.props;
            //  isAndroid = true;

        return (
            <div className={styles.header}>
                <div className={styles.header_innerbox}>
                    <div className={styles.record_search}>
                        <div className={styles.record_choose}>
                            <div className={styles.record_innerbox}>
                                <div className={this.mergeClassName(styles.record_cs, styles.local)}>
                                    <select className={styles.select} value={searchType} onChange={this.typeChange}>
                                        {isAndroid?(<option value="">本地未匹配</option>):null}
                                        <option value="0">云端未匹配</option>
                                        <option value="1">云端已匹配</option>
                                    </select>
                                </div>
                                <div className={this.mergeClassName(styles.record_text, styles.local)}>
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
