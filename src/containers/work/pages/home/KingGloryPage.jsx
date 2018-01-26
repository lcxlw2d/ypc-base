import {connect} from 'react-redux';
import {showMessage, WARNING} from '../../../../store/actions';
import {
    getMyFile,
    getSingleMax,
    getBusiness,
    getFiveVFive,
    getCompany,
    getKingofTheroad,
    isAugustTip,
    getTargetValue
} from '../../actions/home/KingGlory/KingGloryPageAction';
import AppHeader from '../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import DivScroll from '../../../../components/common/iscroll/DivScroll';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import BattlePower from './../../components/home/kingGliry/BattlePower';
import CorpDetail from './../../components/home/kingGliry/CorpDetail';
import TabChange from './../../components/home/kingGliry/TabChange';
import ImgTab from './../../components/home/kingGliry/ImgTab';
import FiveVFive from './../../components/home/kingGliry/FiveVFive';
import ImgPreload from './../../components/home/kingGliry/ImgPreload';
import Business from '../../components/home/kingGliry/Business';
import KingList from '../../components/home/kingGliry/KingList';
import KingTopList from '../../components/home/kingGliry/KingTopList';
import KingTopOne from '../../components/home/kingGliry/KingTopOne';
import styles from '../css/home/KingGloryPage.css';
import {chooseHeadPhoto, submitHeadImage} from '../../actions/home/attend/edit/editAction';
import {getHeadImageData} from '../../actions/me/meAction';
import AlbumSelect from './../../components/home/attend/edit/AlbumSelect.jsx';

class KingGloryPage extends PageComponent {

