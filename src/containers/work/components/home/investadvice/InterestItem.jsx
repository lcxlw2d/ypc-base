import styles from '../../css/home/investadvice/Interest.css';

class InterestItem  extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        var {num="--",title="--", name="--",num1="--",num2="--",value="--",clos} = this.props;
        num=num?num:"--";title=title?title:"--", name=name?name:"--",num1=num1?num1:"--",num2=num2?num2:"--",value=value?value:"--",
        clos="progress"+clos;
        return(
               <div className={styles.int_sg}>
              	   <div className={styles.int_left}>
                   		<p>{num}</p>
                        <p className={styles.c9}>{title}</p>
                   </div>
                   <div className={styles.int_right}>
                   		<h2>{name}</h2>
                        <div className={styles.int_product}>
                        	<div className={styles.int_lefts}>
                            	<span className={styles.c9}>{value}</span>
                                <span className={styles.red}>{num1}</span>
                                <span className={styles.red}>{num2}</span>
                            </div>
                            <div className={styles[clos]}>
                               <div className={styles.progress_bar}></div>
                            </div>
                        </div>
                   </div>
              </div>
        )
    }
}

module.exports = InterestItem;