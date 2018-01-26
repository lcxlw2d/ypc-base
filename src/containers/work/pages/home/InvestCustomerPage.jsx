import {connect} from 'react-redux';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import InvestCarousel from '../../components/home/investadvice/InvestCarousel';
import AttentionList from '../../components/home/investadvice/AttentionList';
import RookieList from '../../components/home/investadvice/RookieList';
import CustomerFilterBar from '../../components/home/investadvice/CustomerFilterBar';

import styles from '../css/home/investCustomerPage.css';

const picList = [
    {
        url:"./images/work/home/investadvice/sm04.jpg",
        mainText:"他们需要您关注？",
        subText:"帮助他们享受理财乐趣,获取收益"
    },{
        url:"./images/work/home/investadvice/sm05.jpg",
        mainText:"他们是新手小白？",
        subText:"帮忙他们开启理财之路,赚取第一桶金"
    }
];

/** 首页-投顾精灵-客户 **/
class InvestCustomerPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index:+props.params.type,
            showFilter:false,
            filter:""
        }
    }

    //UI更新后，对列表刷新
    didUpdate = ()=>{
        var {rookieList, attentionlist} = this.refs;
        if(rookieList){
            rookieList.getWrappedInstance().getScroll().refresh();
        }
        if(attentionlist){
            attentionlist.getWrappedInstance().getScroll().refresh();
        }
    }

    //获取页面名称
    getPageName(){ return "首页_投顾精灵_客户"; }

    picChange = (index)=>{
        this.setState({index});
    }

    filterClick = ()=>{
        var {showFilter} = this.state;
        this.setState({showFilter:!showFilter});
    }

    renderIcon(){
        var {index} = this.state;
        if(index == 1)
            return [<HeaderIcon iconCls="filter" onClick={this.filterClick}/>];
        else
            return [];
    }

    closeFilter = ()=>{
        this.setState({showFilter:false});
    }

    filterSelect = (filter)=>{
        this.setState({showFilter:false,filter});
    }
    onBackClick=()=>{
            hashHistory.goBack();
    }


    render() {
        systemApi.log("InvestCustomerPage render");

        var {index,showFilter,filter} = this.state;

        return (
            <FullScreenView>
                {/*<AppHeader headerName="精准服务" backHash="/work/home/investadvice" iconRight={this.renderIcon()} />*/}
                <AppHeader headerName="精准服务" onBackClick={this.onBackClick}  iconRight={this.renderIcon()} />
                <Content iscroll={false}>
                    <InvestCarousel picList={picList} index={index} onChange={this.picChange}/>
                    <LazyLoad index={index} onDidUpdate={this.didUpdate}>
                        <AttentionList ref="attentionlist"/>
                        <RookieList tag={filter} ref="rookieList"/>
                    </LazyLoad>
                </Content>
                {showFilter?<CustomerFilterBar value={filter} onClose={this.closeFilter} onSelect={this.filterSelect}/>:null}
                {this.props.children}
            </FullScreenView>

        );
    }

}

module.exports = connect(null, null)(InvestCustomerPage);
