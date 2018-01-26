import {connect} from 'react-redux';
import _ from 'lodash';
import Carousel from '../../../../../components/common/carousel/Carousel';
import ListItem from './ListItem';
import {getListData} from '../../../actions/home/employeeValue/PerformanceAction';
import styles from '../../css/home/employeeValue/Performance.css';
class List extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabIndex:0,
            data:[]
        }
    }

    componentDidMount() {
        this.getData(this.props)
    }

    //当组件的props改变时执行
    componentWillReceiveProps(nextProps) {
        this.getData(nextProps)
     }

    //获取数据
    getData = props => {
        let {orderField='', orderType='', searchRange=''} = props, params={};

        params={
            searchRange,
            auth:false,
            orderType,
            orderField,
            startIndex:1,
            length:9

        }
        this.props.getListData(params, data => { this.setState({data}) }, this)
    }

    renderList = () => {

        let {data=[]}=this.state;
        data = _.chunk(data, 3);
        return[this.renderListItem(data[0], 0), this.renderListItem(data[1], 3), this.renderListItem(data[2], 6), ]

    }

    renderListItem = (arr, num) => {

        if(!(arr instanceof Array))return[];

        let arrs = [], children=[];
        arrs = arr;

        //根据页面显示调整参数位置
        if(num==0){
            arrs = [arr[1], arr[0], arr[2]]
        }
        for (let i = 0, length = arrs.length; i < length; i++) {
            children.push(<ListItem data={arrs[i]} danWei={this.props.danWei} index={i+num} />);
        }

        return[<div className={styles.rklist}>
                    {children}
        </div>]
    }

    onTabChange = tabIndex => {
        this.setState({tabIndex})

    }

    render() {
        systemApi.log("List render");
        let {title='', titleTip='', } = this.props, { tabIndex=0 } = this.state;
        return (
            <div className={styles.rank_chart}>
                <div className={styles.rk_tit}>
                    <h1>{title}</h1>
                    <p>{titleTip}</p>
                </div>
                <Carousel
                    noImg={true}
                    autoplay={false}
                    picClass={styles.rklist}
                    onChange={this.onTabChange}>
                    {this.renderList()}
                </Carousel>
                <div className={styles.vl_page}>
                    <ul>
                        <li className={tabIndex==0?styles.on:''}><a>&nbsp;</a></li>
                        <li className={tabIndex==1?styles.on:''}><a>&nbsp;</a></li>
                        <li className={tabIndex==2?styles.on:''}><a>&nbsp;</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

function injectAction() {
    return {getListData};
}

module.exports = connect(null, injectAction())(List);
