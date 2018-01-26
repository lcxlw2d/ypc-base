import {connect} from 'react-redux';
import {setClientListFilter} from '../../../../store/actions';

import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import FilterItem from './FilterItem';
import FilterInput from './FilterInput'
import styles from '../css/client/filter.css';

class Filter extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            touch: false,
            fundCode:props.fundCode,
            stockCode:props.stockCode
        }
    }
    //组织冒泡
    stopProp = (e) => {
        e.stopPropagation();
    }

    confirm = () =>{
        var {stockCode, fundCode} = this.state;
        this.props.setClientListFilter(this.refs.vaild.getValue(), this.refs.star.getValue(), stockCode, fundCode, () =>{
            this.props.onClose();
        });
    }

    fundChange = (fundCode)=>{
        this.setState({fundCode});
    }

    stockChange = (stockCode)=>{
        this.setState({stockCode});
    }

    render() {

        systemApi.log("Filter render");
        var {vaild, star} = this.props,
            {fundCode, stockCode} = this.state;
        return (
            <FullScreenView transparent={true}>

                <div className={styles.ecard_popup} onClick={this.props.onClose}>
                    <div className={styles.ecard_box + " " + styles.nobg} onClick={this.stopProp}>
                        <div className={styles.pp_top}>客户筛选</div>
                        <div className={styles.pp_mid}>
                            <div className={styles.cus_choose}>
                                <ul>
                                    <FilterItem name="有  效  户：" ref="vaild" value={vaild}/>
                                    <FilterItem name="重点关注：" ref="star" value={star}/>
                                    <FilterInput name="产品持仓：" value={fundCode} onChange={this.fundChange} placeholder="请输入产品代码"/>
                                    <FilterInput name="股票持仓：" value={stockCode} onChange={this.stockChange} placeholder="请输入股票代码"/>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.pp_btns}>
                            <a className={styles.btn_pp_cancel} onClick={this.props.onClose}>取消</a>
                            <a className={styles.btn_pp_ok} onClick={this.confirm}>确定</a>
                        </div>
                    </div>
                    <div className={styles.ecard_layer}></div>
                </div>
            </FullScreenView>
        )

    }

}
function injectAction(){
    return {setClientListFilter};
}

function injectProps(state) {
    var {client={}} = state.base,
        {vaild, star, fundCode, stockCode} = client;
    return {vaild, star, fundCode, stockCode};
}

module.exports = connect(injectProps,injectAction())(Filter);
