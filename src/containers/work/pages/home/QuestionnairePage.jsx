import {connect} from 'react-redux';
import {checkQusetionnaireStatus} from '../../actions/home/questionnaire/QuestionaireAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import QuestionnaireItems from '../../components/home/QuestionnaireItems';
import styles from '../../components/css/home/questionnaireItems.css';

/** 首页-产品营销 **/
class QuestionnairePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showQuestions:false,
            leave:false

        }
    }

    //获取页面名称
    getPageName(){ return "首页_调研问卷"; }

    start =()=>{
      this.props.checkQusetionnaireStatus(()=>{
        this.setState({
          showQuestions:true
        });
      },this);

    }

    backclick=()=>{
      var {showQuestions} =this.state;
      if(!showQuestions) hashHistory.goBack();
      else {
        this.setState({
          leave:true
        });
      }
    }

    cancel=()=>{
      this.setState({
        leave:false
      });
    }

    gobackConfirm=()=>{
      hashHistory.goBack();
    }

    render() {
        systemApi.log("QuestionnairePage render");

        var {showQuestions,leave} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="调研问卷" onBackClick={this.backclick}/>
                <Content>
                <div className={styles.questionnaire_index}>
                    <div className={styles.qt_index_bg}></div>
                    <div className={styles.qt_start} onClick={this.start}></div>
                </div>
                </Content>
                {showQuestions?<QuestionnaireItems />:""}
                {leave?(
                  <div className={styles.qt_popup} >
                      <div className={styles.qt_pp_box}>
                          <div className={styles.qt_pp_top}>
                            <span>温馨提示</span>
                              <div className={styles.qt_mid_t}></div>
                          </div>
                          <div className={styles.qt_box_text}>
                             <div className={styles.qt_mid_t}></div>
                               <p>不抛弃,不放弃,是革命的精神！<br />同志确定要离开？</p>
                          </div>
                          <div className={styles.qt_pp_btns}>
                              <a className={styles.qt_btn_cancel} onClick={this.cancel}></a>
                              <a className={styles.qt_btn_ok2} onClick={this.gobackConfirm} ></a>
                          </div>
                          <div className={styles.qt_mid_t2}></div>
                      </div>
                </div>):null}


            </FullScreenView>

        );
    }

}
function injectAction() {
    return {checkQusetionnaireStatus};
}

module.exports = connect(null, injectAction())(QuestionnairePage);
