import FilterBar from './FilterBar';


import styles from '../../css/home/deadline/searchBar.css';

class SearchBar extends PureComponent{

    static defaultProps = {
        placeholder:"",
        value:""
    };

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            showFilter:false,
            filterType:1,
            tmpSelected:[]
        }
    }

    toSearch = ()=>{
        var {onSearch,value} = this.props;
        onSearch && onSearch(value);
    }

    searchClick = ()=>{
        var {onClick} = this.props;
        onClick && onClick();
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

    //点击过滤条件
    filterClick = ()=>{
        var {productCode} = this.props,
            {showFilter} = this.state,
            nextState = !showFilter;
        if(!nextState){
            this.setState({tmpSelected:productCode,showFilter:nextState});
        }
        else{
            this.setState({showFilter:nextState});
        }
    }

    //过滤条件改变
    filterChange = (filterType, tmpSelected)=>{
        this.setState({filterType, tmpSelected});
    }

    //过滤
    filterSelect = (tmpSelected)=>{
        this.setState({tmpSelected});
    }

    //过滤条件提交
    filterSubmit = (selected)=>{
        var {onFilterChange} = this.props;
        this.setState({
            tmpSelected:selected,
            showFilter:false,
            hasFilter:!!selected
        });
        onFilterChange && onFilterChange(selected);
    }

    closeFilter = ()=>{
        this.setState({showFilter:false});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SearchBar render");

        var {placeholder,value} = this.props,
            {showFilter, filterType, tmpSelected, hasFilter} = this.state;

        return(
            <div className={styles.searchbox02}>
                <div className={styles.product_choose}><a className={this.mergeClassName(styles.filterBtn, hasFilter?styles.on:"")} onClick={this.filterClick}></a></div>
            	<div className={styles.searchinnerbox} onClick={this.searchClick}>
                	<input type="text" value={value} placeholder={placeholder} onChange={this.inputChange} onKeyUp={this.inputKeyUp}/>
                    <input type="button" onClick={this.toSearch}/>
                </div>
                <FilterBar show={showFilter} onChange={this.filterChange} onSelect={this.filterSelect} onSubmit={this.filterSubmit} filterType={filterType} tmpSelected={tmpSelected} onClose={this.closeFilter} />
            </div>
        );
    }


}

module.exports = SearchBar;
