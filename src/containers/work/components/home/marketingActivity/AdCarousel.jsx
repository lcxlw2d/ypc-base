
import ImageLoad from '../../../../../components/common/carousel/ImageLoad';
import {setMstate} from '../../../actions/home/newscenter/newscenterAction'
import Carousel from '../../../../../components/common/carousel/Carousel';
import styles from '../../css/home/marketingActivity/AdCarousel.css';

class AdCarousel extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data:[{
                imgUrl:"./images/work/home/yxhdDef.png"
            }]
        }
    }
    packPic(mktProd){
      var data=[];
      for(var i=0;i<mktProd.length;i++){
        var tmp = {};
        if(mktProd[i].bannerUrl !=null && mktProd[i].bannerUrl !="nopic")
            tmp.imgUrl = mktProd[i].bannerUrl;//yxhdDef.png
        else
            tmp.imgUrl ="./images/work/home/yxhdDef.png";
        data.push(tmp);
      }
      return data;
    }
    componentDidMount(){
      var {mktProd}=this.props.data;
        if(mktProd){
          var data = this.packPic(mktProd);
            this.setState({data});
        }

    }


    componentWillReceiveProps(nextProps){
      var {mktProd}=nextProps.data;
        if(mktProd){
          var data = this.packPic(mktProd);
            this.setState({data});
        }
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

    onChange = (index)=>{
        this.props.onChange(index);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("AdCarousel render");

        var {data} = this.state;

        return(
            <Carousel cache={false} picClass={styles.adHeight} picList={this.renderData(data)} useDft={false} onChange={this.onChange} autoplay={false} interval={4000} />

        );
    }
}

module.exports = AdCarousel;
