import {connect} from 'react-redux';
import PotentialItem from './PotentialItem';
import {getPotentialList} from '../../../actions/client/Potential/PotentialAction';

import styles from '../../../pages/client/css/AddPotentialPage.css';

class PotentialList extends CursorList{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            //{potentialId:"ssss", clientName:"zdfdf", clientSex:2, isPositive:1, fundAccount:"dddddd", totalAsset:"ddd", opendate:"1234-1233-1234"},{potentialId:"ssss", clientName:"zdfdf", clientSex:2, isPositive:1, fundAccount:"dddddd", totalAsset:"ddd", opendate:"1234-1233-1234"}
            data:[]
        }
    }

    componentDidUpdate(){
        super.componentDidUpdate();
    }

    clertData = () => {
        this.setState({data:[]})
    }



    componentWillMount() {
        //super.componentDidUpdate();
        Event.unregister('potentialList_getData', this.reload)
    }

    componentDidMount() {
        super.componentDidMount()
        Event.register('potentialList_getData', this.reload)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }

    reload = () => {
        this.refreshData();
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        let { type } = this.props;
        if(type == 'search'){
            return styles.searchFrames;
        }else{

            return styles.frames;
        }
    }

    //取数据函数
    getData(startIndex, isAppend, cb, props){
        var params = {
            startIndex,
            length:10,
        }, keyWord = props?props.keyWord:'';
        NetWork.cancelRequest(this._reqList);
        !isAppend&&this.clertData();
        this.props.getPotentialList(params, isAppend, cb, this, this.updateList, keyWord);
    }

    updateList = (isAppend, data, hasMore) => {
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
            {data} = this.state;
        return data.map((item, index) => {
            var {potentialId, clientName, clientSex, isPositive, fundAccount, totalAsset, opendate} = item;
            return (
                <PotentialItem potentialId ={potentialId} clientName = {clientName} clientSex = {clientSex} isPositive = {isPositive} fundAccount = {fundAccount} totalAsset ={totalAsset} opendate = {opendate}/>
            );
        });
    }

}

function injectAction(){
    return {getPotentialList};
}

function injectProps(state) {
    var {turnStarId,turnStarFundcode} = state.client || {};
    return {turnStarId,turnStarFundcode};
}

module.exports = connect(null, injectAction(), null, {withRef:true})(PotentialList);
