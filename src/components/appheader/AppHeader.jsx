import styles from './css/appHeader.css';

/*******应用顶端头部标题栏********/
class AppHeader extends PureComponent {

    static defaultProps = {
        headerName: "",
        showBack: true,
        subTitle: "",
        theme: "blue",
        iconLeft: null,
        iconRight: null,
        titleClssName:''
    }

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        var {showBack,onBackClick,backHash} = this.props;
        if (onBackClick) {
            BackBtnTool.setProc(location.hash, onBackClick);
        } else {
            if (showBack) {
                if(backHash){
                    BackBtnTool.setProc(location.hash, function() {
                        hashHistory.push(backHash);
                    });
                }
                else{
                    BackBtnTool.setProc(location.hash, function() {
                        hashHistory.goBack();
                    });
                }

            }
        }
    }

    goBackClick = () => {
        //返回前一路由
        var {backHash, onBackClick} = this.props;
        if (backHash) {
            hashHistory.push(backHash);

        } else if (onBackClick) {
            onBackClick();
        } else {
            hashHistory.goBack();
        }
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("AppHeader render");

        var {
                showBack,
                headerName,
                subTitle,
                theme,
                iconLeft,
                iconRight,
                animate,
                titleClssName
            } = this.props,
            headerCls = this.mergeClassName(styles.header, styles[theme], animate?styles.animate:""),
            arrowCls = this.mergeClassName(styles.head_arrow, styles[theme]);

        iconLeft = React.Children.map(iconLeft, (item, index) => {
            return React.cloneElement(item, {theme: theme});
        });

        iconRight = React.Children.map(iconRight, (item, index) => {
            return React.cloneElement(item, {theme: theme});
        });

        return (
            <div className={headerCls}>
                <div className={styles.header_innerbox}>
                    <div className={styles.header_left_icon}>
                        <span className={styles.lefticonbox}>
                            {showBack? (<a onClick={this.goBackClick} className={arrowCls}></a>): ""}
                            {iconLeft}
                        </span>
                    </div>
                    <div className={styles.header_mid_cont}>
                        {subTitle != ""
                            ? (
                                <div className={this.mergeClassName(styles.searchbox01, styles.multi)}>
                                    <span className={styles.center}>{headerName}</span>
                                    <p className={styles.subtitle}>{subTitle}</p>
                                </div>
                            )
                            : (
                                <div className={titleClssName!==''?styles[titleClssName]:styles.searchbox01}>
                                    <span className={styles.center}>{headerName}</span>
                                </div>
                            )}
                    </div>
                    <div className={styles.header_right_icon}>
                        <div className={styles.pattern}>
                            {iconRight}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

// module.exports = AppHeader;
export default AppHeader;
