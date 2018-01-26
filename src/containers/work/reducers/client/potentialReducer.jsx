import {SET_POTENTIALDETAIL_PARAM} from './../../../../store/actions';

module.exports = function potential(state, action) {
    var {type} = action;
    state = state || {
        potentialId:'',
        from:''
    }
    switch (type) {
        case SET_POTENTIALDETAIL_PARAM:
            let {from, params} = action, { potentialId } = params;
            return Object.assign({}, state, {
                potentialId,
                from
            });
            break;
        default:
            return state;
    }
}
