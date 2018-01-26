import styles from '../../../pages/css/home/KingGloryPage.css';
import KingRankItem from './KingRankItem';

class KingTop10PanItem extends PureComponent {
 //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    renderList=()=>{
        var{data}=this.props,children=[];
        for (let i = 0;length=data.length, i < length; i++) {

            var item = data[i];
            children.push(<KingRankItem data={item} />)
        }
        return children;
    }



    render() {
        systemApi.log("KingTop10PanItem render");
        return (
                <div>
                     {this.renderList()}
                </div>
        )
    }
}

module.exports = KingTop10PanItem;