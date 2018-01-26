import {connect} from 'react-redux';
import styles from '../../css/client/detail/assetInformationItem.css';

class CreditAssetInformationItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShow: false
        }
        this.timeIndex = -1;
    }

    componentWillUnmount(){
        clearTimeout(this.timeIndex);
        super.componentWillUnmount();
    }

    clickFun = ()=>{
        var {isShow} = this.state;
        if(isShow){
            clearTimeout(this.timeIndex);
            this.setState({isShow: false});
        }
        else{
            this.setState({isShow: true});
            this.timeIndex = setTimeout(()=>{
                this.setState({isShow: false});
            },8000);
        }
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("CreditAssetInformationItem render");

        var {name,iconName,valueColor,value,title,subTitle,clickAble=true} = this.props;
        value = (value===''?'--':value);
        return (
            <div className={styles.asset_innerbox+" "+styles.credit} onClick={clickAble?this.clickFun:null}>
                <div className={this.mergeClassName(styles.marketValue, styles[iconName],styles.credit_value)}>
                    <p className={this.mergeClassName(styles.bold, styles[valueColor])}>{value}</p>
                    <p>{title}</p>
                </div>
            </div>
        );
    }

}

function injectProps(state) {
    var {name, clientID} = state.client || {};
    return {name, clientID};
}

module.exports = connect(injectProps)(CreditAssetInformationItem);
