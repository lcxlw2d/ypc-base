import {connect} from 'react-redux';
import {setInvestProduct,setInvestOrder,INVEST_TYPE_SHORT} from '../../../../../store/actions';
import {getUserLevelDict} from '../../../actions/home/investadvice/investAdviceAction';
import {getRandomHotProducts} from '../../../actions/home/investadvice/BroductSearchAction';
import BroductSearchBar from './BroductSearchBar';
import BroductSearch from './BroductSearch';
import BroductList from './BroductList';
import styles from '../../css/home/investadvice/invest.css';

class ShortInvest extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            showSearch:false,
            placeholder:"",
            level:"",
            type:3
        }
    }

    componentDidMount(){
        this.props.getUserLevelDict(this, (data)=>{
            var level = data["3"],
                {type} = this.state;
            this.props.getRandomHotProducts({
                productType:type,
                investmentRiskTypes:level
            }, this, (placeholder)=>{
                this.setState({placeholder,level});
            })
        });
    }

    searchClick = ()=>{
        this.setState({showSearch:true});
    }

    closeSearch = ()=>{
        this.setState({showSearch:false});
    }

    refresh(){
        var {broductList} = this.refs;
        if(broductList) broductList.getWrappedInstance().getScroll().refresh();
    }

    productSelect = (item)=>{
        var {productCode, productName} = item;
        this.props.setInvestProduct(INVEST_TYPE_SHORT, productCode, productName);
        setTimeout(()=>{
            this.setState({showSearch:false});
        },100);
    }

    sortChange = (sortName, orderBy)=>{
        this.props.setInvestOrder(INVEST_TYPE_SHORT, sortName, orderBy);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ShortInvest render");

        var {shortProductCode,shortProductName,shortSortName,shortOrderBy} = this.props,
            {showSearch, level, type, placeholder} = this.state;

        return(
            <div>
                <BroductSearchBar onClick={this.searchClick} placeholder={placeholder} investmentRiskTypes={level} type={type} value={shortProductName}/>
                {shortProductCode?(
                    <BroductList onSortChange={this.sortChange} sortName={shortSortName} orderBy={shortOrderBy} productCode={shortProductCode} productName={shortProductName} index={2} ref="broductList"/>
                ):(
                    <div className={styles.emptyImg} onClick={this.searchClick}>
                        <img src="./images/work/home/investadvice/list_search.png"/>
                        <div className={styles.emptyText}>请选择一只产品</div>
                    </div>
                )}
                {showSearch?(<BroductSearch placeholder={placeholder} investmentRiskTypes={level} type={type} onSelect={this.productSelect} onClose={this.closeSearch}/>):null}
            </div>
        );
    }

}

function injectProps(state){
    var {investadvice} = state.base || {},
        {shortProductCode,shortProductName,shortSortName,shortOrderBy} = investadvice;
    return {shortProductCode, shortProductName,shortSortName,shortOrderBy};
}

function injectAction(){
    return {getUserLevelDict,setInvestProduct,getRandomHotProducts,setInvestOrder}
}

module.exports = connect(injectProps,injectAction(), null, {withRef:true})(ShortInvest);
