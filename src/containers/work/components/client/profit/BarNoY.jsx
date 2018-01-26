import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import styles from "./css/BarNoY.css";
class ProPie extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    getOption = () => {
        let labelTop = {
            normal: {
                position: 'top'
            }
        }, labelBottom = {
            normal: {
                position: 'bottom'
            }
        };

        let { data = [], end, xData = ['股票', '基金', '理财', '其他']} = this.props,  color = [];

        end = end? end - 1 :data.length - 1;

        data = data.map((item, index) => {
            if(item >=0){
                color[index] = '#ff4433';
                return {value: `+${item}`, label:labelBottom}
            }else{
                color[index] = '#37a11b';
                return {value: item, label:labelTop}
            }

        })


        return {
            dataZoom:[{
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'none',
                zoomLock:true,
                startValue:0,
                endValue:end,
            }],
            yAxis: {
                type : 'value',
                position: 'top',
                splitLine: {lineStyle:{type:'solid'}},
                axisLine: {show: false},
                axisTick: {
                    show: false
                },
                axisLabel:{
                    show:false,

                }
            },
            xAxis: {
                type : 'category',
                data : xData,
                axisLine: {show: false},
                axisTick: {
                    show: false
                },
            },
            grid:{
                x:10,
                y:10,
                x2:10,
                y2:30,
            },
            series : [
                {
                    name:'生活费',
                    type:'bar',
                    stack: '总量',
                    silent:true,
                    label: {
                        normal: {
                            show: true,
                            color:['red', ],
                            formatter:'{c}',
                            position:'bottom',
                        }
                    },
                    barMaxWidth:30,
                    itemStyle: {
                        normal: {
                            color:function (params){
                                var colorList = color;
                                return colorList[params.dataIndex];
                            },
                        }},
                    data:data
                }
            ]
        }
    }

    render() {
        systemApi.log(" ProPie render");
        let {name='',  value=0, color } = this.props;
        return (
                <ReactEcharts option={this.getOption()} style={{height: "240px"}}/>
        )
    }
}

module.exports = ProPie;
