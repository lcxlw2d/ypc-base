import {connect} from 'react-redux';
import {choosePhoto, warn} from '../../../../actions/home/attend/edit/editAction';

import AttendImage from './AttendImage';
import AlbumSelect from './AlbumSelect';
import VisitScope from './VisitScope';
import ServerEditItem from '../../../../components/client/detail/ServerEditItem';
import styles from '../../../css/home/attend/edit/attendInfoEdit.css';

const MAX_PHOTO_SIZE = 5;

class AttendInfoEdit extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            showSelect:false,
            showVisitScope:false
        }
    }

    //渲染图片
    renderImgs(){
        var {imgs=[]} = this.props;
        return imgs.map((item)=>{
            var {url, attachmentId, attachmentIdSmall, urlSmall} = item;
            return (
                <AttendImage key={url} url={url} attachmentId={attachmentId} attachmentIdSmall={attachmentIdSmall} canDel={true} urlSmall={urlSmall} onDelete={this.deletePic}/>
            )
        });
    }

    //删除图片
    deletePic = (attachmentId, url)=>{
        var array = [],
            {imgs, onImageChange} = this.props;

        for(var i=0;i<imgs.length;i++){
            var item = imgs[i];
            if(item.attachmentId != attachmentId || item.url != url){
                array.push(item);
            }
        }

        onImageChange && onImageChange(array);
    }

    //输入框文本改变
    textChange = (e)=>{
        var {onTextChange} = this.props,
            {value} = e.target;

        onTextChange && onTextChange(value);
    }

    //点击添加附件
    addImage = ()=>{
        var {imgs} = this.props;
        if(imgs.length >= MAX_PHOTO_SIZE){
            this.props.warn("最多只能选"+MAX_PHOTO_SIZE+"张照片");
            return;
        }
        this.setState({showSelect:true});
    }

    //关闭图片选择
    closeSelect = ()=>{
        this.setState({showSelect:false});
    }

    //点击拍照
    cameraClick = ()=>{
        this.props.choosePhoto({
            type:1,
            remain:50
        }, this.update);
        this.closeSelect();
    }

    //点击相册
    albumClick = ()=>{
        var {imgs} = this.props;
        this.props.choosePhoto({
            type:0,
            remain:MAX_PHOTO_SIZE - imgs.length
        }, this.update);
        this.closeSelect();
    }

    //选择照片后回调
    update = (url)=>{
        var {imgs, onImageChange} = this.props,
            array = imgs.concat(url.map((item)=>{
                return {
                    url:item,
                    attachmentId:"",
                    urlSmall:item
                }
            }));
        onImageChange && onImageChange(array);
    }

    chooseTheme = (e)=>{
      var {servTypeClick} =this.props;
      servTypeClick && servTypeClick();
      e.stopPropagation();
    }
    //显示可见范围
    showScope = ()=>{
        this.setState({showVisitScope:true});
    }

    //选择scope
    selectScope = (scope)=>{
        var {onScopeChange} = this.props;
        onScopeChange && onScopeChange(scope);
    }

    //点击记录
    recordClick = ()=>{
        var {hasClient, disabledSync, sync, onSyncChange} = this.props;
        if(disabledSync) return;
        if(!hasClient){
            this.props.warn("友情提醒：请先选择本次拜访客户，系统会将本条奋斗足迹同步至服务记录。", 4000);
            return;
        }
        onSyncChange && onSyncChange(!sync);
    }

    //关闭可见范围
    scopeClose = ()=>{
        this.setState({showVisitScope:false});
    }

    render(){
        systemApi.log("AttendInfoEdit render");

        var {value, imgs, scope, sync, hasClient, disabledSync,servThemeName="请选择服务主题"} = this.props,
            {showSelect, showVisitScope} = this.state;


        return (
            <div>
                <div className={styles.atten_summary}>
                    <textarea placeholder="输入拜访总结" maxLength="500" value={value} onChange={this.textChange}></textarea>
                    <div className={styles.photoBox}>
                        <button onClick={this.addImage}></button>
                        <div className={styles.images}>
                            {this.renderImgs()}
                        </div>
                    </div>
                    <div className={styles.tip}>最多可输入<span className={Color.blue}>500</span>个字</div>
                </div>
                <div className={this.mergeClassName(styles.atten_cust, styles.noborder)} onClick={this.showScope}>
                    <i className={styles.scope}></i>
                    <span className={styles.mid}>谁可以看</span>
                    <span className={styles.arrow}></span>
                    <span className={this.mergeClassName("right", styles.mr5)}>{scope=="1"?"团队内分享":"仅上级查阅"}</span>
                </div>

                <div className={this.mergeClassName(styles.atten_cust, styles.noborder, disabledSync||!hasClient?styles.disabled:"")} onClick={this.recordClick}>
                    <i className={styles.sync}></i>
                    <span className={styles.mid}>同步到服务记录</span>
                    <span className={this.mergeClassName(styles.checkbox, sync?styles.on:"")}></span>
                    {this.props.sync?<div className={styles.themeblock} onClick={this.chooseTheme}>
                      <span className={styles.themetitle}>服务主题:</span>
                      <div className={styles.themeInputBlock} >
                          <div  className={styles.themeInput} >{servThemeName}</div>
                      </div>
                      <i className={styles.inputArrow}></i>
                    </div>:null}

                </div>
                {showSelect?(
                    <AlbumSelect onClose={this.closeSelect} onCamera={this.cameraClick} onAlbum={this.albumClick}/>
                ):null}
                {showVisitScope?(
                    <VisitScope onSelect={this.selectScope} scope={scope} onClose={this.scopeClose}/>
                ):null}
            </div>

        );
    }

}

function injectAction(){
    return {choosePhoto, warn};
}

module.exports = connect(null, injectAction())(AttendInfoEdit);
