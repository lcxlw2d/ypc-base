import styles from '../../../../work/pages/css/home/KingGloryPage.css';
import Carousel from '../../../../../components/common/carousel/Carousel';
import KingList from './KingList';

class KingTopList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

     renderList=() => {
        var{data}=this.props, children=[];
        var array1=data.slice(0, 5), array2=data.slice(5);
            children.push(<KingList data={array1}/>)
            children.push(<KingList data={array2}/>)
        return children;
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("KingTopList render");
        return (
             <Carousel noImg={true} autoplay={false} picClass={styles.team_vs_top10} onChange={this.props.onTabChange}>
                {this.renderList()}
             </Carousel>
        );
    }

}

module.exports = KingTopList;
