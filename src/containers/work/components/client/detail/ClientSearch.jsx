import {addRecentClientSearch, getRecentClientSearch} from '../../../../../store/actions';
import styles from '../../css/client/detail/cilentSearch.css';

class ClientSearch extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            showHistory:true,
            type:1
        }
    }

    onValueChange = (e)=>{
        var {onValueChange} = this.props,
            {value} = e.target;
        onValueChange && onValueChange(value);
    }

    typeChange = (e)=>{
        var {value} = e.target;
        this.setState({type:value});
    }

    searchClick = ()=>{
        var {onSearch,value} = this.props,
            {type} = this.state;
        addRecentClientSearch(value);
        this.setState({showHistory:false});
        onSearch && onSearch(type,value);
    }

    inputClick = ()=>{
        this.setState({showHistory:true});
    }

    historyClick = (value)=>()=>{
        var {onSearch} = this.props,
            {type} = this.state;
        addRecentClientSearch(value);
        onSearch && onSearch(type, value);
        this.setState({showHistory:false});
    }

    renderHistory(){
        return getRecentClientSearch().map((item)=>{
            return <a key={item} onClick={this.historyClick(item)}>{item}</a>;
        });
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ClientSearch render");

        var {value,searchType, clientType} = this.props,
            {showHistory} = this.state;
        return (
            <div className={styles.searchbox02}>
            	<div className={styles.searchinnerbox}>
                    <div className={styles.cus_type}>
                        <select className={styles.select} onChange={this.typeChange} value={searchType}>
                            <option value="1">我的</option>
                            {clientType == 1?<option value="2">全司</option>:null}
                        </select>
                    </div>
                	<input type="text" value={value} placeholder="姓名/资金账号/身份证号" onChange={this.onValueChange} onClick={this.inputClick}/>
                    <input type="button" onClick={this.searchClick}/>
                </div>
                {showHistory?(
                    <div className={styles.hiscontainer}>
                        <div className={styles.searchhis}>
                            <span>搜索历史</span>
                        </div>
                        <div className={styles.hislist}>{this.renderHistory()}</div>
                    </div>
                ):null}
            </div>
        );
    }

}

module.exports = ClientSearch;
