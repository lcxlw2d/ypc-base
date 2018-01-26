import styles from '../../../../work/pages/css/home/KingGloryPage.css';
import KingRankItem from './KingRankItem';

class KingRankList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

     renderList=()=>{
        var{data}=this.props,children=[];
        for (let i = 0;length=data.length, i < length; i++) {

            var item = data[i];
            children.push(<KingRankItem data={item} className={this.mergeClassName(styles.top10_sg,styles.top10_01)}/>)
        }
        return children;
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("KingList render");
        return (
            <div >
                {this.renderList()}
            </div>
        );
    }

}

module.exports = KingRankList;