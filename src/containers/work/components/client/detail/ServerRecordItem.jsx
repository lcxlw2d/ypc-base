import {connect} from 'react-redux';
import styles from '../../css/client/detail/serverRecordItem.css';

class ServerRecordItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ServerRecordItem render");

        var {title, text} = this.props;

        return (
            <div className={styles.recruit_div}>
                <span className={styles.recruit_div_20}>{title}</span>
                <span className={this.mergeClassName(styles.recruit_div_60, Color.c6)}>{text}</span>
            </div>
        );
    }

}

module.exports = ServerRecordItem;
