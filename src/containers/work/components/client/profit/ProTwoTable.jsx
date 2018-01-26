import styles from './css/table.css';

class ProTwoTable extends PureComponent{
    static defaultProps = {
        arr:[{stockName:'-',holdDays:'-',incomeBalance:'-',incomRate:'-'}, {stockName:'-',holdDays:'-',incomeBalance:'-',incomRate:'-'}, {stockName:'-',holdDays:'-',incomeBalance:'-',incomRate:'-'}, {stockName:'-',holdDays:'-',incomeBalance:'-',incomRate:'-'}, {stockName:'-',holdDays:'-',incomeBalance:'-',incomRate:'-'}]
    };

    //构造函数
    constructor(props, context) {
        super(props, context);
        // //默认状态
        // this.state = {
        //     index:0
        // }
    }

    renderTr = (color, data) => {
        if(data.length<5){
            let length = 5 - data.length, {arr} = this.props;
            arr = new Array(...arr.slice(0, length));
            data = data.concat(arr);
        }else{
            data = data.slice(0, 5);
        }
        return data.map((item, index) => {
            let { stockCode, stockName,	holdDays, incomeBalance, incomRate,	holdStatus, } = item;
            return (<tr>
                        <td><span>{index+1}</span></td>
                        <td><span>{stockName}</span></td>
                        <td><span>{holdDays}</span></td>
                        <td><span className={incomeBalance=='-'?'':Color[color]}>{incomeBalance=='-'?'':(color=='red'?'+':'-')}{incomeBalance}</span></td>
                        <td><span className={incomeBalance=='-'?'':Color[color]}>{incomRate}</span></td>
                        <td><span className={holdStatus?Color[color]:''}>{(holdStatus!=1&&holdStatus!=0)?'-':(holdStatus==1?'持有中':'已清仓')}</span></td>
                    </tr>)
        })
    }

    renderTable = (color, data) => {
        return[ <table width="100%" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <th><span>&nbsp;</span></th>
                <th><span>股票</span></th>
                <th><span>持股天数</span></th>
                <th><span>浮盈金额(元)</span></th>
                <th><span>盈利占比</span></th>
                <th><span>状态</span></th>
            </tr>
            {this.renderTr(color, data)}
        </tbody>
    </table>]
    }


    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ProTwoTable render");

        let { name, color='red', data=[], style = {}} = this.props;

        return(<div className={styles.ac_table}>
                <h1 style={style}>{name}<span className={name=='盈利个股'?Color.red:Color.green}>TOP5</span></h1>
                {this.renderTable(color, data)}
            </div>)



}
}

module.exports = ProTwoTable;
