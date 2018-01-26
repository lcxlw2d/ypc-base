import Carousel from '../../../../../components/common/carousel/Carousel';
import styles from '../../css/home/employeeValue/Performance.css';
class ListItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    renderItem = () => {

        let {index=0, data={}} = this.props, children=[];
        switch (index) {
            case 0:
                children = this.renderTop123(data, 1);
                break;
            case 1:
                children = this.renderTop123(data, 2);
                break;
            case 2:
                children = this.renderTop123(data, 3);
                break;

            default:
                children = this.renderTop4(data, index+1)
                break;
        }

        return children;

    }

    //渲染第一,二，三名
    renderTop123 = (data, top) => {
        let {   userName='--',
                loginId='--',
                branchName='---',
                organizationName='---',
                value='---',
                pictureUrl='./images/work/home/value/img01.png',
             } = data, { danWei='' } = this.props;
        return [<div className={styles[`rkctsingle0${top}`]}>
                    <div className={styles.rk_pic}>
                        <img src={pictureUrl} />
                    </div>
                    <div className={styles.rk_num}>
                        <span>{value}{danWei}</span>
                    </div>
                    <div className={styles.rk_name}>
                        <p>{userName}</p>
                        <p>{loginId}</p>
                    </div>
                    <div className={styles.rk_addr}>
                        <p>{branchName}</p>
                        <p>{organizationName}</p>
                    </div>
                </div>]
    }

    //渲染其他
    renderTop4 = (data, index) => {
        let {   userName='--',
                loginId='--',
                branchName='---',
                organizationName='---',
                value='---',
                pictureUrl='./images/work/home/value/img01.png',
            } = data, { danWei='' } = this.props;

        return [<div className={styles.rkltsingle}>
                    <div className={styles.rkleft_pic}>
                        <img src={pictureUrl} />
                        <i>{index}</i>
                    </div>
                    <div className={styles.rkright_show}>
                        <div className={styles.rkrt_name}>
                            <span>{userName}</span>丨<span className={Color.c6}>{loginId}</span>
                        </div>
                        <div className={styles.rkrt_num}><span>{value}{danWei}</span></div>
                        <div className={styles.clear}></div>
                        <div className={styles.rkrt_addr}>
                            <p>{branchName}</p>
                            <p>{organizationName}</p>
                        </div>
                    </div>
                </div>]
    }

    render() {
        systemApi.log("ListItem render");
        return (
            <div>
                {this.renderItem()}
            </div>
        )
    }
}

module.exports = ListItem;
