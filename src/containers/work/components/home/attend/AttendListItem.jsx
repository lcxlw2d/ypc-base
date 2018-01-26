import {connect} from 'react-redux';
import {gotoDetail, FROM_ATTEND_PAGE} from '../../../../../store/actions';

import ImageLoad from '../../../../../components/common/carousel/ImageLoad';
import ItemImage from './ItemImage';

import styles from '../../css/home/attend/attendListItem.css';

class AttendListItem extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    renderPic = (imgs)=>{
        return imgs.map((item,index)=>{
            var {url, urlSmall, attachmentId} = item;
            return (
                <ItemImage key={attachmentId} url={url} urlSmall={urlSmall}/>
            );
        });
    }

    clickItem = ()=>{
        var {status, articleId, shareable, address} = this.props;
        if(status == 20 || status == 10){
            hashHistory.push(`work/home/attend/edit/${articleId}/${address}`);
        }else if(status == 30){
            if(shareable){
                hashHistory.push(`work/home/attend/detailshow/${articleId}/${address}`);
            }else{
                hashHistory.push(`work/home/attend/detail/${articleId}/${address}`);
            }
        }
    }

    clientClick = (clientId)=>(e)=>{
        var {owned, address} = this.props;
        if(owned){
            this.props.gotoDetail(clientId,FROM_ATTEND_PAGE,{address});
            e.stopPropagation();
        }
    }

    //跳转潜在客户
    clientClick2 = (potentialId)=>(e)=>{
        var {owned, address} = this.props;
        if(owned){
            // this.props.gotoDetail(clientId,FROM_ATTEND_PAGE,{address});
            hashHistory.push("/work/client/potentialDetail/"+potentialId)
            e.stopPropagation();
        }
    }

    renderClient(clients){
        var {owned} = this.props;
        return clients.map((item)=>{
            var {clientId, clientName, potentialId, clientType} = item;
            return <span className={owned?Color.blue:""} onClick={clientType==2?this.clientClick2(potentialId):this.clientClick(clientId)}>{clientName}</span>
        });
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("AttendListItem render");
        var {
                status = 30,
                contentType = 1,
                userName = "",
                addressName = "",
                clients = [],
                startTime = '--',
                imgs = [],
                content,
                shareable,
                positioned,
                owned,
                createUserImg,
                commentNumber='--'
            } = this.props,
            posText = positioned==1?"已定位":"未定位",
            userImg = createUserImg=="-1"?"./images/work/me/user_01.png":createUserImg,
            liCls = this.mergeClassName(styles.attendance_list_li, status==20?styles.atten_draft:"");

        return (
            <li className={liCls} onClick={this.clickItem}>
                <div className={styles.attendance_user}>
                    <img src={userImg}/>
                </div>
                <div className={styles.attendance_intr}>
                    <p className={this.mergeClassName(Color.c6, styles.c6)}><span className={styles.mr5}>{startTime}</span><span>{addressName}</span></p>
                    <div className={styles.atten_innerbox}>
                        <div className={styles.arrow_top}>
                            <b className={styles.atten_innerbox_top}>
                                <i className={styles.top_arrow1}></i>
                                <i className={styles.top_arrow2}></i>
                            </b>
                        </div>
                        {status==20?(<h2><span className={styles.userName}>{userName}</span><span className={this.mergeClassName(Font.font15, Color.red)}>{posText}，保存为草稿</span></h2>):null}
                        {status==20?(<div className={this.mergeClassName(Font.font15, styles.content)}>{content}</div>):null}
                        {status==30?(<h2><div className={Color.blue}>{userName}</div><div className={this.mergeClassName(Font.font15, styles.content)}>{content}</div></h2>):null}
                        {imgs.length?(<div className={styles.imagediv}>{this.renderPic(imgs)}</div>):null}
                        <p>
                            {clients.length?(<a className={styles.visit_cust}><i></i>{this.renderClient(clients)}</a>):null}
                            {status==30?(<span className={styles.ftcomSpan}>{shareable?<a className={styles.ftcom}>{commentNumber}</a>:null}<span className={this.mergeClassName(styles.shareable, shareable?styles.on:"")}></span></span>):null}
                        </p>
                    </div>
                </div>
            </li>
        );
    }
}


function injectAction(){
    return {gotoDetail};
}

module.exports = connect(null,injectAction())(AttendListItem);
