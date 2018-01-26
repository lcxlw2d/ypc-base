import styles from '../../css/client/profit/profitChart.less';
import _ from 'lodash';
let ReactEcharts = null;

// const firstData = [["2017-1-1",0.15,0.12], ["2017-2-1",0.2], ["2017-3-1",0.1], ["2017-4-1",0.34], ["2017-5-1",-0.03], ["2017-6-1",0], ["2017-7-1",0.21]];
// const secData = [["2017-1-1",0.06], ["2017-2-1",0.24], ["2017-3-1",0.14], ["2017-4-1",-0.06], ["2017-5-1",0.23], ["2017-6-1",0.18], ["2017-7-1",0.19]];
// const redoData = firstData.slice(1,4);
// const markData = firstData.slice(1,3);

class ProfitChart extends PureComponent{

    defaultProps = {
        arrNum:1,
        index:0,
    }
    //构造函数
    constructor(props,context) {
        super(props,context);
        this.colors = ["#eb6354", "#3493e9", "#ffbb01"];
        this.state = {
            loadEchart:false,
            positionObj:{right:[['0', '-36'], ['0', '20']], left:[['-100', '-36'], ['-100', '20']], },
            hideList:[],
        };
        this.maxIndex = 0;
        this.echarts_react = null;
        this.Div = null;
        this.days = [[
            31,
            28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
          ]];
    }

    componentDidMount(){
        // this.maxIndex = this.getMaxPoint();
        this.loadEcharts();
        // this.setHide

    }

    // getMaxPoint(){
    //     var index,
    //         max = -100000;
    //     for(var i=0;i<firstData.length;i++){
    //         var val = firstData[i][1];
    //         if(val >= max){
    //             max = val;
    //             index = i;
    //         }
    //     }
    //     return index;
    // }

    loadEcharts(){
        require.ensure([], (require)=>{
            ReactEcharts = require('echarts-for-react');
            this.setState({loadEchart: true});
        }, 'echarts');
    }

    formatNum(num){
        return +(num.toFixed(2));
    }

    formatDate = (timeData) => {
        if(timeData!=null){
            timeData = String(timeData);
            var year = timeData.substring(0,4);  //"年"
            var month = Number(timeData.substring(4,6))-1; //"月"
            var day = Number(timeData.substring(6,8)); //"日"
            return Date.UTC(year,month,day);

        }else{
            return  "";
        }

    }

    setWeek = week => {
        let weekList=['日', '一', '二', '三', '四', '五', '六'];
        week = new Date(week).getDay();
       return weekList[week]
    }

    hideTip = () => {
        let timeOut = null;
        timeOut&&clearTimeout(timeOut);
        setTimeout(() => {
            this.echarts_react.getEchartsInstance()&&this.echarts_react.getEchartsInstance().dispatchAction({
                type: 'hideTip'
            })
            // this.echarts_react.getEchartsInstance().dispatchAction({
            //     type: 'downplay'
            // })
        }, 3000);
    }

    isMax = (a, b) => {
        if(a>=b)return true;
        return false;
    }

    // setShowDiv = arr => {
    //     if(arr || Object.prototype.toString.call(arr)!="[object Array]")return;
    //     if(arr.length>2){
    //         this.setState({show:false})
    //     }

    // }

    // setHide = arr => {
    //     var date = new Date();
    //     // date.setDate(date.getDate()-1);
    //     var year = date.getFullYear(), month = date.getMonth()+1;
    //     for (let i = 0; i < this.days[month]; i++) {
    //         if (month<10) month = '0'+ month;
    //         var index = '';
    //         index = i<9?'0'+i:i+1;
    //         arr.push([this.formatDate(String(`${year}${month}${index}`)), 1, 1])
    //         // console.log(arr)
    //     }
    //     return arr.slice(0);
    // }

