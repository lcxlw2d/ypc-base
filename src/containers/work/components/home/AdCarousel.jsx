import {connect} from 'react-redux';
import {getAds,getJournel} from '../../actions/home/homeAction';

import Carousel from '../../../../components/common/carousel/Carousel';

class AdCarousel extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data:[{
                imgUrl:"./images/work/home/banner_dft.gif",
                funcNo:-2
            }]
        }
    }

    componentDidMount(){
        this.props.getAds(this, this.setAds);
    }

    //设置广告图片
    setAds = (data)=>{
        var list = data.slice(0);
        this.setState({data:list});
    }

    renderData(data){
        return data.map((item)=>{
            var {imgUrl,...other} = item;
            return {
                url:imgUrl,
                ...other
            }
        })
    }

    itemClick = (index, item)=>{
        var {funcNo,jumpUrl} = item;
//hashHistory.push("/work/home/questionnaire");
//return;
        if(funcNo == 0){
          Client.trackEvent("0001","BANNER_CLICK_JOURNE");
            this.props.getJournel(this,this.getJournelData);
        }
        else if(funcNo == 1){
          Client.trackEvent("0002","BANNER_CLICK_ANUALBILL");
            hashHistory.push("/work/home/anualbill");
        }
        else if(funcNo == 2){
          Client.trackEvent("0003","BANNER_CLICK_STOCKOFFLINE");
            hashHistory.push("/work/home/stockoffline");
        }
        else if(funcNo == -2){
            return;
        }
        else if(funcNo == 3){
          Client.trackEvent("0004","BANNER_CLICK_QUESTIONNAIRE");
          hashHistory.push("/work/home/questionnaire");
        }
        else{
            if((jumpUrl.indexOf("https://")==0) ||(jumpUrl.indexOf("http://")==0)){
            Client.trackEvent("0005","jumpUrl");
            Client.openAppBrowser(jumpUrl);
            }
        }
    }

    //获取投顾旅程数据
    getJournelData = (data)=>{
        Client.showJounrneyPage(data);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AdCarousel render");

        var {data} = this.state;

        return(
            <Carousel picList={this.renderData(data)} useDft={true} autoplay={true} interval={4000} onClick={this.itemClick}/>
        );
    }


}

function injectAction(){
    return {getAds,getJournel};
}

module.exports = connect(null,injectAction())(AdCarousel);
