
import styles from '../css/home/searchBar.css';

class SearchBar extends PureComponent{

    static defaultProps = {
        theme:"white",
        placeholder:"",
        value:""
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    toSearch = ()=>{
        var {onSearch,value} = this.props;

        if(onSearch){
            onSearch(value);
        }
    }

    searchClick = ()=>{
        var {onClick} = this.props;
        if(onClick){
            onClick();
        }
    }

    inputChange = (e)=>{
        var {value} = e.target,
            {onChange} = this.props;
        if(onChange){
            onChange(value);
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var {placeholder,value,theme} = this.props;

        return(
        	<div className={this.mergeClassName(styles.searchinnerbox,styles[theme])} onClick={this.searchClick}>
            	<input type="text" value={value} disabled placeholder={placeholder} onChange={this.inputChange}/>
                <input type="button" onClick={this.toSearch}/>
            </div>
        );
    }


}

module.exports = SearchBar;
