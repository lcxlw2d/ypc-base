import ReactEcharts from 'echarts-for-react';
import _ from 'lodash';
import styles from '../../css/home/employeeValue/Performance.css';

class BarLine extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            echartsStyle: {
                height: '250px',
            },
            params: this.props.gerenList || [],
            titleColor:'#FA6B6F',
        }
    }

    // componentDidMount() {
    // //    this.setRadius()
    // }

    // setRadius = () => {
    //     var width = document.body.offsetWidth;
    //     if(width>=414){
    //         this.setState({radius:"70%"})
    //     }else if(width>=375){
    //         this.setState({radius:"60%"})
    //     }
    // }

    getOption = () => {
        var {
            showLine=false,
            barName='',
            lineName='',
            dateArray=[],
            legendArray=[],
            colorArray=[],
            seriesArray=[],
            maxY1,
            maxY2,
        } = this.props, {radius, titleColor, params=[],}=this.state;

        return {
            grid: {
                left: '6%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            color: colorArray,
            legend: {
                data:legendArray
            },
            xAxis: [
                {
                    type: 'category',
                    data: dateArray,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                     name: barName,
                     min: 0,
                     max: maxY1,
                     interval: maxY1/5,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: lineName,
                    show:showLine,
                    min: 0,
                    max: maxY2,
                    interval: maxY2/5,
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: seriesArray
            // [
            //     {
            //         name:'蒸发量',
            //         stack: '总量',
            //         type:'bar',
            //         data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, ],
            //     },
            //     {
            //         name:'降水量',
            //         stack: '总量',
            //         type:'bar',
            //         data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, ],
            //     },
            //     {
            //         name:'平均温度',
            //         type:'line',
            //         yAxisIndex: 1,
            //         data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, ]
            //     }
            // ]
        };
    }

    render() {
        systemApi.log("BarLine render");
        var {echartsStyle} = this.state, {title=''} = this.props;
        return (
            <div className={styles.mychart}>
                <h1 className={styles.ct_h01}>{title}</h1>
                <div className={styles.chartbox}>
                    <ReactEcharts option={this.getOption()} style={echartsStyle}/>
                </div>
            </div>
        )
    }
}

module.exports = BarLine;
