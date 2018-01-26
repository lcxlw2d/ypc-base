import ImageLoad from '../../../../../components/common/carousel/ImageLoad';
import ImagePreview from './edit/ImagePreview';

import styles from '../../css/home/attend/itemImage.css';

class ItemImage extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showPrevie:false
        }
    }

    imgClick = (e)=>{
        this.setState({showPreview:true});
        e.stopPropagation();
    }

    imgClose = ()=>{
        this.setState({showPreview:false});
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ItemImage render");

        var {url, urlSmall} = this.props,
            {showPreview} = this.state;

        return (
            <span>
                <ImageLoad className={styles.attendance_intr_pimg} useDft={true} url={urlSmall} onClick={this.imgClick}/>
                {showPreview?(
                    <ImagePreview url={url} onClose={this.imgClose}/>
                ):null}
            </span>

        );
    }
}



module.exports = ItemImage;
