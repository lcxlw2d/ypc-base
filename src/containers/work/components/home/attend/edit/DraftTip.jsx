import FullScreenView from '../../../../../../components/common/fullscreen/FullScreenView';
import ImageLoad from '../../../../../../components/common/carousel/ImageLoad';

import styles from '../../../css/home/attend/edit/draftTip.css';

class DraftTip extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    render(){
        systemApi.log("DraftTip render");

        return (
            <div className={styles.draft_save_tip}>
                <p>位置和时间已记录，可先保存，稍后再补充内容</p>
                <div className={styles.arrow_bottom}>
                    <b className={styles.bottom}>
                        <i className={styles.bottom_arrow1}></i>
                        <i className={styles.bottom_arrow2}></i>
                    </b>
                </div>
            </div>
        );
    }

}

module.exports = DraftTip;
