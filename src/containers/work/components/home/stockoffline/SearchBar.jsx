import styles from '../../css/home/stockoffline/searchBar.css';

class SearchBar extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            value:""
        }
    }

    //查询点击
    searchClick = ()=>{
        var {onSearch} = this.props,
            {value} = this.state;
        onSearch && onSearch(value);
    }

    //输入框改变
    inputChange = (e)=>{
        var {value} = e.target;
        this.setState({value});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var {value} = this.state;

        return(
            <div className={styles.date_search}>
                <div className={styles.date_sc_box}>
                    <div className={styles.date_sc_code}>
                        <div className={styles.date_code_text}>
                            <input type="text" placeholder="股票代码" value={value} onChange={this.inputChange} />
                        </div>
                        <div className={styles.date_code_btn} onClick={this.searchClick}>查询</div>
                    </div>
                </div>
             </div>
        );
    }


}

module.exports = SearchBar;
