import {connect} from 'react-redux';
import RecordItem from './RecordItem';
import {getLocalRecordFileList} from './../../../actions/client/record/recordAction';
import styles from '../../css/client/record/LocalRecordList.css';
class LocalRecordList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
        }
        this.length=0;
    }



    getData(startIndex,isAppend,cb){
        this.props.getLocalRecordFileList(this.updateList,isAppend,cb,this)
    }

     updateList = (isAppend, data) => {
        var list = data;
        this.nextIndex = list.length + 1;
        this.setState({data: list},()=>{
            this.props.getFirstItem(this.state.data[0],list.length);
        });
    }

    //获取数据成功
    succ=(data)=>{
        this.setState({data});
    }

    //删除录音文件
    deleteLocalRecordFile=(fileName,itemIndex)=>{
        this.onOpenItem(itemIndex)
        this.props.deleteLocalRecordFile(fileName);
    }

    //录音重命名
    renameLocalRecordFileName=(fileName,showName,itemIndex)=>{
        this.onOpenItem(itemIndex)
        this.props.renameLocalRecordFileName(fileName,showName);
    }

      //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }


    //获取是否显示loading框
    getIsShowLoading(){
        return false;
    }

   onOpen = (index)=>{
        for(var i=0;i<this.length;i++){
            if(i != index){
                var item = this.refs["LocalRecordItem"+i];
                if(item && item.iconBack){
                    item.iconBack();
                }
            }
        }
    }

    //关闭操作选项
    onOpenItem = (index)=>{
        for(var i=0;i<this.length;i++){
            if(i == index){
                var item = this.refs["LocalRecordItem"+i];
                if(item && item.iconBack){
                    item.iconBack();
                }
            }
        }
    }

    close = (index)=>{
        for(var i=0;i<this.length;i++){
            if(i != index){
                var item = this.refs["LocalRecordItem"+i];
                if(item && item.closeRecord){
                    item.closeRecord();
                }
            }else{
                var item = this.refs["LocalRecordItem"+i];
                if(item && item.iconBack){
                    item.iconBack();
                }
            }
        }
    }

    onRefresh = () => {
        this.refresh();
    }

    addItems=(item)=>{
        this.props.addItems(item);
    }

    removeItems=(item)=>{
        this.props.removeItems(item);
    }

    renderList() {
        var {data} = this.state;
            this.length=data.length;
        return data.map((item, index) => {
            var {title,time,url,durate,size,md5,rename,clientId}=item;

            return (
                 <RecordItem onRefresh={this.onRefresh} item={item} addItems={this.addItems} removeItems={this.removeItems} index={index} close={this.close} rename={rename} title={title} size={size} time={time} url={url} durate={durate} onOpen={this.onOpen} deleteLocalRecordFile={this.deleteLocalRecordFile}  renameLocalRecordFileName={this.renameLocalRecordFileName} ref={"LocalRecordItem"+index}/>
            );
        });
    }

}

function injectAction() {
    return {getLocalRecordFileList}
}

module.exports = connect(null, injectAction(),null,{ withRef: true })(LocalRecordList);
