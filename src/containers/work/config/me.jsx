import {injectReducer} from '../../../store/reducers';

module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const mePage = require('../pages/me/MePage');
        const meReducer = require('../reducers/me/meReducer');
        injectReducer(store, {
            me:meReducer
        });
        cb(null, mePage)
    }, 'me')
}
