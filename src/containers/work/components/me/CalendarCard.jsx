import {connect} from 'react-redux';
import {saveQRcode, shareECard, getQrCodeInfo} from '../../actions/me/meAction';

import FullScreenView from '../../../../components/fullscreen/FullScreenView';
import PreLoad from './PreLoad';

import styles from '../css/me/calendarCard.css';


class CalendarCard extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            openAccountQrCode: "",
            changed:false,
            loading:false
        }
    }

    componentDidMount() {

    }

    update = (data) => {
        // var {openAccountQrCode} = data;
        // if(openAccountQrCode){
        //     this.setState(Object.assign(data,{loading:false}));
        // }
        // else{
        //     this.closeWindow();
        // }
    }

    errcb = ()=>{
        // this.setState({loading:false});
        // this.closeWindow();
    }

    //关闭窗口
    closeWindow = () => {
         var {onClose} = this.props;
        onClose && onClose();
    }

    //点击分享
    shareClick = (type) => {
        this.props.shareECard(type, this, () => {});

    }
    //微信分享
    wxShare = (e) => {
      Client.trackEvent("10072","HOME_CLICK_CALENDAR_SHAREFRIEND");
        this.shareClick("wechat");
        e.stopPropagation();
    }

    //朋友圈分享
    frShare = (e) => {
      Client.trackEvent("10073","HOME_CLICK_CALENDAR_SHARECIECLE");
        this.shareClick("friend");
        e.stopPropagation();
    }

    //qq分享
    qqShare = (e) => {
        this.shareClick("qq");
        e.stopPropagation();
    }


    //组织冒泡
    stopProp = (e) => {
         e.stopPropagation();
    }

    //点击任意区域，如果处于编辑状态，提交请求；否则关闭窗口
    frameClick = () => {
        this.closeWindow();
    }

    changeQRcode = (e)=>{
      var {changed,openAccountQrCode}=this.state;
      if(changed) this.setState({changed:false});
      else if(openAccountQrCode==null || openAccountQrCode==""){
        this.props.getQrCodeInfo({branchNo:"",forceRefresh:false},this, this.update, this.errcb);
      }else
          this.setState({changed:true});

        e.stopPropagation();
    }

    update = (data) => {
        var {openAccountQrCode} = data;
        if(openAccountQrCode){
          this.setState({openAccountQrCode,changed:true});
        }

    }

    errcb = ()=>{
      //  this.setState({loading:false});
      //  this.closeWindow();
    }



    //重新生成二维码
    refresh = (e)=>{
        var {onRefresh} = this.props;
        onRefresh && onRefresh();
        e.stopPropagation();
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("CalendarCard render");

        var {
            openAccountQrCode,
            loading,
            changed
        } = this.state,
        {QRCodeParam={},attachmentUrl=""}=this.props.params;

        return (
            <FullScreenView transparent={true}>
                <div ref="fulldiv" className={styles.frame} onClick={this.frameClick}>
                    <div className={this.mergeClassName(styles.ecard_box)}>
                        <div  className={this.mergeClassName(styles.ecard_frame)}>
                            <div className={styles.ec_erweima}>
                                <div ref="showdiv" className={styles.myQrcode}>
                                <img src={"data:image/png;base64," + attachmentUrl}/>
                                    {(openAccountQrCode!=null && openAccountQrCode!="" &&changed)?
                                    <div className={styles.qrcode} style={{
                                      left: QRCodeParam.x+"%",
                                      top: QRCodeParam.y+"%",
                                      width: QRCodeParam.w+"%",
                                      height: QRCodeParam.h+"%",
                                    }}>
                                        <img className={styles.qrimg} src={"data:image/png;base64," + openAccountQrCode}/>
                                        <div className={styles.enter} >扫一扫二维码,轻松开户</div>

                                    </div>:null }
                                {/*<div className={styles.version}></div>*/}
                                </div>
                            </div>
                        </div>
                        {this.props.params.generated==1?
                          <div className={styles.button} onClick={this.changeQRcode}>
                           <a>{changed?"恢复原有二维码":"替换成我的开户二维码"}</a>
                        </div>:null}
                        <div className={styles.ec_btns}>
                            <div className={styles.btn_share} onClick={this.share}>
                                <a>分享至:</a>
                                <div className={styles.share_icons}>
                                    <ul>
                                        <li className={styles.icon_weixin} onClick={this.wxShare}>微信</li>
                                        <li className={styles.icon_friends} onClick={this.frShare}>朋友圈</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <PreLoad/>
                        {loading?(
                            <div className={styles.loadingFrame}>
                                <div className={styles.loading}></div>
                            </div>
                        ):null}

                    </div>
                </div>
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {saveQRcode, shareECard, getQrCodeInfo};
}

module.exports = connect(null, injectAction())(CalendarCard);
