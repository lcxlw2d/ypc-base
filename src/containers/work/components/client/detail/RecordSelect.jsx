import {connect} from 'react-redux';
import {getRecordList, showWarning} from '../../../actions/client/summary/serverAction';
import styles from '../../css/client/detail/recordSelect.css';

class RecordSelect extends CursorTable {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = Object.assign(this.state,{selected:""});
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
        this.props.getRecordList({
            startIndex,
            clientTel:search,
            matchStatus:searchType,
            length:20
        }, isAppend, cb, this, this.updateList);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        var {type=""} = this.props;
        return this.mergeClassName(styles.frame, styles[type]);
    }

    //获取表格主体位置
    getTablistStyle(){
        return styles.tableList;
    }

    renderHeader() {
        return (
            <tr className={styles.tr}>
                <th width="33%">
                    <p>客户电话</p>
                    <p>通话时长</p>
                </th>
                <th width="33%">
                    <p>通话方式</p>
                    <p>通话时间</p>
                </th>
                <th width="33%">
                    <p>本地电话</p>
                    <p>匹配状态</p>
                </th>
            </tr>
        );
    }

    itemClick = (recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue,matchStatus)=>(e)=>{
        var {onSelect, showWarning} = this.props;
        if(matchStatus == "0"){
            this.setState({selected:recordingInnerId});
            onSelect && onSelect(recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue);
        }
        else{
            showWarning("该录音已被匹配，请选择未匹配的录音");
        }
    }

    renderList() {
        var {data, selected} = this.state;
        return data.map((item, index) => {
            var {recordingInnerId, clientTel, recordingRuntimeValue, callTypevalue, recordingBegindatevalue, passageTel, matchStatusvalue, matchStatus} = item;
            return (
                <tr className={this.mergeClassName(styles.item, selected==recordingInnerId?styles.selected:"")} onClick={this.itemClick(recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue,matchStatus)}>
                	<td width="33%">
                    	<p>{clientTel}</p>
                        <p className={Color.c6}>{recordingRuntimeValue}</p>
                    </td>
                    <td width="33%">
                    	<p>{callTypevalue}</p>
                        <p className={Color.c6}>{recordingBegindatevalue}</p>
                    </td>
                    <td width="33%">
                    	<p>{passageTel}</p>
                        <p className={Color.c6}>{matchStatusvalue}</p>
                    </td>
                </tr>
            );
        });
    }

}

function injectAction(){
    return {getRecordList, showWarning};
}

module.exports = connect(null, injectAction())(RecordSelect);
