import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import SearchBar from '../../../../components/common/searchbar/SearchBar';
import GoldenSort from '../../components/home/golden/GoldenSort';
import GoldenList from '../../components/home/golden/GoldenList';

import styles from '../css/home/goldenPage.css';

/** 首页-金钱豹 **/
class GoldenPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            value:"",
            search:"",
            orderName:"",
            asc:false
        };
    }

    //获取页面名称
    getPageName(){ return "首页_金钱豹"; }

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

    //排序
    sortChange = (orderName, asc)=>{
        this.setState({orderName,asc});
    }

    render(){
        systemApi.log("GoldenPage render");

        var {search,index,value,orderName,asc} = this.state;

        return (
            <FullScreenView>
                <AppHeader backHash="/work/home" headerName="金钱豹追踪器"/>
                <Content iscroll={false}>
                    <SearchBar placeholder="姓名/资金账号/身份证号" onChange={this.searchChange} onSearch={this.searchClick} onKeyUp={this.searchKeyUp} value={value}/>
                    <div className={styles.content}>
                        <GoldenSort onChange={this.sortChange} orderName={orderName} asc={asc} />
                        <GoldenList search={search} orderName={orderName} asc={asc}/>
                    </div>
                </Content>
            </FullScreenView>
        );
    }

}

module.exports = GoldenPage;
