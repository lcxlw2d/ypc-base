import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import styles from '../../css/home/marketingActivity/filter.css';

class Filter extends PureComponent {

    constructor(props, context) {
        super(props, context);
        var {currSubActivity, reportType,  level} = this.props;

        if(reportType ==2 ) reportType=0;
        else if(reportType ==1) reportType=1;
        else if( reportType=3)  reportType=2;
        if(level==3) level=0;
        else if(level==2) level=1;
        else if(level==1) level=2;
        this.state={
          conditionMap:props.data?props.data:null,
          reportType,
          subActivity:currSubActivity,
          level
        };
    }

    close =()=>{
      this.props.close();
    }
    reset=()=>{
      this.close();
    }

    confirm = ()=>{
      var {reportType,subActivity,level}=this.state;
      if(reportType ==0 ) reportType=2;
      else if(reportType ==1) reportType=1;
      else  reportType=3;
      if(level==0) level=3;
      else if(level==1) level=2;
      else if(level==2) level=1;

      this.props.setParams({subActivity,reportType,level});
      this.props.close();
    }


    componentWillReceiveProps(nextProps){
      var {data,currSubActivity, reportType,  level}=nextProps;

      if(reportType ==2 ) reportType=0;
      else if(reportType ==1) reportType=1;
      else if( reportType=3)  reportType=2;
      if(level==3) level=0;
      else if(level==2) level=1;
      else if(level==1) level=2;

        if(data){
            this.setState({conditionMap:data,reportType,level,currSubActivity});
        }
    }

  subActClick = (index)=>()=>{
     if(index==this.state.subActivity) return;
     this.setState({subActivity:index});


  }

  chooseReportType = (index)=>()=>{
    if(index==this.state.reportType) return;
    this.setState({reportType:index});
  }
  chooseLevel= (index)=>()=>{
    if(index==this.state.level) return;
    this.setState({level:index});
  }

   renderSubActivitys=()=>{
     var {subActivity,conditionMap}=this.state;
     return  conditionMap.map((item,index)=>{
           return <li onClick={this.subActClick(index)} ><a  className={subActivity==index?styles.on:null}><span className={styles.yxhdpm_name}>{item.itemName}</span></a></li>
         })

   }


   stopPropagat = (e)=>{
     e.stopPropagation();
   }
    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("Filter render");
        var {level,reportType,subActivity}=this.state;

       return (

         <FullScreenView transparent={true}>
         <div className={styles.background} onClick={this.close}>
             <div className={styles.yxhdpm_filter_box} onClick={this.stopPropagat}>
              <div className={styles.yxhdpm_filter_list}>
                <div className={styles.yxhdpm_filter_title}>活动子目标</div>
                     <div className={styles.yxhdpm_filter_main}>
                        <ul>
                            {this.renderSubActivitys()}
                        </ul>

                     </div>
                 </div>
                 <div className={styles.yxhdpm_filter_list}>
                <div className={styles.yxhdpm_filter_title}>报表类型</div>
                     <div className={styles.yxhdpm_filter_main}>
                      <ul>
                          <li  onClick={this.chooseReportType(0)}><a  className={reportType==0?(styles.yxhdpm_h32+" "+styles.on):styles.yxhdpm_h32}><span>月报</span></a></li>
                             <li onClick={this.chooseReportType(1)}><a className={reportType==1?(styles.yxhdpm_h32+" "+styles.on):styles.yxhdpm_h32}><span>季报</span></a></li>
                             <li onClick={this.chooseReportType(2)}><a className={reportType==2?(styles.yxhdpm_h32+" "+styles.on):styles.yxhdpm_h32}><span>年报</span></a></li>
                         </ul>
                     </div>
                 </div>
                 <div className={styles.yxhdpm_filter_list}>
                <div className={styles.yxhdpm_filter_title}>层级</div>
                     <div className={styles.yxhdpm_filter_main}>
                      <ul>
                          <li onClick={this.chooseLevel(0)}><a className={level==0?(styles.yxhdpm_h32 +" "+styles.on):styles.yxhdpm_h32}><span>员工</span></a></li>
                             <li onClick={this.chooseLevel(1)}><a className={level==1?(styles.yxhdpm_h32 +" "+styles.on):styles.yxhdpm_h32}><span>营业部</span></a></li>
                             <li onClick={this.chooseLevel(2)}><a  className={level==2?(styles.yxhdpm_h32 +" "+styles.on):styles.yxhdpm_h32}><span>分公司</span></a></li>
                         </ul>
                     </div>
                 </div>
                 <div className={styles.yxhdpm_filter_btn}>
                      <a  className={styles.yxhdpm_btn_cz} onClick={this.reset} >取消</a>
                      <a  className={styles.yxhdpm_btn_ok} onClick={this.confirm}  >确定</a>
                 </div>


             </div>



         </div>


         </FullScreenView>

        );
    }
}



module.exports = Filter;
