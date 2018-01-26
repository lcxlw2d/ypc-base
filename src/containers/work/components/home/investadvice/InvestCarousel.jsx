import {connect} from 'react-redux';

import Carousel from '../../../../../components/common/carousel/Carousel';

import styles from '../../css/home/investadvice/carousel.css';

class InvestCarousel extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    renderItem = (item, i, picClass)=>{
        var {mainText, subText, url} = item,
            style = {backgroundImage:"url("+url+")"};
        return (
            <div className={picClass} style={style}>
                <div className={styles.mainText}>{mainText}</div>
                <div className={styles.subText}>{subText}</div>
            </div>
        );
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("InvestCarousel render");

        var {index, onChange, picList} = this.props;

        return(
            <Carousel picList={picList} autoplay={false} index={index} showButton={true} picClass={styles.pic} onChange={onChange} renderItem={this.renderItem}/>
        );
    }

}

module.exports = connect(null,null)(InvestCarousel);
