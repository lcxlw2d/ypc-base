import styles from "./css/ProfitShaiXuan.css";
class ProfitShaiXuan extends PureComponent{
    static defaultProps = {
        data:['收益曲线不准确', '盈亏额/收益率不准确', '资产情况不准确', '行业分布不准确', '盈利构成不准确', '偏好分析不准确'],
    };

    //构造函数
    constructor(props, context) {
        super(props, context);

        this.state = {
            list:[ 0, 0, 0, 0, 0, 0, ],
        }

    }

    change = index => () => {

        let {list} = this.state;

        if(list[index] == 1){
            list[index] = 0;
        }else{
            list[index] = 1;
        }
        this.setState(list)
    }


    renderList = () => {

        let {data} = this.props, { list } = this.state;

        return data.map((item, index) => {
            return (<li className={list[index]==1?styles.on:''} onClick={this.change(index)}><a>{item}</a></li>)
        })
    }



    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ProfitShaiXuan render");

        let {list} = this.state;
        return(<div className={styles.ecard_popup}>
                {/* <!--筛选--> */}
                    <div className={styles.checklist}>
                        <ul>
                            {this.renderList()}
                        </ul>
                        <div className={styles.checkbtn}><a onClick={this.props.close}>取消</a><a onClick={this.props.change(list)}>提交</a></div>
                    </div>
                </div>);
    }


}

module.exports =ProfitShaiXuan;
