import {connect} from 'react-redux';
import {getTeamTop10, getFiveVFive} from '../../actions/home/KingGlory/KingGloryRankPageAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import KingRankItem from './../../components/home/kingGliry/KingRankItem';
import KingTop10Pan from './../../components/home/kingGliry/KingTop10Pan';
import KingTeamPan from './../../components/home/kingGliry/KingTeamPan';
import TabChange from './../../components/home/kingGliry/TabChange';
import ImgTab from './../../components/home/kingGliry/ImgTab';
import KingTeamItem from './../../components/home/kingGliry/KingTeamItem';
import styles from '../css/home/KingGloryPage.css';
import {showLoading, hideLoading, showMessage, WARNING, ERROR, SUCCESS} from '../../../../store/actions';

class KingGloryRankPage extends PageComponent {
    constructor(props, content) {
        super(props, content);
        this.state = {
            tabIndex: 0,//top10 tab
            kingIndex: 0,//实时战况优胜场tab

            teamTop10Data: {},//top10返回的数组
            teamRealTimeData:[]//实时战况返回的数组
        };


        this.startIndex=1;//请求实时战况起始位置
        this.length=10;//请求实时战况起始长度
        this.currentMonth= 8;//请求实时战况当前月份
        this.currentCompany= "福州分公司";//请求实时战当前公司
        this.isWinningGames=1;//请求实时战况是否优胜场
    }

    componentDidMount() {
        super.componentDidMount()
        //获取teamTop10团队
        this.props.getTeamTop10(this, (teamTop10Data) => {
                this.setState({teamTop10Data});
            });

        //获取路由传过来的参数
         var{fgsName,month}=this.props.params;
            month=parseInt(month, 10);

        //设置默契的月和公司
        this.chooseSelectedCompanyName(fgsName);
        this.chooseSelectedMonth(month);

        fgsName!="0" ?this.currentCompany = fgsName:null;
        month!="undefined"?this.currentMonth = month:null;

        //获取实时战况
         if (this.currentMonth!=8) // 9月、10月
        {
            this.props.getFiveVFive({
                    startIndex: this.startIndex,
                    length: this.length,
                    fgsName:this.currentCompany,
                    month:this.currentMonth,
                    isWinningGames:this.isWinningGames //9月、10月需要传入这个参数
                }, this, (fiveData) => {
                    this.setState({
                        teamRealTimeData:fiveData
                    })

                });
        }
        else//8月
        {
            this.props.getFiveVFive({
                    startIndex: this.startIndex,
                    length: this.length,
                    fgsName:this.currentCompany,
                    month:this.currentMonth //8月无需传入isWinningGames这个参数
                }, this, (fiveData) => {
                    this.setState({
                        teamRealTimeData:fiveData
                    })

                });
        }
    }

    //获取页面名称
    getPageName() {
        return "首页_王者荣耀_公司团队排名";
    }

