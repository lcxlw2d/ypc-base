import {connect} from 'react-redux';
import {getStatisticsList, ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../../actions/home/attend/attendAction';
 import StatisticsItem from './StatisticsItem';
import styles from '../../css/home/attend/statisticsList.css';

class StatisticsList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:[]
        }
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    // componentDidMount(){
    //     //Event.register(ATTEND_REFRESH_ATTENDLIST, this.reloadData);
    //     super.componentDidMount();
    // }

    // componentWillUnmount(){
    //     //Event.unregister(ATTEND_REFRESH_ATTENDLIST, this.reloadData);
    //     super.componentWillUnmount();
    // }

    reloadData = ()=>{
        this.refreshData();
    }

    //取数据函数
    getData(startIndex, isAppend, cb, props){
        let {startDate, endDate} = props, params=null;
            params = {startIndex, startDate, endDate};
        this.props.getStatisticsList(params, isAppend, cb, this, this.update);
        // if(startIndex == 1){
        //     Event.fire(ATTEND_REFRESH_STATSTICBAR);
        // }
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

    //获取没有数据是的提示文本
    getEmptyTip(){
        return (
            <div className={styles.noData}>
                <p className={styles.text}>生命不止，奋斗不息</p>
                <p className={styles.text}>这里空无一物</p>
                <p className={styles.text}>期待你印上第一个足迹</p>
                <div className={styles.noPic}></div>
            </div>
        );
    }

    //绘制列表
    renderList(){
        var {data} = this.state;

        return data.map((item,index)=>{
            var {
                userName,
                createUserImg,
                createUserId,
                branchNo,
                branchName,
                teamNo,
                teamName,
                visitNumber,
                clientNumber} = item;

            return (
                <StatisticsItem
                    Click={this.props.Click}
                    userName={userName}
                    createUserImg={createUserImg}
                    createUserId={createUserId}
                    branchNo={branchNo}
                    branchName={branchName}
                    teamNo={teamNo}
                    teamName={teamName}
                    visitNumber={visitNumber}
                    clientNumber={clientNumber} />
            );
        });
    }

}

function injectAction() {
    return {getStatisticsList};
}

module.exports = connect(null, injectAction())(StatisticsList);
