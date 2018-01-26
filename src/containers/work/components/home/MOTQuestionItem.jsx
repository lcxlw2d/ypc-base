
// import {connect} from 'react-redux';
// import {showWarning,submit} from '../../actions/home/questionnaire/QuestionaireAction';
// import styles from '../css/home/questionnaireItems.css';
// import questions from "../../components/home/MotQuestions.json";
// //当日交易龙虎榜
// class MOTQuestionItem extends PureComponent{

//     //构造函数
//     constructor(props,context) {
//         super(props,context);


//     }

//     clickItem = (itemIndex)=>()=>{
//       var {index}=this.state;
//       if(questions[index].type==1){
//         //单选
//         var onArr=[];
//         onArr[itemIndex]=true;
//         this.setState({
//           onArr
//         });
//       }else if(questions[index].type==2){
//         //多选
//         var {onArr}=this.state;
//         if(onArr[itemIndex]) onArr[itemIndex]=false;
//         else  onArr[itemIndex]=true;
//         this.setState({
//           onArr:onArr.slice(0)
//         });
//       }


//     }

//     renderOpts = (opts)=>{
//       var {onArr}=this.state;
//       return opts.map((item,index)=>{
//         return (<li onClick={this.clickItem(index)} className={onArr[index]?styles.on:""} ><a >{String.fromCharCode(65+index)}.{item}</a></li>)
//       }
//     );
//         //  <li className={styles.on}><a href="#">A.近三个月历史交易信息</a></li>

//     }

//     lastone=()=>{
//       var {index,onArr}=this.state;
//       if(index==0) return;
//       if(index==(questions.length-1))//最后一题
//       {
//         var {textareaMsg} = this.refs;
//         onArr[0]=textareaMsg.value;
//         this.answer[index] = onArr;
//       }else{
//         this.answer[index]=onArr;
//       }

//       if(this.answer[index-1]){
//         this.setState({
//           index:index-1,
//           onArr:this.answer[index-1]
//         });
//       }else{
//         this.setState({
//           index:index-1,
//           onArr:[]
//         });
//       }


//     }

//     nextone=()=>{
//       var {index,onArr}=this.state,
//       opts=questions[index].opts,
//       optSise=opts.length,
//       chooseNo=0;
//       for(var ind=0;ind<optSise;ind++){
//         if(onArr[ind]==true) chooseNo++;
//       }
//       if(chooseNo==0){
//         this.props.showWarning("请选择选项后再进入下一题");
//         return;
//       }else if(questions[index].limit && chooseNo>questions[index].limit){
//         this.props.showWarning("最多选择"+questions[index].limit+"个选项");
//         return;
//       }

//       this.answer[index]=onArr;
//       if(index==(questions.length-1)) return;
//       if(this.answer[index+1]){
//         this.setState({
//           index:index+1,
//           onArr:this.answer[index+1]
//         });
//       }else{
//         this.setState({
//           index:index+1,
//           onArr:[]
//         });
//       }

//     }

//     commit =()=>{
//       this.setState({
//         confirm:true
//       });

//     }

//     cancel=()=>{
//       this.setState({
//         confirm:false
//       });
//     }

//     commitConfirm = ()=>{
//             var {textareaMsg} = this.refs;
//             var {onArr,index}=this.state;
//             onArr[0]=textareaMsg.value;
//             this.answer[index] = onArr;
//             this.props.submit(questions,this.answer,()=>{
//               hashHistory.goBack();
//             },this);
//     }

//     hideTextarea = ()=>{
//       this.setState({
//         hideButtons:true
//       });
//     }

//     showTextarea = ()=>{
//       this.setState({
//         hideButtons:false
//       });
//     }

//     //渲染函数
//     render(){
//         //打印渲染日志，必写
//         systemApi.log("QuestionnaireItems render");
//         var {index,onArr,confirm,hideButtons} =this.state,
//         num=index+1,title= questions[index].title,type=questions[index].type,opts=questions[index].opts;
//         if(num<10) num="0"+num;
//         else num=""+num;


//         return (
//             <tr>
//                   <td>01</td>
//                       <td><strong>持仓大幅波动</strong><br /><span class="vote_font">持仓股当天涨跌超过一定幅度的客户</span></td>
//                   <td><a href="#" class="vote_check vote_check_on"></td>
//              </tr>
//         );
//     }

// }

// function injectAction() {
//     return {showWarning,submit};
// }
// module.exports = connect(null, injectAction())(QuestionnaireItems);
