import {connect} from 'react-redux';
import ServerRecordItem from './ServerRecordItem';
import styles from '../../css/client/detail/serverRecord.css';

class ServerRecord extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    phoneMask(phone){
        if(!phone) return;
        var length = phone.length,
            start = Math.floor(length/2)-2;
        if(length <= 4) return phone;
        return phone.substring(0,start)+"****"+phone.substring(start+4);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ServerRecord render");

        var {callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue} = this.props;

        return (
            <div className={styles.recruit_record}>
                <div className={styles.edit_phone_box}>
                    <ServerRecordItem title="通话方式" text={callTypevalue} />
                    {passageTel?<ServerRecordItem title="本地电话" text={passageTel} />:null}
                    <ServerRecordItem title="客户电话" text={this.phoneMask(clientTel)} />
                    <ServerRecordItem title="通话时长" text={recordingRuntimeValue} />
                    <ServerRecordItem title="通话开始时间" text={recordingBegindatevalue} />
                    <div className={this.mergeClassName(styles.arrow_top, styles.arrow_box)}>
                        <b className={styles.edit_top}>
                            <i className={styles.top_arrow1}></i>
                            <i className={styles.top_arrow2}></i>
                        </b>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = ServerRecord;
