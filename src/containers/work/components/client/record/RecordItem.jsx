import styles from '../../css/client/record/RecordItem.css';
// import {deleteLocalRecordFile,renameLocalRecordFileName} from
// './../../../actions/client/record/recordAction';

class RecordItem extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isPlay: false,
            isSelected: false,
            x: 0,
            animate: false,
            audio: null,
            startTime: "00:00:00",
            pStyle: {},
            ballStyle: {}
        }
        this.updata = true;
    }

    //重命名
    renameLocalRecordFileName = () => {
        var {title, rename,index} = this.props;
        this
            .props
            .renameLocalRecordFileName(title, rename,index);
    }

    //删除
    deleteLocalRecordFile = () => {
        var {title,index} = this.props;
        this
            .props
            .deleteLocalRecordFile(title,index);
    }

    //切换是否上传
    isSelected = () => {
        var {isSelected} = this.state, {item} = this.props;
        this.setState({
            isSelected: !isSelected
        }, () => {
            var {isSelected} = this.state;
            if (isSelected) {
                this
                    .props
                    .addItems(item);
            } else {
                this
                    .props
                    .removeItems(item);
            }
        });
    }

    //图标缩回
    iconBack = () => {
        this.setState({x: 0, animate: true});
        setTimeout(() => {
            this.setState({animate: false});
        }, 200);
    }

    touchStart = (e) => {
        var {onOpen, index} = this.props,
            touch = e.touches[0];
        this._startX = touch.pageX; //记录滑动起点
        this._startY = touch.pageY; //记录滑动起点
        this._fixX = this.state.x; //记录本次滑动初始偏移量
        this._first = true; //标记是否是滑动的第一个点
        this._move = false; //true：item滑动；false：不滑动
        this._lastX = this._startX;
        this._slideDirection = "right";
        this._max = -132;

        //打开当前item，关闭其余item
        onOpen && onOpen(index);
    }
    //滑动回调
    touchMove = (e) => {
        var {isPlay} = this.state,
            touch = e.touches[0], {pageX, pageY} = touch,
            deltaY = pageY - this._startY,
            deltaX = pageX - this._startX;

        if (isPlay) {
            return
        }
        //滑动的第一个点时判断是要显示右侧图标还是上下拉刷新
        if (this._first) {
            this._move = Math.abs(deltaX) > Math.abs(deltaY)
                ? true
                : false;
            this._first = false;
        }

        if (this._move) {
            var xc = this._fixX + deltaX;
            if (xc < this._max) {
                xc = this._max;
            } else if (xc > 0) {
                xc = 0;
            }
            this.setState({x: xc, animate: false});
            this._slideDirection = pageX > this._lastX
                ? "right"
                : "left";
            this._lastX = pageX;
            e.stopPropagation();
        }

    }
    touchEnd = (e) => {
        if (this._move) {
            var deltaX = this._startX - this._lastX,
                xc = this._slideDirection == "left" && deltaX > 30
                    ? this._max
                    : 0;
            this.setState({x: xc, animate: true});
            setTimeout(() => {
                this.setState({animate: false});
            }, 200);
            e.stopPropagation();
        }
        this._move = false;
    }

    //转化时间戳
    formatDate = (now) => {
        var year = now.getFullYear(),
            month = now.getMonth() + 1,
            date = now.getDate(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
        return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
    }

    endWith = (Reg, str) => {
        let reg=new RegExp(Reg+"$");
        return reg.test(str);
    }
    //==============================音频播放=======================================
    componentDidMount() {
        var {index} = this.props,
            audio = this.refs["LocalRecordItemAudio" + index],
            that = this;
        this._barWidth = $(this.refs["LocalProgress" + index]).width() - 50;
        this._ballMove = false;
        this._start2 = 0;
        this._startX2 = 0;
        this._deltaX2 = 0;
        function formatNum(num) {
            return + num < 10
                ? "0" + num
                : num;
        }

        function formatTime(time) {
            time = Math.round(time);
            var minute=time>3600?time%3600:time;
            return formatNum(Math.floor(time / 3600)) + ":" + formatNum(Math.floor(minute / 60)) + ":" + formatNum(time % 60);
        }

        $(audio)
            .bind("timeupdate", function () {
                if (this._ballMove)
                    return;
                var currentTime = this.currentTime,
                    duration = this.duration;
                if (audio.ended) {
                    that.setState({isPlay: false})
                    audio.currentTime = 0;
                } else {
                    let startTime = formatTime(currentTime);
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

    ballTouchStart = (e) => {
        var {index} = this.props,
            audio = this.refs["LocalRecordItemAudio" + index],
            touches = e.touches;
        if (touches.length != 1)
            return;
        this._ballMove = true;
        this._start2 = audio.currentTime / audio.duration * this._barWidth;
        this._startX2 = touches[0].clientX;
    }

    ballTouchMove = (e) => {
        var {index} = this.props,
            audio = this.refs["LocalRecordItemAudio" + index],
            percent = 0,
            touches = e.touches;
        if (touches.length != 1)
            return;
        this._deltaX2 = touches[0].clientX - this._startX2;
        percent = (this._start2 + this._deltaX2) / this._barWidth,
        audio.currentTime = audio.duration * percent;
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
            audio = this.refs["LocalRecordItemAudio" + index];
        this.setState({isPlay: false});
        audio.pause();
    }

    //切换播放状态
    switchPlay = e => {
        var {isPlay} = this.state;
        this._moveAudio = false;
        //this._barWidth=this.refs["progress"].width;
        this.setState({
            isPlay: !isPlay
        }, () => {
            var {isPlay} = this.state, {close, index} = this.props,
                audio = this.refs["LocalRecordItemAudio" + index];
            if (isPlay) {
                audio.play();
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
                ballStyle
            } = this.state, {
                title,
                time,
                url,
                durate,
                size,
                index,
                rename
            } = this.props;
        rename = this.endWith(".mp3", rename)?rename:rename+".mp3";
        size = size > 0
            ? size < 1024
                ? size + "B"
                : size < 1048576
                    ? Math.ceil(size / 1024) + "K"
                    : Math.ceil(size / 1048576) + "M"
            : null;
        var {x, animate} = this.state,
            style = {
                transform: "translateX(" + x + "px)",
                MsTransform: "translateX(" + x + "px)",
                /* IE */
                MozTransform: "translateX(" + x + "px)",
                /* Firefox */
                WebkitTransform: "translateX(" + x + "px)",
                /* Safari 和 Chrome */
                OTransform: "translateX(" + x + "px)"
            };

        if (animate) {
            style = Object.assign(style, {
                WebkitTransition: "-webkit-transform 0.2s",
                transition: "transform 0.2s",
                MsTransition: "-ms-transform 0.2s",
                /* IE 9 */
                MozTransition: "-moz-transform 0.2s",
                /* Firefox */
                OTransition: "-o-transform 0.2s"
            });
        }

        return (
            <div
                className={styles.my_recording_inner}
                style={style}
                ref={"LocalProgress" + index}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
                 onClick={this.isSelected}>
                <audio ref={"LocalRecordItemAudio" + index} src={url}></audio>
                <div className={styles.recording_int}>
                    <div
                        className={isSelected
                        ? styles.rec_choose_on
                        : styles.rec_choose}></div>
                    <div className={styles.rec_text}>
                        <p className={styles.font15}>{rename}</p>
                        <p className={Color.c6}>
                            <span>{time}</span>
                        </p>
                        <p className={Color.c6}>
                            <span>{durate}</span>&nbsp;&nbsp;<span>{size}</span>
                        </p>
                    </div>
                    <div
                        className={isPlay
                        ? styles.btn_stop
                        : styles.btn_play}
                        onClick={this.switchPlay}></div>
                </div>
                {isPlay
                    ? <div className={styles.list_time_pr}>
                            <div className={styles.time_progress}>
                                <div className={styles.progress}>
                                    <p className={styles.bar} style={pStyle}></p>
                                    <div
                                        className={styles.btn}
                                        style={ballStyle}
                                        onTouchStart={this.ballTouchStart}
                                        onTouchMove={this.ballTouchMove}
                                        onTouchEnd={this.ballTouchEnd}></div>
                                </div>
                            </div>
                            <div className={styles.time}>
                                {/*<!--当前时间-->*/}
                                <span className={styles.now_time}>{startTime}</span>
                                {/*<!--总的时间-->*/}
                                <span className={styles.all_time}>{durate}</span>
                            </div>
                        </div>
                    : null}
                <div className={styles.hide_btn}>
                    <a className={styles.hide_btn_ico01} onClick={this.deleteLocalRecordFile}>
                        <i></i>删除</a>
                    <a className={styles.hide_btn_ico02} onClick={this.renameLocalRecordFileName}>
                        <i></i>重命名</a>
                </div>
            </div>
        )
    }
}

function injectAction() {
    return {};
}

module.exports = RecordItem;