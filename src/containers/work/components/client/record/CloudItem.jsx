import {connect} from 'react-redux';
import styles from '../../css/client/record/RecordItem.css';
import {recordJumpService} from './../../../../../store/actions';
// import {getNameAndFundAccount} from './../../../actions/client/record/recordAction';
class CloudItem extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isPlay: false,
            audio: null,
            startTime: "00:00:00",
            recordingUrlTrue:"",
            pStyle: {},
            ballStyle: {},
            nameData:{},
        }
    }

    //查看添加服务记录
    toServerAdd = () => {
        var {clientId}=this.props;
        clientId?Event.fire("event_get_cloud_fundAccount",{clientId,cb:this.toServerAddCb}):this.toServerAddCb2();


    }

    toServerAddCb=(nameData)=>{
        this.setState({
            nameData
        }, () => {
            var {clientName, fundAccount} = this.state.nameData, {clientId, type,clientTel,recordingInnerId,recordingBegindate,recordingRuntime,callType,callTypevalue,potentialId=''} = this.props, params={};
            var newDate = new Date(recordingBegindate);
            recordingBegindate = this.formatDate(newDate);
            recordingRuntime = this.formatTime(recordingRuntime);
            params =  {
                clientId,
                clientName,
                fundAccount,
                clientTel,
                recordingInnerId,
                recordingBegindate,
                recordingRuntime,
                callType,
                callTypevalue
            };
            this
                .props
                .recordJumpService("/work/client/record/" + type, params, "/work/client/addPotential/add")
        })
    }

    toServerAddCb2 = ()=> {
        var {clientId='', type,clientTel,recordingInnerId,recordingBegindate,recordingRuntime,callType,callTypevalue, clientName='',potentialId=''} = this.props, params={};
        var newDate = new Date(recordingBegindate);
        recordingBegindate = this.formatDate(newDate);
        recordingRuntime = this.formatTime(recordingRuntime)
                    params =  {
                        clientId,
                        clientName,
                        clientTel,
                        clientType:2,
                        recordingInnerId,
                        recordingBegindate,
                        recordingRuntime,
                        callType,
                        callTypevalue,
                        potentialId,
                        fundAccount:'未转正'
                    };
        this
            .props
            .recordJumpService("/work/client/record/" + type, params, "/work/client/addPotential/add")
    }

    //查看已匹配服务记录
    toServer = () => {
        var {recordingInnerId}=this.props;
        Event.fire("event_get_cloud_servid",{recordingInnerId,cb:this.toServerCb})

    }

    toServerCb=(nameData)=>{
         this.setState({
            nameData
        }, () => {
         var {servId} = this.state.nameData, {clientId, type} = this.props;
         servId="/work/client/detail/server/detail/"+servId;
        this
            .props
            .recordJumpService("/work/client/record/" + type, {
                clientId
            },servId)
       })
    }

    //转化时间戳
    formatDate = (now) => {
        var year = now.getFullYear(),
            month = now.getMonth() + 1,
            date = now.getDate(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
        return year + "-" + this.formatNum(month) + "-" + this.formatNum(date) + "   " +  this.formatNum(hour) + ":" + this.formatNum(minute) + ":" +  this.formatNum(second);
    }

 //==============================音频播放=======================================
    componentDidMount() {
        var {index,recordingRuntime} = this.props,
            audio = this.refs["cloundRecordItemAudio" + index],
            that = this;
        this._barWidth = $(this.refs["cloundProgress" + index]).width() - 50;
        this._ballMove = false;
        this._start2 = 0;
        this._startX2 = 0;
        this._deltaX2 = 0;
        $(audio)
            .bind("timeupdate", function () {

                if (this._ballMove)
                    return;
                var currentTime = this.currentTime,
                   // duration = this.duration;
                   duration = recordingRuntime;
                if (audio.ended) {
                    that.setState({isPlay: false})
                    audio.currentTime = 0;
                } else {
                    let startTime = that.formatTime(currentTime);
                    that.left_width = (currentTime / duration) * 100 + "%";
                    that.setState({
                        startTime,
                        ballStyle: {
                            left: that.left_width
                        },
                        pStyle: {
                            width: that.left_width
                        }
                    });
                }
            });
    }

    formatNum=(num)=> {
            return + num < 10
                ? "0" + num
                : num;
        }

     formatTime=(time)=> {
            time = Math.round(time);
            var minute=time>3600?time%3600:time;
            return this.formatNum(Math.floor(time / 3600)) + ":" + this.formatNum(Math.floor(minute / 60)) + ":" + this.formatNum(time % 60);
        }

    ballTouchStart = (e) => {
        var {index,recordingRuntime} = this.props,
            audio = this.refs["cloundRecordItemAudio" + index],
            touches = e.touches;
        if (touches.length != 1) return;
        this._ballMove = true;
       // console.log("this._barWidth"+this._barWidth)
        //this._start2 = audio.currentTime / audio.duration * this._barWidth;
        this._start2 = audio.currentTime / recordingRuntime * this._barWidth;
        this._startX2 = touches[0].clientX;
    }

    ballTouchMove = (e) => {
        var {index,recordingRuntime} = this.props,
            audio = this.refs["cloundRecordItemAudio" + index],
            percent = 0,
            touches = e.touches;
        if (touches.length != 1) return;
        this._deltaX2 = touches[0].clientX - this._startX2;
        percent = (this._start2 + this._deltaX2) / this._barWidth;
        //audio.currentTime = audio.duration * percent;
        //console.log("percent"+percent+"recordingRuntime"+recordingRuntime)
        if(percent>=1){
            this.setState({isPlay: false})
            audio.currentTime = 0;
        }else{
            audio.currentTime = recordingRuntime * percent;
        }
      // console.log( this._start2)
    }

    ballTouchEnd = (e) => {
        this._ballMove = false;
        this._start2 = 0;
        this._startX2 = 0;
        this._deltaX2 = 0;
    }

    //关闭录音播放
    closeRecord = () => {
        var {isPlay} = this.state, {index} = this.props,
            audio = this.refs["cloundRecordItemAudio" + index];
        this.setState({isPlay: false});
        audio.pause();
    }

    //切换播放状态
    switchPlay = e => {
        var {isPlay} = this.state,{recordingUrl}=this.props;
        this._moveAudio = false;
        this.setState({
            isPlay: !isPlay
        }, () => {
            var {isPlay} = this.state, {close, index} = this.props,
                audio = this.refs["cloundRecordItemAudio" + index];
            if (isPlay) {
                this.setState({recordingUrlTrue:recordingUrl},()=>{
                    audio.play();
                })
                close && close(index);
            } else {
                audio.pause();
            }
            this.props.onRefresh();
        });
        e.stopPropagation()
    }
    //=============================================================================

    render() {
        var {
                isPlay,
                isSelected,
                endTime,
                startTime,
                pStyle,
                ballStyle,
                recordingUrlTrue
            } = this.state, {
                recordingFilename,
                recordingRuntime,
                callTypevalue,
                recordingBegindate,
                matchStatus,
                recordingInnerId,
                recordingUrl,
                recordingFileSize,
                index
            } = this.props
        var newDate = new Date(recordingBegindate);
        recordingBegindate = this.formatDate(newDate);
        recordingFileSize = recordingFileSize > 0
            ? recordingFileSize < 1024
                ? Math.ceil(recordingFileSize) + "K"
                : Math.ceil(recordingFileSize / 1024) + "M"
            : null;
        matchStatus = matchStatus==0
            ? "未匹配"
            : "已匹配";
        recordingRuntime = this.formatTime(recordingRuntime);

        return (
            <div className={styles.my_recording_inner} ref={"cloundProgress" + index}>
                <audio ref={"cloundRecordItemAudio" + index} src={recordingUrlTrue}></audio>
                <div className={styles.recording_int}>
                    <div className={styles.rec_text}>
                        <p className={styles.font15}>{recordingFilename}</p>
                        <p className={Color.c6}>
                            <span>{recordingBegindate}</span>
                        </p>
                        <p className={Color.c6}>
                            <span>{recordingRuntime}</span>&nbsp;&nbsp;<span>{recordingFileSize}</span>&nbsp;&nbsp;<span
                                className={matchStatus == "已匹配"
                ? Color.red
                : null}>{matchStatus}</span>
                        </p>
                    </div>
                    <div
                        className={isPlay
                        ? styles.btn_stop_c
                        : styles.btn_play_c}
                        onClick={this.switchPlay}></div>
                    {matchStatus == "已匹配"
                        ? <div className={styles.btn_look} onClick={this.toServer}></div>
                        : <div onClick={this.toServerAdd} className={styles.btn_matching}></div>}
                </div>
                {isPlay
                    ? <div className={styles.list_time_pr}>
                            <div className={styles.time_progress}>
                                <div className={styles.progress}>
                                    <p className={styles.bar} style={pStyle}></p>
                                    <div
                                        className={styles.btn}
                                        style={ballStyle}></div>
                                </div>
                            </div>
                            <div className={styles.time}>
                                {/*<!--当前时间-->*/}
                                <span className={styles.now_time}>{startTime}</span>
                                {/*<!--总的时间-->*/}
                                <span className={styles.all_time}>{recordingRuntime}</span>
                            </div>
                        </div>
                    : null}
            </div>
        )
    }
}

function injectAction() {
    return {recordJumpService};
}

module.exports = connect(null, injectAction(),null,{ withRef: true })(CloudItem);