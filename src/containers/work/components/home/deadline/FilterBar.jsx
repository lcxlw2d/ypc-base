import {connect} from 'react-redux';
import {getProductDetailList, warn} from '../../../actions/home/deadline/deadlineAction';

import styles from '../../css/home/deadline/filterBar.css';

class FilterBar extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            data:[],
            isAll:true
        }
    }

    componentDidMount(){
        this.props.getProductDetailList(this, this.updateList);
    }

    updateList = (data)=>{
        this.setState({data});
    }

    typeClick = (type)=>()=>{
        var {onChange, tmpSelected} = this.props;
        onChange && onChange(type, tmpSelected);
    }

    //在数组里toggle元素
    toggleElement(tmpSelected, productCode){
        for(var i=0;i<tmpSelected.length;i++){
            if(tmpSelected[i] == productCode){
                tmpSelected.splice(i,1);
                return tmpSelected.slice(0);
            }
        }
        tmpSelected.push(productCode);
        return tmpSelected.slice(0);
    }

    //判断是否在数组中
    isInArray(array, elem){
        for(var i=0;i<array.length;i++){
            if(array[i] == elem) return true;
        }
        return false;
    }

    //判断是否在规定时间内
    hasInTime(diff, type){
        var maxDiff = 1000*60*60*24*(type==0?7:30);
        return diff < maxDiff;
    }

    itemClick = (productCode) => () => {
        var {tmpSelected, onSelect} = this.props;
        this.setState({isAll:false});
        onSelect && onSelect(this.toggleElement(tmpSelected, productCode));
    }

    selectAll = ()=>{
        var {onSelect} = this.props;
        this.setState({isAll:true});
        onSelect && onSelect([]);
    }

    //渲染产品列表
    renderProductList(data){
        var list = [],
            {filterType, tmpSelected} = this.props,
            {isAll} = this.state;

        for(var i=0;i<data.length;i++){
            var {DURATION, PROD_CODE, PRODUCT_NAME} = data[i];
            if(this.hasInTime(DURATION, filterType)){
                list.push(<li className={!isAll&&this.isInArray(tmpSelected,PROD_CODE)?styles.on:""} onClick={this.itemClick(PROD_CODE)}><a>{PRODUCT_NAME}</a></li>);
            }
        }

        if(list.length) return (
            <ul className={styles.pro_ul}>
                <li className={isAll?styles.on:""} onClick={this.selectAll}><a>全部</a></li>
                {list}
            </ul>
        );

        return (<div className={styles.noData}>没有符合条件的数据</div>)
    }

    //点击重置
    resetClick = ()=>{
        var {onChange} = this.props;
        this.setState({isAll:true});
        onChange && onChange(1, []);
    }

    getFilterData(){
        var list = [],
            {isAll, data} = this.state,
            {tmpSelected, filterType} = this.props;
        if(isAll){
            for(var i=0;i<data.length;i++){
                var {DURATION,PROD_CODE} = data[i];
                if(this.hasInTime(DURATION, filterType)){
                    list.push(PROD_CODE);
                }
            }
            return list;
        }
        else{
            return tmpSelected;
        }
    }

    //点击提交
    submitClick = ()=>{
        var {onSubmit} = this.props,
            array = this.getFilterData();
        if(array.length){
            onSubmit && onSubmit(array);
        }
        else{
            this.props.warn("您没有选中任何产品");
        }
    }

    close = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    stop = (e)=>{
        e.stopPropagation();
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("FilterBar render");

        var {show, filterType} = this.props,
            {data} = this.state;

        return(
            <div className={ this.mergeClassName(styles.product_choose_popup, show?styles.show:"")} onClick={this.close}>
            	<div className={this.mergeClassName(styles.pro_inner_popup, show?styles.show:"")} onClick={this.stop}>
                	<div className={styles.pro_time}>
                    	<span>到期日期：</span>
                        <a className={filterType==0?styles.on:""} onClick={this.typeClick(0)}>一周内</a>
                        <a className={filterType==1?styles.on:""} onClick={this.typeClick(1)}>一个月内</a>
                    </div>
                	<div className={styles.choose_list}>
                        <ul className={styles.pro_ul}>
                            {this.renderProductList(data)}
                        </ul>
                    </div>
                    <div className={styles.pro_btns}>
                    	<a className={styles.btn_reset} onClick={this.resetClick}>重置</a>
                        <a className={styles.btn_confirm} onClick={this.submitClick}>确定</a>
                    </div>
                </div>
            </div>
        );
    }


}

function injectAction(){
    return {getProductDetailList, warn};
}

module.exports = connect(null, injectAction())(FilterBar);
