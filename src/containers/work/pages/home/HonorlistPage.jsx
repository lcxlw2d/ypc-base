import AppHeader from '../../../../components/common/appheader/AppHeader';
import HonorList from '../../components/home/employeeValue/HonorList';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import styles from '../css/home/honorListPage.css';

/** 首页-产品营销 **/
class HonorListPage extends PageComponent {

    constructor(props, context) {
        super(props, context);

    }


    //获取页面名称
    getPageName(){ return "首页_小犇荣誉榜"; }

    //返回首页刷新未读消息条数
    onBackClick = ()=>{
        hashHistory.push("/work/home");
    }


    render() {
        systemApi.log("HonorListPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="小犇荣誉榜"   />
                <Content iscroll={false}>
                    <HonorList/>
                </Content>
                {this.props.children}
            </FullScreenView>

        );
    }

}


module.exports = HonorListPage;
