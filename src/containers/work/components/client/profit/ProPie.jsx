import ReactEcharts from 'echarts-for-react';
// import _ from 'lodash';
import styles from "./css/proPie.css";
class ProPie extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    getOption = () => {

        let {name, value, color} = this.props;
        return {
            color:[color, '#eff0f4'],
            series: [
                {
                    name:'总',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    silent:true,
                    hoverAnimation:false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            formatter:function(params) {
                                if(value){
                                    return `${value}%`
                                }else{
                                    return ''
                                }
                            },
                            textStyle: {
                                fontSize: '16',
                                color: color
                            }
                        }
                    },
                    data:[
                        {value:value,
                        name:'参数',
                        label:{
                                normal:{
                                    show:true
                                }
                            },
                         },
                        {value:100-value, name:'补白'},
                    ]
                }
            ]
        };
    }

    render() {
        systemApi.log(" ProPie render");
        let {name='',  value, color, rank } = this.props;
        rank = rank?rank*100:'--';

        return (
            <div className={styles.preference}>
                <div className={styles.pretit}>{name}</div>
                <div className={styles.prechart}><ReactEcharts option={this.getOption()} style={{width:'100%', height:'100%'}}/></div>
                {name == '日均换手率'?<div className={styles.preintro}>超过<span className={Color.red}>{rank}%</span>股民</div>:null}
                {name == '投资偏好中小板'?<div className={styles.preintro}>和<span className={Color.blue}>{rank}%</span>股民一样</div>:null}
                {name == '最大回撤'?<div className={styles.preintro}>超过<span className={Color.orange}>{rank}%</span>股民</div>:null}
            </div>
        )
    }
}

module.exports = ProPie;
