import {connect} from 'react-redux';
import {shareNews, praise, getContent, ATTEND_REFRESH_ATTENDLIST} from '../../actions/home/newscenter/newscenterAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import TitleIcon from '../../../../components/common/appheader/TitleIcon';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import ScaleImage from '../../../../components/common/fullscreen/ScaleImage';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import AttendDetailEdit from '../../components/home/attend/edit/AttendDetailEdit';
import AttendImage from '../../components/home/attend/edit/AttendImage';

import styles from '../css/home/newsDetailPage.css';

/** 首页-产品营销 **/
class NewsDetailPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showShare: false,
            showFullImg:false,
            imgSrc:""
        }
    }

    //获取页面名称
    getPageName() {
        return "首页_消息中心_详情";
    }

    componentDidMount() {
        Client.cleanCachedPushMessage();
        var {id} = this.props.params;
        this.props.getContent(id, (data) => {
            var {noticeTitle,noticeTypevalue,readCounts,likeCounts,createDate,readStatus,
                noticeContent,likeStatus,shareUrl,abstracts} = data;
            this.setState(
                {noticeTitle,noticeTypevalue,readCounts,likeCounts,createDate,
                readStatus,noticeContent,likeStatus,shareUrl,abstracts});
        }, this);

        $("."+styles.detail_cont).delegate("img","click",(function(component){
            return function(){
                var imgSrc = $(this).attr("src");
                component.setState({showFullImg:true,imgSrc});
            }
        })(this));

        super.componentDidMount();
    }

    shareNewsView = () => {
        this.setState({showShare:!this.state.showShare});
    }

    hidNewsView = () => {
        if(this.state.showShare){
            this.setState({showShare:false});
        }
    }

    shareToSession = () => {

        var {shareUrl,noticeTitle,abstracts} = this.state;
        this.props.shareNews("SESSION", shareUrl, noticeTitle ,abstracts,() => {
            this.setState({shareNews: false});
        },this);
    }

    shareToTimeline = () => {
        var {shareUrl,noticeTitle,abstracts} = this.state;
        this.props.shareNews("TIMELINE", shareUrl, noticeTitle, abstracts,() => {
            this.setState({shareNews: false},this);
        },this);
    }

    praise = () => {
        var {id} = this.props.params,{likeStatus=0} = this.state;
        if(likeStatus==0)
            likeStatus=1;
        else
            likeStatus=0;

        this.props.praise(id,likeStatus,(likeStatus,likeCounts) => {
            this.setState({likeStatus,likeCounts});
        },this);
    }

    onBackClick = ()=>{
        Event.fire(ATTEND_REFRESH_ATTENDLIST);
        hashHistory.goBack();
    }

    closeScale = ()=>{
        this.setState({showFullImg:false, imgSrc:""});
    }

    render() {
        systemApi.log("NewsDetailPage render");
        var {
            noticeTitle,noticeTypevalue,readCounts,likeCounts,createDate,
            readStatus,noticeContent,likeStatus,showShare,
            showFullImg, imgSrc
        } = this.state;
        return (
            <FullScreenView >
                <AppHeader headerName={<TitleIcon iconCls = "newsCenter" />} onBackClick={this.onBackClick}/>
                <Content withBottom={false} onClick={this.hidNewsView}>
	                    <div className={styles.hotnews_detail}>
	                        <h2>{noticeTitle}</h2>
	                        <div className={styles.hotnews_list_other}>
	                            <div className={styles.other_left}>
	                                <i>{noticeTypevalue}</i>{createDate}
	                            </div>
	                            <div className={styles.other_right}>
	                                <span className={styles.num_read}>{readCounts}</span>
	                            </div>
	                        <div className={styles.detail_cont}>
	                            <div dangerouslySetInnerHTML={{
	                                __html: noticeContent
	                            }}/>
	                        </div>
	                    </div>
	                </div>

                </Content>
                <div className={styles.hotnews_bot_btns}>
                    <div className={styles.bot_btn_left} onClick={this.shareNewsView}>
                        <span>分享</span>
                    </div>
                    <div className={styles.bot_btn_mid}></div>
                    <div className={styles.bot_btn_right} onClick={this.praise}>
                        <span className={likeStatus?styles.on:styles.off}>{likeCounts}人点赞</span>
                    </div>
                </div>
                {showShare?<div className={styles.draft_save_tip+" "+styles.share_list}>
                    <div className={styles.share_box}>
                        <div className={styles.share_tit}>分享至</div>
                        <ul>
                            <li onClick={this.shareToSession} className={styles.icon_weixin} >微信</li>
                            <li onClick={this.shareToTimeline} className={styles.icon_friends+" "+styles.noborder}>朋友圈</li>
                        </ul>
                    </div>
                    <div className={styles.arrow_bottom}>
                        <b className={styles.bottom}>
                            <i className={styles.bottom_arrow1}></i>
                            <i className={styles.bottom_arrow2}></i>
                        </b>
                    </div>
                </div>:null}
                {showFullImg?(
                    <ScaleImage url={imgSrc} onClose={this.closeScale}/>
                ):null}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {shareNews, praise, getContent};
}

module.exports = connect(null, injectAction())(NewsDetailPage);
