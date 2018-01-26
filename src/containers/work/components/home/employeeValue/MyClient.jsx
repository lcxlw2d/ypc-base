import {connect} from 'react-redux';
// //公共库
import _ from 'lodash';
//私有
// import {getAttendList, ATTEND_REFRESH_ATTENDLIST, ATTEND_REFRESH_STATSTICBAR} from '../../../actions/home/attend/attendAction';
import BarLine from './BarLine';
import List from './List';
import {getMyClientData} from '../../../actions/home/employeeValue/PerformanceAction';
import styles from '../../css/home/employeeValue/Performance.css';


class MyClient extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:{},
            mySelect:false,
            mySelectValue:"本月",
            mySelectValue2:"本年",
            searchRangeValue:"全司",
            searchRange:1,
        }

    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.props.getMyClientData(data => { this.setState({data});this.props.setUpdateTime(data.updateTime) }, this)
    }

    //我的江湖总榜
    renderMyList = (...data) => {
        let { clients='---', newClientsM='---', newClientsY='---', clientRankM='--', clientRankY='--' } = this.state.data;

        clients=clients.toLocaleString();
        newClientsM=newClientsM.toLocaleString();
        newClientsY=newClientsY.toLocaleString();

        return [<div className={styles.table_top}>
                    <h1 className={styles.h_left}>我的江湖总榜</h1>
                    <div className={styles.rt_ranking}>
                        <span>本月第</span>
                        <span className={styles.redbg}>{clientRankM}</span>
                        <span>名</span>
                        <span>本年第</span>
                        <span className={styles.bluebg}>{clientRankY}</span>
                        <span>名</span>
                    </div>
                </div>,
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <th>客户总数</th>
                            <th>本月新开</th>
                            <th>本年新开</th>
                        </tr>
                        <tr>
                            <td className={styles.tt_left}><span className={Color.red}>{clients}</span></td>
                            <td><span className={Color.red}>{newClientsM}</span></td>
                            <td><span className={Color.red}>{newClientsY}</span></td>
                        </tr>
                    </tbody>
                </table>]
    }

    //资产对比
    renderDuiBi = () => {

        let {validClients='---', invalidClients='---'}=this.state.data, blue=0, red = 0;

        if(typeof(validClients)=='number' && typeof(invalidClients)=='number'){

            blue = Math.floor(validClients/(validClients+invalidClients)*100);
            red = 100-blue;
        }

        validClients = validClients.toLocaleString();
        invalidClients = invalidClients.toLocaleString();

        return [<div className={styles.processbar}>
                    <div className={styles.proc_bar}>
                        <ul>
                            <li className={styles.bar01} style={{width:`${blue}%`}}></li>
                            <li className={styles.bar02} style={{width:`${red}%`}}></li>
                        </ul>
                    </div>
                    <div className={styles.proc_text}>
                        <div className={styles.proctt01}>有效户数：<span className={styles.vl_blue}>{validClients}</span></div>
                        <div className={styles.proctt01}>无效户数：<span className={styles.vl_red}>{invalidClients}</span></div>
                    </div>
                </div>]
    }

    //列表查询条件
    renderChaXun = () => {
        let {mySelect, mySelectValue='', mySelectValue2='', searchRangeValue='全司'}=this.state;
        return[<div className={styles.rank_tab}>
                    <ul onClick={this.getSearchRange} style={{overflow:"hidden"}}>
                        <li className={this.mergeClassName(styles.rktab01, searchRangeValue=='全司'?styles.on:'')}><a>全司</a></li>
                        <li className={this.mergeClassName(styles.rktab02, searchRangeValue=='分公司'?styles.on:'')}><a>分公司</a></li>
                        <li className={this.mergeClassName(styles.rktab03, searchRangeValue=='营业部'?styles.on:'')}><a>营业部</a></li>
                    </ul>
                </div>,
                <div className={styles.selectbtn} onClick={this.myFenZu1}>
                    <a className={styles.on}>{mySelectValue}</a>
                    {mySelect?<ul><li><a>{mySelectValue2}</a></li></ul>:null}
                </div>]
            }

        //列表获取查询范围
        getSearchRange = e => {
            let {searchRangeValue='全司', searchRange} = this.state, text='';
            text = e.target.innerText;
            this.setState((prevState, props) => {
                if(prevState.searchRangeValue==text)return{};
                if(text=='全司') searchRange = 1;
                if(text=='分公司') searchRange = 2;
                if(text=='营业部') searchRange = 3;

                return {searchRangeValue:text, searchRange:searchRange}

            })


        }

        //列表切换本月/本年按钮
        myFenZu1= e => {
            let {mySelect, mySelectValue='', mySelectValue2 = ''} = this.state, text='';
            text = e.target.innerText.length>2?mySelectValue:e.target.innerText;
            this.setState((prevState, props) => {
                if(prevState.mySelect==false){
                    if(prevState.mySelectValue=='本月'){
                        mySelectValue2 = '本年'
                    }else if(prevState.mySelectValue=='本年'){
                        mySelectValue2 = '本月'
                    }
                    return{mySelect: !prevState.mySelect, mySelectValue2}
                }else{
                    return {mySelect: !prevState.mySelect,  mySelectValue:text}
                }
             });
        }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Assets render");

        let{mySelectValue='本月', searchRange='1'}=this.state, {dateArray=[], validClientsArray=[], invalidClientsArray=[], validClientsGrowthMArray=[]} = this.state.data,maxY1, maxY2;
        mySelectValue = mySelectValue=='本年'?'year':'month';
        maxY1 = validClientsArray.length>0? _.max(validClientsArray)+(invalidClientsArray.length>0?_.max(invalidClientsArray):0):0;
        maxY2 = validClientsGrowthMArray.length>0? _.max(validClientsGrowthMArray):'';
        maxY1 = maxY1?Math.ceil(maxY1/10)*10:0;
        maxY2 = maxY2?Math.ceil(maxY2/10)*10:0;

        return (
                <div>
                    <div className={styles.myinnerbox}>
                        <div className={this.mergeClassName(styles.mytable, styles.myrank)}>
                            {this.renderMyList()}
                            {this.renderDuiBi()}
                        </div>
                        <BarLine title='近半年客户数走势图' maxY1={maxY1} maxY2={maxY2} dateArray={dateArray} colorArray={['#e1624e', '#91dcf1','#fcc667']} seriesArray={[{name:'有效', stack: '总量', type:'bar', data:validClientsArray }, {name:'月新增', type:'line', yAxisIndex: 1, data:validClientsGrowthMArray },{name:'无效', stack: '总量', type:'bar', data:invalidClientsArray },  ]} legendArray={['有效', '无效', '月新增']} barName='' lineName='' showLine={true}/>
                        <div className={styles.vl_rank}>
                            {this.renderChaXun()}
                            <div className={styles.ranklistbox}>
                                <List danWei='户'  orderField='XKH' orderType={mySelectValue} searchRange={searchRange} title='谁的门派弟子发展最快？' titleTip='名下新开户总榜'/>
                                <List danWei='户'  orderField='YXH' orderType={mySelectValue} searchRange={searchRange} title='谁的门派高手最多？' titleTip='名下有效户增长总榜'/>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}


function injectAction() {
    return {getMyClientData};
}

module.exports = connect(null, injectAction())(MyClient);
