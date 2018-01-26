import {connect} from 'react-redux';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import DivScroll from '../../../../components/common/iscroll/DivScroll';
import styles from '../css/home/kingIntroductionPage.css';

class KingIntroductionPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }

    //获取页面名称
    getPageName() {
        return "首页_王者荣耀_规则介绍说明";
    }

    render() {
        systemApi.log("KingIntroductionPage render");

        return (
            <FullScreenView>
                <AppHeader headerName="活动简介"/>
                <Content>
                    <div className={styles.wzry_show_first}>
                        <div className={styles.wzry_rule}>
                            <img src='./images/work/home/wzry/wzryimg01.jpg'></img>
                            <img src='./images/work/home/wzry/wzryimg02.jpg'></img>
                            <img src='./images/work/home/wzry/wzryimg03.jpg'></img>
                            <img src='./images/work/home/wzry/wzryimg04.jpg'></img>
                            <img src='./images/work/home/wzry/wzryimg05.jpg'></img>
                            <img src='./images/work/home/wzry/wzryimg06.jpg'></img>
                            <img src='./images/work/home/wzry/wzryimg07.jpg'></img>
                            <img src='./images/work/home/wzry/wzryimg08.jpg'></img>
                        </div>
                    </div>
                </Content>
            </FullScreenView>
        );
    }
}

function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(KingIntroductionPage);
