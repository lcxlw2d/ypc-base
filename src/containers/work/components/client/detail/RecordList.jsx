import {connect} from 'react-redux';
import {showWarning} from '../../../actions/client/summary/serverAction';
import AppHeader from '../../../../../components/common/appheader/AppHeader';
import SubTabs from '../../../../../components/common/subtabs/SubTabs';
import LazyLoad from '../../../../../components/common/subtabs/LazyLoad';
import UlineTab from '../../../../../components/common/subtabs/UlineTab';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import RecordSearch from './RecordSearch';
import RecordLocalSearch from './RecordLocalSearch';
import RecordSelect from './RecordSelect';
import RecordLocalSelect from './RecordLocalSelect';
import styles from '../../css/client/detail/recordList.css';

class RecordList extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        var {isAndroid} = systemApi;
        this.state = {
            mobile:props.mobileTel,
            value:'',
            search:'',
            searchType:0,
            localMobile:"",
            localValue:"",
            localSearch:"",
            localSearchType:isAndroid?"":"0",
            selected:false,
            index:0
        }
        this.selectItem = {
            recordingInnerId:"",
            callTypevalue:"",
            passageTel:"",
            clientTel:"",
            recordingRuntimeValue:"",
            recordingBegindatevalue:""
        };
    }

    onSearch = (search)=>{
        this.setState({search});
    }

    onValueChange = (value)=>{
        this.setState({value});
    }

    typeChange = (searchType)=>{
        this.setState({searchType});
    }

    itemSelect = (recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue)=>{
        this.selectItem = {recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue};
        // console.log(this.selectItem)
        // console.log('itemSelect')
        this.setState({selected:true});
    }

    localItemSelect = (recordingInnerId,callTypevalue,clientTel,recordingRuntimeValue,recordingBegindatevalue,params,otherParams)=>{
        this.selectItem = {recordingInnerId,callTypevalue,passageTel:"",clientTel,recordingRuntimeValue,recordingBegindatevalue,params,otherParams};
        this.setState({selected:true});
        // console.log(this.selectItem)
        // console.log('localItemSelect')

    }

    matchClick = ()=>{
        var {onSelect} = this.props,
            {selected} = this.state,
            {recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue,params,otherParams} = this.selectItem;
        if(selected){
            onSelect && onSelect(recordingInnerId,callTypevalue,passageTel,clientTel,recordingRuntimeValue,recordingBegindatevalue,params,otherParams);
        }
        else{
            this.props.showWarning("请选择录音");
        }
    }

    localTypeChange = (localSearchType)=>{
        this.setState({localSearchType});
    }

    onLocalValueChange = (localValue)=>{
        this.setState({localValue});
    }

    onLocalSearch = (localSearch)=>{
        this.setState({localSearch});
    }

    tabChange = (index)=>{
        this.setState({index});
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("RecordList render");

        var {isAndroid} = systemApi,
            {onClose} = this.props,
            {search, value, searchType, mobile, selected, index, localMobile, localValue, localSearch, localSearchType} = this.state;
        // isAndroid = true;
        return (
            <FullScreenView>
                <AppHeader headerName="匹配录音" theme="red" onBackClick={onClose}/>
                <Content iscroll={false}>
                    {isAndroid?[
                        <SubTabs theme="red" onTabChange={this.tabChange} index={index}>
                            <UlineTab text="手机录音"/>
                            <UlineTab text="座机录音"/>
                        </SubTabs>,
                        <LazyLoad index={index}>
                            <div>
                                <RecordLocalSearch value={localValue} searchType={localSearchType} onTypeChange={this.localTypeChange} onValueChange={this.onLocalValueChange} onSearch={this.onLocalSearch} onClose={onClose}/>
                                <RecordLocalSelect mobile={localMobile} search={localSearch} searchType={localSearchType} onSelect={this.localItemSelect}/>
                            </div>
                            <div>
                                <RecordSearch value={value} searchType={searchType} onTypeChange={this.typeChange} onValueChange={this.onValueChange} onSearch={this.onSearch} onClose={onClose}/>
                                <RecordSelect mobile={mobile} search={search} searchType={searchType} onSelect={this.itemSelect}/>
                            </div>
                        </LazyLoad>
                    ]:[
                        <RecordSearch value={value} searchType={searchType} onTypeChange={this.typeChange} onValueChange={this.onValueChange} onSearch={this.onSearch} onClose={onClose}/>,
                        <RecordSelect type="full" mobile={mobile} search={search} searchType={searchType} onSelect={this.itemSelect}/>
                    ]}
                    <div className={styles.btn_mycus_box}>
                        <div className={this.mergeClassName(styles.btn_mycus, selected?styles.selected:"")} onClick={this.matchClick}><a>匹配该录音</a></div>
                	</div>
                </Content>
            </FullScreenView>
        );
    }

}

function injectProps(state) {
    var {mobileTel=""} = state.client || {};
    return {mobileTel};
}

function injectAction(){
    return {showWarning};
}

module.exports = connect(injectProps, injectAction())(RecordList);
