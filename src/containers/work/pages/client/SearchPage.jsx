import {connect} from 'react-redux';
import {setClientSearchBack,FROM_CLIENT_PAGE,FROM_HOME_PAGE} from '../../../../store/actions';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import SearchBar from '../../components/client/search/SearchBar';
import SearchHistory from '../../components/client/search/SearchHistory';
import ClientList from '../../components/client/search/ClientList';
import PotentialList from '../../components/client/potential/PotentialList';

import style from './css/searchPage.css';

/** 客户-搜索页面 **/
class SearchPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        var {search, type} = this.props.params, index = Cache.getValue("client_tab_type") || 0;
        this.state={
            isSearchShow:search?false:true,
            isListShow:search?true:false,
            searchVal:search || "",
            searchKeyWord:search || "",
            isPotential: index==2?true:false,
            autoFocus:search?false:true,
            typeVal: type || "1",
            type:type || "1"
        }
    }

    //获取页面名称
    getPageName(){ return "客户搜索"; }

    //搜索点击查询
    searchClick = (value)=>{
        if(!value) return;
        var {typeVal} = this.state,
            {history} = this.refs;
        this.setState({
            isSearchShow:false,
            searchKeyWord:value,
            isListShow:true,
            type:typeVal
        });
        history && history.rememberKeyWord(value);
    }

    searchChange = (value)=>{
        this.setState({searchVal:value});
    }

    typeChange = (value)=>{
        this.setState({typeVal:value});
    }

    searchFieldClick = ()=>{
        this.setState({isSearchShow:true});
    }

    historyClick = (value)=>{
        var {typeVal} = this.state;
        this.setState({
            isSearchShow:false,
            searchVal:value,
            searchKeyWord:value,
            isListShow:true,
            type:typeVal
        });
    }

    cancelHistoryClick = ()=>{
        this.setState({isSearchShow:false});
    }

    //点击键盘回车
    searchKeyUp = (code,value)=>{
        if(code == 13){
            this.searchClick(value);
        }
    }

    //点击返回按钮
    onBackClick = ()=>{
        var {searchBack} = this.props;
        if(searchBack == FROM_CLIENT_PAGE){
            hashHistory.push("/work/client")
        }
        else{
            hashHistory.push("/work/home");
        }
    }

    render(){
        systemApi.log("SearchPage render");
        var {isSearchShow,searchVal,searchKeyWord,isPotential,isListShow,autoFocus,typeVal,type} =this.state;
        isPotential?isListShow=false:null;
        return (
            <FullScreenView>
                <AppHeader onBackClick={this.onBackClick} headerName="搜索客户"/>
                <Content iscroll={false}>
                    {isPotential?<PotentialList ref="PotentialList" type='search' keyWord={searchKeyWord}/>:null}
                    {isListShow?(<ClientList ref="clientList" keyWord={searchKeyWord} type={type}/>):null}
                    <SearchBar ref="searchbar" isPotential={isPotential} value={searchVal} typeVal={typeVal} autoFocus={autoFocus} onTypeChange={this.typeChange} onKeyUp={this.searchKeyUp} onChange={this.searchChange} onSearch={this.searchClick} onFocus={this.searchFieldClick} placeholder="姓名/资金账号/身份证号"/>
                    {isSearchShow?<SearchHistory ref="history" onHistoryClick = {this.historyClick} onCancelClick={this.cancelHistoryClick}/>:null}
                </Content>
            </FullScreenView>

        );
    }

}

function injectProps(state){
    var {client} = state.base,
        {searchBack} = client;
    return {searchBack};
}

module.exports = connect(injectProps,null)(SearchPage);
