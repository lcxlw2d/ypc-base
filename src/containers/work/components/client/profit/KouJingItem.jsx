
import styles from './css/kouJing.css';
class KouJingItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        systemApi.log("KouJingItem render");

        let { index, title, center } = this.props;

        return (
            <li>
            	<h1><i>{index}</i><span>{title}</span></h1>
                <p dangerouslySetInnerHTML={{__html:center}}></p>
            </li>
        )
    }
}

module.exports = KouJingItem;
