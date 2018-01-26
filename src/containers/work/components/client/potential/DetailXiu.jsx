import {connect} from 'react-redux';
import Alert from '../../../../../components/common/popup/Alert';
import ServiceList from './ServiceList';
import Delete from './Delete';
import ZhuanZheng from './ZhuanZheng';
import {showErrorTip} from '../../../actions/client/Potential/PotentialAction'
import styles from '../../../../work/pages/client/css/AddPotentialPage.css';

class DetailXiu extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: this.props.sex || 0,
            nameValue: this.props.clientName || '',
            telValue: this.props.mobileTelShow || '',
            TurnValue:'',
            telTip: false,
            nameTip: false,
            showDelete:false,
            showTurn:false,
            showConfirm:false
        }
    }

    componentDidMount() {
        super.componentDidMount()
    }

    //input事件
    inputNameChange = e => {
        let {value} = e.target;
        this.setState({nameValue: value})

    }

    //length = value.length, reg = /^[1]\d{10}$/;
    inputTelChange = e => {
        let {value} = e.target;
        this.setState({
            telValue: value
        })

    }

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
        let {telValue=''} = this.state, {mobileTelShow=''} = this.props,
            reg = /^[1]\d{10}$/;
            telValue = telValue.trim();
        //length = value.length, reg = ;
        // if(telValue == mobileTelShow){
        //     this.setState({telTip: true})
        // }else if () {
        //     this.setState({telTip: true})
        // } else {
        //     this.setState({telTip: false})
        //     this.showTip("tel")
        // }
        if(telValue != mobileTelShow && !reg.test(telValue)){
            this.setState({telTip: true})
            this.showTip("tel")
        }else{
            this.setState({telTip: false})
        }
    }

    //tip输入错误提示
    showTip = type => {
        if (type === 'name1') {
            this
                .props
                .showErrorTip("姓名不能超过25个中文或者50个英文")
        }
        if (type === 'name0') {
            this
                .props
                .showErrorTip("请输入正确的姓名")
        }
        if (type === 'tel') {
            this
                .props
                .showErrorTip("手机号码格式不正确")
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

        return [< span className = {
                styles.btn_scan
            } > </span>]

    }

    //点击保存后的动作
    saveCloud = () => {
        let {index, nameValue, telValue} = this.state,
            params = {};
        params = {
            clientName: nameValue,
            clientSex: index,
            mobileTel: telValue
        };
        this
            .props
            .setPotentialClient(this, params);
    }


    /**
     *
     * 删除开始
     * @memberof DetailXiu
     */
    deleteStar = () => {
        //显示删除对话框
        this.setState({showDelete:true})
    }

    //关闭删除对话框
    cancelDelete = () => {
        this.setState({showDelete:false})
    }

    //确认删除
    DeleteYes = () => {
        let { potentialId } = this.props;
        this.props.deletePotentialClient(this, { potentialId }, () => { hashHistory.push("/work/client");Event.fire('potentialList_getData', this.getData) })

    }


    //转正开始
    TurnStar = () => {
        //显示转正对话框
        this.setState({showTurn:true})
    }

    //关闭转正对话框
    cancelTurn = () => {
        this.setState({showTurn:false})
    }

    //确认转正
    TurnYes = () => {
        let { potentialId  } = this.props, {TurnValue:fundAccount}=this.state, pattern = /[\u4e00-\u9fa5]/;
        if(fundAccount==''){

            this.props.showErrorTip('资金账号不能为空')
        }else if(pattern.test(fundAccount)){
            this.props.showErrorTip('资金账号不能包含中文字符')
        }else{

            this.props.regularPotentialClient(this, { potentialId, fundAccount }, this.cancelTurn)

        }

    }

    TurnChange = e => {
        let {value} = e.target;
        this.setState({TurnValue:value})
    }

    //关闭页面前确认对话框开启
    showConfirmDialog = () => {
        this.setState({showConfirm:true})
    }

    //关闭页面前确认对话框关闭
    hideConfirmDialog = () => {
        this.setState({showConfirm:false})
    }

    render() {
        systemApi.log("DetailXiu render");
        let {
            telValue,
            nameValue,
            index,
            telTip,
            nameTip,
            showDelete,
            showTurn,
            TurnValue,
            showConfirm
        } = this.state, {branchName, fundAccount, isPositive} = this.props;
        return (
            <div>

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
                                    <a
                                        className={index == 0
                                        ? styles.on
                                        : ''}
                                        onClick={this.setIndex(0)}>男</a>
                                    <a
                                        className={index == 1
                                        ? styles.on
                                        : ''}
                                        onClick={this.setIndex(1)}>女</a>
                                    <a
                                        className={index == 2
                                        ? styles.on
                                        : ''}
                                        onClick={this.setIndex(2)}>机构</a>
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
                            {isPositive=='1'
                                    ? <li>
                                            <div className={styles.pot_label}>资金账号</div>
                                            <div className={styles.pot_lb_line}></div>
                                            <div className={styles.pot_text}>
                                                <span>{fundAccount}</span>
                                            </div>
                                        </li>
                                    : null}
                        </ul>
                    </div>
                </div>
            </div>
        </Content>
        <div className={styles.pot_btn2}><a class={styles.pot_delete} onClick={this.deleteStar}>删除</a><a className={styles.pot_ok} onClick={this.TurnStar}>转正</a></div>
        {showDelete?<Delete cancelDelete={this.cancelDelete} DeleteYes={this.DeleteYes}/>:null}
        {showTurn?<ZhuanZheng cancelTurn={this.cancelTurn} TurnYes={this.TurnYes} TurnValue={TurnValue} Change={this.TurnChange}/>:null}
        {showConfirm?<Alert title = '修改确认' text='是否保存修改。' style={{ zIndex:10000 }} onLeft={this.hideConfirmDialog} onRight = {this.props.submit}/>:null}
        </div>
        )
    }

}

function injectAction() {
    return {showErrorTip};
}

module.exports = connect(null, injectAction(), null, {withRef:true})(DetailXiu);
