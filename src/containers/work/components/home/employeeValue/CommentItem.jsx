import styles from '../../css/home/employeeValue/commentItem.css';
class CommentItem extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);

    }

    deleteComment = ()=>{
      var {deleteClick,commentId,isOwner}=this.props;
      if(isOwner==1)
        deleteClick && deleteClick(commentId);
    }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("CommentItem render");
        var {commentContent,commentId,isOwner,commentTime,userName,pictureUrl} =this.props;



        return (

               <div className={styles.rkltsingle+" "+styles.cm} onClick={this.deleteComment}>
                    <div className={styles.rkleft_pic}>
                        <img src={pictureUrl} />
                    </div>
                    <div className={styles.rkright_show}>
                        <div className={styles.rkrt_name}>
                            <span>{userName}</span>
                        </div>
                        <div className={styles.rkrt_time}><span>{commentTime}</span></div>
                        <div className={styles.clear}></div>
                        <div className={styles.rkrt_addr}>
                            {commentContent}
                        </div>
                    </div>
                </div>

        );
    }

}


module.exports = CommentItem;
