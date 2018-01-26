import {connect} from 'react-redux';
import {call} from '../../actions/client/summary/summaryAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import PositionStockList from '../../components/client/detail/PositionStockList';
import PositionFundList from '../../components/client/detail/PositionFundList';
import PositionProductList from '../../components/client/detail/PositionProductList';
import PositionMarginList from '../../components/client/detail/PositionMarginList';
import PositionDebetAssetList from '../../components/client/detail/PositionDebetAssetList';
import PositionDebetStockList from '../../components/client/detail/PositionDebetStockList';
import PositionDebetOtherList from '../../components/client/detail/PositionDebetOtherList';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import Category from '../../../../components/common/category/Category';
import TextFlat from '../../../../components/common/category/TextFlat';
import TextTab from '../../../../components/common/category/TextTab';

import styles from './css/positionPage.css';

/** 客户-全景图-持仓 **/
class PositionPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0
        }
    }

    //获取页面名称
    getPageName(){ return "客户全景图_持仓"; }

    //UI更新后，对列表刷新
    componentDidUpdate(){
        var {stocklist, fundlist, productlist, marginlist, debetassetlist, debetstocklist, debetotherlist} = this.refs;

        if(stocklist){
            stocklist.getWrappedInstance().getScroll().refresh();
        }
        if(fundlist){
            fundlist.getWrappedInstance().getScroll().refresh();
        }
        if(productlist){
            productlist.getWrappedInstance().getScroll().refresh();
        }
        if(marginlist){
            marginlist.getWrappedInstance().getScroll().refresh();
        }
        if(debetassetlist){
            debetassetlist.getWrappedInstance().getScroll().refresh();
        }
        if(debetstocklist){
            debetstocklist.getWrappedInstance().getScroll().refresh();
        }
        if(debetotherlist){
            debetotherlist.getWrappedInstance().getScroll().refresh();
        }
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

    //渲染图标
    renderIcons() {
        return [
            <HeaderIcon iconCls="phone" onClick={this.callFunc}/>
        ];
    }

    //切换tab
    tabChange = (index) => {
        this.setState({index});
    }

    renderNoRight(){
        return (
            <div className={styles.opening}>
                <div className={styles.noAccess}></div>
                <p className={this.mergeClassName(styles.font18, Font.font18)}>哎呦喂！</p>
                <p className={styles.c6}>您暂无权限查看</p>
            </div>
        );
    }

    //渲染负债tabs
    renderIcon() {
        var {positionPermit} = this.props;
        if(positionPermit == "1"){
            return [
                < TextTab text="融资" background="white" />,
                < TextTab text="融券" background="white" />,
                < TextTab text="其他"  background="white" />
            ];
        }
        else {
            return [];
        }
    }

    //Category切换tab
    cateTabChange = ()=>{
        var {debetassetlist, debetstocklist, debetotherlist} = this.refs;

        if(debetassetlist){
            debetassetlist.getWrappedInstance().getScroll().refresh();
        }
        if(debetstocklist){
            debetstocklist.getWrappedInstance().getScroll().refresh();
        }
        if(debetotherlist){
            debetotherlist.getWrappedInstance().getScroll().refresh();
        }
    }

    render() {
        systemApi.log("PositionPage render");

        var {clientName, positionPermit, detailMode} = this.props,
            {index, search} = this.state,
            titleName = clientName + (detailMode=="0"?"(普通)":"(信用)");
        return (
            <div>
                <AppHeader headerName={titleName} theme="red" iconRight={this.renderIcons()} onBackClick={this.props.onBackClick}/>
                <Content withBottom={false} iscroll={false}>
                    <SubTabs index={index} onTabChange={this.tabChange} theme="red">
                        {detailMode=="0"?([
                            <UlineTab text="股票"/>,
                            <UlineTab text="基金"/>,
                            <UlineTab text="理财"/>
                        ]):([
                            <UlineTab text="持仓"/>,
                            <UlineTab text="负债"/>
                        ])}
                    </SubTabs>
                    <div className="blank"></div>
                    {detailMode=="0"?(
                        <Category title="持仓详情"  borderColor="none">
                            {positionPermit == "1"?(
                                <LazyLoad index={index}>
                                    <PositionStockList ref="stocklist"/>,
                                    <PositionFundList ref="fundlist"/>,
                                    <PositionProductList ref="productlist"/>
                                </LazyLoad>
                            ):(
                                this.renderNoRight()
                            )}
                        </Category>
                    ):(
                        <LazyLoad index={index}>
                            <Category title="持仓详情"  borderColor="none">
                                {positionPermit == "1"?(
                                    <PositionMarginList ref="marginlist"/>
                                ):(
                                    this.renderNoRight()
                                )}
                            </Category>
                            <Category title="持仓详情"  borderColor="none" iconElement={this.renderIcon()} onTabChange={this.cateTabChange}>
                                {positionPermit == "1"?([
                                    <PositionDebetAssetList ref="debetassetlist"/>,
                                    <PositionDebetStockList ref="debetstocklist"/>,
                                    <PositionDebetOtherList ref="debetotherlist"/>
                                ]):(
                                    this.renderNoRight()
                                )}
                            </Category>
                        </LazyLoad>
                    )}
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
        {detailMode,clientId} = client,
        {clientName, mobileTel, permitMap={}, fundAccount} = state.client || {},
        {positionPermit} = permitMap;

    return {clientName,clientId, fundAccount, mobileTel, positionPermit, detailMode};
}

module.exports = connect(injectProps, injectAction())(PositionPage);
