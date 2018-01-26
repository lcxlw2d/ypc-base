import {injectReducer} from '../../../store/reducers';

module.exports = (store) => (nextState, cb) => {

    require.ensure([], (require) => {
        const LoginPage = require('../pages/LoginPage');
        var loginReducer = require('../reducers/loginReducer');
        injectReducer(store, {
            login:loginReducer
        });
        cb(null, LoginPage)
    }, 'login')
}
