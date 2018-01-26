import {connect} from 'react-redux';
import {sendComplain} from '../../actions/me/complain/complainAction';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Button from '../../../../components/common/form/Button';
import AdviceDialog from '../../components/me/complain/AdviceDialog';

import styles from '../css/me/complainPage.css';

/** 我的-我要吐槽 **/
class ComplainPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            showDialog:false,
            value:"",
            appVer:""
        }
    }

    componentDidMount(){
        Client.getVersionNumber((clientVer)=>{
            var appVer = clientVer+" ( "+h5version+" )";
            this.setState({appVer});
        });
        super.componentDidMount();
    }

    //获取页面名称
    getPageName(){ return "我的_吐槽"; }

    //点击提交按钮
    submitClick = ()=>{
        var {value,appVer} = this.state;
        this.props.sendComplain(value,appVer,this,()=>{
            this.setState({showDialog:true});
        });
    }

    //窗口toggle
    closeDialog = ()=>{
        this.setState({showDialog:false});
        hashHistory.goBack();
    }

    //输入框数据改变
    contentChange = (e)=>{
        var {value} = e.target;
        this.setState({value});
    }

    render(){
        systemApi.log("ComplainPage render");

        var {showDialog,value} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="我要吐槽"/>
                <Content>
                    <div className={styles.bg01}>
                        <img src="./images/work/me/bg_makecomplaints.png" className={styles.bgimg}/>
                        <div className={styles.mcpbox}>
                            <textarea placeholder="请输入您的宝贵意见" maxLength="128" onChange={this.contentChange} value={value}></textarea>
                            <div className={styles.byte}>最多可输入<span className={Color.blue}>128</span>个字</div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button shape="round" value="提交" onClick={this.submitClick}/>
                    </div>
                    <AdviceDialog show={showDialog} onClose={this.closeDialog}/>
                </Content>
            </FullScreenView>

        );
    }

}

function injectAction(){
    return {sendComplain};
}

module.exports = connect(null,injectAction())(ComplainPage);
