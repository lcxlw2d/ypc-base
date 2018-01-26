import styles from '../../css/home/investadvice/classifyItem.css';

class ClassifyItem extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ClassifyItem render");

        var {type, text, subText, onClick} = this.props;

        return(
            <div className={styles[type]}>
                <div className={styles.mot_sg_inner} onClick={onClick}>
                    <h1>{text}</h1>
                    <p>{subText}</p>
                </div>
            </div>
        );
    }

}

module.exports = ClassifyItem;
