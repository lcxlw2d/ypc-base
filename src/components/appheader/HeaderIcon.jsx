import styles from './css/headerIcon.css';

class HeaderIcon extends PureComponent{

    constructor(props) {
        super(props);
    }

    render(){
        systemApi.log("HeaderIcon render");

        var {iconCls,onClick,theme,hasNew} = this.props,
            icoCls = this.mergeClassName(styles.ico, styles[iconCls], styles[theme]);

        return (
            <a className={icoCls} onClick={onClick}>
                {hasNew?(<div className={styles.dot}></div>):null}
            </a>
        );
    }

}

module.exports = HeaderIcon;
