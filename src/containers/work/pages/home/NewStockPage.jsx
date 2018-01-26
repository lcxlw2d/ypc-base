import {connect} from 'react-redux';
import {getNewStockList} from '../../actions/home/newstock/newstockAction';
import {setUndoType} from '../../../../store/actions';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Category from '../../../../components/common/category/Category';
import TextButton from '../../../../components/common/category/TextButton';
import AvailableList from '../../components/home/newstock/AvailableList';
import PublicList from '../../components/home/newstock/PublicList';
import DistribList from '../../components/home/newstock/DistribList';
import WillApplyList from '../../components/home/newstock/WillApplyList';

import styles from '../css/home/newStockPage.css';

/** 首页-新股日历 **/
class NewStockPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            lotsToday:[],           //今日公布中签
            distributionToday:[],   //今日公布配号
            availableToday:[],      //今日可申购
            futurePurchase:[]       //即将申购
        }
    }

    componentDidMount(){
        this.props.getNewStockList(this, this.updateList);
        super.componentDidMount();
    }

    //获取页面名称
    getPageName(){ return "首页_新股日历"; }

    //更新数据
    updateList = (data)=>{
        this.setState(data);
    }

    tipClick = ()=>{
        this.props.setUndoType("50053",true);
        hashHistory.push('/work/todo');
    }

    renderIcon = ()=>{
        return [
            <TextButton text="中签缴费提醒" onClick={this.tipClick}/>
        ];
    }

    render(){
        systemApi.log("NewStockPage render");

        var {lotsToday,distributionToday,availableToday,futurePurchase} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="新股日历"/>
                <Content>
                    <Category title="今日可申购" iconLeft="parallel" theme="blue">
                        <AvailableList data={availableToday}/>
                    </Category>
                    <div className="blank"></div>
                    <Category title="今日公布中签" iconElement={this.renderIcon()} iconLeft="parallel" theme="red">
                        <PublicList data={lotsToday}/>
                    </Category>
                    <div className="blank"></div>
                    <Category title="今日公布配号" iconLeft="parallel" theme="purple">
                        <DistribList data={distributionToday}/>
                    </Category>
                    <div className="blank"></div>
                    <Category title="即将申购" iconLeft="parallel" theme="orange">
                        <WillApplyList data={futurePurchase}/>
                    </Category>
                </Content>
            </FullScreenView>
        );
    }

}

function injectAction(){
    return {getNewStockList,setUndoType};
}

module.exports = connect(null,injectAction())(NewStockPage);
