import {connect} from 'react-redux';
import {setClientSearchBack, FROM_CLIENT_PAGE} from '../../../../store/actions';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import SearchBar from '../../../../components/common/searchbar/SearchBar';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import Intro from '../../../../components/common/popup/Intro';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import LatelyList from '../../components/client/LatelyList';
import Filter from '../../components/client/Filter';
import AttentionList from '../../components/client/AttentionList';
import PotentialList from '../../components/client/potential/PotentialList';


import styles from './css/clientPage.css';

/** 客户首页 **/
class ClientPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        var index = Cache.getValue("client_tab_type") || 0;
        this.state = {
            showFilter:false,
            index:index,
            introFlag:true
        }
        this.introList = ["./images/work/home/client_intro01.jpg"];
    }

    //获取页面名称
    getPageName(){ return "客户列表"; }

    //UI更新后，对列表刷新
    componentDidUpdate(){
        var {latelyList, attentionlist} = this.refs;

        if(latelyList){
            latelyList.getWrappedInstance().getScroll().refresh();
        }
        if(attentionlist){
            attentionlist.getWrappedInstance().getScroll().refresh();
        }

    }

    componentWillMount(){
        var introFlag = systemApi.getValue("FLAG_HOME_INTRO_V1.1.2_client");
        this.setState({introFlag:!introFlag});
        super.componentWillUnmount();
    }

    //切换tab
    tabChange = (index)=>{
        Cache.setValue("client_tab_type",index);
        this.setState({index});
    }

    //跳转到搜索页面
    toSearch = ()=>{
        this.props.setClientSearchBack(FROM_CLIENT_PAGE);
        hashHistory.push("/work/client/search");
    }

    //筛选弹窗
    filterFunc = ()=>{
        this.setState({
            showFilter:!this.state.showFilter
        });
    }

    //
    goToAdd = () => {
        hashHistory.push('/work/client/addPotential')
    }

     //关闭引导
     closeIntro = ()=>{
        systemApi.setValue("FLAG_HOME_INTRO_V1.1.2_client","1");
        this.setState({introFlag:false});
    }

    //渲染图标
    renderIcons() {
        var {index} = this.state;
        if(index == 1){
            return [<HeaderIcon iconCls="filter" onClick={this.filterFunc}/>]
        }else if(index == 2){
            return [<HeaderIcon iconCls="add_cus" onClick={this.goToAdd}/>]
        }
        else{
            return [];
        }

    }

    render(){
        systemApi.log("ClientPage render");

        var {index, showFilter, introFlag} = this.state;
        //{isVailedFilter,isStarFilter} =;

        return (
            <div>
                <AppHeader showBack={false} iconRight={this.renderIcons()} headerName="客户"/>
                <Content withBottom={false} iscroll={false}>
                    <SearchBar onClick={this.toSearch} disabled={true} placeholder="姓名/资金账号/身份证号"/>
                    <SubTabs index={index} onTabChange={this.tabChange}>
                        <UlineTab text="最近浏览客户"/>
                        <UlineTab text="我的客户"/>
                        <UlineTab text="潜在客户"/>
                    </SubTabs>
                    <div className="blank"></div>
                    <LazyLoad index={index}>
                        <LatelyList ref="latelyList"/>
                        <AttentionList ref="attentionlist"/>
                        <PotentialList ref = 'potentialList'/>
                    </LazyLoad>
                </Content>
                {introFlag?(<Intro introList={this.introList} onClose={this.closeIntro}/>):null}
                {showFilter?<Filter onClose={this.filterFunc}/>:null}
                {this.props.children}
            </div>

        );
    }

}

function injectAction(){
    return {setClientSearchBack}
}

module.exports = connect(null, injectAction())(ClientPage);
