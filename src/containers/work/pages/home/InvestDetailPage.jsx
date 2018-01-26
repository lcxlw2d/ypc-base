import {connect} from 'react-redux';
import {FROM_INVEST_BRODUCT_PAGE,FROM_INVEST_CUSTOMER_PAGE} from '../../../../store/actions';
import {getUser, getImgURL, getUserProfile, getRecommend} from '../../actions/home/investadvice/InvestDetailAction';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Intro from '../../../../components/common/popup/Intro';
import Interest from '../../components/home/investadvice/Interest';
import Profile from '../../components/home/investadvice/Profile';
import styles from '../css/home/InvestDetailPage.css';

class InvestDetailPage extends PageComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            user:{},
            avatarUrl:"./images/work/home/icon_at_member02.png",
            userProfile:{},
            recommend:[],
            introFlag:false
        };
        this.introList = ["./images/work/home/investadvice/product_detail_intro.png"];
    }

    //获取页面名称
    getPageName(){ return "首页_投顾精灵_投资行为分析"; }

    componentWillMount(){
        var introFlag = systemApi.getValue("FLAG_INVESTADVICE_DETAIL_INTRO");
        this.setState({introFlag:!introFlag});
    }

    componentDidMount() {
        this.upUserData();
        this.upImgURL();
        this.upProfile();
        this.upRecommend();
    }
    //获取用户基本信息
    upUserData = ()=>{
        var {params} = this.props;
        this.props.getUser(params,this,(data)=>{this.setState({user:data})});
    }

    //获取用户头像
    upImgURL=()=>{
        var {params}=this.props;
        this.props.getImgURL(params,this,(avatarUrl)=>{this.setState({avatarUrl})});
    }

    //获取用户投资概况
    upProfile=()=>{
        var {params}=this.props;
       this.props.getUserProfile(params,this,(data)=>{this.setState({userProfile:data})});
    }

    //获取推荐列表
    upRecommend=()=>{
         var {params}=this.props;
         this.props.getRecommend(params,this,(data)=>{this.setState({recommend:data})})
    }


    backClick = ()=>{
        var {from, params} = this.props,
            {subType} = params;
        if(from == FROM_INVEST_BRODUCT_PAGE){
            hashHistory.push("/work/home/investadvice/broduct/"+subType);
        }
        else if (from == FROM_INVEST_CUSTOMER_PAGE) {
            hashHistory.push("/work/home/investadvice/customer/"+subType);
        }
        else{
            hashHistory.push("/work/home/investadvice");
        }
    }

    //关闭引导
    closeIntro = ()=>{
        systemApi.setValue("FLAG_INVESTADVICE_DETAIL_INTRO","1");
        this.setState({introFlag:false});
    }

    render() {

        var {from,params} = this.props,
            title = from==FROM_INVEST_CUSTOMER_PAGE?"秘密武器":params.productName,
            {user, avatarUrl, userProfile, recommend, introFlag} = this.state,
            {clientName, fundAccount, totalAsset, reason} = user;

        return (
            <FullScreenView>
                <AppHeader headerName="产品投资行为分析" onBackClick={this.backClick}/>
                <Content>
                    <div className={styles.mot_detail_top}>
                        <div className={styles.mot_pic}><img src={avatarUrl}/></div>
                        <div className={styles.mot_name}>
                            <p>{clientName}</p>
                            <p>{fundAccount}</p>
                        </div>
                        <div className={styles.mot_assets}>
                            <p>{totalAsset}</p>
                            <p>总资产(万元)</p>
                        </div>
                    </div>
                    <div className="blank"></div>
                    <div className={styles.cs_reason}>
                        <h3>
                            <span><span>被</span><span className={Color.red}>{title}</span>选中理由</span>
                        </h3>
                        <div className={styles.edit_phone_box}>
                            <p>{reason}</p>
                            <div className={styles.arrow_top}>
                                <b className={styles.edit_top}>
                                    <i className={styles.top_arrow1}></i>
                                    <i className={styles.top_arrow2}></i>
                                </b>
                            </div>
                        </div>
                    </div>
                    <div className="blank"></div>
                    <Profile userProfile={userProfile}/>
                    {recommend.length!==0?(<div><div className="blank"></div><Interest recommend={recommend}/> </div>):(null)}
                    {introFlag?(<Intro introList={this.introList} onClose={this.closeIntro}/>):null}
                </Content>
            </FullScreenView>
        )
    }
}

function injectAction() {
    return {getUser, getImgURL, getUserProfile, getRecommend};
}

function injectProps(state){
    var {investadvice} = state.base || {},
        {from,params} = investadvice;
    return {from,params};
}

module.exports = connect(injectProps, injectAction())(InvestDetailPage);
