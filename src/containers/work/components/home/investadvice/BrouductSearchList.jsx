import {connect} from 'react-redux';
import{getBroductSearch} from '../../../actions/home/investadvice/BroductSearchAction';
import styles from '../../css/home/investadvice/BroductSearch.css';
import EmphaseText from '../../../../../components/common/text/EmphaseText';
class BroductSearchList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    itemSelect = (item)=>()=>{
        var {onSelects} = this.props;
        onSelects && onSelects(item);
    }

    getData(startIndex, isAppend,cb, props){
        var {search, investmentRiskTypes, type} = props,
            params = {
                startIndex,
                length:20,
                productName:search,
                investmentRiskTypes:investmentRiskTypes,
                productType:type,
            };

        this.props.getBroductSearch(params, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data, total) => {
        var list = data,
            {setTotal} = this.props;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
        setTotal && setTotal(total);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle() {
        return styles.frame;
    }

    renderList() {
        var {search} = this.props,
            {data} = this.state;
        return data.map((item, index) => {
            var{productShortName, productCode, productName, seccode=""} = item;
            return (
                <li className={styles.item}>
                    <div className={styles.mot_search_res} onClick={this.itemSelect({productCode,productName})}>
                        <EmphaseText text={productName+" ("+seccode+")"} emphase={search} color="blue"/>
                    </div>
                </li>
            )
        })
    }
}

function injectAction(){
    return {getBroductSearch};
}

module.exports = connect(null, injectAction())(BroductSearchList);
