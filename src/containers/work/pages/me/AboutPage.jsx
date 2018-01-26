import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import List from '../../../../components/common/list/List';
import AboutItem from '../../components/me/about/AboutItem';
import BlackDoor from '../../components/client/search/BlackDoor';

import styles from '../css/me/aboutPage.css';

const INTERVAL = 2000;
const FIRE_NUM = 4;

/** 我的-关于版本 **/
class AboutPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            clientVer:"",
            phoneNickName:"",
            mac:"",
            show:false
        }
        this.clickNum = 0;
        this.timeoutIndex = [];
    }

    componentDidMount(){
        Client.getVersionNumber((clientVer)=>{
            this.setState({clientVer});
        });
        Client.getHardwareInfo((data)=>{
            var {mac, phoneNickName} = data;
            this.setState({mac,phoneNickName});
        })
        super.componentDidMount();
    }

    componentWillUnmount(){
        this.clearNum();
        super.componentWillUnmount();
    }

    //获取页面名称
    getPageName(){ return "我的_关于版本"; }

    clearNum(){
        //清除timeout
        for(var i=0;i<this.timeoutIndex.length;i++){
            clearTimeout(this.timeoutIndex[i]);
        }
        this.clickNum = 0;
    }

    //点击触发
    itemClick = ()=>{
        this.clickNum++;
        this.timeoutIndex.push(setTimeout(()=>{
            this.clickNum--;
        },INTERVAL));
        if(this.clickNum == FIRE_NUM){
            this.setState({show:true});
            this.clearNum();
        }
    }

    //关闭暗门
    blackClose = ()=>{
        this.setState({show:false});
    }

    render(){
        systemApi.log("AboutPage render");

        var {clientVer, phoneNickName, mac, show} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="关于版本"/>
                <Content>
                    <div className={styles.bg01}>
                        <img src="./images/work/me/bg_about.png" className={styles.bgimg} />
                    </div>
                    <div className={styles.iconlist}>
                        <List>
                            <AboutItem title="AFA财富管理平台手机版" value={clientVer+" ("+h5version+")"} />
                            <AboutItem title="版权所有" value="兴业证券股份有限公司" />
                            <AboutItem title="客服电话" value="95562" />
                            <AboutItem title="客服邮箱" value="xyit@xyzq.com.cn" />
                            <AboutItem title="我的手机" value={phoneNickName} />
                            <AboutItem title="设备编号" value={mac} onTouchTap={this.itemClick}/>
                        </List>
                    </div>
                    {show?<BlackDoor onClose={this.blackClose}/>:null}
                </Content>
            </FullScreenView>

        );
    }

}

module.exports = AboutPage;
