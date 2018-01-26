import FullScreenView from '../../../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../../../components/common/appheader/AppHeader';
import SubTabs from '../../../../../../components/common/subtabs/SubTabs';
import UlineTab from '../../../../../../components/common/subtabs/UlineTab';
import LazyLoad from '../../../../../../components/common/subtabs/LazyLoad';
import ClientList from './ClientList';
import PclientList from './PclientList';

import styles from '../../../css/home/attend/edit/myClient.css';

class MyClient extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            value:"",
            search:"",
            searchP:"",
            selectArr:props.clients,
            index:0,
        }
    }

    backClick = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    inputChange = (e)=>{
        var {value} = e.target;
        this.setState({value});
    }

    searchClick = ()=>{
        var {value, index} = this.state;
        if(index == 1){
            this.setState({searchP:value});
        }else{

            this.setState({search:value});
        }
    }

    //点击完成
    submitClick = ()=>{
        var {onSelect} = this.props,
            {selectArr} = this.state;
        onSelect && onSelect(selectArr);
    }

    renderIcon = ()=>{
        return [
            (<span className={styles.pattern} onClick={this.submitClick}>完成</span>)
        ]
    }

    //判断是否选中
    getSelectedIndex(selectArr, clientId, clientType){
        for(var i=0;i<selectArr.length;i++){
            if(clientType == 2){
                if(selectArr[i].potentialId == clientId) return i;
            }else{
                if(selectArr[i].clientId == clientId) return i;
            }
        }
        return -1;
    }

    //选中客户
    onSelect = (clientName, clientId, clientType) => {
        var {selectArr} = this.state,
            index = this.getSelectedIndex(selectArr, clientId, clientType);
        if(index != -1){
            selectArr.splice(index,1);
        }
        else{
            if(clientType == 2){
                selectArr.push({clientName, potentialId:clientId, clientType});
            }else{
                selectArr.push({clientName, clientId, clientType});
            }
        }
        this.setState({selectArr:selectArr.slice(0)});
    }

    //点击删除客户
    delClient = (clientId, clientType)=>()=>{
        var {selectArr} = this.state,
            index = this.getSelectedIndex(selectArr, clientId, clientType);;
        if(index != -1){
            selectArr.splice(index,1);
        }
        this.setState({selectArr:selectArr.slice(0)});
    }

    //渲染选中客户
    renderSelectedClient(selectArr){
        var list = [],
            hasKey = false;
        for(var k in selectArr){
            hasKey = true;
            var {clientId, clientName, clientType} = selectArr[k];
            list.push(
                <span className={styles.client}>
                    <span>{clientName}</span>
                    <i className={styles.del} onClick={this.delClient(clientId, clientType)}></i>
                </span>
            )
        }
        if(hasKey) return list;
        return (<div className={styles.noData}>暂未选择</div>);
    }

    tabChange = (index)=>{
        // Cache.setValue("client_tab_type",index);
        let { search, searchP } = this.state;
        if(index == 1){
            this.setState({value:searchP, index});
        }else{

            this.setState({value:search, index});
        }
    }

    render(){
        systemApi.log("MyClient render");

        var {value, search, selectArr, index, searchP} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="选择我的客户" onBackClick={this.backClick} iconRight={this.renderIcon()}/>
                <Content iscroll={false}>
                    <div className={styles.atten_search}>
                        {/* <SubTabs index={index} onTabChange={this.tabChange}>
                            <UlineTab text="正式客户"/>
                            <UlineTab text="潜在客户"/>
                        </SubTabs> */}
                        <div className={styles.searchinnerbox}>
                            <input type="text" onChange={this.inputChange} value={value} placeholder="姓名/资金账号/身份证号"/>
                            <input type="button" onClick={this.searchClick}/>
                        </div>
                    </div>
                    <div className={styles.selectedArea}>{this.renderSelectedClient(selectArr)}</div>
                    <LazyLoad index={index}>
                        <ClientList onSelect={this.onSelect} filter={search} selectArr={selectArr}/>
                        {/* <ClientList index={index} onSelect={this.onSelect} filter={search} selectArr={selectArr}/>                         */}
                        {/* <PclientList onSelect={this.onSelect} filter={searchP} selectArr={selectArr}/> */}
                    </LazyLoad>
                </Content>
            </FullScreenView>
        );
    }

}

module.exports = MyClient;
