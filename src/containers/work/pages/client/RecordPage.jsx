import {connect} from 'react-redux';
import AppHeader from './../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import UlineTab from '../../../../components/common/subtabs/UlineTab';
import SubTabs from '../../../../components/common/subtabs/SubTabs';
import Rename from './../../components/client/record/Rename';
import TitleAlert from './../../components/client/record/TitleAlert';
import Upload from './../../components/client/record/Upload';
import LocalRecordList from './../../components/client/record/LocalRecordList';
import CloudList from './../../components/client/record/CloudList';
import {gotoDetailTwo} from '../../actions/client/clientAction';
import {renameLocalRecordFileName, deleteLocalRecordFile, FileTransfer, getNetworkType} from './../../actions/client/record/recordAction';
// import {} from '../../actions/client/record/recordAction';
import styles from './css/RecordPage.css';

/**
 * 录音完成后=>录音列表
 */
class RecordPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0,
            showRename: false,
            showUploadFail: false,
            showUploadOver: false,
            showUploading: false,
            showUploadTitle: false,
            showStore: false,
            showRemove: false,
            fileName:"",
            showName:"",
            firstItem:{},
            jinDu:"0%",
            over:0,
            max:0,
            sum:0,
            isFirstCheckAll:true,
            upLoadList:[],
        }
    }

    //删除录音文件
    deleteRecordFile=fileName => {
        this.setState({showRemove:true, fileName});
    }

    //取消删除
    cancelDelete=() => {
        this.setState({showRemove:false});
    }

    //确认删除
    confirmDelete=() => {
        var{fileName}=this.state;
        this.props.deleteLocalRecordFile(fileName);
        this.refreshList();
        this.cancelDelete();


    }

    //刷新列表
    refreshList=() => {
        var{LocalRecordList}=this.refs;
        if(LocalRecordList){
            LocalRecordList.getWrappedInstance().refreshData();
           // LocalRecordList.getWrappedInstance().getScroll().refresh();
        }
    }

    //刷新云端列表
    refreshCoudList=() => {
        if(this.cloudListRef){
            this.cloudListRef.getWrappedInstance().refreshData();
        }
    }

    //录音重命名
    renameRecordFileName=(fileName, showName) => {
        this.setState({showRename:true, fileName, showName});
    }

    //取消重命名
    cancelRename=() => {
        this.setState({showRename:false, showStore: false});
    }

     //确认重命名
    confirmRename=newFileName => {
        this.cancelRename();
        if(newFileName==""){
            return
        }

        var{fileName}=this.state;
        this.props.renameLocalRecordFileName(fileName, newFileName);
        this.refreshList()
    }

    //获取最新录音
    getFirstItem=(firstItem, length) => {

      var isShow;
      if(systemApi.getValue("recordpage")!=null){
          isShow = systemApi.getValue("recordpage");
      }

      if(isShow==1){
          var{title}=firstItem;
          if(firstItem){
            this.setState({firstItem, fileName:title}, () => {
                this.setState({showStore:true});
                systemApi.setValue("recordpage", 0);
            });
          }
      }else{

          var{isFirstCheckAll}=this.state;
          if(isFirstCheckAll && length>0) this.choice(length);
          if(isFirstCheckAll) this.setState({isFirstCheckAll:false});
      }

      if(length==0) { this.setState({index:1}, () => {
          this.refreshCoudList()
      }) }

    }

    //获取设备类型
    getSystem = () => {
        var systemType = systemApi.getValue("systemType");
    }
    //获取页面名称
    getPageName() {
        return "通话结束后_录音列表";
    }

    //切换tab
    tabChange = index => {
        this.setState({index: index});
    }

    //录完音直接上传
    fileUpload= value => {
        var{firstItem, upLoadList}=this.state, max=0;
        max= upLoadList.unshift(firstItem);
        if(value&&value!=' '){
            upLoadList[0].rename=value;
            //alert(value)
            //alert(upLoadList[0].recordingFile)
        }
          // console.log(upLoadList)
          //console.info(upLoadList);
        this.setState({upLoadList, max, showStore:false, showUploading:true}, () => {
            this.startMaxUpLoad(this.state.upLoadList)
        });

    }

    //多选上传
    multiselect=() => {
        this.props.getNetworkType(data => {
            if(data=="WIFI"){
                this.clickLoad();
            }else{
                this.setState({showUploadTitle:true})
            }
        })
    }

    endWith = (Reg, str) => {
        let pos = str.lastIndexOf(Reg);
        if(pos===-1){
            return false;
        }else{
            return true;
        }
    }

    //取消多选上传
    unMultiSelect=() => {
        this.setState({showUploadTitle:false})
    }

    //上传
    startMaxUpLoad=upLoadList => {
         var item={};
         item=upLoadList[0];
         this.setState({showUploadTitle:false, upLoadList});
         if(item){
            let {title, time, url, durate, size, md5, phone, rename='', clientId='', potentialId=''} = item;
                rename = this.endWith(".mp3", rename)?rename:rename+".mp3";
            let params={md5, recordingFile:title, callType:1, recordingBeginDate:time, clientTel:phone, clientId, fileName:rename};
            if(potentialId!=''){
                params['potentialId'] = potentialId;
            }
            this.setState({fileName:title})
            this.props.FileTransfer(params, url, title, this.success, this.failure, this);
         }else{
            this.setState({showUploadOver:true, showUploading:false, max:0, sum:0, ovar:0}, () => {
            this.refreshList();
            setTimeout(() => { this.fail() }, 1000)
        });
         }

    }

    //开始多选上传
    clickLoad=() => {
        this.setState({showUploading:true}, () => {
            this.startMaxUpLoad(this.state.upLoadList)
        });
    }

    //多选上传成功回调
    success = data => {
        var {fileName} = this.state, {progress, recordingInnerId} = data;
        if (progress) {
            var jinDu = Math.floor(progress * 100) + "%";
            this.setState({jinDu});
        } else if (recordingInnerId) {
            this
                .props
                .deleteLocalRecordFile(fileName);
            this.setState((prevState, props) => ({
                over: prevState.over + 1,
                upLoadList: (list => {
                    list.shift();
                    return list;
                })(prevState.upLoadList)
            }), () => {
                this.startMaxUpLoad(this.state.upLoadList)

            })
        }
    }


    //确认多选上传
    fileUploads=() => {
        var {upLoadList, max}=this.state;
        this.setState({max:upLoadList.length});
    }

    //选中所有勾选按钮
    choice = length => {
        for(var i=0;i<length;i++){
                var item = this.refs.LocalRecordList.refs.wrappedInstance.refs["LocalRecordItem"+i];
                if(item && item.isSelected){
                    item.isSelected();
            }
        }
    }

    //上传失败回调
    failure=() => {
        this.setState({showUploadFail:true, showUploading:false, ovar:0}, () => {
            setTimeout(() => { this.fail() }, 1000)
        });
        this.refreshList();
    }

    //关闭上传结束提示
    fail=() => {
        this.setState({showUploadFail:false, showUploadOver:false});
    }

    //添加至上传队列
    addItems=item => {
        var{upLoadList, over}=this.state, list=[], size=item.size;
        if(over!=0){
            this.setState({over:0})
        }
        //list=upLoadList.concat(item);
        //this.setState({upLoadList:list,max:this.state.max+1,sum:this.state.sum+size});
        this.setState((prevState, props) => ({
            max: prevState.max + 1,
            sum: prevState.sum + size,
            upLoadList: prevState
                .upLoadList
                .concat(item)
        }))
    }

    //从上传队列移处
    removeItems=items => {
        var{upLoadList}=this.state, length=upLoadList.length, listNum=0, size=items.size;
        if(upLoadList){
            upLoadList.map((item, index) => {
                if(item.title==items.title){
                    //upLoadList.splice(index, 1);
                   // this.setState({upLoadList,num:this.state.sum-size,max:this.state.max-1});
                    this.setState((prevState, props) => ({
                        max: prevState.max - 1,
                        sum: prevState.sum - size,
                        upLoadList: ((list, index) => {
                            list.splice(index, 1);
                            return list;
                        })(prevState.upLoadList, index)
                    }))
                    return
                }
            })

        }
    }

    onBackClick=() => {
        var{type}=this.props.params;
        if(systemApi.getValue("recordpage")!=null){
        var {isShow}=systemApi.getValue("recordpage");
            if(isShow==0){ systemApi.removeValue("recordpage") }
        }
        if(type==1){
            hashHistory.push("/work/me");
        }else if(type==0){
            let params= systemApi.getValue("quanjingtu_recordpage");
            params = JSON.parse(params);
            let {mobileTel, clientName, clientId, fundAccount} = params;
            this.props.gotoDetailTwo(clientId, mobileTel, clientName, fundAccount);
        }else{
            //返回潜在客户详情
            hashHistory.push("/work/client/potentialDetail/"+type)
        }

    }

     GetFileNameNoExt= fileName => {
            var pos = fileName.lastIndexOf(".mp3");
            if (fileName != ""&& pos!==-1) {
                return fileName.substring(0, pos);
            }else{
                return fileName;
            }
        }

    setCloudListRef = ref => {

        this.cloudListRef = ref;
    }


    render() {
        systemApi.log("MyRecordingPage render");
        var {
            index,
            showRename,
            showUploadFail,
            showUploadOver,
            showUploading,
            showStore,
            showUploadTitle,
            showRemove,
            firstItem,
            jinDu,
            over,
            max,
            sum,
            fileName,
            showName,
        } = this.state, {type}=this.props.params;
        return (
            <FullScreenView>
                <AppHeader headerName="我的录音文件" theme="red"  onBackClick={this.onBackClick}/>
                <Content iscroll={false}>
                    <SubTabs index={index} onTabChange={this.tabChange} theme="red">
                        <UlineTab text="本地录音"/>,
                        <UlineTab text="云端录音"/>,
                    </SubTabs>
                    <div className="blank"></div>
                    <LazyLoad index={index}>
                        <LocalRecordList ref="LocalRecordList" getFirstItem={this.getFirstItem} deleteLocalRecordFile={this.deleteRecordFile} addItems={this.addItems} removeItems={this.removeItems} renameLocalRecordFileName={this.renameRecordFileName}/>
                        <CloudList ref= {this.setCloudListRef} type={type}/>
                    </LazyLoad>
                    {index?null:<div className={styles.btn_mycus_box}>
                        <div className={max!=0?this.mergeClassName(styles.btn_mycus, styles.up_load):this.mergeClassName(styles.btn_mycus_no, styles.up_load_no)} onClick={max>0?this.multiselect:null}>
                            <a>上传云端</a>
                        </div>
                    </div>}
                </Content>
                {/*重命名*/}
                {showRename
                    ? <Rename titles="重命名" value={this.GetFileNameNoExt(showName)} confirmRename={this.confirmRename} showName={showName} fileName={fileName}  firstItem={firstItem} cancelRename={this.cancelRename}/>
                    : null}
                {/*存储录音*/}
                {showStore
                    ? <Rename firstItem={firstItem} value={this.GetFileNameNoExt(fileName)} fileName={fileName} confirmRename={this.confirmRename} cancelRename={this.cancelRename} fileUpload={this.fileUpload}  titles="存储录音"></Rename>
                    : null}
                {/*上传失败*/}
                {showUploadFail
                    ? <Upload icon="uploadFail" title="上传失败！" fail={this.fail}/>
                    : null}
                {/*上传完成*/}
                {showUploadOver
                    ? <Upload icon="uploadOver" title="上传完成！" fail={this.fail}/>
                    : null}
                {/*上传中*/}
                {showUploading
                    ? <Upload icon="loading" title="小犇努力上传中..." jinDu={jinDu} max={max} over={over}/>
                    : null}
                {/*上传提示*/}
                {showUploadTitle
                    ? <TitleAlert title="上传提示" max={max} size={sum} startMaxUpLoad={this.clickLoad} unMultiSelect={this.unMultiSelect}/>
                    : null}
                {/*删除确认*/}
                {showRemove
                    ? <TitleAlert title="删除确认" cancelDelete={this.cancelDelete} confirmDelete={this.confirmDelete}/>
                    : null}
            </FullScreenView>
        )
    }

}

function injectAction() {
    return {renameLocalRecordFileName, deleteLocalRecordFile, FileTransfer, getNetworkType, gotoDetailTwo};
}

module.exports = connect(null, injectAction())(RecordPage);
