import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';

import KouJingList from '../../../work/components/home/employeeValue/KouJingList';

import styles from '../css/home/kouJingPage.css';

class KouJingPage extends PageComponent{

    constructor(props, context) {
        super(props, context);
        this.state = {
            index:0,
        }
    }

    //获取页面名称
    getPageName(){ return "首页_琅琊业绩榜_口径说明"; }

     //切换tab
     tabChange = (index)=>{

        let {KouJingList} = this.refs;
        this.setState({index}, () => {

             $(KouJingList).scrollTop(0);
        });
    }

    render(){
        systemApi.log("KouJingPage render");

        let { index } = this.state;

        return (
            <FullScreenView>
                <AppHeader backHash="/work/home/employeeValue/0" headerName="口径说明"/>
                <div className={styles.top}>
                    <SubTabs index={index} onTabChange={this.tabChange}>
                        <UlineTab text="我的战况"/>
                        <UlineTab text="资产"/>
                        <UlineTab text="客户"/>
                        <UlineTab text="交易"/>
                    </SubTabs>
                </div>
                <div ref='KouJingList' className={styles.center}>
                    <LazyLoad index={index}>
                        <KouJingList index={0}/>
                        <KouJingList index={1}/>
                        <KouJingList index={2}/>
                        <KouJingList index={3}/>
                    </LazyLoad>
                </div>
            </FullScreenView>
        );
    }

}

module.exports = KouJingPage;
