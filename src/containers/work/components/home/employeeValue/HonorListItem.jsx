import {connect} from 'react-redux';

import ImageLoad from '../../../../../components/common/carousel/ImageLoad';

import {setMstate} from '../../../actions/home/newscenter/newscenterAction'

import styles from '../../css/home/employeeValue/honorListItem.css';

class HonorListItem extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    clickItem = ()=>{
      //  var {noticeId, onSetStye} = this.props;
      var path = {
        pathname:"/work/home/employeeValue/0/honorlist/detail",
        state:this.props.data,
      }
        hashHistory.push(path);

    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("NewsListItem render");
        var {honorId,honorName,userName,honorTime,
          commentCount,isNew,isPraise,praiseCount,branchName,honorImg} =this.props.data;

       return (
         <li className={styles.item} onClick={this.clickItem}>
          <div className={styles.hn_pic}><img src={honorImg} /></div>
             <div className={styles.hn_intro}>
              <p>
                  <span className={styles.hn_title}>{honorName}</span>
                     <span className={styles.hn_time}>上榜时间：<span>{honorTime}</span></span>
                     {isNew==1?(<span className={styles.ht_new}>新</span>):null}
                 </p>
                 <p>
                  <span className={styles.ht_name}>{userName}</span>
                     <span className={styles.hn_cp}>{branchName}</span>
                     <span className={styles.hn_com}>{commentCount}</span>
                     <span className={styles.hn_flower}>{praiseCount}</span>
                 </p>
             </div>
         </li>

        );
    }
}
function injectAction(){
    return {};
}


module.exports = connect(null,injectAction())(HonorListItem);
