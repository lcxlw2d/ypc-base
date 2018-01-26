
import KouJingItem from "./KouJingItem";
import DivScroll from "../../../../../components/common/iscroll/DivScroll";
import styles from '../../css/home/employeeValue/Performance.css';
import data from '../../../../../../json/kouJing.json';
class KouJingList extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    renderItem = () => {

        return data[this.props.index].params.map((item, index) => {
            let { title, center } = item;
            index = index<9?`0${index+1}`:index+1;
            return <KouJingItem index={index} title={title} center={center}/>
        })
    }

    render() {
        systemApi.log("KouJingList render");
        return (
            <div className={styles.caliberbox}>
                <ul>
                    {this.renderItem()}
                </ul>
            </div>
        )
    }
}

module.exports = KouJingList;
