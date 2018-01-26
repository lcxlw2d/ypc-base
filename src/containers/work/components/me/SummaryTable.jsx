import {connect} from 'react-redux';
import {getClientsSummary, getGenerateRight,getHeadImageData} from '../../actions/me/meAction';

import Category from '../../../../components/category/Category';
import TextFlat from '../../../../components/category/TextFlat';
import SummaryItem from './SummaryItem';
import ECardBox from './ECardBox';
import styles from '../css/me/summaryTable.css';
import AlbumSelect from '../home/attend/edit/AlbumSelect.jsx';
import {chooseHeadPhoto, warn,submitHeadImage} from '../../actions/home/attend/edit/editAction';


class SummaryTable extends PureComponent{
    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            userInfo:{
                servClientCount:"-",
                totalAsset:"-",
                currentMarketValue:"-",
                totalBalance:"-",
                tyBuyOfstockBalance:"-",
                marginBalance:"-",
                businessBalanceYear:"-",
                netFareYear:"-",
                updateTime:"-",
                userName:"-",
                loginId:"-",
                headImgQrCode:""
            },
            showCard:false,
            showSelect:false,
            headImageURL:""
        }
    }

    componentDidMount(){
        //获取停留页面刷新时间
        var freshTime = systemApi.getValue("config_page_me_refresh");
        this.props.getClientsSummary(false, this, this.update);

        this.interval = setInterval(()=>{
            this.props.getClientsSummary(true, this, this.update);
        },freshTime);
    }

    componentWillUnmount(){
        //清除计时器
        clearInterval(this.interval);
        super.componentWillUnmount();
    }

    renderIcon(){
        var {updateTime} = this.state.userInfo;
        return [
            <TextFlat text={"更新："+updateTime}/>
        ]
    }

    update = (data)=>{
        this.setState({userInfo:data});
         //请求用户头像
        var userId = new Base64().encode(systemApi.getValue("userId"));
        this.props.getHeadImageData({userId:userId},false,this, this.updataHeadImage)

    }

    //点击客户数量
    clientClick = ()=>{
        Cache.setValue("client_tab_type","1");
        hashHistory.push("/work/client");
    }

    openCard = ()=>{
      Client.trackEvent("4001","ME_CLICK_ECARD");
        this.setState({showCard:true});
    }

    hideCardFn = ()=>{
        this.setState({showCard:false});
    }

    //头像点击
    headImageClick = ()=>{
        this.setState({
            showSelect:true
        });
    }
    //关闭图片选择
    closeSelect = ()=>{
        this.setState({
            showSelect:false
        });
    }

      //点击拍照
    cameraClick = ()=>{
        this.props.chooseHeadPhoto({
            type:1
        }, this.headImageUpdate);
        this.closeSelect();
    }

    //点击相册
    albumClick = ()=>{
        var {imgs} = this.props;
        this.props.chooseHeadPhoto({
            type:0
        }, this.headImageUpdate);
        this.closeSelect();
    }

     //选择照片后回调
    headImageUpdate = (urls)=>{

        var params = {};
         this.props.submitHeadImage(params, urls,"uploadfileName", this, (data)=>{
            var {url} = data;

            this.setState({
            headImageURL:url//更新图片的URL
        });
        })
    }

    //更新头像的URL
    updataHeadImage=(url)=>{
        this.setState({
            headImageURL:url//更新图片的URL
        });
    }



    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("SummaryTable render");

        var {showCard,showBranch,userInfo,showSelect,headImageURL} = this.state,
            {loginId,servClientCount, totalAsset, currentMarketValue, totalBalance, tyBuyOfstockBalance, marginBalance, businessBalanceYear, netFareYear, userName, headImgQrCode=""} = userInfo;

        return(
            <div>
                <div className={styles.bg01}>
                    <div className={styles.userbox}>
                        {/*<a className={styles.user_gg}><img src={"data:image/png;base64,"+headImgQrCode} onError={(e)=>{e.target.src='./images/work/me/user_01.png'} } onClick={this.headImageClick}/></a>*/}
                          {/*<a className={styles.user_gg}><img src="http://27.151.112.180:8079/ZT/afa/afa/wBlneFlnUpqEeBuWAAAAABQqgvE742.png" onError={(e)=>{e.target.src='./images/work/me/user_01.png'} } onClick={this.headImageClick}/></a>*/}
                          <a className={styles.user_gg}><img src={headImageURL} onClick={this.headImageClick}/></a>
                        <span className={styles.user_name01}>您好，{userName} ( {loginId} )</span>
                        <div className="clear"></div>
                        <div className={styles.ecard}>
                            <a onClick={this.openCard}>一键生成电子名片</a>
                        </div>
                    </div>
                </div>
                <Category title="服务客户概况(万元)" borderColor="none" iconLeft="none" iconElement={this.renderIcon()}>
                <table className={styles.table} width="100%">
                	<tbody>
                    	<tr>
                        	<td><SummaryItem color="c6" text="客户数量" value={servClientCount} onClick={this.clientClick}/></td>
                            <td><SummaryItem color="red" text="总资产" value={totalAsset} /></td>
                            <td><SummaryItem color="red" text="二级市值" value={currentMarketValue} /></td>
                            <td><SummaryItem color="red" text="保证金" value={totalBalance} /></td>
                         </tr>
                         <tr>
                            <td><SummaryItem color="red" text="今年产品购买量" value={tyBuyOfstockBalance} /></td>
                            <td><SummaryItem color="red" text="两融余额" value={marginBalance} /></td>
                            <td><SummaryItem color="red" text="今年二级交易量" value={businessBalanceYear} /></td>
                            <td><SummaryItem color="red" text="今年二级净佣金" value={netFareYear} /></td>
                        </tr>
                    </tbody>
                </table>
                </Category>
                {showCard?(<ECardBox onClose={this.hideCardFn}/>):null}
                {showSelect?(
                    <AlbumSelect onClose={this.closeSelect} onCamera={this.cameraClick} onAlbum={this.albumClick}/>
                ):null}
            </div>
        );
    }

}

function injectAction(){
    return {getClientsSummary, getGenerateRight,chooseHeadPhoto, warn,submitHeadImage,getHeadImageData};
}

module.exports = connect(null,injectAction())(SummaryTable);