    //切换轮播图index
    onTabChange = (tabIndex) => {
        this.setState({tabIndex})
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


    //选择分公司公司
    chooseCompany = (e) => {
        var {value} = e.target,
            currentCompany = value;
         //当选择公司的时候重新初始化部分变量
        this.startIndex=1;
        this.length=10;
        this.currentCompany= currentCompany;

        if (this.currentMonth!=8) // 9月、10月
        {
            this.props.getFiveVFive({
                    startIndex: this.startIndex,
                    length: this.length,
                    fgsName:this.currentCompany,
                    month:this.currentMonth,
                    isWinningGames:this.isWinningGames //9月、10月需要传入这个参数
                }, this, (fiveData) => {
                    this.setState({
                        teamRealTimeData:fiveData
                    })

                });
        }
        else//8月
        {
            this.props.getFiveVFive({
                    startIndex: this.startIndex,
                    length: this.length,
                    fgsName:this.currentCompany,
                    month:this.currentMonth //8月无需传入isWinningGames这个参数
                }, this, (fiveData) => {
                    this.setState({
                        teamRealTimeData:fiveData
                    })

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

        // alert("startIndex="+this.startIndex+"length="+this.length+"currentMonth="+this.currentMonth+"currentCompany="+this.currentCompany+"isWiningGames="+this.isWiningGames);
        if (this.currentMonth!=8) // 9月、10月
        {
                this.props.getFiveVFive({
                        startIndex: this.startIndex,
                        length: this.length,
                        month:this.currentMonth,
                        fgsName:this.currentCompany,
                        isWinningGames:this.isWinningGames //9月、10月需要传入这个参数
                    }, this, (fiveData) => {
                        this.setState({
                            teamRealTimeData:fiveData
                        })
                    });
        }else//8月
        {
                this.props.getFiveVFive({
                        startIndex: this.startIndex,
                        length: this.length,
                        month:this.currentMonth,
                        fgsName:this.currentCompany//8月无需传入isWinningGames这个参数
                    }, this, (fiveData) => {
                        this.setState({
                            teamRealTimeData:fiveData,
                            kingIndex:0
                        })
                    });
        }

    }
    //优胜场PK次胜场
    winAndLosePK = (kingIndex) => {
        //当选择优胜场PK次胜场时候重新初始化部分变量
        this.setState({
                    kingIndex:kingIndex
                });

        this.startIndex=1;
        this.length=10;
        kingIndex==0?this.isWinningGames=1:this.isWinningGames=0;

         if (this.currentMonth!=8) // 9月、10月
        {
                this.props.getFiveVFive({
                        startIndex: this.startIndex,
                        length: this.length,
                        month:this.currentMonth,
                        fgsName:this.currentCompany,
                        isWinningGames:this.isWinningGames //9月、10月需要传入这个参数
                    }, this, (fiveData) => {
                        this.setState({
                            teamRealTimeData:fiveData
                        })
                    });
        }else//8月
        {
                this.props.getFiveVFive({
                        startIndex: this.startIndex,
                        length: this.length,
                        month:this.currentMonth,
                        fgsName:this.currentCompany//8月无需传入isWinningGames这个参数
                    }, this, (fiveData) => {
                        this.setState({
                            teamRealTimeData:fiveData
                        })
                    });
        }

    }
    //点击加载更多
    getMoreTeams = () => {
        let {kingIndex} = this.state, params={};
        this.startIndex = this.startIndex + this.length;//分页
        kingIndex==0?this.isWinningGames=1:this.isWinningGames=0;
        params = {
            startIndex: this.startIndex,
            length: this.length,
            month:this.currentMonth,
            fgsName:this.currentCompany,
        }
        this.currentMonth != "8"?params["isWinningGames"] = this.isWinningGames:null;
         this.props.getFiveVFive(params, this, (fiveData) => {
                var appendDataArray=[],{teamRealTimeData}=this.state;
                if (fiveData.length != 0)//有数据返回
                {
                    appendDataArray=teamRealTimeData.concat(fiveData);
                }else
                {
                    return;
                }
                this.setState({
                    teamRealTimeData:appendDataArray
                })
            });
    }
    //优胜场PK次胜场按钮是否出现
    showWinAndLostBTn =()=> {
        var {kingIndex} = this.state;
        return (
             <div>
                 {this.currentMonth != 8?
                 <TabChange index={kingIndex} onTabChange={this.winAndLosePK}>
                            <ImgTab text="优胜PK场" yesStyle={false}/>
                            <ImgTab text="次优PK场" yesStyle={false}/>
                     </TabChange>:null
                     }
            </div>
         )

    }

    //获取5v5列表
    get5VS5ListTeams = () => {
        var {teamRealTimeData,kingIndex} = this.state;
        return (teamRealTimeData.map((item, index) => {
            var {myTeam, rivalTeam} = item;
            return (
                kingIndex == 0 ?<div><div className={styles.wzrytop02}></div><div className={styles.wzrybot02}>
                    <KingTeamPan myTeam={myTeam} rivalTeam={rivalTeam}/>
                </div></div>:<div className={this.mergeClassName(styles.wzrybot02,styles.wzrybot03)}>
                    <KingTeamPan myTeam={myTeam} rivalTeam={rivalTeam}/>
                </div>

            )
        }));
    }

    render() {
        systemApi.log("KingGloryRankPage render");
        var {tabIndex, kingIndex, teamTop10Data,currentCompany} = this.state,
            {rows,pagesize,total} = teamTop10Data;

        return (
            <FullScreenView>
                <AppHeader headerName="英雄联盟"/>
                <Content>
                <div className={this.mergeClassName(styles.wzry_show_first)}>
                    <div className={styles.wzry_ht1}>&nbsp;</div>
                    <div className={styles.wzry_contbox}>
                        <div className={styles.wzrytop01}>
                            <div className={styles.wzrytit01}>
                                <img src="./images/work/home/wzry/wzry_tit07.png"/>
                            </div>
                        </div>
                        <div className={styles.wzrymid01}>
                            <KingTop10Pan onTabChange={this.onTabChange} rowsData={rows}></KingTop10Pan>
                            <div className={styles.vs_nav}>
                                <li
                                    className={tabIndex == 0
                                    ? styles.on
                                    : " "}>
                                    <a href="#"></a>
                                </li>
                                <li
                                    className={tabIndex == 1
                                    ? styles.on
                                    : " "}>
                                    <a href=" "></a>
                                </li>
                            </div>
                        </div>
                        <div className={styles.wzrybot00}></div>
                    </div>

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
                            </div>

                            <div className={this.mergeClassName(styles.target_tabs, styles.vs_detail_tab)}>
                                {this.showWinAndLostBTn()}
                            </div>
                            <div className={styles.team_vs}>
                                {/*{kingIndex == 0?<div className={styles.wzrytop02}></div>:<div className={this.mergeClassName(styles.wzrytop02, styles.wzrytop03)}></div>}*/}
                                {this.get5VS5ListTeams()}
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
    return {getTeamTop10, getFiveVFive};
}

module.exports = connect(null, injectAction())(KingGloryRankPage);
