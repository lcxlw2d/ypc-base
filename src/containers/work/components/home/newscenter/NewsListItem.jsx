import {connect} from 'react-redux';
import {gotoDetail, FROM_ATTEND_PAGE} from '../../../../../store/actions';

import ImageLoad from '../../../../../components/common/carousel/ImageLoad';

import {setMstate} from '../../../actions/home/newscenter/newscenterAction'

import styles from '../../css/home/newscenter/newsListItem.css';

class NewsListItem extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    clickItem = ()=>{
        var {noticeId, onSetStye} = this.props;
        onSetStye(noticeId);
         hashHistory.push('work/home/news/detail/'+noticeId);

    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("NewsListItem render");
        var {title='--',abstract,noticeId,type,likeStatus,readCounts,
            likeCounts,createDate,readStatus} =this.props,
            liCls = this.mergeClassName(styles.list_li, readStatus?styles.hotnews_read:"");
       return (
            <li className={liCls} onClick={this.clickItem}>
            	<div className={styles.hotnews_list_tit}>{title}</div>
                {abstract?(<div className={styles.hotnews_list_text}>{abstract}</div>):(<div className={styles.hotnews_list_text}>本条摘要丢失，请联系管理员。</div>)}
                <div className={styles.hotnews_list_other}>
                	<div className={styles.other_left}><i>{type}</i>{createDate}</div>
                    <div className={styles.other_right}>
                        <span className={styles.num_read}>{readCounts}</span>
                        <span className={styles.num_thumbs}>{likeCounts}</span>
                    </div>
                </div>
            </li>

        );     
    }
}
function injectAction(){
    return {gotoDetail};
}


module.exports = connect(null,injectAction())(NewsListItem);
