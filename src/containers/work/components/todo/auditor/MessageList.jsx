import AppHeader from '../../../../../components/common/appheader/AppHeader';
import FullScreenView from '../../../../../components/common/fullscreen/FullScreenView';
import MessagePhoneList from './MessagePhoneList';

class MessageList extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        systemApi.log("MessageList render");

        var {onClose, batchId} = this.props;

        return (
            <FullScreenView>
                <AppHeader headerName="发送列表" onBackClick={onClose}/>
                <Content iscroll={false}>
                    <MessagePhoneList batchId={batchId}/>
                </Content>
            </FullScreenView>
        );
    }
}

module.exports = MessageList;
