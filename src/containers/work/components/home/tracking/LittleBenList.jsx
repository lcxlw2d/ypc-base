//公共库
import _ from 'lodash';
//私有公共组件
import Carousel from '../../../../../components/common/carousel/Carousel';
//样式表
import styles from '../../css/home/tracking/LittleBen.css';
class LittleBenList extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            tabIndex: 0,
        }
    }

    renderList = () => {
        let children = _.chunk(this.props.children, 8);
        return children.map((item, index) => {
            return React.createElement('div', null, item)
        })
    }

    renderNav = () => {
        let {tabIndex} = this.state,
            children = [],
            length = Math.ceil(this.props.children.length / 8);
        for (let i = 0; i < length; i++) {
            children.push(<li className={ i == tabIndex ? styles.on : "" }> </li>)
        }
        return children;
    }

    onTabChange = tabIndex => {
        this.setState({
            tabIndex
        })
    }

    render() {
        systemApi.log("LittleBenList render");
        let {tabIndex} = this.state;
        return (
            <div>
              <Carousel noImg={ true } autoplay={ false } picClass={ styles.case } onChange={ this.onTabChange }>
                { this.renderList() }
              </Carousel>
              <ul className={ styles.vs_nav }>
                { this.renderNav() }
              </ul>
            </div>
        )
    }
}

module.exports = LittleBenList;
