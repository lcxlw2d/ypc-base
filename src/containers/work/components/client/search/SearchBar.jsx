
import styles from '../../css/client/search/searchBar.css';

class SearchBar extends PureComponent{

    static defaultProps = {
        placeholder:"",
        value:"",
        autoFocus:false,
        onClick:function(){},
        disabled:false
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    toSearch = ()=>{
        var {onSearch,value} = this.props;
        onSearch && onSearch(value);
    }

    searchClick = ()=>{
        var {onClick} = this.props;
        onClick && onClick();
    }

    inputFocus = ()=>{
        var {onFocus} = this.props;
        onFocus && onFocus();
    }

    inputChange = (e)=>{
        var {value} = e.target,
            {onChange} = this.props;
        onChange && onChange(value);
    }

    inputKeyUp = (e)=>{
        var {onKeyUp,value} = this.props,
            {keyCode} = e.nativeEvent;

        onKeyUp && onKeyUp(keyCode,value);
    }

    typeChange = (e)=>{
        var {value} = e.target,
            {onTypeChange} = this.props;

        onTypeChange && onTypeChange(value);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var {placeholder,value,autoFocus,disabled,typeVal, isPotential} = this.props;

        return(
            <div className={styles.searchbox02}>
            	<div className={styles.searchinnerbox} onClick={this.searchClick}>
                    <div className={styles.cus_type}>
                        <select className={styles.select} onChange={this.typeChange} value={typeVal}>
                            <option value="1">我的</option>
                            {!isPotential?<option value="2">全司</option>:null}
                        </select>
                    </div>
                	<input type="text" value={value} disabled={disabled} autoFocus={autoFocus} placeholder={placeholder} onChange={this.inputChange} onFocus={this.inputFocus} onKeyUp={this.inputKeyUp}/>
                    <input type="button" onClick={this.toSearch}/>
                </div>
            </div>
        );
    }


}

module.exports = SearchBar;
