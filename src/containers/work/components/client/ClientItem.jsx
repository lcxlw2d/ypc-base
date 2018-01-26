import {connect} from 'react-redux';
import {gotoDetail,FROM_CLIENT_PAGE} from '../../../../store/actions';

import styles from '../css/client/clientItem.css';

class ClientItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        }
    }

    //点击条目，跳转至全景图
    itemClick = ()=>{
        var {clientId} = this.props;
        this.props.gotoDetail(clientId,FROM_CLIENT_PAGE);
    }

    //客户姓名处理
    shortName(name){
        if(name.length <= 8)
            return name;
        return name.substring(0,8)+"...";
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    render(){

        systemApi.log("ClientItem render");

        var {clientName,clientStar,validClient,fundAccount,lastTime} = this.props,
            {touch} = this.state,
            favorCls = this.mergeClassName(styles.follow,clientStar=="1"?styles.on:"");

        return (
            <li className={this.mergeClassName(styles.tr,touch?styles.touch:"")} onClick={this.itemClick}>
                <i className={styles.arrow_right}></i>
                <i className={favorCls}></i>
                {validClient=="1"?(<span className={styles.textborder}>有效</span>):null}
                <div className={styles.info}>
                    <p className={styles.text}>{this.shortName(clientName)}</p>
                    <p className={Color.c9}>
                        <span>{fundAccount}</span>
                        {lastTime?(<span className={styles.time}>{lastTime}</span>):null}
                    </p>
                </div>
            </li>
        )

    }

}

function injectAction(){
    return {gotoDetail};
}

module.exports = connect(null,injectAction())(ClientItem);
