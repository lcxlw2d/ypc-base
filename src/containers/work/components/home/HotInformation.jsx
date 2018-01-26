import {connect} from 'react-redux';
import {getHeadLine} from '../../actions/home/newscenter/newscenterAction';

import Category from '../../../../components/common/category/Category';
import SwipeableTable from '../../../../components/common/swipeable/SwipeableTable';
import TextFlat from '../../../../components/common/category/TextFlat';
import TransferItem from './TransferItem';

import SwipeableViews from 'react-swipeable-views';
import autoPlay from 'react-swipeable-views/lib/autoPlay';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



import styles from '../css/home/hotInformation.css';

//当日银证转账
class HotInformation extends PureComponent {

    static defaultProps = {
        picList:[],
        autoplay:true,
        interval:3000
    }

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            index:0,
            data:[]
        }
    }

    componentDidMount(){
        this.props.getHeadLine((data)=>{
            this.setState({data});
        },this);
    }

    handleChange = (index)=>{
        this.setState({index});
    }

    gotoDetail = (noticeId)=>()=>{
        Client.trackEvent("1009","HOME_CLICK_HOTNEWS");
        hashHistory.push("/work/home/newsdetail/"+noticeId);
    }
    renderItems(){
        var {picList} = this.props;

        return picList.map((item,i)=>{
            var style = {
                    backgroundImage:"url("+item.url+")"
                };
            return (<div className={styles.listItem} key={i} style={style} onClick={this.itemClick(i)}></div> );
        });
    }

    renderList(){
        var {data=[]}=this.state;
        return data.map((item,index)=>{
            var {noticeId,noticeTitle,abstracts,noticeTypevalue,createDate} = item;
            return (
                <div className={styles.hotnews_title} onClick={this.gotoDetail(noticeId)}>
                <div className={styles.hotnews_rec}>
                    <div className={styles.hotnews_rec_tit}>
                        <i>{noticeTypevalue}</i>{noticeTitle}</div>
                    <div className={styles.hotnews_rec_text}>{abstracts}</div>
                </div>
                </div>
            )
        });
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("HotInformation render");
        var {index} = this.state,
            {autoplay,interval} = this.props;
        return (
            <div>
            <div className={styles.hotnews}>
                <div className={styles.hotnews_icon}></div>
                <div className={styles.line}></div>
                <AutoPlaySwipeableViews
                    index={index}
                    axis="y"
                    containerStyle={{height:"54px"}}
                    autoplay={autoplay}
                    interval={interval}
                    onChangeIndex={this.handleChange}>
                    {this.renderList()}
                </AutoPlaySwipeableViews>
            </div>
            </div>
        );
    }

}

function injectAction() {
    return {getHeadLine};
}

module.exports = connect(null, injectAction())(HotInformation);