    getOption(){

        let { ListData, indexData, arrNum, index } = this.props, listArr=[], indexArr=[], that = this, { positionObj,  hideList = [] } = this.state, param2 = 'right', param1 = 'right',
        {rateMax, rateMaxDate, backMax,	backMaxStart, backMaxEnd, incomeRangeRate, } = ListData, start=0, end=0, lineList=[], areaList=[], indexS=0, indexE=0, indexArrS = '', indexArrE = '', indexArrR=[], maxIndex=0, xData=[];
       // console.log(this.props)
        // console.log(this.props)
        // indexArrR  listArr
        // console.log(12)
        // hideList = this.setHide(hideList);
        listArr = ListData.record.map((item, index, listarr) => {
            let {tradeDate,	incomeRate,	 dailyIncmRate,	} = item;
            // console.log(this.formatDate(String(tradeDate)))
                if(index == 0){
                    indexArrS = tradeDate;
                }
                if(index == listarr.length-1){
                    indexArrE = tradeDate;
                }
                if(backMaxStart == tradeDate){
                    start = index;
                }
                if(backMaxEnd == tradeDate){
                    end = index;
                }
                if(rateMaxDate == tradeDate){
                    maxIndex = index;
                }
                xData[index] = formatUtil.formatDate(this.formatDate(String(tradeDate)), 'MM-dd');

            return [index, incomeRate, dailyIncmRate, this.formatDate(String(tradeDate)) ]
        })
        // console.log(arrNum)
        // listArr = [...listArr.slice(0, 3)]
        indexArr = indexData.record.map((item, index) => {
            let {tradeDate,	indexRate,	dailyIncmRate,	} = item;
                if(tradeDate == indexArrS){
                    indexS = index
                }
                if(tradeDate == indexArrE){
                    indexE = index
                }
                // console.log(this.formatDate(String(tradeDate)))
            return [ index, indexRate, dailyIncmRate, this.formatDate(String(tradeDate))]
        })

        indexArr = indexArr.slice(indexS, indexE+1)

        // console.log(listArr)

        // lineList = listArr.slice(start, end+1);
        areaList = listArr.slice(start, end+1);
        if( listArr.length && maxIndex > listArr.length*0.6){
            param1 = 'left'
        }
        if(listArr.length && start > listArr.length*0.6){
            param2 = 'left'
        }
        // console.log(lineList)
        // console.log(areaList)
        return {
            color: this.colors,
            title:{
                left:"center",
                textStyle:{
                    color:"#555"
                }
            },
            grid: {
                left: '6%',
                right: '6%',
                bottom: '6%',
                containLabel: true
            },
            tooltip:{
                trigger:"axis",
                confine:true,
                formatter:(params)=>{
                    var myProfit = params[0]?params[0].data || [] : [],
                        profit = params[1]?params[1].data || [] : [];
                    return '时间:'+formatUtil.formatDate(myProfit[3], 'yyyy-MM-dd')+' 星期'+this.setWeek(myProfit[0])+"<br/>我的累计收益率："+(this.formatNum(myProfit[1]*100)+"%")+"<br/>我的当日收益率："+(this.formatNum(myProfit[2]*100)+"%")+"<br/>大盘累计收益率："+(this.formatNum(profit[1]*100)+"%")+"<br/>大盘当日收益率："+(this.formatNum(profit[2]*100)+"%");
                }
            },
            xAxis: {
                type: 'category',
                // minInterval:3600*24*1000,
                // // splitNumber:0,
                // interval:2,
                // // splitNumber:arrNum>5?5:arrNum,
                axisLine:{
                    onZero:false
                },
                splitLine: {
                    show: false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    fontSize:"12",
                    formatter: (value)=>{
                        // console.log(value)
                        // console.log(value)
                        return formatUtil.formatDate(value, 'MM-dd')
                    }
                },

                data:xData
            },
            yAxis: {
                type: 'value',
                position: "right",
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    lineStyle:{
                        type:"dashed"
                    }
                },
                axisLabel:{
                    inside:false,
                    verticalAlign:"bottom",
                    padding:[0,0,5,0],
                    margin:0,
                    fontSize:"12",
                    formatter: (value)=> (value*100).toFixed(1)+"%"
                }
            },
            series:[{
                name:'我的收益',
                type:'line',
                symbol:"circle",
                symbolSize:(data, params)=>{
                    var {dataIndex} = params;
                    // if(dataIndex == this.maxIndex) return 8;
                    if(data[3] == that.formatDate(String(rateMaxDate))) return 8;
                    return 0;
                },
                label:{
                    normal:{
                        show:true,
                        // position:'top',
                        position:this.isMax(start, maxIndex)?positionObj[param1][0]:positionObj[param1][1],
                        // distance:20,
                        formatter:function (params){
                            var {data, dataIndex} = params;
                            // console.log(data[0])
                            // console.log(data[0])
                             if(data[3] == that.formatDate(String(rateMaxDate)) ) return "最高点"+(rateMax*100).toFixed(2)+'%';
                            //   if(dataIndex == that.maxIndex) return "最高点\n"+data[1]*100+'%';
                             return "";
                            // return "最高点"+0.4*100+'%';
                        },
                        textStyle: {
                            color:"#000",
                            fontSize:"14",
                        }
                    }
                    // formatter:'{b}: {c}'
                },
                // data:firstData
                data:listArr
            }
            ,{
                name:'大盘指数',
                type:'line',
                showSymbol:false,
                symbol: 'none',
                data:indexArr
                // data:secData
            },{
                name:'回撤',
                type:'line',
                symbolSize:function(data){
                    var val = data[3];
                    // if(val==areaList[0][1] || val==areaList[areaList.length-1][1]) return 8;
                    if(val==areaList[0][3]) return 8;
                    return 0;
                },
                label:{
                    normal:{
                        show:true,
                        // distance:"100",
                        // offset:[0, -25],
                        position:this.isMax(start, maxIndex)?positionObj[param2][1]:positionObj[param2][0],
                        formatter:function(params){
                            // console.log(data[1]==markData[0][1])
                            var {data, dataIndex} = params;
                            // console.log(data)
                            if(data[3]==areaList[0][3])return "最大回撤"+(backMax*100).toFixed(2)+"%";;
                            return "";
                        },
                        textStyle: {
                            fontSize:"14",
                            color:"#000",
                        }
                    }
                },

                data:areaList
            },
        ]
        };
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ProfitChart render");

        var {loadEchart, show} = this.state, { show = true } = this.props;

        return(
            <div>
                {loadEchart?(
                    <div className={styles.cl_tit} onTouchEnd={this.hideTip}>
                        <center>盈亏分析</center>
                        <i onClick={this.props.onClick}></i>
                        {show?<div className={styles.div_No}>
                                暂无数据
                        </div>:
                        <ReactEcharts style={{height: "252px"}} ref={(e) => { this.echarts_react = e; }} option={this.getOption()}/>}
                    </div>
                ):null}
            </div>
        );
    }

}

module.exports = ProfitChart;
