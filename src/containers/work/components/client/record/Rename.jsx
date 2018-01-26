import styles from '../../css/client/record/rename.css';
class Rename extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state= {
            value: this.props.value || ""
        }
    }

    changeHandler = e => {
        this.setState({value:e.target.value});
    }

    confirmRename=()=>{
        var {value}=this.state;
        this.props.confirmRename(value);
    }

    //本地存储
    localRename=()=>{
        var{value}=this.state;
        if(value){
            this.props.confirmRename(value);
        }else{
            this.props.cancelRename();
        }
    }

    //上传云端
    fileUpload=()=>{
        var{value}=this.state;
        this.props.fileUpload(value);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Rename render");
        var{value}=this.state,
            {titles,fileName="", showName="", firstItem}=this.props,
            {rename,size}=firstItem;
           // value = this.setPlaceholder(value);
            size=size>0?size<1024?size+"B":size<1048576?Math.ceil(size/1024)+"K":Math.ceil(size/1048576)+"M":null;
        return (
            <div className={styles.ecard_popup}>
                <div className={this.mergeClassName(styles.ecard_box, styles.nobg)}>
                    <div className={styles.pp_top}>{titles}</div>
                    <div className={styles.box_text}>
                        <p>录音命名</p>
                        <p><input type="text" onChange={this.changeHandler} value={value} className={styles.popup_text}/></p>
                        {titles=="存储录音"?<p>是否存储到云端？本次上传预计消耗<span>{size}</span>流量。</p>:null}
                    </div>
                    {titles=="存储录音"?<div className={styles.pp_btns}>
                        <a onClick={this.localRename}>暂存本地</a>
                        <a onClick={this.fileUpload}>上传云端</a>
                    </div>:<div className={styles.pp_btns}>
                        <a onClick={this.props.cancelRename}>取消</a>
                        <a onClick={this.confirmRename}>确定</a>
                    </div>}

                </div>
                <div></div>
            </div>

        );
    }

}

module.exports = Rename;
