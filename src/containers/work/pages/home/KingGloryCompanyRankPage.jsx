import {connect} from 'react-redux';
import {getBusiness, getCompany} from '../../actions/home/KingGlory/KingGloryRankPageAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import KingRankItem from './../../components/home/kingGliry/KingRankItem';
import KingTop10Pan from './../../components/home/kingGliry/KingTop10Pan';
import KingTeamPan from './../../components/home/kingGliry/KingTeamPan';
import TabChange from './../../components/home/kingGliry/TabChange';
import ImgTab from './../../components/home/kingGliry/ImgTab';
import KingTeamItem from './../../components/home/kingGliry/KingTeamItem';
import styles from '../css/home/KingGloryPage.css';
import BusinessItem from './../../components/home/kingGliry/BusinessItem';
import {showLoading, hideLoading, showMessage, WARNING, ERROR, SUCCESS} from '../../../../store/actions';

class KingGloryCompanyRankPage extends PageComponent {

 constructor(props, content) {
        super(props, content);
        this.state = {
            companyAndBranchData:[]//营业部分公司返回的数组
        };

        this.startIndex=1;//请求实时战况起始位置
        this.length=10;//请求实时战况起始长度
        this.currentMonth= 8;//请求实时战况当前月份
        this.currentCompany= "福州分公司";//请求实时战当前公司
        this.companyType ="Branch";//分公司还是营业部类型 Fgs 分公司；Branch是营业部
    }

    //获取页面名称
    getPageName() {
        return "分公司详情页_王者荣耀";
    }

    componentDidMount() {
        super.componentDidMount()
        //获取路由传过来的参数
        var{fgsName,month,companyType}=this.props.params;
            month=parseInt(month, 10);

        //设置默契的月和公司
        this.chooseSelectedCompanyName(fgsName);
        this.chooseSelectedMonth(month);

        this.companyType = companyType;
        fgsName!="0"?this.currentCompany = fgsName:null;
        month!="undefined"?this.currentMonth = month:null;

        //获取营业部
     if (this.companyType == "Branch")
     {
          this.props.getBusiness({
                startIndex:this.startIndex,
                length:this.length,
                month:this.currentMonth,
                fgsName:this.currentCompany
            }, this, (companyAndBranchData) => {
                this.setState(
                    {
                        companyAndBranchData:companyAndBranchData}
                    );
            });
     }else //获取分公司
     {
          this.props.getCompany({
                startIndex:this.startIndex,
                length:this.length,
                month:this.currentMonth,
                // fgsName:this.currentCompany
            }, this, (companyAndBranchData) => {
                this.setState(
                    {
                        companyAndBranchData:companyAndBranchData}
                    );
            });
         }
    }

    //默认选中的月份
    chooseSelectedMonth(month){
        var monthSelected = this.refs.monthSelect;
            for (var index = 0; index < monthSelected.length; index++) {
                var element = monthSelected.options[index].value;
                if (element == month) {
                    monthSelected[index].selected=true;
                }
            }
    }

    //默认选中自己所在的公司
    chooseSelectedCompanyName(companyName){
        var commpanySelected = this.refs.commpanySelect;
            for (var index = 0; index < commpanySelected.length; index++) {
                var element = commpanySelected.options[index].text;
                if (element == companyName) {
                    commpanySelected[index].selected=true;
                }
            }
    }

    //选择分公司公司
    chooseCompany = (e) => {
        var {value} = e.target,
            currentCompany = value;
         //当选择公司的时候重新初始化部分变量
        this.startIndex=1;
        this.length=10;
        this.currentCompany= currentCompany;

         //获取营业部
     if (this.companyType == "Branch")
     {
          this.props.getBusiness({
                startIndex:this.startIndex,
                length:this.length,
                month:this.currentMonth,
                fgsName:this.currentCompany
            }, this, (companyAndBranchData) => {
                this.setState(
                    {
                        companyAndBranchData:companyAndBranchData}
                    );
            });
     }else //获取分公司
     {
          this.props.getCompany({
                startIndex:this.startIndex,
                length:this.length,
                month:this.currentMonth,
                // fgsName:this.currentCompany
            }, this, (companyAndBranchData) => {
                this.setState(
                    {
                        companyAndBranchData:companyAndBranchData}
                    );
            });
    }
 }
    //选择月份
    chooseMonth = (e) => {
        var {value} = e.target,
        currentMonth = value;
        //当选择月份的时候重新初始化部分变量

        this.startIndex=1;
        this.length=10;
        this.currentMonth= currentMonth;
          //获取营业部
     if (this.companyType == "Branch")
     {
          this.props.getBusiness({
                startIndex:this.startIndex,
                length:this.length,
                month:this.currentMonth,
                fgsName:this.currentCompany
            }, this, (companyAndBranchData) => {
                this.setState(
                    {
                        companyAndBranchData:companyAndBranchData}
                    );
            });
     }else //获取分公司
     {
          this.props.getCompany({
                startIndex:this.startIndex,
                length:this.length,
                month:this.currentMonth,
                // fgsName:this.currentCompany
            }, this, (companyAndBranchData) => {
                this.setState(
                    {
                        companyAndBranchData:companyAndBranchData}
                    );
            });
    }

    }


