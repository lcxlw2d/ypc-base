import {connect} from 'react-redux';
import {getNewsList, ATTEND_REFRESH_ATTENDLIST} from '../../../actions/home/newscenter/newscenterAction';
import NewsListItem from './NewsListItem';
import styles from '../../css/home/newscenter/newsList.css';

class NewsList extends CursorList {

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

    renderDateTime(){
        var date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            day = date.getDate();
        month = month<10?"0"+month:month;
        day = day<10?"0"+day:day;
        return year+month+day;
    }

    //取数据函数
    getData(startIndex,isAppend,cb,props){
        var dateTime = this.renderDateTime(),
            params = {
                startIndex,
                length:50,
                startDate:dateTime,
                endDate:dateTime
            };
        this.props.getNewsList(params, isAppend, cb, this, this.update);
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
    //更改被点击的子元素的样式
    onSetState = (val) => {
        var {data} = this.state;
        data.map((item,index)=>{
            if(item.noticeId == val){
                item.readStatus = 1;
            }
        })
        this.forceUpdate();
    }
    //绘制列表
    renderList(){
        var {data} = this.state;

        return data.map((item,index)=>{
            var {noticeTitle,abstracts,noticeId,noticeTypevalue,likeStatus,readCounts,
                likeCounts,createDate,readStatus} = item;

            return (
                <NewsListItem
                    key={noticeId}
                    title={noticeTitle}
                    abstract={abstracts}
                    type={noticeTypevalue}
                    noticeId={noticeId}
                    readCounts={readCounts}
                    likeStatus={likeStatus}
                    likeCounts={likeCounts}
                    createDate={createDate}
                    readStatus={readStatus}
                    onSetStye ={this.onSetState} />
            );
        });
    }

}

function injectAction() {
    return {getNewsList};
}

module.exports = connect(null, injectAction())(NewsList);
