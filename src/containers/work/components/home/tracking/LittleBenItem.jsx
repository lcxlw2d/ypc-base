import {connect} from 'react-redux';

import styles from '../../css/home/tracking/LittleBen.css';

class LittleBenItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            touch: false
        }
    }


    itemClick = () => {
        var {hash, onClick} = this.props;
        onClick
            ? onClick()
            : hashHistory.push(hash);
    }

    touchStart = () => {
        this.setState({touch: true});
    }

    touchEnd = () => {
        this.setState({touch: false});
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("LittleBenItem render");

        var {
                name,
                num = 0,
                color,
                iconCls,
                isNew
            } = this.props, {touch} = this.state,
            clos = this.mergeClassName(styles.iconBox, touch? styles.touch: "");

        return (
            <div
                className={clos}
                onClick={this.itemClick}
                onTouchStart={this.touchStart}
                onTouchEnd={this.touchEnd}>
                <div className={this.mergeClassName(styles.icon, styles[iconCls])}>
                    {isNew? <span className={styles.count}>{num? num: ''}</span>: null}
                </div>
                <a className={styles[color]}>{name}</a>
            </div>
        );
    }
}

function injectAction() {
    return {};
}

module.exports = connect(null, injectAction())(LittleBenItem);
