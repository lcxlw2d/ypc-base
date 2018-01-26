import styles from '../../css/client/detail/assetChart.css';

let ReactEcharts = null;

class CreditAssetChart extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.colors = ["#ff7373", "#adcb6f", "#a087bd", "#5dbfd7", "#d1bad7"];
        this.state = {
            loadEchart:false
        }
    }

    normalization() {
        var total = 0,
            data = this.props.assetChart,
            dataNormal = {};
        for (var key in data) {
            var tmp = data[key].trim();
            tmp = tmp.replace(/,/g, "");
            switch (key) {
                case "closeMarketValue":
                    dataNormal["证券市值"] = tmp;
                    break;
                case "currentBalance":
                    dataNormal["资金余额"] = tmp;
                    break;
                default:
                    break;
            }
        }

        return dataNormal;
    }

    normalizationDebt() {
        var total = 0,
            data = this.props.assetChart,
            dataNormal = {};
        for (var key in data) {
            var tmp = data[key].trim();
            tmp = tmp.replace(/,/g, "");
            switch (key) {
                case "financeCloseBalance":
                    dataNormal["融资负债"] = tmp;
                    break;
                case "shortsellCloseBalance":
                    dataNormal["融券负债"] = tmp;
                    break;
                case "closeFareDebit":
                    dataNormal["费用负债"] = tmp;
                    break;
                case "closeOtherDebit":
                    dataNormal["其他负债"] = tmp;
                    break;
                case "totalInterest":
                    dataNormal["利息总额"] = tmp;
                    break;
                default:
                    break;
            }
        }

        return dataNormal;
    }

    componentWillMount() {

        this.setState({data: this.props.assetChart})
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.assetChart})
    }
    componentDidMount() {
        this.loadEcharts();
    }
    loadEcharts()
    {
        var self = this;
        require.ensure([], function(require) {
            ReactEcharts = require('echarts-for-react');
            self.setState({loadEchart: true})
        }, 'echarts');
    }
    getOption() {

        var data = this.normalization(),
            dataList = [];

        for (var key in data) {
            dataList.push({name: key, value: data[key]});
        }

        return {
            color: this.colors,
            title: {
                text: '资\n产\n信\n息',
                left: '5',
                top :'middle',
                textStyle:{
                    color:'#666',
                    fontSize:'14'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                selectedMode: false,
                data: [
                    {
                        name: "证券市值",
                        icon: "roundRect"

                    }, {
                        name: "资金余额",
                        icon: "roundRect"
                    }
                ],
                right: "right",
                bottom: "center",
                padding: [0, 100, 0, 0]
            },
            series: [
                {
                    type: "pie",
                    name: "资产信息",
                    data: dataList,
                    legendHoverLink: false,
                    hoverAnimation: false,
                    center: [
                        '27%', '50%'
                    ],
                    radius: [
                        0, "52%"
                    ],
                    label: {
                        normal: {
                            show: false
                        }
                    }
                }
            ]
        }
    }

    getOptionDebt() {

        var data = this.normalizationDebt(),
            dataList = [];

        for (var key in data) {
            dataList.push({name: key, value: data[key]});
        }

        return {
            color: this.colors,
            title: {
                text: '负\n债\n信\n息',
                left: '5',
                top :'middle',
                textStyle:{
                    color:'#666',
                    fontSize:'14'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                selectedMode: false,
                data: [
                    {
                        name: "融资负债",
                        icon: "roundRect"

                    }, {
                        name: "融券负债",
                        icon: "roundRect"
                    }, {
                        name: "费用负债",
                        icon: "roundRect"
                    }, {
                        name: "其他负债",
                        icon: "roundRect"
                    }, {
                        name: "利息总额",
                        icon: "roundRect"
                    }
                ],
                right: "right",
                bottom: "center",
                padding: [0, 100, 0, 0]
            },
            series: [
                {
                    type: "pie",
                    name: "负债信息",
                    data: dataList,
                    legendHoverLink: false,
                    hoverAnimation: false,
                    center: [
                        '27%', '50%'
                    ],
                    radius: [
                        0, "52%"
                    ],
                    label: {
                        normal: {
                            show: false
                        }
                    }
                }
            ]
        }
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("CreditAssetChart render");
        var {show} = this.props,
            {loadEchart} = this.state,
            frameCls = styles.frame;

        return (
            <div className={frameCls}>
                {loadEchart?([
                    <ReactEcharts style={{
                        height: "152px"
                    }} option={this.getOption()}/>,
                    <ReactEcharts style={{
                        height: "152px"
                    }} option={this.getOptionDebt()}/>
                ]):null}

            </div>

        );
    }

}

module.exports = CreditAssetChart;
