import {connect} from 'react-redux';
import AppHeader from '../../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import styles from '../../css/home/investadvice/BroductSearch.css';
import BroductSearchStart from './BroductSearchStart';
import BroductSearchList from './BrouductSearchList';
import{getHotProducts} from '../../../actions/home/investadvice/BroductSearchAction';

class BroductSearch extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            hot: [],
            data: [],
            dataH:JSON.parse(systemApi.getValue("SEARCH_HISTORY_"+this.props.type))||[],
            searchStart:false,
            searchend:false,
            value:"",
            total:0
        }
    }

    //生命周期函数
    componentDidMount() {
         this.upHotData();
    }

    //缓存value
    rememberKeyWord(value){

        if(value == undefined || value==null || value.length==0) return;

        var templist = JSON.parse(systemApi.getValue("SEARCH_HISTORY_"+this.props.type));
        if(!templist) templist = new Array();

        var index = templist.indexOf(value);
        if (index > -1) {
            templist.splice(index, 1);
        }

        if(templist.length>=10){
            templist.pop();
        }

        templist.splice(0,0,value);
        systemApi.setValue("SEARCH_HISTORY_"+this.props.type,JSON.stringify(templist));
    }

    searchClick = ()=>{
        var {BSinput} = this.refs,
            value = BSinput.value;
        this.onSearchList(value);
    }

    //搜索开始
    onSearchList =(item)=>{
        this.rememberKeyWord(item);
        this.setState({
            dataH:JSON.parse(systemApi.getValue("SEARCH_HISTORY_"+this.props.type)),
            searchStart: true,
            searchend: true,
            value:item
        });
    }

    //回车开始
    searchKeyUp=(e)=>{
        if(e.keyCode == 13) this.searchClick();
    }

    //返回起始搜索页
    onSearchStart =()=>{
        this.setState({searchStart: false,searchend: false,value:""});
    }

    onClerSearch =()=>{
        var {searchend} = this.state;
        if(!searchend) return;
        this.setState({searchStart: false,searchend: false});
    }

    //删除历史缓存
    onRemove = ()=> {
         this.setState({dataH:JSON.parse(systemApi.getValue("SEARCH_HISTORY_"+this.props.type))});
    }

    //返回按钮
    onBackClick = ()=> {
        this.props.onClose();
    }

    //热门商品
    upHotData(){
         var params = {
                productType:this.props.type,
                investmentRiskTypes:this.props.investmentRiskTypes,
            }
            this.props.getHotProducts(params, this, this.upHot)
    }

    //热门商品
    upHot = (hot)=> {
        this.setState({hot});
    }

    //搜索
    upData=(data)=>{
         this.setState({data});
    }

    onChange = (e)=> {
        this.setState({value: e.target.value});
    }

    //回调
    onHotSelect=(item)=>{
        this.props.onSelect(item);
    }

    //打印输入框
    renderIpt(){
        var {placeholder} = this.props,
            {searchend, value} = this.state;
        return(
            <div className={styles.header_search}>
                <div className={styles.hd_innerbox}>
                    <div className={styles.hd_search_text}><input ref="BSinput" value={value} onKeyUp={this.searchKeyUp} onFocus={this.onClerSearch} onChange={this.onChange}  type="text" placeholder={placeholder}/></div>
                    {searchend?<input type="button" className={styles.btn_delete} onClick={this.onSearchStart}/>:<input type="button" onClick={this.searchClick}/>}
                </div>
          </div>
        )
    }

    searchTotal = (total)=>{
        this.setState({total});
    }

    //打印列表
    renderList(){
        var {value,total} = this.state,
            {investmentRiskTypes, type} = this.props;
        return(
            <div className={styles.floor}>
                <div className={styles.mot_search_list}>
                    <h3>
                        <span>搜索结果</span>
                        <span className={styles.blue}>({total})</span>
                    </h3>
                    <BroductSearchList onSelects={this.onHotSelect} setTotal={this.searchTotal} investmentRiskTypes={investmentRiskTypes} type={type} search={value}/>
                </div>
            </div>
        )
    }

    render() {
        var {searchStart, hot, data, dataH, searchend} = this.state,
            {type} = this.props;
        return (
            <FullScreenView>
                <AppHeader headerName={this.renderIpt()} onBackClick={this.onBackClick}/>
                <div className={styles.pst}>
                    {searchStart
                        ? this.renderList(data)
                        : <BroductSearchStart onHotSelect={this.onHotSelect} onRemove={this.onRemove}  hot={hot} dataH={dataH} index={type}  onSearchList={this.onSearchList}/>}
                </div>
            </FullScreenView>

        )
    }
}

function injectAction() {
    return {getHotProducts};
}

function injectProps(state) {
    return {};
}

module.exports = connect(null, injectAction())(BroductSearch);
