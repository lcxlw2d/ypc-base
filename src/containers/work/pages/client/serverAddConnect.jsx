import {connect} from 'react-redux';
import {recordJumpService} from '../../../../store/actions';
import {getServTypeDict, addOrModRecord, showError, showWarning} from '../../actions/client/summary/serverAction';
import {FileTransfer, deleteLocalRecordFile} from './../../actions/client/record/recordAction';
import ServerAddPage from './ServerAddPage';

function injectAction() {
    return {getServTypeDict, addOrModRecord, showError, showWarning, FileTransfer, deleteLocalRecordFile, recordJumpService};
}

function injectProps(state) {
    var {clientName, fundAccount, clientTel, recordingInnerId, recordingBegindate, recordingRuntime, callTypevalue} = state.client || {},
        {client = {}} = state.base || {},
        {clientId, potentialId, clientType, fromRecord, potentialIdTwo} = client;
    return {clientName, fromRecord, potentialIdTwo, clientId, fundAccount, clientTel, recordingInnerId, recordingBegindate, recordingRuntime, callTypevalue, potentialId, clientType};
}

module.exports = connect(injectProps, injectAction())(ServerAddPage);
