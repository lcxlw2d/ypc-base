import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Tip from '../../../../components/common/popup/Tip';
import SearchBar from '../../components/home/deadline//SearchBar';
import DeadlineTable from '../../components/home/deadline/DeadlineTable';

import styles from '../css/home/productDeadlinePage.css';

/** 首页-短期理财即将到期客户 **/
class ProductDeadlinePage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            value:"",
            search:"",
            productCode:[],
            showTip:false
        };
    }

    //获取页面名称
    getPageName(){ return "首页_短期理财即将到期客户"; }

    searchChange = (value)=>{
        this.setState({value});
    }

    //过滤条件改变
    filterChange = (productCode)=>{
        this.setState({productCode});
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

    //点击灯泡
    tipClick = ()=>{
        this.setState({showTip:true});
    }

    //关闭提示
    closeTip = ()=>{
        this.setState({showTip:false});
    }

    renderIcon(){
        return[
            <HeaderIcon iconCls="bulb" onClick={this.tipClick} />
        ]
    }

    render(){
        systemApi.log("ProductDeadlinePage render");

        var {search, value, productCode, showTip} = this.state;

        return (
            <FullScreenView>
                <AppHeader backHash="/work/home" headerName="短期理财即将到期客户" iconRight={this.renderIcon()} />
                <Content iscroll={false}>
                    <SearchBar placeholder="姓名/资金账号/身份证号" onChange={this.searchChange} onFilterChange={this.filterChange} onSearch={this.searchClick} onKeyUp={this.searchKeyUp} value={value} productCode={productCode}/>
                    <div className={styles.content}>
                        <DeadlineTable productCode={productCode} search={search}/>
                    </div>
                </Content>
                {showTip?(<Tip title="温馨提示" content="展示名下客户中，所持有的定期限短期理财产品一个月内即将到期的情况。" onClose={this.closeTip}/>):null}
            </FullScreenView>
        );
    }

}

module.exports = ProductDeadlinePage;
