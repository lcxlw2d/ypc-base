import styles from './css/titleIcon.css';

class TitleIcon extends PureComponent{

    constructor(props) {
        super(props);
    }

    render(){
        systemApi.log("TitleIcon render");

        var {iconCls} = this.props,
            icoCls = this.mergeClassName(styles.tit, styles[iconCls]);

        return (
            <div className={styles.searchbox01}>
				<span className={styles.center} >
                    <i className={icoCls}></i>
                </span>
              </div>
        );
    }

}

module.exports = TitleIcon;
