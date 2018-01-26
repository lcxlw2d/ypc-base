import {connect} from 'react-redux';
import CloudItem from './CloudItem';
import {getCloudList,getNameAndFundAccount,getmatchservid} from './../../../actions/client/record/recordAction';
import styles from '../../css/client/record/CloudList.css';
class CloudList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
        this.length = 0;
    }

    componentDidMount(){
        super.componentDidMount();
        Event.register("event_get_cloud_fundAccount",this.getNameData)
        Event.register("event_get_cloud_servid",this.getmatchservidData)
    }
    componentWillMount() {
       Event.unregister("event_get_cloud_fundAccount",this.getNameData)
       Event.unregister("event_get_cloud_servid",this.getmatchservidData)
    }

    //获取数据
    getNameData=(params)=>{
        var{clientId,cb}=params;
        this.props.getNameAndFundAccount({clientId},this,cb)
    }

    getmatchservidData=(params)=>{
         var{recordingInnerId,cb}=params;
         this.props.getmatchservid({recordingInnerId},this,cb)
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    //获取数据
    getData(startIndex, isAppend, cb, props) {
        this
            .props
            .getCloudList({
                startIndex,
                length: 20,
                sort:"recordingBegindate",
                order:"desc"
            }, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data,
            hasList = [];
        if (isAppend) {
            list = this
                .state
                .data
                .concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    //获取是否显示loading框
    getIsShowLoading() {
        return false;
    }

    close = (index) => {
        for (var i = 0; i < this.length; i++) {
            if (i != index) {
                var item = this.refs["CloudRecordItem" + i];
                if (item && item.getWrappedInstance().closeRecord) {
                    item.getWrappedInstance().closeRecord();
                }
            }
        }
    }

    onRefresh = () => {
        this.refresh();
    }

    renderList() {
        var {data} = this.state,url=systemApi.getValue("rootUrl"),nonce=systemApi.getValue("nonce"),{type}=this.props;
        this.length = data.length;
        return data.map((item, index) => {
            var {
                recordingFilename,
                recordingRuntime,
                callTypevalue,
                recordingBegindate,
                matchStatus,
                recordingUrl,
                recordingFileSize,
                recordingInnerId,
                clientId,
                clientName,
                potentialId,
                callType,
                clientTel
            } = item;
            if(url&&nonce) recordingUrl=url+recordingUrl+"?nonce="+nonce;
            if (index == 0) this.setState({firstItem: item});
            return (<CloudItem
                recordingFilename={recordingFilename}
                recordingRuntime={recordingRuntime}
                callType={callType}
                callTypevalue={callTypevalue}
                recordingBegindate={recordingBegindate}
                matchStatus={matchStatus}
                recordingUrl={recordingUrl}
               // recordingUrl="http://192.25.103.119:8800/group1/M00/00/00/wBlnd1lLZLOEB2OrAAAAAMEiTCs687.mp3"
                recordingFileSize={recordingFileSize}
                recordingInnerId={recordingInnerId}
                index={index}
                close={this.close}
                potentialId = {potentialId}
                clientId={clientId}
                clientTel={clientTel}
                type={type}
                onRefresh={this.onRefresh}
                clientName={clientName}
                ref={"CloudRecordItem" + index}/>);
        });
    }

}

function injectAction() {
    return {getCloudList, getNameAndFundAccount, getmatchservid}
}

module.exports = connect(null, injectAction(), null, { withRef: true })(CloudList);
