import {connect} from 'react-redux';

import ServiceItem from './ServiceItem';

import {getServerList} from '../../../actions/client/Potential/PotentialAction'

import styles from '../../../../work/pages/client/css/AddPotentialPage.css';

class ServiceList extends CursorList{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:[]
        }
    }

    componentDidUpdate(){
        var {data} = this.state;
        this.nextIndex = data.length + 1;
        super.componentDidUpdate();
    }
    componentDidMount() {
        super.componentDidMount()
        this.hideLoading()
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        let { isPositive } = this.props;
        if(isPositive == '1'){

            return styles.frameTwo
        }else{

            return styles.frame;
        }
    }

    //取数据函数
    getData(startIndex, isAppend, cb, props){
        let {potentialId=''} = this.props;
        var params = {
            startIndex,
            length:10,
            potentialId:potentialId,
            searchRange:5
        };
        //params, isAppend, cb, component, updateList
       this.props.getServerList(params, isAppend, cb, this, this.updateList);
    }

    updateList = (isAppend, data) => {
        var list = data;
        if (isAppend) {
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({data: list});
    }


    //绘制列表
    renderList(){
        var list = [],
            {data=[]} = this.state;
        return data.map((item, index) => {
            var {servUserName, servSummarize, servTime, servId, clientId} = item;
            return (
                <ServiceItem servUserName={servUserName} servSummarize={servSummarize} servTime={servTime} servId={servId} clientId={clientId}/>
            );
        });
    }

}

function injectAction(){
    return {getServerList};
}

function injectProps(state) {
    return {};
}
//
module.exports = connect(injectProps, injectAction())(ServiceList);
