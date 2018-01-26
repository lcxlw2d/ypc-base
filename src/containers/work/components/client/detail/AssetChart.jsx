import styles from '../../css/client/detail/assetChart.css';

let ReactEcharts = null;

class AssetChart extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.colors = ["#ff7373", "#adcb6f", "#a087bd", "#5dbfd7"];
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
                case "stocks":
                    dataNormal["市值"] = tmp;
                    break;
                case "product":
                    dataNormal["产品"] = tmp;
                    break;
                case "debt":
                    dataNormal["净资产"] = tmp;
                    break;
                case "money":
                    dataNormal["资金"] = tmp;
                    break;
                default:
                    dataNormal["其它"] = tmp;
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
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                selectedMode: false,
                data: [
                    {
                        name: "市值",
                        icon: "roundRect"

                    }, {
                        name: "净资产",
                        icon: "roundRect"
                    }, {
                        name: "产品",
                        icon: "roundRect"
                    }, {
                        name: "资金",
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
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("AssetChart render");
        var {show} = this.props,
            {loadEchart} = this.state,
            frameCls = styles.frame;

        return (
            <div className={frameCls}>
                {loadEchart?(
                    <ReactEcharts style={{
                        height: "152px"
                    }} option={this.getOption()}/>
                ):null}
            </div>

        );
    }

}

module.exports = AssetChart;
