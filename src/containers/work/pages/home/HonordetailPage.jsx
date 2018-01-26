import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import Honordetail from '../../components/home/employeeValue/Honordetail';

import styles from '../css/home/employeeValuePage.css';
/** 首页-员工价值榜 **/
class HonordetailPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
    }
    //获取页面名称
    getPageName(){ return "首页_详情"; }

    render(){
        systemApi.log("EmployeeValuePage render");

        return (
            <FullScreenView>
                <AppHeader  headerName="详情"/>
        
                      <Honordetail data={ this.props.location.state}/>

            </FullScreenView>
        );
    }

}


module.exports = HonordetailPage;
