import {connect} from 'react-redux';
import {kingOfTheRoad} from '../../actions/home/KingGlory/KingGloryPageTopAction';

import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import styles from '../css/home/KingGloryPage.css';

class KingGloryTopPage extends PageComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
           isShowMonthPopup:false,
           data:[]
        };
        this.currentMonth= 8;//请求当前月份
    }

    //获取页面名称
    getPageName(){ return "王者之路"; }

    componentWillMount(){

    }

    componentDidMount() {
      var{month}=this.props.params;
          month=parseInt(month, 10);



        this.chooseSelectedMonth(month);
          this.state = {
             isShowMonthPopup:false,
             data:[]
          };

      month!="undefined"?this.currentMonth = month:null;

      this.startRefresh();
    }

    chooseSelectedMonth(month){
        var monthSelected = this.refs.monthSelect;
            for (var index = 0; index < monthSelected.length; index++) {
                var element = monthSelected.options[index].value;
                if (element == month) {
                    monthSelected[index].selected=true;
                }
            }
    }

    startRefresh(){
      var params = {
          startIndex:1,
          type:'success',
          length:1000,
          month:this.currentMonth
      };

      this.props.kingOfTheRoad(params,this, this.update);

    }

    //更新数据
    update = (data) => {
        this.setState({data});
    }


    chooseMonth=(e)=>{
      var month = e.target.value
      var isShowMonthPopup=false;
      this.setState({isShowMonthPopup});

      this.currentMonth= month;
      this.startRefresh();
    }

    onMonthClick=(e)=>{

      var {isShowMonthPopup} = this.state;
      this.setState({isShowMonthPopup:!isShowMonthPopup});
    }

    render() {

        var {isShowMonthPopup,data} =this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="英雄联盟"/>
                <div className={this.mergeClassName(styles.wzry_show_first)}>
                  <div className={styles.wzry_ht1}>&nbsp;</div>
                    <div className={styles.wzry_contbox}>
                        <div className={styles.wzrytop01}>
                            <div className={styles.wzrytit01}>
                                <img src="./images/work/home/wzry/wzry_tit09.png" />
                            </div>
                            <div className={styles.wzrymid01}>
                               <div className={styles.sg_challenge}>
                               	   <div className={styles.cha_tit}></div>

                                     <div className={styles.select_box}>
                                          <div className={styles.select_left}>
                                             <select className={styles.select_yy} onChange={this.chooseMonth} ref="monthSelect">
                                                 <option value="8">8月</option>
                                                 <option value="9">9月</option>
                                                 <option value="10">10月</option>
                                             </select>
                                          </div>
                                          <div className={styles.select_right}></div>
                                      </div>

                               </div>
                               <div className={styles.challege_target}>
                                   <div className={styles.target_list}>
                                       {data.map(function(item) {

                                         var {isMvp,pictureUrl,userName,member,teamName,fgsName,score} = item;

                                         return (<div className={styles.target_sg}>
                                               <div className={styles.my_pic}><img src={pictureUrl}/></div>
                                               <div className={styles.my_int}>
                                                   <p><span className={styles.w_font18}>{userName}</span></p>
                                                   <p className={styles.w_font13}><span className={styles.w_white}>{teamName}</span><span className={styles.w_white}>（{fgsName}）</span><span className={styles.yellow_font18}>{score}</span></p>
                                               </div>
                                           </div>);
                                       })}
                                  </div>
                              </div>
                              <div className={styles.wzrybot01}></div>
                          </div>
                          <div className={styles.wzry_tip}>注：五人战队和个人成绩不包含未认领挂接关系的客户创收，所有成绩按日责权提取，每月最终成绩将在次月的<span className={styles.w_yellow}>5个工作日左右确定，</span>届时本页面数据将同步更新。</div>
                    </div>
                </div>
            </div>
            </FullScreenView>
        )
    }
}

function injectAction() {
    return {kingOfTheRoad};
}

// function injectProps(state){
//     var {investadvice} = state.base || {},
//         {from,params} = investadvice;
//     return {from,params};
// }

module.exports = connect(null, injectAction())(KingGloryTopPage);
