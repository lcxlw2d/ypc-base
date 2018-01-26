import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import Category from '../../../../components/common/category/Category';
import IconTab from '../../../../components/common/category/IconTab';
import SummaryPanel from '../../components/client/detail/SummaryPanel';
import OrdinaryPanel from '../../components/client/detail/OrdinaryPanel';
import CreditPanel from '../../components/client/detail/CreditPanel';
import AccountRights from '../../components/client/detail/AccountRights';
import AssetInformation from '../../components/client/detail/AssetInformation';
import CreditAssetInformation from '../../components/client/detail/CreditAssetInformation';
import AssetChart from '../../components/client/detail/AssetChart';
import CreditAssetChart from '../../components/client/detail/CreditAssetChart';
import RiskCharacteristic from '../../components/client/detail/RiskCharacteristic';
import MarginTradingContract from '../../components/client/detail/MarginTradingContract';
import HistoryAssets from '../../components/client/detail/HistoryAssets';
import ClientRelationship from '../../components/client/detail/ClientRelationship';
import ClientTag from '../../components/client/detail/ClientTag';
import Toggle from '../../components/client/Toggle';

import AdditionalInformation from '../../components/client/detail/AdditionalInformation';

import {connect} from 'react-redux';
import {getSummaryInfo, call, follow, saveBaseInfo} from '../../actions/client/summary/summaryAction';
import styles from './css/summaryPage.css';

/** 客户-全景图-概况 **/
class SummaryPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            them: "transparent",
            showflag: false,
            baseInfo: {},
            rights: {},
            assets: {},
            historyAsset: {},
            risk: {},
            remark: "",
            creditToatalAssetsInfo: {},
            creditAssetsInfo: {},
            marginTradingContract: {},
            relationMap: {},
            tagMap:{},
            hasFina: '0'
        }
    }

    //获取页面名称
    getPageName() {
        return "客户全景图_概况";
    }

    componentDidMount() {
        var {clientId} = this.props;
        this
            .props
            .getSummaryInfo(clientId, (baseInfo, rights, assets, assetChart, historyAsset, risk, remark, hasFina, creditToatalAssetsInfo, creditAssetsInfo, marginTradingContract, relationMap,tagMap) => {
                this.setState({
                    baseInfo: baseInfo,
                    rights: rights,
                    assets: assets,
                    assetChart: assetChart,
                    historyAsset: historyAsset,
                    risk: risk,
                    remark: remark,
                    creditToatalAssetsInfo,
                    creditAssetsInfo,
                    marginTradingContract,
                    relationMap,
                    tagMap,
                    hasFina
                });
            }, this);
        super.componentDidMount();
    }

    //调用打电话
    callFunc() {
        // Client.trackEvent("2001", "CLIENT_CLICK_PHONE");
        //hashHistory.push("/work/client/record/0")
        //this.succ();
        var {mobileTel,clientName,clientId} = this.props, systemType = systemApi.getValue("systemType");
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

    //关注用户
    followFunc = () => {
        Client.trackEvent("2002", "CLIENT_CLICK_STAR");
        var isFollow = this.props.clientStar != '0', {clientId} = this.props;
        this
            .props
            .follow(clientId, isFollow, null, this);
    }

    //渲染右上角图标
    renderIcons() {
        var isFollow = this.props.clientStar != '0';
        return [(<HeaderIcon
            iconCls={isFollow
            ? "follow_on"
            : "follow"}
            onClick={this.followFunc}/>), (<HeaderIcon
            iconCls="phone"
            onClick={this
            .callFunc
            .bind(this)}/>)];
    }

    //监听滚轮事件
    handleScroll = (scrollLeft, scrollTop) => {
        var {showflag} = this.state;
        if (!showflag && scrollTop > 25) {
            this.setState({them: "red", showflag: true});
        } else if (showflag && scrollTop <= 25) {
            this.setState({them: "transparent", showflag: false});
        }

    }


    //渲染资产信息右边切换tab
    renderIcon() {
        return [ < IconTab iconClass = "table" />, < IconTab iconClass = "chart" />
        ]
    }

    render() {
        systemApi.log("SummaryPage render");
        var {
                baseInfo,
                rights,
                assets,
                assetChart,
                historyAsset,
                risk,
                remark,
                creditToatalAssetsInfo,
                creditAssetsInfo,
                marginTradingContract,
                relationMap,
                tagMap,
                hasFina
            } = this.state, {detailMode} = this.props;
        return (
            <div>
                <AppHeader
                    iconRight={this.renderIcons()}
                    headerName={<Toggle theme="searchBarTheme" hasFina={hasFina}/>}
                    theme={this.state.them}
                    onBackClick={this.props.onBackClick}
                    animate={true}/>
                <Content withHeader={true} withBottom={false} onScroll={this.handleScroll}>
                    <SummaryPanel baseInfo={baseInfo}/> {detailMode == "0"
                        ? (
                            <div>
                                <OrdinaryPanel baseInfo={baseInfo}/>
                                <div className="blank"></div>
                                <Category title="账户权限">
                                    <AccountRights rights={rights}/>
                                </Category>
                                <div className="blank"></div>
                                <Category title="资产信息" iconElement={this.renderIcon()} showToggle={false}>
                                    <AssetInformation assets={assets}/>
                                    <AssetChart assetChart={assetChart}/>
                                </Category>
                                <div className="blank"></div>
                                <Category title="其它资产信息">
                                    <HistoryAssets historyAsset={historyAsset}/>
                                </Category>
                                <div className="blank"></div>
                                <Category title="风险特征">
                                    <RiskCharacteristic risk={risk}/>
                                </Category>
                                <div className="blank"></div>
                                <Category title="客户关系">
                                    <ClientRelationship relationMap={relationMap}/>
                                </Category>
                                <div className="blank"></div>
                                {tagMap&&tagMap.length?[
                                    <Category title="客户标签信息">
                                        <ClientTag tagMap={tagMap}/>
                                    </Category>,
                                    <div className="blank"></div>
                                ]:null}
                                <AdditionalInformation value={remark}/></div>
                        )
                        : (
                            <div>
                                <CreditPanel baseInfo={creditToatalAssetsInfo}/>
                                <Category title="资产信息" iconElement={this.renderIcon()} showToggle={false}>
                                    <CreditAssetInformation assets={creditAssetsInfo}/>
                                    <CreditAssetChart assetChart={creditAssetsInfo}/>
                                </Category>
                                <div className="blank"></div>
                                <Category title="融资融券合约">
                                    <MarginTradingContract marginTradingContract={marginTradingContract}/>
                                </Category>
                            </div>
                        )}
                </Content>
            </div>
        );
    }

}

function injectAction() {
    return {getSummaryInfo, call, follow, saveBaseInfo};
}

function injectProps(state) {
    var {client={}} = state.base || {},
        {clientStar,mobileTel,clientName,fundAccount} = state.client || {},
        {clientId,detailMode = "0"} = client;

    return {clientId, clientStar, detailMode,mobileTel,clientName, fundAccount};
}

module.exports = connect(injectProps, injectAction())(SummaryPage);
