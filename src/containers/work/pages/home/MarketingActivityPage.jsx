import AppHeader from '../../../../components/common/appheader/AppHeader';
import HeaderIcon from '../../../../components/common/appheader/HeaderIcon';
import {connect} from 'react-redux';
import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';
import RankTable from '../../components/home/marketingActivity/RankTable';
import NonAuthorizedTip from '../../components/home/marketingActivity/NonAuthorizedTip';
import AdCarousel from '../../components/home/marketingActivity/AdCarousel';
import Filter from '../../components/home/marketingActivity/Filter';
import ConfirmDialog from '../../../../components/common/popup/ConfirmDialog';
import styles from '../css/home/marketingActivityPage.css';
import {mktProdAfamList,getSheetMap,getActivityConditionMap} from '../../actions/home/marketActivity/marketActivityAction';

/** 首页-短期理财即将到期客户 **/
class MarketingActivityPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            showFilter:false,
            prodHeadMap:{},
            conditionMap:[],
            sheetMap:{},
            currActivity:0,
            currSubActivity:0,
            sheetNum:0,
            reportType:2,
            level:3,
            showConfirm:false,
            sort:null
        };
        this._length=10;
        this._moreDate=true;
    }

    //获取页面名称
    getPageName(){ return "首页_营销活动"; }

    componentDidMount(){
      this._moreDate=true;
        this.props.mktProdAfamList({startIndex:1},(data)=>{
            var {prodHeadMap,conditionMap} =data;
            var {sheetNum,currSubActivity} =this.state;
            this.setState({
              prodHeadMap,conditionMap,sheetMap:conditionMap[0].sheetMap
            });
            if(conditionMap[currSubActivity].sheetMap.MktProdRankData[sheetNum].mktReportList.total ==
            conditionMap[currSubActivity].sheetMap.MktProdRankData[sheetNum].mktReportList.list.length)
            this._moreDate=false;

        },()=>{
          this.setState({
            showConfirm:true
          });
        },this);
        super.componentDidMount();
    }

    setParams = (params)=>{
      var {reportType,subActivity,level}=params;
      var {currActivity,prodHeadMap,conditionMap}=this.state;
      this._moreDate=true;
      this.props.getSheetMap({
        hasMore:this._moreDate,
        marketNo:prodHeadMap.mktProd[currActivity].marketNo,
        marketItemNo:conditionMap[subActivity].marketItemNo,
        mktRptType1:reportType,//报表类型
        mktRptType2:level//权限类型
      },(data)=>{
        var {sheetMap} =data;
        conditionMap[subActivity].sheetMap = sheetMap;
        this.setState({sheetMap,conditionMap,level,reportType,currSubActivity:subActivity,sheetNum:0,sort:null});
        if(sheetMap.MktProdRankData.length>0){
          if(sheetMap.MktProdRankData[0].mktReportList.total == sheetMap.MktProdRankData[0].mktReportList.list.length)
            this._moreDate=false;
        }else{
          this._moreDate=false;
        }

      },this);
    }

    //过滤条件改变
    filterChange = (productCode)=>{
        this.setState({productCode});
    }

    searchClick = (search)=>{
        this.setState({search});
    }

    //点击键盘回车
    searchKeyUp = (code,value)=>{
        if(code == 13){
            this.searchClick(value);
        }
    }

    //点击过滤
    filterClick = ()=>{
      var {conditionMap} = this.state;
      if(conditionMap.length>0){
        this.setState({showFilter:true});
      }

    }

    //关闭提示
    closeFilter = ()=>{
        this.setState({showFilter:false});
    }

    renderIcon(){
        return[
            <HeaderIcon iconCls="filter" onClick={this.filterClick} />
        ]
    }

    onChange = (index)=>{
      var {prodHeadMap,conditionMap,currActivity,currSubActivity}= this.state;
      this._moreDate=true;
      this.props.getActivityConditionMap({
        marketNo:prodHeadMap.mktProd[index].marketNo,
        mktRptType1:2,//报表类型
        mktRptType2:3//权限类型
      },(data)=>{
          var {conditionMap} =data;
          if(conditionMap && conditionMap.length>0){
            var  {sheetMap} =conditionMap[0];
            if(sheetMap.MktProdRankData[0] && sheetMap.MktProdRankData[0].mktReportList.total == sheetMap.MktProdRankData[0].mktReportList.list.length)
              this._moreDate=false;
          }else{
            var sheetMap ={};
          }
          this.setState({
            sheetMap,conditionMap,level:3,reportType:2,currSubActivity:0,sheetNum:0,sort:null//切换活动的时候，
          });



      },this);
        this.setState({
          currActivity:index
        });
    }

    onChangeSheet = (index)=>{
      var {prodHeadMap,conditionMap,currActivity,currSubActivity,reportType,level}= this.state;
      this._moreDate=true;
      this.props.getSheetMap({
        hasMore:this._moreDate,
        sheetNum:conditionMap[currSubActivity].sheetMap.MktProdRankData[index].sheetNum,
        marketNo:prodHeadMap.mktProd[currActivity].marketNo,
        marketItemNo:conditionMap[currSubActivity].marketItemNo,
        mktRptType1:reportType,//报表类型
        mktRptType2:level//权限类型
      },(data)=>{
          var {sheetMap} =data;
          this.setState({
            sheetNum:index,
            sheetMap,
            sort:null
          });
          if(sheetMap.MktProdRankData[index].mktReportList.total == sheetMap.MktProdRankData[index].mktReportList.list.length)
            this._moreDate=false;

      },this);
    }

    changeCharacter = (value)=>{
      var {prodHeadMap,conditionMap,currActivity,currSubActivity,reportType,level,sheetMap}= this.state;
      var currsheet=this.state.sheetNum;
      this._moreDate=true;
      this.props.getSheetMap({
        hasMore:this._moreDate,
        sort:value,
        order:"desc",
        currsheet,
        sheetNum:conditionMap[currSubActivity].sheetMap.MktProdRankData[currsheet].sheetNum ,
        marketNo:prodHeadMap.mktProd[currActivity].marketNo,
        marketItemNo:conditionMap[currSubActivity].marketItemNo,
        mktRptType1:reportType,//报表类型
        mktRptType2:level//权限类型
      },(data)=>{
          var {sheetMap} =data;
          this.setState({
            sheetMap,
            sort:value,

          });
          if(sheetMap.MktProdRankData[currsheet].mktReportList.total == sheetMap.MktProdRankData[currsheet].mktReportList.list.length)
            this._moreDate=false;

      },this);
    }

    loadMore=()=>{
      var {prodHeadMap,conditionMap,currActivity,currSubActivity,reportType,level,sheetMap,sort}= this.state;
      var currsheet=this.state.sheetNum;

      this.props.getSheetMap({
        hasMore:this._moreDate,
        sort,
        order:"desc",
        currsheet,
        startIndex:sheetMap.MktProdRankData[currsheet].mktReportList.list.length+1,
        sheetNum:conditionMap[currSubActivity].sheetMap.MktProdRankData[currsheet].sheetNum ,
        marketNo:prodHeadMap.mktProd[currActivity].marketNo,
        marketItemNo:conditionMap[currSubActivity].marketItemNo,
        mktRptType1:reportType,//报表类型
        mktRptType2:level//权限类型
      },(data)=>{
          var {sheetMap} =data;
          var newdata = this.state.sheetMap.MktProdRankData[currsheet].mktReportList.list.concat(sheetMap.MktProdRankData[currsheet].mktReportList.list);
          sheetMap.MktProdRankData[currsheet].mktReportList.list = newdata;
          this.setState({
            sheetMap:sheetMap
          });
          if(sheetMap.MktProdRankData[currsheet].mktReportList.total == sheetMap.MktProdRankData[currsheet].mktReportList.list.length)
            this._moreDate=false;

      },this);
    };

    outSubmit =()=>{
      hashHistory.goBack();
    }

    render(){
        systemApi.log("ProductDeadlinePage render");

        var {showFilter,prodHeadMap,currActivity,currSubActivity,showConfirm,
          sheetMap,conditionMap,sheetNum,reportType,level,sort} = this.state;
        var recommend = "";
        if(prodHeadMap.mktProd){
          if(prodHeadMap.mktProd.length>currActivity){
            recommend = prodHeadMap.mktProd[currActivity].recommend;
          }
        }
        return (
            <FullScreenView>
                <AppHeader  headerName="营销活动排名一览" iconRight={this.renderIcon()} />

                 {showConfirm?
                   <NonAuthorizedTip title="无查看营销活动排名权限" /> :
                 <Content iscroll={false}>
                 <div className={styles.greyBackground}>

                   <AdCarousel data={prodHeadMap} onChange={this.onChange}/>

                   <div className={styles.floor}>
                     <div className={styles.yxhdpm_sm}>
                       <div className={styles.yxhdpm_title}>活动说明：</div>
                         <div className={styles.yxhdpm_sm_main}>{recommend}</div>
                     </div>
                   </div>


                     <div className={styles.floor}>

                         <RankTable loadMoreFn={this.loadMore}
                         currActivity={currActivity}
                         currSubActivity={currSubActivity}
                         sort={sort}
                         sheetsInfo={conditionMap[currSubActivity]} sheetMap={sheetMap} currsheet={sheetNum}
                         onChangeSheet={this.onChangeSheet}
                         changeCharacter={this.changeCharacter}/>

                     </div>
                 </div>
                 </Content>
               }
               {showFilter?<Filter data={conditionMap} close={this.closeFilter} setParams={this.setParams}
                currSubActivity={currSubActivity}   reportType={reportType}   level={level}/>:null}
            </FullScreenView>
        );
    }

}
function injectAction(){
    return {mktProdAfamList,getSheetMap,getActivityConditionMap};
}

module.exports = connect(null, injectAction())(MarketingActivityPage);
