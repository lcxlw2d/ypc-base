import {connect} from 'react-redux';
import {resetInvestData} from '../../../../store/actions';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import ClassifyItem from '../../components/home/investadvice/ClassifyItem';

import styles from '../css/home/investAdvicePage.css';

/** 首页-投顾精灵 **/
class InvestAdvicePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }

    //获取页面名称
    getPageName(){ return "首页_投顾精灵"; }

    sg1Click = ()=>{
        hashHistory.push("/work/home/investadvice/broduct/2");
    }

     sg2Click = ()=>{
        hashHistory.push("/work/home/investadvice/broduct/1");
    }

     sg3Click = ()=>{
        hashHistory.push("/work/home/investadvice/broduct/0");
    }

    sg4Click = ()=>{
        hashHistory.push("/work/home/investadvice/customer/0");
    }

    sg5Click = ()=>{
        hashHistory.push("/work/home/investadvice/customer/1");
    }

    backClick = ()=>{
        this.props.resetInvestData();
        // hashHistory.push("/work/home");
        hashHistory.goBack();
    }

    render() {
        systemApi.log("InvestAdvicePage render");

        return (
            <FullScreenView>
                <AppHeader headerName="精准服务" onBackClick={this.backClick}/>
                <Content>
                    <div className={styles.mot_index}>
                        <div className={styles.mot_index_top}>
                            <div className={styles.mot_mascot01}>
                                <img src="./images/work/home/investadvice/motMascot01.png"/>
                            </div>
                        </div>
                        <div className={styles.mot_index_list}>
                            <ClassifyItem type="mot_sg03" text="他们想积累财富？" subText="帮助客户精选产品,冲击财富梦想"  onClick={this.sg3Click}/>
                            <ClassifyItem type="mot_sg02" text="他们想稳妥增值？" subText="帮助客户稳中求胜,扎牢财富根基"  onClick={this.sg2Click}/>
                            <ClassifyItem type="mot_sg01" text="他们想短期理财？" subText="帮助客户闲置资金增值,灵活变现"  onClick={this.sg1Click}/>
                        </div>
                        <div className={this.mergeClassName(styles.mot_index_top, styles.mot_cos)}>
                            <div className={styles.mot_mascot02}>
                                <img src="./images/work/home/investadvice/motMascot02.png"/>
                            </div>
                        </div>
                        <div className={styles.mot_index_list}>
                            <ClassifyItem type="mot_sg04" text="他们需要您关注？" subText="帮助他们享受理财乐趣,获取收益"  onClick={this.sg4Click}/>
                            <ClassifyItem type="mot_sg05" text="他们是新手小白？" subText="帮忙他们开启理财之路,赚取第一桶金"  onClick={this.sg5Click}/>
                        </div>
                    </div>
                </Content>
                {this.props.children}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {resetInvestData};
}

module.exports = connect(null, injectAction())(InvestAdvicePage);
