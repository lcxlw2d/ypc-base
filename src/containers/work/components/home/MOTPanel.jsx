import {connect} from 'react-redux';
import {getNewCustomMOT, MOTDATA} from '../../../../store/actions';
import {getMotCount} from '../../actions/home/homeAction';

import MOTItem from './MOTItem';

import styles from '../css/home/motPanel.css';

function renderMotNum(){
    var motNum = {};
    for(var id in MOTDATA){
        motNum[MOTDATA[id].field] = 0;
    }
    return motNum;
}

class MOTPanel extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        var savedType = getNewCustomMOT();
        this.state = {
            motNum:renderMotNum(),
            list:savedType.split(",").slice(0,4)
        }
    }

    componentDidMount(){
        //获取停留页面刷新时间
        var freshTime = systemApi.getValue("config_page_home_refresh");
        this.props.getMotCount(this, this.updateCount);

        this.interval = setInterval(()=>{
            this.props.getMotCount(this, this.updateCount);
        },freshTime);
    }

    componentWillUnmount(){
        //清除计时器
        clearInterval(this.interval);
        super.componentWillUnmount();
    }

    updateCount = (data)=>{
        this.setState({motNum:data});
    }

    //渲染单个MOT
    renderMot(id){
        var item = MOTDATA[id],
            {motNum} = this.state;

        if(item){
            var {icoCls, shortName, field} = item;
            return <MOTItem name={shortName} num={motNum[field]||0} typeId={id} iconCls={icoCls}/>;
        }
        return "";
    }

    //渲染配置MOT
    renderMotItems(){
        var {list} = this.state;
        return list.map((item,index)=>{
            return this.renderMot(item);
        });
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("MOTPanel render");

        return(
            <div className={styles.home_mot_list}>
                {this.renderMotItems()}
            </div>
        );
    }


}

function injectAction(){
    return {getMotCount};
}

module.exports = connect(null,injectAction())(MOTPanel);
