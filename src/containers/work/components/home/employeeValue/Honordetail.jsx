import {connect} from 'react-redux';
import {getFirstEmployee,submitComment,praise} from '../../../actions/home/employeeValue/employeeValueAction';
import styles from '../../css/home/employeeValue/honors.css';
import CommentItem from './CommentItem';
import DeleteMask from './DeleteMask';
class Honors extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        var {data} =this.props;
        this.state={
          honorName:data.honorName,userName:data.userName,honorImg:data.honorImg,honorReasons:data.honorReason.split("\n"),
          honorId:data.honorId,branchName:data.branchName,
          commentValue:"",
          commentCount:data.commentCount,comments:data.comments,
          isPraise:data.isPraise,
          flower:data.praiseCount
        }

    }


    flower = ()=>{
      var {flower,honorId,isPraise}=this.state;
      if(honorId==null||honorId==undefined) return;
      var operatorType = isPraise?2:1;
      this.props.praise({operatorType,honorId},(isPraise,flower)=>{
        Event.fire("EMPLOYEEVSLUE_REFRESH_LIST");
        this.setState({isPraise,flower});

      },this);

    }



    deleteComment = ()=>{
      var {honorId,deleteCommentId} = this.state;
      this.props.submitComment({commentId:deleteCommentId,honorId},(data)=>{
          Event.fire("EMPLOYEEVSLUE_REFRESH_LIST");
          this.setState({commentValue:"",commentCount:data.commentCount,comments:data.comments});
      },this);
    }

    showDeleteOper = (commentId)=>{
        this.setState({showDelete:true,deleteCommentId:commentId});
    }

    close = ()=>{
      this.setState({showDelete:false,deleteCommentId:""});
    }

    renderComments=()=>{
        var {comments}=this.state;
        if(comments.length>0)
          return comments.map((item)=>{

            return   <CommentItem commentContent={item.commentContent} commentId={item.commentId} pictureUrl={item.pictureUrl}
             deleteClick={this.showDeleteOper} isOwner={item.isOwner} commentTime={item.commentTime} userName={item.userName}/>;
          })
        else {
          return <div className={styles.rkltsingle+" "+styles.cm}>

               <div className={styles.rkright_show}>
                   <div className={styles.rkrt_name}>
                       <span>还没有评论噢！赶紧抢占沙发吧～</span>
                   </div>
               </div>
           </div>
        }

    }
    renderReasons=()=>{
      var {honorReasons}=this.state;
      return honorReasons.map((item)=>{
        return   <li >{item}</li>;
      })
    }

    changeHandler = (e)=>{
      if(e.target.value.length<=50)
        this.setState({commentValue:e.target.value});
    }
    submitComment= ()=>{
      var {commentValue,honorId} = this.state;
      if(commentValue=="") return;
      this.props.submitComment({commentContent:commentValue,honorId},(data)=>{
        Event.fire("EMPLOYEEVSLUE_REFRESH_LIST");
          this.setState({commentValue:"",commentCount:data.commentCount,comments:data.comments});
      },this);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Honors render");
        var {showDelete,flower,commentCount,honorImg,honorName,userName,branchName,commentValue,isPraise} =this.state;

        return (
                <div >
                <div className={styles.frame2}>
                    <div className={styles.valuebox}>
                      <div className={styles.xbbox}>
                            <div className={styles.xb_top}><span>{honorName}</span></div>
                            <div className={styles.xb_mid}>
                                 <div className={styles.mvpbox}>
                                     <div className={styles.mvp_pic}>
                                         <i></i>
                                       <img src={honorImg} />
                                     </div>
                                      <div className={styles.mvp_intro}>
                                        <div className={styles.mvp_name}>
                                            <strong>{userName}</strong>&nbsp;
                                              <span>{branchName}</span>
                                          </div>
                                          <ul>
                                          {this.renderReasons()}

                                          </ul>
                                      </div>
                                 </div>
                                 <div className={styles.btn_flower+" "+(isPraise==1?styles.btn_disabled:"")} onClick={this.flower}>
                                    <a >
                                          <span>{isPraise==1?"取消送花":"送花"}</span>
                                          <span>({flower})</span>
                                      </a>
                                 </div>
                                 <div className={styles.mvp_ccomment}>
                                     <h1>全部评论<span className={styles.red}>({commentCount})</span></h1>
                                     {this.renderComments()}

                                 </div>
                            </div>
                            <div className={styles.xb_bot}></div>
                        </div>
                    </div>
                {showDelete?<DeleteMask onDelete={this.deleteComment} onClose={this.close}/>:null}
                        </div>

                        <div className={styles.combox_bt}>
                            <input type="text" ref="commentValue" value={commentValue} onChange={this.changeHandler} placeholder="你也来说两句吧~"/>
                            <div className={styles.button} onClick={this.submitComment}><span >提交</span></div>
                        </div>
                </div>

        );
    }

}

function injectAction(){
    return {getFirstEmployee,submitComment,praise};
}

module.exports = connect(null, injectAction())(Honors);
