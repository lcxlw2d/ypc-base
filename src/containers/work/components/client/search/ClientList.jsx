import {connect} from 'react-redux';
import {getClientSearchList,getIsClientOwner} from '../../../actions/client/search/searchAction';
import {gotoDetail, FROM_CLIENT_SEARCH_PAGE} from '../../../../../store/actions';

import EmphaseText from '../../../../../components/common/text/EmphaseText';
import styles from '../../css/client/search/clientList.css';

class ClientList extends CursorList{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    updateList = (isAppend,data)=>{
        var list = data;
        if(isAppend){
            list = this.state.data.concat(data);
        }
        this.nextIndex = list.length + 1;
        this.setState({
            data:list
        });

    }

    getData(index,isAppend,cb,props){
        var keyWord = props?props.keyWord:"",
            type = props.type;

        this.props.getClientSearchList(index,isAppend,cb,this,this.updateList,keyWord, type);
    }

    getScrollStyle(){
        return styles.frame;
    }

    itemClick = (index,clientID,clientName,clientStar,validClient,fundAccount)=>()=>{

        var list = this.state.data;

        if(list[index].clientDetail){
            list[index].isShowDetail = !list[index].isShowDetail ;
            this.setState({
                data:list.slice(0)
            });
        }else{

          this.props.getIsClientOwner((isOwner,clientDetail)=>{

              if(isOwner){
                  var {keyWord, type} = this.props;
                  this.props.gotoDetail(clientID, FROM_CLIENT_SEARCH_PAGE, {
                      clientSearch:keyWord,
                      searchType:type
                  });
              }else{
                  list[index] = Object.assign({},list[index],{
                    clientDetail:clientDetail,
                    isShowDetail:true
                  });
                  this.setState({
                      data:list.slice(0)
                  });
              }
            },this,clientID);
        }
    }

    //点击客户摘要，不收起
    summaryClick = (e)=>{
        e.stopPropagation();
    }

    renderStar(num){
        var list = [];
        for(var i=0;i<num;i++){
            list.push("*");
        }
        return list.join("");
    }

    hiddenFundAcct(fundAccount){
        var length = fundAccount.length,
            start = length - 5,
            end = length - 2;
        end = end>=length-1?length-1:end;

        if(length<5) return fundAccount;

        return fundAccount.slice(0,start)+this.renderStar(end-start)+fundAccount.slice(end);
    }

    renderList(){
        var list = [],
            {keyWord} = this.props,
            {data} = this.state;
        return data.map((item,index)=>{
            var {clientId,clientName,clientStar,validClient,fundAccount,idNo,isShowDetail,organizationName,isBelong} = item,
                {clientSexName,age,phoneCode,mainServuser} = item.clientDetail || {};

            age = (clientSexName=="机构"||!age)?"":(age+"岁");
            return (
                <li className={styles.single_cs} key={index} onClick={this.itemClick(index,clientId,clientName,clientStar,validClient,fundAccount)}>
                    <div className={styles.sg_top}>
                        <div className={styles.cus_name}>
                            <p><EmphaseText text={clientName} emphase={keyWord} /></p>
                            <p className={Color.c6}><EmphaseText text={fundAccount} emphase={keyWord} /></p>
                        </div>
                        <div className={styles.cus_sale}>
                            <span>{organizationName}</span>
                        </div>
                        <div className={styles.cus_belong}>
                        {isBelong=="1"?(
                            <span className={styles.red}>名下</span>
                        ):(
                            <span className={styles.gray}>非名下</span>
                        )
                        }
                        </div>
                    </div>
                    {isShowDetail?(
                        <div className={styles.sg100} onClick={this.summaryClick}>
                            <div className={styles.sg_cont} >
                                <div className={styles.sg_inner}>
                                    <p>
                                        <span className={Color.blue}>{clientName}</span>
                                        <span>{clientSexName}</span>
                                        <span>{age}</span>
                                    </p>
                                </div>
                                <div className={styles.sg_inner}>
                                    <p>
                                        <span>营业部：</span>
                                        <span>{organizationName}</span>
                                    </p>
                                </div>
                                <div className={styles.sg_inner} >
                                    <p className={styles.sg_p}>
                                        <span>主服务人：</span>
                                        <span>{mainServuser}</span>
                                        <span>{phoneCode}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ):null}
                </li>
            );
        });
    }
}

function injectAction(){
    return {getClientSearchList,getIsClientOwner,gotoDetail};
}

module.exports = connect(null,injectAction())(ClientList);
