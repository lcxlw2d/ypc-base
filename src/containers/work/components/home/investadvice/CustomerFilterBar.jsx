import {connect} from 'react-redux';
import {getInvestTypeDict} from '../../../actions/home/investadvice/investAdviceAction';
import styles from '../../css/home/investadvice/customerFilterBar.css';

class CustomerFilterBar extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            data:{}
        }
    }

    componentDidMount(){
        this.props.getInvestTypeDict(this, (data)=>{this.setState({data})});
    }

    itemClick = (key)=>(e)=>{
        var {onSelect} = this.props;
        onSelect && onSelect(key);
    }

    renderItems(){
        var {value} = this.props,
            {data} = this.state,
            list = [<li className={value==""?styles.on:""} onClick={this.itemClick("")}>全部</li>];
        for(var key in data){
            list.push(<li className={value==key?styles.on:""} onClick={this.itemClick(key)}>{data[key]}</li>);
        }
        return list;
    }

    stop = (e)=>{
        e.stopPropagation();
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("CustomerFilterBar render");

        var {onClose} = this.props;

        return(
            <div className={styles.atten_authority} onClick={onClose}>
                <div className={styles.pro_inner_popup} onClick={this.stop}>
                    <h3 className={this.mergeClassName(Color.c6, styles.c6)}>客户分组条件</h3>
                    <ul className={styles.authority_list}>
                        {this.renderItems()}
                    </ul>
                </div>
            </div>
        );
    }

}

function injectAction(){
    return {getInvestTypeDict}
}

module.exports = connect(null,injectAction())(CustomerFilterBar);
