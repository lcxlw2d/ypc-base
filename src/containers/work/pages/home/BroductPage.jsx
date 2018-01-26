import {connect} from 'react-redux';
import {clearInvestProduct} from '../../../../store/actions';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import Intro from '../../../../components/common/popup/Intro';
import InvestCarousel from '../../components/home/investadvice/InvestCarousel';
import ShortInvest from '../../components/home/investadvice/ShortInvest';
import StableInvest from '../../components/home/investadvice/StableInvest';
import LongerInvest from '../../components/home/investadvice/LongerInvest';
import styles from '../css/home/BroductPage.css';

const picList = [
    {
        url: "./images/work/home/investadvice/sm03.jpg",
        mainText:"他们想积累财富？",
        subText:"帮助客户精选产品，冲击财富梦想"
    }, {
        url: "./images/work/home/investadvice/sm02.jpg",
        mainText:"他们想稳妥增值？",
        subText:"帮助客户稳中求胜，扎牢财富根基"
    }, {
        url: "./images/work/home/investadvice/sm01.jpg",
        mainText:"他们想短期理财？",
        subText:"帮助客户闲置资金增值，灵活变现"
    }
];

/** 首页-投顾精灵-客户 **/
class BroductPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: +props.params.type,
            introFlag:false
        }
        this.introList = ["./images/work/home/investadvice/product_intro.png"];
    }

    //获取页面名称
    getPageName() {
        return "首页_投顾精灵_产品";
    }

    componentWillMount(){
        var introFlag = systemApi.getValue("FLAG_BRODUCT_INTRO");
        this.setState({introFlag:!introFlag});
    }

    picChange = (index) => {
        this.setState({index});
        hashHistory.push("/work/home/investadvice/broduct/"+index);
    }

    didUpdate =()=>{
        var {shortInvest, stableInvest, longerInvest} = this.refs;
        if(shortInvest) shortInvest.getWrappedInstance().refresh();
        if(stableInvest) stableInvest.getWrappedInstance().refresh();
        if(longerInvest) longerInvest.getWrappedInstance().refresh();
    }

    backClick = ()=>{
        this.props.clearInvestProduct();
        // hashHistory.push("/work/home/investadvice");
         hashHistory.goBack();
    }

    //关闭引导
    closeIntro = ()=>{
        systemApi.setValue("FLAG_BRODUCT_INTRO","1");
        this.setState({introFlag:false});
    }

    render() {
        systemApi.log("BroductPage render");

        var {index,introFlag} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="精准服务" onBackClick={this.backClick}/>
                <Content iscroll={false}>
                    <InvestCarousel picList={picList} index={index} onChange={this.picChange}/>
                    <LazyLoad index={index} onDidUpdate={this.didUpdate}>
                        <LongerInvest ref="longerInvest"/>
                        <StableInvest ref="stableInvest"/>
                        <ShortInvest ref="shortInvest"/>
                    </LazyLoad>
                </Content>
                {introFlag?(<Intro introList={this.introList} onClose={this.closeIntro}/>):null}
                {this.props.children}
            </FullScreenView>

        );
    }

}

function injectAction(){
    return {clearInvestProduct};
}

module.exports = connect(null, injectAction())(BroductPage);
