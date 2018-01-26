import {connect} from 'react-redux';
import {call} from '../../actions/client/summary/summaryAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import TradeDealList from '../../components/client/detail/TradeDealList';
import TradeTransferList from '../../components/client/detail/TradeTransferList';
import TradeAgencyStockList from '../../components/client/detail/TradeAgencyStockList';
import TradeAgencyFundList from '../../components/client/detail/TradeAgencyFundList';
import TradeAgencyMarginList from '../../components/client/detail/TradeAgencyMarginList';
import TradeDealMarginList from '../../components/client/detail/TradeDealMarginList';
import TradeCreditList from '../../components/client/detail/TradeCreditList';
import TradeTransferMarginList from '../../components/client/detail/TradeTransferMarginList';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import Category from '../../../../components/common/category/Category';
import TextTab from '../../../../components/common/category/TextTab';

import styles from './css/transactionPage.css';

/** 客户-全景图-交易 **/
class TransactionPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0
        }
    }

    //获取页面名称
    getPageName(){ return "客户全景图_交易"; }

    //UI更新后，对列表刷新
    componentDidUpdate(){
        var {stocklist, fundlist, deallist, transferlist, agencymarginlist, dealmarginlist, transfermarginlist, creditlist} = this.refs;

        if(stocklist){
            stocklist.getWrappedInstance().getScroll().refresh();
        }
        if(fundlist){
            fundlist.getWrappedInstance().getScroll().refresh();
        }
        if(deallist){
            deallist.getWrappedInstance().getScroll().refresh();
        }
        if(transferlist){
            transferlist.getWrappedInstance().getScroll().refresh();
        }
        if(agencymarginlist){
            agencymarginlist.getWrappedInstance().getScroll().refresh();
        }
        if(dealmarginlist){
            dealmarginlist.getWrappedInstance().getScroll().refresh();
        }
        if(transfermarginlist){
            transfermarginlist.getWrappedInstance().getScroll().refresh();
        }
        if(creditlist){
            creditlist.getWrappedInstance().getScroll().refresh();
        }
    }

    //切换tab
    tabChange = (index) => {
        this.setState({index});
    }

    //拨打电话
    callFunc = ()=>{
        var {mobileTel,clientName,clientId} = this.props,systemType = systemApi.getValue("systemType");
        this.props.call(mobileTel,systemType,clientName,clientId,this.succ);
    }

    succ = (blen)=>{
        let {mobileTel, clientName, clientId, fundAccount} = this.props, params={};
        params = {mobileTel, clientName, clientId, fundAccount};
        params = JSON.stringify(params);
        if(blen){
            systemApi.setValue("quanjingtu_recordpage", params);
            systemApi.setValue("recordpage", 1);
            hashHistory.push("/work/client/record/0")
        }
    }

    //Category切换tab
    cateTabChange = ()=>{
        var {stocklist, fundlist} = this.refs;

        if(stocklist){
            stocklist.getWrappedInstance().getScroll().refresh();
        }
        if(fundlist){
            fundlist.getWrappedInstance().getScroll().refresh();
        }
    }

    //渲染图标
    renderIcons() {
        return [
            <HeaderIcon iconCls="phone" onClick={this.callFunc}/>
        ];
    }

    //渲染委托tabs
    renderIcon() {
        var {entrustPermit} = this.props;
        if(entrustPermit == "1"){
            return [ < TextTab text = "股票" />, < TextTab text = "产品" /> ];
        }
        else {
            return [];
        }
    }

    //暂无权限
    renderNoRight(){
        return (
            <div className={styles.opening}>
                <div className={styles.noAccess}></div>
                <p className={this.mergeClassName(styles.font18, Font.font18)}>哎呦喂！</p>
                <p className={styles.c6}>您暂无权限查看</p>
            </div>
        )
    }

    render() {
        systemApi.log("TransactionPage render");

        var {clientName, entrustPermit, dealPermit, moneypipePermit, detailMode} = this.props,
            {index, search, value} = this.state,
            titleName = clientName + (detailMode=="0"?"(普通)":"(信用)");
        return (
            <div>
                <AppHeader headerName={titleName} theme="red" iconRight={this.renderIcons()} onBackClick={this.props.onBackClick}/>
                <Content withBottom={false} iscroll={false}>
                    <SubTabs index={index} onTabChange={this.tabChange} theme="red">
                        <UlineTab text="委托"/>
                        <UlineTab text="成交"/>
                        {detailMode=="1"?(
                            <UlineTab text="信用划转"/>
                        ):null}
                        <UlineTab text="银证转账"/>
                    </SubTabs>
                    <div className="blank"></div>
                    <LazyLoad index={index}>
                        {detailMode=="0"?([
                            <Category title="当日委托" borderColor="none" iconElement={this.renderIcon()} onTabChange={this.cateTabChange}>
                                { entrustPermit == "1"?([
                                    <TradeAgencyStockList ref="stocklist"/>,
                                    <TradeAgencyFundList ref="fundlist"/>
                                ]):(
                                    this.renderNoRight()
                                )}
                            </Category>,
                            <Category title="当日成交" borderColor="none">
                                { dealPermit == "1"?(
                                    <TradeDealList detailMode={detailMode} ref="deallist"/>
                                ):(
                                    this.renderNoRight()
                                )}
                            </Category>,
                            <Category title="当日银证转账" borderColor="none">
                                { moneypipePermit == "1"?(
                                    <TradeTransferList detailMode={detailMode} ref="transferlist"/>
                                ):(
                                    this.renderNoRight()
                                )}
                            </Category>
                        ]):([
                            <Category title="当日委托" borderColor="none">
                                { entrustPermit == "1"?(
                                    <TradeAgencyMarginList ref="agencymarginlist"/>
                                ):(
                                    this.renderNoRight()
                                )}
                            </Category>,
                            <Category title="当日成交" borderColor="none">
                                { dealPermit == "1"?(
                                    <TradeDealMarginList detailMode={detailMode} ref="dealmarginlist"/>
                                ):(
                                    this.renderNoRight()
                                )}
                            </Category>,
                            <Category title="当日信用划转" borderColor="none">
                                { moneypipePermit == "1"?(
                                    <TradeCreditList ref="creditlist"/>
                                ):(
                                    this.renderNoRight()
                                )}
                            </Category>,
                            <Category title="当日银证转账" borderColor="none">
                                { moneypipePermit == "1"?(
                                    <TradeTransferMarginList detailMode={detailMode} ref="transfermarginlist"/>
                                ):(
                                    this.renderNoRight()
                                )}
                            </Category>
                        ])}
                    </LazyLoad>
                </Content>
            </div>

        );
    }

}

function injectAction() {
    return {call};
}
function injectProps(state){
    var {client={}} = state.base,
        {detailMode, clientId} = client,
        {clientName, mobileTel, permitMap={}, fundAccount} = state.client || {},
        {entrustPermit, dealPermit, moneypipePermit} = permitMap;
    return {clientName, fundAccount, mobileTel, entrustPermit, dealPermit, moneypipePermit, clientId, detailMode};
}
module.exports = connect(injectProps, injectAction())(TransactionPage);
