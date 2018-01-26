import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import {connect} from 'react-redux';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import Performance from '../../components/home/employeeValue/Performance';
import Honors from '../../components/home/employeeValue/Honors';

import styles from '../css/home/employeeValuePage.css';
/** 首页-员工价值榜 **/
class EmployeeValuePage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state={
            index: this.props.params.index || 0,
        }
    }

    //获取页面名称
    getPageName(){ return "首页_发现"; }

    //切换tab
    tabChange = (index)=>{

        this.setState({index});
    }

    render(){
        systemApi.log("EmployeeValuePage render");
        var {index} = this.state;

        return (
            <FullScreenView>
                <AppHeader backHash='/work/home'  headerName="价值榜"/>
                <div className={styles.top}>
                    <SubTabs index={index} onTabChange={this.tabChange}>
                        <UlineTab text="业绩琅琊榜"/>
                        <UlineTab text="小犇荣誉榜"/>
                    </SubTabs>
                </div>
                  <LazyLoad index={index}>
                      <Performance  ref="performance"/>
                      <Honors ref="honors"/>
                  </LazyLoad>
                {this.props.children}
            </FullScreenView>
        );
    }

}
function injectAction(){
    return {};
}

module.exports = connect(null, injectAction())(EmployeeValuePage);
