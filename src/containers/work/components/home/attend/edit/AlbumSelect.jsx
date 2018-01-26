import AttendImage from './AttendImage';

import FullScreenView from '../../../../../../components/common/fullscreen/FullScreenView';

import styles from '../../../css/home/attend/edit/albumSelect.css';

class AlbumSelect extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //点击拍照
    cameraClick = ()=>{
        var {onCamera} = this.props;
        onCamera && onCamera();
        !onCamera && this.close();
    }

    //点击拍照
    albumClick = ()=>{
        var {onAlbum} = this.props;
        onAlbum && onAlbum();
        !onAlbum && this.close();
    }

    //点击取消
    close = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    render(){

        systemApi.log("AlbumSelect render");

        var {value} = this.props;

        return (
            <FullScreenView mask={true}>
                <div className={styles.box}>
                    <div className={styles.camera} onClick={this.cameraClick}>拍照</div>
                    <div className={styles.album} onClick={this.albumClick}>相册</div>
                    <div className={styles.cancel} onClick={this.close}>取消</div>
                </div>
            </FullScreenView>
        );
    }

}

module.exports = AlbumSelect;
