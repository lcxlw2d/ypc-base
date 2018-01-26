import {connect} from 'react-redux';
import {gotoInvestDetail, FROM_POTENTIALDETAIL_PAGE, FROM_TODO_DETAIL_PAGE, FROM_ATTENDSHOW_DETAIL_PAGE, FROM_CLIENT_PAGE, FROM_MUSTSEE_TODAY_LIST, FROM_INVEST_DETAIL_PAGE, FROM_HOME_PAGE, FROM_GOLDEN_PAGE, FROM_MARGIN_PAGE, FROM_CLIENT_SEARCH_PAGE, FROM_ATTEND_PAGE, FROM_ATTEND_DETAIL_PAGE, FROM_DEADLINE_PAGE} from '../../../../store/actions';
import { saveBaseInfo } from "../../actions/client/summary/summaryAction";

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import BottomTabs from '../../../../components/common/bottomtabs/BottomTabs';
import TabItem from '../../../../components/common/bottomtabs/TabItem';

import styles from './css/detailIndexPage.css';

/** 客户-全景图 **/
class DetailIndexPage extends PureComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            show:false,
        }
    }

    //点击返回，清空缓存，跳回上一页面
    onBackClick = ()=>{
        var {from, params} = this.props;
        this.props.saveBaseInfo('');
        Cache.remove("client_summary_info");
        Cache.remove("client_position_stock");
        Cache.remove("client_position_fund");
        Cache.remove("client_position_product");
        Cache.remove("client_position_margin");
        Cache.remove("client_position_margin");
        Cache.remove("client_position_debet_asset");
        Cache.remove("client_position_debet_stock");
        Cache.remove("client_position_debet_other");
        if(from == FROM_GOLDEN_PAGE){
            hashHistory.push("/work/home/golden");
        }
        else if(from == FROM_HOME_PAGE){
            hashHistory.push("/work/home");
        }
        else if(from == FROM_MARGIN_PAGE){
            hashHistory.push("/work/home/margin");
        }
        else if(from == FROM_CLIENT_SEARCH_PAGE){
            var {clientSearch, searchType} = params;
            hashHistory.push("/work/client/search/"+clientSearch+"/"+searchType);
        }
        else if(from == FROM_ATTEND_PAGE){
            var { address } = params;
            if(address==1){
                hashHistory.push("/work/home/attend");
            }else if(address == 2){
                Cache.setValue("showAttendList", true)
                hashHistory.push("/work/home/attend/statistics");
            }

        }
        else if(from == FROM_ATTEND_DETAIL_PAGE){
            var {attendId, address} = params;
            hashHistory.push(`/work/home/attend/detail/${attendId}/${address}`);
        }
        else if(from == FROM_ATTENDSHOW_DETAIL_PAGE){
            var { attendId,  address} = params;
            hashHistory.push(`/work/home/attend/detailshow/${attendId}/${address}`);
        }
        else if(from == FROM_DEADLINE_PAGE){
            hashHistory.push("/work/home/deadline");
        }else if(from == FROM_TODO_DETAIL_PAGE){
            var {id,done} = params;
            hashHistory.push("/work/todo/detail/"+id+"/"+done);
        }else if(from == FROM_MUSTSEE_TODAY_LIST){
            var {index}=params;
            hashHistory.push("/work/home/mustsee/"+index);
        }else if(from == FROM_INVEST_DETAIL_PAGE) {
            var pFrom = params.from;
            this.props.gotoInvestDetail(pFrom, params);
        }else if(from == FROM_POTENTIALDETAIL_PAGE) {
            let { potentialId } = params;
            //this.props.goToPotentialDetail("", params)
            hashHistory.push('/work/client/potentialDetail/'+potentialId);
        }
        else{
            hashHistory.push("/work/client");
        }
    }

    hiddrenBottom = show => {
        this.setState({show})
    }

    render(){
        systemApi.log("DetailIndexPage render");

        var {detailMode} = this.props, { show } = this.state;

        var children = this.getChildren().map((item)=>{
            return React.cloneElement(item,{
                onBackClick:this.onBackClick,
                hiddrenBottom:this.hiddrenBottom
            })
        });

        return (
            <FullScreenView>
                {children}
                {show?null:<BottomTabs theme="red">
                    <TabItem hash="/work/client/detail/summary" iconClass="summary" text="概况"/>
                    <TabItem hash="/work/client/detail/profit" iconClass="gainlost" text="盈亏"/>
                    <TabItem hash="/work/client/detail/position" iconClass="position" text="持仓"/>
                    <TabItem hash="/work/client/detail/transaction" iconClass="transaction" text="交易"/>
                    <TabItem hash="/work/client/detail/server" iconClass="server" text="服务"/>
                </BottomTabs>}
            </FullScreenView>

        );
    }

}

function injectProps(state){
    var {client={}} = state.base || {},
        {from,detailMode="0",params} = client;
    return {from, detailMode, params};
}

function injectAction(){
    return {gotoInvestDetail, saveBaseInfo};
}

module.exports = connect(injectProps,injectAction())(DetailIndexPage);
