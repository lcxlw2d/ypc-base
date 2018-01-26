import {connect} from 'react-redux';
import {deletePic} from '../../../../actions/home/attend/edit/editAction';

import FullScreenView from '../../../../../../components/common/fullscreen/FullScreenView';
import ImageLoad from '../../../../../../components/common/carousel/ImageLoad';

import styles from '../../../css/home/attend/edit/imagePreview.css';

class ImagePreview extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            clicked:false
        }
    }

    componentDidMount(){
        setTimeout(()=>{ this.setState({clicked:true}); },500);
    }

    imgClick = ()=>{
        var {onClose} = this.props,
            {clicked} = this.state;
        if(!clicked) return;
        onClose && onClose();
    }

    //点击删除
    delClick = (e)=>{
        var {attachmentId, attachmentIdSmall} = this.props;
        this.props.deletePic({attachmentId, attachmentIdSmall}, this, this.update);
        e.stopPropagation();
    }

    update = ()=>{
        var {onDelete, attachmentId, url} = this.props;
        onDelete && onDelete(attachmentId, url);
    }

    render(){
        systemApi.log("ImagePreview render");

        var {url,canDel} = this.props;

        return (
            <FullScreenView>
                <ImageLoad className={styles.frame} useDft={true} url={url} onClick={this.imgClick}/>
                {canDel?(
                    <div className={styles.delete} onClick={this.delClick}></div>
                ):null}
            </FullScreenView>
        );
    }

}

function injectAction(){
    return {deletePic}
}

module.exports = connect(null, injectAction())(ImagePreview);
