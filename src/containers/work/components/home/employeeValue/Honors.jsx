import {connect} from 'react-redux';
import {getFirstEmployee,submitComment,praise} from '../../../actions/home/employeeValue/employeeValueAction';
import styles from '../../css/home/employeeValue/honors.css';
import CommentItem from './CommentItem';
import DeleteMask from './DeleteMask';
import Intro from '../../../../../components/common/popup/Intro';
class Honors extends PureComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state={
          showDelete:false,
          honorName:"--",userName:"--",honorImg:"",honorReasons:[],honorId:null,branchName:'--',
          commentValue:"",
          commentCount:0,comments:[],
          isPraise:1,
          flower:0,
          comments:[],
          deleteCommentId:"",
          introFlag:false,
        }
        this.introList = ["./images/work/home/rongyv.png"];

    }

    componentDidMount(){
      window.addEventListener("resize", this.onResize);
            Client.setAndroidKeyboardResponseOpen(true);
        this.getFirstEmployeeInfo();
    }

    componentWillMount(){
        var introFlag = systemApi.getValue("FLAG_HOME_INTRO_RONGYV");
        this.setState({introFlag:!introFlag});
    }
     //关闭引导
     closeIntro = ()=>{
        systemApi.setValue("FLAG_HOME_INTRO_RONGYV","1");
        this.setState({introFlag:false});
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.onResize);

    }

    //界面尺寸变化回调
    onResize = ()=>{
        var {activeElement} = document,
            {tagName} = activeElement;
        if(tagName=="INPUT" || tagName=="TEXTAREA") {
           window.setTimeout(function() {
               activeElement.scrollIntoViewIfNeeded(true);
           },0);
        }
    }


    getFirstEmployeeInfo =()=>{
      this.props.getFirstEmployee({length:1},(rows)=>{
        var first = [];
          if(rows.length>0){
            first=rows[0];
            this.setState({
              honorName:first.honorName,honorImg:first.honorImg,honorReasons:first.honorReason.split("\n"),honorId:first.honorId,
              branchName:first.branchName,userName:first.userName,
              commentCount:first.commentCount,comments:first.comments,
              flower:first.praiseCount,isPraise:first.isPraise,commentValue:""

            });
          }
      },this);
    }

    flower = ()=>{
      var {flower,honorId,isPraise}=this.state;
      if(honorId==null||honorId==undefined) return;
      var operatorType = isPraise?2:1;
      this.props.praise({operatorType,honorId},(isPraise,flower)=>{
        this.setState({isPraise,flower});

      },this);

    }

    getMore = ()=>{
      hashHistory.push("/work/home/employeeValue/1/honorlist");
    }

    showDeleteOper = (commentId)=>{

        this.setState({showDelete:true,deleteCommentId:commentId});
    }
    deleteComment = ()=>{
      var {honorId,deleteCommentId} = this.state;
      this.props.submitComment({commentId:deleteCommentId,honorId},()=>{
          this.getFirstEmployeeInfo()
      },this);
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
      this.props.submitComment({commentContent:commentValue,honorId},()=>{
          this.getFirstEmployeeInfo()
      },this);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Honors render");
        var {showDelete,flower,commentCount,honorImg,honorName,userName,branchName,commentValue,isPraise, introFlag} =this.state;



        return (
          <div>
                <div className={styles.frame}>
                    <div className={styles.valuebox}>
                    <div className={styles.valuebanner02}>
                        <a className={styles.btn_more} onClick={this.getMore}></a>
                    </div>
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
                {introFlag?(<Intro introList={this.introList} onClose={this.closeIntro}/>):null}
                </div>

        );
    }

}

function injectAction(){
    return {getFirstEmployee,submitComment,praise};
}

module.exports = connect(null, injectAction())(Honors);
