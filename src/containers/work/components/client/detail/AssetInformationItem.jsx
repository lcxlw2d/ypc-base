import {connect} from 'react-redux';
import styles from '../../css/client/detail/assetInformationItem.css';

class AssetInformationItem extends PureComponent {

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
    renderList() {
        var list = [];
        var obj = this.props.itemArr;
        var count = obj.titleArr.length;
        for (var i = 0; i < count; i++) {
            list.push(
                <p>
                    <span >{obj.titleArr[i]}</span>
                    <span className={this.mergeClassName(Color.red, styles.num)}>{obj.valueArr[i]}</span>
                </p>
            );
        }

        return list;
    }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("AssetInformationItem render");

        var {name,iconName,valueColor,value,title,subTitle,clickAble=true} = this.props,
            {isShow} = this.state,
            layerCls = this.mergeClassName(styles.asset_layer, isShow?styles.show:"");

        return (
            <div className={styles.asset_innerbox} onClick={clickAble?this.clickFun:null}>
                <div className={this.mergeClassName(styles.marketValue, styles[iconName])}>
                    <p className={this.mergeClassName(styles.bold, styles[valueColor])}>{value}</p>
                    <p>{title}</p>
                    <p className={this.mergeClassName(Color.c9, styles.subText)}>{subTitle}</p>
                </div>
                <div className={layerCls}>{this.renderList()}</div>
            </div>
        );
    }

}

function injectProps(state) {
    var {name, clientID} = state.client || {};
    return {name, clientID};
}

module.exports = connect(injectProps)(AssetInformationItem);
