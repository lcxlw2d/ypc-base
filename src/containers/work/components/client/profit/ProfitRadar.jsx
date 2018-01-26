import ReactEcharts from 'echarts-for-react';
// import _ from 'lodash';
import styles from "./css/ProfitRadar.css";
class ProfitRadar extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    getOption = () => {

        let {holdCntl, timeSelect, stockSelect, profitGain, riskMgr, } = this.props, data=[];
        data = [holdCntl, timeSelect, profitGain, riskMgr, stockSelect]
        return {
            backgroundColor: "#fff",
            animation: false,
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     // containLabel: true
            // },
           radar: {
               center: ['50%', '50%'],
               radius: '70%',
               startAngle: 90,
               splitNumber: 5,
               triggerEvent:true,
               shape: 'polygon',
               name: {
                   formatter:'{value}',
                   textStyle: {
                       color:'#555'
                   }
               },
               axisLine: {
                    show: false
                },
               indicator: [
                    { name: '仓位能力', max: 100},
                    { name: '择时能力', max: 100},
                    { name: '盈利能力', max: 100},
                    { name: '抗风险能力', max: 100},
                    { name: '选股能力', max: 100}
                ]
           },
            series: [
                       {
                           name: '',
                           type: 'radar',
                           clickable: false,
                           symbol:'none',

                           data: [
                               {
                                   value: data,
                                   name: '数据',
                                   lineStyle: {
                                    normal: {
                                        color: '#3492e9',
                                        width: 2
                                    }
                                }
                               }
                           ]
                       }
                   ]
       };
    }

    onEvents = () => {
        return { 'click':this.onClick, }
    }

    onClick = params => {
            console.log(params)
            // alert(params.name)
        switch (params.name) {
            case '仓位能力':

                break;
            case '择时能力':

                break;
            case '盈利能力':

                break;
            case '抗风险能力':

                break;
            case '选股能力':

                break;

            default:
                break;
            }
    }


    render() {
        systemApi.log(" ProfitRadar render");
        let {} = this.props;
        return (<ReactEcharts option={this.getOption()} onEvents={this.onEvents()} style={{ height:'240px'}}/>)
    }
}

module.exports = ProfitRadar;
