import {connect} from 'react-redux';
import {showTip} from '../../../actions/client/search/searchAction';
import {TEST_SERVER_URL, PRODUCT_SERVER_URL, TEST_RES_URL, PRODUCT_RES_URL} from '../../../../../utils/Config';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';

import styles from '../../css/client/search/blackDoor.css';

class BlackDoor extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
        this.state = {
            server:"test",
            serverCustom:false,
            serverCustomUrl:"",
            hotUpdate:"test",
            hotUpdateCustom:false,
            hotUpdateCustomUrl:"",
        }
        this.serverAddr = {
            "test":TEST_SERVER_URL,
            "product":PRODUCT_SERVER_URL
        }
        this.hotAddr = {
            "test":TEST_RES_URL,
            "product":PRODUCT_RES_URL
        }
    }

    //判断url，选中对应选项
    componentWillMount(){
        this.serverRender();
        this.hotRender();
    }

    //服务器地址
    serverRender(){
        var rootUrl = systemApi.getValue("rootUrl");
        if(rootUrl == PRODUCT_SERVER_URL){
            this.setState({server:"product", serverCustom:false});
        }
        else if(rootUrl == TEST_SERVER_URL){
            this.setState({server:"test", serverCustom:false});
        }
        else{
            this.setState({server:"custom", serverCustom:true, serverCustomUrl:rootUrl});
        }
    }

    //热资源更新地址
    hotRender(){
        Client.getResUpdateAddress((url)=>{
            if(url == PRODUCT_RES_URL){
                this.setState({hotUpdate:"product",hotUpdateCustom:false});
            }
            else if(url == TEST_RES_URL){
                this.setState({hotUpdate:"test",hotUpdateCustom:false});
            }
            else{
                this.setState({hotUpdate:"custom", hotUpdateCustom:true, hotUpdateCustomUrl:url});
            }
        })
    }

    //服务器地址改变
    serverChange = (e)=>{
        var {value} = e.target,
            serverCustom = value=="custom";
        this.setState({server:value,serverCustom});
    }

    //服务器地址输入框值改变
    serverInputChange = (e)=>{
        var {value} = e.target;
        this.setState({serverCustomUrl:value});
    }

    //热资源更新服务器地址改变
    hotChange = (e)=>{
        var {value} = e.target,
            hotUpdateCustom = value=="custom";
        this.setState({hotUpdate:value,hotUpdateCustom});
    }

    //热更新地址输入框值改变
    hotInputChange = (e)=>{
        var {value} = e.target;
        this.setState({hotUpdateCustomUrl:value});
    }

    //取消
    onCancel = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    //提交
    onSubmit = ()=>{
        var serverUrl = "",
            hotUrl = "",
            {onClose,showTip} = this.props,
            {server,hotUpdate,serverCustomUrl,hotUpdateCustomUrl} = this.state;
        //设置服务器地址
        if(server != "custom"){
            serverUrl = this.serverAddr[server];
        }
        else{
            if(serverCustomUrl == ""){
                showTip("您还没输入服务器地址");
                return;
            }
            serverUrl = serverCustomUrl;
        }
        //设置热更新服务器地址
        if(hotUpdate != "custom"){
            hotUrl = this.hotAddr[hotUpdate];
        }
        else{
            if(hotUpdateCustomUrl == ""){
                showTip("您还没输入热更新地址");
                return;
            }
            hotUrl = hotUpdateCustomUrl;
        }

        systemApi.setValue("nextRootUrl",serverUrl);
        Client.changeResUpdateAddress(hotUrl);

        onClose && onClose();
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("BlackDoor render");

        var {onClose} = this.props,
            {server, hotUpdate, serverCustom, hotUpdateCustom, serverCustomUrl, hotUpdateCustomUrl} = this.state,
         rootUrl = systemApi.getValue("rootUrl");

        return(
            <FullScreenView transparent={true}>
                <div className={styles.frame}>
                    <div className={styles.serverbox}>
                        <div className={styles.serverinnerdiv}>
                            <h3>服务器地址</h3>
                            <ul>
                                <li>
                                    <input className={this.mergeClassName(styles.radio,styles.mid,server=="test"?styles.on:"")} type="radio" name="server" value="test" onChange={this.serverChange} />
                                    <span className={Color.c6}>测试地址：</span>
                                    {/*<span>27.151.112.180:8079</span>*/}
                                    {/*<span className={styles.urlfont}>{rootUrl}</span>*/}
                                    <span className={styles.urlfont}>{server =="test"?TEST_SERVER_URL:"http://27.151.112.180:8079/afa2_9001/mobile/"}</span>
                                </li>
                                <li>
                                    <input className={this.mergeClassName(styles.radio,styles.mid,server=="product"?styles.on:"")} type="radio" name="server" value="product" onClick={this.serverChange} />
                                    <span className={Color.c6}>生产地址：</span>
                                    <span className={styles.urlfont}>https://ework.xyzq.com.cn</span>
                                </li>
                                <li>
                                    <input className={this.mergeClassName(styles.radio,styles.mid,server=="custom"?styles.on:"")} type="radio" name="server" value="custom" onClick={this.serverChange} />
                                    <span className={Color.c6}>自定义：</span>
                                    <input className={styles.input} disabled={!serverCustom} name="customServer" placeholder="1.1.1.1:8080" value={serverCustomUrl} onChange={this.serverInputChange}/>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.serverinnerdiv}>
                            <h3>热资源更新</h3>
                            <ul>
                                <li>
                                    <input className={this.mergeClassName(styles.radio,styles.mid,hotUpdate=="test"?styles.on:"")} type="radio" name="hotUpdate" value="test" onChange={this.hotChange} />
                                    <span className={Color.c6}>测试地址：</span>
                                    <span className={styles.urlfont}>http://27.151.112.180:8079</span>
                                </li>
                                <li>
                                    <input className={this.mergeClassName(styles.radio,styles.mid,hotUpdate=="product"?styles.on:"")} type="radio" name="hotUpdate" value="product" onClick={this.hotChange} />
                                    <span className={Color.c6}>生产地址：</span>
                                    <span className={styles.urlfont}>https://ework.xyzq.com.cn</span>
                                </li>
                                <li>
                                    <input className={this.mergeClassName(styles.radio,styles.mid,hotUpdate=="custom"?styles.on:"")} type="radio" name="hotUpdate" value="custom" onClick={this.hotChange} />
                                    <span className={Color.c6}>自定义：</span>
                                    <input className={styles.input} disabled={!hotUpdateCustom} name="customHotUpdate" placeholder="1.1.1.1:8080" value={hotUpdateCustomUrl} onChange={this.hotInputChange}/>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.server_tip}>注意：设置完成后, 请杀掉进程, 重启app。</div>
                    </div>
                    <div className={styles.serverbtn}>
                        <div className={styles.sv_cancel} onClick={this.onCancel}><a>取消</a></div>
                        <div className={styles.sv_save} onClick={this.onSubmit}><a>保存</a></div>
                    </div>
                </div>
            </FullScreenView>
        );
    }
}

function injectAction(){
    return {showTip};
}

module.exports = connect(null,injectAction())(BlackDoor);
