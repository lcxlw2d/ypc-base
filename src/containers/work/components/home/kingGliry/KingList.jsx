import styles from '../../../../work/pages/css/home/KingGloryPage.css';
import KingListItem from './KingListItem';

class KingList extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

     renderList=()=>{
        var{data}=this.props,children=[];
        for (let i = 0;length=data.length, i < length; i++) {

            var item = data[i];
            children.push(<KingListItem data={item}/>)
        }
        return children;
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("KingList render");
        return (
            <div className={styles.target_list}>
                {this.renderList()}
            </div>
        );
    }

}

module.exports = KingList;
