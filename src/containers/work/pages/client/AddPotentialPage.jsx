import {connect} from 'react-redux';
import AppHeader from './../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import Intro from '../../../../components/common/popup/Intro';

import Alert from '../../../../components/common/popup/Alert';

import {getUser, setPotentialClient, showErrorTip} from './../../actions/client/Potential/PotentialAction';
// from '../../actions/client/record/recordAction';
import styles from './css/AddPotentialPage.css';
class AddPotentialPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0,
            nameValue: '',
            telValue: '',
            telTip:false,
            nameTip:false,
            branchName:'',
            showAlert:false,
            introFlag:false,
        }
        this.introList = ["./images/work/home/qianzai.png"];
    }

    getPageName(){ return "客户_新增潜在客户"; }

    componentDidMount() {
        super.componentDidMount()
        this.props.getUser(this, data => {
            var { branchName } = data;
            this.setState({branchName})
        });
    }

    componentWillMount(){
        var introFlag = systemApi.getValue("FLAG_HOME_INTRO_QIANZAI");
        this.setState({introFlag:!introFlag});
    }
     //关闭引导
     closeIntro = ()=>{
        systemApi.setValue("FLAG_HOME_INTRO_QIANZAI","1");
        this.setState({introFlag:false});
    }

    //input事件
    inputNameChange = e => {
        let {value} = e.target;
        this.setState({nameValue: value})

    }

    //length = value.length, reg = /^[1]\d{10}$/;
    inputTelChange = e => {
        let {value} = e.target;
        this.setState({telValue: value})

    }

    // //验证姓名
    // nameTipShow = () => {
    //     let { nameValue } = this.state;
    //     if(nameValue==''){
    //         this.showTip("name0")
    //         this.setState({nameTip:true})
    //     }
    //     else if(nameValue.length>25){
    //         this.showTip("name1")
    //         this.setState({nameTip:true})
    //     }else{
    //         this.setState({nameTip:false})
    //     }

    // }
    //验证姓名
    nameTipShow = () => {
        let {nameValue} = this.state, length=0;
        length = this.nameSize(nameValue);
        if (nameValue == '') {
            this.showTip("name0")
            this.setState({nameTip: true})
        } else if (length > 50) {

            this.showTip("name1")
            this.setState({nameTip: true})
        } else {
            this.setState({nameTip: false})
        }

    }

    nameSize = val => {
        let reg = /[^\x00-\xff]/, arr = val.split(''), num = 0;
        for (let i = 0; i < arr.length; i++) {
           if(reg.test(arr[i])){
               num+=2;
           }else{
               num+=1;
           }
        }
        return num;
    }

    //验证手机号码
    telTipShow = () => {
        let { telValue } = this.state, reg = /^[1]\d{10}$/;
        telValue = telValue.trim();
        //length = value.length, reg = ;
        if(reg.test(telValue)){
            this.setState({telTip:true})
        }else{
            this.setState({telTip:false})
            this.showTip("tel")
        }
    }

    //tip输入错误提示
    showTip = type => {
        if (type === 'name1') {
            this.props.showErrorTip("姓名不能超过25个中文或者50个英文")
        }
        if(type === 'name0'){
            this.props.showErrorTip("请输入正确的姓名")
        }
        if (type === 'tel') {
            this.props.showErrorTip("手机号码格式不正确")
        }
    }

    //修改客户性别
    setIndex = index => {
        return () => {
            this.setState({index})
        }
    }

    //渲染头部右边图标
    renderRightIcon = () => {

        return [<span className = {
                styles.btn_scan
            } onClick={this.scanPersonCardClick}> </span>]
        // return []

    }

    // 扫描名片
     scanPersonCardClick=()=>{
        try{
                window.plugins.XYCommonPlugin.scanPersonCard(data => {
                    Client.trackEvent("2007","CLIENT_CLICK_SCANPERSONCARD");
                    var {name="", phone=""} = data;
                    this.setState({nameValue:name, telValue:phone}, () => {
                        this.nameTipShow()
                        this.telTipShow()
                    });
                    // alert('name11='+name+'phone222='+phone);
                })

            }catch(e){
                console.log(e)
            }

    }

    //决定保存按钮是否可点击
    renderSave = () => {
        var {nameTip, telTip, nameValue, telValue} = this.state;

        if( nameValue=='' || telValue==''){ return false }
        else{

            return (nameTip || telTip)
        };
    }

    //点击保存后的动作
    saveCloud = () => {
            Client.trackEvent("2006","CLIENT_CLICK_POTENTIALCUSTOMER");
            let {index, nameValue, telValue} = this.state, params = {};
            telValue = telValue.trim();
            params = {clientName:nameValue, clientSex:index, mobileTel:telValue};
            this.props.setPotentialClient(this, params, this.succ);
    }

    succ = () => {
        hashHistory.push("/work/client");
        Event.fire('potentialList_getData', this.getData)
    }

    //返回上一层
    onBackClick = () => {
        this.setState({showAlert:true})
    }

    submitOut = () => {
        this.hideAlert()
        hashHistory.push("/work/client")
    }

    //关闭页面提示框
    hideAlert = () => {
        this.setState({showAlert:false})
    }

    render() {
        systemApi.log("AddPotentialPage render");
        let {telValue, nameValue, index, telTip, nameTip, branchName, showAlert, introFlag} = this.state;
        return (
            <FullScreenView>
                <AppHeader
                    headerName="新增潜在客户"
                    onBackClick={this.onBackClick}
                    iconRight={this.renderRightIcon()}/>
                <Content withBottom={false}>
                    <div className={styles.floor}>
                        <div className={styles.potentialbox}>
                            <div className={styles.pot_textbox}>
                                <ul>
                                    <li className={styles.li}>
                                        <div className={styles.pot_label}>姓名</div>
                                        <div className={styles.pot_lb_line}></div>
                                        <div className={styles.pot_text}><input
                                            type="text"
                                            placeholder="请输入客户名称"
                                            value={nameValue}
                                            onChange={this.inputNameChange}
                                            onBlur={this.nameTipShow}/></div>
                                    </li>
                                    <li>
                                        <div className={styles.pot_label}>性别</div>
                                        <div className={styles.pot_lb_line}></div>
                                        <div className={styles.pot_check}>
                                            <a className={index == 0 ? styles.on : ''} onClick={this.setIndex(0)}>男</a>
                                            <a className={index == 1 ? styles.on : ''} onClick={this.setIndex(1)}>女</a>
                                            <a className={index == 2 ? styles.on : ''} onClick={this.setIndex(2)}>机构</a>
                                        </div>
                                    </li>
                                    <li className={styles.li}>
                                        <div className={styles.pot_label}>手机</div>
                                        <div className={styles.pot_lb_line}></div>
                                        <div className={styles.pot_text}><input
                                            type="text"
                                            placeholder="请输入手机号码"
                                            value={telValue}
                                            onChange={this.inputTelChange}
                                            onBlur={this.telTipShow}/></div>
                                    </li>
                                    <li>
                                        <div className={styles.pot_label}>营业厅</div>
                                        <div className={styles.pot_lb_line}></div>
                                        <div className={styles.pot_text}>
                                            <span>{branchName}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Content>
                <div className={ styles.pot_btn} onClick={this.renderSave()?this.saveCloud:null}>
                    <a className={this.renderSave()?styles.on:''}>保存</a>
                </div>
                {showAlert?<Alert title = '返回确认' text='是否放弃所有修改?' style={{ zIndex:10000 }} onLeft={this.hideAlert} onRight = {this.submitOut}/>:null}
                {this.props.children}
                {introFlag?(<Intro introList={this.introList} onClose={this.closeIntro}/>):null}
            </FullScreenView>
        )
    }

}

function injectAction() {
    return { getUser, setPotentialClient, showErrorTip };
}

module.exports = connect(null, injectAction())(AddPotentialPage);
