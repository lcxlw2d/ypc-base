import {connect} from 'react-redux';
import {getEmployeeList} from '../../../actions/home/employeeValue/employeeValueAction';

import HonorListItem from './HonorListItem';
import styles from '../../css/home/employeeValue/honorList.css';

class HonorList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }
    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    componentDidMount(){
        Event.register("EMPLOYEEVSLUE_REFRESH_LIST", this.reloadData);
        super.componentDidMount();
    }

    componentWillUnmount(){
        Event.unregister("EMPLOYEEVSLUE_REFRESH_LIST", this.reloadData);
        super.componentWillUnmount();
    }

    reloadData = ()=>{
        this.refreshData();
    }


    //取数据函数
    getData(startIndex,isAppend,cb,props){
        var params = {
                startIndex,
                length:20,
            };
        this.props.getEmployeeList(params, isAppend, cb, this, this.update);
    }

    //更新数据
    update = (isAppend, data) => {
        var list = data;
        if(isAppend){
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data:list});
    }


    //绘制列表
    renderList(){
        var {data} = this.state;

        return data.map((item,index)=>{
            var {honorId} = item;

            return (
                <HonorListItem key={honorId} data={item} />
            );
        });
    }

}

function injectAction() {
    return {getEmployeeList};
}

module.exports = connect(null, injectAction())(HonorList);
