import styles from '../../../pages/css/home/KingGloryPage.css';
import Carousel from '../../../../../components/common/carousel/Carousel';
import KingTop10PanItem from './KingTop10PanItem';

class KingTop10Pan extends PureComponent {
     constructor(props,content){
        super(props,content);
        this.state = {
        }
    }

     //获取页面名称
    getPageName(){
         return "首页_王者荣耀_公司团队排名TOP10组件";
        }


    renderList=()=>{
        var{rowsData}=this.props,children=[];
        var array1=rowsData.slice(0,5),array2=rowsData.slice(5);
            children.push(<KingTop10PanItem data={array1}/>)
            children.push(<KingTop10PanItem data={array2}/>)
        return children;
    }


    render() {
        systemApi.log("KingTop10Pan render");
        var{rowsData}=this.props
        return (
             <Carousel noImg={true} autoplay={false} picClass={this.mergeClassName(styles.team_live,styles.top10)} onChange={this.props.onTabChange}>
               {rowsData ?this.renderList():null}
             </Carousel>
        )
    }
}

module.exports = KingTop10Pan;