import styles from '../css/home/motInvestAdvicePage.css';
import questions from "../../components/home/MotQuestions.json";
import {submitMOTQusetionnaire} from '../../actions/home/questionnaire/QuestionaireAction';
import {connect} from 'react-redux';
class MotInvestPage extends PureComponent {
    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: true,
            showIcon: true,
            questionStatus:[0,0,0,0,0,0,0,0,0,0]
        }
        this.selectedCount = 0 ;
    }
    componentDidMount() {
        // let isOneMOTDL = systemApi.getValue("isOne_MOT_DL") || 0;
        // if(isOneMOTDL){
        //     // this.setState({show: false})
        // }
    }
     //关闭提示页面·
    close = () => {
        this.setState({show: false})
        // systemApi.setValue("isOne_MOT_DL", 1)
    }

    //提交调查问卷
    submitMOTAdvice  = ()=> (e) =>
    {
        var {questionStatus} = this.state;
        //提交数据
        if (this.selectedCount >= 5)
        {
            var parmsArray = [];
            for (var index = 0; index < questionStatus.length; index++) {
                var element = questionStatus[index];
                if (element == 1) {
                    parmsArray.push(index +1);
                }
            }

            this.props.submitMOTQusetionnaire(parmsArray.join(","),update => {

                this.setState({show: false});
                // systemApi.setValue("isOne_MOT_DL", 1)
            },this);
        }


    }

    motQuestionItemSelect = (i) => (e)=>{
        var {questionStatus} = this.state;
        var status = questionStatus[i];

        if (this.selectedCount >= 5 &&status==0){
            return;
        }
        status==0?(questionStatus[i]=1):(questionStatus[i]=0)
        var counts = 0;
        for (var index = 0; index < questionStatus.length; index++) {
            if (questionStatus[index] == 1)
                counts ++;
        }
        this.selectedCount = counts;

        if (this.selectedCount > 5)
            return
        else
            this.setState({questionStatus:questionStatus.slice(0)});

    }

    showMOTQuestionItem =()=> {
        var length = questions.length,
        {questionStatus} = this.state,
        questionArr=[];

         for (let i = 0; i < length; i++)
            {
                var statu = questionStatus[i];
                questionArr.push(
                <tr className={(i+1)%2==0?styles.bgor:''}>
                    <td>{i+1}</td>
                    <td><strong>{questions[i].itemName}</strong><br /><span className={styles.vote_font}>{questions[i].itemSummary}</span></td>
                    <td>
                        <a indexdd={i} className={this.mergeClassName(styles.vote_check, statu==1?styles.vote_check_on:"")} onClick={this.motQuestionItemSelect(i)}/>
                    </td>
                </tr>)
            }
        return questionArr;
    }

     render() {
        systemApi.log("kingGliryDL render");
        let {show, showIcon} = this.state;

         return (
             <div>
                {show ?<div className={styles.mot_ecard_popup}>
                         <div className={styles.mot_vote_box}>
                         <div className={styles.mot_vote}>
                                <div className={styles.mot_vote_close} onClick={this.close}><a></a></div>
                                <div className={styles.mot_vote_rule}>
                                    <p>以下10项MOT事项，仅针对<span className={styles.rule_weight}>总资产50万以上客户</span>发送提醒给投顾。请选出您认为最具价值的5项MOT进行投票。</p>
                                </div>
                                <div className={styles.mot_vote_form_box}>
                                  <table  height="100%" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <th className={styles.form_title}>序号</th>
                                                <th className={styles.form_title}>MOT备选事项</th>
                                                <th className={styles.form_title}>投票</th>
                                            </tr>
                                            {this.showMOTQuestionItem()}
                                 </table>
        </div>



        <div className={this.selectedCount >= 5?styles.mot_vote_btn_on:styles.mot_vote_btn}>
        <a onClick={this.submitMOTAdvice()}></a>
        <div className={styles.choose_statistics}>
            <p><span className={styles.red}>{this.selectedCount >= 5?"已选5项啦！":"请选出5项哦！"}</span>（<span className={styles.red}>{this.selectedCount}</span>/5）</p>
        </div>
        </div>
        {/*<div className={styles.mot_vote_btn_on}>
        <a ></a>
        <div className={styles.choose_statistics}>
            <p><span className={styles.red}>已选5项啦！</span>（<span className={styles.red}>5</span>/5）</p>
        </div>
        </div>*/}
    </div>
    </div>
</div>
                    : null}
                {/*{showIcon?<div className={styles.wzry_icon} onClick={this.lookTo}></div>:null}*/}
            </div>
         )
     }
}

function injectAction(){
    return {submitMOTQusetionnaire};
}

module.exports = connect(null, injectAction())(MotInvestPage);