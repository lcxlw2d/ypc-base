import {connect} from 'react-redux';
import {getPayMentDetail} from '../../../actions/home/mustsee/mustSeeAction';
import styles from '../../css/home/mustsee/payMent.css';
class TableList extends CursorList {

    //构造函数
    constructor(props,context) {
        super(props, context);
        this.state={
            detail:[]
        }
    }

    componentDidMount(){
        var{fundAccount}=this.props;
        this.props.getPayMentDetail({startIndex:1,length:999,fundAccount},this,(data)=>{
          this.setState({detail:data});
        });
    }

    componentDidUpdate(){
      var {refresh} = this.props;
      refresh && refresh();
    }

    renderList(){
        var{detail}=this.state;
        return detail.map((item,index)=>{
            var {secuName,secuCode,quantity,price,typevalue,subscribedCapital}=item;
            return(
                <tr>
                    <td><p >{secuName}</p><p>{secuCode}</p></td>
                    <td><p>{quantity}</p><p>{price}</p></td>
                    <td><p>{typevalue}</p><p>{subscribedCapital}</p></td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div className={styles.floor_02}>
                <table width="100%" cellpadding="0" cellspacing="0" className={styles.mg02}>
                    <tbody>
                        <tr>
                            <th className={styles.boderleftno}><p>中签名称</p></th>
                            <th><p>数量/价格</p></th>
                            <th><p>类型/认购资金</p></th>
                        </tr>
                        {this.renderList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

function injectAction(){
    return{getPayMentDetail}
}

module.exports = connect(null, injectAction())(TableList);
