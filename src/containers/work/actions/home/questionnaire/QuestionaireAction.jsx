import {showLoading, hideLoading, showMessage, SUCCESS, ERROR, WARNING} from '../../../../../store/actions';

//获取年度账单url
export function showWarning(msg){
    return function(dispatch, state){
            dispatch(showMessage(WARNING, msg));

    }
}

export function checkQusetionnaireStatus(callback, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("ques/done").done((data)=>{
            dispatch(hideLoading());
            if(data.done){
              dispatch(showMessage(SUCCESS, "您已提交过问卷了"));
            }
            else
              callback && callback();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//检查MOT问卷是否已提交过
export function checkMOTQusetionnaire(callback, component){
    return function(dispatch, state){
        // dispatch(showLoading());
        component.requestJSON("vote/isvote").done((data)=>{
            dispatch(hideLoading());
              callback && callback(data);
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//提交调查问卷
export function submitMOTQusetionnaire(questions,callback, component){
    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("vote/addvote",{
                itemIds:questions
            }).done((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(SUCCESS, "问卷提交成功"));
            callback && callback();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}

//提交调查问卷
export function submit(questions, answer, callback, component){
    var quesInfo=[],
    size = questions.length;
    if(size!=answer.length){
      dispatch(showMessage(ERROR, "请回答所有问题哦"));
      return;
    }
    for(var i=0;i<size;i++){
      var temp={};
      temp.quesId=i;
      if(i==(size-1)){//最后一题特殊处理
        temp.ansName=answer[i][0];
        temp.ansId=0;
      }else{
        var opts=questions[i].opts,optsSize=opts.length;
        var ansIdarr =[];
        for(var j=0;j<optsSize;j++){
          if(answer[i][j]){
            ansIdarr.push(j+1);
          }
        }
        temp.ansId=ansIdarr.join("|");
      }

      quesInfo.push(temp);
    }
    quesInfo = JSON.stringify(quesInfo);
    //console.log(quesInfo);
    //var quesInfo = encodeURI(quesInfo);

    return function(dispatch, state){
        dispatch(showLoading());
        component.requestJSON("ques/save",{
            quesInfo
        }).done((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(SUCCESS, "问卷提交成功"));
            callback && callback();
        }).fail((data)=>{
            dispatch(hideLoading());
            dispatch(showMessage(ERROR, data.message));
        });
    }
}
