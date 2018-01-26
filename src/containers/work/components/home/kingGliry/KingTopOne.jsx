import styles from '../../../../work/pages/css/home/KingGloryPage.css';
import KingTopOneItem from './KingTopOneItem';

class KingTopOne extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
    }

    renderList = () => {
        var {data} = this.props,
            children = [],
            keys = 0;
        var dataCopy = Object.keys(data);
        for (let i = 0; length = dataCopy.length, i < length; i++) {
            switch (dataCopy[i]) {
                case 'maxKing':
                    keys = 0;
                    break;
                case 'maxShooter':
                    keys = 1;
                    break;
                case 'maxTank':
                    keys = 2;
                    break;
                case 'maxKiller':
                    keys = 3;
                    break;
                case 'maxMaster':
                    keys = 4;
                    break;
                default:
                    break;
            }
            children[keys] = <KingTopOneItem index={dataCopy[i]} data={data[dataCopy[i]]}/>;
        }
        return children;
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("KingTopOne render");
        return (
            <div className={styles.TOP1}>
                <h1><img src="./images/work/home/wzry/wzry_tit06.png"/></h1>
                <ul>
                    {this.renderList()}
                </ul>
            </div>
        );
    }

}

module.exports = KingTopOne;
