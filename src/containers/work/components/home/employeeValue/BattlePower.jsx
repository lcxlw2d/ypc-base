import ReactEcharts from 'echarts-for-react';
import styles from '../../css/home/employeeValue/Performance.css';

class BattlePower extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            echartsStyle: {
                height: '250px',
            },
            isPingJun:false,
            titleColor:'#FA6B6F',
            radius:'40%'
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
            maxEffectiveAsset,
            maxProductIncome,
            maxMarginIncome,
            maxCreditIncome,
            maxNetFareIncome,
            pingjunList=[],
            gerenList=[]
        } = this.props, {radius, titleColor, isPingJun=false}=this.state, params=[];
        params = isPingJun?pingjunList:gerenList;
        // console.log('maxEffectiveAsset '+maxEffectiveAsset)
        // console.log('maxProductIncome '+maxProductIncome)
        // console.log('maxMarginIncome '+maxMarginIncome)
        // console.log('maxCreditIncome '+maxCreditIncome)
        // console.log('maxNetFareIncome '+maxNetFareIncome)
        // // console.log('params  '+params)
        // console.log('gerenList   '+gerenList)
        // console.log('pingjunList  '+pingjunList)
        // console.log(this.props.key)
        return {
            animation: false,
            radar: {
                center: [
                    '50%', '50%'
                ],
                radius: radius,
                startAngle: 90,
                splitNumber: 6,
                shape: 'polygon',
                name: {
                    formatter: (value, indicator) => {
                        switch (indicator.name) {
                            case '交易净佣金':
                                value = `${indicator.name}\n${params[0]}`;
                                break;
                            case '有效资产':
                                value = `${indicator.name}\n${params[1]}`;
                                break;
                            case '产品收入':
                                value = `${indicator.name}\n${params[2]}`;
                                break;
                            case '保证金利差收入':
                                value = `${indicator.name}\n${params[3]}`;
                                break;
                            case '信用业务收入':
                                value = `${indicator.name}\n${params[4]}`;
                                break;
                            default:
                                break;
                        }

                        return value;
                    },
                    // rich: {
                    //     a: {
                    //         color: '#FA6B6F',
                    //     },
                    //     b: {
                    //         color:'#96D9F2'
                    //     },
                    // },
                    textStyle: {
                        color:titleColor,
                        align:'center',
                        fontWeight:600,
                    }
                },
                axisLine: {
                    show: false
                },
                indicator: [
                    {
                        name: '交易净佣金',
                        max: maxNetFareIncome
                    }, {
                        name: '有效资产',
                        max: maxEffectiveAsset
                    }, {
                        name: '产品收入',
                        max: maxProductIncome
                    }, {
                        name: '保证金利差收入',
                        max: maxMarginIncome
                    }, {
                        name: '信用业务收入',
                        max: maxCreditIncome
                    }
                ]
            },
            series: [
                {
                    name: 'wzry',
                    type: 'radar',
                    clickable: false,
                    data: [
                        {
                            value: gerenList,
                            lineStyle: {
                                normal: {
                                    color: '#FA6B6F',
                                    width: 1
                                }
                            },
                            areaStyle: {
                                normal: {
                                color: '#FA6B6F'
                            }},
                            name: '我的战力'
                        },
                        {
                            value:pingjunList,
                            lineStyle: {
                                normal: {
                                    color: '#96D9F2',
                                    width: 1
                                }
                            },
                            areaStyle: {
                                normal: {
                                color: '#96D9F2'
                            }},
                            name: '平均战力'
                        }
                    ]
                }
            ]
        }
    }

    qiehuan2 = () => {

        this.setState({isPingJun:true, titleColor:'#96D9F2'});

    }

    qiehuan1 = () => {
        this.setState({isPingJun:false, titleColor:'#FA6B6F'});
    }


    render() {
        systemApi.log("BattlePower render");
        var {echartsStyle} = this.state;
        return (
            <div className={styles.positionRe}>
                <ReactEcharts option={this.getOption()} style={echartsStyle}/>
                <div className={this.mergeClassName(styles.ct_intro, styles.positionTip)}>
                    <span onClick={this.qiehuan1} className={styles.left}><i className={styles.k_red}></i><span className={styles.left}>我的战力</span></span>
                    <span onClick={this.qiehuan2} className={styles.left}><i className={styles.k_blue}></i><span class={styles.left}>平均战力</span></span>
                    <span  className={styles.right}>（单位：万元）</span>
                </div>
            </div>
        )
    }
}

module.exports = BattlePower;
