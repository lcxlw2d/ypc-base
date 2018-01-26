import {connect} from 'react-redux';
import {gotoDetail,FROM_GOLDEN_PAGE} from '../../../../../store/actions';

import styles from '../../css/home/golden/goldenList.css';

class GoldenItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        }
    }

    //点击跳转全景图
    itemClick = ()=>{
        var {clientId} = this.props;
        this.props.gotoDetail(clientId,FROM_GOLDEN_PAGE);
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    render(){

        var {clientName,fundAccount,outTotalAsset,inTotalAsset,maxTotalAsset,assetMultiple} = this.props,
            {touch} = this.state;

        return (
            <li className={this.mergeClassName(styles.sgj_single,touch?styles.touch:"")} onClick={this.itemClick} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
            	<div className={styles.sgj_tit}>
                	<span className={styles.sgj_name}>{clientName}</span>
                    <span className={Color.c6}>[{fundAccount}]</span>
                </div>
                <div className={styles.sgj_int}>
                    <div className={this.mergeClassName(styles.int_layer, styles.bdbt)}>
                        <div className={styles.sgj_w50}>
                        	<span className={Color.c6}>体外市值(万元)</span>
                            <span className={Color.red}>{outTotalAsset}</span>
                        </div>
                        <div className={styles.sgj_w50}>
                        	<span className={Color.c6}>体内市值(万元)</span>
                            <span className={Color.red}>{inTotalAsset}</span>
                        </div>
                    </div>
                    <div className={styles.int_layer}>
                        <div className={styles.sgj_w50}>
                        	<span className={Color.c6}>资本测算(万元)</span>
                            <span className={Color.red}>{maxTotalAsset}</span>
                        </div>
                        <div className={styles.sgj_w50}>
                        	<span className={Color.c6}>服务深度</span>
                            <span>[{assetMultiple}] </span>
                        </div>
                    </div>
                </div>
            </li>
        );
    }

}

function injectAction(){
    return {gotoDetail};
}

module.exports = connect(null,injectAction())(GoldenItem);
