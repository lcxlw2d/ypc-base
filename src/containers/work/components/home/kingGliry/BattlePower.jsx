import ReactEcharts from 'echarts-for-react';
import styles from '../../css/home/kingGlory/BattlePower.css';

class BattlePower extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            echartsStyle: {
                height: "250px"
            },
            radius:"50%"
        }
    }

    componentDidMount() {
        this.setRadius()
    }

    setRadius = () => {
        var width = document.body.offsetWidth;
        if(width>=414){
            this.setState({radius:"70%"})
        }else if(width>=375){
            this.setState({radius:"60%"})
        }
    }

    getOption = () => {
        var {
            kingValue,
            maxKingValue,
            shooterValue,
            maxShooterValue,
            tankValue,
            maxTankValue,
            killerValue,
            maxKillerValue,
            masterValue,
            maxMasterValue
        } = this.props, {radius}=this.state;
        return {
            animation: false,
            radar: {
                center: [
                    '50%', '51%'
                ],
                radius: radius,
                startAngle: 90,
                splitNumber: 5,
                shape: 'polygon',
                name: {
                    formatter: (value, indicator) => {
                        switch (indicator.name) {
                            case '累计二级股基准佣金':
                                value = `王者战力\n${kingValue}元\n(${indicator.name})`;
                                break;
                            case '交易客户数量':
                                value = `射手战力\n${shooterValue}人\n(${indicator.name})`;
                                break;
                            case '人均资产':
                                value = `坦克战力\n${tankValue}元\n(${indicator.name})`;
                                break;
                            case '换手率':
                                value = `刺客战力\n${killerValue}\n(${indicator.name})`;
                                break;
                            case '净佣金率':
                                value = `法师战力\n${masterValue}%\n(${indicator.name})`;
                                break;
                            default:
                                break;
                        }

                        return value;
                    },
                    textStyle: {
                        fontSize: 13,
                        fontFamily: [
                            'Microsoft Yahei', 'tahoma', 'arial', '宋体'
                        ],
                        color: '#5f5434'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['#1F3D53']
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#3aa8a9'
                    }
                },
                indicator: [
                    {
                        name: '累计二级股基净佣金',
                        max: maxKingValue
                    }, {
                        name: '交易客户数量',
                        max: maxShooterValue
                    }, {
                        name: '人均资产',
                        max: maxTankValue
                    }, {
                        name: '换手率',
                        max: maxKillerValue
                    }, {
                        name: '净佣金率',
                        max: maxMasterValue
                    }
                ]
            },
            series: [
                {
                    name: 'wzry',
                    type: 'radar',
                    clickable: false,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default',
                                color: "rgba(22,37,24,.35)"
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#fff',
                            width: 1
                        }
                    },
                    data: [
                        {
                            value: [
                                kingValue, shooterValue, tankValue, killerValue, masterValue
                            ],
                            name: 'wzry'
                        }
                    ]
                }
            ]
        }
    }

    render() {
        systemApi.log("BattlePower render");
        var {echartsStyle} = this.state;
        return (
            <div className={styles.my_combat}>
                <div className={styles.wzrytit01}><img src="./images/work/home/wzry/wzry_tit02.png"/></div>
                <ReactEcharts option={this.getOption()} style={echartsStyle}/>
            </div>
        )
    }
}

module.exports = BattlePower;