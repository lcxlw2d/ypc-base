import styles from '../css/home/businessChance.css';

class ChanceItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            touch:false
        }
    }

    itemClick = ()=>{
        var {hash,onClick} = this.props;
        onClick?onClick():hashHistory.push(hash);
    }

    touchStart = ()=>{
        this.setState({touch:true});
    }

    touchEnd = ()=>{
        this.setState({touch:false});
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ChanceItem render");

        var {name,desc,iconCls,color,isNew} = this.props,
            {touch} = this.state;

        return(
            <div className={this.mergeClassName(styles.itemBox, styles[iconCls], touch?styles.touch:"")} onClick={this.itemClick} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
                <div className={styles.bb_innerbox}>
                    <p className={this.mergeClassName(styles[color],styles.text)}>{name}</p>
                    <p className={this.mergeClassName(Color.c6, styles.tip)}>{desc}</p>
                    {isNew?(<div className={styles.dot}></div>):null}
                </div>
            </div>
        );
    }
}

module.exports = ChanceItem;
