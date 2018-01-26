import {connect} from 'react-redux';
import {} from '../../actions/home/stockoffline/stockOfflineAction';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import DetailPanel from '../../components/home/stockoffline/DetailPanel';
import PlanList from '../../components/home/stockoffline/PlanList';

import styles from '../css/home/offlineDetailPage.css';

/** 首页-网下打新详情 **/
class OfflineDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }

    //获取页面名称
    getPageName(){ return "首页_网下打新详情"; }

    render() {
        systemApi.log("OfflineDetailPage render");

        var {id} = this.props.params;

        return (
            <FullScreenView>
                <AppHeader headerName="网下打新详情"/>
                <Content>
                    <DetailPanel stockCode={id}/>
                    <div className="blank"></div>
                    <PlanList stockCode={id}/>
                </Content>
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(OfflineDetailPage);
