import styles from '../../css/client/record/rename.css';
class TitleAlert extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
    }

    //确认删除
    onfirmDelete=()=>{
        this.props.confirmDelete();
    }

    //取消删除
    cancelDelete=()=>{
        this.props.cancelDelete();
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("TitleAlert render");
        var{title,max,size} = this.props;
        size = size > 0
            ? size < 1024
                ? size + "B"
                : size < 1048576
                    ? Math.ceil(size / 1024) + "K"
                    : Math.ceil(size / 1048576) + "M"
            : null;
        return (
            <div className={styles.ecard_popup}>
                <div className={this.mergeClassName(styles.ecard_box, styles.nobg)}>
                    <div className={styles.pp_top}>{title}</div>
                    {title=="删除确认"
                        ? <div className={styles.box_text}>
                                <p>删除后将无法恢复，是否继续删除？</p>
                                <p>&nbsp;&nbsp;&nbsp;</p>
                            </div>
                        : <div className={styles.box_text}>
                            <p>本次共选择上传<span>{max}</span>条录音，合计<span>{size}</span>。</p>
                            <p className={Color.blue}>是否继续上传？</p>
                        </div>}
                    <div className={styles.pp_btns}>
                        {title=="删除确认"?<a onClick={this.cancelDelete}>取消</a>:<a onClick={this.props.unMultiSelect}>取消</a>}
                        {title=="删除确认"?<a onClick={this.onfirmDelete}>确定</a>:<a onClick={this.props.startMaxUpLoad}>确定</a>}
                    </div>

                </div>
                <div></div>
            </div>

        );
    }

}

module.exports = TitleAlert;
