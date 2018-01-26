import {addRecentClientSearch, getRecentClientSearch, setRecentClientSearch} from '../../../../../store/actions';
import styles from '../../css/client/search/searchHistory.css';

class SearchHistory extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
          data: getRecentClientSearch()
        }
    }

    //点击搜索按钮
    clearSearchClick(event){
        var templist = [];
        setRecentClientSearch(templist);
        this.setState({data:templist});
        event.stopPropagation();
    }

    cancelClick(){
        var {onCancelClick} = this.props;
        onCancelClick && onCancelClick();
    }

    historyClick(arg1,e){
        var {onHistoryClick} = this.props;
        onHistoryClick && onHistoryClick(arg1.item);
        this.rememberKeyWord(arg1.item);
    }

    rememberKeyWord(value){
        addRecentClientSearch(value);
        this.setState({data:getRecentClientSearch()})
    }


    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ClientSearchHistory render");

        var children = [],
            {data} = this.state;

        React.Children.forEach(data,(item,index)=>{
            children.push(<a key={item} onClick={this.historyClick.bind(this,{item})}> {item}</a>);
        });

        if(data.length==0)
            children.push(<p className={styles.norecord}>暂无历史查询记录！</p>);

        return(
              <div className={styles.hiscontainer} onClick={this.cancelClick.bind(this)}>
                <div className={styles.searchhis}>
                  <span>搜索历史</span>
                  <a className={styles.clearhis} onClick={this.clearSearchClick.bind(this)}>清空</a>
                </div>

                  <div className={styles.hislist}>
                  	{children}
                  </div>
              </div>
        );
    }
}

module.exports = SearchHistory;