    companySelectList=()=>{
        return(
            <div className={styles.select_box}>
                                    <div className={styles.select_left_xx}>
                                        <select className={styles.select_xx} onChange={this.chooseCompany} ref="commpanySelect" >
                                            <option value="福州分公司">福州分公司</option>
                                            <option value="厦门分公司">厦门分公司</option>
                                            <option value="上海分公司">上海分公司</option>
                                            <option value="泉州分公司">泉州分公司</option>
                                            <option value="华中分公司">华中分公司</option>
                                            <option value="山东分公司">山东分公司</option>
                                            <option value="浙江分公司">浙江分公司</option>
                                            <option value="江苏分公司">江苏分公司</option>
                                            <option value="深圳分公司">深圳分公司</option>
                                            <option value="广东分公司">广东分公司</option>
                                            <option value="漳州分公司">漳州分公司</option>
                                            <option value="南平分公司">南平分公司</option>
                                            <option value="三明分公司">三明分公司</option>
                                            <option value="龙岩分公司">龙岩分公司</option>
                                            <option value="莆田分公司">莆田分公司</option>
                                            <option value="宁德分公司">宁德分公司</option>
                                            <option value="安徽分公司">安徽分公司</option>
                                            <option value="广西分公司">广西分公司</option>
                                            <option value="江西分公司">江西分公司</option>
                                            <option value="黑龙江分公司">黑龙江分公司</option>
                                            <option value="西北分公司">西北分公司</option>
                                            <option value="北京分公司">北京分公司</option>
                                            <option value="西南分公司">西南分公司</option>
                                        </select>

                                    </div>
                                    <div className={styles.select_right}></div>
                                </div>
        )
    }

//点击加载更多
    getMoreTeams = () => {

    this.startIndex = this.startIndex + this.length;//分页

    //获取营业部
     if (this.companyType == "Branch")
     {
        this.props.getBusiness({
                startIndex: this.startIndex,
                length: this.length,
                month:this.currentMonth,
                fgsName:this.currentCompany
            }, this, (data) => {
                var appendDataArray=[],{companyAndBranchData}=this.state;
                if (data.length != 0)//有数据返回
                {
                    appendDataArray=companyAndBranchData.concat(data);
                }else
                {
                    return;
                }
                this.setState({
                    companyAndBranchData:appendDataArray
                });
            });
     }else //获取分公司
     {
          this.props.getCompany({
                startIndex:this.startIndex,
                length:this.length,
                month:this.currentMonth,
                // fgsName:this.currentCompany
            }, this, (data) => {
                var appendDataArray=[],{companyAndBranchData}=this.state;
                if (data.length != 0)//有数据返回
                {
                    appendDataArray=companyAndBranchData.concat(data);
                }else
                {
                    return;
                }
                this.setState({
                    companyAndBranchData:appendDataArray
                });
            });
    }
}

    companyRenderList = () => {
        var children = [],{companyAndBranchData}=this.state,Attribute=this.companyType;
        for (let i = 0;  i < companyAndBranchData.length; i++) {
         children.push(
                    <div><BusinessItem Attribute={Attribute} data={companyAndBranchData[i]}/></div>
                )
        }
        return children;
    }


 render() {
        systemApi.log("KingGloryCompanyRankPage render");
         var {tabIndex, kingIndex,companyAndBranchData} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="英雄联盟"/>
                <Content>
                <div className={this.mergeClassName(styles.wzry_show_first)}>
                    <div className={styles.wzry_ht1}>&nbsp;</div>

                    <div className={styles.wzry_contbox}>
                        <div className={styles.wzrytop01}>
                            <div className={styles.wzrytit01}>
                                <img src="./images/work/home/wzry/wzry_tit08.png"/>
                            </div>
                        </div>
                        <div className={styles.wzrymid01}>
                            <div className={styles.wzry_select}>
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
                                {this.companyType == "Branch"?this.companySelectList():null}
                            </div>

                            <div className={this.mergeClassName(styles.target_tabs, styles.vs_detail_tab)}>
                                {/*{this.showWinAndLostBTn()}*/}
                            </div>
                            <div className={styles.team_vs}>
                               {/*{kingIndex == 0?<div className={styles.wzrytop02}></div>:<div className={this.mergeClassName(styles.wzrytop02, styles.wzrytop03)}></div>}*/}
                                {/*{this.get5VS5ListTeams()}*/}
                                {this.companyRenderList()}
                            </div>
                        </div>
                        <div className={styles.wzrybot01}>
                            <div className={styles.btn_detail02} onClick={this.getMoreTeams}>
                                <a></a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.wzry_tip}>注：五人战队和个人成绩不包含未认领挂接关系的客户创收，所有成绩按日责权提取，每月最终成绩将在次月的<span className={styles.w_yellow}>5个工作日左右确定，</span>届时本页面数据将同步更新。</div>
                </div>
                </Content>
            </FullScreenView>
        );
    }
}

function injectAction() {
    return {getBusiness, getCompany,};
}

module.exports = connect(null, injectAction())(KingGloryCompanyRankPage);
