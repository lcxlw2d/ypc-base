import {connect} from 'react-redux';
import styles from '../../css/home/investadvice/broductSearchBar.css';

class BroductSearchBar extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("BroductSearchBar render");

        var {value, onClick, placeholder} = this.props;

        return(
            <div className={styles.searchbggray} onClick={onClick}>
                <div className={styles.date_code_text}>
                    <input type="text" placeholder={placeholder} disabled value={value}/>
                </div>
                <div className={styles.date_code_btn}>
                    <button>查询</button>
                </div>
            </div>
        );
    }

}

function injectAction(){
    return {};
}

module.exports = connect(null, injectAction())(BroductSearchBar);
