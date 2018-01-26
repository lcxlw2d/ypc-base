
import styles from '../../css/home/marketingActivity/nonAuthorizedTip.css';

class NonAuthorizedTip extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }


    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("NonAuthorizedTip render");
        var {title} =this.props;

       return (
         <div  className={styles.result_box} >
         <img src="./images/work/home/img_empty03.png" />
                <p>{title}</p>
       </div>

        );
    }
}



module.exports = NonAuthorizedTip;
