import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import SearchBar from '../../../../components/common/searchbar/SearchBar';
import MarginList from '../../components/home/margin/MarginList';

import styles from '../css/home/marginPage.css';

/** 首页-融资融券到期 **/
class MarginPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            value:"",
            search:""
        };
    }

    //获取页面名称
    getPageName(){ return "首页_两融开户目标客户"; }

    searchChange = (value)=>{
        this.setState({value});
    }

    searchClick = (search)=>{
        this.setState({search});
    }

    //点击键盘回车
    searchKeyUp = (code,value)=>{
        if(code == 13){
            this.searchClick(value);
        }
    }

    render(){
        systemApi.log("MarginPage render");

        var {search,index,value} = this.state;

        return (
            <FullScreenView>
                <AppHeader backHash="/work/home" headerName="两融开户目标客户"/>
                <Content iscroll={false}>
                    <SearchBar placeholder="姓名/资金账号/身份证号" onChange={this.searchChange} onSearch={this.searchClick} onKeyUp={this.searchKeyUp}  value={value}/>
                    <MarginList search={search}/>
                </Content>
            </FullScreenView>
        );
    }

}

module.exports = MarginPage;
