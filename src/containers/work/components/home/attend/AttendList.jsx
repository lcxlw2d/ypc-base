import {connect} from 'react-redux';
import {getAttendList, ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../../actions/home/attend/attendAction';
import AttendListItem from './AttendListItem';
import styles from '../../css/home/attend/attendList.css';

class AttendList extends CursorList {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //获取scroll样式，主要用于定位
    getScrollStyle(){
        return styles.frame;
    }

    componentDidMount(){
        Event.register(ATTEND_REFRESH_ATTENDLIST, this.reloadData);
        super.componentDidMount();
    }

    componentWillUnmount(){
        Event.unregister(ATTEND_REFRESH_ATTENDLIST, this.reloadData);
        super.componentWillUnmount();
    }

    reloadData = ()=>{
        this.refreshData();
    }

    //取数据函数
    getData(startIndex,isAppend,cb,props){

        let { startDate, endDate, userId, searchRange, address} = props, params;
            params = {
                startIndex,
                length:50,
                searchRange
            };
            if(userId){
                params['userId'] = userId;
            }
            if(startDate){
                params['startDate'] = startDate;
            }
            if(endDate){
                params['endDate'] = endDate;
            }
        this.props.getAttendList(params, isAppend, cb, this, this.update);
        if(startIndex == 1){
            if(address==2)return;
            Event.fire(ATTEND_REFRESH_STATSTICBAR);
        }
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
            var {visitId,userId,userName,clients,startTime,endDate,endTime,duration,location,createUserImg,
                longitude,latitude,content,contentType,status,imgs,positioned,shareable,owned,commentNumber} = item;

            return (
                <AttendListItem
                    key={visitId}
                    articleId={visitId}
                    contentType={contentType}
                    userName={userName}
                    addressName={location}
                    clients={clients}
                    startTime={startTime}
                    imgs={imgs}
                    status={status}
                    content={content}
                    shareable={shareable}
                    positioned={positioned}
                    owned={owned}
                    createUserImg={createUserImg}
                    commentNumber={commentNumber}
                    address={this.props.address} />
            );
        });
    }

}

function injectAction() {
    return {getAttendList};
}

module.exports = connect(null, injectAction())(AttendList);
