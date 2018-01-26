import {connect} from 'react-redux';
import {getProductList} from '../../../actions/home/time/timeAction';
import ProductItem from './ProductItem';

import styles from '../../css/home/time/productList.css';

class ProductList extends CursorList{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    //获取数据
    getData(startIndex,isAppend,cb,props){
      var search =props.search;
        this.props.getProductList({startIndex,search}, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }

    choose = (name,productId)=>{

      this.props.chooseProduct(name,productId)
    }

    renderList(){
        var {data} = this.state;

        return data.map((item,index)=>{
            return (<ProductItem
              onClick={this.choose}
              fundCode={item.fundCode}
              fundName={item.fundName}
              purchageStatus={item.purchageStatus}
              fundType={item.fundType}
              unitnv={item.unitnv}
              yieldForOneYear={item.yieldForOneYear}
              index={index}/>);
        });
    }

    //该list外层是div，重写方法
    renderListFrame(list){
        return (
            <div>
                {list}
            </div>
        )
    }

}

// function injectProps(state){
//     var {todo={},base} = state,
//         {todolist=[]} = todo,
//         {undoType} = base;
//
//     return {data:todolist,undoType};
// }

function injectAction(){
    return {getProductList};
}

module.exports = connect(null,injectAction())(ProductList);
