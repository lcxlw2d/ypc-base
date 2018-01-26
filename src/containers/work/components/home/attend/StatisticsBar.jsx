import {connect} from 'react-redux';
import {getStatisticsInfo} from '../../../actions/home/attend/attendAction';
import {ATTEND_REFRESH_STATSTICBAR} from '../../../actions/home/attend/attendAction';

import styles from '../../css/home/attend/statisticsBar.css';

class StatisticsBar extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state={
            totalUser:'--',
            totalClient:'--'
        };
    }

    componentDidMount() {
        this.loadData();
         Event.register(ATTEND_REFRESH_STATSTICBAR, this.loadData);
    }

    componentWillUnmount(){
         Event.unregister(ATTEND_REFRESH_STATSTICBAR, this.loadData);
        super.componentWillUnmount();
    }

    //重新获取数据
    loadData = ()=>{
        var {dateTime} = this.props,
            params = {
                startDate:dateTime,
                endDate:dateTime,
                searchRange:"1"
            }

        this.props.getStatisticsInfo(params, this, this.update);
    }

    //更新数据
    update = (data) => {
        this.setState(data);
    }

    goTostatistics = () => {
        hashHistory.push("work/home/attend/statistics");
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("StatisticsBar render");
        var {year,month,day} = this.props,
            {totalUser,totalClient}=this.state;

        return (
            // <div className={styles.attendancebox}>
            //     <div className={styles.attendance_top}>
            //         <div className={styles.at_today}>
            //             <p className={styles.c9}>{year}年{month}月</p>
            //             <p className={styles.white}>
            //                 <span>{day}</span>日</p>
            //         </div>
            //         <div className={styles.at_member}>
            //             <p className={styles.c9}>留下足迹</p>
            //             <p className={styles.white}>{totalUser}人</p>
            //         </div>
            //         <div className={this.mergeClassName(styles.at_member, styles.noborder)}>
            //             <p className={styles.c9}>拜访客户</p>
            //             <p className={styles.white}>{totalClient}位</p>
            //         </div>
            //     </div>
            // </div>
                <div className={styles.today_add}>
                    <div className={styles.tdd_left}>
                        <div><span className={styles.tdd_num}>{totalUser}</span><span>人</span></div>
                        <div>留下足迹</div>
                    </div>
                    <div className={styles.tdd_mid}>
                        <div className={styles.addtext}><span>今日新增</span></div>
                        <div className={styles.addlineleft_v}></div>
                        <div className={styles.addlineright_v}></div>
                        <div className={styles.addlineleft_t}></div>
                        <div className={styles.addlineright_t}></div>
                        <div className={styles.addcircleleft}></div>
                        <div className={styles.addcircleright}></div>
                    </div>
                    <div className={styles.tdd_left}>
                        <div><span className={styles.tdd_num}>{totalClient}</span><span>人</span></div>
                        <div>拜访客户</div>
                    </div>
                    <div className='clear'></div>
                    <div className={styles.addbtn} onClick={this.goTostatistics}><a>查看更多</a></div>
                </div>
        );
    }
}

function injectAction() {
    return {getStatisticsInfo};
}

module.exports = connect(null, injectAction())(StatisticsBar);
