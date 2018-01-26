import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import styles from '../../css/home/investadvice/applyDialog.css';

class ApplyDialog extends PureComponent{

    //默认属性值
    static defaultProps = {
        confirmText:"确定",
        cancelText:"取消"
    };

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            value:""
        }
    }

    valChange = (e)=>{
        var {value} = e.target;
        this.setState({value});
    }

    okClick = ()=>{
        var {onSubmit} = this.props,
            {value} = this.state;
        onSubmit(value);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ApplyDialog render");

        var {onSubmit, onClose} = this.props,
            {value} = this.state;

        return(
            <FullScreenView mask={true}>
                <div className={styles.nobg}>
                    <div className={styles.pp_top}>申请秘密武器</div>
                    <div className={styles.close} onClick={onClose}></div>
                    <div className={styles.pp_mid}>
                        <div className={styles.pp_text}>申请原因：</div>
                        <textarea placeholder="请填写申请原因" value={value} onChange={this.valChange}></textarea>
                    </div>
                    <div className={styles.pp_btns}>
                        <a className={styles.btn_pp_ok} onClick={this.okClick}>提交</a>
                    </div>
                </div>
            </FullScreenView>
        );
    }


}

module.exports = ApplyDialog;
