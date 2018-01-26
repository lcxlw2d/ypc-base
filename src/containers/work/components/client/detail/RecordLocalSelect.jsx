import {connect} from 'react-redux';
import {getServerCloudList, showWarning} from '../../../actions/client/summary/serverAction';
import Paper from '../../../../../components/common/paper/Paper';
import styles from '../../css/client/detail/recordSelect.css';

class RecordSelect extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = Object.assign(this.state,{
            selected:"",
            playId:"",
            playStatus:false,
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({data:[]});
        super.componentWillReceiveProps(nextProps);
    }

    updateList = (isAppend, data, hasMore) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        if(isAppend){
            this.setState({data:list});
        }
        else{
            this.setState({data:list, selected:""});
        }
    }

    getData(startIndex, isAppend, cb, props) {
        var {search,searchType} = props;
        if(searchType==""){
               cb()
        }
        this.props.getServerCloudList({
            startIndex,
            clientTel:search,
            matchStatus:searchType,
            sort:"recordingBegindate",
            order:"desc",
            length:20
        }, isAppend, cb, this, this.updateList);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    //获取表格主体位置
    getTablistStyle(){
        return styles.tableList;
    }

    renderHeader() {
        return (
            <tr className={styles.tr}>
                <th width="30%">
                    <p>客户电话</p>
                    <p>通话时长</p>
                </th>
                <th width="30%">
                    <p>通话方式</p>
                    <p>通话时间</p>
                </th>
                <th width="40%" colSpan="2">
                    <p>匹配状态</p>
                </th>
            </tr>
        );
    }

    itemClick = (recordingInnerId,callTypevalue,clientTel,recordingRuntime,recordingBegindate,matchStatus,params,otherParams)=>(e)=>{
        var {onSelect, showWarning} = this.props;
        if(matchStatus == "0"){
            this.setState({selected:recordingInnerId});
            onSelect && onSelect(recordingInnerId,callTypevalue,clientTel,this.formatTime(recordingRuntime),recordingBegindate,params,otherParams);
        }
        else{
            showWarning("该录音已被匹配，请选择未匹配的录音");
        }
    }

    formatTime(time){
        return formatUtil.formatNum(Math.floor(time/3600))+":"+formatUtil.formatNum(Math.floor(time/60))+":"+formatUtil.formatNum(Math.floor(time%60));
    }

    mapToSecond(time){
        var times = time.split(":").reverse();
        return (+times[0]||0) + (+times[1]||0)*60 + (+times[2]||0)*3600;
    }

    stop = (e)=>{
        e.stopPropagation();
    }

    playClick = (recordingInnerId, duration, local, recordingUrl)=>{
        var that = this,
            move = false;

		function formatTime(time){
			time = Math.round(time);
			return that.formatTime(time);
		}

        return function(){
            var start, startX, deltaX,
                {playId} = that.state,
                recordId = "record"+recordingInnerId,
                audioId = "audio"+recordingInnerId,
                curAudio = $("#"+audioId)[0],
                prevAudio = $("#audio"+playId)[0],
                progressBar = that.refs["progressBar"+recordingInnerId],
                ball = that.refs["ball"+recordingInnerId],
                p = that.refs["p"+recordingInnerId],
                startTime = that.refs["startTime"+recordingInnerId],
                endTime = that.refs["endTime"+recordingInnerId],
                barWidth = $("body").width()-30;

            $(endTime).html(formatTime(duration));

            if(!$("#"+audioId).length){
                var curAudio = $('<audio id="'+audioId+'" src="'+recordingUrl+'"}></audio>')[0];
                $(curAudio).appendTo($("#"+recordId));
                $(curAudio).bind("timeupdate",function(){
    				if(move) return;
    				var currentTime = this.currentTime;
    				if(curAudio.ended){
    					curAudio.currentTime = 0;
                        that.setState({playStatus:false});
    				}
    				else{
    					$(startTime).html(formatTime(currentTime));
    					$(ball).css("left", (currentTime/(duration+0.5))*100+"%");
    					$(p).width((currentTime/(duration+0.5))*100+"%");
    				}
    			});

                if(local){
                    //服务端的录音不拖拽
                    $(ball).bind("touchstart",function(e){
        				var touches = e.originalEvent.touches,
                            left = $(this).css("left");
        				if(touches.length != 1) return;
        				move = true;
                        if(left.indexOf("%")!=-1)
                            start = $(this).css("left").replace(/%/g,"")*barWidth/100;
                        else
                            start = +$(this).css("left").replace(/px/g,"");
        				startX = touches[0].clientX;
                        deltaX = 0;
        			});

        			$(ball).bind("touchmove",function(e){
        				var touches = e.originalEvent.touches;
        				if(touches.length != 1) return;
        				deltaX = touches[0].clientX - startX;
        				var left = start+deltaX>barWidth?barWidth:(start+deltaX);
        				left = left<0?0:left;
        				$(ball).css("left", left+"px");
        			});

        			$(ball).bind("touchend", function(){
        				var percent = (start+deltaX)/barWidth;
        				move = false;
        				curAudio.currentTime = curAudio.duration*percent;
        			});
                }
            }

            if(playId == recordingInnerId){
                var {playStatus} = that.state;
                if(playStatus)
                    curAudio.pause();
                else
                    curAudio.play();
                that.setState({playStatus:!playStatus});
            }
            else{
                if(playId != ""){
                    if(prevAudio){
                        prevAudio.pause();
                        prevAudio.currentTime = 0;
                    }
                }
                curAudio.play();
                that.setState({playId:recordingInnerId,playStatus:true});
            }
        }
    }

    renderRename(fileName){
        return fileName + (fileName.lastIndexOf(".mp3")!=-1?"":".mp3");
    }

    renderList() {
        var {searchType} = this.props,
            {data, selected, playId, playStatus} = this.state;
        return data.map((item, index) => {
            if(searchType == ""){
                var local = true,
                    clientTel = item.phone,
                    recordingInnerId = item.md5,
                    recordingRuntime = this.mapToSecond(item.durate),
                    callTypevalue = "呼出",
                    recordingBegindate = item.time,
                    matchStatus = 0,
                    recordingUrl = item.url,
                    // params = {
                    //     md5:item.md5,recordingFile:item.title,callType:1,
                    //     recordingBeginDate:item.time,clientTel:item.phone,
                    //     clientId:item.clientId,fileName:this.renderRename(item.rename)
                    // },
                    params = {
                        md5:item.md5,recordingFile:item.title,callType:1,
                        recordingBeginDate:item.time,clientTel:item.phone,
                        fileName:this.renderRename(item.rename)
                    },
                    otherParams = {
                        url:recordingUrl,
                        title:item.title
                    };
                    if(item.clientId){
                        params['clientId'] = item.clientId;
                    }else if(item.potentialId){
                        params['potentialId'] = item.potentialId;
                    }
            }
            else{
                var {clientTel, recordingInnerId, recordingRuntime, callTypevalue, recordingBegindate, matchStatus, recordingUrl} = item,
                    rootUrl = systemApi.getValue("rootUrl"),
                    nonce = systemApi.getValue("nonce"),
                    local = false,
                    params = null,
                    otherParams = null;
                recordingUrl = rootUrl+recordingUrl+"?nonce="+nonce;
                recordingBegindate = formatUtil.formatDate(recordingBegindate);
            }
            return [
                <tr className={this.mergeClassName(styles.item, selected==recordingInnerId?styles.selected:"")}
                    onClick={this.itemClick(recordingInnerId,callTypevalue,clientTel,recordingRuntime,recordingBegindate,matchStatus, params, otherParams)}>
                    <td width="30%">
                        <p>{clientTel}</p>
                        <p className={Color.c6}>{this.formatTime(recordingRuntime)}</p>
                    </td>
                    <td width="30%">
                        <p>{callTypevalue}</p>
                        <p className={Color.c6}>{recordingBegindate}</p>
                    </td>
                    <td width="30%">
                        <p className={Color.c6}>{matchStatus=="0"?"未匹配":"匹配"}</p>
                    </td>
                    <td width="10%" onClick={this.stop} id={"record"+recordingInnerId}>
                        <div className={this.mergeClassName(styles.btn, playId==recordingInnerId&&playStatus?styles.btn_stop:styles.btn_play)} onClick={this.playClick(recordingInnerId, recordingRuntime, local, recordingUrl)}></div>
                    </td>
                </tr>,
                <tr className={this.mergeClassName(styles.audioItem, selected==recordingInnerId?styles.selected:"")}>
                    <td colSpan="4">
                        <Paper show={playId==recordingInnerId}>
                            <div className={styles.audioFrame}>
                                <div className={styles.progressBar} ref={"progressBar"+recordingInnerId}>
                                    <div className={styles.bar}>
                                        <div className={styles.p} ref={"p"+recordingInnerId}></div>
                                    </div>
                                    <div ref={"ball"+recordingInnerId} className={styles.ball}></div>
                                </div>
                                <div ref={"startTime"+recordingInnerId} className={styles.startTime}></div>
                                <div ref={"endTime"+recordingInnerId} className={styles.endTime}></div>
                            </div>
                        </Paper>
                    </td>
                </tr>
            ];
        });
    }

}

function injectAction(){
    return {getServerCloudList, showWarning};
}

module.exports = connect(null, injectAction())(RecordSelect);
