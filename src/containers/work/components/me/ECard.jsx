import {connect} from 'react-redux';
import {saveQRcode, shareECard, getQrCodeInfo, saveRemark} from '../../actions/me/meAction';

import FullScreenView from '../../../../components/fullscreen/FullScreenView';
import PreLoad from './PreLoad';

import styles from '../css/me/eCard.css';

const themes = ["business","young","iron","lady","hot","wood","newyear","planet","fu"];

class ECard extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            showDesc: false,
            userName: "-",
            mobile: "",
            headImgQrCode: "",
            organizationName: "-",
            remark: "",
            openAccountQrCode: "",
            userType:2,
            loading:false,
            theme:systemApi.getValue("ECARD_THEME")
        }
    }

    componentDidMount() {
        var {branchNo,forceFresh} = this.props;
        this.setState({loading:true});
        this.props.getQrCodeInfo({branchNo,forceRefresh:forceFresh},this, this.update, this.errcb);
    }

    update = (data) => {
        var {openAccountQrCode} = data;
        if(openAccountQrCode){
            this.setState(Object.assign(data,{loading:false}));
        }
        else{
            this.closeWindow();
        }
    }

    errcb = ()=>{
        this.setState({loading:false});
        this.closeWindow();
    }

    //关闭窗口
    closeWindow = () => {
        var {onClose} = this.props;
        onClose();
    }

    //点击分享
    shareClick = (type) => {
        this.props.shareECard(type, this, () => {});

    }
    //微信分享
    wxShare = (e) => {
        this.shareClick("wechat");
        e.stopPropagation();
    }

    //朋友圈分享
    frShare = (e) => {
        this.shareClick("friend");
        e.stopPropagation();
    }

    //qq分享
    qqShare = (e) => {
        this.shareClick("qq");
        e.stopPropagation();
    }

    //编辑框改变
    editChange = (e) => {
        var {value} = e.target;
        this.setState({remark: value});
    }

    //点击编辑自我介绍
    editSelf = (e) => {
        this.oldValue = this.state.remark;
        this.setState({showDesc: true});
        setTimeout(() => {
            $(this.refs.descInput).focus();
        }, 0);
        e.stopPropagation();
    }

    //组织冒泡
    stopProp = (e) => {
        e.stopPropagation();
    }

    //点击任意区域，如果处于编辑状态，提交请求；否则关闭窗口
    frameClick = () => {
        var {showDesc, remark} = this.state;
        if (showDesc) {
            this.setState({showDesc: false});
            if (this.oldValue != remark) {
                this.props.saveRemark(remark, this);
            }
        } else {
            this.closeWindow();
        }
    }

    //备注点击回车
    inputKeyUp = (e)=>{
        var {keyCode} = e.nativeEvent,
            {remark} = this.state;
        if(keyCode == 13){
            this.setState({showDesc: false});
            if (this.oldValue != remark) {
                this.props.saveRemark(remark, this);
            }
        }
    }

    getThemeIndex = ()=>{
        var {theme} = this.state;
        for(var i=0;i<themes.length;i++){
            if(themes[i]==theme)
                return i;
        }
        return 0;
    }

    //切换主题
    changeTheme = (e)=>{
        var index = this.getThemeIndex(),
            length = themes.length,
            nextIndex = index>=length-1?0:index+1;

        this.setState({theme:themes[nextIndex]});
        systemApi.setValue("ECARD_THEME",themes[nextIndex]);
        e.stopPropagation();
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
        systemApi.log("ECard render");

        var {
            desc,
            showDesc,
            userName,
            mobile,
            headImgQrCode,
            organizationName,
            remark,
            openAccountQrCode,
            loading,
            theme,
            userType
        } = this.state;

        return (
            <FullScreenView transparent={true}>
                {openAccountQrCode!=""?(<div ref="fulldiv" className={styles.frame} onClick={this.frameClick}>
                    <div className={this.mergeClassName(styles.ecard_box, styles[theme])}>
                        <div ref="showdiv" className={this.mergeClassName(styles.ecard_frame, styles[theme])}>
                            <div className={styles.ec_user}>
                                <img src={"data:image/png;base64," + headImgQrCode} onError={(e) => {
                                    e.target.src = './images/work/me/user_01.png'
                                }}/>
                                <div className={styles.ec_intro} ref="descFrame">
                                    <p>
                                        <span className={this.mergeClassName(styles.font16, Font.font16)}>{userName}</span>
                                        <span>{mobile}</span>
                                    </p>
                                    <p>{organizationName}</p>
                                    {userType==1?(
                                        <div>
                                            <p className={!showDesc? styles.hidden: ""}>
                                                <input ref="descInput" placeholder="介绍一下你自己" className={styles.edit} onKeyUp={this.inputKeyUp} value={remark} onChange={this.editChange} maxLength="30" onClick={this.stopProp}/>
                                            </p>
                                            {!remark && !showDesc
                                                ? (
                                                    <p className={this.mergeClassName(Color.blue, styles.editSelf)} onClick={this.editSelf}>介绍一下你自己</p>
                                                )
                                                : null}
                                            {remark && !showDesc
                                                ? (
                                                    <p className={this.mergeClassName(styles.editSelf, Color.c9)} onClick={this.editSelf}>{remark}</p>
                                                )
                                                : null}
                                        </div>
                                    ):null}
                                </div>
                            </div>
                            <div className={styles.ec_erweima}>
                                <img src={"data:image/png;base64," + openAccountQrCode}/>
                            </div>
                            <div className={styles.ec_center}>扫一扫上面的二维码,轻松开户</div>
                            <div className={styles.xybg}></div>
                        </div>
                        <div className={styles.ec_btns}>
                            <div className={styles.btn_share} onClick={this.share}>
                                <a>分享至:</a>
                                <div className={styles.share_icons}>
                                    <ul>
                                        <li className={styles.icon_weixin} onClick={this.wxShare}>微信</li>
                                        <li className={styles.icon_friends} onClick={this.frShare}>朋友圈</li>
                                        {/*<li className={styles.icon_qq} onClick={this.qqShare}>QQ</li>*/}
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.refresh} onClick={this.refresh}>重新生成</div>
                            <div className={styles.changetheme} onClick={this.changeTheme}>随心换</div>
                        </div>
                        <PreLoad/>
                        {loading?(
                            <div className={styles.loadingFrame}>
                                <div className={styles.loading}></div>
                            </div>
                        ):null}

                    </div>
                </div>):null}
            </FullScreenView>
        );
    }

}

function injectAction() {
    return {saveQRcode, shareECard, getQrCodeInfo, saveRemark};
}

module.exports = connect(null, injectAction())(ECard);
