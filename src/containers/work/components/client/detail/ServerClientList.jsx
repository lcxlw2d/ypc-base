import {connect} from 'react-redux';
import {getClientSearchList, getPotentialList} from '../../../actions/client/search/searchAction';
import EmphaseText from '../../../../../components/common/text/EmphaseText';
import styles from '../../css/client/detail/servClientList.css';

//服务主题列表
class ServClientList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps){
        var {search, type} = this.props;
        if(search != nextProps.search || type != nextProps.type){
            super.componentWillReceiveProps(nextProps);
        }
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    getData(startIndex, isAppend, cb, props) {
        var {search, type, clientType} = props;
        if(clientType == 1){
            this.props.getClientSearchList(startIndex, isAppend, cb, this, this.updateList, search, type);
        }else{
            this.props.getPotentialList({startIndex, length:20}, isAppend, cb, this, this.updateList, search, type);
        }
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    itemClick = (clientId, clientName, fundAccount, potentialId )=>()=>{
        var {onSelect} = this.props;
        onSelect && onSelect(clientId, clientName, fundAccount, potentialId);
    }

    renderList() {
        var {curClientId, search, curFundAccount, curPotentialId} = this.props,
            {data} = this.state;
        return data.map((item, index) => {
            var {clientId, clientName, fundAccount, potentialId=''} = item;
            return (
                <li className={this.mergeClassName(styles.item, (curPotentialId==potentialId && curClientId==clientId && fundAccount==curFundAccount?styles.on:""))} onClick={this.itemClick(clientId, clientName, fundAccount, potentialId)}>
                    <a><EmphaseText text={clientName} emphase={search} /></a>
                    <a className="right">{fundAccount}</a>
                </li>
            );
        });
    }

}

function injectAction() {
    return {getClientSearchList, getPotentialList};
}

module.exports = connect(null, injectAction())(ServClientList);
