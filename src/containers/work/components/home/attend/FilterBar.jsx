import styles from '../../css/home/attend/filterBar.css';

class FilterBar extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    itemClick = (type)=>(e)=>{
        var {onSelect} = this.props;
        onSelect && onSelect(type);
    }

    stop = (e)=>{
        e.stopPropagation();
    }

    closeFilter = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("FilterBar render");

        var {searchRange} = this.props;

        return (
            <div className={styles.atten_authority} onClick={this.closeFilter}>
                <div className={styles.pro_inner_popup} onClick={this.stop}>
                    <h3 className={this.mergeClassName(styles.c6, Color.c6)}>拜访记录权限选择</h3>
                    <ul className={styles.authority_list}>
                    	<li onClick={this.itemClick("1")}><a className={searchRange=="1"?styles.on:""}>全部</a></li>
                        <li onClick={this.itemClick("2")}><a className={searchRange=="2"?styles.on:""}>我的</a></li>
                    </ul>
                </div>
            </div>

        );
    }
}

module.exports = FilterBar;
