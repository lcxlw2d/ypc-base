import {connect} from 'react-redux';
import {resetInvestData, vipVerify, vipApply} from '../../../../store/actions';
import {showWarning} from '../../actions/home/investadvice/investAdviceAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import ApplyDialog from '../../components/home/investadvice/ApplyDialog';

import styles from '../css/home/investAdvicePage.css';

/** 首页-投顾精灵 **/
class InvestAdviceIntroPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showApply:false,
            showConfirm:false
        }
    }

    //获取页面名称
    getPageName(){ return "首页_机智猫内测申请"; }

    introClick = ()=>{
        this.props.vipVerify("ROBOADVISOR", this, (vip)=>{
            if(vip == "0"){
                this.setState({showConfirm:true});
            }
            else{
                hashHistory.push("/work/home/investadvice");
            }
        });
    }

    backClick = ()=>{
        this.props.resetInvestData();
        hashHistory.push("/work/home");
    }

    cancelConfirm = ()=>{
        this.setState({showConfirm:false});
    }

    showApplyDialog = ()=>{
        this.setState({showConfirm:false, showApply:true});
    }

    applySubmit = (reason)=>{
        if(!reason){
            this.props.showWarning("请填写申请原因");
            return;
        }
        this.props.vipApply({reason}, this, (data)=>{ hashHistory.push("/work/home") });
    }

    applyClose = ()=>{
        this.setState({showApply:false});
    }

    render() {
        systemApi.log("InvestAdviceIntroPage render");

        var {showConfirm, showApply} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="机智猫内测申请" onBackClick={this.backClick}/>
                <Content>
                    <div className={styles.introbox}>
                        <img className={styles.intro} src="./images/work/home/investadvice/intro.png"/>
                        <div className={styles.button} onClick={this.introClick}></div>
                    </div>
                    {showConfirm?(<ConfirmDialog title="暂无权限" text="您暂时还没有权限哦！" cancelText="返回" confirmText="我要开启" onCancel={this.cancelConfirm} onSubmit={this.showApplyDialog}/>):null}
                    {showApply?(<ApplyDialog onSubmit={this.applySubmit} onClose={this.applyClose}/>):null}
                </Content>
                {this.props.children}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {resetInvestData, vipVerify, vipApply, showWarning};
}

module.exports = connect(null, injectAction())(InvestAdviceIntroPage);
