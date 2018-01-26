import {connect} from 'react-redux';
import {getAnualInfo, getAnualShareImg} from '../../actions/home/anualbill/AnualBillAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from '../css/home/anualBillPage.css';

/** 首页-产品营销 **/
class AnualBillPage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            value:"",
            show:false,
            url:"",
            verificationCode:""
        }
    }

    //获取页面名称
    getPageName(){ return "首页_年度账单"; }

    //输入框文本变化
    inputChange = (e)=>{
        var {value} = e.target;
        this.setState({value});
    }

    //点击开启
    buttonClick = ()=>{
        var {value} = this.state;
        this.props.getAnualInfo(value,this,this.anualInfo);
    }

    //年度账单接口返回
    anualInfo = (data)=>{
        var {url,verificationCode} = data;
        this.setState({
            url,
            verificationCode,
            show:true
        });
    }

    //开启账单
    openBill = ()=>{
        var {url,verificationCode} = this.state;
        this.props.getAnualShareImg(url,verificationCode,this,this.closeBill);
    }

    //关闭账单
    closeBill = ()=>{
        this.setState({show:false});
    }

    render() {
        systemApi.log("TimeMachinePage render");

        var {value, show, url, verificationCode} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="时光旅途"/>
                <Content>
                    <img src="./images/work/home/bg_bill.jpg" className={styles.bill_bg}/>
                    <div className={styles.billimg01}>
                        <img src="./images/work/home/billimg01.png"/>
                    </div>
                    <div className={styles.billimg02}>
                        <img src="./images/work/home/billimg02.png"/>
                    </div>
                    <div className={styles.bill_form}>
                        <input type="text" className={styles.bill_input} placeholder="请输入资金账号" value={value} onChange={this.inputChange}/>
                        <button className={styles.bill_btn} onClick={this.buttonClick}></button>
                    </div>
                </Content>
                {show?(
                    <div className={styles.error_okbox} onClick={this.closeBill}>
                		<div className={styles.error_innerbox}>
                			<div className={styles.error_sgj_mid}>
                				<div className={styles.sgjico01}>
                					<div className={styles.error_sgjicoinnerbox}>
                						<p>该账号的开启密码为：<span className={styles.red}>{verificationCode}</span></p>
                						<p>
                							<a className={styles.error_btn_ok} onClick={this.openBill}>开启账单</a>
                						</p>
                					</div>
                				</div>
                			</div>
                		</div>
                		<div className={styles.error_layer}></div>
                    </div>
                ):null}
            </FullScreenView>

        );
    }

}
function injectAction() {
    return {getAnualInfo, getAnualShareImg};
}

module.exports = connect(null, injectAction())(AnualBillPage);
