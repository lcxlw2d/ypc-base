import {connect} from 'react-redux';
import {getGenerateRight} from '../../actions/me/meAction';

import ECard from './ECard';
import BranchSelect from './BranchSelect';

class ECardBox extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            showCard:false,
            showBranch:false,
            branchNo:"",
            forceFresh:false
        }
    }

    componentDidMount(){
        this.judgeRight(false);
    }

    judgeRight(forceRefresh){
        this.props.getGenerateRight({forceRefresh}, this, this.rightCallback);
    }

    rightCallback = (hasRight, generated)=>{
        this.setState({
            showCard:hasRight!=0||generated?true:false,
            showBranch:hasRight==0&&!generated?true:false
        });
    }

    //点击关闭
    onClose = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    //选择营业部，生成二维码
    selectBranch = (branchNo)=>{
        this.setState({
            branchNo,
            showCard:true,
            showBranch:false
        });
    }

    //重新生成
    onRefresh = ()=>{
        this.setState({
            showCard:false,
            showBranch:false,
            forceFresh:true,
            branchNo:""
        });
        this.judgeRight(true);
    }

    render(){

        var {forceFresh,branchNo,showCard,showBranch} = this.state;

        return(
            <div>
                {showCard?(<ECard forceFresh={forceFresh} branchNo={branchNo} onClose={this.onClose} onRefresh={this.onRefresh}/>):null}
                {showBranch?(<BranchSelect onClose={this.onClose} onSelect={this.selectBranch}/>):null}
            </div>
        )
    }

}

function injectAction() {
    return {getGenerateRight};
}

module.exports = connect(null, injectAction())(ECardBox);
