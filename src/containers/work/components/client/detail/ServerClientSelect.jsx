import {connect} from 'react-redux';
import {showWarning} from '../../../actions/client/summary/serverAction';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../../components/common/appheader/AppHeader';
import ClientSearch from './ClientSearch';
import ServerClientList from './ServerClientList';

import styles from '../../css/client/detail/servClientSelect.css';

class ServerClientSelect extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            value:"",
            search:"",
            type:"1",
            clientId:"",
            fundAccount:"",
            clientName:"",
            potentialId:''
        }
    }

    //输入框改变
    inputChange = (value)=>{
        this.setState({value});
    }

    //点击确定
    okClick = ()=>{
        var {onSelect} = this.props,
            {clientId, clientName, fundAccount, potentialId} = this.state;
        if(clientId != ""){
            onSelect && onSelect(clientId, clientName, fundAccount, potentialId);
        }
        else{
            this.props.showWarning("请选择客户");
        }
    }

    clientSelect = (clientId, clientName, fundAccount, potentialId) => {
        this.setState({clientId, clientName, fundAccount, potentialId});
    }

    searchClick = (type, value)=>{
        this.setState({search:value,value,type});
    }

    renderIcon(){
        return [
            <span className={styles.pattern} onClick={this.okClick}>确定</span>
        ]
    }

    render(){
        var {onClose, clientType} = this.props,
            {clientId, potentialId, fundAccount, search, value, type} = this.state;
        return(
            <FullScreenView>
                <AppHeader headerName="请选择客户" theme="red" onBackClick={onClose} iconRight={this.renderIcon()}/>
                <Content iscroll={false}>
                    <ClientSearch value={value} clientType={clientType} onValueChange={this.inputChange} onSearch={this.searchClick}/>
                    {search?(<ServerClientList search={search} curClientId={clientId} clientType={clientType} curPotentialId={potentialId} curFundAccount={fundAccount} type={type} onSelect={this.clientSelect}/>):null}
                </Content>
            </FullScreenView>
        )
    }

}

function injectAction() {
    return {showWarning};
}

module.exports = connect(null, injectAction())(ServerClientSelect);
