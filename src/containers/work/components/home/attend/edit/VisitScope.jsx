import FullScreenView from '../../../../../../components/common/fullscreen/FullScreenView';
import AppHeader from '../../../../../../components/common/appheader/AppHeader';

import styles from '../../../css/home/attend/edit/visitScope.css';

class VisitScope extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    backClick = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    itemClick = (scope)=>()=>{
        var {onSelect} = this.props;
        onSelect && onSelect(scope);
    }

    render(){
        systemApi.log("VisitScope render");

        var {scope} = this.props;

        return (
            <FullScreenView>
                <AppHeader headerName="谁可以看" onBackClick={this.backClick}/>
                <Content>
                    <div className={styles.item} onClick={this.itemClick(1)}>
                        <div className={styles.team_share}>
                            <p className={Font.font15}>团队分享</p>
                            <p className={Color.c9}>团队内所有员工可见</p>
                        </div>
                        <i className={this.mergeClassName(styles.icon_choose, scope=="1"?styles.on:"")}></i>
                    </div>
                    <div className={styles.item} onClick={this.itemClick(0)}>
                        <div className={styles.team_share}>
                            <p className={Font.font15}>不分享</p>
                            <p className={Color.c9}>仅营业部团队负责人查看</p>
                        </div>
                        <i className={this.mergeClassName(styles.icon_choose, scope=="0"?styles.on:"")}></i>
                    </div>
                </Content>
            </FullScreenView>
        );
    }

}

module.exports = VisitScope;
