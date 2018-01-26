import {connect} from 'react-redux';
import {getBranch, showWarning} from '../../actions/me/meAction';

import FullScreenView from '../../../../components/fullscreen/FullScreenView';
import EmphaseText from '../../../../components/text/EmphaseText';

import styles from '../css/me/branchSelect.css';

class BranchSelect extends PureComponent{

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            branchList:[],
            index:-1,
            search:"",
            branchNo:""
        }
    }

    componentDidMount(){
        this.props.getBranch(this,(branchList)=>{
            this.setState({branchList});
        });
    }

    //点击营业部
    itemClick = (index,branchNo)=>()=>{
        this.setState({index,branchNo});
    }

    filter(name, search){
        if(search == "") return true;
        if(name.indexOf(search) != -1) return true;
        return false;
    }

    renderList(){
        var {branchList, index, search} = this.state;
        return branchList.map((item, i)=>{
            var {organizationName, organizationId} = item;
            return this.filter(organizationName, search)?(
                <li className={index==i?styles.on:""} onClick={this.itemClick(i,organizationId)}>
                    <span><EmphaseText text={organizationName} emphase={search}/></span>
                </li>
            ):null
        });
    }

    //输入框改变
    inputChange = (e)=>{
        var {value} = e.target;
        this.setState({search:value});
    }

    //点击关闭
    onClose = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    //点击确定
    okClick = ()=>{
        var {onSelect} = this.props,
            {branchNo} = this.state;
        if(branchNo != ""){
            onSelect && onSelect(branchNo);
        }
        else{
            this.props.showWarning("请选择营业部");
        }

    }

    render(){

        var {index,search} = this.state;

        return(
            <FullScreenView transparent={true}>
                <div className={styles.pop_up}>
                    <div className={styles.ecard_box}>
                        <div className={styles.choose_top}>
                            <span className="left">请选择开户营业部</span>
                            <span className="right" onClick={this.onClose}>关闭</span>
                        </div>
                        <div className={styles.choose_search}>
                            <input type="text" placeholder="搜索营业部" value={search} onChange={this.inputChange} />
                            <input type="button"/>
                        </div>
                        <div className={styles.choose_list}>
                            <ul>{this.renderList()}</ul>
                        </div>
                        <div className={this.mergeClassName(styles.choose_btn, index!=-1?styles.on:"")} onClick={this.okClick}><span>确 定</span></div>
                    </div>
                </div>
            </FullScreenView>
        )
    }

}

function injectAction() {
    return {getBranch, showWarning};
}

module.exports = connect(null, injectAction())(BranchSelect);
