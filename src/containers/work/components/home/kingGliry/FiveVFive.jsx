import styles from '../../../pages/css/home/KingGloryPage.css';
import Carousel from '../../../../../components/common/carousel/Carousel';
import CorpsVs from './CorpsVs';
class FiveVFive extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    renderList=()=>{
        var{data}=this.props;
        return data.map((item,index)=>{
            var {myTeam,rivalTeam}=item;
            return (<CorpsVs rivalTeam={rivalTeam} myTeam={myTeam} />)
        })
    }

    render() {
        systemApi.log("FiveVFive render");
        return (
             <Carousel noImg={true} autoplay={false} picClass={styles.team_vs} onChange={this.props.onTabChange}>
                {this.renderList()}
             </Carousel>
        )
    }
}

module.exports = FiveVFive;