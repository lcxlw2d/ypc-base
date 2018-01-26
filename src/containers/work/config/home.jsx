import {injectReducer} from '../../../store/reducers';

module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const homePage = require('../pages/home/HomePage');
        const homeReducer = require('../reducers/home/homeReducer');
        injectReducer(store, {
            home:homeReducer
        });
        cb(null, homePage);
    }, 'home');
}
