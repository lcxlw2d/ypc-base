import ImagePreview from './ImagePreview';

import styles from '../../../css/home/attend/edit/attendImage.css';

class AttendImage extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            showPreview:false
        }
    }

    //点击图片
    imgClick = ()=>{
        this.setState({showPreview:true});
    }

    //关闭预览
    closePreview = ()=>{
        this.setState({showPreview:false});
    }

    delete = (attachmentId, url)=>{
        var {onDelete} = this.props;
        this.setState({showPreview:false});
        onDelete && onDelete(attachmentId, url);
    }

    render(){
        systemApi.log("AttendImage render");

        var {url,attachmentId, attachmentIdSmall, urlSmall, canDel, big} = this.props,
            {showPreview} = this.state,
            style = {
                backgroundImage:"url("+urlSmall+")"
            };

        return (
            <div className={styles.attendimg}>
                <div className={this.mergeClassName(styles.img, big?styles.big:"")} style={style} onClick={this.imgClick}></div>
                {showPreview?(<ImagePreview onDelete={this.delete} url={url} attachmentId={attachmentId} attachmentIdSmall={attachmentIdSmall} canDel={canDel} onClose={this.closePreview}/>):null}
            </div>
        );
    }

}

module.exports = AttendImage;
