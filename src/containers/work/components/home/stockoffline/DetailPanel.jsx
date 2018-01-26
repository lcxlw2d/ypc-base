import {connect} from 'react-redux';
import {getOfflineDetail} from '../../../actions/home/stockoffline/stockOfflineAction';

import styles from '../../css/home/stockoffline/detailPanel.css';

import DetailPanelItem from './DetailPanelItem';

class DetailPanel extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            stock_code:"--",
            stock_name:"--",
            value_measure_date:"--",
            inquiry_start_date:"--",
            inquiry_end_date:"--",
            avg_market_value:"--",
            public_offer_vol:"--",
            init_offer_vol:"--",
            offline_offer_ratio:"--",
            raise_fund:"--",
            raise_net_fund:"--",
            issue_fare:"--",
            min_purchase_amount:"--",
            min_growth_unit:"--",
            eastmoney_estim_price1:"--",
            eastmoney_estim_price2:"--",
            calc_inquiry_price1:"--",
            calc_inquiry_price2:"--",
            stock_market:"--"
        }
    }

    componentDidMount(){
        var {stockCode} = this.props;
        this.props.getOfflineDetail(stockCode, this, this.update);
    }

    //更新数据
    update = (data)=>{
        this.setState(data);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("DetailPanel render");

        var {
                stock_code, stock_name, value_measure_date,
                inquiry_start_date, inquiry_end_date, avg_market_value,
                public_offer_vol, init_offer_vol,
                offline_offer_ratio, raise_fund,
                raise_net_fund, issue_fare, min_purchase_amount,
                min_growth_unit, eastmoney_estim_price1,
                eastmoney_estim_price2, calc_inquiry_price1,
                calc_inquiry_price2, stock_market=""
            } = this.state;

        return(
            <div>
                <div className={styles.networkbox}>
                    <div className={styles.icon_rocket}></div>
                    <div className={styles.network_innerbox}>
                        <div className={styles.network_pro_name}>
                            <p className={styles.font21}>{stock_name}</p>
                            <p>{stock_code}</p>
                        </div>
                        <div className={styles.network_measure_time}>
                            <p>测算日期</p>
                            <p>{value_measure_date}</p>
                        </div>
                    </div>
                    <div className={styles.network_innerbox}>
                        <div className={styles.network_market_value}>
                            <p className={styles.font21}><span>{avg_market_value}<i className={styles.market_value_type}>{stock_market.substring(0,1)}</i></span></p>
                            <p>日均市值要求(万元)</p>
                        </div>
                        <div className={styles.network_inquiry_time}>
                            <p>询价日期</p>
                            <p><span>{inquiry_start_date}</span>-<span>{inquiry_end_date}</span></p>
                        </div>
                    </div>
                </div>
                <div className={styles.network_list}>
                    <div className={styles.network_list_floor}>
                        <DetailPanelItem text="公开发行数量" value={public_offer_vol} color="blue" column={3} />
                        <DetailPanelItem text="网下初始发行数量" value={init_offer_vol} color="blue" column={3} />
                        <DetailPanelItem text="网下发行比例" value={offline_offer_ratio+"%"} color="blue" column={3} />
                    </div>
                    <div className={styles.network_list_floor}>
                        <DetailPanelItem text="拟募集资金(亿元)" value={raise_fund} color="red" column={3} />
                        <DetailPanelItem text="募资净额(万元)" value={raise_net_fund} color="red" column={3} />
                        <DetailPanelItem text="发行费用(万元)" value={issue_fare} color="red" column={3} />
                    </div>
                    <div className={styles.network_list_floor}>
                        <DetailPanelItem text="最低拟申购数量(万股)" value={min_purchase_amount} color="blue" column={2} />
                        <DetailPanelItem text="申购数量最小变动单位(万股)" value={min_growth_unit} color="blue" column={2} />
                    </div>
                    <div className={styles.network_tip}>价格参考：询价参考价=(募资净额+发行费用)/发行股数</div>
                    <div className={styles.network_list_floor}>
                        <DetailPanelItem text="东方财富预估发行价格一(元)" value={eastmoney_estim_price1} color="red" column={2} />
                        <DetailPanelItem text="东方财富预估发行价格二(元)" value={eastmoney_estim_price2} color="red" column={2} />
                    </div>
                    <div className={styles.network_list_floor}>
                        <DetailPanelItem text="计算询价参考价格一(元)" value={calc_inquiry_price1} color="red" column={2} />
                        <DetailPanelItem text="计算询价参考价格二(元)" value={calc_inquiry_price2} color="red" column={2} />
                    </div>
                </div>
            </div>
        );
    }
}

function injectAction(){
    return {getOfflineDetail};
}

module.exports = connect(null,injectAction())(DetailPanel);
