import {connect} from 'react-redux';
import {getTimeMachineUrl, getShareInfo} from '../../actions/home/time/timeAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import ChooseProduce from '../../components/home/time/ChooseProduce';
import styles from '../css/home/timeMachinePage.css';

/** 首页-产品营销 **/
class TimeMachinePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            chooseProduct: false,
            product:"",
            productId:""
        }
    }

    //获取页面名称
    getPageName(){ return "首页_时光机"; }

    componentDidMount(){
        //投顾精灵跳转，需要显示资金账号
        var {clientId} = this.props,
            {fundcode} = this.refs;
        fundcode.value = clientId;
        window.addEventListener("resize", this.onResize);
        super.componentDidMount();
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.onResize);
        super.componentWillUnmount();
    }

    //界面尺寸变化回调
    onResize = ()=>{
        var {activeElement} = document,
            {tagName} = activeElement,
            {availHeight} = screen,
            {innerHeight} = window;

        if(tagName=="INPUT" || tagName=="TEXTAREA") {
           window.setTimeout(function() {
               activeElement.scrollIntoViewIfNeeded(true);
           },0);
        }
    }

    toggleSearch = ()=>{
        this.setState({
            chooseProduct: !this.state.chooseProduct
        });
    }

    getUrl=()=>{
        var fundcode=this.refs.fundcode.value,
            product=this.state.productId;

        this.props.getTimeMachineUrl(fundcode,product,(url)=>{
            this.props.getShareInfo(url,this);
        },this);
    }

    searchProduct = (name,productId)=>{
        this.setState({
            chooseProduct: false,
            product:name,
            productId:productId
        });
    }

    deletePro = (e)=>{
        this.setState({product:""});
        e.stopPropagation();
    }
    //资金账号输入框是去焦点
    inputBlur = ()=>{
        var {content} = this.refs;
        content.scrollTop(0);
    }

    render() {
        systemApi.log("TimeMachinePage render");
        var {chooseProduct, product} = this.state;
        return (
            <FullScreenView>
                <AppHeader headerName="时光宝盒"/>
                <Content ref="content" iscroll={false}>
                    <div className={styles.sgjbox}>
                        <img src="./images/work/home/bg_sgj.png" className={styles.sgj_bg}/>
                        <div className={styles.sgj_img}><img src="./images/work/home/img07.png"/></div>
                        <div className={styles.sgj_form}>
                            <input type="number" ref="fundcode" onBlur={this.inputBlur} className={styles.sgj_input} placeholder="请输入资金账号"/>
                        </div>
                        <div className={styles.sgj_form}  onClick={this.toggleSearch}>
                            <input type="text" className={styles.sgj_input} placeholder="请选择一只对比产品" disabled value={product}/>
                            <input type="button" className={styles.sgj_search} onClick={this.deletePro}/>
                        </div>
                        <div className={styles.sgj_form}>
                            <input type="button" onClick={this.getUrl} className={styles.sgj_btn}/>
                        </div>
                    </div>
                </Content>
                {chooseProduct? <ChooseProduce close={this.toggleSearch} choose={this.searchProduct} />: null}
            </FullScreenView>

        );
    }

}

//投顾精灵跳转，需要显示资金账号
function injectProps(state){
    var {investadvice} = state.base || {},
        {params} = investadvice,
        {clientId=""} = params;
    return {clientId};
}

function injectAction() {
    return {getTimeMachineUrl,getShareInfo};
}

module.exports = connect(injectProps, injectAction())(TimeMachinePage);
