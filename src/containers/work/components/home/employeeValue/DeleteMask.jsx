
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import styles from '../../css/home/employeeValue/honors.css';

class AlbumSelect extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //点击拍照
    deleteFunc = ()=>{
        var {onDelete} = this.props;
        onDelete && onDelete();
        this.closeFunc();
    }



    //点击取消
    closeFunc = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    render(){

        systemApi.log("AlbumSelect render");

        return (
            <FullScreenView mask={true}>
                <div className={styles.operationlist} >
                    <a className={Color.red} onClick={this.deleteFunc} >删除</a>
                    <a  onClick={this.closeFunc} >取消</a>
                </div>

            </FullScreenView>
        );
    }

}

module.exports = AlbumSelect;
