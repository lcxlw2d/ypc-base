import {connect} from 'react-redux';
import styles from '../../css/client/detail/serverDetailItem.css';

class ServerEditItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ServerEditItem render");

        var {iconClass, title, elem} = this.props;

        return (
            <div className={styles.recruit_div}>
            	<span className={styles.recruit_div_20}>
                    <i className={this.mergeClassName(styles.icon, iconClass)}></i>
                    <span>{title}</span>
                </span>
                <span className={this.mergeClassName(styles.recruit_div_60, Color.c6)}>{elem}</span>
            </div>
        );
    }

}

module.exports = ServerEditItem;
