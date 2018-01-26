import {connect} from 'react-redux';
import {gotoDetail, FROM_MARGIN_PAGE} from '../../../../../store/actions';

import styles from '../../css/home/margin/marginList.css';

class MarginItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        };
    }

    //点击跳转全景图
    itemClick = ()=>{
        var {clientId} = this.props;
        this.props.gotoDetail(clientId, FROM_MARGIN_PAGE);
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    render(){

        systemApi.log("MarginItem render");

        var {clientName,fundAccount,avgAsset,outTotalAsset,riskTraitName} = this.props,
            {touch} = this.state;

        return (
            <li className={this.mergeClassName(styles.sgj_single,touch?styles.touch:"")} onClick={this.itemClick} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
            	<div className={styles.sgj_tit}>
                	<span className={this.mergeClassName(styles.sgj_name)}>{clientName}</span>
                    <span className={Color.c6}>[{fundAccount}]</span>
                </div>
                <div className={this.mergeClassName(styles.sgj_int, styles.sgj_int_new)}>
                    <div className={this.mergeClassName(styles.int_layer, styles.bdbt)}>
                        <div className={styles.sgj_w50}>
                        	<span className={Color.c6}>体外市值(万元)</span>
                            <span className={Color.red}>{outTotalAsset}</span>
                        </div>
                        <div className={styles.sgj_w50}>
                        	<span className={Color.c6}>综合风险特征</span>
                            <span>[{riskTraitName || "未设置"}]</span>
                        </div>
                    </div>
                    <div className={styles.int_layer}>
                        <div className={styles.sgj_w100}>
                        	<span className={Color.c6}>近20日交易日日均总资产(元) </span>
                            <span className={Color.red}>{avgAsset}</span>
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

module.exports = connect(null,injectAction())(MarginItem);
