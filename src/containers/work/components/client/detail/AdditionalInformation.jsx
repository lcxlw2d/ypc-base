import {connect} from 'react-redux';
import Category from '../../../../../components/common/category/Category';
import {getAddtionalInfo} from '../../../actions/client/summary/summaryAction';
import IconButton from '../../../../../components/common/category/IconButton';
import EditAddtionalInfo from './EditAddtionalInfo';
import styles from '../../css/client/detail/additionalInformation.css';

class AdditionalInformation extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state={
            edit:false,
            value:""
        }
    }

    //赋值state
    componentWillMount(){
        var {value} = this.props;
        this.setState({value});
    }

    //赋值state
    componentWillReceiveProps(nextProps){
        var {value} = nextProps;
        this.setState({value});
    }

    //点击编辑按钮
    toggleEdit = ()=>{
        this.setState({
            edit:!this.state.edit
        });
    }

    //保存附言
    save = (value)=>{
        this.setState({
            edit:false,
            value:value
        });
    }

    //编辑图标
    renderAdditionalInfIcon(){
        return [
            <IconButton iconClass="edit" onClick={this.toggleEdit}/>
        ];
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("AdditionalInformation render");

        var {value,edit} = this.state,
            showVal = !value?"填写客户相关备注内容":value;

        return (
            <div>
                <Category title="附加信息" iconElement={this.renderAdditionalInfIcon()}>
                    <div className={styles.remarks}>{showVal}</div>
                </Category>
                {edit?(
                    <EditAddtionalInfo addtionalInfo={value} saveFn={this.save} closeFn={this.toggleEdit}/>
                ):null}
            </div>
        );
    }

}

function injectAction() {
    return {getAddtionalInfo};
}

module.exports = connect(null, injectAction())(AdditionalInformation);
