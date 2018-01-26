import {connect} from 'react-redux';
import {getContent, deleteDraft, attendSubmit} from '../../../../actions/home/attend/edit/editAction';

import AppHeader from '../../../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../../../components/common/fullscreen/FullScreenView';
import ConfirmDialog from '../../../../../../components/common/popup/ConfirmDialog';
import CurrentPosition from './CurrentPosition';
import AttendInfoEdit from './AttendInfoEdit';
import MyClient from './MyClient';

import styles from '../../../css/home/attend/edit/attendDetailEdit.css';

/** 首页-外勤打卡详情编辑页面 **/
class AttendDetailEdit extends PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showConfirm:false
        };
    }

    submit = ()=>{
        var {onSubmit} = this.props;
        onSubmit && onSubmit();
    }

    renderIcon(){
        return [
            <span className={styles.pattern} onClick={this.submit}>提交</span>
        ];
    }

    backClick = ()=>{
        this.setState({showConfirm:true});
    }

    noSave = ()=>{
        var {onClose} = this.props;
        onClose && onClose();
    }

    save = ()=>{
        this.submit();
    }

    render() {
        systemApi.log("AttendDetailEdit render");

        var {onClose, onSubmit, ...otherProps} = this.props,
            {showConfirm} = this.state;

        return (
            <FullScreenView>
                <AppHeader headerName="编辑我的足迹" iconRight={this.renderIcon()} onBackClick={this.backClick}/>
                <Content>
                    <AttendInfoEdit {...otherProps} />
                </Content>
                {showConfirm?(
                    <ConfirmDialog title="保存修改" text="是否要保存修改?" confirmText="是" cancelText="否" onCancel={this.noSave} onSubmit={this.save}/>
                ):null}
            </FullScreenView>

        );
    }

}

function injectAction() {
    return {getContent, deleteDraft, attendSubmit};
}

module.exports = connect(null, injectAction())(AttendDetailEdit);
