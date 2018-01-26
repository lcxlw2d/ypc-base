import {injectReducer} from '../../../store/reducers';

module.exports = (store) => (nextState, cb) => {
    require.ensure([], (require) => {
        const todoPage = require('../pages/todo/TodoPage');
        const todoReducer = require('../reducers/todo/todoReducer');
        injectReducer(store, {
            todo:todoReducer
        });
        cb(null, todoPage);
    }, 'todo')
}
