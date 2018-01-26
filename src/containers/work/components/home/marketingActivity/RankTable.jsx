import {connect} from 'react-redux';
import ImageLoad from '../../../../../components/common/carousel/ImageLoad';
import ScrollTabs from '../../../../../components/common/subtabs/ScrollTabs';
import fakedata from '../../../../../../json/fake.json';
import FixedTable from '../../../../..／../../../components/common/fixedTable/FixedTable';
import styles from '../../css/home/marketingActivity/RankTable.css';

class RankTable extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this._clickAbleArr=[];
        this._tableHeadKey=[];
        this.state={
          currCharacter:-1
        }
    }

    changeSheet = (index)=>{
      var {onChangeSheet} = this.props;
      onChangeSheet && onChangeSheet(index);
    }

    componentWillReceiveProps(nextProps){
      var {sort} =nextProps;
        if(sort==null){
          this.setState({
            currCharacter:-1
          });
        }

    }

    loadMore = ()=>{
      var {loadMoreFn}=this.props;
      loadMoreFn && loadMoreFn();
    }

    headClick = (index)=>{
      if(this._clickAbleArr[index]){
        var {changeCharacter}=this.props,clickAble;
        changeCharacter && changeCharacter(this._tableHeadKey[index]);
        this.setState({currCharacter:index});
      }
    }


    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("RankTable render");
        var {sheetMap,sheetsInfo,currsheet,currActivity,currSubActivity} =this.props;
        var {currCharacter}=this.state;
        var sheetNames=[],
            tableHead=[],
            tableBody=[];
        this._tableHeadKey=[];
        if(sheetsInfo){
          var {MktProdRankData} = sheetsInfo.sheetMap;
          if(!(typeof MktProdRankData=='string') && MktProdRankData && MktProdRankData.length>0){
            sheetNames=[];
            for(var i=0;i<MktProdRankData.length;i++){
              var tmp={};
              tmp.text = MktProdRankData[i].sheetName;
              sheetNames.push(tmp) ;
            }
            if(sheetMap.MktProdRankData && sheetMap.MktProdRankData.length>0){
              var {mktRptModelColumn=[],mktReportList={}} = sheetMap.MktProdRankData[currsheet];
              tableHead=["名次"];
              this._tableHeadKey=["ROW_NUM"];
              this._clickAbleArr=[];
              this._clickAbleArr[0]=false;
              var tmpFlag=false;
              for(var i = 0;i < mktRptModelColumn.length;i++){
                if(mktRptModelColumn[i].columnVal=="MKT_RPT_ID" ||
                  mktRptModelColumn[i].columnName=="员工编号" ||
                  mktRptModelColumn[i].columnName=="营业部代码" ||
                  mktRptModelColumn[i].columnName=="分公司代码") continue;
                tableHead.push(mktRptModelColumn[i].columnName);
                this._tableHeadKey.push(mktRptModelColumn[i].columnVal);
                if(tmpFlag)
                    this._clickAbleArr.push(true);
                else
                    this._clickAbleArr.push(false);
                if(mktRptModelColumn[i].columnName=="分公司名称"){
                  tmpFlag=true;
                  if(currCharacter==-1){
                    currCharacter=this._clickAbleArr.length;
                  }
                }
              }

              var {list=[]}=mktReportList;
              for(var i = 0;i < list.length;i++){
                var column=[];
                for(var j=0;j<this._tableHeadKey.length;j++){
                  column[j]=list[i][this._tableHeadKey[j]];
                }
                var columnObj={value:column,color:list[i].color}
                tableBody.push(columnObj);
              }
            }
          }
        }
       return (

              <div className={styles.yxhdpm_table_box}>
                <div className={styles.yxhdpm_cutover}>
                    {sheetNames.length>0?<ScrollTabs data={sheetNames} onChange={this.changeSheet} selectItem={currsheet}/>:null}
                  </div>
                  <div className={styles.yxhdpm_table_main} >
                    <FixedTable loadMoreFn={this.loadMore} focusHead={currCharacter} header={tableHead} data={tableBody}  fixNum={1}
                    key={""+currsheet+currActivity+currSubActivity+currCharacter} headClick={this.headClick}/>
                  </div>
              </div>

        );
    }
}
function injectAction(){
    return {};
}


module.exports = connect(null,injectAction())(RankTable);
