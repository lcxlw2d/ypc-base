import styles from '../../../pages/css/home/KingGloryPage.css';
import Carousel from '../../../../../components/common/carousel/Carousel';
import BusinessItem from './BusinessItem';
class Business extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    renderList = () => {
        var {data, Attribute} = this.props,
            children = [];
        for (let i = 0; i < 10; i++) {
            if (data.length == 1) {
                children.push(
                    <div><BusinessItem Attribute={Attribute} data={data[i]}/></div>
                )
            } else if (i % 2 != 0) {
                children.push(
                    <div><BusinessItem Attribute={Attribute} data={data[i - 1]}/><BusinessItem Attribute={Attribute} data={data[i]} isTwo={true}/></div>
                )
            }
        }
        return children;
    }

    render() {
        systemApi.log("Business render");
        return (
            <Carousel
                noImg={true}
                autoplay={false}
                picClass={styles.team_vs}
                onChange={this.props.onTabChange}>
                {this.renderList()}
            </Carousel>
        )
    }
}

module.exports = Business;
