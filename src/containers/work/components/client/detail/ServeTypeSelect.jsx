import {connect} from 'react-redux';
import {showWarning} from '../../../actions/client/summary/serverAction';

import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import EmphaseText from '../../../../../components/common/text/EmphaseText';

import styles from '../../css/client/detail/serveTypeSelect.css';

class ServeTypeSelect extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //点击营业部
    itemClick = (key, text)=>()=>{
        var {onChange} = this.props;
        onChange && onChange(key, text);
    }

    renderList(){
        var list = [],
            {serTypeList, value} = this.props;

        for(var key in serTypeList){
            var text = serTypeList[key];
            list.push(
                <li className={key==value?styles.on:""} onClick={this.itemClick(key, text)}>
                    <span>{text}</span>
                </li>
            );
        }

        return list;
    }

    //点击确定
    okClick = ()=>{
        var {onSelect, value} = this.props;
        if(value != ""){
            onSelect && onSelect(value);
        }
        else{
            this.props.showWarning("请选择服务方式");
        }

    }

    render(){

        var {value, onClose} = this.props;

        return(
            <FullScreenView transparent={true}>
                <div className={styles.pop_up}>
                    <div className={styles.ecard_box}>
                        <div className={styles.choose_top}>
                            <span className="left">请选择服务方式</span>
                            <span className="right" onClick={onClose}>关闭</span>
                        </div>
                        <div className={styles.choose_list}>
                            <ul>{this.renderList()}</ul>
                        </div>
                        <div className={this.mergeClassName(styles.choose_btn, value!=""?styles.on:"")} onClick={this.okClick}><span>确 定</span></div>
                    </div>
                </div>
            </FullScreenView>
        )
    }

}

function injectAction() {
    return {showWarning};
}

module.exports = connect(null, injectAction())(ServeTypeSelect);
