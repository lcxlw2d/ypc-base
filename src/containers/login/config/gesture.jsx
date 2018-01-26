import {injectReducer} from '../../../store/reducers';

module.exports = (store) => (nextState, cb) => {

    require.ensure([], (require) => {
        const GesturePage = require('../pages/GesturePage');
        var gestureReducer = require('../reducers/gestureReducer');
        injectReducer(store, {
            gesture:gestureReducer
        });
        cb(null, GesturePage)
    }, 'gesture')
}
