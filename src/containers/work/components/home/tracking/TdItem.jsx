import {connect} from 'react-redux';

import styles from '../../css/home/tracking/Track.css';

class TdItem extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //渲染函数
    render() {
        systemApi.log("TdItem render");
        var {title, describe} = this.props;

        return (
                <td>
                    <p>{title}</p>
                    {describe?<p className={styles.c6}>{describe}</p>:null}
                </td>
        )
    }

}

function injectAction() {
    return {};
}

module.exports =TdItem;