    //构造函数
    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 0,
            tabIndex: 0,
            kingIndex: 0,
            topIndex: 0,
            fiveVFiveIndex: 0,
            businessIndex: 0,
            companyIndex: 0,
            myfileData: {},
            singleMax: {},
            businessData: [],
            fiveData: [],
            companyData: [],
            successList: [],
            topList: [],
            showSelect: false,
            headImageURL: "",
            isNoAugust: true,
            targetValue:'',
        }

    }

    //获取页面名称
    getPageName() {
        return "首页_王者荣耀首页";
    }

    componentDidMount() {
        super.componentDidMount()
        //获取我的档案
        this
            .props
            .getMyFile(this, myfileData => {
                this.setState({
                    myfileData
                }, () => {
                    this.isKingSucc()
                })
            });

        //获取5v5
        this
            .props
            .getFiveVFive({
                isRandom: 1,
                startIndex: 1,
                length: 5
            }, this, fiveData => {
                this.setState({fiveData})

            });

        //获取营业部
        this
            .props
            .getBusiness({
                isRandom: 1,
                startIndex: 1,
                length: 10
            }, this, businessData => {
                this.setState({businessData})

            });

        //获取分公司
        this
            .props
            .getCompany({
                isRandom: 1,
                startIndex: 1,
                length: 10
            }, this, companyData => {
                this.setState({companyData})

            });

        //获取擂主top10
        this
            .props
            .getKingofTheroad({
                type: 'top',
                length: 10
            }, this, topList => {
                this.setState({topList})

            })

        //获取攻擂成功列表
        this
            .props
            .getKingofTheroad({
                type: 'success',
                length: 5
            }, this, successList => {
                this.setState({successList})

            })

        //获取单项top1
        this
            .props
            .getSingleMax(this, singleMax => {
                this.setState({singleMax})

            })

         //获取攻擂目标值
         this.props.getTargetValue(this, targetValue => { this.setState({targetValue}) })
    }

    // 跳转活动规则页面
    goToRule = () => {
        hashHistory.push("/work/home/kingGlory/KingIntroduction")
    }

    //跳转详情页
    goToDetil = () => {
        let {
                myfileData: {
                    fgsName = "0",
                    month
                },
                index
            } = this.state,
            companyType = '';
        fgsName = encodeURI(fgsName);
        switch (index) {
            case 1:
                companyType = 'Branch';
                break;
            case 2:
                companyType = 'Fgs';
                break;

            default:
                break;
        }
        if (index === 0) {
            hashHistory.push("/work/home/kingGlory/KingGloryRank/" + fgsName + "/" + month)
        } else {
            hashHistory.push("/work/home/kingGlory/KingGloryCompanyRank/" + fgsName + "/" + month + "/" + companyType)
        }
    }

    //如果是8月，就不显示攻擂成功王者
    isKingSucc = () => {
        let {month} = this.state.myfileData;
        if (month == "08") {
            this.setState({kingIndex: 1, isNoAugust: false})
        }
    }

    //切换是否显示所有攻擂成功王者
    onAllShow = () => {
        let {month} = this.state.myfileData;
        hashHistory.push("/work/home/kingGlory/top/" + month);
    }

    //切换tab
    tabChange = index => {
        var {tabIndex, fiveVFiveIndex, businessIndex, companyIndex} = this.state;
        switch (index) {
            case 0:
                tabIndex = fiveVFiveIndex;
                break;
            case 1:
                tabIndex = businessIndex;
                break;
            case 2:
                tabIndex = companyIndex;
                break;
            default:
                tabIndex = 0;
                break;
        }
        this.setState({index, tabIndex});
    }

    //王者之路切换tab
    kingChange = kingIndex => {
        let {isNoAugust} = this.state;
        if (isNoAugust) {
            this.setState({kingIndex});
        }
    }

    //王者top10切换显示
    kingTopChange = topIndex => {
        this.setState({topIndex})
    }

    //5v5轮播图切换
    onTabFiveChange = tabIndex => {
        this.setState({tabIndex, fiveVFiveIndex: tabIndex})
    }

    //营业部轮播图切换
    onTabBusinessChange = tabIndex => {
        this.setState({tabIndex, businessIndex: tabIndex})
    }

    //公司轮播图切换
    onTabCompanyChange = tabIndex => {
        this.setState({tabIndex, companyIndex: tabIndex})
    }

    //头像点击
    headImageClick = () => {
        this.setState({showSelect: true});
    }
    //关闭图片选择
    closeSelect = () => {
        this.setState({showSelect: false});
    }

    //点击拍照
    cameraClick = () => {
        this
            .props
            .chooseHeadPhoto({
                type: 1
            }, this.headImageUpdate);
        this.closeSelect();
    }

    //点击相册
    albumClick = () => {
        var {imgs} = this.props;
        this
            .props
            .chooseHeadPhoto({
                type: 0
            }, this.headImageUpdate);
        this.closeSelect();
    }

    //选择照片后回调
    headImageUpdate = urls => {

        var params = {};
        this
            .props
            .submitHeadImage(params, urls, "uploadfileName", this, data => {
                var {url} = data;

                this.setState({
                    headImageURL: url //更新图片的URL
                });
            })
    }

    //更新头像的URL
    updataHeadImage = url => {
        this.setState({
            headImageURL: url //更新图片的URL
        });
    }

    //渲染svg
    renderSVG = (str, endingDays) => {
        return {__html:`<svg viewBox="0 0 140 30">
        <path d="M 0,13 a 75,8 0 1,1 0,1 z" id="circle"></path>
            <text>
                <textPath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#circle">
                    <tspan>离第</tspan><tspan>${str}</tspan><tspan>期竞赛结束还有</tspan><tspan class=${styles.t_red} style="fill:#cb1300">${endingDays}</tspan><tspan>天</tspan>
                </textPath>
            </text>
    </svg>`}

    }

    render() {
        systemApi.log("KingGloryPage render");
        var {
                index,
                tabIndex,
                kingIndex,
                topIndex,
                myfileData,
                businessData,
                fiveData,
                companyData,
                singleMax,
                successList,
                topList,
                showSelect,
                headImageURL,
                isNoAugust,
                targetValue,
            } = this.state, {
                loginId,
                userName,
                sex,
                pictureUrl,
                score,
                rank,
                mvp,
                kingValue,
                maxKingValue,
                shooterValue,
                maxShooterValue,
                tankValue,
                maxTankValue,
                killerValue,
                maxKillerValue,
                masterValue,
                maxMasterValue,
                kingValueLevel,
                kingValueLevelName,
                isTarget,
                myTeam = [],
                rivalTeam = [],
                endingDays='0',
                netCommissionDay='0',
                netCommissionPeriod='0',
                netCommissionSum='0',
                month,
                stage:str='--'
            } = myfileData,
            bar = Math.round(score / targetValue * 100);
       // endingDays = `离第${str}期竞赛结束还有${endingDays}天`;
        netCommissionDay = `当日总创佣${netCommissionDay}万元`;
        netCommissionPeriod = `当期总创佣${netCommissionPeriod}万元`;
        netCommissionSum = `累计总创佣${netCommissionSum}万元`;
        kingValueLevel = `user_grade0${kingValueLevel}`;

        return (
            <FullScreenView>
                <AppHeader headerName="英雄联盟"/>
                <DivScroll className={styles.frame}>
                    <div className={this.mergeClassName(styles.wzry_show_first)}>
                        <div className={styles.wzry_ht1}>
                            <div className={styles.circular} dangerouslySetInnerHTML={this.renderSVG(str, endingDays)} />
                        </div>
                        <div className={styles.chuangYongCase}>
                            <p className={styles.chuangYongDay}>{netCommissionDay}</p>
                            <div className={styles.btn_rules}>
                                <span onClick={this.goToRule}></span>
                            </div>
                            <div className={styles.chuangYongZong}>
                                <p>{netCommissionPeriod}</p>
                                <p>{netCommissionSum}</p>
                            </div>
                        </div>
                        <div className={styles.wzry_contbox}>
                            {myTeam.length
                                ? <div>
                                        <div className={styles.wzrytop01}>
                                            <div className={styles.wzrytit01}>
                                                <img src="./images/work/home/wzry/wzry_tit01.png"/>
                                            </div>
                                        </div>
                                        <div className={styles.wzrymid01}>
                                            {/*我的档案*/}
                                            <div className={styles.my_archives}>
                                                <div className={styles.my_pic}>
                                                    {/*<img src={pictureUrl}/>headImageURL*/}
                                                    <img
                                                        src={headImageURL
                                                        ? headImageURL
                                                        : pictureUrl}
                                                        onClick={this.headImageClick}/>
                                                    <i></i>
                                                </div>
                                                <div className={styles.my_int}>
                                                    <p>
                                                        <i
                                                            className={sex === '女'
                                                            ? styles.icon_woman
                                                            : styles.icon_man}></i>
                                                        <span className={styles.w_font24}>{userName}</span>
                                                        <i className={styles[kingValueLevel]}></i>
                                                        <span className={styles.w_yellow3}>{kingValueLevelName}</span>
                                                    </p>
                                                    <p className={styles.w_font16}>
                                                        <span>累计获</span>
                                                        <span className={this.mergeClassName(styles.w_yellow, styles.w_font20)}>{mvp}</span>
                                                        <span>次MVP</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={styles.my_achievement}>
                                                <div>
                                                    <span className={styles.yahei_bold}>本月成绩</span>
                                                    <span className={styles.w_white}>{score}</span>
                                                    <span className={styles.w_white}>(第<span className={styles.w_yellow}>{rank}</span>名)</span>
                                                </div>
                                                <div className={styles.my_gonglei}>
                                                    <span className={styles.yahei_bold}>攻擂目标</span>
                                                    <span className={this.mergeClassName(styles.w_yellow, styles.w_bold)}>{targetValue}</span>
                                                    {isTarget
                                                        ? <p className={styles.dacheng}><img src="./images/work/home/wzry/dc.png" alt=""/></p>
                                                        : null}
                                                </div>
                                            </div>
                                            <div className={styles.clearboth}></div>
                                            <div className={styles.my_process}>
                                                <div
                                                    className={this.mergeClassName(styles.process_icon, styles[kingValueLevel])}
                                                    style={{
                                                    marginLeft: `${bar > 95
                                                        ? 95
                                                        : bar}%`
                                                }}></div>
                                                <div className={styles.processbg}>
                                                    <div
                                                        className={styles.process_bar}
                                                        style={{
                                                        width: `${bar > 100
                                                            ? 100
                                                            : bar != 0
                                                                ? bar + 4
                                                                : bar}%`
                                                    }}></div>
                                                </div>
                                                <div
                                                    className={styles.process_num}
                                                    style={{
                                                    marginLeft: `${bar > 90
                                                        ? 90
                                                        : bar}%`
                                                }}>
                                                    {score}
                                                </div>
                                            </div>
                                            {/*我的战力*/}
                                            <BattlePower
                                                kingValue={kingValue}
                                                maxKingValue={maxKingValue}
                                                shooterValue={shooterValue}
                                                maxShooterValue={maxShooterValue}
                                                tankValue={tankValue}
                                                maxTankValue={maxTankValue}
                                                killerValue={killerValue}
                                                maxKillerValue={maxKillerValue}
                                                masterValue={masterValue}
                                                maxMasterValue={maxMasterValue}/> {/*战队实况*/}
                                            <CorpDetail myTeam={myTeam} rivalTeam={rivalTeam}/>
                                            <div className={styles.wzrybot01}></div>
                                        </div>
                                    </div>
                                : null}
                            {/*团队PK赛*/}
                            <div className={styles.wzry_contbox}>
                                <div className={styles.wzrytop01}>
                                    <div className={styles.wzrytit01}><img src="./images/work/home/wzry/wzry_tit04.png"/></div>
                                </div>
                                <div className={styles.wzrymid01}>
                                    <div className={styles.team_tabs}>
                                        <TabChange index={index} onTabChange={this.tabChange}>
                                            <ImgTab/>
                                            <ImgTab/>
                                            <ImgTab/>
                                        </TabChange>
                                    </div>
                                    <LazyLoad index={index}>
                                        {/*5v5*/}
                                        <FiveVFive data={fiveData} onTabChange={this.onTabFiveChange}/> {/*营业部*/}
                                        <Business
                                            Attribute={'Branch'}
                                            data={businessData}
                                            onTabChange={this.onTabBusinessChange}/> {/*分公司*/}
                                        <Business
                                            Attribute={'Fgs'}
                                            data={companyData}
                                            onTabChange={this.onTabCompanyChange}/>
                                    </LazyLoad>
                                    <div className={styles.vs_nav}>
                                        <li
                                            className={tabIndex == 0
                                            ? styles.on
                                            : ""}>
                                            <a></a>
                                        </li>
                                        <li
                                            className={tabIndex == 1
                                            ? styles.on
                                            : ""}>
                                            <a></a>
                                        </li>
                                        <li
                                            className={tabIndex == 2
                                            ? styles.on
                                            : ""}>
                                            <a></a>
                                        </li>
                                        <li
                                            className={tabIndex == 3
                                            ? styles.on
                                            : ""}>
                                            <a></a>
                                        </li>
                                        <li
                                            className={tabIndex == 4
                                            ? styles.on
                                            : ""}>
                                            <a></a>
                                        </li>
                                    </div>
                                    {/*跳转详情页*/}
                                    <div className={styles.btn_detail01} onClick={this.goToDetil}>
                                        <a></a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.wzrybot01}></div>
                            <div className={styles.wzry_contbox}>
                                <div className={styles.wzrytop01}>
                                    <div className={styles.wzrytit01}>
                                        <img src="./images/work/home/wzry/wzry_tit05.png"/>
                                    </div>
                                </div>
                                <div className={styles.wzrymid01}>
                                    <div className={styles.challege_target}>
                                        <h1>
                                            <span className={styles.yahei_bold}>当前攻擂目标:</span>
                                            <span className={styles.w_yellow}>{targetValue}</span>
                                            <span className={styles.w_white}>（实时统计自TOP10擂主平均值）</span>
                                        </h1>
                                        <div className={styles.target_tabs}>
                                            <TabChange index={kingIndex} onTabChange={this.kingChange}>
                                                <ImgTab
                                                    text="攻擂成功王者"
                                                    isOnClick={isNoAugust}
                                                    onTipClick={this.props.isAugustTip}
                                                    yesStyle={false}/>
                                                <ImgTab text="擂主王者TOP10" yesStyle={false}/>
                                            </TabChange>
                                        </div>
                                        <LazyLoad index={kingIndex}>
                                            <KingList data={successList}/>
                                            <KingTopList data={topList} onTabChange={this.kingTopChange}/>
                                        </LazyLoad>
                                        {kingIndex == 0
                                            ? <div className={styles.btn_all01} onClick={this.onAllShow}>
                                                    <a></a>
                                                </div>
                                            : <div className={styles.vs_nav}>
                                                <li
                                                    className={topIndex == 0
                                                    ? styles.on
                                                    : ""}>
                                                    <a></a>
                                                </li>
                                                <li
                                                    className={topIndex == 1
                                                    ? styles.on
                                                    : ""}>
                                                    <a></a>
                                                </li>
                                            </div>}
                                        <KingTopOne data={singleMax}/>
                                    </div>
                                    <div className={styles.wzrybot01}></div>
                                </div>
                                <div className={styles.wzry_tip}>注：五人战队和个人成绩不包含未认领挂接关系的客户创收，所有成绩按日责权提取，每月最终成绩将在次月的<span className={styles.w_yellow}>5个工作日左右确定，</span>届时本页面数据将同步更新。</div>
                            </div>
                        </div>
                    </div>
                    {showSelect
                        ? (<AlbumSelect
                            onClose={this.closeSelect}
                            onCamera={this.cameraClick}
                            onAlbum={this.albumClick}/>)
                        : null}
                    {/*图片预加载  */}
                    <ImgPreload/> {this.props.children}
                </DivScroll>
            </FullScreenView>
        )
    }
}

function injectAction() {
    return {
        getMyFile,
        getSingleMax,
        getBusiness,
        getFiveVFive,
        getCompany,
        getKingofTheroad,
        chooseHeadPhoto,
        submitHeadImage,
        getHeadImageData,
        isAugustTip,
        getTargetValue
    };
}

// function injectProps(state){     var {investadvice} = state.base || {},
// {from,params} = investadvice;     return {from,params}; }

module.exports = connect(null, injectAction())(KingGloryPage);
