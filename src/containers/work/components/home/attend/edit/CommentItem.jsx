//import styles from '../../css/home/employeeValue/commentItem.css';
import styles from '../../../css/home/attend/edit/CommentItem.css';
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
        systemApi.log("AttendDetailShowPage-CommentItem render");

        var {  commentId, commentContent, reviewerId, reviewerName, reviewerImg, commentTime  } = this.props;

        reviewerImg = reviewerImg == '-1'?'./images/work/home/user_pic01.png':reviewerImg;

        return (

            <li onClick={this.deleteComment}>
                <div className={styles.ftuserpic}><img src={reviewerImg} /></div>
                <div className={styles.ftcomtext}>
                    <div className={styles.ftcmint}>
                        <div className={styles.ftcm_name}>
                            <span>{reviewerName}</span>
                        </div>
                        <div className={styles.ftcm_time}><span>{commentTime}</span></div>
                    </div>
                    <div className={styles.ftcm_addr}>{commentContent}</div>
                </div>
            </li>

        );
    }

}


module.exports = CommentItem;
